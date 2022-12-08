import { API, TICKETS_BASE_URL } from '../../constants'

export const putTicketData = async (ticketData) => {

    // const ticket = req.body;
    // const updatedTicket = await ticketService.update(req.params.id, ticket, { new: true });
    let ticketDbID = ticketData["id"];
    delete ticketData["id"];
    delete ticketData["userData"];
    delete ticketData["createdAt"];
    delete ticketData["updatedAt"];

    let url = `${API}${TICKETS_BASE_URL}${ticketDbID}`;
    let body = JSON.stringify(ticketData);

    return fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    }).then(res => {
        // console.log(res);
        return res.json();
    }).then(
            data => {
                // console.log(data)
                return data.data;
            }
        );

}

export const getTicketData = async (ticketDbID) => {


    let url = `${API}${TICKETS_BASE_URL}${ticketDbID}`;

    return fetch(url)
        .then(res => {
            // console.log(res);
            return res.json();
        })
        .then(
            data => {
                // console.log(data)
                return data.data;
            }
        );

    // switch(id){
    //     case "638d2bc9dccd0ecc54db222f" : return sampleTicketData1;
    //     case "638d2f9bdccd0ecc54db2232" : return sampleTicketData2;
    //     case "638d2fc0dccd0ecc54db2234" : return sampleTicketData3;
    // }


}

export const postTicketData = async (ticketData) => {

    let url = `${API}${TICKETS_BASE_URL}`;

    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(ticketData)
    }).then(res => {
        // console.log(res);
        return res.json();
    })
    .then(
        data => {
            // console.log(data)
            return data.data;
        }
    );;
}

const sampleTicketData1 = {
    "id": "638d2bc9dccd0ecc54db222f",
    "subject": "test-v1-change",
    "description": "Hi,\n\n television I ordered from your site was delivered with a cracked screen. I need some help with a refund or a replacement.\n\n Here is the order number FD07062010 \n\n\n Thanks,\n Sarah",
    "status": "Open",
    "priority": "High",
    "requester_id": "my_1",
    "tags": ["tag1", "tag2", "tag3", "tag4", "tag5"],
    "createdAt": "2022-11-29T00:32:46.468Z",
    "updatedAt": "2022-11-29T00:33:30.834Z",
    "userData": {
        "firstname": "test123",
        "lastname": "desss",
        "phoneNumber": "Open",
        "email": "High",
        "role": "userID"
    }
}

const sampleTicketData2 = Object.assign({}, sampleTicketData1);
sampleTicketData2.id = "638d2f9bdccd0ecc54db2232"

const sampleTicketData3 = Object.assign({}, sampleTicketData1);
sampleTicketData3.id = "638d2fc0dccd0ecc54db2234"