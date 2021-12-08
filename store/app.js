export const state = () => ({
    pageTitle: 'Home'
});

export const mutations = {
    setPagetitle(state, payload) {
        state.pageTitle = payload
    }
}