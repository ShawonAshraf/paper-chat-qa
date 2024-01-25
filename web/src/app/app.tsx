// eslint-disable-next-line @typescript-eslint/no-unused-vars
import "bootstrap/dist/css/bootstrap.min.css";
import FileUploader from "./components/fileuploader";

export function App() {
    return (
        <div className="container" style={{ width: "600px" }}>
            <div className="my-4">
                <h1>Paper Summariser</h1>
            </div>
            <FileUploader />
        </div>
    );
}

export default App;
