'use server'
 
export async function welcome() {
    console.log(process.env?.ENV_TEST);
}