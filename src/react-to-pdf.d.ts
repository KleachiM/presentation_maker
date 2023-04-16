declare module 'react-to-pdf' {
    export interface ReactToPdfProps {
        targetRef: React.RefObject<any>;
        filename: string;
        options?: object;
        onComplete?: () => void;
    }

    export default class ReactToPdf extends React.Component<ReactToPdfProps> {}
}
