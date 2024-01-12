export function sortAlphabetically({users, sortBy}){
    if(isNaN(sortBy)) sortBy = 1
    return sortBy === 1 ? users.sort((a, b) => a.name.localeCompare(b.name)) : users.sort((a, b) => b.name.localeCompare(a.name))
}