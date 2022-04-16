export default function handleError(error: any) {
  window.swal.fire({
    icon: "error",
    title: "Error!",
    text: "An unexpected error occured.",
    confirmButtonText: "Okay",
    confirmButtonColor: "black"
  })
  //error  handler method. It can extratch message-title and show popup to user
}