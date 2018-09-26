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
    list: [
        {
            _id: Date.now() + Math.random(),
            title: 'Incoming survey title 1',
            description: 'Incoming survey description 1',
            start_date: 1537878023317,
            finish_date: 1537736400000,
            completed: false,
            questions: [
                {
                    id: 1537878013498.3554,
                    text: 'Some question',
                    type: 'free_text',
                    isRequired: 'required'
                }
            ],
            sender: {
                _id: "5984342227cd340363dc84bb",
                firstName: "Amanda",
                lastName: "Hayes",
                email: "amanda.hayes@example.com",
                lastActive: "1970-01-01T00:00:00.000Z",
                pictureUrl: "https://randomuser.me/api/portraits/women/28.jpg",
            }
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