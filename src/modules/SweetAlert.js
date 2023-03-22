import Swal from 'sweetalert2'

export const endGameAlert=()=> {
    Swal.fire({
        title: 'Partida Terminada!',
        text: 'Do you want to continue',
        icon: 'success',
        confirmButtonText: 'Cool'
      })
}