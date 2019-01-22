// thumbnail 내려주는 api
exports.boardlist = (req, res) => {
    // 나중에 DB에서 읽은 이미지 이름 or 경로를  thumbnails에 담아서 보내준다.
    let thumbnails = '/image.jpg';

    res.status(200);
    res.json({
        "msg": 'test_success',
        'thumbnail': thumbnails
    });
}

// 각 board의 이미지를 내려주는 기능
exports.imagelist = async (req, res) => {

    // standard: 어디 컨텐츠인지 확인을 할 때 필요
    let standard = req.params.standard;

    // DB에서 읽어온 이미지 이름 or 경로를 담는 변ㅅ
    let images = '/image.jpg';

    res.status(200);
    res.json({
        'msg': 'test_success',
        'images': images
    });

}



