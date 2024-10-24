import '../styles/confirmDelete.scss';

export function ConfirmDelete({product, onDelete}){
    const { code, name } = product.product;
    return(
        <>
         <h4 className='delete-warning'>{`Are you sure you want to permanently delete this item?`}</h4>
         <hr />
         
         <h6 className='product-item'>{`- ${code} | ${name}`}</h6>

         <div>
            <button className="btn btn-delete" onClick={()=>onDelete()} aria-label={`Delete ${name}`}>
                <span className="material-symbols-outlined">
                    delete
                </span>
                &nbsp;Eliminar
            </button>
         </div>
        </>
    )
}