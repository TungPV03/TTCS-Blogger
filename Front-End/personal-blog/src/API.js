import { addDoc, collection, getDocs, query, updateDoc, where, doc, arrayUnion, arrayRemove } from "firebase/firestore"
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import moment from 'moment';
import { auth, db, storage } from './Component/FirebaseConfig/firebaseConfig';
import { updateProfile } from "firebase/auth";
import store from "./Redux/store";

const fetchCurrentUser = () => {
    return async (dispatch) => {
        const userData = await getUserById(auth.currentUser?.uid);
        dispatch({type: "user/fetchUser", payload: userData});
    }
}

const fetchPost = () => {
    const blogpostRef = collection(db , "blogposts");
    return async (dispatch) => {
        const data = await getDocs(blogpostRef);
        dispatch({
            type: "blogs/loadedBlogs", 
            payload: data.docs.map(doc => ({...doc.data(), id: doc.id}))
        });
    }
}

const fetchCmt = () => {
    const cmtsRef = collection(db, "commentsList");
    return async (dispatch) => {
        const cmtsData = await getDocs(cmtsRef);
        dispatch({
            type: "cmt/loadedCmts",
            payload: cmtsData.docs.map(doc => ({...doc.data(), id: doc.id}))
        })
    }
}

const createUser = async (id, name, email, imgURL) => {
    const usersCollectionRef = collection(db,"users");
    const data = {
        id,
        name,
        email,
        imgURL,
        phoneNumber: "",
        dob: "",
        displayName: '',
        likedBlog: []
    }
    try{
        await addDoc(usersCollectionRef, data);
    } catch (e){
        console.error("Error to create a user: ", e);
    }
}

const getUserById = async (userId) => {
    try {
        if (!userId) {
            return;
        }

      const q = query(collection(db, "users"), where("id", "==", userId));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0]; 
        return userDoc.data();
      } else {
        return null; 
      }
    } catch (error) {
      console.error('Error getting user document:', error);
      throw error;
    }
  };

const createPost =  (title, content, img, goTo) => {
    const blogpostsCollectionRef = collection(db , "blogposts");
    const data = {
        title,
        content,
        imgUrl: '',
        likeCount: 0,
        userId : auth.currentUser.uid,
        createdAt: moment().format('DD-MM-YYYY HH:mm')
    }
    return async (dispatch) => {
        try {
            dispatch({type:"blogs/addedBlog", payload: {...data,id: "tmp10082003"}});

            const imageRef = ref(storage, `imgs/${img.name}`);
            const snapshot = await uploadBytes(imageRef, img);
            const url = await getDownloadURL(snapshot.ref);
            data.imgUrl = url;

            const docRef = await addDoc(blogpostsCollectionRef, data);
            data.id = docRef.id;
            dispatch({type: "blogs/addedInfo", payload: {
                id: docRef.id,
                imgUrl: url
            }})
            goTo('/home');
        } catch (error) {
            console.error("Error creating post:", error);
        }
    }
}

const creatCmt = (content, blogId) => {
    const cmtsRef = collection(db, "commentsList");
    const comment = {
        userId: auth.currentUser.uid,
        createdAt: moment().format('DD-MM-YYYY HH:mm'),
        blogId,
        content,

    }
    return async (dispatch) => {
        try {
            dispatch({
                type: "cmt/addedCmt",
                payload: {...comment, id: "tmpId"},
            });
            const cmtDocRef = await addDoc(cmtsRef, comment);
            dispatch({
                type: "cmt/fetchId",
                payload: cmtDocRef.id
            })
        } catch(e){
            console.error(e)
        }
    }
}

const updateUserProfile = async (displayName, photoURL) => {
    try{await updateProfile(auth.currentUser, {
        displayName,
        photoURL
    })} catch (e) {
        console.error(e);
    }
}

const updateUser = (data, id) => {
    return async (dispatch) => {
        const q = query(collection(db, "users"), where("id", "==", id));
        const userDoc = (await getDocs(q)).docs[0];
        const userRef = doc(db, "users", userDoc.id)
        try {
            dispatch({type: 'user/updateUser', payload: data})
            await updateDoc(userRef, {
                ...data
            })
        } catch(e){
            console.error(e);
        }
    }
}

const changeLikeCount = (like,currentLikes,id) => {
    const docRef = doc(db, "blogposts", id);
    return async (dispatch, getState) =>{
        try {
            dispatch({type: "blogs/likedBlog", payload: {
                blogId: id,
                like
            }});
            if(like){
                dispatch({type: "user/addedLikedBlog", payload: id});
            }
            else{
                dispatch({type: "user/removerLikedBlog", payload: id});
            }
            await updateDoc(docRef, {
                likeCount: currentLikes + (like ? 1 : -1)
            });
            await store.dispatch(updateUser( {
                likedBlog: like ? arrayUnion(id) : arrayRemove(id)
            }, auth.currentUser.uid));
        } catch (e) {
            console.error(e);
        }
    }
}

const getUserByName = async (name) => {
    try {
        const q = query(collection(db, "users"), where("name", ">=", name), where("name", "<=", name + "\uf8ff"));
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            return querySnapshot.docs.map(doc => doc.data());
        } else {
          return null; 
        }
    } catch (error) {
        console.error('Error getting user document:', error);
        throw error;
    }
}

const uploadAvt = (img, id) => {
    return async (dispatch) => {
        const q = query(collection(db, "users"), where("id", "==", id));
        const userDoc = (await getDocs(q)).docs[0];
        const userRef = doc(db, "users", userDoc.id)
        const imageRef = ref(storage, `imgs/${img.name}`);
        const snapshot = await uploadBytes(imageRef, img);
        const url = await getDownloadURL(snapshot.ref);
        try {
            dispatch({type: 'user/updateUser', payload: {imgURL: url}})
            await updateDoc(userRef, {
                imgURL: url
            })
        } catch(e){
            console.error(e);
        }
    }
}

const API = {
    fetchPost,
    fetchCmt,
    createUser,
    getUserById,
    createPost,
    updateUserProfile,
    changeLikeCount,
    fetchCurrentUser,
    updateUser,
    creatCmt,
    getUserByName,
    uploadAvt
}

export default API;