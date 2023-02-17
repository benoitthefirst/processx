namespace ProcessX.Helpers
{
    public static class Utils
    {
        public static async Task<List<T>> ToListAsync<T>(this Task<IEnumerable<T>> values)
        {
            var list = await values;

            return list.ToList();
        }
        public static async Task<IDictionary<TKey, TItem>> ToDictionaryAsync<TKey, TItem>(this Task<IEnumerable<TItem>> values, Func<TItem,TKey> keySelector)
        {
            var list = await values;

            return list.ToDictionary(keySelector);
        }

        public static async Task<IDictionary<TKey, TItem>> ToDictionaryAsync<TKey, TItem>(this Task<IAsyncCursor<TItem>> values, Func<TItem,TKey> keySelector)
        {
            var list = await values;

            var _list = await list.ToListAsync();

            return _list.ToDictionary(keySelector);
        }
        public static decimal ToDecimal(this string? value, decimal @default = 0)
            => decimal.TryParse(value, out var result) ? result : @default;

        public static int ToInt(this string? value, int @default = 0)
            => int.TryParse(value, out var result) ? result : @default;

        public static long ToLong(this string? value, long @default = 0)
            => long.TryParse(value, out var result) ? result : @default;

        public static float ToFloat(this string? value, float @default = 0)
            => float.TryParse(value, out var result) ? result : @default;

        public static double ToDouble(this string? value, double @default = 0)
            => double.TryParse(value, out var result) ? result : @default;

        public static bool ToBool(this string? value, bool @default = false)
            => bool.TryParse(value, out bool result) ? result : @default;

        public static long GetTime(this string? value, string @default)
        {
            TimeSpan time;
            try
            {
                time = value.ParseTime();
            }
            catch
            {
                time = @default.ParseTime();
            }
            return (long)time.TotalSeconds;
        }

        public static long GetTime(this string? value, long @default)
        {
            try
            {
                return (long)value.ParseTime().TotalSeconds;
            }
            catch
            {
                return @default;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="timeString"></param>
        /// <returns><see cref="TimeSpan"/></returns>
        /// <exception cref="ArgumentNullException"/>
        /// <exception cref="InvalidTimeSpanFormatExecption"/>
        public static TimeSpan ParseTime(this string? timeString)
        {
            if (string.IsNullOrWhiteSpace(timeString))
                throw new ArgumentNullException($"The argument {nameof(timeString)} must not be null!!");
            // it is a number
            if (long.TryParse(timeString, out long result))
                return TimeSpan.FromSeconds(result);

            var lastCharacter = timeString[timeString.Length - 1];
            var remainingCharacters = timeString.Substring(0, timeString.Length - 1);
            //if (!"sSmMhHdDwW".Any(c => c == lastCharacter))
            //    throw new ArgumentOutOfRangeException($"The argument {nameof(timeString)} must end in either s,S,m,M,h,H,d,D,w or W!!");

            var timeSpan = lastCharacter switch
            {
                's' or 'S' => TimeSpan.FromSeconds(long.Parse(remainingCharacters)), // seconds
                'm' or 'M' => TimeSpan.FromMinutes(long.Parse(remainingCharacters)), // minutes
                'h' or 'H' => TimeSpan.FromHours(long.Parse(remainingCharacters)), // hours
                'd' or 'D' => TimeSpan.FromDays(long.Parse(remainingCharacters)), // days
                'w' or 'W' => TimeSpan.FromDays(long.Parse(remainingCharacters) * 7), // weeks
                _ => throw new InvalidTimeSpanFormatExecption()
            };

            return timeSpan;
        }
    }
}
