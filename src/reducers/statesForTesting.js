const mySurveysDefaultStore = {
    my_surveys: [
        {
            title: 'Survey title',
            description: 'Survey description',
            start_date: 1537878023317,
            finish_date: 1537736400000,
            questions: [
                {
                    id: 1537878013498.3554,
                    text: 'Some question',
                    type: 'free_text',
                    isRequired: 'required'
                }
            ],
            selected_users: [
                {
                    _id: "5984342227cd340363dc84bb",
                    firstName: "amanda",
                    lastName: "hayes",
                    email: "amanda.hayes@example.com",
                    lastActive: "1970-01-01T00:00:00.000Z",
                    pictureUrl: "https://randomuser.me/api/portraits/women/28.jpg",
                }
            ],
            total_answers: 1,
            done_answers: 0,
        }
    ],
    survey_has_sended: false
}

const incoming_surv = {
    just_completed: false,
    list: [
        {
            _id: Date.now() + Math.random(),
            title: 'Incoming survey title 1',
            description: 'Incoming survey description 1',
            createdAt: "2018-07-23T07:43:20.853Z",
            updatedAt: "2018-07-23T07:43:20.853Z",
            owner: "5a84007831fdc409bc598202",
            questions: [
                {
                    _id: "5b5587187825ac2a047657b3",
                    updatedAt: "2018-07-23T07:43:20.972Z",
                    createdAt: "2018-07-23T07:43:20.972Z",
                    text: "some question 1",
                    required: true,
                    min: 0,
                    max: 125,
                    type: "text",
                    survey: "5b5587187825ac2a047657b2"
                },
                {
                    _id: "5b5587187825ac2a047657b4",
                    updatedAt: "2018 - 07 - 23T07: 43: 20.973Z",
                    createdAt: "2018 - 07 - 23T07: 43: 20.973Z",
                    text: "some question 2",
                    required: false,
                    min: 0,
                    max: 150,
                    type: "yes-no",
                    survey: "5b5587187825ac2a047657b2"
                },
                // {
                //     id: 1537878016798.3664,
                //     text: 'Some question checkbox 2',
                //     type: 'yes_no',
                //     isRequired: 'required'
                // },
                // {
                //     id: 1537878343498.3664,
                //     text: 'Some question checkbox1',
                //     type: 'yes_no',
                //     isRequired: 'optional'
                // },
                // {
                //     id: 1537873414498.3664,
                //     text: 'Some question checkbox 3',
                //     type: '1_to_6',
                //     isRequired: 'required'
                // },
                // {
                //     id: 1637873414498.3664,
                //     text: 'Some question checkbox 3',
                //     type: '1_to_6',
                //     isRequired: 'optional'
                // },
            ],
            // sender: {
            //     _id: "5984342227cd340363dc84bb",
            //     firstName: "Amanda",
            //     lastName: "Hayes",
            //     email: "amanda.hayes@example.com",
            //     lastActive: "1970-01-01T00:00:00.000Z",
            //     pictureUrl: "https://randomuser.me/api/portraits/women/28.jpg",
            // }
        },
        {
            _id: Date.now() + Math.random(),
            title: 'Incoming survey title 2',
            description: 'Incoming survey description 2',
            start_date: 1537878023317,
            finish_date: 1537736400000,
            completed: false,
            questions: [
                {
                    id: 1537878013498.3531,
                    text: 'Some question',
                    type: 'free_text',
                    isRequired: 'required'
                }
            ],
            sender: {
                _id: "5984342227cd340363dc84b7",
                email: "abbie.holland@example.com",
                firstName: "Abbie",
                lastName: "Holland",
                lastActive: "1970-01-01T00:00:00.000Z",
                pictureUrl: "https://randomuser.me/api/portraits/women/88.jpg",
            }
        },
        {
            _id: Date.now() + Math.random(),
            title: 'Incoming survey title 3',
            description: 'Incoming survey description 3',
            start_date: 1537878023317,
            finish_date: 1537736400000,
            completed: false,
            questions: [
                {
                    id: 1537878013498.3574,
                    text: 'Some question',
                    type: 'free_text',
                    isRequired: 'required'
                }
            ],
            sender: {
                _id: "5984342227cd340363dc84b4",
                email: "amber.gray@example.com",
                firstName: "Amber",
                lastName: "Gray",
                lastActive: "1970-01-01T00:00:00.000Z",
                pictureUrl: "https://randomuser.me/api/portraits/women/46.jpg",
            }
        }
    ]
}

export {
    mySurveysDefaultStore,
    incoming_surv,
}