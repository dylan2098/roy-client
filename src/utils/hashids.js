import Hashids from "hashids";
import Instance from "./singleton";

class HashId {
    static encode(id) {
        const Helper = Instance.getInstanceHelper();
        const hashids = new Hashids(Helper.getProjectName(), Helper.getGenSalt());
        return hashids.encode(id);
    }

    static decode(hashId) {
        const Helper = Instance.getInstanceHelper();
        const hashids = new Hashids(Helper.getProjectName(), Helper.getGenSalt());
        return hashids.decode(hashId);
    }
}

export default HashId;