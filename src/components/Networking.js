const server = 'http://127.0.0.1:3001/api/';


async function getAllHistoryData() {
    const query = server + 'history-data/all/';
    try {
        let response = await fetch(query);
        if (response) {
            let responseJson = await response.json();
            responseJson = responseJson.result;
            if (responseJson.status === 'success') {
                return responseJson.data;
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    } catch (error) {
        console.log(`Error is: ${error}`);
        return null;
    }
}

async function filterHistoryData(from, to, sort) {
    const query = server + `history-data/filter/${from}/${to}/${sort}`;
    try {
        let response = await fetch(query);
        if (response) {
            let responseJson = await response.json();
            responseJson = responseJson.result;
            if (responseJson.status === 'success') {
                return responseJson.data;
            }
            else {
                return null;
            }
        }
        else {
            return null;
        }
    } catch (error) {
        console.log(`Error is: ${error}`);
        return null;
    }
}

export {
    getAllHistoryData,
    filterHistoryData
}