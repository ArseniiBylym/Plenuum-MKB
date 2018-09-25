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
                    isRequired: 'optional'
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

export {mySurveysDefaultStore}