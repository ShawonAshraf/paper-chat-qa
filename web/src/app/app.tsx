// eslint-disable-next-line @typescript-eslint/no-unused-vars
import "bootstrap/dist/css/bootstrap.min.css";
import FileUploader from "./components/fileuploader";
import QueryFrame from "./components/query";

export function App() {
    return (
        <div className="container" style={{ width: "800px" }}>
            <div className="my-4">
                <h1>Paper Summariser</h1>
            </div>
            <FileUploader />
            <QueryFrame />
        </div>
    );
}

export default App;
