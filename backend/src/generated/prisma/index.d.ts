
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Equipo
 * 
 */
export type Equipo = $Result.DefaultSelection<Prisma.$EquipoPayload>
/**
 * Model Prestamo
 * 
 */
export type Prestamo = $Result.DefaultSelection<Prisma.$PrestamoPayload>

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): void;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb, ExtArgs>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs>;

  /**
   * `prisma.equipo`: Exposes CRUD operations for the **Equipo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Equipos
    * const equipos = await prisma.equipo.findMany()
    * ```
    */
  get equipo(): Prisma.EquipoDelegate<ExtArgs>;

  /**
   * `prisma.prestamo`: Exposes CRUD operations for the **Prestamo** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Prestamos
    * const prestamos = await prisma.prestamo.findMany()
    * ```
    */
  get prestamo(): Prisma.PrestamoDelegate<ExtArgs>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError
  export import NotFoundError = runtime.NotFoundError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics 
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 5.22.0
   * Query Engine version: 605197351a3c8bdd595af2d2a9bc3025bca48ea2
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion 

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    * 
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    * 
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   * 
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? K : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Equipo: 'Equipo',
    Prestamo: 'Prestamo'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb extends $Utils.Fn<{extArgs: $Extensions.InternalArgs, clientOptions: PrismaClientOptions }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], this['params']['clientOptions']>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, ClientOptions = {}> = {
    meta: {
      modelProps: "user" | "equipo" | "prestamo"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Equipo: {
        payload: Prisma.$EquipoPayload<ExtArgs>
        fields: Prisma.EquipoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EquipoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EquipoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipoPayload>
          }
          findFirst: {
            args: Prisma.EquipoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EquipoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipoPayload>
          }
          findMany: {
            args: Prisma.EquipoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipoPayload>[]
          }
          create: {
            args: Prisma.EquipoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipoPayload>
          }
          createMany: {
            args: Prisma.EquipoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EquipoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipoPayload>[]
          }
          delete: {
            args: Prisma.EquipoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipoPayload>
          }
          update: {
            args: Prisma.EquipoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipoPayload>
          }
          deleteMany: {
            args: Prisma.EquipoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EquipoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.EquipoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EquipoPayload>
          }
          aggregate: {
            args: Prisma.EquipoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEquipo>
          }
          groupBy: {
            args: Prisma.EquipoGroupByArgs<ExtArgs>
            result: $Utils.Optional<EquipoGroupByOutputType>[]
          }
          count: {
            args: Prisma.EquipoCountArgs<ExtArgs>
            result: $Utils.Optional<EquipoCountAggregateOutputType> | number
          }
        }
      }
      Prestamo: {
        payload: Prisma.$PrestamoPayload<ExtArgs>
        fields: Prisma.PrestamoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PrestamoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrestamoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PrestamoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrestamoPayload>
          }
          findFirst: {
            args: Prisma.PrestamoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrestamoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PrestamoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrestamoPayload>
          }
          findMany: {
            args: Prisma.PrestamoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrestamoPayload>[]
          }
          create: {
            args: Prisma.PrestamoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrestamoPayload>
          }
          createMany: {
            args: Prisma.PrestamoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PrestamoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrestamoPayload>[]
          }
          delete: {
            args: Prisma.PrestamoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrestamoPayload>
          }
          update: {
            args: Prisma.PrestamoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrestamoPayload>
          }
          deleteMany: {
            args: Prisma.PrestamoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PrestamoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PrestamoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PrestamoPayload>
          }
          aggregate: {
            args: Prisma.PrestamoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePrestamo>
          }
          groupBy: {
            args: Prisma.PrestamoGroupByArgs<ExtArgs>
            result: $Utils.Optional<PrestamoGroupByOutputType>[]
          }
          count: {
            args: Prisma.PrestamoCountArgs<ExtArgs>
            result: $Utils.Optional<PrestamoCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
  }


  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    prestamos: number
    prestamosRegistrados: number
    prestamosRecibidos: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    prestamos?: boolean | UserCountOutputTypeCountPrestamosArgs
    prestamosRegistrados?: boolean | UserCountOutputTypeCountPrestamosRegistradosArgs
    prestamosRecibidos?: boolean | UserCountOutputTypeCountPrestamosRecibidosArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPrestamosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PrestamoWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPrestamosRegistradosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PrestamoWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPrestamosRecibidosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PrestamoWhereInput
  }


  /**
   * Count Type EquipoCountOutputType
   */

  export type EquipoCountOutputType = {
    prestamos: number
  }

  export type EquipoCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    prestamos?: boolean | EquipoCountOutputTypeCountPrestamosArgs
  }

  // Custom InputTypes
  /**
   * EquipoCountOutputType without action
   */
  export type EquipoCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the EquipoCountOutputType
     */
    select?: EquipoCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * EquipoCountOutputType without action
   */
  export type EquipoCountOutputTypeCountPrestamosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PrestamoWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    id: number | null
  }

  export type UserSumAggregateOutputType = {
    id: number | null
  }

  export type UserMinAggregateOutputType = {
    id: number | null
    usuario: string | null
    password: string | null
    nombre: string | null
    rol: string | null
    activo: boolean | null
  }

  export type UserMaxAggregateOutputType = {
    id: number | null
    usuario: string | null
    password: string | null
    nombre: string | null
    rol: string | null
    activo: boolean | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    usuario: number
    password: number
    nombre: number
    rol: number
    activo: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    id?: true
  }

  export type UserSumAggregateInputType = {
    id?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    usuario?: true
    password?: true
    nombre?: true
    rol?: true
    activo?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    usuario?: true
    password?: true
    nombre?: true
    rol?: true
    activo?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    usuario?: true
    password?: true
    nombre?: true
    rol?: true
    activo?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: number
    usuario: string
    password: string
    nombre: string
    rol: string
    activo: boolean
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    usuario?: boolean
    password?: boolean
    nombre?: boolean
    rol?: boolean
    activo?: boolean
    prestamos?: boolean | User$prestamosArgs<ExtArgs>
    prestamosRegistrados?: boolean | User$prestamosRegistradosArgs<ExtArgs>
    prestamosRecibidos?: boolean | User$prestamosRecibidosArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    usuario?: boolean
    password?: boolean
    nombre?: boolean
    rol?: boolean
    activo?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    usuario?: boolean
    password?: boolean
    nombre?: boolean
    rol?: boolean
    activo?: boolean
  }

  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    prestamos?: boolean | User$prestamosArgs<ExtArgs>
    prestamosRegistrados?: boolean | User$prestamosRegistradosArgs<ExtArgs>
    prestamosRecibidos?: boolean | User$prestamosRecibidosArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      prestamos: Prisma.$PrestamoPayload<ExtArgs>[]
      prestamosRegistrados: Prisma.$PrestamoPayload<ExtArgs>[]
      prestamosRecibidos: Prisma.$PrestamoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      usuario: string
      password: string
      nombre: string
      rol: string
      activo: boolean
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    prestamos<T extends User$prestamosArgs<ExtArgs> = {}>(args?: Subset<T, User$prestamosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrestamoPayload<ExtArgs>, T, "findMany"> | Null>
    prestamosRegistrados<T extends User$prestamosRegistradosArgs<ExtArgs> = {}>(args?: Subset<T, User$prestamosRegistradosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrestamoPayload<ExtArgs>, T, "findMany"> | Null>
    prestamosRecibidos<T extends User$prestamosRecibidosArgs<ExtArgs> = {}>(args?: Subset<T, User$prestamosRecibidosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrestamoPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */ 
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'Int'>
    readonly usuario: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly nombre: FieldRef<"User", 'String'>
    readonly rol: FieldRef<"User", 'String'>
    readonly activo: FieldRef<"User", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
  }

  /**
   * User.prestamos
   */
  export type User$prestamosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prestamo
     */
    select?: PrestamoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrestamoInclude<ExtArgs> | null
    where?: PrestamoWhereInput
    orderBy?: PrestamoOrderByWithRelationInput | PrestamoOrderByWithRelationInput[]
    cursor?: PrestamoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PrestamoScalarFieldEnum | PrestamoScalarFieldEnum[]
  }

  /**
   * User.prestamosRegistrados
   */
  export type User$prestamosRegistradosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prestamo
     */
    select?: PrestamoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrestamoInclude<ExtArgs> | null
    where?: PrestamoWhereInput
    orderBy?: PrestamoOrderByWithRelationInput | PrestamoOrderByWithRelationInput[]
    cursor?: PrestamoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PrestamoScalarFieldEnum | PrestamoScalarFieldEnum[]
  }

  /**
   * User.prestamosRecibidos
   */
  export type User$prestamosRecibidosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prestamo
     */
    select?: PrestamoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrestamoInclude<ExtArgs> | null
    where?: PrestamoWhereInput
    orderBy?: PrestamoOrderByWithRelationInput | PrestamoOrderByWithRelationInput[]
    cursor?: PrestamoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PrestamoScalarFieldEnum | PrestamoScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Equipo
   */

  export type AggregateEquipo = {
    _count: EquipoCountAggregateOutputType | null
    _avg: EquipoAvgAggregateOutputType | null
    _sum: EquipoSumAggregateOutputType | null
    _min: EquipoMinAggregateOutputType | null
    _max: EquipoMaxAggregateOutputType | null
  }

  export type EquipoAvgAggregateOutputType = {
    id: number | null
  }

  export type EquipoSumAggregateOutputType = {
    id: number | null
  }

  export type EquipoMinAggregateOutputType = {
    id: number | null
    nombre: string | null
    descripcion: string | null
    codigoInventario: string | null
    estado: string | null
    fechaCreacion: Date | null
    fechaActualizacion: Date | null
  }

  export type EquipoMaxAggregateOutputType = {
    id: number | null
    nombre: string | null
    descripcion: string | null
    codigoInventario: string | null
    estado: string | null
    fechaCreacion: Date | null
    fechaActualizacion: Date | null
  }

  export type EquipoCountAggregateOutputType = {
    id: number
    nombre: number
    descripcion: number
    codigoInventario: number
    estado: number
    fechaCreacion: number
    fechaActualizacion: number
    _all: number
  }


  export type EquipoAvgAggregateInputType = {
    id?: true
  }

  export type EquipoSumAggregateInputType = {
    id?: true
  }

  export type EquipoMinAggregateInputType = {
    id?: true
    nombre?: true
    descripcion?: true
    codigoInventario?: true
    estado?: true
    fechaCreacion?: true
    fechaActualizacion?: true
  }

  export type EquipoMaxAggregateInputType = {
    id?: true
    nombre?: true
    descripcion?: true
    codigoInventario?: true
    estado?: true
    fechaCreacion?: true
    fechaActualizacion?: true
  }

  export type EquipoCountAggregateInputType = {
    id?: true
    nombre?: true
    descripcion?: true
    codigoInventario?: true
    estado?: true
    fechaCreacion?: true
    fechaActualizacion?: true
    _all?: true
  }

  export type EquipoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Equipo to aggregate.
     */
    where?: EquipoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Equipos to fetch.
     */
    orderBy?: EquipoOrderByWithRelationInput | EquipoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EquipoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Equipos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Equipos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Equipos
    **/
    _count?: true | EquipoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: EquipoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: EquipoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EquipoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EquipoMaxAggregateInputType
  }

  export type GetEquipoAggregateType<T extends EquipoAggregateArgs> = {
        [P in keyof T & keyof AggregateEquipo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEquipo[P]>
      : GetScalarType<T[P], AggregateEquipo[P]>
  }




  export type EquipoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EquipoWhereInput
    orderBy?: EquipoOrderByWithAggregationInput | EquipoOrderByWithAggregationInput[]
    by: EquipoScalarFieldEnum[] | EquipoScalarFieldEnum
    having?: EquipoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EquipoCountAggregateInputType | true
    _avg?: EquipoAvgAggregateInputType
    _sum?: EquipoSumAggregateInputType
    _min?: EquipoMinAggregateInputType
    _max?: EquipoMaxAggregateInputType
  }

  export type EquipoGroupByOutputType = {
    id: number
    nombre: string
    descripcion: string | null
    codigoInventario: string
    estado: string
    fechaCreacion: Date
    fechaActualizacion: Date
    _count: EquipoCountAggregateOutputType | null
    _avg: EquipoAvgAggregateOutputType | null
    _sum: EquipoSumAggregateOutputType | null
    _min: EquipoMinAggregateOutputType | null
    _max: EquipoMaxAggregateOutputType | null
  }

  type GetEquipoGroupByPayload<T extends EquipoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EquipoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EquipoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EquipoGroupByOutputType[P]>
            : GetScalarType<T[P], EquipoGroupByOutputType[P]>
        }
      >
    >


  export type EquipoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    descripcion?: boolean
    codigoInventario?: boolean
    estado?: boolean
    fechaCreacion?: boolean
    fechaActualizacion?: boolean
    prestamos?: boolean | Equipo$prestamosArgs<ExtArgs>
    _count?: boolean | EquipoCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["equipo"]>

  export type EquipoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    descripcion?: boolean
    codigoInventario?: boolean
    estado?: boolean
    fechaCreacion?: boolean
    fechaActualizacion?: boolean
  }, ExtArgs["result"]["equipo"]>

  export type EquipoSelectScalar = {
    id?: boolean
    nombre?: boolean
    descripcion?: boolean
    codigoInventario?: boolean
    estado?: boolean
    fechaCreacion?: boolean
    fechaActualizacion?: boolean
  }

  export type EquipoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    prestamos?: boolean | Equipo$prestamosArgs<ExtArgs>
    _count?: boolean | EquipoCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type EquipoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $EquipoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Equipo"
    objects: {
      prestamos: Prisma.$PrestamoPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nombre: string
      descripcion: string | null
      codigoInventario: string
      estado: string
      fechaCreacion: Date
      fechaActualizacion: Date
    }, ExtArgs["result"]["equipo"]>
    composites: {}
  }

  type EquipoGetPayload<S extends boolean | null | undefined | EquipoDefaultArgs> = $Result.GetResult<Prisma.$EquipoPayload, S>

  type EquipoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<EquipoFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: EquipoCountAggregateInputType | true
    }

  export interface EquipoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Equipo'], meta: { name: 'Equipo' } }
    /**
     * Find zero or one Equipo that matches the filter.
     * @param {EquipoFindUniqueArgs} args - Arguments to find a Equipo
     * @example
     * // Get one Equipo
     * const equipo = await prisma.equipo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EquipoFindUniqueArgs>(args: SelectSubset<T, EquipoFindUniqueArgs<ExtArgs>>): Prisma__EquipoClient<$Result.GetResult<Prisma.$EquipoPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Equipo that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {EquipoFindUniqueOrThrowArgs} args - Arguments to find a Equipo
     * @example
     * // Get one Equipo
     * const equipo = await prisma.equipo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EquipoFindUniqueOrThrowArgs>(args: SelectSubset<T, EquipoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EquipoClient<$Result.GetResult<Prisma.$EquipoPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Equipo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipoFindFirstArgs} args - Arguments to find a Equipo
     * @example
     * // Get one Equipo
     * const equipo = await prisma.equipo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EquipoFindFirstArgs>(args?: SelectSubset<T, EquipoFindFirstArgs<ExtArgs>>): Prisma__EquipoClient<$Result.GetResult<Prisma.$EquipoPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Equipo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipoFindFirstOrThrowArgs} args - Arguments to find a Equipo
     * @example
     * // Get one Equipo
     * const equipo = await prisma.equipo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EquipoFindFirstOrThrowArgs>(args?: SelectSubset<T, EquipoFindFirstOrThrowArgs<ExtArgs>>): Prisma__EquipoClient<$Result.GetResult<Prisma.$EquipoPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Equipos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Equipos
     * const equipos = await prisma.equipo.findMany()
     * 
     * // Get first 10 Equipos
     * const equipos = await prisma.equipo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const equipoWithIdOnly = await prisma.equipo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EquipoFindManyArgs>(args?: SelectSubset<T, EquipoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EquipoPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Equipo.
     * @param {EquipoCreateArgs} args - Arguments to create a Equipo.
     * @example
     * // Create one Equipo
     * const Equipo = await prisma.equipo.create({
     *   data: {
     *     // ... data to create a Equipo
     *   }
     * })
     * 
     */
    create<T extends EquipoCreateArgs>(args: SelectSubset<T, EquipoCreateArgs<ExtArgs>>): Prisma__EquipoClient<$Result.GetResult<Prisma.$EquipoPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Equipos.
     * @param {EquipoCreateManyArgs} args - Arguments to create many Equipos.
     * @example
     * // Create many Equipos
     * const equipo = await prisma.equipo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EquipoCreateManyArgs>(args?: SelectSubset<T, EquipoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Equipos and returns the data saved in the database.
     * @param {EquipoCreateManyAndReturnArgs} args - Arguments to create many Equipos.
     * @example
     * // Create many Equipos
     * const equipo = await prisma.equipo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Equipos and only return the `id`
     * const equipoWithIdOnly = await prisma.equipo.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EquipoCreateManyAndReturnArgs>(args?: SelectSubset<T, EquipoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EquipoPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Equipo.
     * @param {EquipoDeleteArgs} args - Arguments to delete one Equipo.
     * @example
     * // Delete one Equipo
     * const Equipo = await prisma.equipo.delete({
     *   where: {
     *     // ... filter to delete one Equipo
     *   }
     * })
     * 
     */
    delete<T extends EquipoDeleteArgs>(args: SelectSubset<T, EquipoDeleteArgs<ExtArgs>>): Prisma__EquipoClient<$Result.GetResult<Prisma.$EquipoPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Equipo.
     * @param {EquipoUpdateArgs} args - Arguments to update one Equipo.
     * @example
     * // Update one Equipo
     * const equipo = await prisma.equipo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EquipoUpdateArgs>(args: SelectSubset<T, EquipoUpdateArgs<ExtArgs>>): Prisma__EquipoClient<$Result.GetResult<Prisma.$EquipoPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Equipos.
     * @param {EquipoDeleteManyArgs} args - Arguments to filter Equipos to delete.
     * @example
     * // Delete a few Equipos
     * const { count } = await prisma.equipo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EquipoDeleteManyArgs>(args?: SelectSubset<T, EquipoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Equipos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Equipos
     * const equipo = await prisma.equipo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EquipoUpdateManyArgs>(args: SelectSubset<T, EquipoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Equipo.
     * @param {EquipoUpsertArgs} args - Arguments to update or create a Equipo.
     * @example
     * // Update or create a Equipo
     * const equipo = await prisma.equipo.upsert({
     *   create: {
     *     // ... data to create a Equipo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Equipo we want to update
     *   }
     * })
     */
    upsert<T extends EquipoUpsertArgs>(args: SelectSubset<T, EquipoUpsertArgs<ExtArgs>>): Prisma__EquipoClient<$Result.GetResult<Prisma.$EquipoPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Equipos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipoCountArgs} args - Arguments to filter Equipos to count.
     * @example
     * // Count the number of Equipos
     * const count = await prisma.equipo.count({
     *   where: {
     *     // ... the filter for the Equipos we want to count
     *   }
     * })
    **/
    count<T extends EquipoCountArgs>(
      args?: Subset<T, EquipoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EquipoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Equipo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends EquipoAggregateArgs>(args: Subset<T, EquipoAggregateArgs>): Prisma.PrismaPromise<GetEquipoAggregateType<T>>

    /**
     * Group by Equipo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EquipoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends EquipoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EquipoGroupByArgs['orderBy'] }
        : { orderBy?: EquipoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EquipoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEquipoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Equipo model
   */
  readonly fields: EquipoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Equipo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EquipoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    prestamos<T extends Equipo$prestamosArgs<ExtArgs> = {}>(args?: Subset<T, Equipo$prestamosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrestamoPayload<ExtArgs>, T, "findMany"> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Equipo model
   */ 
  interface EquipoFieldRefs {
    readonly id: FieldRef<"Equipo", 'Int'>
    readonly nombre: FieldRef<"Equipo", 'String'>
    readonly descripcion: FieldRef<"Equipo", 'String'>
    readonly codigoInventario: FieldRef<"Equipo", 'String'>
    readonly estado: FieldRef<"Equipo", 'String'>
    readonly fechaCreacion: FieldRef<"Equipo", 'DateTime'>
    readonly fechaActualizacion: FieldRef<"Equipo", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Equipo findUnique
   */
  export type EquipoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipo
     */
    select?: EquipoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EquipoInclude<ExtArgs> | null
    /**
     * Filter, which Equipo to fetch.
     */
    where: EquipoWhereUniqueInput
  }

  /**
   * Equipo findUniqueOrThrow
   */
  export type EquipoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipo
     */
    select?: EquipoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EquipoInclude<ExtArgs> | null
    /**
     * Filter, which Equipo to fetch.
     */
    where: EquipoWhereUniqueInput
  }

  /**
   * Equipo findFirst
   */
  export type EquipoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipo
     */
    select?: EquipoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EquipoInclude<ExtArgs> | null
    /**
     * Filter, which Equipo to fetch.
     */
    where?: EquipoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Equipos to fetch.
     */
    orderBy?: EquipoOrderByWithRelationInput | EquipoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Equipos.
     */
    cursor?: EquipoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Equipos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Equipos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Equipos.
     */
    distinct?: EquipoScalarFieldEnum | EquipoScalarFieldEnum[]
  }

  /**
   * Equipo findFirstOrThrow
   */
  export type EquipoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipo
     */
    select?: EquipoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EquipoInclude<ExtArgs> | null
    /**
     * Filter, which Equipo to fetch.
     */
    where?: EquipoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Equipos to fetch.
     */
    orderBy?: EquipoOrderByWithRelationInput | EquipoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Equipos.
     */
    cursor?: EquipoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Equipos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Equipos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Equipos.
     */
    distinct?: EquipoScalarFieldEnum | EquipoScalarFieldEnum[]
  }

  /**
   * Equipo findMany
   */
  export type EquipoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipo
     */
    select?: EquipoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EquipoInclude<ExtArgs> | null
    /**
     * Filter, which Equipos to fetch.
     */
    where?: EquipoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Equipos to fetch.
     */
    orderBy?: EquipoOrderByWithRelationInput | EquipoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Equipos.
     */
    cursor?: EquipoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Equipos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Equipos.
     */
    skip?: number
    distinct?: EquipoScalarFieldEnum | EquipoScalarFieldEnum[]
  }

  /**
   * Equipo create
   */
  export type EquipoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipo
     */
    select?: EquipoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EquipoInclude<ExtArgs> | null
    /**
     * The data needed to create a Equipo.
     */
    data: XOR<EquipoCreateInput, EquipoUncheckedCreateInput>
  }

  /**
   * Equipo createMany
   */
  export type EquipoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Equipos.
     */
    data: EquipoCreateManyInput | EquipoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Equipo createManyAndReturn
   */
  export type EquipoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipo
     */
    select?: EquipoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Equipos.
     */
    data: EquipoCreateManyInput | EquipoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Equipo update
   */
  export type EquipoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipo
     */
    select?: EquipoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EquipoInclude<ExtArgs> | null
    /**
     * The data needed to update a Equipo.
     */
    data: XOR<EquipoUpdateInput, EquipoUncheckedUpdateInput>
    /**
     * Choose, which Equipo to update.
     */
    where: EquipoWhereUniqueInput
  }

  /**
   * Equipo updateMany
   */
  export type EquipoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Equipos.
     */
    data: XOR<EquipoUpdateManyMutationInput, EquipoUncheckedUpdateManyInput>
    /**
     * Filter which Equipos to update
     */
    where?: EquipoWhereInput
  }

  /**
   * Equipo upsert
   */
  export type EquipoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipo
     */
    select?: EquipoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EquipoInclude<ExtArgs> | null
    /**
     * The filter to search for the Equipo to update in case it exists.
     */
    where: EquipoWhereUniqueInput
    /**
     * In case the Equipo found by the `where` argument doesn't exist, create a new Equipo with this data.
     */
    create: XOR<EquipoCreateInput, EquipoUncheckedCreateInput>
    /**
     * In case the Equipo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EquipoUpdateInput, EquipoUncheckedUpdateInput>
  }

  /**
   * Equipo delete
   */
  export type EquipoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipo
     */
    select?: EquipoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EquipoInclude<ExtArgs> | null
    /**
     * Filter which Equipo to delete.
     */
    where: EquipoWhereUniqueInput
  }

  /**
   * Equipo deleteMany
   */
  export type EquipoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Equipos to delete
     */
    where?: EquipoWhereInput
  }

  /**
   * Equipo.prestamos
   */
  export type Equipo$prestamosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prestamo
     */
    select?: PrestamoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrestamoInclude<ExtArgs> | null
    where?: PrestamoWhereInput
    orderBy?: PrestamoOrderByWithRelationInput | PrestamoOrderByWithRelationInput[]
    cursor?: PrestamoWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PrestamoScalarFieldEnum | PrestamoScalarFieldEnum[]
  }

  /**
   * Equipo without action
   */
  export type EquipoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Equipo
     */
    select?: EquipoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: EquipoInclude<ExtArgs> | null
  }


  /**
   * Model Prestamo
   */

  export type AggregatePrestamo = {
    _count: PrestamoCountAggregateOutputType | null
    _avg: PrestamoAvgAggregateOutputType | null
    _sum: PrestamoSumAggregateOutputType | null
    _min: PrestamoMinAggregateOutputType | null
    _max: PrestamoMaxAggregateOutputType | null
  }

  export type PrestamoAvgAggregateOutputType = {
    id: number | null
    usuarioId: number | null
    equipoId: number | null
    registradoPorId: number | null
    recibidoPorId: number | null
  }

  export type PrestamoSumAggregateOutputType = {
    id: number | null
    usuarioId: number | null
    equipoId: number | null
    registradoPorId: number | null
    recibidoPorId: number | null
  }

  export type PrestamoMinAggregateOutputType = {
    id: number | null
    usuarioId: number | null
    equipoId: number | null
    fechaPrestamo: Date | null
    fechaDevolucionPrevista: Date | null
    fechaDevolucionReal: Date | null
    estado: string | null
    observacionesPrestamo: string | null
    observacionesDevolucion: string | null
    registradoPorId: number | null
    recibidoPorId: number | null
    fechaCreacion: Date | null
    fechaActualizacion: Date | null
  }

  export type PrestamoMaxAggregateOutputType = {
    id: number | null
    usuarioId: number | null
    equipoId: number | null
    fechaPrestamo: Date | null
    fechaDevolucionPrevista: Date | null
    fechaDevolucionReal: Date | null
    estado: string | null
    observacionesPrestamo: string | null
    observacionesDevolucion: string | null
    registradoPorId: number | null
    recibidoPorId: number | null
    fechaCreacion: Date | null
    fechaActualizacion: Date | null
  }

  export type PrestamoCountAggregateOutputType = {
    id: number
    usuarioId: number
    equipoId: number
    fechaPrestamo: number
    fechaDevolucionPrevista: number
    fechaDevolucionReal: number
    estado: number
    observacionesPrestamo: number
    observacionesDevolucion: number
    registradoPorId: number
    recibidoPorId: number
    fechaCreacion: number
    fechaActualizacion: number
    _all: number
  }


  export type PrestamoAvgAggregateInputType = {
    id?: true
    usuarioId?: true
    equipoId?: true
    registradoPorId?: true
    recibidoPorId?: true
  }

  export type PrestamoSumAggregateInputType = {
    id?: true
    usuarioId?: true
    equipoId?: true
    registradoPorId?: true
    recibidoPorId?: true
  }

  export type PrestamoMinAggregateInputType = {
    id?: true
    usuarioId?: true
    equipoId?: true
    fechaPrestamo?: true
    fechaDevolucionPrevista?: true
    fechaDevolucionReal?: true
    estado?: true
    observacionesPrestamo?: true
    observacionesDevolucion?: true
    registradoPorId?: true
    recibidoPorId?: true
    fechaCreacion?: true
    fechaActualizacion?: true
  }

  export type PrestamoMaxAggregateInputType = {
    id?: true
    usuarioId?: true
    equipoId?: true
    fechaPrestamo?: true
    fechaDevolucionPrevista?: true
    fechaDevolucionReal?: true
    estado?: true
    observacionesPrestamo?: true
    observacionesDevolucion?: true
    registradoPorId?: true
    recibidoPorId?: true
    fechaCreacion?: true
    fechaActualizacion?: true
  }

  export type PrestamoCountAggregateInputType = {
    id?: true
    usuarioId?: true
    equipoId?: true
    fechaPrestamo?: true
    fechaDevolucionPrevista?: true
    fechaDevolucionReal?: true
    estado?: true
    observacionesPrestamo?: true
    observacionesDevolucion?: true
    registradoPorId?: true
    recibidoPorId?: true
    fechaCreacion?: true
    fechaActualizacion?: true
    _all?: true
  }

  export type PrestamoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Prestamo to aggregate.
     */
    where?: PrestamoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prestamos to fetch.
     */
    orderBy?: PrestamoOrderByWithRelationInput | PrestamoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PrestamoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prestamos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prestamos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Prestamos
    **/
    _count?: true | PrestamoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PrestamoAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PrestamoSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PrestamoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PrestamoMaxAggregateInputType
  }

  export type GetPrestamoAggregateType<T extends PrestamoAggregateArgs> = {
        [P in keyof T & keyof AggregatePrestamo]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePrestamo[P]>
      : GetScalarType<T[P], AggregatePrestamo[P]>
  }




  export type PrestamoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PrestamoWhereInput
    orderBy?: PrestamoOrderByWithAggregationInput | PrestamoOrderByWithAggregationInput[]
    by: PrestamoScalarFieldEnum[] | PrestamoScalarFieldEnum
    having?: PrestamoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PrestamoCountAggregateInputType | true
    _avg?: PrestamoAvgAggregateInputType
    _sum?: PrestamoSumAggregateInputType
    _min?: PrestamoMinAggregateInputType
    _max?: PrestamoMaxAggregateInputType
  }

  export type PrestamoGroupByOutputType = {
    id: number
    usuarioId: number
    equipoId: number
    fechaPrestamo: Date
    fechaDevolucionPrevista: Date | null
    fechaDevolucionReal: Date | null
    estado: string
    observacionesPrestamo: string | null
    observacionesDevolucion: string | null
    registradoPorId: number | null
    recibidoPorId: number | null
    fechaCreacion: Date
    fechaActualizacion: Date
    _count: PrestamoCountAggregateOutputType | null
    _avg: PrestamoAvgAggregateOutputType | null
    _sum: PrestamoSumAggregateOutputType | null
    _min: PrestamoMinAggregateOutputType | null
    _max: PrestamoMaxAggregateOutputType | null
  }

  type GetPrestamoGroupByPayload<T extends PrestamoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PrestamoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PrestamoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PrestamoGroupByOutputType[P]>
            : GetScalarType<T[P], PrestamoGroupByOutputType[P]>
        }
      >
    >


  export type PrestamoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    usuarioId?: boolean
    equipoId?: boolean
    fechaPrestamo?: boolean
    fechaDevolucionPrevista?: boolean
    fechaDevolucionReal?: boolean
    estado?: boolean
    observacionesPrestamo?: boolean
    observacionesDevolucion?: boolean
    registradoPorId?: boolean
    recibidoPorId?: boolean
    fechaCreacion?: boolean
    fechaActualizacion?: boolean
    usuario?: boolean | UserDefaultArgs<ExtArgs>
    equipo?: boolean | EquipoDefaultArgs<ExtArgs>
    registradoPor?: boolean | Prestamo$registradoPorArgs<ExtArgs>
    recibidoPor?: boolean | Prestamo$recibidoPorArgs<ExtArgs>
  }, ExtArgs["result"]["prestamo"]>

  export type PrestamoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    usuarioId?: boolean
    equipoId?: boolean
    fechaPrestamo?: boolean
    fechaDevolucionPrevista?: boolean
    fechaDevolucionReal?: boolean
    estado?: boolean
    observacionesPrestamo?: boolean
    observacionesDevolucion?: boolean
    registradoPorId?: boolean
    recibidoPorId?: boolean
    fechaCreacion?: boolean
    fechaActualizacion?: boolean
    usuario?: boolean | UserDefaultArgs<ExtArgs>
    equipo?: boolean | EquipoDefaultArgs<ExtArgs>
    registradoPor?: boolean | Prestamo$registradoPorArgs<ExtArgs>
    recibidoPor?: boolean | Prestamo$recibidoPorArgs<ExtArgs>
  }, ExtArgs["result"]["prestamo"]>

  export type PrestamoSelectScalar = {
    id?: boolean
    usuarioId?: boolean
    equipoId?: boolean
    fechaPrestamo?: boolean
    fechaDevolucionPrevista?: boolean
    fechaDevolucionReal?: boolean
    estado?: boolean
    observacionesPrestamo?: boolean
    observacionesDevolucion?: boolean
    registradoPorId?: boolean
    recibidoPorId?: boolean
    fechaCreacion?: boolean
    fechaActualizacion?: boolean
  }

  export type PrestamoInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UserDefaultArgs<ExtArgs>
    equipo?: boolean | EquipoDefaultArgs<ExtArgs>
    registradoPor?: boolean | Prestamo$registradoPorArgs<ExtArgs>
    recibidoPor?: boolean | Prestamo$recibidoPorArgs<ExtArgs>
  }
  export type PrestamoIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UserDefaultArgs<ExtArgs>
    equipo?: boolean | EquipoDefaultArgs<ExtArgs>
    registradoPor?: boolean | Prestamo$registradoPorArgs<ExtArgs>
    recibidoPor?: boolean | Prestamo$recibidoPorArgs<ExtArgs>
  }

  export type $PrestamoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Prestamo"
    objects: {
      usuario: Prisma.$UserPayload<ExtArgs>
      equipo: Prisma.$EquipoPayload<ExtArgs>
      registradoPor: Prisma.$UserPayload<ExtArgs> | null
      recibidoPor: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      usuarioId: number
      equipoId: number
      fechaPrestamo: Date
      fechaDevolucionPrevista: Date | null
      fechaDevolucionReal: Date | null
      estado: string
      observacionesPrestamo: string | null
      observacionesDevolucion: string | null
      registradoPorId: number | null
      recibidoPorId: number | null
      fechaCreacion: Date
      fechaActualizacion: Date
    }, ExtArgs["result"]["prestamo"]>
    composites: {}
  }

  type PrestamoGetPayload<S extends boolean | null | undefined | PrestamoDefaultArgs> = $Result.GetResult<Prisma.$PrestamoPayload, S>

  type PrestamoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = 
    Omit<PrestamoFindManyArgs, 'select' | 'include' | 'distinct'> & {
      select?: PrestamoCountAggregateInputType | true
    }

  export interface PrestamoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Prestamo'], meta: { name: 'Prestamo' } }
    /**
     * Find zero or one Prestamo that matches the filter.
     * @param {PrestamoFindUniqueArgs} args - Arguments to find a Prestamo
     * @example
     * // Get one Prestamo
     * const prestamo = await prisma.prestamo.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PrestamoFindUniqueArgs>(args: SelectSubset<T, PrestamoFindUniqueArgs<ExtArgs>>): Prisma__PrestamoClient<$Result.GetResult<Prisma.$PrestamoPayload<ExtArgs>, T, "findUnique"> | null, null, ExtArgs>

    /**
     * Find one Prestamo that matches the filter or throw an error with `error.code='P2025'` 
     * if no matches were found.
     * @param {PrestamoFindUniqueOrThrowArgs} args - Arguments to find a Prestamo
     * @example
     * // Get one Prestamo
     * const prestamo = await prisma.prestamo.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PrestamoFindUniqueOrThrowArgs>(args: SelectSubset<T, PrestamoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PrestamoClient<$Result.GetResult<Prisma.$PrestamoPayload<ExtArgs>, T, "findUniqueOrThrow">, never, ExtArgs>

    /**
     * Find the first Prestamo that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrestamoFindFirstArgs} args - Arguments to find a Prestamo
     * @example
     * // Get one Prestamo
     * const prestamo = await prisma.prestamo.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PrestamoFindFirstArgs>(args?: SelectSubset<T, PrestamoFindFirstArgs<ExtArgs>>): Prisma__PrestamoClient<$Result.GetResult<Prisma.$PrestamoPayload<ExtArgs>, T, "findFirst"> | null, null, ExtArgs>

    /**
     * Find the first Prestamo that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrestamoFindFirstOrThrowArgs} args - Arguments to find a Prestamo
     * @example
     * // Get one Prestamo
     * const prestamo = await prisma.prestamo.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PrestamoFindFirstOrThrowArgs>(args?: SelectSubset<T, PrestamoFindFirstOrThrowArgs<ExtArgs>>): Prisma__PrestamoClient<$Result.GetResult<Prisma.$PrestamoPayload<ExtArgs>, T, "findFirstOrThrow">, never, ExtArgs>

    /**
     * Find zero or more Prestamos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrestamoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Prestamos
     * const prestamos = await prisma.prestamo.findMany()
     * 
     * // Get first 10 Prestamos
     * const prestamos = await prisma.prestamo.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const prestamoWithIdOnly = await prisma.prestamo.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PrestamoFindManyArgs>(args?: SelectSubset<T, PrestamoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrestamoPayload<ExtArgs>, T, "findMany">>

    /**
     * Create a Prestamo.
     * @param {PrestamoCreateArgs} args - Arguments to create a Prestamo.
     * @example
     * // Create one Prestamo
     * const Prestamo = await prisma.prestamo.create({
     *   data: {
     *     // ... data to create a Prestamo
     *   }
     * })
     * 
     */
    create<T extends PrestamoCreateArgs>(args: SelectSubset<T, PrestamoCreateArgs<ExtArgs>>): Prisma__PrestamoClient<$Result.GetResult<Prisma.$PrestamoPayload<ExtArgs>, T, "create">, never, ExtArgs>

    /**
     * Create many Prestamos.
     * @param {PrestamoCreateManyArgs} args - Arguments to create many Prestamos.
     * @example
     * // Create many Prestamos
     * const prestamo = await prisma.prestamo.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PrestamoCreateManyArgs>(args?: SelectSubset<T, PrestamoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Prestamos and returns the data saved in the database.
     * @param {PrestamoCreateManyAndReturnArgs} args - Arguments to create many Prestamos.
     * @example
     * // Create many Prestamos
     * const prestamo = await prisma.prestamo.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Prestamos and only return the `id`
     * const prestamoWithIdOnly = await prisma.prestamo.createManyAndReturn({ 
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PrestamoCreateManyAndReturnArgs>(args?: SelectSubset<T, PrestamoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PrestamoPayload<ExtArgs>, T, "createManyAndReturn">>

    /**
     * Delete a Prestamo.
     * @param {PrestamoDeleteArgs} args - Arguments to delete one Prestamo.
     * @example
     * // Delete one Prestamo
     * const Prestamo = await prisma.prestamo.delete({
     *   where: {
     *     // ... filter to delete one Prestamo
     *   }
     * })
     * 
     */
    delete<T extends PrestamoDeleteArgs>(args: SelectSubset<T, PrestamoDeleteArgs<ExtArgs>>): Prisma__PrestamoClient<$Result.GetResult<Prisma.$PrestamoPayload<ExtArgs>, T, "delete">, never, ExtArgs>

    /**
     * Update one Prestamo.
     * @param {PrestamoUpdateArgs} args - Arguments to update one Prestamo.
     * @example
     * // Update one Prestamo
     * const prestamo = await prisma.prestamo.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PrestamoUpdateArgs>(args: SelectSubset<T, PrestamoUpdateArgs<ExtArgs>>): Prisma__PrestamoClient<$Result.GetResult<Prisma.$PrestamoPayload<ExtArgs>, T, "update">, never, ExtArgs>

    /**
     * Delete zero or more Prestamos.
     * @param {PrestamoDeleteManyArgs} args - Arguments to filter Prestamos to delete.
     * @example
     * // Delete a few Prestamos
     * const { count } = await prisma.prestamo.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PrestamoDeleteManyArgs>(args?: SelectSubset<T, PrestamoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Prestamos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrestamoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Prestamos
     * const prestamo = await prisma.prestamo.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PrestamoUpdateManyArgs>(args: SelectSubset<T, PrestamoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Prestamo.
     * @param {PrestamoUpsertArgs} args - Arguments to update or create a Prestamo.
     * @example
     * // Update or create a Prestamo
     * const prestamo = await prisma.prestamo.upsert({
     *   create: {
     *     // ... data to create a Prestamo
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Prestamo we want to update
     *   }
     * })
     */
    upsert<T extends PrestamoUpsertArgs>(args: SelectSubset<T, PrestamoUpsertArgs<ExtArgs>>): Prisma__PrestamoClient<$Result.GetResult<Prisma.$PrestamoPayload<ExtArgs>, T, "upsert">, never, ExtArgs>


    /**
     * Count the number of Prestamos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrestamoCountArgs} args - Arguments to filter Prestamos to count.
     * @example
     * // Count the number of Prestamos
     * const count = await prisma.prestamo.count({
     *   where: {
     *     // ... the filter for the Prestamos we want to count
     *   }
     * })
    **/
    count<T extends PrestamoCountArgs>(
      args?: Subset<T, PrestamoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PrestamoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Prestamo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrestamoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PrestamoAggregateArgs>(args: Subset<T, PrestamoAggregateArgs>): Prisma.PrismaPromise<GetPrestamoAggregateType<T>>

    /**
     * Group by Prestamo.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PrestamoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PrestamoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PrestamoGroupByArgs['orderBy'] }
        : { orderBy?: PrestamoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PrestamoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPrestamoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Prestamo model
   */
  readonly fields: PrestamoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Prestamo.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PrestamoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    equipo<T extends EquipoDefaultArgs<ExtArgs> = {}>(args?: Subset<T, EquipoDefaultArgs<ExtArgs>>): Prisma__EquipoClient<$Result.GetResult<Prisma.$EquipoPayload<ExtArgs>, T, "findUniqueOrThrow"> | Null, Null, ExtArgs>
    registradoPor<T extends Prestamo$registradoPorArgs<ExtArgs> = {}>(args?: Subset<T, Prestamo$registradoPorArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    recibidoPor<T extends Prestamo$recibidoPorArgs<ExtArgs> = {}>(args?: Subset<T, Prestamo$recibidoPorArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow"> | null, null, ExtArgs>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Prestamo model
   */ 
  interface PrestamoFieldRefs {
    readonly id: FieldRef<"Prestamo", 'Int'>
    readonly usuarioId: FieldRef<"Prestamo", 'Int'>
    readonly equipoId: FieldRef<"Prestamo", 'Int'>
    readonly fechaPrestamo: FieldRef<"Prestamo", 'DateTime'>
    readonly fechaDevolucionPrevista: FieldRef<"Prestamo", 'DateTime'>
    readonly fechaDevolucionReal: FieldRef<"Prestamo", 'DateTime'>
    readonly estado: FieldRef<"Prestamo", 'String'>
    readonly observacionesPrestamo: FieldRef<"Prestamo", 'String'>
    readonly observacionesDevolucion: FieldRef<"Prestamo", 'String'>
    readonly registradoPorId: FieldRef<"Prestamo", 'Int'>
    readonly recibidoPorId: FieldRef<"Prestamo", 'Int'>
    readonly fechaCreacion: FieldRef<"Prestamo", 'DateTime'>
    readonly fechaActualizacion: FieldRef<"Prestamo", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Prestamo findUnique
   */
  export type PrestamoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prestamo
     */
    select?: PrestamoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrestamoInclude<ExtArgs> | null
    /**
     * Filter, which Prestamo to fetch.
     */
    where: PrestamoWhereUniqueInput
  }

  /**
   * Prestamo findUniqueOrThrow
   */
  export type PrestamoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prestamo
     */
    select?: PrestamoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrestamoInclude<ExtArgs> | null
    /**
     * Filter, which Prestamo to fetch.
     */
    where: PrestamoWhereUniqueInput
  }

  /**
   * Prestamo findFirst
   */
  export type PrestamoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prestamo
     */
    select?: PrestamoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrestamoInclude<ExtArgs> | null
    /**
     * Filter, which Prestamo to fetch.
     */
    where?: PrestamoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prestamos to fetch.
     */
    orderBy?: PrestamoOrderByWithRelationInput | PrestamoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Prestamos.
     */
    cursor?: PrestamoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prestamos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prestamos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Prestamos.
     */
    distinct?: PrestamoScalarFieldEnum | PrestamoScalarFieldEnum[]
  }

  /**
   * Prestamo findFirstOrThrow
   */
  export type PrestamoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prestamo
     */
    select?: PrestamoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrestamoInclude<ExtArgs> | null
    /**
     * Filter, which Prestamo to fetch.
     */
    where?: PrestamoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prestamos to fetch.
     */
    orderBy?: PrestamoOrderByWithRelationInput | PrestamoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Prestamos.
     */
    cursor?: PrestamoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prestamos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prestamos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Prestamos.
     */
    distinct?: PrestamoScalarFieldEnum | PrestamoScalarFieldEnum[]
  }

  /**
   * Prestamo findMany
   */
  export type PrestamoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prestamo
     */
    select?: PrestamoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrestamoInclude<ExtArgs> | null
    /**
     * Filter, which Prestamos to fetch.
     */
    where?: PrestamoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Prestamos to fetch.
     */
    orderBy?: PrestamoOrderByWithRelationInput | PrestamoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Prestamos.
     */
    cursor?: PrestamoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Prestamos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Prestamos.
     */
    skip?: number
    distinct?: PrestamoScalarFieldEnum | PrestamoScalarFieldEnum[]
  }

  /**
   * Prestamo create
   */
  export type PrestamoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prestamo
     */
    select?: PrestamoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrestamoInclude<ExtArgs> | null
    /**
     * The data needed to create a Prestamo.
     */
    data: XOR<PrestamoCreateInput, PrestamoUncheckedCreateInput>
  }

  /**
   * Prestamo createMany
   */
  export type PrestamoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Prestamos.
     */
    data: PrestamoCreateManyInput | PrestamoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Prestamo createManyAndReturn
   */
  export type PrestamoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prestamo
     */
    select?: PrestamoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * The data used to create many Prestamos.
     */
    data: PrestamoCreateManyInput | PrestamoCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrestamoIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Prestamo update
   */
  export type PrestamoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prestamo
     */
    select?: PrestamoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrestamoInclude<ExtArgs> | null
    /**
     * The data needed to update a Prestamo.
     */
    data: XOR<PrestamoUpdateInput, PrestamoUncheckedUpdateInput>
    /**
     * Choose, which Prestamo to update.
     */
    where: PrestamoWhereUniqueInput
  }

  /**
   * Prestamo updateMany
   */
  export type PrestamoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Prestamos.
     */
    data: XOR<PrestamoUpdateManyMutationInput, PrestamoUncheckedUpdateManyInput>
    /**
     * Filter which Prestamos to update
     */
    where?: PrestamoWhereInput
  }

  /**
   * Prestamo upsert
   */
  export type PrestamoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prestamo
     */
    select?: PrestamoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrestamoInclude<ExtArgs> | null
    /**
     * The filter to search for the Prestamo to update in case it exists.
     */
    where: PrestamoWhereUniqueInput
    /**
     * In case the Prestamo found by the `where` argument doesn't exist, create a new Prestamo with this data.
     */
    create: XOR<PrestamoCreateInput, PrestamoUncheckedCreateInput>
    /**
     * In case the Prestamo was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PrestamoUpdateInput, PrestamoUncheckedUpdateInput>
  }

  /**
   * Prestamo delete
   */
  export type PrestamoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prestamo
     */
    select?: PrestamoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrestamoInclude<ExtArgs> | null
    /**
     * Filter which Prestamo to delete.
     */
    where: PrestamoWhereUniqueInput
  }

  /**
   * Prestamo deleteMany
   */
  export type PrestamoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Prestamos to delete
     */
    where?: PrestamoWhereInput
  }

  /**
   * Prestamo.registradoPor
   */
  export type Prestamo$registradoPorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Prestamo.recibidoPor
   */
  export type Prestamo$recibidoPorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Prestamo without action
   */
  export type PrestamoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Prestamo
     */
    select?: PrestamoSelect<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PrestamoInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    usuario: 'usuario',
    password: 'password',
    nombre: 'nombre',
    rol: 'rol',
    activo: 'activo'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const EquipoScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    descripcion: 'descripcion',
    codigoInventario: 'codigoInventario',
    estado: 'estado',
    fechaCreacion: 'fechaCreacion',
    fechaActualizacion: 'fechaActualizacion'
  };

  export type EquipoScalarFieldEnum = (typeof EquipoScalarFieldEnum)[keyof typeof EquipoScalarFieldEnum]


  export const PrestamoScalarFieldEnum: {
    id: 'id',
    usuarioId: 'usuarioId',
    equipoId: 'equipoId',
    fechaPrestamo: 'fechaPrestamo',
    fechaDevolucionPrevista: 'fechaDevolucionPrevista',
    fechaDevolucionReal: 'fechaDevolucionReal',
    estado: 'estado',
    observacionesPrestamo: 'observacionesPrestamo',
    observacionesDevolucion: 'observacionesDevolucion',
    registradoPorId: 'registradoPorId',
    recibidoPorId: 'recibidoPorId',
    fechaCreacion: 'fechaCreacion',
    fechaActualizacion: 'fechaActualizacion'
  };

  export type PrestamoScalarFieldEnum = (typeof PrestamoScalarFieldEnum)[keyof typeof PrestamoScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references 
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: IntFilter<"User"> | number
    usuario?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    nombre?: StringFilter<"User"> | string
    rol?: StringFilter<"User"> | string
    activo?: BoolFilter<"User"> | boolean
    prestamos?: PrestamoListRelationFilter
    prestamosRegistrados?: PrestamoListRelationFilter
    prestamosRecibidos?: PrestamoListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    usuario?: SortOrder
    password?: SortOrder
    nombre?: SortOrder
    rol?: SortOrder
    activo?: SortOrder
    prestamos?: PrestamoOrderByRelationAggregateInput
    prestamosRegistrados?: PrestamoOrderByRelationAggregateInput
    prestamosRecibidos?: PrestamoOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    usuario?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password?: StringFilter<"User"> | string
    nombre?: StringFilter<"User"> | string
    rol?: StringFilter<"User"> | string
    activo?: BoolFilter<"User"> | boolean
    prestamos?: PrestamoListRelationFilter
    prestamosRegistrados?: PrestamoListRelationFilter
    prestamosRecibidos?: PrestamoListRelationFilter
  }, "id" | "usuario">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    usuario?: SortOrder
    password?: SortOrder
    nombre?: SortOrder
    rol?: SortOrder
    activo?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"User"> | number
    usuario?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    nombre?: StringWithAggregatesFilter<"User"> | string
    rol?: StringWithAggregatesFilter<"User"> | string
    activo?: BoolWithAggregatesFilter<"User"> | boolean
  }

  export type EquipoWhereInput = {
    AND?: EquipoWhereInput | EquipoWhereInput[]
    OR?: EquipoWhereInput[]
    NOT?: EquipoWhereInput | EquipoWhereInput[]
    id?: IntFilter<"Equipo"> | number
    nombre?: StringFilter<"Equipo"> | string
    descripcion?: StringNullableFilter<"Equipo"> | string | null
    codigoInventario?: StringFilter<"Equipo"> | string
    estado?: StringFilter<"Equipo"> | string
    fechaCreacion?: DateTimeFilter<"Equipo"> | Date | string
    fechaActualizacion?: DateTimeFilter<"Equipo"> | Date | string
    prestamos?: PrestamoListRelationFilter
  }

  export type EquipoOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrderInput | SortOrder
    codigoInventario?: SortOrder
    estado?: SortOrder
    fechaCreacion?: SortOrder
    fechaActualizacion?: SortOrder
    prestamos?: PrestamoOrderByRelationAggregateInput
  }

  export type EquipoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    codigoInventario?: string
    AND?: EquipoWhereInput | EquipoWhereInput[]
    OR?: EquipoWhereInput[]
    NOT?: EquipoWhereInput | EquipoWhereInput[]
    nombre?: StringFilter<"Equipo"> | string
    descripcion?: StringNullableFilter<"Equipo"> | string | null
    estado?: StringFilter<"Equipo"> | string
    fechaCreacion?: DateTimeFilter<"Equipo"> | Date | string
    fechaActualizacion?: DateTimeFilter<"Equipo"> | Date | string
    prestamos?: PrestamoListRelationFilter
  }, "id" | "codigoInventario">

  export type EquipoOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrderInput | SortOrder
    codigoInventario?: SortOrder
    estado?: SortOrder
    fechaCreacion?: SortOrder
    fechaActualizacion?: SortOrder
    _count?: EquipoCountOrderByAggregateInput
    _avg?: EquipoAvgOrderByAggregateInput
    _max?: EquipoMaxOrderByAggregateInput
    _min?: EquipoMinOrderByAggregateInput
    _sum?: EquipoSumOrderByAggregateInput
  }

  export type EquipoScalarWhereWithAggregatesInput = {
    AND?: EquipoScalarWhereWithAggregatesInput | EquipoScalarWhereWithAggregatesInput[]
    OR?: EquipoScalarWhereWithAggregatesInput[]
    NOT?: EquipoScalarWhereWithAggregatesInput | EquipoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Equipo"> | number
    nombre?: StringWithAggregatesFilter<"Equipo"> | string
    descripcion?: StringNullableWithAggregatesFilter<"Equipo"> | string | null
    codigoInventario?: StringWithAggregatesFilter<"Equipo"> | string
    estado?: StringWithAggregatesFilter<"Equipo"> | string
    fechaCreacion?: DateTimeWithAggregatesFilter<"Equipo"> | Date | string
    fechaActualizacion?: DateTimeWithAggregatesFilter<"Equipo"> | Date | string
  }

  export type PrestamoWhereInput = {
    AND?: PrestamoWhereInput | PrestamoWhereInput[]
    OR?: PrestamoWhereInput[]
    NOT?: PrestamoWhereInput | PrestamoWhereInput[]
    id?: IntFilter<"Prestamo"> | number
    usuarioId?: IntFilter<"Prestamo"> | number
    equipoId?: IntFilter<"Prestamo"> | number
    fechaPrestamo?: DateTimeFilter<"Prestamo"> | Date | string
    fechaDevolucionPrevista?: DateTimeNullableFilter<"Prestamo"> | Date | string | null
    fechaDevolucionReal?: DateTimeNullableFilter<"Prestamo"> | Date | string | null
    estado?: StringFilter<"Prestamo"> | string
    observacionesPrestamo?: StringNullableFilter<"Prestamo"> | string | null
    observacionesDevolucion?: StringNullableFilter<"Prestamo"> | string | null
    registradoPorId?: IntNullableFilter<"Prestamo"> | number | null
    recibidoPorId?: IntNullableFilter<"Prestamo"> | number | null
    fechaCreacion?: DateTimeFilter<"Prestamo"> | Date | string
    fechaActualizacion?: DateTimeFilter<"Prestamo"> | Date | string
    usuario?: XOR<UserRelationFilter, UserWhereInput>
    equipo?: XOR<EquipoRelationFilter, EquipoWhereInput>
    registradoPor?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    recibidoPor?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }

  export type PrestamoOrderByWithRelationInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    equipoId?: SortOrder
    fechaPrestamo?: SortOrder
    fechaDevolucionPrevista?: SortOrderInput | SortOrder
    fechaDevolucionReal?: SortOrderInput | SortOrder
    estado?: SortOrder
    observacionesPrestamo?: SortOrderInput | SortOrder
    observacionesDevolucion?: SortOrderInput | SortOrder
    registradoPorId?: SortOrderInput | SortOrder
    recibidoPorId?: SortOrderInput | SortOrder
    fechaCreacion?: SortOrder
    fechaActualizacion?: SortOrder
    usuario?: UserOrderByWithRelationInput
    equipo?: EquipoOrderByWithRelationInput
    registradoPor?: UserOrderByWithRelationInput
    recibidoPor?: UserOrderByWithRelationInput
  }

  export type PrestamoWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: PrestamoWhereInput | PrestamoWhereInput[]
    OR?: PrestamoWhereInput[]
    NOT?: PrestamoWhereInput | PrestamoWhereInput[]
    usuarioId?: IntFilter<"Prestamo"> | number
    equipoId?: IntFilter<"Prestamo"> | number
    fechaPrestamo?: DateTimeFilter<"Prestamo"> | Date | string
    fechaDevolucionPrevista?: DateTimeNullableFilter<"Prestamo"> | Date | string | null
    fechaDevolucionReal?: DateTimeNullableFilter<"Prestamo"> | Date | string | null
    estado?: StringFilter<"Prestamo"> | string
    observacionesPrestamo?: StringNullableFilter<"Prestamo"> | string | null
    observacionesDevolucion?: StringNullableFilter<"Prestamo"> | string | null
    registradoPorId?: IntNullableFilter<"Prestamo"> | number | null
    recibidoPorId?: IntNullableFilter<"Prestamo"> | number | null
    fechaCreacion?: DateTimeFilter<"Prestamo"> | Date | string
    fechaActualizacion?: DateTimeFilter<"Prestamo"> | Date | string
    usuario?: XOR<UserRelationFilter, UserWhereInput>
    equipo?: XOR<EquipoRelationFilter, EquipoWhereInput>
    registradoPor?: XOR<UserNullableRelationFilter, UserWhereInput> | null
    recibidoPor?: XOR<UserNullableRelationFilter, UserWhereInput> | null
  }, "id">

  export type PrestamoOrderByWithAggregationInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    equipoId?: SortOrder
    fechaPrestamo?: SortOrder
    fechaDevolucionPrevista?: SortOrderInput | SortOrder
    fechaDevolucionReal?: SortOrderInput | SortOrder
    estado?: SortOrder
    observacionesPrestamo?: SortOrderInput | SortOrder
    observacionesDevolucion?: SortOrderInput | SortOrder
    registradoPorId?: SortOrderInput | SortOrder
    recibidoPorId?: SortOrderInput | SortOrder
    fechaCreacion?: SortOrder
    fechaActualizacion?: SortOrder
    _count?: PrestamoCountOrderByAggregateInput
    _avg?: PrestamoAvgOrderByAggregateInput
    _max?: PrestamoMaxOrderByAggregateInput
    _min?: PrestamoMinOrderByAggregateInput
    _sum?: PrestamoSumOrderByAggregateInput
  }

  export type PrestamoScalarWhereWithAggregatesInput = {
    AND?: PrestamoScalarWhereWithAggregatesInput | PrestamoScalarWhereWithAggregatesInput[]
    OR?: PrestamoScalarWhereWithAggregatesInput[]
    NOT?: PrestamoScalarWhereWithAggregatesInput | PrestamoScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Prestamo"> | number
    usuarioId?: IntWithAggregatesFilter<"Prestamo"> | number
    equipoId?: IntWithAggregatesFilter<"Prestamo"> | number
    fechaPrestamo?: DateTimeWithAggregatesFilter<"Prestamo"> | Date | string
    fechaDevolucionPrevista?: DateTimeNullableWithAggregatesFilter<"Prestamo"> | Date | string | null
    fechaDevolucionReal?: DateTimeNullableWithAggregatesFilter<"Prestamo"> | Date | string | null
    estado?: StringWithAggregatesFilter<"Prestamo"> | string
    observacionesPrestamo?: StringNullableWithAggregatesFilter<"Prestamo"> | string | null
    observacionesDevolucion?: StringNullableWithAggregatesFilter<"Prestamo"> | string | null
    registradoPorId?: IntNullableWithAggregatesFilter<"Prestamo"> | number | null
    recibidoPorId?: IntNullableWithAggregatesFilter<"Prestamo"> | number | null
    fechaCreacion?: DateTimeWithAggregatesFilter<"Prestamo"> | Date | string
    fechaActualizacion?: DateTimeWithAggregatesFilter<"Prestamo"> | Date | string
  }

  export type UserCreateInput = {
    usuario: string
    password: string
    nombre: string
    rol?: string
    activo?: boolean
    prestamos?: PrestamoCreateNestedManyWithoutUsuarioInput
    prestamosRegistrados?: PrestamoCreateNestedManyWithoutRegistradoPorInput
    prestamosRecibidos?: PrestamoCreateNestedManyWithoutRecibidoPorInput
  }

  export type UserUncheckedCreateInput = {
    id?: number
    usuario: string
    password: string
    nombre: string
    rol?: string
    activo?: boolean
    prestamos?: PrestamoUncheckedCreateNestedManyWithoutUsuarioInput
    prestamosRegistrados?: PrestamoUncheckedCreateNestedManyWithoutRegistradoPorInput
    prestamosRecibidos?: PrestamoUncheckedCreateNestedManyWithoutRecibidoPorInput
  }

  export type UserUpdateInput = {
    usuario?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    prestamos?: PrestamoUpdateManyWithoutUsuarioNestedInput
    prestamosRegistrados?: PrestamoUpdateManyWithoutRegistradoPorNestedInput
    prestamosRecibidos?: PrestamoUpdateManyWithoutRecibidoPorNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    usuario?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    prestamos?: PrestamoUncheckedUpdateManyWithoutUsuarioNestedInput
    prestamosRegistrados?: PrestamoUncheckedUpdateManyWithoutRegistradoPorNestedInput
    prestamosRecibidos?: PrestamoUncheckedUpdateManyWithoutRecibidoPorNestedInput
  }

  export type UserCreateManyInput = {
    id?: number
    usuario: string
    password: string
    nombre: string
    rol?: string
    activo?: boolean
  }

  export type UserUpdateManyMutationInput = {
    usuario?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type UserUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    usuario?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EquipoCreateInput = {
    nombre: string
    descripcion?: string | null
    codigoInventario: string
    estado?: string
    fechaCreacion?: Date | string
    fechaActualizacion?: Date | string
    prestamos?: PrestamoCreateNestedManyWithoutEquipoInput
  }

  export type EquipoUncheckedCreateInput = {
    id?: number
    nombre: string
    descripcion?: string | null
    codigoInventario: string
    estado?: string
    fechaCreacion?: Date | string
    fechaActualizacion?: Date | string
    prestamos?: PrestamoUncheckedCreateNestedManyWithoutEquipoInput
  }

  export type EquipoUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    codigoInventario?: StringFieldUpdateOperationsInput | string
    estado?: StringFieldUpdateOperationsInput | string
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaActualizacion?: DateTimeFieldUpdateOperationsInput | Date | string
    prestamos?: PrestamoUpdateManyWithoutEquipoNestedInput
  }

  export type EquipoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    codigoInventario?: StringFieldUpdateOperationsInput | string
    estado?: StringFieldUpdateOperationsInput | string
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaActualizacion?: DateTimeFieldUpdateOperationsInput | Date | string
    prestamos?: PrestamoUncheckedUpdateManyWithoutEquipoNestedInput
  }

  export type EquipoCreateManyInput = {
    id?: number
    nombre: string
    descripcion?: string | null
    codigoInventario: string
    estado?: string
    fechaCreacion?: Date | string
    fechaActualizacion?: Date | string
  }

  export type EquipoUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    codigoInventario?: StringFieldUpdateOperationsInput | string
    estado?: StringFieldUpdateOperationsInput | string
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaActualizacion?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EquipoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    codigoInventario?: StringFieldUpdateOperationsInput | string
    estado?: StringFieldUpdateOperationsInput | string
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaActualizacion?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrestamoCreateInput = {
    fechaPrestamo?: Date | string
    fechaDevolucionPrevista?: Date | string | null
    fechaDevolucionReal?: Date | string | null
    estado?: string
    observacionesPrestamo?: string | null
    observacionesDevolucion?: string | null
    fechaCreacion?: Date | string
    fechaActualizacion?: Date | string
    usuario: UserCreateNestedOneWithoutPrestamosInput
    equipo: EquipoCreateNestedOneWithoutPrestamosInput
    registradoPor?: UserCreateNestedOneWithoutPrestamosRegistradosInput
    recibidoPor?: UserCreateNestedOneWithoutPrestamosRecibidosInput
  }

  export type PrestamoUncheckedCreateInput = {
    id?: number
    usuarioId: number
    equipoId: number
    fechaPrestamo?: Date | string
    fechaDevolucionPrevista?: Date | string | null
    fechaDevolucionReal?: Date | string | null
    estado?: string
    observacionesPrestamo?: string | null
    observacionesDevolucion?: string | null
    registradoPorId?: number | null
    recibidoPorId?: number | null
    fechaCreacion?: Date | string
    fechaActualizacion?: Date | string
  }

  export type PrestamoUpdateInput = {
    fechaPrestamo?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaDevolucionPrevista?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fechaDevolucionReal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: StringFieldUpdateOperationsInput | string
    observacionesPrestamo?: NullableStringFieldUpdateOperationsInput | string | null
    observacionesDevolucion?: NullableStringFieldUpdateOperationsInput | string | null
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaActualizacion?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UserUpdateOneRequiredWithoutPrestamosNestedInput
    equipo?: EquipoUpdateOneRequiredWithoutPrestamosNestedInput
    registradoPor?: UserUpdateOneWithoutPrestamosRegistradosNestedInput
    recibidoPor?: UserUpdateOneWithoutPrestamosRecibidosNestedInput
  }

  export type PrestamoUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    usuarioId?: IntFieldUpdateOperationsInput | number
    equipoId?: IntFieldUpdateOperationsInput | number
    fechaPrestamo?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaDevolucionPrevista?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fechaDevolucionReal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: StringFieldUpdateOperationsInput | string
    observacionesPrestamo?: NullableStringFieldUpdateOperationsInput | string | null
    observacionesDevolucion?: NullableStringFieldUpdateOperationsInput | string | null
    registradoPorId?: NullableIntFieldUpdateOperationsInput | number | null
    recibidoPorId?: NullableIntFieldUpdateOperationsInput | number | null
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaActualizacion?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrestamoCreateManyInput = {
    id?: number
    usuarioId: number
    equipoId: number
    fechaPrestamo?: Date | string
    fechaDevolucionPrevista?: Date | string | null
    fechaDevolucionReal?: Date | string | null
    estado?: string
    observacionesPrestamo?: string | null
    observacionesDevolucion?: string | null
    registradoPorId?: number | null
    recibidoPorId?: number | null
    fechaCreacion?: Date | string
    fechaActualizacion?: Date | string
  }

  export type PrestamoUpdateManyMutationInput = {
    fechaPrestamo?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaDevolucionPrevista?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fechaDevolucionReal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: StringFieldUpdateOperationsInput | string
    observacionesPrestamo?: NullableStringFieldUpdateOperationsInput | string | null
    observacionesDevolucion?: NullableStringFieldUpdateOperationsInput | string | null
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaActualizacion?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrestamoUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    usuarioId?: IntFieldUpdateOperationsInput | number
    equipoId?: IntFieldUpdateOperationsInput | number
    fechaPrestamo?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaDevolucionPrevista?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fechaDevolucionReal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: StringFieldUpdateOperationsInput | string
    observacionesPrestamo?: NullableStringFieldUpdateOperationsInput | string | null
    observacionesDevolucion?: NullableStringFieldUpdateOperationsInput | string | null
    registradoPorId?: NullableIntFieldUpdateOperationsInput | number | null
    recibidoPorId?: NullableIntFieldUpdateOperationsInput | number | null
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaActualizacion?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type PrestamoListRelationFilter = {
    every?: PrestamoWhereInput
    some?: PrestamoWhereInput
    none?: PrestamoWhereInput
  }

  export type PrestamoOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    usuario?: SortOrder
    password?: SortOrder
    nombre?: SortOrder
    rol?: SortOrder
    activo?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    usuario?: SortOrder
    password?: SortOrder
    nombre?: SortOrder
    rol?: SortOrder
    activo?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    usuario?: SortOrder
    password?: SortOrder
    nombre?: SortOrder
    rol?: SortOrder
    activo?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type EquipoCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    codigoInventario?: SortOrder
    estado?: SortOrder
    fechaCreacion?: SortOrder
    fechaActualizacion?: SortOrder
  }

  export type EquipoAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EquipoMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    codigoInventario?: SortOrder
    estado?: SortOrder
    fechaCreacion?: SortOrder
    fechaActualizacion?: SortOrder
  }

  export type EquipoMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    descripcion?: SortOrder
    codigoInventario?: SortOrder
    estado?: SortOrder
    fechaCreacion?: SortOrder
    fechaActualizacion?: SortOrder
  }

  export type EquipoSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type UserRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type EquipoRelationFilter = {
    is?: EquipoWhereInput
    isNot?: EquipoWhereInput
  }

  export type UserNullableRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type PrestamoCountOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    equipoId?: SortOrder
    fechaPrestamo?: SortOrder
    fechaDevolucionPrevista?: SortOrder
    fechaDevolucionReal?: SortOrder
    estado?: SortOrder
    observacionesPrestamo?: SortOrder
    observacionesDevolucion?: SortOrder
    registradoPorId?: SortOrder
    recibidoPorId?: SortOrder
    fechaCreacion?: SortOrder
    fechaActualizacion?: SortOrder
  }

  export type PrestamoAvgOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    equipoId?: SortOrder
    registradoPorId?: SortOrder
    recibidoPorId?: SortOrder
  }

  export type PrestamoMaxOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    equipoId?: SortOrder
    fechaPrestamo?: SortOrder
    fechaDevolucionPrevista?: SortOrder
    fechaDevolucionReal?: SortOrder
    estado?: SortOrder
    observacionesPrestamo?: SortOrder
    observacionesDevolucion?: SortOrder
    registradoPorId?: SortOrder
    recibidoPorId?: SortOrder
    fechaCreacion?: SortOrder
    fechaActualizacion?: SortOrder
  }

  export type PrestamoMinOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    equipoId?: SortOrder
    fechaPrestamo?: SortOrder
    fechaDevolucionPrevista?: SortOrder
    fechaDevolucionReal?: SortOrder
    estado?: SortOrder
    observacionesPrestamo?: SortOrder
    observacionesDevolucion?: SortOrder
    registradoPorId?: SortOrder
    recibidoPorId?: SortOrder
    fechaCreacion?: SortOrder
    fechaActualizacion?: SortOrder
  }

  export type PrestamoSumOrderByAggregateInput = {
    id?: SortOrder
    usuarioId?: SortOrder
    equipoId?: SortOrder
    registradoPorId?: SortOrder
    recibidoPorId?: SortOrder
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type PrestamoCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<PrestamoCreateWithoutUsuarioInput, PrestamoUncheckedCreateWithoutUsuarioInput> | PrestamoCreateWithoutUsuarioInput[] | PrestamoUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: PrestamoCreateOrConnectWithoutUsuarioInput | PrestamoCreateOrConnectWithoutUsuarioInput[]
    createMany?: PrestamoCreateManyUsuarioInputEnvelope
    connect?: PrestamoWhereUniqueInput | PrestamoWhereUniqueInput[]
  }

  export type PrestamoCreateNestedManyWithoutRegistradoPorInput = {
    create?: XOR<PrestamoCreateWithoutRegistradoPorInput, PrestamoUncheckedCreateWithoutRegistradoPorInput> | PrestamoCreateWithoutRegistradoPorInput[] | PrestamoUncheckedCreateWithoutRegistradoPorInput[]
    connectOrCreate?: PrestamoCreateOrConnectWithoutRegistradoPorInput | PrestamoCreateOrConnectWithoutRegistradoPorInput[]
    createMany?: PrestamoCreateManyRegistradoPorInputEnvelope
    connect?: PrestamoWhereUniqueInput | PrestamoWhereUniqueInput[]
  }

  export type PrestamoCreateNestedManyWithoutRecibidoPorInput = {
    create?: XOR<PrestamoCreateWithoutRecibidoPorInput, PrestamoUncheckedCreateWithoutRecibidoPorInput> | PrestamoCreateWithoutRecibidoPorInput[] | PrestamoUncheckedCreateWithoutRecibidoPorInput[]
    connectOrCreate?: PrestamoCreateOrConnectWithoutRecibidoPorInput | PrestamoCreateOrConnectWithoutRecibidoPorInput[]
    createMany?: PrestamoCreateManyRecibidoPorInputEnvelope
    connect?: PrestamoWhereUniqueInput | PrestamoWhereUniqueInput[]
  }

  export type PrestamoUncheckedCreateNestedManyWithoutUsuarioInput = {
    create?: XOR<PrestamoCreateWithoutUsuarioInput, PrestamoUncheckedCreateWithoutUsuarioInput> | PrestamoCreateWithoutUsuarioInput[] | PrestamoUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: PrestamoCreateOrConnectWithoutUsuarioInput | PrestamoCreateOrConnectWithoutUsuarioInput[]
    createMany?: PrestamoCreateManyUsuarioInputEnvelope
    connect?: PrestamoWhereUniqueInput | PrestamoWhereUniqueInput[]
  }

  export type PrestamoUncheckedCreateNestedManyWithoutRegistradoPorInput = {
    create?: XOR<PrestamoCreateWithoutRegistradoPorInput, PrestamoUncheckedCreateWithoutRegistradoPorInput> | PrestamoCreateWithoutRegistradoPorInput[] | PrestamoUncheckedCreateWithoutRegistradoPorInput[]
    connectOrCreate?: PrestamoCreateOrConnectWithoutRegistradoPorInput | PrestamoCreateOrConnectWithoutRegistradoPorInput[]
    createMany?: PrestamoCreateManyRegistradoPorInputEnvelope
    connect?: PrestamoWhereUniqueInput | PrestamoWhereUniqueInput[]
  }

  export type PrestamoUncheckedCreateNestedManyWithoutRecibidoPorInput = {
    create?: XOR<PrestamoCreateWithoutRecibidoPorInput, PrestamoUncheckedCreateWithoutRecibidoPorInput> | PrestamoCreateWithoutRecibidoPorInput[] | PrestamoUncheckedCreateWithoutRecibidoPorInput[]
    connectOrCreate?: PrestamoCreateOrConnectWithoutRecibidoPorInput | PrestamoCreateOrConnectWithoutRecibidoPorInput[]
    createMany?: PrestamoCreateManyRecibidoPorInputEnvelope
    connect?: PrestamoWhereUniqueInput | PrestamoWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type PrestamoUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<PrestamoCreateWithoutUsuarioInput, PrestamoUncheckedCreateWithoutUsuarioInput> | PrestamoCreateWithoutUsuarioInput[] | PrestamoUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: PrestamoCreateOrConnectWithoutUsuarioInput | PrestamoCreateOrConnectWithoutUsuarioInput[]
    upsert?: PrestamoUpsertWithWhereUniqueWithoutUsuarioInput | PrestamoUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: PrestamoCreateManyUsuarioInputEnvelope
    set?: PrestamoWhereUniqueInput | PrestamoWhereUniqueInput[]
    disconnect?: PrestamoWhereUniqueInput | PrestamoWhereUniqueInput[]
    delete?: PrestamoWhereUniqueInput | PrestamoWhereUniqueInput[]
    connect?: PrestamoWhereUniqueInput | PrestamoWhereUniqueInput[]
    update?: PrestamoUpdateWithWhereUniqueWithoutUsuarioInput | PrestamoUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: PrestamoUpdateManyWithWhereWithoutUsuarioInput | PrestamoUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: PrestamoScalarWhereInput | PrestamoScalarWhereInput[]
  }

  export type PrestamoUpdateManyWithoutRegistradoPorNestedInput = {
    create?: XOR<PrestamoCreateWithoutRegistradoPorInput, PrestamoUncheckedCreateWithoutRegistradoPorInput> | PrestamoCreateWithoutRegistradoPorInput[] | PrestamoUncheckedCreateWithoutRegistradoPorInput[]
    connectOrCreate?: PrestamoCreateOrConnectWithoutRegistradoPorInput | PrestamoCreateOrConnectWithoutRegistradoPorInput[]
    upsert?: PrestamoUpsertWithWhereUniqueWithoutRegistradoPorInput | PrestamoUpsertWithWhereUniqueWithoutRegistradoPorInput[]
    createMany?: PrestamoCreateManyRegistradoPorInputEnvelope
    set?: PrestamoWhereUniqueInput | PrestamoWhereUniqueInput[]
    disconnect?: PrestamoWhereUniqueInput | PrestamoWhereUniqueInput[]
    delete?: PrestamoWhereUniqueInput | PrestamoWhereUniqueInput[]
    connect?: PrestamoWhereUniqueInput | PrestamoWhereUniqueInput[]
    update?: PrestamoUpdateWithWhereUniqueWithoutRegistradoPorInput | PrestamoUpdateWithWhereUniqueWithoutRegistradoPorInput[]
    updateMany?: PrestamoUpdateManyWithWhereWithoutRegistradoPorInput | PrestamoUpdateManyWithWhereWithoutRegistradoPorInput[]
    deleteMany?: PrestamoScalarWhereInput | PrestamoScalarWhereInput[]
  }

  export type PrestamoUpdateManyWithoutRecibidoPorNestedInput = {
    create?: XOR<PrestamoCreateWithoutRecibidoPorInput, PrestamoUncheckedCreateWithoutRecibidoPorInput> | PrestamoCreateWithoutRecibidoPorInput[] | PrestamoUncheckedCreateWithoutRecibidoPorInput[]
    connectOrCreate?: PrestamoCreateOrConnectWithoutRecibidoPorInput | PrestamoCreateOrConnectWithoutRecibidoPorInput[]
    upsert?: PrestamoUpsertWithWhereUniqueWithoutRecibidoPorInput | PrestamoUpsertWithWhereUniqueWithoutRecibidoPorInput[]
    createMany?: PrestamoCreateManyRecibidoPorInputEnvelope
    set?: PrestamoWhereUniqueInput | PrestamoWhereUniqueInput[]
    disconnect?: PrestamoWhereUniqueInput | PrestamoWhereUniqueInput[]
    delete?: PrestamoWhereUniqueInput | PrestamoWhereUniqueInput[]
    connect?: PrestamoWhereUniqueInput | PrestamoWhereUniqueInput[]
    update?: PrestamoUpdateWithWhereUniqueWithoutRecibidoPorInput | PrestamoUpdateWithWhereUniqueWithoutRecibidoPorInput[]
    updateMany?: PrestamoUpdateManyWithWhereWithoutRecibidoPorInput | PrestamoUpdateManyWithWhereWithoutRecibidoPorInput[]
    deleteMany?: PrestamoScalarWhereInput | PrestamoScalarWhereInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type PrestamoUncheckedUpdateManyWithoutUsuarioNestedInput = {
    create?: XOR<PrestamoCreateWithoutUsuarioInput, PrestamoUncheckedCreateWithoutUsuarioInput> | PrestamoCreateWithoutUsuarioInput[] | PrestamoUncheckedCreateWithoutUsuarioInput[]
    connectOrCreate?: PrestamoCreateOrConnectWithoutUsuarioInput | PrestamoCreateOrConnectWithoutUsuarioInput[]
    upsert?: PrestamoUpsertWithWhereUniqueWithoutUsuarioInput | PrestamoUpsertWithWhereUniqueWithoutUsuarioInput[]
    createMany?: PrestamoCreateManyUsuarioInputEnvelope
    set?: PrestamoWhereUniqueInput | PrestamoWhereUniqueInput[]
    disconnect?: PrestamoWhereUniqueInput | PrestamoWhereUniqueInput[]
    delete?: PrestamoWhereUniqueInput | PrestamoWhereUniqueInput[]
    connect?: PrestamoWhereUniqueInput | PrestamoWhereUniqueInput[]
    update?: PrestamoUpdateWithWhereUniqueWithoutUsuarioInput | PrestamoUpdateWithWhereUniqueWithoutUsuarioInput[]
    updateMany?: PrestamoUpdateManyWithWhereWithoutUsuarioInput | PrestamoUpdateManyWithWhereWithoutUsuarioInput[]
    deleteMany?: PrestamoScalarWhereInput | PrestamoScalarWhereInput[]
  }

  export type PrestamoUncheckedUpdateManyWithoutRegistradoPorNestedInput = {
    create?: XOR<PrestamoCreateWithoutRegistradoPorInput, PrestamoUncheckedCreateWithoutRegistradoPorInput> | PrestamoCreateWithoutRegistradoPorInput[] | PrestamoUncheckedCreateWithoutRegistradoPorInput[]
    connectOrCreate?: PrestamoCreateOrConnectWithoutRegistradoPorInput | PrestamoCreateOrConnectWithoutRegistradoPorInput[]
    upsert?: PrestamoUpsertWithWhereUniqueWithoutRegistradoPorInput | PrestamoUpsertWithWhereUniqueWithoutRegistradoPorInput[]
    createMany?: PrestamoCreateManyRegistradoPorInputEnvelope
    set?: PrestamoWhereUniqueInput | PrestamoWhereUniqueInput[]
    disconnect?: PrestamoWhereUniqueInput | PrestamoWhereUniqueInput[]
    delete?: PrestamoWhereUniqueInput | PrestamoWhereUniqueInput[]
    connect?: PrestamoWhereUniqueInput | PrestamoWhereUniqueInput[]
    update?: PrestamoUpdateWithWhereUniqueWithoutRegistradoPorInput | PrestamoUpdateWithWhereUniqueWithoutRegistradoPorInput[]
    updateMany?: PrestamoUpdateManyWithWhereWithoutRegistradoPorInput | PrestamoUpdateManyWithWhereWithoutRegistradoPorInput[]
    deleteMany?: PrestamoScalarWhereInput | PrestamoScalarWhereInput[]
  }

  export type PrestamoUncheckedUpdateManyWithoutRecibidoPorNestedInput = {
    create?: XOR<PrestamoCreateWithoutRecibidoPorInput, PrestamoUncheckedCreateWithoutRecibidoPorInput> | PrestamoCreateWithoutRecibidoPorInput[] | PrestamoUncheckedCreateWithoutRecibidoPorInput[]
    connectOrCreate?: PrestamoCreateOrConnectWithoutRecibidoPorInput | PrestamoCreateOrConnectWithoutRecibidoPorInput[]
    upsert?: PrestamoUpsertWithWhereUniqueWithoutRecibidoPorInput | PrestamoUpsertWithWhereUniqueWithoutRecibidoPorInput[]
    createMany?: PrestamoCreateManyRecibidoPorInputEnvelope
    set?: PrestamoWhereUniqueInput | PrestamoWhereUniqueInput[]
    disconnect?: PrestamoWhereUniqueInput | PrestamoWhereUniqueInput[]
    delete?: PrestamoWhereUniqueInput | PrestamoWhereUniqueInput[]
    connect?: PrestamoWhereUniqueInput | PrestamoWhereUniqueInput[]
    update?: PrestamoUpdateWithWhereUniqueWithoutRecibidoPorInput | PrestamoUpdateWithWhereUniqueWithoutRecibidoPorInput[]
    updateMany?: PrestamoUpdateManyWithWhereWithoutRecibidoPorInput | PrestamoUpdateManyWithWhereWithoutRecibidoPorInput[]
    deleteMany?: PrestamoScalarWhereInput | PrestamoScalarWhereInput[]
  }

  export type PrestamoCreateNestedManyWithoutEquipoInput = {
    create?: XOR<PrestamoCreateWithoutEquipoInput, PrestamoUncheckedCreateWithoutEquipoInput> | PrestamoCreateWithoutEquipoInput[] | PrestamoUncheckedCreateWithoutEquipoInput[]
    connectOrCreate?: PrestamoCreateOrConnectWithoutEquipoInput | PrestamoCreateOrConnectWithoutEquipoInput[]
    createMany?: PrestamoCreateManyEquipoInputEnvelope
    connect?: PrestamoWhereUniqueInput | PrestamoWhereUniqueInput[]
  }

  export type PrestamoUncheckedCreateNestedManyWithoutEquipoInput = {
    create?: XOR<PrestamoCreateWithoutEquipoInput, PrestamoUncheckedCreateWithoutEquipoInput> | PrestamoCreateWithoutEquipoInput[] | PrestamoUncheckedCreateWithoutEquipoInput[]
    connectOrCreate?: PrestamoCreateOrConnectWithoutEquipoInput | PrestamoCreateOrConnectWithoutEquipoInput[]
    createMany?: PrestamoCreateManyEquipoInputEnvelope
    connect?: PrestamoWhereUniqueInput | PrestamoWhereUniqueInput[]
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PrestamoUpdateManyWithoutEquipoNestedInput = {
    create?: XOR<PrestamoCreateWithoutEquipoInput, PrestamoUncheckedCreateWithoutEquipoInput> | PrestamoCreateWithoutEquipoInput[] | PrestamoUncheckedCreateWithoutEquipoInput[]
    connectOrCreate?: PrestamoCreateOrConnectWithoutEquipoInput | PrestamoCreateOrConnectWithoutEquipoInput[]
    upsert?: PrestamoUpsertWithWhereUniqueWithoutEquipoInput | PrestamoUpsertWithWhereUniqueWithoutEquipoInput[]
    createMany?: PrestamoCreateManyEquipoInputEnvelope
    set?: PrestamoWhereUniqueInput | PrestamoWhereUniqueInput[]
    disconnect?: PrestamoWhereUniqueInput | PrestamoWhereUniqueInput[]
    delete?: PrestamoWhereUniqueInput | PrestamoWhereUniqueInput[]
    connect?: PrestamoWhereUniqueInput | PrestamoWhereUniqueInput[]
    update?: PrestamoUpdateWithWhereUniqueWithoutEquipoInput | PrestamoUpdateWithWhereUniqueWithoutEquipoInput[]
    updateMany?: PrestamoUpdateManyWithWhereWithoutEquipoInput | PrestamoUpdateManyWithWhereWithoutEquipoInput[]
    deleteMany?: PrestamoScalarWhereInput | PrestamoScalarWhereInput[]
  }

  export type PrestamoUncheckedUpdateManyWithoutEquipoNestedInput = {
    create?: XOR<PrestamoCreateWithoutEquipoInput, PrestamoUncheckedCreateWithoutEquipoInput> | PrestamoCreateWithoutEquipoInput[] | PrestamoUncheckedCreateWithoutEquipoInput[]
    connectOrCreate?: PrestamoCreateOrConnectWithoutEquipoInput | PrestamoCreateOrConnectWithoutEquipoInput[]
    upsert?: PrestamoUpsertWithWhereUniqueWithoutEquipoInput | PrestamoUpsertWithWhereUniqueWithoutEquipoInput[]
    createMany?: PrestamoCreateManyEquipoInputEnvelope
    set?: PrestamoWhereUniqueInput | PrestamoWhereUniqueInput[]
    disconnect?: PrestamoWhereUniqueInput | PrestamoWhereUniqueInput[]
    delete?: PrestamoWhereUniqueInput | PrestamoWhereUniqueInput[]
    connect?: PrestamoWhereUniqueInput | PrestamoWhereUniqueInput[]
    update?: PrestamoUpdateWithWhereUniqueWithoutEquipoInput | PrestamoUpdateWithWhereUniqueWithoutEquipoInput[]
    updateMany?: PrestamoUpdateManyWithWhereWithoutEquipoInput | PrestamoUpdateManyWithWhereWithoutEquipoInput[]
    deleteMany?: PrestamoScalarWhereInput | PrestamoScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutPrestamosInput = {
    create?: XOR<UserCreateWithoutPrestamosInput, UserUncheckedCreateWithoutPrestamosInput>
    connectOrCreate?: UserCreateOrConnectWithoutPrestamosInput
    connect?: UserWhereUniqueInput
  }

  export type EquipoCreateNestedOneWithoutPrestamosInput = {
    create?: XOR<EquipoCreateWithoutPrestamosInput, EquipoUncheckedCreateWithoutPrestamosInput>
    connectOrCreate?: EquipoCreateOrConnectWithoutPrestamosInput
    connect?: EquipoWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutPrestamosRegistradosInput = {
    create?: XOR<UserCreateWithoutPrestamosRegistradosInput, UserUncheckedCreateWithoutPrestamosRegistradosInput>
    connectOrCreate?: UserCreateOrConnectWithoutPrestamosRegistradosInput
    connect?: UserWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutPrestamosRecibidosInput = {
    create?: XOR<UserCreateWithoutPrestamosRecibidosInput, UserUncheckedCreateWithoutPrestamosRecibidosInput>
    connectOrCreate?: UserCreateOrConnectWithoutPrestamosRecibidosInput
    connect?: UserWhereUniqueInput
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type UserUpdateOneRequiredWithoutPrestamosNestedInput = {
    create?: XOR<UserCreateWithoutPrestamosInput, UserUncheckedCreateWithoutPrestamosInput>
    connectOrCreate?: UserCreateOrConnectWithoutPrestamosInput
    upsert?: UserUpsertWithoutPrestamosInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPrestamosInput, UserUpdateWithoutPrestamosInput>, UserUncheckedUpdateWithoutPrestamosInput>
  }

  export type EquipoUpdateOneRequiredWithoutPrestamosNestedInput = {
    create?: XOR<EquipoCreateWithoutPrestamosInput, EquipoUncheckedCreateWithoutPrestamosInput>
    connectOrCreate?: EquipoCreateOrConnectWithoutPrestamosInput
    upsert?: EquipoUpsertWithoutPrestamosInput
    connect?: EquipoWhereUniqueInput
    update?: XOR<XOR<EquipoUpdateToOneWithWhereWithoutPrestamosInput, EquipoUpdateWithoutPrestamosInput>, EquipoUncheckedUpdateWithoutPrestamosInput>
  }

  export type UserUpdateOneWithoutPrestamosRegistradosNestedInput = {
    create?: XOR<UserCreateWithoutPrestamosRegistradosInput, UserUncheckedCreateWithoutPrestamosRegistradosInput>
    connectOrCreate?: UserCreateOrConnectWithoutPrestamosRegistradosInput
    upsert?: UserUpsertWithoutPrestamosRegistradosInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPrestamosRegistradosInput, UserUpdateWithoutPrestamosRegistradosInput>, UserUncheckedUpdateWithoutPrestamosRegistradosInput>
  }

  export type UserUpdateOneWithoutPrestamosRecibidosNestedInput = {
    create?: XOR<UserCreateWithoutPrestamosRecibidosInput, UserUncheckedCreateWithoutPrestamosRecibidosInput>
    connectOrCreate?: UserCreateOrConnectWithoutPrestamosRecibidosInput
    upsert?: UserUpsertWithoutPrestamosRecibidosInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPrestamosRecibidosInput, UserUpdateWithoutPrestamosRecibidosInput>, UserUncheckedUpdateWithoutPrestamosRecibidosInput>
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type PrestamoCreateWithoutUsuarioInput = {
    fechaPrestamo?: Date | string
    fechaDevolucionPrevista?: Date | string | null
    fechaDevolucionReal?: Date | string | null
    estado?: string
    observacionesPrestamo?: string | null
    observacionesDevolucion?: string | null
    fechaCreacion?: Date | string
    fechaActualizacion?: Date | string
    equipo: EquipoCreateNestedOneWithoutPrestamosInput
    registradoPor?: UserCreateNestedOneWithoutPrestamosRegistradosInput
    recibidoPor?: UserCreateNestedOneWithoutPrestamosRecibidosInput
  }

  export type PrestamoUncheckedCreateWithoutUsuarioInput = {
    id?: number
    equipoId: number
    fechaPrestamo?: Date | string
    fechaDevolucionPrevista?: Date | string | null
    fechaDevolucionReal?: Date | string | null
    estado?: string
    observacionesPrestamo?: string | null
    observacionesDevolucion?: string | null
    registradoPorId?: number | null
    recibidoPorId?: number | null
    fechaCreacion?: Date | string
    fechaActualizacion?: Date | string
  }

  export type PrestamoCreateOrConnectWithoutUsuarioInput = {
    where: PrestamoWhereUniqueInput
    create: XOR<PrestamoCreateWithoutUsuarioInput, PrestamoUncheckedCreateWithoutUsuarioInput>
  }

  export type PrestamoCreateManyUsuarioInputEnvelope = {
    data: PrestamoCreateManyUsuarioInput | PrestamoCreateManyUsuarioInput[]
    skipDuplicates?: boolean
  }

  export type PrestamoCreateWithoutRegistradoPorInput = {
    fechaPrestamo?: Date | string
    fechaDevolucionPrevista?: Date | string | null
    fechaDevolucionReal?: Date | string | null
    estado?: string
    observacionesPrestamo?: string | null
    observacionesDevolucion?: string | null
    fechaCreacion?: Date | string
    fechaActualizacion?: Date | string
    usuario: UserCreateNestedOneWithoutPrestamosInput
    equipo: EquipoCreateNestedOneWithoutPrestamosInput
    recibidoPor?: UserCreateNestedOneWithoutPrestamosRecibidosInput
  }

  export type PrestamoUncheckedCreateWithoutRegistradoPorInput = {
    id?: number
    usuarioId: number
    equipoId: number
    fechaPrestamo?: Date | string
    fechaDevolucionPrevista?: Date | string | null
    fechaDevolucionReal?: Date | string | null
    estado?: string
    observacionesPrestamo?: string | null
    observacionesDevolucion?: string | null
    recibidoPorId?: number | null
    fechaCreacion?: Date | string
    fechaActualizacion?: Date | string
  }

  export type PrestamoCreateOrConnectWithoutRegistradoPorInput = {
    where: PrestamoWhereUniqueInput
    create: XOR<PrestamoCreateWithoutRegistradoPorInput, PrestamoUncheckedCreateWithoutRegistradoPorInput>
  }

  export type PrestamoCreateManyRegistradoPorInputEnvelope = {
    data: PrestamoCreateManyRegistradoPorInput | PrestamoCreateManyRegistradoPorInput[]
    skipDuplicates?: boolean
  }

  export type PrestamoCreateWithoutRecibidoPorInput = {
    fechaPrestamo?: Date | string
    fechaDevolucionPrevista?: Date | string | null
    fechaDevolucionReal?: Date | string | null
    estado?: string
    observacionesPrestamo?: string | null
    observacionesDevolucion?: string | null
    fechaCreacion?: Date | string
    fechaActualizacion?: Date | string
    usuario: UserCreateNestedOneWithoutPrestamosInput
    equipo: EquipoCreateNestedOneWithoutPrestamosInput
    registradoPor?: UserCreateNestedOneWithoutPrestamosRegistradosInput
  }

  export type PrestamoUncheckedCreateWithoutRecibidoPorInput = {
    id?: number
    usuarioId: number
    equipoId: number
    fechaPrestamo?: Date | string
    fechaDevolucionPrevista?: Date | string | null
    fechaDevolucionReal?: Date | string | null
    estado?: string
    observacionesPrestamo?: string | null
    observacionesDevolucion?: string | null
    registradoPorId?: number | null
    fechaCreacion?: Date | string
    fechaActualizacion?: Date | string
  }

  export type PrestamoCreateOrConnectWithoutRecibidoPorInput = {
    where: PrestamoWhereUniqueInput
    create: XOR<PrestamoCreateWithoutRecibidoPorInput, PrestamoUncheckedCreateWithoutRecibidoPorInput>
  }

  export type PrestamoCreateManyRecibidoPorInputEnvelope = {
    data: PrestamoCreateManyRecibidoPorInput | PrestamoCreateManyRecibidoPorInput[]
    skipDuplicates?: boolean
  }

  export type PrestamoUpsertWithWhereUniqueWithoutUsuarioInput = {
    where: PrestamoWhereUniqueInput
    update: XOR<PrestamoUpdateWithoutUsuarioInput, PrestamoUncheckedUpdateWithoutUsuarioInput>
    create: XOR<PrestamoCreateWithoutUsuarioInput, PrestamoUncheckedCreateWithoutUsuarioInput>
  }

  export type PrestamoUpdateWithWhereUniqueWithoutUsuarioInput = {
    where: PrestamoWhereUniqueInput
    data: XOR<PrestamoUpdateWithoutUsuarioInput, PrestamoUncheckedUpdateWithoutUsuarioInput>
  }

  export type PrestamoUpdateManyWithWhereWithoutUsuarioInput = {
    where: PrestamoScalarWhereInput
    data: XOR<PrestamoUpdateManyMutationInput, PrestamoUncheckedUpdateManyWithoutUsuarioInput>
  }

  export type PrestamoScalarWhereInput = {
    AND?: PrestamoScalarWhereInput | PrestamoScalarWhereInput[]
    OR?: PrestamoScalarWhereInput[]
    NOT?: PrestamoScalarWhereInput | PrestamoScalarWhereInput[]
    id?: IntFilter<"Prestamo"> | number
    usuarioId?: IntFilter<"Prestamo"> | number
    equipoId?: IntFilter<"Prestamo"> | number
    fechaPrestamo?: DateTimeFilter<"Prestamo"> | Date | string
    fechaDevolucionPrevista?: DateTimeNullableFilter<"Prestamo"> | Date | string | null
    fechaDevolucionReal?: DateTimeNullableFilter<"Prestamo"> | Date | string | null
    estado?: StringFilter<"Prestamo"> | string
    observacionesPrestamo?: StringNullableFilter<"Prestamo"> | string | null
    observacionesDevolucion?: StringNullableFilter<"Prestamo"> | string | null
    registradoPorId?: IntNullableFilter<"Prestamo"> | number | null
    recibidoPorId?: IntNullableFilter<"Prestamo"> | number | null
    fechaCreacion?: DateTimeFilter<"Prestamo"> | Date | string
    fechaActualizacion?: DateTimeFilter<"Prestamo"> | Date | string
  }

  export type PrestamoUpsertWithWhereUniqueWithoutRegistradoPorInput = {
    where: PrestamoWhereUniqueInput
    update: XOR<PrestamoUpdateWithoutRegistradoPorInput, PrestamoUncheckedUpdateWithoutRegistradoPorInput>
    create: XOR<PrestamoCreateWithoutRegistradoPorInput, PrestamoUncheckedCreateWithoutRegistradoPorInput>
  }

  export type PrestamoUpdateWithWhereUniqueWithoutRegistradoPorInput = {
    where: PrestamoWhereUniqueInput
    data: XOR<PrestamoUpdateWithoutRegistradoPorInput, PrestamoUncheckedUpdateWithoutRegistradoPorInput>
  }

  export type PrestamoUpdateManyWithWhereWithoutRegistradoPorInput = {
    where: PrestamoScalarWhereInput
    data: XOR<PrestamoUpdateManyMutationInput, PrestamoUncheckedUpdateManyWithoutRegistradoPorInput>
  }

  export type PrestamoUpsertWithWhereUniqueWithoutRecibidoPorInput = {
    where: PrestamoWhereUniqueInput
    update: XOR<PrestamoUpdateWithoutRecibidoPorInput, PrestamoUncheckedUpdateWithoutRecibidoPorInput>
    create: XOR<PrestamoCreateWithoutRecibidoPorInput, PrestamoUncheckedCreateWithoutRecibidoPorInput>
  }

  export type PrestamoUpdateWithWhereUniqueWithoutRecibidoPorInput = {
    where: PrestamoWhereUniqueInput
    data: XOR<PrestamoUpdateWithoutRecibidoPorInput, PrestamoUncheckedUpdateWithoutRecibidoPorInput>
  }

  export type PrestamoUpdateManyWithWhereWithoutRecibidoPorInput = {
    where: PrestamoScalarWhereInput
    data: XOR<PrestamoUpdateManyMutationInput, PrestamoUncheckedUpdateManyWithoutRecibidoPorInput>
  }

  export type PrestamoCreateWithoutEquipoInput = {
    fechaPrestamo?: Date | string
    fechaDevolucionPrevista?: Date | string | null
    fechaDevolucionReal?: Date | string | null
    estado?: string
    observacionesPrestamo?: string | null
    observacionesDevolucion?: string | null
    fechaCreacion?: Date | string
    fechaActualizacion?: Date | string
    usuario: UserCreateNestedOneWithoutPrestamosInput
    registradoPor?: UserCreateNestedOneWithoutPrestamosRegistradosInput
    recibidoPor?: UserCreateNestedOneWithoutPrestamosRecibidosInput
  }

  export type PrestamoUncheckedCreateWithoutEquipoInput = {
    id?: number
    usuarioId: number
    fechaPrestamo?: Date | string
    fechaDevolucionPrevista?: Date | string | null
    fechaDevolucionReal?: Date | string | null
    estado?: string
    observacionesPrestamo?: string | null
    observacionesDevolucion?: string | null
    registradoPorId?: number | null
    recibidoPorId?: number | null
    fechaCreacion?: Date | string
    fechaActualizacion?: Date | string
  }

  export type PrestamoCreateOrConnectWithoutEquipoInput = {
    where: PrestamoWhereUniqueInput
    create: XOR<PrestamoCreateWithoutEquipoInput, PrestamoUncheckedCreateWithoutEquipoInput>
  }

  export type PrestamoCreateManyEquipoInputEnvelope = {
    data: PrestamoCreateManyEquipoInput | PrestamoCreateManyEquipoInput[]
    skipDuplicates?: boolean
  }

  export type PrestamoUpsertWithWhereUniqueWithoutEquipoInput = {
    where: PrestamoWhereUniqueInput
    update: XOR<PrestamoUpdateWithoutEquipoInput, PrestamoUncheckedUpdateWithoutEquipoInput>
    create: XOR<PrestamoCreateWithoutEquipoInput, PrestamoUncheckedCreateWithoutEquipoInput>
  }

  export type PrestamoUpdateWithWhereUniqueWithoutEquipoInput = {
    where: PrestamoWhereUniqueInput
    data: XOR<PrestamoUpdateWithoutEquipoInput, PrestamoUncheckedUpdateWithoutEquipoInput>
  }

  export type PrestamoUpdateManyWithWhereWithoutEquipoInput = {
    where: PrestamoScalarWhereInput
    data: XOR<PrestamoUpdateManyMutationInput, PrestamoUncheckedUpdateManyWithoutEquipoInput>
  }

  export type UserCreateWithoutPrestamosInput = {
    usuario: string
    password: string
    nombre: string
    rol?: string
    activo?: boolean
    prestamosRegistrados?: PrestamoCreateNestedManyWithoutRegistradoPorInput
    prestamosRecibidos?: PrestamoCreateNestedManyWithoutRecibidoPorInput
  }

  export type UserUncheckedCreateWithoutPrestamosInput = {
    id?: number
    usuario: string
    password: string
    nombre: string
    rol?: string
    activo?: boolean
    prestamosRegistrados?: PrestamoUncheckedCreateNestedManyWithoutRegistradoPorInput
    prestamosRecibidos?: PrestamoUncheckedCreateNestedManyWithoutRecibidoPorInput
  }

  export type UserCreateOrConnectWithoutPrestamosInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPrestamosInput, UserUncheckedCreateWithoutPrestamosInput>
  }

  export type EquipoCreateWithoutPrestamosInput = {
    nombre: string
    descripcion?: string | null
    codigoInventario: string
    estado?: string
    fechaCreacion?: Date | string
    fechaActualizacion?: Date | string
  }

  export type EquipoUncheckedCreateWithoutPrestamosInput = {
    id?: number
    nombre: string
    descripcion?: string | null
    codigoInventario: string
    estado?: string
    fechaCreacion?: Date | string
    fechaActualizacion?: Date | string
  }

  export type EquipoCreateOrConnectWithoutPrestamosInput = {
    where: EquipoWhereUniqueInput
    create: XOR<EquipoCreateWithoutPrestamosInput, EquipoUncheckedCreateWithoutPrestamosInput>
  }

  export type UserCreateWithoutPrestamosRegistradosInput = {
    usuario: string
    password: string
    nombre: string
    rol?: string
    activo?: boolean
    prestamos?: PrestamoCreateNestedManyWithoutUsuarioInput
    prestamosRecibidos?: PrestamoCreateNestedManyWithoutRecibidoPorInput
  }

  export type UserUncheckedCreateWithoutPrestamosRegistradosInput = {
    id?: number
    usuario: string
    password: string
    nombre: string
    rol?: string
    activo?: boolean
    prestamos?: PrestamoUncheckedCreateNestedManyWithoutUsuarioInput
    prestamosRecibidos?: PrestamoUncheckedCreateNestedManyWithoutRecibidoPorInput
  }

  export type UserCreateOrConnectWithoutPrestamosRegistradosInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPrestamosRegistradosInput, UserUncheckedCreateWithoutPrestamosRegistradosInput>
  }

  export type UserCreateWithoutPrestamosRecibidosInput = {
    usuario: string
    password: string
    nombre: string
    rol?: string
    activo?: boolean
    prestamos?: PrestamoCreateNestedManyWithoutUsuarioInput
    prestamosRegistrados?: PrestamoCreateNestedManyWithoutRegistradoPorInput
  }

  export type UserUncheckedCreateWithoutPrestamosRecibidosInput = {
    id?: number
    usuario: string
    password: string
    nombre: string
    rol?: string
    activo?: boolean
    prestamos?: PrestamoUncheckedCreateNestedManyWithoutUsuarioInput
    prestamosRegistrados?: PrestamoUncheckedCreateNestedManyWithoutRegistradoPorInput
  }

  export type UserCreateOrConnectWithoutPrestamosRecibidosInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPrestamosRecibidosInput, UserUncheckedCreateWithoutPrestamosRecibidosInput>
  }

  export type UserUpsertWithoutPrestamosInput = {
    update: XOR<UserUpdateWithoutPrestamosInput, UserUncheckedUpdateWithoutPrestamosInput>
    create: XOR<UserCreateWithoutPrestamosInput, UserUncheckedCreateWithoutPrestamosInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPrestamosInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPrestamosInput, UserUncheckedUpdateWithoutPrestamosInput>
  }

  export type UserUpdateWithoutPrestamosInput = {
    usuario?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    prestamosRegistrados?: PrestamoUpdateManyWithoutRegistradoPorNestedInput
    prestamosRecibidos?: PrestamoUpdateManyWithoutRecibidoPorNestedInput
  }

  export type UserUncheckedUpdateWithoutPrestamosInput = {
    id?: IntFieldUpdateOperationsInput | number
    usuario?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    prestamosRegistrados?: PrestamoUncheckedUpdateManyWithoutRegistradoPorNestedInput
    prestamosRecibidos?: PrestamoUncheckedUpdateManyWithoutRecibidoPorNestedInput
  }

  export type EquipoUpsertWithoutPrestamosInput = {
    update: XOR<EquipoUpdateWithoutPrestamosInput, EquipoUncheckedUpdateWithoutPrestamosInput>
    create: XOR<EquipoCreateWithoutPrestamosInput, EquipoUncheckedCreateWithoutPrestamosInput>
    where?: EquipoWhereInput
  }

  export type EquipoUpdateToOneWithWhereWithoutPrestamosInput = {
    where?: EquipoWhereInput
    data: XOR<EquipoUpdateWithoutPrestamosInput, EquipoUncheckedUpdateWithoutPrestamosInput>
  }

  export type EquipoUpdateWithoutPrestamosInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    codigoInventario?: StringFieldUpdateOperationsInput | string
    estado?: StringFieldUpdateOperationsInput | string
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaActualizacion?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type EquipoUncheckedUpdateWithoutPrestamosInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: NullableStringFieldUpdateOperationsInput | string | null
    codigoInventario?: StringFieldUpdateOperationsInput | string
    estado?: StringFieldUpdateOperationsInput | string
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaActualizacion?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUpsertWithoutPrestamosRegistradosInput = {
    update: XOR<UserUpdateWithoutPrestamosRegistradosInput, UserUncheckedUpdateWithoutPrestamosRegistradosInput>
    create: XOR<UserCreateWithoutPrestamosRegistradosInput, UserUncheckedCreateWithoutPrestamosRegistradosInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPrestamosRegistradosInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPrestamosRegistradosInput, UserUncheckedUpdateWithoutPrestamosRegistradosInput>
  }

  export type UserUpdateWithoutPrestamosRegistradosInput = {
    usuario?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    prestamos?: PrestamoUpdateManyWithoutUsuarioNestedInput
    prestamosRecibidos?: PrestamoUpdateManyWithoutRecibidoPorNestedInput
  }

  export type UserUncheckedUpdateWithoutPrestamosRegistradosInput = {
    id?: IntFieldUpdateOperationsInput | number
    usuario?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    prestamos?: PrestamoUncheckedUpdateManyWithoutUsuarioNestedInput
    prestamosRecibidos?: PrestamoUncheckedUpdateManyWithoutRecibidoPorNestedInput
  }

  export type UserUpsertWithoutPrestamosRecibidosInput = {
    update: XOR<UserUpdateWithoutPrestamosRecibidosInput, UserUncheckedUpdateWithoutPrestamosRecibidosInput>
    create: XOR<UserCreateWithoutPrestamosRecibidosInput, UserUncheckedCreateWithoutPrestamosRecibidosInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPrestamosRecibidosInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPrestamosRecibidosInput, UserUncheckedUpdateWithoutPrestamosRecibidosInput>
  }

  export type UserUpdateWithoutPrestamosRecibidosInput = {
    usuario?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    prestamos?: PrestamoUpdateManyWithoutUsuarioNestedInput
    prestamosRegistrados?: PrestamoUpdateManyWithoutRegistradoPorNestedInput
  }

  export type UserUncheckedUpdateWithoutPrestamosRecibidosInput = {
    id?: IntFieldUpdateOperationsInput | number
    usuario?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    rol?: StringFieldUpdateOperationsInput | string
    activo?: BoolFieldUpdateOperationsInput | boolean
    prestamos?: PrestamoUncheckedUpdateManyWithoutUsuarioNestedInput
    prestamosRegistrados?: PrestamoUncheckedUpdateManyWithoutRegistradoPorNestedInput
  }

  export type PrestamoCreateManyUsuarioInput = {
    id?: number
    equipoId: number
    fechaPrestamo?: Date | string
    fechaDevolucionPrevista?: Date | string | null
    fechaDevolucionReal?: Date | string | null
    estado?: string
    observacionesPrestamo?: string | null
    observacionesDevolucion?: string | null
    registradoPorId?: number | null
    recibidoPorId?: number | null
    fechaCreacion?: Date | string
    fechaActualizacion?: Date | string
  }

  export type PrestamoCreateManyRegistradoPorInput = {
    id?: number
    usuarioId: number
    equipoId: number
    fechaPrestamo?: Date | string
    fechaDevolucionPrevista?: Date | string | null
    fechaDevolucionReal?: Date | string | null
    estado?: string
    observacionesPrestamo?: string | null
    observacionesDevolucion?: string | null
    recibidoPorId?: number | null
    fechaCreacion?: Date | string
    fechaActualizacion?: Date | string
  }

  export type PrestamoCreateManyRecibidoPorInput = {
    id?: number
    usuarioId: number
    equipoId: number
    fechaPrestamo?: Date | string
    fechaDevolucionPrevista?: Date | string | null
    fechaDevolucionReal?: Date | string | null
    estado?: string
    observacionesPrestamo?: string | null
    observacionesDevolucion?: string | null
    registradoPorId?: number | null
    fechaCreacion?: Date | string
    fechaActualizacion?: Date | string
  }

  export type PrestamoUpdateWithoutUsuarioInput = {
    fechaPrestamo?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaDevolucionPrevista?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fechaDevolucionReal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: StringFieldUpdateOperationsInput | string
    observacionesPrestamo?: NullableStringFieldUpdateOperationsInput | string | null
    observacionesDevolucion?: NullableStringFieldUpdateOperationsInput | string | null
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaActualizacion?: DateTimeFieldUpdateOperationsInput | Date | string
    equipo?: EquipoUpdateOneRequiredWithoutPrestamosNestedInput
    registradoPor?: UserUpdateOneWithoutPrestamosRegistradosNestedInput
    recibidoPor?: UserUpdateOneWithoutPrestamosRecibidosNestedInput
  }

  export type PrestamoUncheckedUpdateWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    equipoId?: IntFieldUpdateOperationsInput | number
    fechaPrestamo?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaDevolucionPrevista?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fechaDevolucionReal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: StringFieldUpdateOperationsInput | string
    observacionesPrestamo?: NullableStringFieldUpdateOperationsInput | string | null
    observacionesDevolucion?: NullableStringFieldUpdateOperationsInput | string | null
    registradoPorId?: NullableIntFieldUpdateOperationsInput | number | null
    recibidoPorId?: NullableIntFieldUpdateOperationsInput | number | null
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaActualizacion?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrestamoUncheckedUpdateManyWithoutUsuarioInput = {
    id?: IntFieldUpdateOperationsInput | number
    equipoId?: IntFieldUpdateOperationsInput | number
    fechaPrestamo?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaDevolucionPrevista?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fechaDevolucionReal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: StringFieldUpdateOperationsInput | string
    observacionesPrestamo?: NullableStringFieldUpdateOperationsInput | string | null
    observacionesDevolucion?: NullableStringFieldUpdateOperationsInput | string | null
    registradoPorId?: NullableIntFieldUpdateOperationsInput | number | null
    recibidoPorId?: NullableIntFieldUpdateOperationsInput | number | null
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaActualizacion?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrestamoUpdateWithoutRegistradoPorInput = {
    fechaPrestamo?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaDevolucionPrevista?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fechaDevolucionReal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: StringFieldUpdateOperationsInput | string
    observacionesPrestamo?: NullableStringFieldUpdateOperationsInput | string | null
    observacionesDevolucion?: NullableStringFieldUpdateOperationsInput | string | null
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaActualizacion?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UserUpdateOneRequiredWithoutPrestamosNestedInput
    equipo?: EquipoUpdateOneRequiredWithoutPrestamosNestedInput
    recibidoPor?: UserUpdateOneWithoutPrestamosRecibidosNestedInput
  }

  export type PrestamoUncheckedUpdateWithoutRegistradoPorInput = {
    id?: IntFieldUpdateOperationsInput | number
    usuarioId?: IntFieldUpdateOperationsInput | number
    equipoId?: IntFieldUpdateOperationsInput | number
    fechaPrestamo?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaDevolucionPrevista?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fechaDevolucionReal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: StringFieldUpdateOperationsInput | string
    observacionesPrestamo?: NullableStringFieldUpdateOperationsInput | string | null
    observacionesDevolucion?: NullableStringFieldUpdateOperationsInput | string | null
    recibidoPorId?: NullableIntFieldUpdateOperationsInput | number | null
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaActualizacion?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrestamoUncheckedUpdateManyWithoutRegistradoPorInput = {
    id?: IntFieldUpdateOperationsInput | number
    usuarioId?: IntFieldUpdateOperationsInput | number
    equipoId?: IntFieldUpdateOperationsInput | number
    fechaPrestamo?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaDevolucionPrevista?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fechaDevolucionReal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: StringFieldUpdateOperationsInput | string
    observacionesPrestamo?: NullableStringFieldUpdateOperationsInput | string | null
    observacionesDevolucion?: NullableStringFieldUpdateOperationsInput | string | null
    recibidoPorId?: NullableIntFieldUpdateOperationsInput | number | null
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaActualizacion?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrestamoUpdateWithoutRecibidoPorInput = {
    fechaPrestamo?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaDevolucionPrevista?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fechaDevolucionReal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: StringFieldUpdateOperationsInput | string
    observacionesPrestamo?: NullableStringFieldUpdateOperationsInput | string | null
    observacionesDevolucion?: NullableStringFieldUpdateOperationsInput | string | null
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaActualizacion?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UserUpdateOneRequiredWithoutPrestamosNestedInput
    equipo?: EquipoUpdateOneRequiredWithoutPrestamosNestedInput
    registradoPor?: UserUpdateOneWithoutPrestamosRegistradosNestedInput
  }

  export type PrestamoUncheckedUpdateWithoutRecibidoPorInput = {
    id?: IntFieldUpdateOperationsInput | number
    usuarioId?: IntFieldUpdateOperationsInput | number
    equipoId?: IntFieldUpdateOperationsInput | number
    fechaPrestamo?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaDevolucionPrevista?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fechaDevolucionReal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: StringFieldUpdateOperationsInput | string
    observacionesPrestamo?: NullableStringFieldUpdateOperationsInput | string | null
    observacionesDevolucion?: NullableStringFieldUpdateOperationsInput | string | null
    registradoPorId?: NullableIntFieldUpdateOperationsInput | number | null
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaActualizacion?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrestamoUncheckedUpdateManyWithoutRecibidoPorInput = {
    id?: IntFieldUpdateOperationsInput | number
    usuarioId?: IntFieldUpdateOperationsInput | number
    equipoId?: IntFieldUpdateOperationsInput | number
    fechaPrestamo?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaDevolucionPrevista?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fechaDevolucionReal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: StringFieldUpdateOperationsInput | string
    observacionesPrestamo?: NullableStringFieldUpdateOperationsInput | string | null
    observacionesDevolucion?: NullableStringFieldUpdateOperationsInput | string | null
    registradoPorId?: NullableIntFieldUpdateOperationsInput | number | null
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaActualizacion?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrestamoCreateManyEquipoInput = {
    id?: number
    usuarioId: number
    fechaPrestamo?: Date | string
    fechaDevolucionPrevista?: Date | string | null
    fechaDevolucionReal?: Date | string | null
    estado?: string
    observacionesPrestamo?: string | null
    observacionesDevolucion?: string | null
    registradoPorId?: number | null
    recibidoPorId?: number | null
    fechaCreacion?: Date | string
    fechaActualizacion?: Date | string
  }

  export type PrestamoUpdateWithoutEquipoInput = {
    fechaPrestamo?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaDevolucionPrevista?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fechaDevolucionReal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: StringFieldUpdateOperationsInput | string
    observacionesPrestamo?: NullableStringFieldUpdateOperationsInput | string | null
    observacionesDevolucion?: NullableStringFieldUpdateOperationsInput | string | null
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaActualizacion?: DateTimeFieldUpdateOperationsInput | Date | string
    usuario?: UserUpdateOneRequiredWithoutPrestamosNestedInput
    registradoPor?: UserUpdateOneWithoutPrestamosRegistradosNestedInput
    recibidoPor?: UserUpdateOneWithoutPrestamosRecibidosNestedInput
  }

  export type PrestamoUncheckedUpdateWithoutEquipoInput = {
    id?: IntFieldUpdateOperationsInput | number
    usuarioId?: IntFieldUpdateOperationsInput | number
    fechaPrestamo?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaDevolucionPrevista?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fechaDevolucionReal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: StringFieldUpdateOperationsInput | string
    observacionesPrestamo?: NullableStringFieldUpdateOperationsInput | string | null
    observacionesDevolucion?: NullableStringFieldUpdateOperationsInput | string | null
    registradoPorId?: NullableIntFieldUpdateOperationsInput | number | null
    recibidoPorId?: NullableIntFieldUpdateOperationsInput | number | null
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaActualizacion?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PrestamoUncheckedUpdateManyWithoutEquipoInput = {
    id?: IntFieldUpdateOperationsInput | number
    usuarioId?: IntFieldUpdateOperationsInput | number
    fechaPrestamo?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaDevolucionPrevista?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    fechaDevolucionReal?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    estado?: StringFieldUpdateOperationsInput | string
    observacionesPrestamo?: NullableStringFieldUpdateOperationsInput | string | null
    observacionesDevolucion?: NullableStringFieldUpdateOperationsInput | string | null
    registradoPorId?: NullableIntFieldUpdateOperationsInput | number | null
    recibidoPorId?: NullableIntFieldUpdateOperationsInput | number | null
    fechaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    fechaActualizacion?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Aliases for legacy arg types
   */
    /**
     * @deprecated Use UserCountOutputTypeDefaultArgs instead
     */
    export type UserCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EquipoCountOutputTypeDefaultArgs instead
     */
    export type EquipoCountOutputTypeArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EquipoCountOutputTypeDefaultArgs<ExtArgs>
    /**
     * @deprecated Use UserDefaultArgs instead
     */
    export type UserArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = UserDefaultArgs<ExtArgs>
    /**
     * @deprecated Use EquipoDefaultArgs instead
     */
    export type EquipoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = EquipoDefaultArgs<ExtArgs>
    /**
     * @deprecated Use PrestamoDefaultArgs instead
     */
    export type PrestamoArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = PrestamoDefaultArgs<ExtArgs>

  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}