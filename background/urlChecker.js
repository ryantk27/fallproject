/*
1.IP address - Phishing pages sometimes use raw IP addresses instead of domain names to bypass the time, cost, and paper trail required to register a traditional web domain. 

2.Brand impersonation - Phishing pages use brand impersonation to trick people into trusting a fake site so they will hand over their passwords, money, or personal data.  

3.Punycode - Phishing pages use Punycode as some sort of visual deception to create homograph attacks, which disguise malicious URLs, so they look identical to trusted websites. 

4.Subdomain length - Phishing pages use long subdomains to trick security filters and hide the real destination of the link from users. 

5.Check if the protocol uses HTTP since phishing urls often rely on this due to the ease of access to user info

6.known phishing urls  */

function isIPv4(hostname) {
    const parts = hostname.split(".");

    if (parts.length !== 4) {
        return false;
    }

    return parts.every(part => {
        if (!/^\d+$/.test(part)) {
            return false;
        }

        const number = Number(part);

        return number >= 0 && number <= 255;
    });
}

function isIPv6(hostname) {
    // IPv6 addresses contain colons.
    return hostname.includes(":");
}
