import types from '../types.js'
import axios from 'axios'

const state={
	goods:[],
	showLists:false,
	footerListShow:false
}

const getters={
	goods(state){ 
		return state.goods;
	},
	showLists(state){
		return state.showLists;
	},
	footerListShow(state){
		return state.footerListShow;
	}
}

const actions={
	getGoods({commit,state}){
		axios.get('/api/goods').then(resp => {
			if(resp.data.errno==0){
				commit(types.GET_GOODS,resp.data.data);
			}
		});
	},
	showList({commit}){
		commit(types.SHOWLIST);
	},
	hideList({commit}){
		commit(types.HIDELIST);
	},
	showFooterList({commit}){
		commit(types.SHOWFOOTERLIST);
	},
	hideFooterList({commit}){
		commit(types.HIDEFOOTERLIST);
	}
}

const mutations={
	[types.GET_GOODS](state,data){
		state.goods=data;
	},
	[types.SHOWLIST](state){
		state.showLists=true;
	},
	[types.HIDELIST](state){
		state.showLists=false;
	},
	[types.SHOWFOOTERLIST](state){
		state.footerListShow=true;
	},
	[types.HIDEFOOTERLIST](state){
		state.footerListShow=false;
	}
}

export default {
	state,
	getters,
	actions,
	mutations
}