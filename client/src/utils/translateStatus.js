export const translateStatus = (code) => {
    if(code === 1) return "Pending"
    else if(code === 2) return "Completed"
    else if(code === 3) return "Cancelled"
}