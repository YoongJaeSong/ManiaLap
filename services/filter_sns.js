exports.checkValid = (insta, fb, youtube, web) => {
    if (!(insta || fb || youtube || web)) {
        let error = new Error("No sns url");
        error['status'] = 404;

        throw error;
    }
};

exports.filterInsta = (insta) => {
    if (!insta) {
        return null;
    }

    insta = insta.replace('https://', '');
    let strArr = insta.split('/');

    return strArr[1];
};

exports.filterFacebook = (fb) => {
    if (!fb) {
        return null;
    }

    fb = fb.replace("https://", "");
    let strArr = fb.split('/');

    if (strArr[1].includes('profile.php?')) {
        fbProfile = strArr[1].split('=');
        return fbProfile[1];
    } else {
        return strArr[1];
    }
};

exports.filterYoutube = (youtube) => {
    if(!youtube){
        return null;
    }

    youtube = youtube.replace('https://', '');
    let strArr = youtube.split('/');

    if (strArr[1] !== 'channel') {
        let error = new Error("Not Valid youtube url");
        error["status"] = 404;

        throw error;
    }

    return strArr[2];
};