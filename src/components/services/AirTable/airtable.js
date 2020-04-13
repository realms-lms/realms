const at = require('airtable');

class AirTable {
    constructor() {        
        this.configured = false;
        this.base = null;

        this.onUserProfileUpdateCallback = null;
    }

    configure(config) {
        at.configure({
            endpointUrl: 'https://api.airtable.com/',
            apiKey: config.apiKey,
        });
        this.base = at.base(config.baseId);
        this.configured = true;
    }

    doGetSinglePageById = (pageId, callBack) => {
        if (!this.configured) {
            console.error('AirTable API has not been configured yet.');
            return;
        }

        this.base('Page')
            .find(pageId, (err, record) => {
                if (err) {
                    console.error(err);
                    callBack(err);
                }
                callBack(record);
            });
    };

    doCreateUserRecord = (firstName, lastName, email, orgCode) => {
        if (!this.configured) {
            console.error('AirTable API has not been configured yet.');
            return;
        }
        
        this.base('User')
            .create({
                "Username": email,
                "First Name": firstName,
                "Last Name": lastName,
                "Organization": (orgCode === '' ? [] : [orgCode]),
                "OrgAdmin": false,
                "ContactFor": []
                }, function(err, record) {
                if (err) {
                    console.error(err);
                    return;
                }
                
        });
    }

    doGetUserProfile = (email, callBack) => {
        if (!this.configured) {
            console.error('AirTable API has not been configured yet.');
            return;
        }
        
        this.onUserProfileUpdateCallback = callBack;
        this.base('User')
            .select({
                view: "Grid view",
                filterByFormula: `{Username} = '${email}'`,
            })
            .firstPage((err, records) => {
                if (err) {
                    console.error(err);
                    return;
                }

                records.forEach((record) => {
                    this.onUserProfileUpdateCallback(record);
                });
            });
    }

    doSetUserOrganization = (email, org) => {
        if (!this.configured) {
            console.error('AirTable API has not been configured yet.');
            return;
        }
        
        this.base('User')
            .select({
                view: "Grid view",
                filterByFormula: `{Username} = '${email}'`,
            })
            .firstPage((err, records) => {
                if (err) {
                    console.error(err);
                    return;
                }

                records.forEach((record) => {
                    this.base('User')
                        .update(record.id, {
                            "Organization": org,
                        }, (err, recs) => {
                            if (err) {
                                console.error(err);
                                return;
                            }
                            
                            this.onUserProfileUpdateCallback(recs);
                        });
                });
            });
    }
}

export default AirTable;