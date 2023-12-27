import Instance from "../../../utils/singleton"
import Loading from "../../Common/Loading";
import Services from "../../../services/index";

const InputFile = ({ type, label, file, setFile, loading, setLoading, page, typeForm }) => {
    const ServiceInstance = Instance.getInstanceService();
    const Language = Instance.getInstaceLanguage();

    const fileUploadHandler = async (event) => {
        setLoading(true);

        if (file) {
            setFile(null);
            await deleteImage(file.public_id);
        }

        const fileUploaded = await ServiceInstance.uploadImage(event.target.files[0]);
        if (fileUploaded) {
            setFile(fileUploaded);
            setLoading(false);

        } else {
            alert("Something wrong");
        }
    }


    const loadButtonUploadFile = (loading) => {
        let button;
        if (!loading) {
            button = <>{Language.getContent(label, page)} <input type="file" hidden onChange={fileUploadHandler} /></>;
        } else {
            button = <Loading size={2} />
        }

        return button;
    }


    const deleteImage = async (publicId) => {
        if (typeForm === "add") {
            await Services.getInstanceProduct().deleteImage(publicId);
        } else {
            setFile({ public_id: null, url: null });
        }
    }


    return (type === 'file') && <>
        <label className="btn btn-default">
            {
                loadButtonUploadFile(loading)
            }
        </label>

        {
            (file && file.url !== null) &&
            <div style={{ width: '150px', height: '150px', boxShadow: '0 1px 4px 0 rgb(0 0 0 / 14%)' }} className="position-relative mb-4">
                <div
                    className="position-absolute right-0 text-danger mr-1 cursor-pointer"
                    onClick={() => { deleteImage(file.public_id) }}>
                    <i className="far fa-times-circle"></i>
                </div>
                <img src={file.url} alt={file.public_id} style={{ width: '150px', height: '150px' }} />
            </div>
        }
    </>
}

export default InputFile;