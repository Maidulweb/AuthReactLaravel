export default function useAuth (){
    const auth = localStorage.getItem("token");
    if(!auth){
        return true;
    }else {
        return false;
    }
    
}