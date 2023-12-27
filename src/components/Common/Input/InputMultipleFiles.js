import Instance from "../../../utils/singleton"
import Loading from "../../Common/Loading";
import Services from "../../../services/index";

const InputMultipleFiles = ({ type, label, files, setFiles, loading, setLoading, page, items }) => {
    const ServiceInstance = Instance.getInstanceService();
    const Language = Instance.getInstaceLanguage();

    const deleteImages = (publicId) => {
        return Services.getInstanceProduct().deleteImage(publicId);
    }


    const filesUploadHandler = async (event) => {
        setLoading(true);

        let oldFiles = [];
        if (files && files.length > 0) {
            oldFiles = files;
        }

        const newFiles = await ServiceInstance.uploadImages(event.target.files);
        if (newFiles.length > 0) {
            setFiles([...oldFiles, ...newFiles]);
            setLoading(false);
        }
    }

    const loadButtonUploadFiles = (loading) => {
        let button;
        if (!loading) {
            button = <>{Language.getContent(label, page)}<input type="file" hidden onChange={filesUploadHandler} multiple /></>;
        } else {
            button = <Loading size={2} />
        }

        return button;
    }


    const loadImageDeleteFiles = (files) => {
        let elements = [];

        files.map((fileUpload, index) => {
            elements.push(
                <div key={index}
                    onClick={() => {
                        setFiles(files.filter((item) => item.public_id !== fileUpload.public_id));
                        deleteImages(fileUpload.public_id)
                    }}
                    style={{ boxShadow: '0 1px 4px 0 rgb(0 0 0 / 14%)' }} className="position-relative ml-3 mt-3" style={{ width: '150px', height: '150px' }}>
                    <div className="right-0 text-danger mr-1 cursor-pointer position-absolute" ><i className="far fa-times-circle"></i></div>
                    <img src={fileUpload.url} alt={fileUpload.public_id} style={{ width: '150px', height: '150px' }} />
                </div>
            );
        })

        return elements;
    }


    return (type === 'files') && <>
        <label className="btn btn-default">
            {
                loadButtonUploadFiles(loading)
            }
        </label>

        {
            files &&
            <div className="d-flex flex-wrap">
                {loadImageDeleteFiles(files)}
            </div>
        }
    </>
}

export default InputMultipleFiles;