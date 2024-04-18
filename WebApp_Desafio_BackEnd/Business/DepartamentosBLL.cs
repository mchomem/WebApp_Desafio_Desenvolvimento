using System.Collections.Generic;
using WebApp_Desafio_BackEnd.DataAccess;
using WebApp_Desafio_BackEnd.Models;

namespace WebApp_Desafio_BackEnd.Business
{
    public class DepartamentosBLL
    {
        private DepartamentosDAL dal = new DepartamentosDAL();

        public IEnumerable<Departamento> ListarDepartamentos() => dal.ListarDepartamentos();

        public Departamento ObterDepartamento(int idDepartamento) => dal.ObterDepartamento(idDepartamento);

        public bool GravarDepartamento(int id, string descricacao) => dal.GravarDepartamento(id, descricacao);

        public bool ExcluirDepartamento(int idDepartamento) => dal.ExcluirDepartamento(idDepartamento);
    }
}
