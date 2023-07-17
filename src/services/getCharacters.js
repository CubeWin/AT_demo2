export default async (page = 1, characterName = '', characterStatus = '', characterGender = '') => {
    const url = `https://rickandmortyapi.com/api/character/?page=${page}&name=${characterName}&status=${characterStatus}&gender=${characterGender}`;
    console.log(url);
    const res = await fetch(url);
    const { results } = await res.json()
    return results;
}