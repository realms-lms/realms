const at = require('airtable');

class AirTable {
    constructor() {        
        this.configured = false;
        this.base = null;

        this.backlog = [];

        this.onUserProfileUpdateCallback = null;
    }

    configure(config) {
        at.configure({
            endpointUrl: 'https://api.airtable.com/',
            apiKey: config.apiKey,
        });
        this.base = at.base(config.baseId);
        this.configured = true;

        this.backlog.forEach((item) => {
            item.func(...item.args);
        });
        this.backlog = [];
    }

    doGetSinglePageById = (pageId, callBack) => {
        if (!this.configured) {
            console.error('AirTable API has not been configured yet. Adding call to backlog.');
            this.backlog.push({
                func: this.doGetSinglePageById,
                args: [ pageId, callBack ],
            });
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
            this.backlog.push({
                func: this.doCreateUserRecord,
                args: [ firstName, lastName, email, orgCode ],
            });
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
            this.backlog.push({
                func: this.doGetUserProfile,
                args: [ email, callBack ],
            });
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
            this.backlog.push({
                func: this.doSetUserOrganization,
                args: [ email, org ],
            });
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