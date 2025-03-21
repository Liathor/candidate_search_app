// TODO: Create an interface for the Candidate objects returned by the API

 export default interface Candidate {
    readonly name: string | undefined;
    readonly location: string | null;
    readonly email: string | null;
    readonly company: string | null;
    readonly bio: string | null;
    readonly avatar_url: string | null;
    readonly login: string;
    readonly html_url: string;
 }