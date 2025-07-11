import {expects} from './Jestr'

function emailAddressValidation(
    username: string = 'condor',
    serverName: string = 'sr',
    domain: string = 'com',
    minLength: number = 0,
    maxLength: number = 999
){
    let emailInput = {
        "correctly formatted": `${username}@${serverName}.${domain}`,
        "missing @": `${username}${serverName}.${domain}`,
        "missing server name": `${username}@.${domain}`,
        "missing period": `${username}@${serverName}${domain}`,
        "missing domain": `${username}@${serverName}.`,
        "incomplete address": `${username}@${serverName}`,
        "invisible space": `${username}@${serverName}.${domain} `,
        "invisible character": `${username}@${serverName}.${domain}\n`
    }

    describe('email formatting', () => {
        for(const [scenario, value] of Object.entries(emailInput)){
            expects.string.contains('email address', value, '@ symbol', '@')
        }
    })

}



export {
    emailAddressValidation,
}
