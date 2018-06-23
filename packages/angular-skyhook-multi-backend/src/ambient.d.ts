declare module "dnd-multi-backend" {
    export interface Transition {
        event: string;
        check: (event: Event) => boolean;
    }
    export type Backend = any;
    export type BackendTransition = {
        backend: any;
        transition: Transition;
    };
    const MultiBackend: (
        transition: { backends: BackendTransition[] }
    ) => Backend;
    export default MultiBackend;
    export const createTransition: (
        event: string,
        check: (event: Event) => boolean
    ) => Transition;
    export const HTML5DragTransition: Transition;
    export const TouchTransition: Transition;
    export const MouseTransition: Transition;
}

declare module "react-dnd-touch-backend" {
    import { Backend } from "dnd-multi-backend";
    const TouchBackend: ({ enableMouseEvents }: { enableMouseEvents: boolean }) => Backend;
    export default TouchBackend;
}
