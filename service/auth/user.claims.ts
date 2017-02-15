export class UserClaims {
    private parsedClaims: { [id: string]: string };

    public get claims(): { [id: string]: string } { return this.parsedClaims; }

    public get address(): string { return this.parsedClaims['address']; }

    public constructor(token: string) {
        this.parsedClaims = {
        };
        if (token) {
            var base64Url = token.split('.')[1];
            if (base64Url) {
                var base64 = base64Url.replace('-', '+').replace('_', '/');
                var rawParsed = JSON.parse(window.atob(base64));
                if (rawParsed.address) {
                    this.parsedClaims['address'] = rawParsed.address;
                }
            }
        }
    }
}