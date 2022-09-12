export default{
    data(){
        return{
            bread:[]
        }
    },
    created(){
        this.breadCrumb()
    },
    methods:{
        breadCrumb(){
            this.bread=this.$route.meta.bread||[]
        }
    }
}