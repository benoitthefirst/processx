﻿global using System.Text.Json.Serialization;
global using DotNetEnv;
global using MongoDB;
global using MongoDB.Bson;
global using MongoDB.Bson.Serialization.Attributes;
global using MongoDB.Bson.Serialization;
global using MongoDB.Driver;
global using ProcessX;
global using ProcessX.Helpers;
global using ProcessX.Helpers.Exceptions;
global using ProcessX.Helpers.Extensions;
global using ProcessX.Models.Jwt;
global using ProcessX.Models.Auth;
global using ProcessX.Models.Requests;
global using ProcessX.Models;
global using ProcessX.Handlers.Interfaces;
global using ProcessX.Handlers.Auth;
global using ProcessX.Actions;
global using ProcessX.Actions.Interfaces;
global using Microsoft.IdentityModel.Tokens;
global using Microsoft.IdentityModel.JsonWebTokens;
global using Microsoft.AspNetCore.Authentication.JwtBearer;
global using Microsoft.AspNetCore.Authentication;
global using Microsoft.AspNetCore.Authorization;
global using Microsoft.AspNetCore.Mvc;
global using Microsoft.Extensions.Options;
global using Microsoft.AspNetCore.SignalR;
global using System;
global using System.Security.Claims;
global using System.Text;
global using System.Text.Json;
global using System.Text.Encodings.Web;
global using System.Net;
global using System.Net.Mime;
global using FluentPasswordHashing;
global using FluentPasswordHashing.Generated;