export class Protocol
{
    private constructor(public name:string) {}
    public toString = ():string => {
        return this.name;
    }
    public replaceProtocolInUrl(url:string, protocol:Protocol):string{
        return url.replace(this.name+"://", protocol.name+"://");
    }
    static StormChess: Protocol = new Protocol("stormchess");
    static Https: Protocol = new Protocol("https");
}