class Store {
    constructor() {
        this.data = {}
    }

    hasProperty(obj, prop) {
        return Object.prototype.hasOwnProperty.call(obj, prop)
    }

    get(key) {
        if (!this.hasProperty(this.data, key)) {
            console.log(`Key doesn't exist`)
            return null
        }
        return this.data[key]
    }

    set(key, param) {
        const TIME_LIMIT = 60000
        const time_stamp = new Date()

        if (!this.data[key]) {
            console.log('IP address contains no log data, creating one...')
            //reset the ip caches every minute
            this.data[key] = {
                request_amount: 1,
                request_start: new Date(),
                request_current: new Date(),
                request_param: param
            }
            return true
        }

        //give current request a timestamp to reference
        this.data[key]['request_current'] = time_stamp

        if ( 
            this.data[key]['request_amount'] == 10 &&
            this.data[key]['request_current'].getTime() - this.data[key]['request_start'].getTime() <= TIME_LIMIT
        ) {
            console.log('request limit reached, try again later');
            return false
        } else {
            
            if (
                this.data[key]['request_amount'] == 10 &&
                this.data[key]['request_current'].getTime() - this.data[key]['request_start'].getTime() > TIME_LIMIT
            ) {
                this.data[key]['request_amount'] = 1
                this.data[key]['request_start'] = time_stamp
            } else {
                this.data[key]['request_amount']++
            }

            this.data[key]['request_param'] = param            
            return true
        }
    }

    clearStaleIpInCache() {
        const MIN = 60000
        //nothing to do, no data
        if (!this.data) {
            console.log('no data in cache...')
            return 
        }

        try {
            Object.keys(this.data).forEach(key => {
                console.log(`data in obj: key- ${key} value- ${this.data[key]}`)
                const current = new Date()
                if ( current.getTime() - this.data[key]['request_current'].getTime() >= ( 5 * MIN) ) {
                    console.log(`deleting IP: ${key}`)
                    delete this.data[key]
                }
            })
        } catch (e) {
            throw new Error('Error clearing cache')
        }
    }

    resetIpLimiter(key) {
        this.data[key].amount = 1
        return true
    }

    log(key) {
        if (!key) {
            console.log(this.data)
        } else {
            console.log(this.data[key])
        }
    }
}

module.exports = Store