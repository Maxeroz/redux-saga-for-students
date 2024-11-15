import { put, takeEvery, call } from 'redux-saga/effects';
import { FETCH_USERS, setUsers } from '../store/customerReduser';

const fetchUsersFromApi = () =>
    fetch('https://jsonplaceholder.typicode.com/users?_limit=10');

function* fetchUsersWorker() {
    // Используем эффект 'call' для того чтобы сделать ассинхронную операцию.
    const data = yield call(fetchUsersFromApi);
    const json = yield call(() => new Promise((res) => res(data.json())));

    // Используем 'put', это аналог 'dispatch' но в контексте 'SAGA'
    yield put(setUsers(json));
}

export function* fetchUsersWatcher() {
    yield takeEvery(FETCH_USERS, fetchUsersWorker);
}
