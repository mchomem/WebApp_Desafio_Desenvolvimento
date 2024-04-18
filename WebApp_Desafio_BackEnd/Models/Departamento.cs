using System;
using System.ComponentModel.DataAnnotations;

namespace WebApp_Desafio_BackEnd.Models
{
    [Serializable]
    public class Departamento
    {
        public static readonly Departamento Empty;

        [Key]
        public int ID { get; set; }

        [Required(ErrorMessage = "A Descricao é obrigatória")]
        public string Descricao { get; set; }
    }
}
