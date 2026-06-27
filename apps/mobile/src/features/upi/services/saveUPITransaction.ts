import { supabase } from "../../../lib/supabase/client";

export async function saveUPITransaction(
    payload:any
){

    const {error} =
        await supabase
        .from("transactions")
        .insert(payload);

    if(error)
        throw error;
}