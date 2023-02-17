using ProcessX.Models;

namespace ProcessX.Actions.Interfaces
{
    public interface IAction<in T> : IAction<T, Response>
    {
    }

    public interface IAction<in TIn, TOut>
    {
        Task<TOut> PerformAction(TIn data);
    }

}
