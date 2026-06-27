import { useMutation }
from "@tanstack/react-query";

import {
saveUPITransaction
}
from "../services/saveUPITransaction";

export function
useSaveUPITransaction(){

    return useMutation({

        mutationFn:
            saveUPITransaction,

    });

}