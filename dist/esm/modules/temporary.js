// 废弃
const tem_compare_version = (version1, version2) => {
    const v1Array = version1.split(".").map(Number);
    const v2Array = version2.split(".").map(Number);
    for (let i = 0; i < Math.max(v1Array.length, v2Array.length); i++) {
        const v1Part = v1Array[i] || 0;
        const v2Part = v2Array[i] || 0;
        if (v1Part > v2Part) {
            return true;
        }
        else if (v1Part < v2Part) {
            return false;
        }
    }
    return true;
};

export { tem_compare_version };
