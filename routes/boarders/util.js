// thumbnail 내려주는 api
exports.stories = (req, res) => {
    // DB작업으로 story의 대표 이미지들의 url주소를 가져오는 곳
    let story_id = [1, 2];
    let represent_image = [
        "kalin.iptime.org:3100/image.jpg",
        "kalin.iptime.org:3100/sejong.png"
    ];

    let stories = [];
    for (let i = 0; i < story_id.length; i++) {
        let obj = {};
        obj['story_id'] = story_id[i]
        obj['represent_image'] = represent_image[i];

        stories.push(obj);
    }

    res.status(200);
    res.json({
        "msg": 'success',
        "stories": stories
    });
}

// 각 board의 이미지를 내려주는 기능
exports.story = async (req, res) => {

    let story_id = req.params.story_id;

    // DB작업을 하는 곳 해당 story에 대한 section, conten를 가져온다
    // 사진, section-이미지들만, content
    let content_id = [1, 2];
    let content_image = [
        "kalin.iptime.org:3100/image.jpg",
        "kalin.iptime.org:3100/sejong.png"
    ]

    let story = [];
    for (let i = 0; i < content_id.length; i++) {
        let obj = {};
        obj['id'] = content_id[i];
        obj['image_url'] = content_image[i];

        story.push(obj);
    }

    res.status(200);
    res.json({
        'msg': 'success',
        'story': story
    });
};

exports.content = (req, res) => {
    let content_id = req.params.content_id;

    // DB작업을 하는 곳 해당 story에 대한 section, conten를 가져온다
    // 사진, section-이미지들만, content
    let id = 1;
    let image = "kalin.iptime.org:3100/image.jpg";
    let content = {};

    content['id'] = id;
    content['image'] = image;


    res.status(200);
    res.json({
        'msg': 'success',
        'content': content
    });
}

