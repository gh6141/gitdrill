(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}

console.warn('Compiled in DEV mode. Follow the advice at https://elm-lang.org/0.19.0/optimize for better performance and smaller assets.');


var _List_Nil_UNUSED = { $: 0 };
var _List_Nil = { $: '[]' };

function _List_Cons_UNUSED(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === elm$core$Basics$EQ ? 0 : ord === elm$core$Basics$LT ? -1 : 1;
	}));
});



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	/**/
	if (x.$ === 'Set_elm_builtin')
	{
		x = elm$core$Set$toList(x);
		y = elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	/**_UNUSED/
	if (x.$ < 0)
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**_UNUSED/
	if (typeof x.$ === 'undefined')
	//*/
	/**/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? elm$core$Basics$LT : n ? elm$core$Basics$GT : elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0_UNUSED = 0;
var _Utils_Tuple0 = { $: '#0' };

function _Utils_Tuple2_UNUSED(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3_UNUSED(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr_UNUSED(c) { return c; }
function _Utils_chr(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



// LOG

var _Debug_log_UNUSED = F2(function(tag, value)
{
	return value;
});

var _Debug_log = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString_UNUSED(value)
{
	return '<internals>';
}

function _Debug_toString(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof DataView === 'function' && value instanceof DataView)
	{
		return _Debug_stringColor(ansi, '<' + value.byteLength + ' bytes>');
	}

	if (typeof File === 'function' && value instanceof File)
	{
		return _Debug_internalColor(ansi, '<' + value.name + '>');
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
}

function _Debug_toHexDigit(n)
{
	return String.fromCharCode(n < 10 ? 48 + n : 55 + n);
}


// CRASH


function _Debug_crash_UNUSED(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.start.line === region.end.line)
	{
		return 'on line ' + region.start.line;
	}
	return 'on lines ' + region.start.line + ' through ' + region.end.line;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800, code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? elm$core$Maybe$Nothing
		: elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? elm$core$Maybe$Just(n) : elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




/**/
function _Json_errorToString(error)
{
	return elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

function _Json_decodePrim(decoder)
{
	return { $: 2, b: decoder };
}

var _Json_decodeInt = _Json_decodePrim(function(value) {
	return (typeof value !== 'number')
		? _Json_expecting('an INT', value)
		:
	(-2147483647 < value && value < 2147483647 && (value | 0) === value)
		? elm$core$Result$Ok(value)
		:
	(isFinite(value) && !(value % 1))
		? elm$core$Result$Ok(value)
		: _Json_expecting('an INT', value);
});

var _Json_decodeBool = _Json_decodePrim(function(value) {
	return (typeof value === 'boolean')
		? elm$core$Result$Ok(value)
		: _Json_expecting('a BOOL', value);
});

var _Json_decodeFloat = _Json_decodePrim(function(value) {
	return (typeof value === 'number')
		? elm$core$Result$Ok(value)
		: _Json_expecting('a FLOAT', value);
});

var _Json_decodeValue = _Json_decodePrim(function(value) {
	return elm$core$Result$Ok(_Json_wrap(value));
});

var _Json_decodeString = _Json_decodePrim(function(value) {
	return (typeof value === 'string')
		? elm$core$Result$Ok(value)
		: (value instanceof String)
			? elm$core$Result$Ok(value + '')
			: _Json_expecting('a STRING', value);
});

function _Json_decodeList(decoder) { return { $: 3, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 4, b: decoder }; }

function _Json_decodeNull(value) { return { $: 5, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 6,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 7,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 8,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 9,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 10,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 11,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 2:
			return decoder.b(value);

		case 5:
			return (value === null)
				? elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 3:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 4:
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 6:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Field, field, result.a));

		case 7:
			var index = decoder.e;
			if (!_Json_isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Index, index, result.a));

		case 8:
			if (typeof value !== 'object' || value === null || _Json_isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!elm$core$Result$isOk(result))
					{
						return elm$core$Result$Err(A2(elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return elm$core$Result$Ok(elm$core$List$reverse(keyValuePairs));

		case 9:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return elm$core$Result$Ok(answer);

		case 10:
			var result = _Json_runHelp(decoder.b, value);
			return (!elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 11:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if (elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return elm$core$Result$Err(elm$json$Json$Decode$OneOf(elm$core$List$reverse(errors)));

		case 1:
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!elm$core$Result$isOk(result))
		{
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return elm$core$Result$Ok(toElmValue(array));
}

function _Json_isArray(value)
{
	return Array.isArray(value) || (typeof FileList !== 'undefined' && value instanceof FileList);
}

function _Json_toElmArray(array)
{
	return A2(elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 2:
			return x.b === y.b;

		case 5:
			return x.c === y.c;

		case 3:
		case 4:
		case 8:
			return _Json_equality(x.b, y.b);

		case 6:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 7:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 9:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 10:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 11:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap(value) { return { $: 0, a: value }; }
function _Json_unwrap(value) { return value.a; }

function _Json_wrap_UNUSED(value) { return value; }
function _Json_unwrap_UNUSED(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	elm$core$Result$isOk(result) || _Debug_crash(2 /**/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_dispatchEffects(managers, result.b, subscriptions(model));
	}

	_Platform_dispatchEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				p: bag.n,
				q: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.q)
		{
			x = temp.p(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		r: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		r: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**_UNUSED/
	var node = args['node'];
	//*/
	/**/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2(elm$json$Json$Decode$map, func, handler.a)
				:
			A3(elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		message: func(record.message),
		stopPropagation: record.stopPropagation,
		preventDefault: record.preventDefault
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		((key !== 'value' && key !== 'checked') || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		typeof value !== 'undefined'
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		typeof value !== 'undefined'
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.message;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.stopPropagation;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.preventDefault) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		var newMatch = undefined;
		var oldMatch = undefined;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}




// STRINGS


var _Parser_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var isGood = offset + smallLength <= bigString.length;

	for (var i = 0; isGood && i < smallLength; )
	{
		var code = bigString.charCodeAt(offset);
		isGood =
			smallString[i++] === bigString[offset++]
			&& (
				code === 0x000A /* \n */
					? ( row++, col=1 )
					: ( col++, (code & 0xF800) === 0xD800 ? smallString[i++] === bigString[offset++] : 1 )
			)
	}

	return _Utils_Tuple3(isGood ? offset : -1, row, col);
});



// CHARS


var _Parser_isSubChar = F3(function(predicate, offset, string)
{
	return (
		string.length <= offset
			? -1
			:
		(string.charCodeAt(offset) & 0xF800) === 0xD800
			? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
			:
		(predicate(_Utils_chr(string[offset]))
			? ((string[offset] === '\n') ? -2 : (offset + 1))
			: -1
		)
	);
});


var _Parser_isAsciiCode = F3(function(code, offset, string)
{
	return string.charCodeAt(offset) === code;
});



// NUMBERS


var _Parser_chompBase10 = F2(function(offset, string)
{
	for (; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (code < 0x30 || 0x39 < code)
		{
			return offset;
		}
	}
	return offset;
});


var _Parser_consumeBase = F3(function(base, offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var digit = string.charCodeAt(offset) - 0x30;
		if (digit < 0 || base <= digit) break;
		total = base * total + digit;
	}
	return _Utils_Tuple2(offset, total);
});


var _Parser_consumeBase16 = F2(function(offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (0x30 <= code && code <= 0x39)
		{
			total = 16 * total + code - 0x30;
		}
		else if (0x41 <= code && code <= 0x46)
		{
			total = 16 * total + code - 55;
		}
		else if (0x61 <= code && code <= 0x66)
		{
			total = 16 * total + code - 87;
		}
		else
		{
			break;
		}
	}
	return _Utils_Tuple2(offset, total);
});



// FIND STRING


var _Parser_findSubString = F5(function(smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);
	var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;

	while (offset < target)
	{
		var code = bigString.charCodeAt(offset++);
		code === 0x000A /* \n */
			? ( col=1, row++ )
			: ( col++, (code & 0xF800) === 0xD800 && offset++ )
	}

	return _Utils_Tuple3(newOffset, row, col);
});



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});


// CREATE

var _Regex_never = /.^/;

var _Regex_fromStringWith = F2(function(options, string)
{
	var flags = 'g';
	if (options.multiline) { flags += 'm'; }
	if (options.caseInsensitive) { flags += 'i'; }

	try
	{
		return elm$core$Maybe$Just(new RegExp(string, flags));
	}
	catch(error)
	{
		return elm$core$Maybe$Nothing;
	}
});


// USE

var _Regex_contains = F2(function(re, string)
{
	return string.match(re) !== null;
});


var _Regex_findAtMost = F3(function(n, re, str)
{
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex == re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch
				? elm$core$Maybe$Just(submatch)
				: elm$core$Maybe$Nothing;
		}
		out.push(A4(elm$regex$Regex$Match, result[0], result.index, number, _List_fromArray(subs)));
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _List_fromArray(out);
});


var _Regex_replaceAtMost = F4(function(n, re, replacer, string)
{
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch
				? elm$core$Maybe$Just(submatch)
				: elm$core$Maybe$Nothing;
		}
		return replacer(A4(elm$regex$Regex$Match, match, arguments[arguments.length - 2], count, _List_fromArray(submatches)));
	}
	return string.replace(re, jsReplacer);
});

var _Regex_splitAtMost = F3(function(n, re, str)
{
	var string = str;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		var result = re.exec(string);
		if (!result) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _List_fromArray(out);
});

var _Regex_infinity = Infinity;




// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var view = impl.view;
			/**_UNUSED/
			var domNode = args['node'];
			//*/
			/**/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.init,
		impl.update,
		impl.subscriptions,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.setup && impl.setup(sendToApp)
			var view = impl.view;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.body);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.title) && (_VirtualDom_doc.title = title = doc.title);
			});
		}
	);
});



// ANIMATION


var _Browser_cancelAnimationFrame =
	typeof cancelAnimationFrame !== 'undefined'
		? cancelAnimationFrame
		: function(id) { clearTimeout(id); };

var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { return setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.onUrlChange;
	var onUrlRequest = impl.onUrlRequest;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		setup: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.hasAttribute('download'))
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.protocol === next.protocol
							&& curr.host === next.host
							&& curr.port_.a === next.port_.a
						)
							? elm$browser$Browser$Internal(next)
							: elm$browser$Browser$External(href)
					));
				}
			});
		},
		init: function(flags)
		{
			return A3(impl.init, flags, _Browser_getUrl(), key);
		},
		view: impl.view,
		update: impl.update,
		subscriptions: impl.subscriptions
	});
}

function _Browser_getUrl()
{
	return elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return elm$core$Result$isOk(result) ? elm$core$Maybe$Just(result.a) : elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { hidden: 'hidden', change: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { hidden: 'mozHidden', change: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { hidden: 'msHidden', change: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { hidden: 'webkitHidden', change: 'webkitvisibilitychange' }
		: { hidden: 'hidden', change: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = _Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			_Browser_cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail(elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		scene: _Browser_getScene(),
		viewport: {
			x: _Browser_window.pageXOffset,
			y: _Browser_window.pageYOffset,
			width: _Browser_doc.documentElement.clientWidth,
			height: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		width: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		height: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			scene: {
				width: node.scrollWidth,
				height: node.scrollHeight
			},
			viewport: {
				x: node.scrollLeft,
				y: node.scrollTop,
				width: node.clientWidth,
				height: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			scene: _Browser_getScene(),
			viewport: {
				x: x,
				y: y,
				width: _Browser_doc.documentElement.clientWidth,
				height: _Browser_doc.documentElement.clientHeight
			},
			element: {
				x: x + rect.left,
				y: y + rect.top,
				width: rect.width,
				height: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}
var elm$core$Basics$False = {$: 'False'};
var elm$core$Basics$True = {$: 'True'};
var elm$core$Result$isOk = function (result) {
	if (result.$ === 'Ok') {
		return true;
	} else {
		return false;
	}
};
var elm$core$Basics$EQ = {$: 'EQ'};
var elm$core$Basics$GT = {$: 'GT'};
var elm$core$Basics$LT = {$: 'LT'};
var elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var elm$core$List$cons = _List_cons;
var elm$core$Dict$toList = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var elm$core$Dict$keys = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2(elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var elm$core$Set$toList = function (_n0) {
	var dict = _n0.a;
	return elm$core$Dict$keys(dict);
};
var elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var elm$core$Array$foldr = F3(
	function (func, baseCase, _n0) {
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = F2(
			function (node, acc) {
				if (node.$ === 'SubTree') {
					var subTree = node.a;
					return A3(elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3(elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			elm$core$Elm$JsArray$foldr,
			helper,
			A3(elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var elm$core$Array$toList = function (array) {
	return A3(elm$core$Array$foldr, elm$core$List$cons, _List_Nil, array);
};
var elm$core$Array$branchFactor = 32;
var elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 'Array_elm_builtin', a: a, b: b, c: c, d: d};
	});
var elm$core$Basics$ceiling = _Basics_ceiling;
var elm$core$Basics$fdiv = _Basics_fdiv;
var elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var elm$core$Basics$toFloat = _Basics_toFloat;
var elm$core$Array$shiftStep = elm$core$Basics$ceiling(
	A2(elm$core$Basics$logBase, 2, elm$core$Array$branchFactor));
var elm$core$Elm$JsArray$empty = _JsArray_empty;
var elm$core$Array$empty = A4(elm$core$Array$Array_elm_builtin, 0, elm$core$Array$shiftStep, elm$core$Elm$JsArray$empty, elm$core$Elm$JsArray$empty);
var elm$core$Array$Leaf = function (a) {
	return {$: 'Leaf', a: a};
};
var elm$core$Array$SubTree = function (a) {
	return {$: 'SubTree', a: a};
};
var elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var elm$core$List$reverse = function (list) {
	return A3(elm$core$List$foldl, elm$core$List$cons, _List_Nil, list);
};
var elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodes);
			var node = _n0.a;
			var remainingNodes = _n0.b;
			var newAcc = A2(
				elm$core$List$cons,
				elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var elm$core$Basics$eq = _Utils_equal;
var elm$core$Tuple$first = function (_n0) {
	var x = _n0.a;
	return x;
};
var elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = elm$core$Basics$ceiling(nodeListSize / elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2(elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var elm$core$Basics$add = _Basics_add;
var elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var elm$core$Basics$floor = _Basics_floor;
var elm$core$Basics$gt = _Utils_gt;
var elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var elm$core$Basics$mul = _Basics_mul;
var elm$core$Basics$sub = _Basics_sub;
var elm$core$Elm$JsArray$length = _JsArray_length;
var elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.nodeListSize) {
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.tail),
				elm$core$Array$shiftStep,
				elm$core$Elm$JsArray$empty,
				builder.tail);
		} else {
			var treeLen = builder.nodeListSize * elm$core$Array$branchFactor;
			var depth = elm$core$Basics$floor(
				A2(elm$core$Basics$logBase, elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? elm$core$List$reverse(builder.nodeList) : builder.nodeList;
			var tree = A2(elm$core$Array$treeFromBuilder, correctNodeList, builder.nodeListSize);
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.tail) + treeLen,
				A2(elm$core$Basics$max, 5, depth * elm$core$Array$shiftStep),
				tree,
				builder.tail);
		}
	});
var elm$core$Basics$idiv = _Basics_idiv;
var elm$core$Basics$lt = _Utils_lt;
var elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					elm$core$Array$builderToArray,
					false,
					{nodeList: nodeList, nodeListSize: (len / elm$core$Array$branchFactor) | 0, tail: tail});
			} else {
				var leaf = elm$core$Array$Leaf(
					A3(elm$core$Elm$JsArray$initialize, elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2(elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var elm$core$Basics$le = _Utils_le;
var elm$core$Basics$remainderBy = _Basics_remainderBy;
var elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return elm$core$Array$empty;
		} else {
			var tailLen = len % elm$core$Array$branchFactor;
			var tail = A3(elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - elm$core$Array$branchFactor;
			return A5(elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var elm$core$Maybe$Just = function (a) {
	return {$: 'Just', a: a};
};
var elm$core$Maybe$Nothing = {$: 'Nothing'};
var elm$core$Result$Err = function (a) {
	return {$: 'Err', a: a};
};
var elm$core$Result$Ok = function (a) {
	return {$: 'Ok', a: a};
};
var elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 'Failure', a: a, b: b};
	});
var elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 'Field', a: a, b: b};
	});
var elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 'Index', a: a, b: b};
	});
var elm$json$Json$Decode$OneOf = function (a) {
	return {$: 'OneOf', a: a};
};
var elm$core$Basics$and = _Basics_and;
var elm$core$Basics$append = _Utils_append;
var elm$core$Basics$or = _Basics_or;
var elm$core$Char$toCode = _Char_toCode;
var elm$core$Char$isLower = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var elm$core$Char$isUpper = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var elm$core$Char$isAlpha = function (_char) {
	return elm$core$Char$isLower(_char) || elm$core$Char$isUpper(_char);
};
var elm$core$Char$isDigit = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var elm$core$Char$isAlphaNum = function (_char) {
	return elm$core$Char$isLower(_char) || (elm$core$Char$isUpper(_char) || elm$core$Char$isDigit(_char));
};
var elm$core$List$length = function (xs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var elm$core$List$map2 = _List_map2;
var elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2(elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var elm$core$List$range = F2(
	function (lo, hi) {
		return A3(elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$map2,
			f,
			A2(
				elm$core$List$range,
				0,
				elm$core$List$length(xs) - 1),
			xs);
	});
var elm$core$String$all = _String_all;
var elm$core$String$fromInt = _String_fromNumber;
var elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var elm$core$String$uncons = _String_uncons;
var elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var elm$json$Json$Decode$indent = function (str) {
	return A2(
		elm$core$String$join,
		'\n    ',
		A2(elm$core$String$split, '\n', str));
};
var elm$json$Json$Encode$encode = _Json_encode;
var elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + (elm$core$String$fromInt(i + 1) + (') ' + elm$json$Json$Decode$indent(
			elm$json$Json$Decode$errorToString(error))));
	});
var elm$json$Json$Decode$errorToString = function (error) {
	return A2(elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 'Field':
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _n1 = elm$core$String$uncons(f);
						if (_n1.$ === 'Nothing') {
							return false;
						} else {
							var _n2 = _n1.a;
							var _char = _n2.a;
							var rest = _n2.b;
							return elm$core$Char$isAlpha(_char) && A2(elm$core$String$all, elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'Index':
					var i = error.a;
					var err = error.b;
					var indexName = '[' + (elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 'OneOf':
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									elm$core$String$join,
									'',
									elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										elm$core$String$join,
										'',
										elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + (elm$core$String$fromInt(
								elm$core$List$length(errors)) + ' ways:'));
							return A2(
								elm$core$String$join,
								'\n\n',
								A2(
									elm$core$List$cons,
									introduction,
									A2(elm$core$List$indexedMap, elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								elm$core$String$join,
								'',
								elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + (elm$json$Json$Decode$indent(
						A2(elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var elm$core$Platform$Cmd$batch = _Platform_batch;
var elm$core$Platform$Cmd$none = elm$core$Platform$Cmd$batch(_List_Nil);
var author$project$Main$init = _Utils_Tuple2(
	{},
	elm$core$Platform$Cmd$none);
var author$project$Main$update = F2(
	function (msg, model) {
		return _Utils_Tuple2(model, elm$core$Platform$Cmd$none);
	});
var author$project$Main$LatexMsg = function (a) {
	return {$: 'LatexMsg', a: a};
};
var author$project$Strings$miniLaTeX = '\r\n  \r\nThis is a \\italic{very important} test.\r\n\\begin{itemize}\r\n\\item This is a \\blue{Blue} item.\r\n\\end{itemize}\r\n';
var elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							elm$core$List$foldl,
							fn,
							acc,
							elm$core$List$reverse(r4)) : A4(elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4(elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var elm$core$Basics$identity = function (x) {
	return x;
};
var elm$json$Json$Decode$map = _Json_map1;
var elm$json$Json$Decode$map2 = _Json_map2;
var elm$json$Json$Decode$succeed = _Json_succeed;
var elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 'Normal':
			return 0;
		case 'MayStopPropagation':
			return 1;
		case 'MayPreventDefault':
			return 2;
		default:
			return 3;
	}
};
var elm$html$Html$div = _VirtualDom_node('div');
var elm$html$Html$h1 = _VirtualDom_node('h1');
var elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var elm$html$Html$map = elm$virtual_dom$VirtualDom$map;
var elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var elm$html$Html$text = elm$virtual_dom$VirtualDom$text;
var elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var elm$html$Html$Attributes$style = elm$virtual_dom$VirtualDom$style;
var elm$core$String$length = _String_length;
var elm$core$String$slice = _String_slice;
var elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			elm$core$String$slice,
			n,
			elm$core$String$length(string),
			string);
	});
var elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(elm$core$String$slice, 0, n, string);
	});
var elm$json$Json$Encode$string = _Json_wrap;
var elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			elm$json$Json$Encode$string(string));
	});
var elm$html$Html$Attributes$id = elm$html$Html$Attributes$stringProperty('id');
var elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 'Normal', a: a};
};
var elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var elm$html$Html$Events$onClick = function (msg) {
	return A2(
		elm$html$Html$Events$on,
		'click',
		elm$json$Json$Decode$succeed(msg));
};
var elm$virtual_dom$VirtualDom$keyedNode = function (tag) {
	return _VirtualDom_keyedNode(
		_VirtualDom_noScript(tag));
};
var elm$html$Html$Keyed$node = elm$virtual_dom$VirtualDom$keyedNode;
var elm$core$Tuple$second = function (_n0) {
	var y = _n0.b;
	return y;
};
var elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var elm$core$String$trim = _String_trim;
var jxxcarlson$meenylatex$Internal$Accumulator$theoremWords = _List_fromArray(
	['theorem', 'proposition', 'corollary', 'lemma', 'definition', 'problem']);
var elm$core$Dict$RBEmpty_elm_builtin = {$: 'RBEmpty_elm_builtin'};
var elm$core$Dict$empty = elm$core$Dict$RBEmpty_elm_builtin;
var elm$core$Dict$Black = {$: 'Black'};
var elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: 'RBNode_elm_builtin', a: a, b: b, c: c, d: d, e: e};
	});
var elm$core$Basics$compare = _Utils_compare;
var elm$core$Dict$Red = {$: 'Red'};
var elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Red')) {
			var _n1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
				var _n3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Red,
					key,
					value,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) && (left.d.$ === 'RBNode_elm_builtin')) && (left.d.a.$ === 'Red')) {
				var _n5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _n6 = left.d;
				var _n7 = _n6.a;
				var llK = _n6.b;
				var llV = _n6.c;
				var llLeft = _n6.d;
				var llRight = _n6.e;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Red,
					lK,
					lV,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, llK, llV, llLeft, llRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, key, value, lRight, right));
			} else {
				return A5(elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, elm$core$Dict$RBEmpty_elm_builtin, elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _n1 = A2(elm$core$Basics$compare, key, nKey);
			switch (_n1.$) {
				case 'LT':
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3(elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 'EQ':
					return A5(elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3(elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _n0 = A3(elm$core$Dict$insertHelp, key, value, dict);
		if ((_n0.$ === 'RBNode_elm_builtin') && (_n0.a.$ === 'Red')) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Dict$fromList = function (assocs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, dict) {
				var key = _n0.a;
				var value = _n0.b;
				return A3(elm$core$Dict$insert, key, value, dict);
			}),
		elm$core$Dict$empty,
		assocs);
};
var elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var elm$core$String$toInt = _String_toInt;
var jxxcarlson$meenylatex$Internal$MathMacro$MacroBody = F2(
	function (a, b) {
		return {$: 'MacroBody', a: a, b: b};
	});
var jxxcarlson$meenylatex$Internal$MathMacro$MathText = function (a) {
	return {$: 'MathText', a: a};
};
var jxxcarlson$meenylatex$Internal$MathMacro$makeEntry = function (mathExpression_) {
	if (mathExpression_.$ === 'NewCommand') {
		var macroName_ = mathExpression_.a;
		var nArgs = mathExpression_.b;
		var body = mathExpression_.c;
		return _Utils_Tuple2(
			macroName_,
			A2(
				jxxcarlson$meenylatex$Internal$MathMacro$MacroBody,
				A2(
					elm$core$Maybe$withDefault,
					0,
					elm$core$String$toInt(nArgs)),
				body));
	} else {
		return _Utils_Tuple2(
			'nullMacro',
			A2(
				jxxcarlson$meenylatex$Internal$MathMacro$MacroBody,
				0,
				_List_fromArray(
					[
						jxxcarlson$meenylatex$Internal$MathMacro$MathText('0')
					])));
	}
};
var elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 'Empty':
					return list;
				case 'AddRight':
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2(elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2(elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var elm$parser$Parser$Advanced$run = F2(
	function (_n0, src) {
		var parse = _n0.a;
		var _n1 = parse(
			{col: 1, context: _List_Nil, indent: 1, offset: 0, row: 1, src: src});
		if (_n1.$ === 'Good') {
			var value = _n1.b;
			return elm$core$Result$Ok(value);
		} else {
			var bag = _n1.b;
			return elm$core$Result$Err(
				A2(elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var elm$parser$Parser$Advanced$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 'Bad', a: a, b: b};
	});
var elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 'Good', a: a, b: b, c: c};
	});
var elm$parser$Parser$Advanced$loopHelp = F4(
	function (p, state, callback, s0) {
		loopHelp:
		while (true) {
			var _n0 = callback(state);
			var parse = _n0.a;
			var _n1 = parse(s0);
			if (_n1.$ === 'Good') {
				var p1 = _n1.a;
				var step = _n1.b;
				var s1 = _n1.c;
				if (step.$ === 'Loop') {
					var newState = step.a;
					var $temp$p = p || p1,
						$temp$state = newState,
						$temp$callback = callback,
						$temp$s0 = s1;
					p = $temp$p;
					state = $temp$state;
					callback = $temp$callback;
					s0 = $temp$s0;
					continue loopHelp;
				} else {
					var result = step.a;
					return A3(elm$parser$Parser$Advanced$Good, p || p1, result, s1);
				}
			} else {
				var p1 = _n1.a;
				var x = _n1.b;
				return A2(elm$parser$Parser$Advanced$Bad, p || p1, x);
			}
		}
	});
var elm$parser$Parser$Advanced$loop = F2(
	function (state, callback) {
		return elm$parser$Parser$Advanced$Parser(
			function (s) {
				return A4(elm$parser$Parser$Advanced$loopHelp, false, state, callback, s);
			});
	});
var elm$parser$Parser$Advanced$Done = function (a) {
	return {$: 'Done', a: a};
};
var elm$parser$Parser$Advanced$Loop = function (a) {
	return {$: 'Loop', a: a};
};
var elm$core$Basics$always = F2(
	function (a, _n0) {
		return a;
	});
var elm$parser$Parser$Advanced$map2 = F3(
	function (func, _n0, _n1) {
		var parseA = _n0.a;
		var parseB = _n1.a;
		return elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _n2 = parseA(s0);
				if (_n2.$ === 'Bad') {
					var p = _n2.a;
					var x = _n2.b;
					return A2(elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _n2.a;
					var a = _n2.b;
					var s1 = _n2.c;
					var _n3 = parseB(s1);
					if (_n3.$ === 'Bad') {
						var p2 = _n3.a;
						var x = _n3.b;
						return A2(elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _n3.a;
						var b = _n3.b;
						var s2 = _n3.c;
						return A3(
							elm$parser$Parser$Advanced$Good,
							p1 || p2,
							A2(func, a, b),
							s2);
					}
				}
			});
	});
var elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3(elm$parser$Parser$Advanced$map2, elm$core$Basics$always, keepParser, ignoreParser);
	});
var elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3(elm$parser$Parser$Advanced$map2, elm$core$Basics$apL, parseFunc, parseArg);
	});
var elm$parser$Parser$Advanced$map = F2(
	function (func, _n0) {
		var parse = _n0.a;
		return elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _n1 = parse(s0);
				if (_n1.$ === 'Good') {
					var p = _n1.a;
					var a = _n1.b;
					var s1 = _n1.c;
					return A3(
						elm$parser$Parser$Advanced$Good,
						p,
						func(a),
						s1);
				} else {
					var p = _n1.a;
					var x = _n1.b;
					return A2(elm$parser$Parser$Advanced$Bad, p, x);
				}
			});
	});
var elm$parser$Parser$Advanced$Empty = {$: 'Empty'};
var elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 'Append', a: a, b: b};
	});
var elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2(elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a.a;
				var remainingParsers = parsers.b;
				var _n1 = parse(s0);
				if (_n1.$ === 'Good') {
					var step = _n1;
					return step;
				} else {
					var step = _n1;
					var p = step.a;
					var x = step.b;
					if (p) {
						return step;
					} else {
						var $temp$s0 = s0,
							$temp$bag = A2(elm$parser$Parser$Advanced$Append, bag, x),
							$temp$parsers = remainingParsers;
						s0 = $temp$s0;
						bag = $temp$bag;
						parsers = $temp$parsers;
						continue oneOfHelp;
					}
				}
			}
		}
	});
var elm$parser$Parser$Advanced$oneOf = function (parsers) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3(elm$parser$Parser$Advanced$oneOfHelp, s, elm$parser$Parser$Advanced$Empty, parsers);
		});
};
var elm$parser$Parser$Advanced$succeed = function (a) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A3(elm$parser$Parser$Advanced$Good, false, a, s);
		});
};
var elm$core$Basics$negate = function (n) {
	return -n;
};
var elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3(elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.src);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.offset, offset) < 0,
					_Utils_Tuple0,
					{col: col, context: s0.context, indent: s0.indent, offset: offset, row: row, src: s0.src});
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				}
			}
		}
	});
var elm$parser$Parser$Advanced$chompWhile = function (isGood) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A5(elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.offset, s.row, s.col, s);
		});
};
var jxxcarlson$meenylatex$Internal$MathMacro$spaces = elm$parser$Parser$Advanced$chompWhile(
	function (c) {
		return _Utils_eq(
			c,
			_Utils_chr(' '));
	});
var jxxcarlson$meenylatex$Internal$MathMacro$manyHelp = F2(
	function (p, vs) {
		return elm$parser$Parser$Advanced$oneOf(
			_List_fromArray(
				[
					A2(
					elm$parser$Parser$Advanced$keeper,
					elm$parser$Parser$Advanced$succeed(
						function (v) {
							return elm$parser$Parser$Advanced$Loop(
								A2(elm$core$List$cons, v, vs));
						}),
					A2(elm$parser$Parser$Advanced$ignorer, p, jxxcarlson$meenylatex$Internal$MathMacro$spaces)),
					A2(
					elm$parser$Parser$Advanced$map,
					function (_n0) {
						return elm$parser$Parser$Advanced$Done(
							elm$core$List$reverse(vs));
					},
					elm$parser$Parser$Advanced$succeed(_Utils_Tuple0))
				]));
	});
var jxxcarlson$meenylatex$Internal$MathMacro$many = function (p) {
	return A2(
		elm$parser$Parser$Advanced$loop,
		_List_Nil,
		jxxcarlson$meenylatex$Internal$MathMacro$manyHelp(p));
};
var elm$parser$Parser$Advanced$backtrackable = function (_n0) {
	var parse = _n0.a;
	return elm$parser$Parser$Advanced$Parser(
		function (s0) {
			var _n1 = parse(s0);
			if (_n1.$ === 'Bad') {
				var x = _n1.b;
				return A2(elm$parser$Parser$Advanced$Bad, false, x);
			} else {
				var a = _n1.b;
				var s1 = _n1.c;
				return A3(elm$parser$Parser$Advanced$Good, false, a, s1);
			}
		});
};
var elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 'Token', a: a, b: b};
	});
var elm$parser$Parser$Advanced$Located = F3(
	function (row, col, context) {
		return {col: col, context: context, row: row};
	});
var elm$parser$Parser$Advanced$changeContext = F2(
	function (newContext, s) {
		return {col: s.col, context: newContext, indent: s.indent, offset: s.offset, row: s.row, src: s.src};
	});
var elm$parser$Parser$Advanced$inContext = F2(
	function (context, _n0) {
		var parse = _n0.a;
		return elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _n1 = parse(
					A2(
						elm$parser$Parser$Advanced$changeContext,
						A2(
							elm$core$List$cons,
							A3(elm$parser$Parser$Advanced$Located, s0.row, s0.col, context),
							s0.context),
						s0));
				if (_n1.$ === 'Good') {
					var p = _n1.a;
					var a = _n1.b;
					var s1 = _n1.c;
					return A3(
						elm$parser$Parser$Advanced$Good,
						p,
						a,
						A2(elm$parser$Parser$Advanced$changeContext, s0.context, s1));
				} else {
					var step = _n1;
					return step;
				}
			});
	});
var elm$parser$Parser$Advanced$lazy = function (thunk) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _n0 = thunk(_Utils_Tuple0);
			var parse = _n0.a;
			return parse(s);
		});
};
var elm$core$Basics$not = _Basics_not;
var elm$core$String$isEmpty = function (string) {
	return string === '';
};
var elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 'AddRight', a: a, b: b};
	});
var elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {col: col, contextStack: contextStack, problem: problem, row: row};
	});
var elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			elm$parser$Parser$Advanced$AddRight,
			elm$parser$Parser$Advanced$Empty,
			A4(elm$parser$Parser$Advanced$DeadEnd, s.row, s.col, x, s.context));
	});
var elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var elm$parser$Parser$Advanced$token = function (_n0) {
	var str = _n0.a;
	var expecting = _n0.b;
	var progress = !elm$core$String$isEmpty(str);
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _n1 = A5(elm$parser$Parser$Advanced$isSubString, str, s.offset, s.row, s.col, s.src);
			var newOffset = _n1.a;
			var newRow = _n1.b;
			var newCol = _n1.c;
			return _Utils_eq(newOffset, -1) ? A2(
				elm$parser$Parser$Advanced$Bad,
				false,
				A2(elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
				elm$parser$Parser$Advanced$Good,
				progress,
				_Utils_Tuple0,
				{col: newCol, context: s.context, indent: s.indent, offset: newOffset, row: newRow, src: s.src});
		});
};
var elm$parser$Parser$Advanced$symbol = elm$parser$Parser$Advanced$token;
var jxxcarlson$meenylatex$Internal$MathMacro$CArg = function (a) {
	return {$: 'CArg', a: a};
};
var jxxcarlson$meenylatex$Internal$MathMacro$ExpectingLeftBrace = {$: 'ExpectingLeftBrace'};
var jxxcarlson$meenylatex$Internal$MathMacro$ExpectingRightBrace = {$: 'ExpectingRightBrace'};
var jxxcarlson$meenylatex$Internal$MathMacro$Macro = F2(
	function (a, b) {
		return {$: 'Macro', a: a, b: b};
	});
var jxxcarlson$meenylatex$Internal$MathMacro$MathList = function (a) {
	return {$: 'MathList', a: a};
};
var jxxcarlson$meenylatex$Internal$MathMacro$itemListHelper = F2(
	function (itemParser, revItems) {
		return elm$parser$Parser$Advanced$oneOf(
			_List_fromArray(
				[
					A2(
					elm$parser$Parser$Advanced$keeper,
					elm$parser$Parser$Advanced$succeed(
						function (item_) {
							return elm$parser$Parser$Advanced$Loop(
								A2(elm$core$List$cons, item_, revItems));
						}),
					itemParser),
					A2(
					elm$parser$Parser$Advanced$map,
					function (_n0) {
						return elm$parser$Parser$Advanced$Done(
							elm$core$List$reverse(revItems));
					},
					elm$parser$Parser$Advanced$succeed(_Utils_Tuple0))
				]));
	});
var jxxcarlson$meenylatex$Internal$MathMacro$itemList_ = F2(
	function (initialList, itemParser) {
		return A2(
			elm$parser$Parser$Advanced$loop,
			initialList,
			jxxcarlson$meenylatex$Internal$MathMacro$itemListHelper(itemParser));
	});
var jxxcarlson$meenylatex$Internal$MathMacro$itemList = function (itemParser) {
	return A2(jxxcarlson$meenylatex$Internal$MathMacro$itemList_, _List_Nil, itemParser);
};
var jxxcarlson$meenylatex$Internal$MathMacro$ExpectingValidMacroArgWord = {$: 'ExpectingValidMacroArgWord'};
var jxxcarlson$meenylatex$Internal$MathMacro$inMacroArg = function (c) {
	return !(_Utils_eq(
		c,
		_Utils_chr('\\')) || (_Utils_eq(
		c,
		_Utils_chr('$')) || (_Utils_eq(
		c,
		_Utils_chr('}')) || (_Utils_eq(
		c,
		_Utils_chr(' ')) || _Utils_eq(
		c,
		_Utils_chr('\n'))))));
};
var elm$parser$Parser$Advanced$andThen = F2(
	function (callback, _n0) {
		var parseA = _n0.a;
		return elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _n1 = parseA(s0);
				if (_n1.$ === 'Bad') {
					var p = _n1.a;
					var x = _n1.b;
					return A2(elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p1 = _n1.a;
					var a = _n1.b;
					var s1 = _n1.c;
					var _n2 = callback(a);
					var parseB = _n2.a;
					var _n3 = parseB(s1);
					if (_n3.$ === 'Bad') {
						var p2 = _n3.a;
						var x = _n3.b;
						return A2(elm$parser$Parser$Advanced$Bad, p1 || p2, x);
					} else {
						var p2 = _n3.a;
						var b = _n3.b;
						var s2 = _n3.c;
						return A3(elm$parser$Parser$Advanced$Good, p1 || p2, b, s2);
					}
				}
			});
	});
var jxxcarlson$meenylatex$Internal$MathMacro$nonEmptyItemList = function (itemParser) {
	return A2(
		elm$parser$Parser$Advanced$andThen,
		function (x) {
			return A2(
				jxxcarlson$meenylatex$Internal$MathMacro$itemList_,
				_List_fromArray(
					[x]),
				itemParser);
		},
		itemParser);
};
var elm$parser$Parser$Advanced$chompIf = F2(
	function (isGood, expecting) {
		return elm$parser$Parser$Advanced$Parser(
			function (s) {
				var newOffset = A3(elm$parser$Parser$Advanced$isSubChar, isGood, s.offset, s.src);
				return _Utils_eq(newOffset, -1) ? A2(
					elm$parser$Parser$Advanced$Bad,
					false,
					A2(elm$parser$Parser$Advanced$fromState, s, expecting)) : (_Utils_eq(newOffset, -2) ? A3(
					elm$parser$Parser$Advanced$Good,
					true,
					_Utils_Tuple0,
					{col: 1, context: s.context, indent: s.indent, offset: s.offset + 1, row: s.row + 1, src: s.src}) : A3(
					elm$parser$Parser$Advanced$Good,
					true,
					_Utils_Tuple0,
					{col: s.col + 1, context: s.context, indent: s.indent, offset: newOffset, row: s.row, src: s.src}));
			});
	});
var elm$parser$Parser$Advanced$getOffset = elm$parser$Parser$Advanced$Parser(
	function (s) {
		return A3(elm$parser$Parser$Advanced$Good, false, s.offset, s);
	});
var elm$parser$Parser$Advanced$getSource = elm$parser$Parser$Advanced$Parser(
	function (s) {
		return A3(elm$parser$Parser$Advanced$Good, false, s.src, s);
	});
var jxxcarlson$meenylatex$Internal$MathMacro$ws = elm$parser$Parser$Advanced$chompWhile(
	function (c) {
		return _Utils_eq(
			c,
			_Utils_chr(' ')) || _Utils_eq(
			c,
			_Utils_chr('\n'));
	});
var jxxcarlson$meenylatex$Internal$MathMacro$word = F2(
	function (problem, inWord) {
		return A2(
			elm$parser$Parser$Advanced$keeper,
			A2(
				elm$parser$Parser$Advanced$keeper,
				A2(
					elm$parser$Parser$Advanced$keeper,
					A2(
						elm$parser$Parser$Advanced$ignorer,
						elm$parser$Parser$Advanced$succeed(elm$core$String$slice),
						jxxcarlson$meenylatex$Internal$MathMacro$ws),
					A2(
						elm$parser$Parser$Advanced$ignorer,
						A2(
							elm$parser$Parser$Advanced$ignorer,
							A2(
								elm$parser$Parser$Advanced$ignorer,
								elm$parser$Parser$Advanced$getOffset,
								A2(elm$parser$Parser$Advanced$chompIf, inWord, problem)),
							elm$parser$Parser$Advanced$chompWhile(inWord)),
						jxxcarlson$meenylatex$Internal$MathMacro$ws)),
				elm$parser$Parser$Advanced$getOffset),
			elm$parser$Parser$Advanced$getSource);
	});
var jxxcarlson$meenylatex$Internal$MathMacro$macroArgWords = A2(
	elm$parser$Parser$Advanced$map,
	jxxcarlson$meenylatex$Internal$MathMacro$MathText,
	A2(
		elm$parser$Parser$Advanced$map,
		elm$core$String$join(' '),
		jxxcarlson$meenylatex$Internal$MathMacro$nonEmptyItemList(
			A2(jxxcarlson$meenylatex$Internal$MathMacro$word, jxxcarlson$meenylatex$Internal$MathMacro$ExpectingValidMacroArgWord, jxxcarlson$meenylatex$Internal$MathMacro$inMacroArg))));
var elm$core$Set$Set_elm_builtin = function (a) {
	return {$: 'Set_elm_builtin', a: a};
};
var elm$core$Set$empty = elm$core$Set$Set_elm_builtin(elm$core$Dict$empty);
var elm$core$Set$insert = F2(
	function (key, _n0) {
		var dict = _n0.a;
		return elm$core$Set$Set_elm_builtin(
			A3(elm$core$Dict$insert, key, _Utils_Tuple0, dict));
	});
var elm$core$Set$fromList = function (list) {
	return A3(elm$core$List$foldl, elm$core$Set$insert, elm$core$Set$empty, list);
};
var elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _n1 = A2(elm$core$Basics$compare, targetKey, key);
				switch (_n1.$) {
					case 'LT':
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 'EQ':
						return elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var elm$core$Dict$member = F2(
	function (key, dict) {
		var _n0 = A2(elm$core$Dict$get, key, dict);
		if (_n0.$ === 'Just') {
			return true;
		} else {
			return false;
		}
	});
var elm$core$Set$member = F2(
	function (key, _n0) {
		var dict = _n0.a;
		return A2(elm$core$Dict$member, key, dict);
	});
var elm$parser$Parser$Advanced$varHelp = F7(
	function (isGood, offset, row, col, src, indent, context) {
		varHelp:
		while (true) {
			var newOffset = A3(elm$parser$Parser$Advanced$isSubChar, isGood, offset, src);
			if (_Utils_eq(newOffset, -1)) {
				return {col: col, context: context, indent: indent, offset: offset, row: row, src: src};
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$src = src,
						$temp$indent = indent,
						$temp$context = context;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					src = $temp$src;
					indent = $temp$indent;
					context = $temp$context;
					continue varHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$src = src,
						$temp$indent = indent,
						$temp$context = context;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					src = $temp$src;
					indent = $temp$indent;
					context = $temp$context;
					continue varHelp;
				}
			}
		}
	});
var elm$parser$Parser$Advanced$variable = function (i) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			var firstOffset = A3(elm$parser$Parser$Advanced$isSubChar, i.start, s.offset, s.src);
			if (_Utils_eq(firstOffset, -1)) {
				return A2(
					elm$parser$Parser$Advanced$Bad,
					false,
					A2(elm$parser$Parser$Advanced$fromState, s, i.expecting));
			} else {
				var s1 = _Utils_eq(firstOffset, -2) ? A7(elm$parser$Parser$Advanced$varHelp, i.inner, s.offset + 1, s.row + 1, 1, s.src, s.indent, s.context) : A7(elm$parser$Parser$Advanced$varHelp, i.inner, firstOffset, s.row, s.col + 1, s.src, s.indent, s.context);
				var name = A3(elm$core$String$slice, s.offset, s1.offset, s.src);
				return A2(elm$core$Set$member, name, i.reserved) ? A2(
					elm$parser$Parser$Advanced$Bad,
					false,
					A2(elm$parser$Parser$Advanced$fromState, s, i.expecting)) : A3(elm$parser$Parser$Advanced$Good, true, name, s1);
			}
		});
};
var jxxcarlson$meenylatex$Internal$MathMacro$ExpectingMacroReservedWord = {$: 'ExpectingMacroReservedWord'};
var jxxcarlson$meenylatex$Internal$MathMacro$macroName = A2(
	elm$parser$Parser$Advanced$map,
	elm$core$String$dropLeft(1),
	elm$parser$Parser$Advanced$variable(
		{
			expecting: jxxcarlson$meenylatex$Internal$MathMacro$ExpectingMacroReservedWord,
			inner: function (c) {
				return elm$core$Char$isAlphaNum(c) || _Utils_eq(
					c,
					_Utils_chr('*'));
			},
			reserved: elm$core$Set$fromList(
				_List_fromArray(
					['\\item', '\\bibitem'])),
			start: function (c) {
				return _Utils_eq(
					c,
					_Utils_chr('\\'));
			}
		}));
function jxxcarlson$meenylatex$Internal$MathMacro$cyclic$macro() {
	return A2(
		elm$parser$Parser$Advanced$keeper,
		A2(
			elm$parser$Parser$Advanced$keeper,
			elm$parser$Parser$Advanced$succeed(jxxcarlson$meenylatex$Internal$MathMacro$Macro),
			jxxcarlson$meenylatex$Internal$MathMacro$macroName),
		A2(
			elm$parser$Parser$Advanced$ignorer,
			jxxcarlson$meenylatex$Internal$MathMacro$itemList(
				jxxcarlson$meenylatex$Internal$MathMacro$cyclic$arg()),
			jxxcarlson$meenylatex$Internal$MathMacro$ws));
}
function jxxcarlson$meenylatex$Internal$MathMacro$cyclic$arg() {
	return A2(
		elm$parser$Parser$Advanced$inContext,
		jxxcarlson$meenylatex$Internal$MathMacro$CArg('arg'),
		A2(
			elm$parser$Parser$Advanced$map,
			jxxcarlson$meenylatex$Internal$MathMacro$MathList,
			A2(
				elm$parser$Parser$Advanced$keeper,
				A2(
					elm$parser$Parser$Advanced$ignorer,
					A2(
						elm$parser$Parser$Advanced$ignorer,
						elm$parser$Parser$Advanced$succeed(elm$core$Basics$identity),
						elm$parser$Parser$Advanced$symbol(
							A2(elm$parser$Parser$Advanced$Token, '{', jxxcarlson$meenylatex$Internal$MathMacro$ExpectingLeftBrace))),
					jxxcarlson$meenylatex$Internal$MathMacro$ws),
				A2(
					elm$parser$Parser$Advanced$ignorer,
					jxxcarlson$meenylatex$Internal$MathMacro$cyclic$argList(),
					elm$parser$Parser$Advanced$symbol(
						A2(elm$parser$Parser$Advanced$Token, '}', jxxcarlson$meenylatex$Internal$MathMacro$ExpectingRightBrace))))));
}
function jxxcarlson$meenylatex$Internal$MathMacro$cyclic$argList() {
	return jxxcarlson$meenylatex$Internal$MathMacro$itemList(
		elm$parser$Parser$Advanced$oneOf(
			_List_fromArray(
				[
					jxxcarlson$meenylatex$Internal$MathMacro$macroArgWords,
					elm$parser$Parser$Advanced$lazy(
					function (_n0) {
						return jxxcarlson$meenylatex$Internal$MathMacro$cyclic$macro();
					})
				])));
}
try {
	var jxxcarlson$meenylatex$Internal$MathMacro$macro = jxxcarlson$meenylatex$Internal$MathMacro$cyclic$macro();
	jxxcarlson$meenylatex$Internal$MathMacro$cyclic$macro = function () {
		return jxxcarlson$meenylatex$Internal$MathMacro$macro;
	};
	var jxxcarlson$meenylatex$Internal$MathMacro$arg = jxxcarlson$meenylatex$Internal$MathMacro$cyclic$arg();
	jxxcarlson$meenylatex$Internal$MathMacro$cyclic$arg = function () {
		return jxxcarlson$meenylatex$Internal$MathMacro$arg;
	};
	var jxxcarlson$meenylatex$Internal$MathMacro$argList = jxxcarlson$meenylatex$Internal$MathMacro$cyclic$argList();
	jxxcarlson$meenylatex$Internal$MathMacro$cyclic$argList = function () {
		return jxxcarlson$meenylatex$Internal$MathMacro$argList;
	};
} catch ($) {
throw 'Some top-level definitions from `Internal.MathMacro` are causing infinite recursion:\n\n  ┌─────┐\n  │    macro\n  │     ↓\n  │    arg\n  │     ↓\n  │    argList\n  └─────┘\n\nThese errors are very tricky, so read https://elm-lang.org/0.19.0/halting-problem to learn how to fix it!';}
var jxxcarlson$meenylatex$Internal$MathMacro$ExpectingStuff = {$: 'ExpectingStuff'};
var jxxcarlson$meenylatex$Internal$MathMacro$inStuff = function (c) {
	return !_Utils_eq(
		c,
		_Utils_chr('\\'));
};
var jxxcarlson$meenylatex$Internal$MathMacro$stuff = F2(
	function (problem, inWord) {
		return A2(
			elm$parser$Parser$Advanced$keeper,
			A2(
				elm$parser$Parser$Advanced$keeper,
				A2(
					elm$parser$Parser$Advanced$keeper,
					A2(
						elm$parser$Parser$Advanced$ignorer,
						elm$parser$Parser$Advanced$succeed(elm$core$String$slice),
						jxxcarlson$meenylatex$Internal$MathMacro$ws),
					A2(
						elm$parser$Parser$Advanced$ignorer,
						A2(
							elm$parser$Parser$Advanced$ignorer,
							A2(
								elm$parser$Parser$Advanced$ignorer,
								elm$parser$Parser$Advanced$getOffset,
								A2(elm$parser$Parser$Advanced$chompIf, jxxcarlson$meenylatex$Internal$MathMacro$inStuff, problem)),
							elm$parser$Parser$Advanced$chompWhile(jxxcarlson$meenylatex$Internal$MathMacro$inStuff)),
						jxxcarlson$meenylatex$Internal$MathMacro$ws)),
				elm$parser$Parser$Advanced$getOffset),
			elm$parser$Parser$Advanced$getSource);
	});
var jxxcarlson$meenylatex$Internal$MathMacro$mathStuff = A2(
	elm$parser$Parser$Advanced$map,
	jxxcarlson$meenylatex$Internal$MathMacro$MathText,
	A2(jxxcarlson$meenylatex$Internal$MathMacro$stuff, jxxcarlson$meenylatex$Internal$MathMacro$ExpectingStuff, jxxcarlson$meenylatex$Internal$MathMacro$inStuff));
var elm$core$Basics$neq = _Utils_notEqual;
var jxxcarlson$meenylatex$Internal$MathMacro$ExpectingLeftBracket = {$: 'ExpectingLeftBracket'};
var jxxcarlson$meenylatex$Internal$MathMacro$ExpectingNewCommand = {$: 'ExpectingNewCommand'};
var jxxcarlson$meenylatex$Internal$MathMacro$ExpectingRightBracket = {$: 'ExpectingRightBracket'};
var jxxcarlson$meenylatex$Internal$MathMacro$NewCommand = F3(
	function (a, b, c) {
		return {$: 'NewCommand', a: a, b: b, c: c};
	});
var jxxcarlson$meenylatex$Internal$MathMacro$ExpectingBackslash = {$: 'ExpectingBackslash'};
var jxxcarlson$meenylatex$Internal$MathMacro$newMacroName = A2(
	elm$parser$Parser$Advanced$inContext,
	jxxcarlson$meenylatex$Internal$MathMacro$CArg('arg'),
	A2(
		elm$parser$Parser$Advanced$keeper,
		A2(
			elm$parser$Parser$Advanced$ignorer,
			A2(
				elm$parser$Parser$Advanced$ignorer,
				elm$parser$Parser$Advanced$succeed(elm$core$Basics$identity),
				elm$parser$Parser$Advanced$symbol(
					A2(elm$parser$Parser$Advanced$Token, '{', jxxcarlson$meenylatex$Internal$MathMacro$ExpectingLeftBrace))),
			elm$parser$Parser$Advanced$symbol(
				A2(elm$parser$Parser$Advanced$Token, '\\', jxxcarlson$meenylatex$Internal$MathMacro$ExpectingBackslash))),
		A2(
			elm$parser$Parser$Advanced$ignorer,
			A2(
				jxxcarlson$meenylatex$Internal$MathMacro$word,
				jxxcarlson$meenylatex$Internal$MathMacro$ExpectingRightBrace,
				function (c) {
					return !_Utils_eq(
						c,
						_Utils_chr('}'));
				}),
			elm$parser$Parser$Advanced$symbol(
				A2(elm$parser$Parser$Advanced$Token, '}', jxxcarlson$meenylatex$Internal$MathMacro$ExpectingRightBrace)))));
var jxxcarlson$meenylatex$Internal$MathMacro$newCommand1 = A2(
	elm$parser$Parser$Advanced$keeper,
	A2(
		elm$parser$Parser$Advanced$keeper,
		A2(
			elm$parser$Parser$Advanced$keeper,
			A2(
				elm$parser$Parser$Advanced$ignorer,
				elm$parser$Parser$Advanced$succeed(jxxcarlson$meenylatex$Internal$MathMacro$NewCommand),
				elm$parser$Parser$Advanced$symbol(
					A2(elm$parser$Parser$Advanced$Token, '\\newcommand', jxxcarlson$meenylatex$Internal$MathMacro$ExpectingNewCommand))),
			A2(
				elm$parser$Parser$Advanced$ignorer,
				jxxcarlson$meenylatex$Internal$MathMacro$newMacroName,
				elm$parser$Parser$Advanced$symbol(
					A2(elm$parser$Parser$Advanced$Token, '[', jxxcarlson$meenylatex$Internal$MathMacro$ExpectingLeftBracket)))),
		A2(
			elm$parser$Parser$Advanced$ignorer,
			A2(
				jxxcarlson$meenylatex$Internal$MathMacro$word,
				jxxcarlson$meenylatex$Internal$MathMacro$ExpectingRightBracket,
				function (c) {
					return !_Utils_eq(
						c,
						_Utils_chr(']'));
				}),
			elm$parser$Parser$Advanced$symbol(
				A2(elm$parser$Parser$Advanced$Token, ']', jxxcarlson$meenylatex$Internal$MathMacro$ExpectingRightBracket)))),
	A2(
		elm$parser$Parser$Advanced$ignorer,
		jxxcarlson$meenylatex$Internal$MathMacro$itemList(jxxcarlson$meenylatex$Internal$MathMacro$arg),
		jxxcarlson$meenylatex$Internal$MathMacro$ws));
var jxxcarlson$meenylatex$Internal$MathMacro$newCommand2 = A2(
	elm$parser$Parser$Advanced$keeper,
	A2(
		elm$parser$Parser$Advanced$keeper,
		A2(
			elm$parser$Parser$Advanced$ignorer,
			elm$parser$Parser$Advanced$succeed(
				F2(
					function (x, y) {
						return A3(jxxcarlson$meenylatex$Internal$MathMacro$NewCommand, x, '0', y);
					})),
			elm$parser$Parser$Advanced$symbol(
				A2(elm$parser$Parser$Advanced$Token, '\\newcommand', jxxcarlson$meenylatex$Internal$MathMacro$ExpectingNewCommand))),
		jxxcarlson$meenylatex$Internal$MathMacro$newMacroName),
	A2(
		elm$parser$Parser$Advanced$ignorer,
		jxxcarlson$meenylatex$Internal$MathMacro$itemList(jxxcarlson$meenylatex$Internal$MathMacro$arg),
		jxxcarlson$meenylatex$Internal$MathMacro$ws));
var jxxcarlson$meenylatex$Internal$MathMacro$newCommand = elm$parser$Parser$Advanced$oneOf(
	_List_fromArray(
		[
			elm$parser$Parser$Advanced$backtrackable(jxxcarlson$meenylatex$Internal$MathMacro$newCommand1),
			jxxcarlson$meenylatex$Internal$MathMacro$newCommand2
		]));
var jxxcarlson$meenylatex$Internal$MathMacro$mathExpression = elm$parser$Parser$Advanced$oneOf(
	_List_fromArray(
		[
			elm$parser$Parser$Advanced$backtrackable(jxxcarlson$meenylatex$Internal$MathMacro$newCommand),
			jxxcarlson$meenylatex$Internal$MathMacro$macro,
			jxxcarlson$meenylatex$Internal$MathMacro$mathStuff
		]));
var jxxcarlson$meenylatex$Internal$MathMacro$parse = function (str) {
	return A2(
		elm$parser$Parser$Advanced$run,
		jxxcarlson$meenylatex$Internal$MathMacro$many(jxxcarlson$meenylatex$Internal$MathMacro$mathExpression),
		str);
};
var jxxcarlson$meenylatex$Internal$MathMacro$makeMacroDict = function (str) {
	var _n0 = jxxcarlson$meenylatex$Internal$MathMacro$parse(str);
	if (_n0.$ === 'Ok') {
		var list = _n0.a;
		return elm$core$Dict$fromList(
			A2(elm$core$List$map, jxxcarlson$meenylatex$Internal$MathMacro$makeEntry, list));
	} else {
		return elm$core$Dict$empty;
	}
};
var jxxcarlson$meenylatex$Internal$Parser$LXError = function (a) {
	return {$: 'LXError', a: a};
};
var jxxcarlson$meenylatex$Internal$Parser$LXString = function (a) {
	return {$: 'LXString', a: a};
};
var jxxcarlson$meenylatex$Internal$Parser$Environment = F3(
	function (a, b, c) {
		return {$: 'Environment', a: a, b: b, c: c};
	});
var jxxcarlson$meenylatex$Internal$Parser$ExpectingEndWord = function (a) {
	return {$: 'ExpectingEndWord', a: a};
};
var jxxcarlson$meenylatex$Internal$Parser$ExpectingEndWordInItemList = function (a) {
	return {$: 'ExpectingEndWordInItemList', a: a};
};
var jxxcarlson$meenylatex$Internal$Parser$LatexList = function (a) {
	return {$: 'LatexList', a: a};
};
var jxxcarlson$meenylatex$Internal$Parser$SMacro = F4(
	function (a, b, c, d) {
		return {$: 'SMacro', a: a, b: b, c: c, d: d};
	});
var jxxcarlson$meenylatex$Internal$Parser$CArg = function (a) {
	return {$: 'CArg', a: a};
};
var jxxcarlson$meenylatex$Internal$Parser$ExpectingLeftBrace = {$: 'ExpectingLeftBrace'};
var jxxcarlson$meenylatex$Internal$Parser$ExpectingRightBrace = {$: 'ExpectingRightBrace'};
var jxxcarlson$meenylatex$Internal$Parser$Macro = F3(
	function (a, b, c) {
		return {$: 'Macro', a: a, b: b, c: c};
	});
var jxxcarlson$meenylatex$Internal$Parser$ExpectingEndForInlineMath = {$: 'ExpectingEndForInlineMath'};
var jxxcarlson$meenylatex$Internal$Parser$ExpectingLeadingDollarSign = {$: 'ExpectingLeadingDollarSign'};
var jxxcarlson$meenylatex$Internal$Parser$InlineMath = function (a) {
	return {$: 'InlineMath', a: a};
};
var elm$core$String$dropRight = F2(
	function (n, string) {
		return (n < 1) ? string : A3(elm$core$String$slice, 0, -n, string);
	});
var elm$parser$Parser$Advanced$chompUntilEndOr = function (str) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _n0 = A5(_Parser_findSubString, str, s.offset, s.row, s.col, s.src);
			var newOffset = _n0.a;
			var newRow = _n0.b;
			var newCol = _n0.c;
			var adjustedOffset = (newOffset < 0) ? elm$core$String$length(s.src) : newOffset;
			return A3(
				elm$parser$Parser$Advanced$Good,
				_Utils_cmp(s.offset, adjustedOffset) < 0,
				_Utils_Tuple0,
				{col: newCol, context: s.context, indent: s.indent, offset: adjustedOffset, row: newRow, src: s.src});
		});
};
var elm$parser$Parser$Advanced$mapChompedString = F2(
	function (func, _n0) {
		var parse = _n0.a;
		return elm$parser$Parser$Advanced$Parser(
			function (s0) {
				var _n1 = parse(s0);
				if (_n1.$ === 'Bad') {
					var p = _n1.a;
					var x = _n1.b;
					return A2(elm$parser$Parser$Advanced$Bad, p, x);
				} else {
					var p = _n1.a;
					var a = _n1.b;
					var s1 = _n1.c;
					return A3(
						elm$parser$Parser$Advanced$Good,
						p,
						A2(
							func,
							A3(elm$core$String$slice, s0.offset, s1.offset, s0.src),
							a),
						s1);
				}
			});
	});
var elm$parser$Parser$Advanced$getChompedString = function (parser) {
	return A2(elm$parser$Parser$Advanced$mapChompedString, elm$core$Basics$always, parser);
};
var jxxcarlson$meenylatex$Internal$Parser$parseToSymbol = F2(
	function (problem, marker) {
		return A2(
			elm$parser$Parser$Advanced$map,
			elm$core$String$dropRight(
				elm$core$String$length(marker)),
			elm$parser$Parser$Advanced$getChompedString(
				A2(
					elm$parser$Parser$Advanced$keeper,
					elm$parser$Parser$Advanced$succeed(elm$core$Basics$identity),
					A2(
						elm$parser$Parser$Advanced$ignorer,
						elm$parser$Parser$Advanced$chompUntilEndOr(marker),
						elm$parser$Parser$Advanced$symbol(
							A2(elm$parser$Parser$Advanced$Token, marker, problem))))));
	});
var jxxcarlson$meenylatex$Internal$Parser$inlineMath = function (wsParser) {
	return A2(
		elm$parser$Parser$Advanced$keeper,
		A2(
			elm$parser$Parser$Advanced$ignorer,
			elm$parser$Parser$Advanced$succeed(jxxcarlson$meenylatex$Internal$Parser$InlineMath),
			elm$parser$Parser$Advanced$symbol(
				A2(elm$parser$Parser$Advanced$Token, '$', jxxcarlson$meenylatex$Internal$Parser$ExpectingLeadingDollarSign))),
		A2(
			elm$parser$Parser$Advanced$ignorer,
			A2(jxxcarlson$meenylatex$Internal$Parser$parseToSymbol, jxxcarlson$meenylatex$Internal$Parser$ExpectingEndForInlineMath, '$'),
			wsParser));
};
var jxxcarlson$meenylatex$Internal$Parser$itemListHelper = F2(
	function (itemParser, revItems) {
		return elm$parser$Parser$Advanced$oneOf(
			_List_fromArray(
				[
					A2(
					elm$parser$Parser$Advanced$keeper,
					elm$parser$Parser$Advanced$succeed(
						function (item_) {
							return elm$parser$Parser$Advanced$Loop(
								A2(elm$core$List$cons, item_, revItems));
						}),
					itemParser),
					A2(
					elm$parser$Parser$Advanced$map,
					function (_n0) {
						return elm$parser$Parser$Advanced$Done(
							elm$core$List$reverse(revItems));
					},
					elm$parser$Parser$Advanced$succeed(_Utils_Tuple0))
				]));
	});
var jxxcarlson$meenylatex$Internal$Parser$itemList_ = F2(
	function (initialList, itemParser) {
		return A2(
			elm$parser$Parser$Advanced$loop,
			initialList,
			jxxcarlson$meenylatex$Internal$Parser$itemListHelper(itemParser));
	});
var jxxcarlson$meenylatex$Internal$Parser$itemList = function (itemParser) {
	return A2(jxxcarlson$meenylatex$Internal$Parser$itemList_, _List_Nil, itemParser);
};
var jxxcarlson$meenylatex$Internal$Parser$ExpectingValidMacroArgWord = {$: 'ExpectingValidMacroArgWord'};
var jxxcarlson$meenylatex$Internal$Parser$inMacroArg = function (c) {
	return !(_Utils_eq(
		c,
		_Utils_chr('\\')) || (_Utils_eq(
		c,
		_Utils_chr('$')) || (_Utils_eq(
		c,
		_Utils_chr('}')) || (_Utils_eq(
		c,
		_Utils_chr(' ')) || _Utils_eq(
		c,
		_Utils_chr('\n'))))));
};
var jxxcarlson$meenylatex$Internal$Parser$nonEmptyItemList = function (itemParser) {
	return A2(
		elm$parser$Parser$Advanced$andThen,
		function (x) {
			return A2(
				jxxcarlson$meenylatex$Internal$Parser$itemList_,
				_List_fromArray(
					[x]),
				itemParser);
		},
		itemParser);
};
var jxxcarlson$meenylatex$Internal$Parser$ws = elm$parser$Parser$Advanced$chompWhile(
	function (c) {
		return _Utils_eq(
			c,
			_Utils_chr(' ')) || _Utils_eq(
			c,
			_Utils_chr('\n'));
	});
var jxxcarlson$meenylatex$Internal$Parser$word = F2(
	function (problem, inWord) {
		return A2(
			elm$parser$Parser$Advanced$keeper,
			A2(
				elm$parser$Parser$Advanced$keeper,
				A2(
					elm$parser$Parser$Advanced$keeper,
					A2(
						elm$parser$Parser$Advanced$ignorer,
						elm$parser$Parser$Advanced$succeed(elm$core$String$slice),
						jxxcarlson$meenylatex$Internal$Parser$ws),
					A2(
						elm$parser$Parser$Advanced$ignorer,
						A2(
							elm$parser$Parser$Advanced$ignorer,
							A2(
								elm$parser$Parser$Advanced$ignorer,
								elm$parser$Parser$Advanced$getOffset,
								A2(elm$parser$Parser$Advanced$chompIf, inWord, problem)),
							elm$parser$Parser$Advanced$chompWhile(inWord)),
						jxxcarlson$meenylatex$Internal$Parser$ws)),
				elm$parser$Parser$Advanced$getOffset),
			elm$parser$Parser$Advanced$getSource);
	});
var jxxcarlson$meenylatex$Internal$Parser$macroArgWords = A2(
	elm$parser$Parser$Advanced$map,
	jxxcarlson$meenylatex$Internal$Parser$LXString,
	A2(
		elm$parser$Parser$Advanced$map,
		elm$core$String$join(' '),
		jxxcarlson$meenylatex$Internal$Parser$nonEmptyItemList(
			A2(jxxcarlson$meenylatex$Internal$Parser$word, jxxcarlson$meenylatex$Internal$Parser$ExpectingValidMacroArgWord, jxxcarlson$meenylatex$Internal$Parser$inMacroArg))));
var jxxcarlson$meenylatex$Internal$Parser$ExpectingMacroReservedWord = {$: 'ExpectingMacroReservedWord'};
var jxxcarlson$meenylatex$Internal$Parser$macroName = A2(
	elm$parser$Parser$Advanced$map,
	elm$core$String$dropLeft(1),
	elm$parser$Parser$Advanced$variable(
		{
			expecting: jxxcarlson$meenylatex$Internal$Parser$ExpectingMacroReservedWord,
			inner: function (c) {
				return elm$core$Char$isAlphaNum(c) || _Utils_eq(
					c,
					_Utils_chr('*'));
			},
			reserved: elm$core$Set$fromList(
				_List_fromArray(
					['\\begin', '\\end', '\\item', '\\bibitem'])),
			start: function (c) {
				return _Utils_eq(
					c,
					_Utils_chr('\\'));
			}
		}));
var jxxcarlson$meenylatex$Internal$Parser$ExpectingLeftBracket = {$: 'ExpectingLeftBracket'};
var jxxcarlson$meenylatex$Internal$Parser$ExpectingRightBracket = {$: 'ExpectingRightBracket'};
var jxxcarlson$meenylatex$Internal$Parser$ExpectingValidOptionArgWord = {$: 'ExpectingValidOptionArgWord'};
var jxxcarlson$meenylatex$Internal$Parser$inOptionArgWord = function (c) {
	return !(_Utils_eq(
		c,
		_Utils_chr('\\')) || (_Utils_eq(
		c,
		_Utils_chr('$')) || (_Utils_eq(
		c,
		_Utils_chr(']')) || (_Utils_eq(
		c,
		_Utils_chr(' ')) || _Utils_eq(
		c,
		_Utils_chr('\n'))))));
};
var jxxcarlson$meenylatex$Internal$Parser$optionArgWords = A2(
	elm$parser$Parser$Advanced$map,
	jxxcarlson$meenylatex$Internal$Parser$LXString,
	A2(
		elm$parser$Parser$Advanced$map,
		elm$core$String$join(' '),
		jxxcarlson$meenylatex$Internal$Parser$nonEmptyItemList(
			A2(jxxcarlson$meenylatex$Internal$Parser$word, jxxcarlson$meenylatex$Internal$Parser$ExpectingValidOptionArgWord, jxxcarlson$meenylatex$Internal$Parser$inOptionArgWord))));
var jxxcarlson$meenylatex$Internal$Parser$spaces = elm$parser$Parser$Advanced$chompWhile(
	function (c) {
		return _Utils_eq(
			c,
			_Utils_chr(' '));
	});
var jxxcarlson$meenylatex$Internal$Parser$optionalArg = A2(
	elm$parser$Parser$Advanced$map,
	jxxcarlson$meenylatex$Internal$Parser$LatexList,
	A2(
		elm$parser$Parser$Advanced$keeper,
		A2(
			elm$parser$Parser$Advanced$ignorer,
			elm$parser$Parser$Advanced$succeed(elm$core$Basics$identity),
			elm$parser$Parser$Advanced$symbol(
				A2(elm$parser$Parser$Advanced$Token, '[', jxxcarlson$meenylatex$Internal$Parser$ExpectingLeftBracket))),
		A2(
			elm$parser$Parser$Advanced$ignorer,
			jxxcarlson$meenylatex$Internal$Parser$itemList(
				elm$parser$Parser$Advanced$oneOf(
					_List_fromArray(
						[
							jxxcarlson$meenylatex$Internal$Parser$optionArgWords,
							jxxcarlson$meenylatex$Internal$Parser$inlineMath(jxxcarlson$meenylatex$Internal$Parser$spaces)
						]))),
			elm$parser$Parser$Advanced$symbol(
				A2(elm$parser$Parser$Advanced$Token, ']', jxxcarlson$meenylatex$Internal$Parser$ExpectingRightBracket)))));
var jxxcarlson$meenylatex$Internal$Parser$macro = function (wsParser) {
	return A2(
		elm$parser$Parser$Advanced$keeper,
		A2(
			elm$parser$Parser$Advanced$keeper,
			A2(
				elm$parser$Parser$Advanced$keeper,
				elm$parser$Parser$Advanced$succeed(jxxcarlson$meenylatex$Internal$Parser$Macro),
				jxxcarlson$meenylatex$Internal$Parser$macroName),
			jxxcarlson$meenylatex$Internal$Parser$itemList(jxxcarlson$meenylatex$Internal$Parser$optionalArg)),
		A2(
			elm$parser$Parser$Advanced$ignorer,
			jxxcarlson$meenylatex$Internal$Parser$itemList(
				jxxcarlson$meenylatex$Internal$Parser$cyclic$arg()),
			wsParser));
};
function jxxcarlson$meenylatex$Internal$Parser$cyclic$arg() {
	return A2(
		elm$parser$Parser$Advanced$inContext,
		jxxcarlson$meenylatex$Internal$Parser$CArg('arg'),
		A2(
			elm$parser$Parser$Advanced$map,
			jxxcarlson$meenylatex$Internal$Parser$LatexList,
			A2(
				elm$parser$Parser$Advanced$keeper,
				A2(
					elm$parser$Parser$Advanced$ignorer,
					elm$parser$Parser$Advanced$succeed(elm$core$Basics$identity),
					elm$parser$Parser$Advanced$symbol(
						A2(elm$parser$Parser$Advanced$Token, '{', jxxcarlson$meenylatex$Internal$Parser$ExpectingLeftBrace))),
				A2(
					elm$parser$Parser$Advanced$ignorer,
					jxxcarlson$meenylatex$Internal$Parser$itemList(
						elm$parser$Parser$Advanced$oneOf(
							_List_fromArray(
								[
									jxxcarlson$meenylatex$Internal$Parser$macroArgWords,
									jxxcarlson$meenylatex$Internal$Parser$inlineMath(jxxcarlson$meenylatex$Internal$Parser$spaces),
									elm$parser$Parser$Advanced$lazy(
									function (_n0) {
										return jxxcarlson$meenylatex$Internal$Parser$macro(jxxcarlson$meenylatex$Internal$Parser$spaces);
									})
								]))),
					elm$parser$Parser$Advanced$symbol(
						A2(elm$parser$Parser$Advanced$Token, '}', jxxcarlson$meenylatex$Internal$Parser$ExpectingRightBrace))))));
}
try {
	var jxxcarlson$meenylatex$Internal$Parser$arg = jxxcarlson$meenylatex$Internal$Parser$cyclic$arg();
	jxxcarlson$meenylatex$Internal$Parser$cyclic$arg = function () {
		return jxxcarlson$meenylatex$Internal$Parser$arg;
	};
} catch ($) {
throw 'Some top-level definitions from `Internal.Parser` are causing infinite recursion:\n\n  ┌─────┐\n  │    arg\n  │     ↓\n  │    macro\n  └─────┘\n\nThese errors are very tricky, so read https://elm-lang.org/0.19.0/halting-problem to learn how to fix it!';}
var jxxcarlson$meenylatex$Internal$Parser$DisplayMath = function (a) {
	return {$: 'DisplayMath', a: a};
};
var jxxcarlson$meenylatex$Internal$Parser$ExpectingBeginDisplayMathModeBracket = {$: 'ExpectingBeginDisplayMathModeBracket'};
var jxxcarlson$meenylatex$Internal$Parser$ExpectingEndDisplayMathModeBracket = {$: 'ExpectingEndDisplayMathModeBracket'};
var jxxcarlson$meenylatex$Internal$Parser$displayMathBrackets = A2(
	elm$parser$Parser$Advanced$keeper,
	A2(
		elm$parser$Parser$Advanced$ignorer,
		A2(
			elm$parser$Parser$Advanced$ignorer,
			elm$parser$Parser$Advanced$succeed(jxxcarlson$meenylatex$Internal$Parser$DisplayMath),
			jxxcarlson$meenylatex$Internal$Parser$spaces),
		elm$parser$Parser$Advanced$symbol(
			A2(elm$parser$Parser$Advanced$Token, '\\[', jxxcarlson$meenylatex$Internal$Parser$ExpectingBeginDisplayMathModeBracket))),
	A2(
		elm$parser$Parser$Advanced$ignorer,
		A2(jxxcarlson$meenylatex$Internal$Parser$parseToSymbol, jxxcarlson$meenylatex$Internal$Parser$ExpectingEndDisplayMathModeBracket, '\\]'),
		jxxcarlson$meenylatex$Internal$Parser$ws));
var jxxcarlson$meenylatex$Internal$Parser$ExpectingBeginDisplayMathModeDollarSign = {$: 'ExpectingBeginDisplayMathModeDollarSign'};
var jxxcarlson$meenylatex$Internal$Parser$ExpectingEndDisplayMathModeDollarSign = {$: 'ExpectingEndDisplayMathModeDollarSign'};
var jxxcarlson$meenylatex$Internal$Parser$displayMathDollar = A2(
	elm$parser$Parser$Advanced$keeper,
	A2(
		elm$parser$Parser$Advanced$ignorer,
		A2(
			elm$parser$Parser$Advanced$ignorer,
			elm$parser$Parser$Advanced$succeed(jxxcarlson$meenylatex$Internal$Parser$DisplayMath),
			jxxcarlson$meenylatex$Internal$Parser$spaces),
		elm$parser$Parser$Advanced$symbol(
			A2(elm$parser$Parser$Advanced$Token, '$$', jxxcarlson$meenylatex$Internal$Parser$ExpectingBeginDisplayMathModeDollarSign))),
	A2(
		elm$parser$Parser$Advanced$ignorer,
		A2(jxxcarlson$meenylatex$Internal$Parser$parseToSymbol, jxxcarlson$meenylatex$Internal$Parser$ExpectingEndDisplayMathModeDollarSign, '$$'),
		jxxcarlson$meenylatex$Internal$Parser$ws));
var jxxcarlson$meenylatex$Internal$Parser$EnvName = {$: 'EnvName'};
var jxxcarlson$meenylatex$Internal$Parser$ExpectingEndOfEnvironmentName = {$: 'ExpectingEndOfEnvironmentName'};
var jxxcarlson$meenylatex$Internal$Parser$ExpectingEnvironmentNameBegin = {$: 'ExpectingEnvironmentNameBegin'};
var jxxcarlson$meenylatex$Internal$Parser$envName = A2(
	elm$parser$Parser$Advanced$inContext,
	jxxcarlson$meenylatex$Internal$Parser$EnvName,
	A2(
		elm$parser$Parser$Advanced$keeper,
		A2(
			elm$parser$Parser$Advanced$ignorer,
			A2(
				elm$parser$Parser$Advanced$ignorer,
				elm$parser$Parser$Advanced$succeed(elm$core$Basics$identity),
				jxxcarlson$meenylatex$Internal$Parser$spaces),
			elm$parser$Parser$Advanced$symbol(
				A2(elm$parser$Parser$Advanced$Token, '\\begin{', jxxcarlson$meenylatex$Internal$Parser$ExpectingEnvironmentNameBegin))),
		A2(jxxcarlson$meenylatex$Internal$Parser$parseToSymbol, jxxcarlson$meenylatex$Internal$Parser$ExpectingEndOfEnvironmentName, '}')));
var jxxcarlson$meenylatex$Internal$Parser$ExpectingEscapedItem = {$: 'ExpectingEscapedItem'};
var jxxcarlson$meenylatex$Internal$Parser$ExpectingSpaceAfterItem = {$: 'ExpectingSpaceAfterItem'};
var jxxcarlson$meenylatex$Internal$Parser$Item = F2(
	function (a, b) {
		return {$: 'Item', a: a, b: b};
	});
var jxxcarlson$meenylatex$Internal$Parser$ExpectingWords = {$: 'ExpectingWords'};
var jxxcarlson$meenylatex$Internal$Parser$ExpectingDoubleNewline = {$: 'ExpectingDoubleNewline'};
var jxxcarlson$meenylatex$Internal$Parser$blank = A2(
	elm$parser$Parser$Advanced$map,
	function (_n0) {
		return jxxcarlson$meenylatex$Internal$Parser$LXString('\n\n');
	},
	elm$parser$Parser$Advanced$symbol(
		A2(elm$parser$Parser$Advanced$Token, '\n\n', jxxcarlson$meenylatex$Internal$Parser$ExpectingDoubleNewline)));
var jxxcarlson$meenylatex$Internal$Parser$notSpaceOrSpecialCharacters = function (c) {
	return !(_Utils_eq(
		c,
		_Utils_chr(' ')) || (_Utils_eq(
		c,
		_Utils_chr('\n')) || (_Utils_eq(
		c,
		_Utils_chr('\\')) || _Utils_eq(
		c,
		_Utils_chr('$')))));
};
var jxxcarlson$meenylatex$Internal$Parser$words_ = function (problem) {
	return A2(
		elm$parser$Parser$Advanced$map,
		jxxcarlson$meenylatex$Internal$Parser$LXString,
		A2(
			elm$parser$Parser$Advanced$map,
			elm$core$String$join(' '),
			jxxcarlson$meenylatex$Internal$Parser$nonEmptyItemList(
				A2(jxxcarlson$meenylatex$Internal$Parser$word, problem, jxxcarlson$meenylatex$Internal$Parser$notSpaceOrSpecialCharacters))));
};
var jxxcarlson$meenylatex$Internal$Parser$words = elm$parser$Parser$Advanced$oneOf(
	_List_fromArray(
		[
			jxxcarlson$meenylatex$Internal$Parser$blank,
			A2(
			elm$parser$Parser$Advanced$keeper,
			A2(
				elm$parser$Parser$Advanced$ignorer,
				elm$parser$Parser$Advanced$succeed(elm$core$Basics$identity),
				jxxcarlson$meenylatex$Internal$Parser$ws),
			A2(
				elm$parser$Parser$Advanced$ignorer,
				jxxcarlson$meenylatex$Internal$Parser$words_(jxxcarlson$meenylatex$Internal$Parser$ExpectingWords),
				jxxcarlson$meenylatex$Internal$Parser$ws))
		]));
var jxxcarlson$meenylatex$Internal$Parser$item = A2(
	elm$parser$Parser$Advanced$map,
	function (x) {
		return A2(
			jxxcarlson$meenylatex$Internal$Parser$Item,
			1,
			jxxcarlson$meenylatex$Internal$Parser$LatexList(x));
	},
	A2(
		elm$parser$Parser$Advanced$keeper,
		A2(
			elm$parser$Parser$Advanced$ignorer,
			A2(
				elm$parser$Parser$Advanced$ignorer,
				A2(
					elm$parser$Parser$Advanced$ignorer,
					A2(
						elm$parser$Parser$Advanced$ignorer,
						elm$parser$Parser$Advanced$succeed(elm$core$Basics$identity),
						jxxcarlson$meenylatex$Internal$Parser$spaces),
					elm$parser$Parser$Advanced$symbol(
						A2(elm$parser$Parser$Advanced$Token, '\\item', jxxcarlson$meenylatex$Internal$Parser$ExpectingEscapedItem))),
				elm$parser$Parser$Advanced$symbol(
					A2(elm$parser$Parser$Advanced$Token, ' ', jxxcarlson$meenylatex$Internal$Parser$ExpectingSpaceAfterItem))),
			jxxcarlson$meenylatex$Internal$Parser$spaces),
		A2(
			elm$parser$Parser$Advanced$ignorer,
			jxxcarlson$meenylatex$Internal$Parser$itemList(
				elm$parser$Parser$Advanced$oneOf(
					_List_fromArray(
						[
							jxxcarlson$meenylatex$Internal$Parser$words,
							jxxcarlson$meenylatex$Internal$Parser$inlineMath(jxxcarlson$meenylatex$Internal$Parser$ws),
							jxxcarlson$meenylatex$Internal$Parser$macro(jxxcarlson$meenylatex$Internal$Parser$ws)
						]))),
			jxxcarlson$meenylatex$Internal$Parser$ws)));
var jxxcarlson$meenylatex$Internal$Parser$ExpectingEscapedNewcommandAndBrace = {$: 'ExpectingEscapedNewcommandAndBrace'};
var jxxcarlson$meenylatex$Internal$Parser$NewCommand = F3(
	function (a, b, c) {
		return {$: 'NewCommand', a: a, b: b, c: c};
	});
var elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(x);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var jxxcarlson$meenylatex$Internal$Parser$manyHelp = F2(
	function (p, vs) {
		return elm$parser$Parser$Advanced$oneOf(
			_List_fromArray(
				[
					A2(
					elm$parser$Parser$Advanced$keeper,
					elm$parser$Parser$Advanced$succeed(
						function (v) {
							return elm$parser$Parser$Advanced$Loop(
								A2(elm$core$List$cons, v, vs));
						}),
					A2(elm$parser$Parser$Advanced$ignorer, p, jxxcarlson$meenylatex$Internal$Parser$spaces)),
					A2(
					elm$parser$Parser$Advanced$map,
					function (_n0) {
						return elm$parser$Parser$Advanced$Done(
							elm$core$List$reverse(vs));
					},
					elm$parser$Parser$Advanced$succeed(_Utils_Tuple0))
				]));
	});
var jxxcarlson$meenylatex$Internal$Parser$many = function (p) {
	return A2(
		elm$parser$Parser$Advanced$loop,
		_List_Nil,
		jxxcarlson$meenylatex$Internal$Parser$manyHelp(p));
};
var elm$parser$Parser$Advanced$consumeBase = _Parser_consumeBase;
var elm$parser$Parser$Advanced$consumeBase16 = _Parser_consumeBase16;
var elm$core$String$toFloat = _String_toFloat;
var elm$parser$Parser$Advanced$bumpOffset = F2(
	function (newOffset, s) {
		return {col: s.col + (newOffset - s.offset), context: s.context, indent: s.indent, offset: newOffset, row: s.row, src: s.src};
	});
var elm$parser$Parser$Advanced$chompBase10 = _Parser_chompBase10;
var elm$parser$Parser$Advanced$isAsciiCode = _Parser_isAsciiCode;
var elm$parser$Parser$Advanced$consumeExp = F2(
	function (offset, src) {
		if (A3(elm$parser$Parser$Advanced$isAsciiCode, 101, offset, src) || A3(elm$parser$Parser$Advanced$isAsciiCode, 69, offset, src)) {
			var eOffset = offset + 1;
			var expOffset = (A3(elm$parser$Parser$Advanced$isAsciiCode, 43, eOffset, src) || A3(elm$parser$Parser$Advanced$isAsciiCode, 45, eOffset, src)) ? (eOffset + 1) : eOffset;
			var newOffset = A2(elm$parser$Parser$Advanced$chompBase10, expOffset, src);
			return _Utils_eq(expOffset, newOffset) ? (-newOffset) : newOffset;
		} else {
			return offset;
		}
	});
var elm$parser$Parser$Advanced$consumeDotAndExp = F2(
	function (offset, src) {
		return A3(elm$parser$Parser$Advanced$isAsciiCode, 46, offset, src) ? A2(
			elm$parser$Parser$Advanced$consumeExp,
			A2(elm$parser$Parser$Advanced$chompBase10, offset + 1, src),
			src) : A2(elm$parser$Parser$Advanced$consumeExp, offset, src);
	});
var elm$parser$Parser$Advanced$finalizeInt = F5(
	function (invalid, handler, startOffset, _n0, s) {
		var endOffset = _n0.a;
		var n = _n0.b;
		if (handler.$ === 'Err') {
			var x = handler.a;
			return A2(
				elm$parser$Parser$Advanced$Bad,
				true,
				A2(elm$parser$Parser$Advanced$fromState, s, x));
		} else {
			var toValue = handler.a;
			return _Utils_eq(startOffset, endOffset) ? A2(
				elm$parser$Parser$Advanced$Bad,
				_Utils_cmp(s.offset, startOffset) < 0,
				A2(elm$parser$Parser$Advanced$fromState, s, invalid)) : A3(
				elm$parser$Parser$Advanced$Good,
				true,
				toValue(n),
				A2(elm$parser$Parser$Advanced$bumpOffset, endOffset, s));
		}
	});
var elm$parser$Parser$Advanced$fromInfo = F4(
	function (row, col, x, context) {
		return A2(
			elm$parser$Parser$Advanced$AddRight,
			elm$parser$Parser$Advanced$Empty,
			A4(elm$parser$Parser$Advanced$DeadEnd, row, col, x, context));
	});
var elm$parser$Parser$Advanced$finalizeFloat = F6(
	function (invalid, expecting, intSettings, floatSettings, intPair, s) {
		var intOffset = intPair.a;
		var floatOffset = A2(elm$parser$Parser$Advanced$consumeDotAndExp, intOffset, s.src);
		if (floatOffset < 0) {
			return A2(
				elm$parser$Parser$Advanced$Bad,
				true,
				A4(elm$parser$Parser$Advanced$fromInfo, s.row, s.col - (floatOffset + s.offset), invalid, s.context));
		} else {
			if (_Utils_eq(s.offset, floatOffset)) {
				return A2(
					elm$parser$Parser$Advanced$Bad,
					false,
					A2(elm$parser$Parser$Advanced$fromState, s, expecting));
			} else {
				if (_Utils_eq(intOffset, floatOffset)) {
					return A5(elm$parser$Parser$Advanced$finalizeInt, invalid, intSettings, s.offset, intPair, s);
				} else {
					if (floatSettings.$ === 'Err') {
						var x = floatSettings.a;
						return A2(
							elm$parser$Parser$Advanced$Bad,
							true,
							A2(elm$parser$Parser$Advanced$fromState, s, invalid));
					} else {
						var toValue = floatSettings.a;
						var _n1 = elm$core$String$toFloat(
							A3(elm$core$String$slice, s.offset, floatOffset, s.src));
						if (_n1.$ === 'Nothing') {
							return A2(
								elm$parser$Parser$Advanced$Bad,
								true,
								A2(elm$parser$Parser$Advanced$fromState, s, invalid));
						} else {
							var n = _n1.a;
							return A3(
								elm$parser$Parser$Advanced$Good,
								true,
								toValue(n),
								A2(elm$parser$Parser$Advanced$bumpOffset, floatOffset, s));
						}
					}
				}
			}
		}
	});
var elm$parser$Parser$Advanced$number = function (c) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			if (A3(elm$parser$Parser$Advanced$isAsciiCode, 48, s.offset, s.src)) {
				var zeroOffset = s.offset + 1;
				var baseOffset = zeroOffset + 1;
				return A3(elm$parser$Parser$Advanced$isAsciiCode, 120, zeroOffset, s.src) ? A5(
					elm$parser$Parser$Advanced$finalizeInt,
					c.invalid,
					c.hex,
					baseOffset,
					A2(elm$parser$Parser$Advanced$consumeBase16, baseOffset, s.src),
					s) : (A3(elm$parser$Parser$Advanced$isAsciiCode, 111, zeroOffset, s.src) ? A5(
					elm$parser$Parser$Advanced$finalizeInt,
					c.invalid,
					c.octal,
					baseOffset,
					A3(elm$parser$Parser$Advanced$consumeBase, 8, baseOffset, s.src),
					s) : (A3(elm$parser$Parser$Advanced$isAsciiCode, 98, zeroOffset, s.src) ? A5(
					elm$parser$Parser$Advanced$finalizeInt,
					c.invalid,
					c.binary,
					baseOffset,
					A3(elm$parser$Parser$Advanced$consumeBase, 2, baseOffset, s.src),
					s) : A6(
					elm$parser$Parser$Advanced$finalizeFloat,
					c.invalid,
					c.expecting,
					c._int,
					c._float,
					_Utils_Tuple2(zeroOffset, 0),
					s)));
			} else {
				return A6(
					elm$parser$Parser$Advanced$finalizeFloat,
					c.invalid,
					c.expecting,
					c._int,
					c._float,
					A3(elm$parser$Parser$Advanced$consumeBase, 10, s.offset, s.src),
					s);
			}
		});
};
var elm$parser$Parser$Advanced$int = F2(
	function (expecting, invalid) {
		return elm$parser$Parser$Advanced$number(
			{
				binary: elm$core$Result$Err(invalid),
				expecting: expecting,
				_float: elm$core$Result$Err(invalid),
				hex: elm$core$Result$Err(invalid),
				_int: elm$core$Result$Ok(elm$core$Basics$identity),
				invalid: invalid,
				octal: elm$core$Result$Err(invalid)
			});
	});
var jxxcarlson$meenylatex$Internal$Parser$ExpectingInt = {$: 'ExpectingInt'};
var jxxcarlson$meenylatex$Internal$Parser$InvalidInt = {$: 'InvalidInt'};
var jxxcarlson$meenylatex$Internal$Parser$numberOfArgs_ = A2(
	elm$parser$Parser$Advanced$keeper,
	A2(
		elm$parser$Parser$Advanced$ignorer,
		elm$parser$Parser$Advanced$succeed(elm$core$Basics$identity),
		elm$parser$Parser$Advanced$symbol(
			A2(elm$parser$Parser$Advanced$Token, '[', jxxcarlson$meenylatex$Internal$Parser$ExpectingLeftBracket))),
	A2(
		elm$parser$Parser$Advanced$ignorer,
		A2(elm$parser$Parser$Advanced$int, jxxcarlson$meenylatex$Internal$Parser$ExpectingInt, jxxcarlson$meenylatex$Internal$Parser$InvalidInt),
		elm$parser$Parser$Advanced$symbol(
			A2(elm$parser$Parser$Advanced$Token, ']', jxxcarlson$meenylatex$Internal$Parser$ExpectingRightBracket))));
var jxxcarlson$meenylatex$Internal$Parser$numberOfArgs = A2(
	elm$parser$Parser$Advanced$map,
	elm$core$Maybe$withDefault(0),
	A2(
		elm$parser$Parser$Advanced$map,
		elm$core$List$head,
		jxxcarlson$meenylatex$Internal$Parser$many(jxxcarlson$meenylatex$Internal$Parser$numberOfArgs_)));
var jxxcarlson$meenylatex$Internal$Parser$newcommand = A2(
	elm$parser$Parser$Advanced$keeper,
	A2(
		elm$parser$Parser$Advanced$keeper,
		A2(
			elm$parser$Parser$Advanced$keeper,
			A2(
				elm$parser$Parser$Advanced$ignorer,
				elm$parser$Parser$Advanced$succeed(jxxcarlson$meenylatex$Internal$Parser$NewCommand),
				elm$parser$Parser$Advanced$symbol(
					A2(elm$parser$Parser$Advanced$Token, '\\newcommand{', jxxcarlson$meenylatex$Internal$Parser$ExpectingEscapedNewcommandAndBrace))),
			A2(
				elm$parser$Parser$Advanced$ignorer,
				jxxcarlson$meenylatex$Internal$Parser$macroName,
				elm$parser$Parser$Advanced$symbol(
					A2(elm$parser$Parser$Advanced$Token, '}', jxxcarlson$meenylatex$Internal$Parser$ExpectingRightBrace)))),
		jxxcarlson$meenylatex$Internal$Parser$numberOfArgs),
	A2(elm$parser$Parser$Advanced$ignorer, jxxcarlson$meenylatex$Internal$Parser$arg, jxxcarlson$meenylatex$Internal$Parser$ws));
var jxxcarlson$meenylatex$Internal$Parser$ExpectingEndForPassThroughBody = {$: 'ExpectingEndForPassThroughBody'};
var elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2(elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var elm$core$String$lines = _String_lines;
var jxxcarlson$meenylatex$Internal$Parser$runParser = F2(
	function (p, str) {
		var expr = A2(elm$parser$Parser$Advanced$run, p, str);
		if (expr.$ === 'Ok') {
			var latexExpr = expr.a;
			return latexExpr;
		} else {
			var error = expr.a;
			return _List_fromArray(
				[
					jxxcarlson$meenylatex$Internal$Parser$LXError(error)
				]);
		}
	});
var jxxcarlson$meenylatex$Internal$Parser$passThroughEnv = F2(
	function (envType, source) {
		var lines = A2(
			elm$core$List$filter,
			function (l) {
				return elm$core$String$length(l) > 0;
			},
			elm$core$String$lines(
				elm$core$String$trim(source)));
		var optArgs_ = A2(
			jxxcarlson$meenylatex$Internal$Parser$runParser,
			jxxcarlson$meenylatex$Internal$Parser$itemList(jxxcarlson$meenylatex$Internal$Parser$optionalArg),
			A2(
				elm$core$Maybe$withDefault,
				'',
				elm$core$List$head(lines)));
		var body = _Utils_eq(optArgs_, _List_Nil) ? A2(elm$core$String$join, '\n', lines) : A2(
			elm$core$String$join,
			'\n',
			A2(elm$core$List$drop, 1, lines));
		return A3(
			jxxcarlson$meenylatex$Internal$Parser$Environment,
			envType,
			optArgs_,
			jxxcarlson$meenylatex$Internal$Parser$LXString(body));
	});
var jxxcarlson$meenylatex$Internal$Parser$passThroughBody = F2(
	function (endWoord, envType) {
		return A2(
			elm$parser$Parser$Advanced$map,
			jxxcarlson$meenylatex$Internal$Parser$passThroughEnv(envType),
			A2(
				elm$parser$Parser$Advanced$keeper,
				elm$parser$Parser$Advanced$succeed(elm$core$Basics$identity),
				A2(
					elm$parser$Parser$Advanced$ignorer,
					A2(jxxcarlson$meenylatex$Internal$Parser$parseToSymbol, jxxcarlson$meenylatex$Internal$Parser$ExpectingEndForPassThroughBody, endWoord),
					jxxcarlson$meenylatex$Internal$Parser$ws)));
	});
var jxxcarlson$meenylatex$Internal$Parser$ExpectingmSMacroReservedWord = {$: 'ExpectingmSMacroReservedWord'};
var jxxcarlson$meenylatex$Internal$Parser$smacroName = A2(
	elm$parser$Parser$Advanced$map,
	elm$core$String$dropLeft(1),
	elm$parser$Parser$Advanced$variable(
		{
			expecting: jxxcarlson$meenylatex$Internal$Parser$ExpectingmSMacroReservedWord,
			inner: function (c) {
				return elm$core$Char$isAlphaNum(c);
			},
			reserved: elm$core$Set$fromList(
				_List_fromArray(
					['\\begin', '\\end', '\\item'])),
			start: function (c) {
				return _Utils_eq(
					c,
					_Utils_chr('\\'));
			}
		}));
var jxxcarlson$meenylatex$Internal$Parser$ExpectingDoubleEscapeAndNewline = {$: 'ExpectingDoubleEscapeAndNewline'};
var jxxcarlson$meenylatex$Internal$Parser$ExpectingNewline = {$: 'ExpectingNewline'};
var jxxcarlson$meenylatex$Internal$Parser$ExpectingValidTableCell = {$: 'ExpectingValidTableCell'};
var jxxcarlson$meenylatex$Internal$Parser$inTableCellWord = function (c) {
	return !(_Utils_eq(
		c,
		_Utils_chr(' ')) || (_Utils_eq(
		c,
		_Utils_chr('\n')) || (_Utils_eq(
		c,
		_Utils_chr('\\')) || (_Utils_eq(
		c,
		_Utils_chr('$')) || _Utils_eq(
		c,
		_Utils_chr('&'))))));
};
var jxxcarlson$meenylatex$Internal$Parser$tableCellWords = A2(
	elm$parser$Parser$Advanced$map,
	jxxcarlson$meenylatex$Internal$Parser$LXString,
	A2(
		elm$parser$Parser$Advanced$map,
		elm$core$String$trim,
		A2(
			elm$parser$Parser$Advanced$map,
			elm$core$String$join(' '),
			jxxcarlson$meenylatex$Internal$Parser$nonEmptyItemList(
				A2(jxxcarlson$meenylatex$Internal$Parser$word, jxxcarlson$meenylatex$Internal$Parser$ExpectingValidTableCell, jxxcarlson$meenylatex$Internal$Parser$inTableCellWord)))));
var jxxcarlson$meenylatex$Internal$Parser$tableCell = A2(
	elm$parser$Parser$Advanced$keeper,
	elm$parser$Parser$Advanced$succeed(elm$core$Basics$identity),
	elm$parser$Parser$Advanced$oneOf(
		_List_fromArray(
			[
				jxxcarlson$meenylatex$Internal$Parser$displayMathBrackets,
				jxxcarlson$meenylatex$Internal$Parser$macro(jxxcarlson$meenylatex$Internal$Parser$ws),
				jxxcarlson$meenylatex$Internal$Parser$displayMathDollar,
				jxxcarlson$meenylatex$Internal$Parser$inlineMath(jxxcarlson$meenylatex$Internal$Parser$ws),
				jxxcarlson$meenylatex$Internal$Parser$tableCellWords
			])));
var jxxcarlson$meenylatex$Internal$Parser$ExpectingAmpersand = {$: 'ExpectingAmpersand'};
var jxxcarlson$meenylatex$Internal$Parser$nextCell = A2(
	elm$parser$Parser$Advanced$keeper,
	A2(
		elm$parser$Parser$Advanced$ignorer,
		A2(
			elm$parser$Parser$Advanced$ignorer,
			elm$parser$Parser$Advanced$succeed(elm$core$Basics$identity),
			elm$parser$Parser$Advanced$symbol(
				A2(elm$parser$Parser$Advanced$Token, '&', jxxcarlson$meenylatex$Internal$Parser$ExpectingAmpersand))),
		jxxcarlson$meenylatex$Internal$Parser$spaces),
	jxxcarlson$meenylatex$Internal$Parser$tableCell);
var jxxcarlson$meenylatex$Internal$Parser$tableCellHelp = function (revCells) {
	return elm$parser$Parser$Advanced$oneOf(
		_List_fromArray(
			[
				A2(
				elm$parser$Parser$Advanced$andThen,
				function (c) {
					return jxxcarlson$meenylatex$Internal$Parser$tableCellHelp(
						A2(elm$core$List$cons, c, revCells));
				},
				jxxcarlson$meenylatex$Internal$Parser$nextCell),
				elm$parser$Parser$Advanced$succeed(
				elm$core$List$reverse(revCells))
			]));
};
var jxxcarlson$meenylatex$Internal$Parser$tableRow = A2(
	elm$parser$Parser$Advanced$map,
	jxxcarlson$meenylatex$Internal$Parser$LatexList,
	A2(
		elm$parser$Parser$Advanced$keeper,
		A2(
			elm$parser$Parser$Advanced$ignorer,
			elm$parser$Parser$Advanced$succeed(elm$core$Basics$identity),
			jxxcarlson$meenylatex$Internal$Parser$spaces),
		A2(
			elm$parser$Parser$Advanced$ignorer,
			A2(
				elm$parser$Parser$Advanced$ignorer,
				A2(
					elm$parser$Parser$Advanced$andThen,
					function (c) {
						return jxxcarlson$meenylatex$Internal$Parser$tableCellHelp(
							_List_fromArray(
								[c]));
					},
					jxxcarlson$meenylatex$Internal$Parser$tableCell),
				jxxcarlson$meenylatex$Internal$Parser$spaces),
			elm$parser$Parser$Advanced$oneOf(
				_List_fromArray(
					[
						elm$parser$Parser$Advanced$symbol(
						A2(elm$parser$Parser$Advanced$Token, '\n', jxxcarlson$meenylatex$Internal$Parser$ExpectingNewline)),
						elm$parser$Parser$Advanced$symbol(
						A2(elm$parser$Parser$Advanced$Token, '\\\\\n', jxxcarlson$meenylatex$Internal$Parser$ExpectingDoubleEscapeAndNewline))
					])))));
var jxxcarlson$meenylatex$Internal$Parser$tableBody = A2(
	elm$parser$Parser$Advanced$map,
	jxxcarlson$meenylatex$Internal$Parser$LatexList,
	A2(
		elm$parser$Parser$Advanced$keeper,
		A2(
			elm$parser$Parser$Advanced$ignorer,
			elm$parser$Parser$Advanced$succeed(elm$core$Basics$identity),
			jxxcarlson$meenylatex$Internal$Parser$ws),
		jxxcarlson$meenylatex$Internal$Parser$nonEmptyItemList(jxxcarlson$meenylatex$Internal$Parser$tableRow)));
var jxxcarlson$meenylatex$Internal$Parser$tabularEnvironmentBody = F2(
	function (endWoord, envType) {
		return A2(
			elm$parser$Parser$Advanced$keeper,
			A2(
				elm$parser$Parser$Advanced$keeper,
				A2(
					elm$parser$Parser$Advanced$ignorer,
					elm$parser$Parser$Advanced$succeed(
						jxxcarlson$meenylatex$Internal$Parser$Environment(envType)),
					jxxcarlson$meenylatex$Internal$Parser$ws),
				jxxcarlson$meenylatex$Internal$Parser$itemList(jxxcarlson$meenylatex$Internal$Parser$arg)),
			A2(
				elm$parser$Parser$Advanced$ignorer,
				A2(
					elm$parser$Parser$Advanced$ignorer,
					A2(elm$parser$Parser$Advanced$ignorer, jxxcarlson$meenylatex$Internal$Parser$tableBody, jxxcarlson$meenylatex$Internal$Parser$ws),
					elm$parser$Parser$Advanced$symbol(
						A2(
							elm$parser$Parser$Advanced$Token,
							endWoord,
							jxxcarlson$meenylatex$Internal$Parser$ExpectingEndWord(endWoord)))),
				jxxcarlson$meenylatex$Internal$Parser$ws));
	});
var jxxcarlson$meenylatex$Internal$Parser$Comment = function (a) {
	return {$: 'Comment', a: a};
};
var jxxcarlson$meenylatex$Internal$Parser$ExpectingPercent = {$: 'ExpectingPercent'};
var jxxcarlson$meenylatex$Internal$Parser$texComment = A2(
	elm$parser$Parser$Advanced$map,
	jxxcarlson$meenylatex$Internal$Parser$Comment,
	elm$parser$Parser$Advanced$getChompedString(
		A2(
			elm$parser$Parser$Advanced$ignorer,
			A2(
				elm$parser$Parser$Advanced$ignorer,
				A2(
					elm$parser$Parser$Advanced$ignorer,
					A2(
						elm$parser$Parser$Advanced$ignorer,
						elm$parser$Parser$Advanced$succeed(_Utils_Tuple0),
						A2(
							elm$parser$Parser$Advanced$chompIf,
							function (c) {
								return _Utils_eq(
									c,
									_Utils_chr('%'));
							},
							jxxcarlson$meenylatex$Internal$Parser$ExpectingPercent)),
					elm$parser$Parser$Advanced$chompWhile(
						function (c) {
							return !_Utils_eq(
								c,
								_Utils_chr('\n'));
						})),
				A2(
					elm$parser$Parser$Advanced$chompIf,
					function (c) {
						return _Utils_eq(
							c,
							_Utils_chr('\n'));
					},
					jxxcarlson$meenylatex$Internal$Parser$ExpectingNewline)),
			jxxcarlson$meenylatex$Internal$Parser$ws)));
var jxxcarlson$meenylatex$Internal$Parser$biblioEnvironmentBody = F2(
	function (endWoord, envType) {
		return A2(
			elm$parser$Parser$Advanced$map,
			A2(jxxcarlson$meenylatex$Internal$Parser$Environment, envType, _List_Nil),
			A2(
				elm$parser$Parser$Advanced$map,
				jxxcarlson$meenylatex$Internal$Parser$LatexList,
				A2(
					elm$parser$Parser$Advanced$keeper,
					A2(
						elm$parser$Parser$Advanced$ignorer,
						elm$parser$Parser$Advanced$succeed(elm$core$Basics$identity),
						jxxcarlson$meenylatex$Internal$Parser$ws),
					A2(
						elm$parser$Parser$Advanced$ignorer,
						A2(
							elm$parser$Parser$Advanced$ignorer,
							A2(
								elm$parser$Parser$Advanced$ignorer,
								jxxcarlson$meenylatex$Internal$Parser$itemList(
									jxxcarlson$meenylatex$Internal$Parser$cyclic$smacro()),
								jxxcarlson$meenylatex$Internal$Parser$ws),
							elm$parser$Parser$Advanced$symbol(
								A2(
									elm$parser$Parser$Advanced$Token,
									endWoord,
									jxxcarlson$meenylatex$Internal$Parser$ExpectingEndWord(endWoord)))),
						jxxcarlson$meenylatex$Internal$Parser$ws))));
	});
var jxxcarlson$meenylatex$Internal$Parser$environmentOfType = function (envType) {
	var theEndWord = '\\end{' + (envType + '}');
	var katex = _List_fromArray(
		['align', 'matrix', 'pmatrix', 'bmatrix', 'Bmatrix', 'vmatrix', 'Vmatrix']);
	var envKind = A2(
		elm$core$List$member,
		envType,
		_Utils_ap(
			_List_fromArray(
				['equation', 'eqnarray', 'verbatim', 'colored', 'CD', 'mathmacro', 'textmacro', 'listing', 'verse']),
			katex)) ? 'passThrough' : envType;
	return A3(jxxcarlson$meenylatex$Internal$Parser$environmentParser, envKind, theEndWord, envType);
};
var jxxcarlson$meenylatex$Internal$Parser$environmentParser = F3(
	function (envKind, theEndWord, envType) {
		var _n3 = A2(
			elm$core$Dict$get,
			envKind,
			jxxcarlson$meenylatex$Internal$Parser$cyclic$parseEnvironmentDict());
		if (_n3.$ === 'Just') {
			var p = _n3.a;
			return A2(p, theEndWord, envType);
		} else {
			return A2(jxxcarlson$meenylatex$Internal$Parser$standardEnvironmentBody, theEndWord, envType);
		}
	});
var jxxcarlson$meenylatex$Internal$Parser$itemEnvironmentBody = F2(
	function (endWoord, envType) {
		return A2(
			elm$parser$Parser$Advanced$map,
			A2(jxxcarlson$meenylatex$Internal$Parser$Environment, envType, _List_Nil),
			A2(
				elm$parser$Parser$Advanced$map,
				jxxcarlson$meenylatex$Internal$Parser$LatexList,
				A2(
					elm$parser$Parser$Advanced$keeper,
					A2(
						elm$parser$Parser$Advanced$ignorer,
						elm$parser$Parser$Advanced$succeed(elm$core$Basics$identity),
						jxxcarlson$meenylatex$Internal$Parser$ws),
					A2(
						elm$parser$Parser$Advanced$ignorer,
						A2(
							elm$parser$Parser$Advanced$ignorer,
							A2(
								elm$parser$Parser$Advanced$ignorer,
								jxxcarlson$meenylatex$Internal$Parser$itemList(
									elm$parser$Parser$Advanced$oneOf(
										_List_fromArray(
											[
												jxxcarlson$meenylatex$Internal$Parser$item,
												elm$parser$Parser$Advanced$lazy(
												function (_n2) {
													return jxxcarlson$meenylatex$Internal$Parser$cyclic$environment();
												})
											]))),
								jxxcarlson$meenylatex$Internal$Parser$ws),
							elm$parser$Parser$Advanced$symbol(
								A2(
									elm$parser$Parser$Advanced$Token,
									endWoord,
									jxxcarlson$meenylatex$Internal$Parser$ExpectingEndWordInItemList(endWoord)))),
						jxxcarlson$meenylatex$Internal$Parser$ws))));
	});
var jxxcarlson$meenylatex$Internal$Parser$standardEnvironmentBody = F2(
	function (endWoord, envType) {
		return A2(
			elm$parser$Parser$Advanced$keeper,
			A2(
				elm$parser$Parser$Advanced$keeper,
				A2(
					elm$parser$Parser$Advanced$ignorer,
					elm$parser$Parser$Advanced$succeed(
						jxxcarlson$meenylatex$Internal$Parser$Environment(envType)),
					jxxcarlson$meenylatex$Internal$Parser$ws),
				A2(
					elm$parser$Parser$Advanced$ignorer,
					jxxcarlson$meenylatex$Internal$Parser$itemList(jxxcarlson$meenylatex$Internal$Parser$optionalArg),
					jxxcarlson$meenylatex$Internal$Parser$ws)),
			A2(
				elm$parser$Parser$Advanced$ignorer,
				A2(
					elm$parser$Parser$Advanced$ignorer,
					A2(
						elm$parser$Parser$Advanced$ignorer,
						A2(
							elm$parser$Parser$Advanced$map,
							jxxcarlson$meenylatex$Internal$Parser$LatexList,
							jxxcarlson$meenylatex$Internal$Parser$nonEmptyItemList(
								jxxcarlson$meenylatex$Internal$Parser$cyclic$latexExpression())),
						jxxcarlson$meenylatex$Internal$Parser$ws),
					elm$parser$Parser$Advanced$symbol(
						A2(
							elm$parser$Parser$Advanced$Token,
							endWoord,
							jxxcarlson$meenylatex$Internal$Parser$ExpectingEndWord(endWoord)))),
				jxxcarlson$meenylatex$Internal$Parser$ws));
	});
function jxxcarlson$meenylatex$Internal$Parser$cyclic$environment() {
	return A2(elm$parser$Parser$Advanced$andThen, jxxcarlson$meenylatex$Internal$Parser$environmentOfType, jxxcarlson$meenylatex$Internal$Parser$envName);
}
function jxxcarlson$meenylatex$Internal$Parser$cyclic$latexList() {
	return A2(
		elm$parser$Parser$Advanced$map,
		jxxcarlson$meenylatex$Internal$Parser$LatexList,
		A2(
			elm$parser$Parser$Advanced$keeper,
			A2(
				elm$parser$Parser$Advanced$ignorer,
				elm$parser$Parser$Advanced$succeed(elm$core$Basics$identity),
				jxxcarlson$meenylatex$Internal$Parser$ws),
			jxxcarlson$meenylatex$Internal$Parser$itemList(
				jxxcarlson$meenylatex$Internal$Parser$cyclic$latexExpression())));
}
function jxxcarlson$meenylatex$Internal$Parser$cyclic$latexExpression() {
	return elm$parser$Parser$Advanced$oneOf(
		_List_fromArray(
			[
				jxxcarlson$meenylatex$Internal$Parser$texComment,
				jxxcarlson$meenylatex$Internal$Parser$displayMathDollar,
				jxxcarlson$meenylatex$Internal$Parser$displayMathBrackets,
				jxxcarlson$meenylatex$Internal$Parser$inlineMath(jxxcarlson$meenylatex$Internal$Parser$ws),
				jxxcarlson$meenylatex$Internal$Parser$newcommand,
				jxxcarlson$meenylatex$Internal$Parser$macro(jxxcarlson$meenylatex$Internal$Parser$ws),
				jxxcarlson$meenylatex$Internal$Parser$cyclic$smacro(),
				jxxcarlson$meenylatex$Internal$Parser$words,
				elm$parser$Parser$Advanced$lazy(
				function (_n1) {
					return jxxcarlson$meenylatex$Internal$Parser$cyclic$environment();
				})
			]));
}
function jxxcarlson$meenylatex$Internal$Parser$cyclic$parseEnvironmentDict() {
	return elm$core$Dict$fromList(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'enumerate',
				F2(
					function (endWoord, envType) {
						return A2(jxxcarlson$meenylatex$Internal$Parser$itemEnvironmentBody, endWoord, envType);
					})),
				_Utils_Tuple2(
				'itemize',
				F2(
					function (endWoord, envType) {
						return A2(jxxcarlson$meenylatex$Internal$Parser$itemEnvironmentBody, endWoord, envType);
					})),
				_Utils_Tuple2(
				'thebibliography',
				F2(
					function (endWoord, envType) {
						return A2(jxxcarlson$meenylatex$Internal$Parser$biblioEnvironmentBody, endWoord, envType);
					})),
				_Utils_Tuple2(
				'tabular',
				F2(
					function (endWoord, envType) {
						return A2(jxxcarlson$meenylatex$Internal$Parser$tabularEnvironmentBody, endWoord, envType);
					})),
				_Utils_Tuple2(
				'passThrough',
				F2(
					function (endWoord, envType) {
						return A2(jxxcarlson$meenylatex$Internal$Parser$passThroughBody, endWoord, envType);
					}))
			]));
}
function jxxcarlson$meenylatex$Internal$Parser$cyclic$smacro() {
	return A2(
		elm$parser$Parser$Advanced$keeper,
		A2(
			elm$parser$Parser$Advanced$keeper,
			A2(
				elm$parser$Parser$Advanced$keeper,
				A2(
					elm$parser$Parser$Advanced$keeper,
					elm$parser$Parser$Advanced$succeed(jxxcarlson$meenylatex$Internal$Parser$SMacro),
					jxxcarlson$meenylatex$Internal$Parser$smacroName),
				jxxcarlson$meenylatex$Internal$Parser$itemList(jxxcarlson$meenylatex$Internal$Parser$optionalArg)),
			jxxcarlson$meenylatex$Internal$Parser$itemList(jxxcarlson$meenylatex$Internal$Parser$arg)),
		elm$parser$Parser$Advanced$lazy(
			function (_n0) {
				return jxxcarlson$meenylatex$Internal$Parser$cyclic$latexList();
			}));
}
try {
	var jxxcarlson$meenylatex$Internal$Parser$environment = jxxcarlson$meenylatex$Internal$Parser$cyclic$environment();
	jxxcarlson$meenylatex$Internal$Parser$cyclic$environment = function () {
		return jxxcarlson$meenylatex$Internal$Parser$environment;
	};
	var jxxcarlson$meenylatex$Internal$Parser$latexList = jxxcarlson$meenylatex$Internal$Parser$cyclic$latexList();
	jxxcarlson$meenylatex$Internal$Parser$cyclic$latexList = function () {
		return jxxcarlson$meenylatex$Internal$Parser$latexList;
	};
	var jxxcarlson$meenylatex$Internal$Parser$latexExpression = jxxcarlson$meenylatex$Internal$Parser$cyclic$latexExpression();
	jxxcarlson$meenylatex$Internal$Parser$cyclic$latexExpression = function () {
		return jxxcarlson$meenylatex$Internal$Parser$latexExpression;
	};
	var jxxcarlson$meenylatex$Internal$Parser$parseEnvironmentDict = jxxcarlson$meenylatex$Internal$Parser$cyclic$parseEnvironmentDict();
	jxxcarlson$meenylatex$Internal$Parser$cyclic$parseEnvironmentDict = function () {
		return jxxcarlson$meenylatex$Internal$Parser$parseEnvironmentDict;
	};
	var jxxcarlson$meenylatex$Internal$Parser$smacro = jxxcarlson$meenylatex$Internal$Parser$cyclic$smacro();
	jxxcarlson$meenylatex$Internal$Parser$cyclic$smacro = function () {
		return jxxcarlson$meenylatex$Internal$Parser$smacro;
	};
} catch ($) {
throw 'Some top-level definitions from `Internal.Parser` are causing infinite recursion:\n\n  ┌─────┐\n  │    biblioEnvironmentBody\n  │     ↓\n  │    environment\n  │     ↓\n  │    environmentOfType\n  │     ↓\n  │    environmentParser\n  │     ↓\n  │    itemEnvironmentBody\n  │     ↓\n  │    latexList\n  │     ↓\n  │    latexExpression\n  │     ↓\n  │    parseEnvironmentDict\n  │     ↓\n  │    smacro\n  │     ↓\n  │    standardEnvironmentBody\n  └─────┘\n\nThese errors are very tricky, so read https://elm-lang.org/0.19.0/halting-problem to learn how to fix it!';}
var jxxcarlson$meenylatex$Internal$Parser$parse = function (text) {
	var expr = A2(elm$parser$Parser$Advanced$run, jxxcarlson$meenylatex$Internal$Parser$latexList, text);
	if (expr.$ === 'Ok') {
		if (expr.a.$ === 'LatexList') {
			var list = expr.a.a;
			return list;
		} else {
			return _List_fromArray(
				[
					jxxcarlson$meenylatex$Internal$Parser$LXString('Dude! not great code here.')
				]);
		}
	} else {
		var error = expr.a;
		return _List_fromArray(
			[
				jxxcarlson$meenylatex$Internal$Parser$LXError(error)
			]);
	}
};
var jxxcarlson$meenylatex$Internal$LatexState$setMacroDefinition = F3(
	function (macroName, macroDefinition, latexState) {
		var macroDictionary = latexState.macroDictionary;
		var newMacroDictionary = A3(elm$core$Dict$insert, macroName, macroDefinition, macroDictionary);
		return _Utils_update(
			latexState,
			{macroDictionary: newMacroDictionary});
	});
var jxxcarlson$meenylatex$Internal$StateReducerHelpers$setMacroDefinition = F3(
	function (name, body, latexState) {
		return A3(
			jxxcarlson$meenylatex$Internal$LatexState$setMacroDefinition,
			name,
			A3(jxxcarlson$meenylatex$Internal$Parser$NewCommand, name, 0, body),
			latexState);
	});
var jxxcarlson$meenylatex$Internal$StateReducerHelpers$macroDictReducer = F2(
	function (lexpr, state) {
		if (lexpr.$ === 'NewCommand') {
			var name = lexpr.a;
			var nArgs = lexpr.b;
			var body = lexpr.c;
			return A3(jxxcarlson$meenylatex$Internal$StateReducerHelpers$setMacroDefinition, name, body, state);
		} else {
			return state;
		}
	});
var jxxcarlson$meenylatex$Internal$StateReducerHelpers$setDictionaryAux = F2(
	function (list, latexState) {
		return A3(elm$core$List$foldl, jxxcarlson$meenylatex$Internal$StateReducerHelpers$macroDictReducer, latexState, list);
	});
var jxxcarlson$meenylatex$Internal$StateReducerHelpers$setDictionary = F2(
	function (str, latexState) {
		return A2(
			jxxcarlson$meenylatex$Internal$StateReducerHelpers$setDictionaryAux,
			jxxcarlson$meenylatex$Internal$Parser$parse(str),
			latexState);
	});
var jxxcarlson$meenylatex$Internal$LatexState$getCounter = F2(
	function (name, latexState) {
		var _n0 = A2(elm$core$Dict$get, name, latexState.counters);
		if (_n0.$ === 'Just') {
			var k = _n0.a;
			return k;
		} else {
			return 0;
		}
	});
var elm$core$Dict$getMin = function (dict) {
	getMin:
	while (true) {
		if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
			var left = dict.d;
			var $temp$dict = left;
			dict = $temp$dict;
			continue getMin;
		} else {
			return dict;
		}
	}
};
var elm$core$Dict$moveRedLeft = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.e.d.$ === 'RBNode_elm_builtin') && (dict.e.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n1 = dict.d;
			var lClr = _n1.a;
			var lK = _n1.b;
			var lV = _n1.c;
			var lLeft = _n1.d;
			var lRight = _n1.e;
			var _n2 = dict.e;
			var rClr = _n2.a;
			var rK = _n2.b;
			var rV = _n2.c;
			var rLeft = _n2.d;
			var _n3 = rLeft.a;
			var rlK = rLeft.b;
			var rlV = rLeft.c;
			var rlL = rLeft.d;
			var rlR = rLeft.e;
			var rRight = _n2.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				elm$core$Dict$Red,
				rlK,
				rlV,
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					rlL),
				A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, rK, rV, rlR, rRight));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n4 = dict.d;
			var lClr = _n4.a;
			var lK = _n4.b;
			var lV = _n4.c;
			var lLeft = _n4.d;
			var lRight = _n4.e;
			var _n5 = dict.e;
			var rClr = _n5.a;
			var rK = _n5.b;
			var rV = _n5.c;
			var rLeft = _n5.d;
			var rRight = _n5.e;
			if (clr.$ === 'Black') {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$moveRedRight = function (dict) {
	if (((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) && (dict.e.$ === 'RBNode_elm_builtin')) {
		if ((dict.d.d.$ === 'RBNode_elm_builtin') && (dict.d.d.a.$ === 'Red')) {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n1 = dict.d;
			var lClr = _n1.a;
			var lK = _n1.b;
			var lV = _n1.c;
			var _n2 = _n1.d;
			var _n3 = _n2.a;
			var llK = _n2.b;
			var llV = _n2.c;
			var llLeft = _n2.d;
			var llRight = _n2.e;
			var lRight = _n1.e;
			var _n4 = dict.e;
			var rClr = _n4.a;
			var rK = _n4.b;
			var rV = _n4.c;
			var rLeft = _n4.d;
			var rRight = _n4.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				elm$core$Dict$Red,
				lK,
				lV,
				A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, llK, llV, llLeft, llRight),
				A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					lRight,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight)));
		} else {
			var clr = dict.a;
			var k = dict.b;
			var v = dict.c;
			var _n5 = dict.d;
			var lClr = _n5.a;
			var lK = _n5.b;
			var lV = _n5.c;
			var lLeft = _n5.d;
			var lRight = _n5.e;
			var _n6 = dict.e;
			var rClr = _n6.a;
			var rK = _n6.b;
			var rV = _n6.c;
			var rLeft = _n6.d;
			var rRight = _n6.e;
			if (clr.$ === 'Black') {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					elm$core$Dict$Black,
					k,
					v,
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, rK, rV, rLeft, rRight));
			}
		}
	} else {
		return dict;
	}
};
var elm$core$Dict$removeHelpPrepEQGT = F7(
	function (targetKey, dict, color, key, value, left, right) {
		if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Red')) {
			var _n1 = left.a;
			var lK = left.b;
			var lV = left.c;
			var lLeft = left.d;
			var lRight = left.e;
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				lK,
				lV,
				lLeft,
				A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Red, key, value, lRight, right));
		} else {
			_n2$2:
			while (true) {
				if ((right.$ === 'RBNode_elm_builtin') && (right.a.$ === 'Black')) {
					if (right.d.$ === 'RBNode_elm_builtin') {
						if (right.d.a.$ === 'Black') {
							var _n3 = right.a;
							var _n4 = right.d;
							var _n5 = _n4.a;
							return elm$core$Dict$moveRedRight(dict);
						} else {
							break _n2$2;
						}
					} else {
						var _n6 = right.a;
						var _n7 = right.d;
						return elm$core$Dict$moveRedRight(dict);
					}
				} else {
					break _n2$2;
				}
			}
			return dict;
		}
	});
var elm$core$Dict$removeMin = function (dict) {
	if ((dict.$ === 'RBNode_elm_builtin') && (dict.d.$ === 'RBNode_elm_builtin')) {
		var color = dict.a;
		var key = dict.b;
		var value = dict.c;
		var left = dict.d;
		var lColor = left.a;
		var lLeft = left.d;
		var right = dict.e;
		if (lColor.$ === 'Black') {
			if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
				var _n3 = lLeft.a;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					key,
					value,
					elm$core$Dict$removeMin(left),
					right);
			} else {
				var _n4 = elm$core$Dict$moveRedLeft(dict);
				if (_n4.$ === 'RBNode_elm_builtin') {
					var nColor = _n4.a;
					var nKey = _n4.b;
					var nValue = _n4.c;
					var nLeft = _n4.d;
					var nRight = _n4.e;
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						elm$core$Dict$removeMin(nLeft),
						nRight);
				} else {
					return elm$core$Dict$RBEmpty_elm_builtin;
				}
			}
		} else {
			return A5(
				elm$core$Dict$RBNode_elm_builtin,
				color,
				key,
				value,
				elm$core$Dict$removeMin(left),
				right);
		}
	} else {
		return elm$core$Dict$RBEmpty_elm_builtin;
	}
};
var elm$core$Dict$removeHelp = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBEmpty_elm_builtin') {
			return elm$core$Dict$RBEmpty_elm_builtin;
		} else {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_cmp(targetKey, key) < 0) {
				if ((left.$ === 'RBNode_elm_builtin') && (left.a.$ === 'Black')) {
					var _n4 = left.a;
					var lLeft = left.d;
					if ((lLeft.$ === 'RBNode_elm_builtin') && (lLeft.a.$ === 'Red')) {
						var _n6 = lLeft.a;
						return A5(
							elm$core$Dict$RBNode_elm_builtin,
							color,
							key,
							value,
							A2(elm$core$Dict$removeHelp, targetKey, left),
							right);
					} else {
						var _n7 = elm$core$Dict$moveRedLeft(dict);
						if (_n7.$ === 'RBNode_elm_builtin') {
							var nColor = _n7.a;
							var nKey = _n7.b;
							var nValue = _n7.c;
							var nLeft = _n7.d;
							var nRight = _n7.e;
							return A5(
								elm$core$Dict$balance,
								nColor,
								nKey,
								nValue,
								A2(elm$core$Dict$removeHelp, targetKey, nLeft),
								nRight);
						} else {
							return elm$core$Dict$RBEmpty_elm_builtin;
						}
					}
				} else {
					return A5(
						elm$core$Dict$RBNode_elm_builtin,
						color,
						key,
						value,
						A2(elm$core$Dict$removeHelp, targetKey, left),
						right);
				}
			} else {
				return A2(
					elm$core$Dict$removeHelpEQGT,
					targetKey,
					A7(elm$core$Dict$removeHelpPrepEQGT, targetKey, dict, color, key, value, left, right));
			}
		}
	});
var elm$core$Dict$removeHelpEQGT = F2(
	function (targetKey, dict) {
		if (dict.$ === 'RBNode_elm_builtin') {
			var color = dict.a;
			var key = dict.b;
			var value = dict.c;
			var left = dict.d;
			var right = dict.e;
			if (_Utils_eq(targetKey, key)) {
				var _n1 = elm$core$Dict$getMin(right);
				if (_n1.$ === 'RBNode_elm_builtin') {
					var minKey = _n1.b;
					var minValue = _n1.c;
					return A5(
						elm$core$Dict$balance,
						color,
						minKey,
						minValue,
						left,
						elm$core$Dict$removeMin(right));
				} else {
					return elm$core$Dict$RBEmpty_elm_builtin;
				}
			} else {
				return A5(
					elm$core$Dict$balance,
					color,
					key,
					value,
					left,
					A2(elm$core$Dict$removeHelp, targetKey, right));
			}
		} else {
			return elm$core$Dict$RBEmpty_elm_builtin;
		}
	});
var elm$core$Dict$remove = F2(
	function (key, dict) {
		var _n0 = A2(elm$core$Dict$removeHelp, key, dict);
		if ((_n0.$ === 'RBNode_elm_builtin') && (_n0.a.$ === 'Red')) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, elm$core$Dict$Black, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$Dict$update = F3(
	function (targetKey, alter, dictionary) {
		var _n0 = alter(
			A2(elm$core$Dict$get, targetKey, dictionary));
		if (_n0.$ === 'Just') {
			var value = _n0.a;
			return A3(elm$core$Dict$insert, targetKey, value, dictionary);
		} else {
			return A2(elm$core$Dict$remove, targetKey, dictionary);
		}
	});
var elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (maybe.$ === 'Just') {
			var value = maybe.a;
			return elm$core$Maybe$Just(
				f(value));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var jxxcarlson$meenylatex$Internal$LatexState$incrementCounter = F2(
	function (name, latexState) {
		var maybeInc = elm$core$Maybe$map(
			function (x) {
				return x + 1;
			});
		var newCounters = A3(elm$core$Dict$update, name, maybeInc, latexState.counters);
		return _Utils_update(
			latexState,
			{counters: newCounters});
	});
var jxxcarlson$meenylatex$Internal$LatexState$setCrossReference = F3(
	function (label, value, latexState) {
		var crossReferences = latexState.crossReferences;
		var newCrossReferences = A3(elm$core$Dict$insert, label, value, crossReferences);
		return _Utils_update(
			latexState,
			{crossReferences: newCrossReferences});
	});
var jxxcarlson$meenylatex$Internal$ParserTools$latexList2List = function (latexExpression) {
	if (latexExpression.$ === 'LatexList') {
		var list = latexExpression.a;
		return list;
	} else {
		return _List_Nil;
	}
};
var jxxcarlson$meenylatex$Internal$ParserTools$getMacroArgs = F2(
	function (macroName, latexExpression) {
		if (latexExpression.$ === 'Macro') {
			var name = latexExpression.a;
			var optArgs = latexExpression.b;
			var args = latexExpression.c;
			return _Utils_eq(name, macroName) ? A2(elm$core$List$map, jxxcarlson$meenylatex$Internal$ParserTools$latexList2List, args) : _List_Nil;
		} else {
			return _List_Nil;
		}
	});
var jxxcarlson$meenylatex$Internal$ParserTools$list2LeadingString = function (list) {
	var head_ = elm$core$List$head(list);
	var value = function () {
		if (head_.$ === 'Just') {
			var value_ = head_.a;
			return value_;
		} else {
			return jxxcarlson$meenylatex$Internal$Parser$LXString('');
		}
	}();
	if (value.$ === 'LXString') {
		var str = value.a;
		return str;
	} else {
		return '';
	}
};
var jxxcarlson$meenylatex$Internal$ParserTools$getSimpleMacroArgs = F2(
	function (macroName, latexExpression) {
		return A2(
			elm$core$List$map,
			jxxcarlson$meenylatex$Internal$ParserTools$list2LeadingString,
			A2(jxxcarlson$meenylatex$Internal$ParserTools$getMacroArgs, macroName, latexExpression));
	});
var jxxcarlson$meenylatex$Internal$ParserTools$getFirstMacroArg = F2(
	function (macroName, latexExpression) {
		var arg = elm$core$List$head(
			A2(jxxcarlson$meenylatex$Internal$ParserTools$getSimpleMacroArgs, macroName, latexExpression));
		if (arg.$ === 'Just') {
			var value = arg.a;
			return value;
		} else {
			return '';
		}
	});
var jxxcarlson$meenylatex$Internal$StateReducerHelpers$getLabel = function (str) {
	var maybeMacro = A2(
		elm$parser$Parser$Advanced$run,
		jxxcarlson$meenylatex$Internal$Parser$macro(jxxcarlson$meenylatex$Internal$Parser$ws),
		elm$core$String$trim(str));
	if (maybeMacro.$ === 'Ok') {
		var macro = maybeMacro.a;
		return A2(jxxcarlson$meenylatex$Internal$ParserTools$getFirstMacroArg, 'label', macro);
	} else {
		return '';
	}
};
var jxxcarlson$meenylatex$Internal$StateReducerHelpers$setEquationNumber = F2(
	function (body, latexState) {
		var latexState1 = A2(jxxcarlson$meenylatex$Internal$LatexState$incrementCounter, 'eqno', latexState);
		var s1 = A2(jxxcarlson$meenylatex$Internal$LatexState$getCounter, 's1', latexState1);
		var label = function () {
			if (body.$ === 'LXString') {
				var str = body.a;
				return jxxcarlson$meenylatex$Internal$StateReducerHelpers$getLabel(str);
			} else {
				return '';
			}
		}();
		var eqno = A2(jxxcarlson$meenylatex$Internal$LatexState$getCounter, 'eqno', latexState1);
		var latexState2 = (label !== '') ? A3(
			jxxcarlson$meenylatex$Internal$LatexState$setCrossReference,
			label,
			elm$core$String$fromInt(s1) + ('.' + elm$core$String$fromInt(eqno)),
			latexState1) : latexState1;
		return latexState2;
	});
var elm$core$Maybe$andThen = F2(
	function (callback, maybeValue) {
		if (maybeValue.$ === 'Just') {
			var value = maybeValue.a;
			return callback(value);
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var jxxcarlson$meenylatex$Internal$ParserTools$isMacro = F2(
	function (macroName, latexExpression) {
		if (latexExpression.$ === 'Macro') {
			var name = latexExpression.a;
			return _Utils_eq(name, macroName);
		} else {
			return false;
		}
	});
var jxxcarlson$meenylatex$Internal$ParserTools$filterMacro = F2(
	function (macroName, list) {
		return A2(
			elm$core$List$filter,
			jxxcarlson$meenylatex$Internal$ParserTools$isMacro(macroName),
			list);
	});
var jxxcarlson$meenylatex$Internal$ParserTools$getMacroArgs2 = function (latexExpression) {
	if (latexExpression.$ === 'Macro') {
		var name = latexExpression.a;
		var optArgs = latexExpression.b;
		var args = latexExpression.c;
		return A2(elm$core$List$map, jxxcarlson$meenylatex$Internal$ParserTools$latexList2List, args);
	} else {
		return _List_Nil;
	}
};
var jxxcarlson$meenylatex$Internal$ParserTools$getString = function (latexString) {
	if (latexString.$ === 'LXString') {
		var str = latexString.a;
		return str;
	} else {
		return '';
	}
};
var jxxcarlson$meenylatex$Internal$ParserTools$macroValue_ = F2(
	function (macroName, list) {
		return A2(
			elm$core$Maybe$map,
			jxxcarlson$meenylatex$Internal$ParserTools$getString,
			A2(
				elm$core$Maybe$andThen,
				elm$core$List$head,
				A2(
					elm$core$Maybe$andThen,
					elm$core$List$head,
					A2(
						elm$core$Maybe$map,
						jxxcarlson$meenylatex$Internal$ParserTools$getMacroArgs2,
						elm$core$List$head(
							A2(jxxcarlson$meenylatex$Internal$ParserTools$filterMacro, macroName, list))))));
	});
var jxxcarlson$meenylatex$Internal$ParserTools$macroValue = F2(
	function (macroName, envBody) {
		if (envBody.$ === 'LatexList') {
			var list = envBody.a;
			return A2(jxxcarlson$meenylatex$Internal$ParserTools$macroValue_, macroName, list);
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var jxxcarlson$meenylatex$Internal$StateReducerHelpers$setTheoremNumber = F2(
	function (body, latexState) {
		var latexState1 = A2(jxxcarlson$meenylatex$Internal$LatexState$incrementCounter, 'tno', latexState);
		var s1 = A2(jxxcarlson$meenylatex$Internal$LatexState$getCounter, 's1', latexState1);
		var tno = A2(jxxcarlson$meenylatex$Internal$LatexState$getCounter, 'tno', latexState1);
		var label = function () {
			var _n0 = A2(jxxcarlson$meenylatex$Internal$ParserTools$macroValue, 'label', body);
			if (_n0.$ === 'Just') {
				var str = _n0.a;
				return str;
			} else {
				return '';
			}
		}();
		var latexState2 = (label !== '') ? A3(
			jxxcarlson$meenylatex$Internal$LatexState$setCrossReference,
			label,
			elm$core$String$fromInt(s1) + ('.' + elm$core$String$fromInt(tno)),
			latexState1) : latexState1;
		return latexState2;
	});
var jxxcarlson$meenylatex$Internal$Accumulator$envReducer = F4(
	function (name, optonalArgs, body, state) {
		if (A2(elm$core$List$member, name, jxxcarlson$meenylatex$Internal$Accumulator$theoremWords)) {
			return A2(jxxcarlson$meenylatex$Internal$StateReducerHelpers$setTheoremNumber, body, state);
		} else {
			switch (name) {
				case 'equation':
					return A2(jxxcarlson$meenylatex$Internal$StateReducerHelpers$setEquationNumber, body, state);
				case 'align':
					return A2(jxxcarlson$meenylatex$Internal$StateReducerHelpers$setEquationNumber, body, state);
				case 'mathmacro':
					if (body.$ === 'LXString') {
						var str = body.a;
						var mathDict = jxxcarlson$meenylatex$Internal$MathMacro$makeMacroDict(
							elm$core$String$trim(str));
						return _Utils_update(
							state,
							{mathMacroDictionary: mathDict});
					} else {
						return state;
					}
				case 'textmacro':
					if (body.$ === 'LXString') {
						var str = body.a;
						return A2(jxxcarlson$meenylatex$Internal$StateReducerHelpers$setDictionary, str, state);
					} else {
						return state;
					}
				default:
					return state;
			}
		}
	});
var jxxcarlson$meenylatex$Internal$Accumulator$dictionaryWords = _List_fromArray(
	['title', 'author', 'date', 'email', 'revision', 'host', 'setclient', 'setdocid']);
var jxxcarlson$meenylatex$Internal$LatexState$setDictionaryItem = F3(
	function (key, value, latexState) {
		var dictionary = latexState.dictionary;
		var newDictionary = A3(elm$core$Dict$insert, key, value, dictionary);
		return _Utils_update(
			latexState,
			{dictionary: newDictionary});
	});
var jxxcarlson$meenylatex$Internal$ParserTools$headLatexExpression = function (list) {
	var he = function () {
		var _n0 = elm$core$List$head(list);
		if (_n0.$ === 'Just') {
			var expr = _n0.a;
			return expr;
		} else {
			return jxxcarlson$meenylatex$Internal$Parser$LatexList(_List_Nil);
		}
	}();
	return he;
};
var jxxcarlson$meenylatex$Internal$ParserTools$valueOfLXString = function (expr) {
	if (expr.$ === 'LXString') {
		var str = expr.a;
		return str;
	} else {
		return 'Error getting value of LatexString';
	}
};
var jxxcarlson$meenylatex$Internal$ParserTools$valueOfLatexList = function (latexList) {
	if (latexList.$ === 'LatexList') {
		var value = latexList.a;
		return value;
	} else {
		return _List_fromArray(
			[
				jxxcarlson$meenylatex$Internal$Parser$LXString('Error getting value of LatexList')
			]);
	}
};
var jxxcarlson$meenylatex$Internal$ParserTools$unpackString = function (expr) {
	return jxxcarlson$meenylatex$Internal$ParserTools$valueOfLXString(
		jxxcarlson$meenylatex$Internal$ParserTools$headLatexExpression(
			jxxcarlson$meenylatex$Internal$ParserTools$valueOfLatexList(
				jxxcarlson$meenylatex$Internal$ParserTools$headLatexExpression(expr))));
};
var jxxcarlson$meenylatex$Internal$StateReducerHelpers$setDictionaryItemForMacro = F3(
	function (name, args, latexState) {
		var value = jxxcarlson$meenylatex$Internal$ParserTools$unpackString(args);
		return A3(jxxcarlson$meenylatex$Internal$LatexState$setDictionaryItem, name, value, latexState);
	});
var jxxcarlson$meenylatex$Internal$LatexState$updateCounter = F3(
	function (name, value, latexState) {
		var maybeSet = elm$core$Maybe$map(
			function (x) {
				return value;
			});
		var newCounters = A3(elm$core$Dict$update, name, maybeSet, latexState.counters);
		return _Utils_update(
			latexState,
			{counters: newCounters});
	});
var jxxcarlson$meenylatex$Internal$Utility$getAt = F2(
	function (idx, xs) {
		return (idx < 0) ? elm$core$Maybe$Nothing : elm$core$List$head(
			A2(elm$core$List$drop, idx, xs));
	});
var jxxcarlson$meenylatex$Internal$StateReducerHelpers$getAt = F2(
	function (k, list_) {
		return A2(
			elm$core$Maybe$withDefault,
			'xxx',
			A2(jxxcarlson$meenylatex$Internal$Utility$getAt, k, list_));
	});
var jxxcarlson$meenylatex$Internal$StateReducerHelpers$setSectionCounters = F2(
	function (macroArgs, latexState) {
		var argList = A2(
			elm$core$List$map,
			jxxcarlson$meenylatex$Internal$ParserTools$list2LeadingString,
			A2(elm$core$List$map, jxxcarlson$meenylatex$Internal$ParserTools$latexList2List, macroArgs));
		var arg2 = A2(jxxcarlson$meenylatex$Internal$StateReducerHelpers$getAt, 1, argList);
		var arg1 = A2(jxxcarlson$meenylatex$Internal$StateReducerHelpers$getAt, 0, argList);
		var initialSectionNumber = (arg1 === 'section') ? A2(
			elm$core$Maybe$withDefault,
			0,
			elm$core$String$toInt(arg2)) : (-1);
		return (_Utils_cmp(initialSectionNumber, -1) > 0) ? A3(
			jxxcarlson$meenylatex$Internal$LatexState$updateCounter,
			's3',
			0,
			A3(
				jxxcarlson$meenylatex$Internal$LatexState$updateCounter,
				's2',
				0,
				A3(jxxcarlson$meenylatex$Internal$LatexState$updateCounter, 's1', initialSectionNumber - 1, latexState))) : latexState;
	});
var jxxcarlson$meenylatex$Internal$LatexState$TocEntry = F3(
	function (name, label, level) {
		return {label: label, level: level, name: name};
	});
var jxxcarlson$meenylatex$Internal$LatexState$addSection = F4(
	function (sectionName, label, level, latexState) {
		var newEntry = A3(jxxcarlson$meenylatex$Internal$LatexState$TocEntry, sectionName, label, level);
		var toc = _Utils_ap(
			latexState.tableOfContents,
			_List_fromArray(
				[newEntry]));
		return _Utils_update(
			latexState,
			{tableOfContents: toc});
	});
var jxxcarlson$meenylatex$Internal$StateReducerHelpers$updateSectionNumber = F2(
	function (macroArgs, latexState) {
		var label = elm$core$String$fromInt(
			function (x) {
				return x + 1;
			}(
				A2(jxxcarlson$meenylatex$Internal$LatexState$getCounter, 's1', latexState)));
		return A4(
			jxxcarlson$meenylatex$Internal$LatexState$addSection,
			jxxcarlson$meenylatex$Internal$ParserTools$unpackString(macroArgs),
			label,
			1,
			A3(
				jxxcarlson$meenylatex$Internal$LatexState$updateCounter,
				's3',
				0,
				A3(
					jxxcarlson$meenylatex$Internal$LatexState$updateCounter,
					's2',
					0,
					A2(jxxcarlson$meenylatex$Internal$LatexState$incrementCounter, 's1', latexState))));
	});
var jxxcarlson$meenylatex$Internal$StateReducerHelpers$updateSubsectionNumber = F2(
	function (macroArgs, latexState) {
		var s2 = elm$core$String$fromInt(
			function (x) {
				return x + 1;
			}(
				A2(jxxcarlson$meenylatex$Internal$LatexState$getCounter, 's2', latexState)));
		var s1 = elm$core$String$fromInt(
			A2(jxxcarlson$meenylatex$Internal$LatexState$getCounter, 's1', latexState));
		var label = s1 + ('.' + s2);
		return A4(
			jxxcarlson$meenylatex$Internal$LatexState$addSection,
			jxxcarlson$meenylatex$Internal$ParserTools$unpackString(macroArgs),
			label,
			2,
			A3(
				jxxcarlson$meenylatex$Internal$LatexState$updateCounter,
				's3',
				0,
				A2(jxxcarlson$meenylatex$Internal$LatexState$incrementCounter, 's2', latexState)));
	});
var jxxcarlson$meenylatex$Internal$StateReducerHelpers$updateSubsubsectionNumber = F2(
	function (macroArgs, latexState) {
		var s3 = elm$core$String$fromInt(
			function (x) {
				return x + 1;
			}(
				A2(jxxcarlson$meenylatex$Internal$LatexState$getCounter, 's3', latexState)));
		var s2 = elm$core$String$fromInt(
			A2(jxxcarlson$meenylatex$Internal$LatexState$getCounter, 's2', latexState));
		var s1 = elm$core$String$fromInt(
			A2(jxxcarlson$meenylatex$Internal$LatexState$getCounter, 's1', latexState));
		var label = s1 + ('.' + (s2 + ('.' + s3)));
		return A4(
			jxxcarlson$meenylatex$Internal$LatexState$addSection,
			jxxcarlson$meenylatex$Internal$ParserTools$unpackString(macroArgs),
			label,
			2,
			A2(jxxcarlson$meenylatex$Internal$LatexState$incrementCounter, 's3', latexState));
	});
var jxxcarlson$meenylatex$Internal$Accumulator$macroReducer = F4(
	function (name, optionalArgs, args, state) {
		if (A2(elm$core$List$member, name, jxxcarlson$meenylatex$Internal$Accumulator$dictionaryWords)) {
			return A3(jxxcarlson$meenylatex$Internal$StateReducerHelpers$setDictionaryItemForMacro, name, args, state);
		} else {
			switch (name) {
				case 'section':
					return A2(jxxcarlson$meenylatex$Internal$StateReducerHelpers$updateSectionNumber, args, state);
				case 'subsection':
					return A2(jxxcarlson$meenylatex$Internal$StateReducerHelpers$updateSubsectionNumber, args, state);
				case 'subsubsection':
					return A2(jxxcarlson$meenylatex$Internal$StateReducerHelpers$updateSubsubsectionNumber, args, state);
				case 'setcounter':
					return A2(jxxcarlson$meenylatex$Internal$StateReducerHelpers$setSectionCounters, args, state);
				default:
					return state;
			}
		}
	});
var jxxcarlson$meenylatex$Internal$StateReducerHelpers$setBibItemXRef = F3(
	function (optionalArgs, args, latexState) {
		var label = jxxcarlson$meenylatex$Internal$ParserTools$unpackString(args);
		var value = _Utils_eq(optionalArgs, _List_Nil) ? label : jxxcarlson$meenylatex$Internal$ParserTools$unpackString(optionalArgs);
		return A3(jxxcarlson$meenylatex$Internal$LatexState$setDictionaryItem, 'bibitem:' + label, value, latexState);
	});
var jxxcarlson$meenylatex$Internal$Accumulator$smacroReducer = F5(
	function (name, optionalArgs, args, latexExpression, state) {
		if (name === 'bibitem') {
			return A3(jxxcarlson$meenylatex$Internal$StateReducerHelpers$setBibItemXRef, optionalArgs, args, state);
		} else {
			return state;
		}
	});
var jxxcarlson$meenylatex$Internal$Accumulator$latexStateReducerAux = F2(
	function (lexpr, state) {
		switch (lexpr.$) {
			case 'Macro':
				var name = lexpr.a;
				var optionalArgs = lexpr.b;
				var args = lexpr.c;
				return A4(jxxcarlson$meenylatex$Internal$Accumulator$macroReducer, name, optionalArgs, args, state);
			case 'SMacro':
				var name = lexpr.a;
				var optionalArgs = lexpr.b;
				var args = lexpr.c;
				var latexExpression = lexpr.d;
				return A5(jxxcarlson$meenylatex$Internal$Accumulator$smacroReducer, name, optionalArgs, args, latexExpression, state);
			case 'NewCommand':
				var name = lexpr.a;
				var nArgs = lexpr.b;
				var body = lexpr.c;
				return A3(jxxcarlson$meenylatex$Internal$StateReducerHelpers$setMacroDefinition, name, body, state);
			case 'Environment':
				var name = lexpr.a;
				var optonalArgs = lexpr.b;
				var body = lexpr.c;
				return A4(jxxcarlson$meenylatex$Internal$Accumulator$envReducer, name, optonalArgs, body, state);
			case 'LatexList':
				var list = lexpr.a;
				return A3(elm$core$List$foldr, jxxcarlson$meenylatex$Internal$Accumulator$latexStateReducerAux, state, list);
			default:
				return state;
		}
	});
var jxxcarlson$meenylatex$Internal$Accumulator$latexStateReducer = F2(
	function (list, state) {
		return A3(elm$core$List$foldr, jxxcarlson$meenylatex$Internal$Accumulator$latexStateReducerAux, state, list);
	});
var jxxcarlson$meenylatex$Internal$Accumulator$renderReducerNew = F3(
	function (renderer, listStringAndLatexExpression, _n0) {
		var state = _n0.a;
		var inputList = _n0.b;
		var newState = A2(jxxcarlson$meenylatex$Internal$Accumulator$latexStateReducer, listStringAndLatexExpression.b, state);
		var renderedInput = A2(
			renderer,
			newState,
			_List_fromArray(
				[listStringAndLatexExpression]));
		return _Utils_Tuple2(
			newState,
			_Utils_ap(
				inputList,
				_List_fromArray(
					[renderedInput])));
	});
var jxxcarlson$meenylatex$Internal$Accumulator$renderNew = F3(
	function (renderer, latexState, paragraphs) {
		return A3(
			elm$core$List$foldl,
			jxxcarlson$meenylatex$Internal$Accumulator$renderReducerNew(renderer),
			_Utils_Tuple2(latexState, _List_Nil),
			paragraphs);
	});
var elm$html$Html$code = _VirtualDom_node('code');
var elm$html$Html$h2 = _VirtualDom_node('h2');
var elm$html$Html$h3 = _VirtualDom_node('h3');
var elm$html$Html$h4 = _VirtualDom_node('h4');
var elm$html$Html$i = _VirtualDom_node('i');
var elm$html$Html$li = _VirtualDom_node('li');
var elm$html$Html$ol = _VirtualDom_node('ol');
var elm$html$Html$p = _VirtualDom_node('p');
var elm$html$Html$span = _VirtualDom_node('span');
var elm$html$Html$strong = _VirtualDom_node('strong');
var elm$html$Html$table = _VirtualDom_node('table');
var elm$html$Html$tbody = _VirtualDom_node('tbody');
var elm$html$Html$td = _VirtualDom_node('td');
var elm$html$Html$tr = _VirtualDom_node('tr');
var elm$html$Html$ul = _VirtualDom_node('ul');
var elm$html$Html$Attributes$class = elm$html$Html$Attributes$stringProperty('className');
var elm$core$String$indexes = _String_indexes;
var jxxcarlson$meenylatex$Internal$ErrorMessages2$getLine = F2(
	function (lineNumber, str) {
		getLine:
		while (true) {
			if (lineNumber <= 1) {
				return A2(
					elm$core$Maybe$withDefault,
					str,
					elm$core$List$head(
						A2(elm$core$String$split, '\n', str)));
			} else {
				var $temp$lineNumber = lineNumber - 1,
					$temp$str = A3(
					elm$core$String$slice,
					A2(
						elm$core$Maybe$withDefault,
						0,
						elm$core$List$head(
							A2(elm$core$String$indexes, '\n', str))) + 1,
					elm$core$String$length(str),
					str);
				lineNumber = $temp$lineNumber;
				str = $temp$str;
				continue getLine;
			}
		}
	});
var jxxcarlson$meenylatex$Internal$ErrorMessages2$getRows = F2(
	function (k, source) {
		return A2(
			elm$core$List$map,
			elm$core$String$left(40),
			A2(
				elm$core$List$map,
				elm$core$Tuple$second,
				A2(
					elm$core$List$filter,
					function (_n0) {
						var i = _n0.a;
						var line = _n0.b;
						return _Utils_cmp(i, k) < 0;
					},
					A2(
						elm$core$List$indexedMap,
						F2(
							function (i, line) {
								return _Utils_Tuple2(i, line);
							}),
						elm$core$String$lines(source)))));
	});
var jxxcarlson$meenylatex$Internal$ErrorMessages2$betterErrorText = F2(
	function (theError, source) {
		var firstLine = function (source_) {
			return _List_fromArray(
				[
					A2(jxxcarlson$meenylatex$Internal$ErrorMessages2$getLine, 1, source_)
				]);
		};
		var _n0 = theError.problem;
		switch (_n0.$) {
			case 'ExpectingValidMacroArgWord':
				return firstLine(source);
			case 'ExpectingEndOfEnvironmentName':
				return firstLine(source);
			case 'ExpectingEndWord':
				var word = _n0.a;
				return firstLine(source);
			default:
				return A2(jxxcarlson$meenylatex$Internal$ErrorMessages2$getRows, theError.row, source);
		}
	});
var jxxcarlson$meenylatex$Internal$ErrorMessages2$displayExpected = function (problem) {
	switch (problem.$) {
		case 'ExpectingEndForInlineMath':
			return 'Expecting \'$\' to end inline math';
		case 'ExpectingEndOfEnvironmentName':
			return 'Make complete environment \\begin{..} ... \\end{..}';
		case 'ExpectingBeginDisplayMathModeDollarSign':
			return 'Expecting \'$$\' to begin displayed math';
		case 'ExpectingEndDisplayMathModeDollarSign':
			return 'Expecting \'$$\' to end displayed math';
		case 'ExpectingBeginDisplayMathModeBracket':
			return 'Expecting \'\\[\' or \'\\]\' for displayed math';
		case 'ExpectingEndDisplayMathModeBracket':
			return 'Expecting \'\\[\' or \'\\]\' for displayed math';
		case 'ExpectingEndForPassThroughBody':
			return 'Missing \\end{env}';
		case 'ExpectingValidTableCell':
			return 'Something is to complete the table cell';
		case 'ExpectingValidOptionArgWord':
			return 'Something is missing to complete the optional argument';
		case 'ExpectingValidMacroArgWord':
			return 'Fill in the macro argument: {..}';
		case 'ExpectingWords':
			return 'Something is missing in this sequence of words';
		case 'ExpectingLeftBrace':
			return 'Expecting left brace';
		case 'ExpectingRightBrace':
			return 'Complete the argument with a right brace : {..}';
		case 'ExpectingLeftBracket':
			return 'Expecting left bracket';
		case 'ExpectingRightBracket':
			return 'Expecting right bracket';
		case 'ExpectingLeftParen':
			return 'Expecting left paren';
		case 'ExpectingRightParen':
			return 'Expecting right paren';
		case 'ExpectingNewline':
			return 'Expecting new line';
		case 'ExpectingPercent':
			return 'Expecting percent';
		case 'ExpectingMacroReservedWord':
			return 'Expecting macro reserved word';
		case 'ExpectingmSMacroReservedWord':
			return 'Expecting smacro reserved word';
		case 'ExpectingInt':
			return 'Expecting int';
		case 'InvalidInt':
			return 'Invalid int';
		case 'ExpectingLeadingDollarSign':
			return 'Expecting $';
		case 'ExpectingEnvironmentNameBegin':
			return 'Close your environment \\begin{..} ... \\end{..}';
		case 'ExpectingEnvironmentNameEnd':
			return 'Expecting \\end{envName}';
		case 'ExpectingBeginAndRightBrace':
			return 'Expecting begin{';
		case 'ExpectingEndAndRightBrace':
			return 'Expecting end}';
		case 'ExpectingEscapeAndLeftBracket':
			return 'Expecting \\[';
		case 'ExpectingDoubleNewline':
			return 'Expecting \n\n';
		case 'ExpectingEscapedItem':
			return 'Expecting \\item';
		case 'ExpectingSpaceAfterItem':
			return 'Complete your \\item ...';
		case 'ExpectingAmpersand':
			return 'Expecting &';
		case 'ExpectingDoubleEscapeAndNewline':
			return 'Expecting \\\\\n';
		case 'ExpectingEscapedNewcommandAndBrace':
			return 'Expecting \\newcommand{';
		case 'ExpectingEndWord':
			var envName = problem.a;
			return 'Close environment with ' + envName;
		default:
			var envName = problem.a;
			return 'Do you have an incomplete \\item ... ?';
	}
};
var jxxcarlson$meenylatex$Internal$ErrorMessages2$renderErrors = F2(
	function (source, errs) {
		var _n0 = elm$core$List$head(
			elm$core$List$reverse(errs));
		if (_n0.$ === 'Nothing') {
			return {errorText: _List_Nil, explanation: 'no explanation', markerOffset: 0};
		} else {
			var theErr = _n0.a;
			var errColumn = A2(
				elm$core$Maybe$withDefault,
				1,
				A2(
					elm$core$Maybe$map,
					function ($) {
						return $.col;
					},
					elm$core$List$head(theErr.contextStack)));
			var markerOffset = errColumn;
			return {
				errorText: A2(jxxcarlson$meenylatex$Internal$ErrorMessages2$betterErrorText, theErr, source),
				explanation: jxxcarlson$meenylatex$Internal$ErrorMessages2$displayExpected(theErr.problem),
				markerOffset: markerOffset
			};
		}
	});
var jxxcarlson$meenylatex$Internal$LatexState$initialCounters = elm$core$Dict$fromList(
	_List_fromArray(
		[
			_Utils_Tuple2('s1', 0),
			_Utils_Tuple2('s2', 0),
			_Utils_Tuple2('s3', 0),
			_Utils_Tuple2('tno', 0),
			_Utils_Tuple2('eqno', 0)
		]));
var jxxcarlson$meenylatex$Internal$LatexState$emptyLatexState = {counters: jxxcarlson$meenylatex$Internal$LatexState$initialCounters, crossReferences: elm$core$Dict$empty, dictionary: elm$core$Dict$empty, macroDictionary: elm$core$Dict$empty, mathMacroDictionary: elm$core$Dict$empty, tableOfContents: _List_Nil};
var jxxcarlson$meenylatex$Internal$Macro$nArgs = function (latexExpression) {
	if (latexExpression.$ === 'Macro') {
		var name = latexExpression.a;
		var optArgs = latexExpression.b;
		var args = latexExpression.c;
		return elm$core$List$length(args);
	} else {
		return 0;
	}
};
var elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			elm$core$String$join,
			after,
			A2(elm$core$String$split, before, string));
	});
var jxxcarlson$meenylatex$Internal$ErrorMessages2$renderError = function (errorDatum) {
	return 'error';
};
var jxxcarlson$meenylatex$Internal$Html$div = F2(
	function (attributes, children) {
		var childrenString = A2(elm$core$String$join, '\n', children);
		var attributeString = A2(elm$core$String$join, ' ', attributes);
		return '<div ' + (attributeString + (' >\n' + (childrenString + '\n</div>')));
	});
var jxxcarlson$meenylatex$Internal$JoinStrings$NoSpace = {$: 'NoSpace'};
var jxxcarlson$meenylatex$Internal$JoinStrings$Space = {$: 'Space'};
var jxxcarlson$meenylatex$Internal$JoinStrings$firstChar = elm$core$String$left(1);
var elm$core$String$right = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(
			elm$core$String$slice,
			-n,
			elm$core$String$length(string),
			string);
	});
var jxxcarlson$meenylatex$Internal$JoinStrings$lastChar = elm$core$String$right(1);
var jxxcarlson$meenylatex$Internal$JoinStrings$joinType = F2(
	function (l, r) {
		var lastCharLeft = jxxcarlson$meenylatex$Internal$JoinStrings$lastChar(l);
		var firstCharRight = jxxcarlson$meenylatex$Internal$JoinStrings$firstChar(r);
		return (l === '') ? jxxcarlson$meenylatex$Internal$JoinStrings$NoSpace : (A2(
			elm$core$List$member,
			lastCharLeft,
			_List_fromArray(
				['('])) ? jxxcarlson$meenylatex$Internal$JoinStrings$NoSpace : (A2(
			elm$core$List$member,
			firstCharRight,
			_List_fromArray(
				[')', '.', ',', '?', '!', ';', ':'])) ? jxxcarlson$meenylatex$Internal$JoinStrings$NoSpace : jxxcarlson$meenylatex$Internal$JoinStrings$Space));
	});
var jxxcarlson$meenylatex$Internal$JoinStrings$joinDatum2String = F2(
	function (current, datum) {
		var _n0 = datum;
		var acc = _n0.a;
		var previous = _n0.b;
		var _n1 = A2(jxxcarlson$meenylatex$Internal$JoinStrings$joinType, previous, current);
		if (_n1.$ === 'NoSpace') {
			return _Utils_Tuple2(
				_Utils_ap(acc, current),
				current);
		} else {
			return _Utils_Tuple2(acc + (' ' + current), current);
		}
	});
var jxxcarlson$meenylatex$Internal$JoinStrings$joinList = function (stringList) {
	var start = A2(
		elm$core$Maybe$withDefault,
		'',
		elm$core$List$head(stringList));
	return A3(
		elm$core$List$foldl,
		jxxcarlson$meenylatex$Internal$JoinStrings$joinDatum2String,
		_Utils_Tuple2('', ''),
		stringList).a;
};
var jxxcarlson$meenylatex$Internal$RenderToString$getElement = F2(
	function (k, list) {
		return A2(
			elm$core$Maybe$withDefault,
			jxxcarlson$meenylatex$Internal$Parser$LXString('xxx'),
			A2(jxxcarlson$meenylatex$Internal$Utility$getAt, k, list));
	});
var jxxcarlson$meenylatex$Internal$RenderToString$itemClass = function (level) {
	return 'item' + elm$core$String$fromInt(level);
};
var jxxcarlson$meenylatex$Internal$RenderToString$postProcess = function (str) {
	return A3(
		elm$core$String$replace,
		'\\&',
		'&#38',
		A3(
			elm$core$String$replace,
			'--',
			'&ndash;',
			A3(elm$core$String$replace, '---', '&mdash;', str)));
};
var jxxcarlson$meenylatex$Internal$RenderToString$renderComment = function (str) {
	return '';
};
var jxxcarlson$meenylatex$Internal$RenderToString$renderCommentEnvironment = F2(
	function (latexState, body) {
		return '';
	});
var jxxcarlson$meenylatex$Internal$RenderToString$renderCell = function (cell) {
	switch (cell.$) {
		case 'LXString':
			var s = cell.a;
			return '<td>' + (s + '</td>');
		case 'InlineMath':
			var s = cell.a;
			return '<td>$' + (s + '$</td>');
		default:
			return '<td>-</td>';
	}
};
var jxxcarlson$meenylatex$Internal$RenderToString$renderRow = function (row) {
	if (row.$ === 'LatexList') {
		var row_ = row.a;
		return function (row__) {
			return '<tr> ' + (row__ + ' </tr>\n');
		}(
			A3(
				elm$core$List$foldl,
				F2(
					function (cell, acc) {
						return acc + (' ' + jxxcarlson$meenylatex$Internal$RenderToString$renderCell(cell));
					}),
				'',
				row_));
	} else {
		return '<tr>-</tr>';
	}
};
var jxxcarlson$meenylatex$Internal$RenderToString$renderTableBody = function (body) {
	if (body.$ === 'LatexList') {
		var body_ = body.a;
		return function (bod) {
			return '<table>\n' + (bod + '</table>\n');
		}(
			A3(
				elm$core$List$foldl,
				F2(
					function (row, acc) {
						return acc + (' ' + jxxcarlson$meenylatex$Internal$RenderToString$renderRow(row));
					}),
				'',
				body_));
	} else {
		return '<table>-</table>';
	}
};
var jxxcarlson$meenylatex$Internal$RenderToString$renderTabular = F2(
	function (latexState, body) {
		return jxxcarlson$meenylatex$Internal$RenderToString$renderTableBody(body);
	});
var elm$core$String$cons = _String_cons;
var elm$core$String$fromChar = function (_char) {
	return A2(elm$core$String$cons, _char, '');
};
var elm$core$Bitwise$and = _Bitwise_and;
var elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3(elm$core$String$repeatHelp, n, chunk, '');
	});
var elm$core$String$padLeft = F3(
	function (n, _char, string) {
		return _Utils_ap(
			A2(
				elm$core$String$repeat,
				n - elm$core$String$length(string),
				elm$core$String$fromChar(_char)),
			string);
	});
var jxxcarlson$meenylatex$Internal$Utility$numberedLine = F2(
	function (k, line) {
		return A3(
			elm$core$String$padLeft,
			2,
			_Utils_chr(' '),
			elm$core$String$fromInt(k)) + (' ' + line);
	});
var jxxcarlson$meenylatex$Internal$Utility$addNumberedLine = F2(
	function (line, data) {
		var _n0 = data;
		var k = _n0.a;
		var lines = _n0.b;
		return _Utils_Tuple2(
			k + 1,
			_Utils_ap(
				_List_fromArray(
					[
						A2(jxxcarlson$meenylatex$Internal$Utility$numberedLine, k + 1, line)
					]),
				lines));
	});
var jxxcarlson$meenylatex$Internal$Utility$addLineNumbers = function (text) {
	return A2(
		elm$core$String$join,
		'\n',
		elm$core$List$reverse(
			A3(
				elm$core$List$foldl,
				jxxcarlson$meenylatex$Internal$Utility$addNumberedLine,
				_Utils_Tuple2(0, _List_Nil),
				A2(
					elm$core$String$split,
					'\n',
					elm$core$String$trim(text))).b));
};
var jxxcarlson$meenylatex$Internal$RenderToString$environmentRenderer = function (name) {
	var _n3 = A2(
		elm$core$Dict$get,
		name,
		jxxcarlson$meenylatex$Internal$RenderToString$cyclic$renderEnvironmentDict());
	if (_n3.$ === 'Just') {
		var f = _n3.a;
		return f;
	} else {
		return jxxcarlson$meenylatex$Internal$RenderToString$renderDefaultEnvironment(name);
	}
};
var jxxcarlson$meenylatex$Internal$RenderToString$macroRenderer = F4(
	function (name, latexState, optArgs, args) {
		var _n2 = A2(
			elm$core$Dict$get,
			name,
			jxxcarlson$meenylatex$Internal$RenderToString$cyclic$renderMacroDict());
		if (_n2.$ === 'Just') {
			var f = _n2.a;
			return A3(f, latexState, optArgs, args);
		} else {
			return A4(jxxcarlson$meenylatex$Internal$RenderToString$reproduceMacro, name, latexState, optArgs, args);
		}
	});
var jxxcarlson$meenylatex$Internal$RenderToString$render = F2(
	function (latexState, latexExpression) {
		switch (latexExpression.$) {
			case 'Comment':
				var str = latexExpression.a;
				return jxxcarlson$meenylatex$Internal$RenderToString$renderComment(str);
			case 'Macro':
				var name = latexExpression.a;
				var optArgs = latexExpression.b;
				var args = latexExpression.c;
				return A4(jxxcarlson$meenylatex$Internal$RenderToString$renderMacro, latexState, name, optArgs, args);
			case 'SMacro':
				var name = latexExpression.a;
				var optArgs = latexExpression.b;
				var args = latexExpression.c;
				var le = latexExpression.d;
				return A5(jxxcarlson$meenylatex$Internal$RenderToString$renderSMacro, latexState, name, optArgs, args, le);
			case 'Item':
				var level = latexExpression.a;
				var latexExpr = latexExpression.b;
				return A3(jxxcarlson$meenylatex$Internal$RenderToString$renderItem, latexState, level, latexExpr);
			case 'InlineMath':
				var str = latexExpression.a;
				return '$' + (str + '$');
			case 'DisplayMath':
				var str = latexExpression.a;
				return '$$' + (str + '$$');
			case 'Environment':
				var name = latexExpression.a;
				var args = latexExpression.b;
				var body = latexExpression.c;
				return A4(jxxcarlson$meenylatex$Internal$RenderToString$renderEnvironment, latexState, name, args, body);
			case 'LatexList':
				var args = latexExpression.a;
				return A2(jxxcarlson$meenylatex$Internal$RenderToString$renderLatexList, latexState, args);
			case 'LXString':
				var str = latexExpression.a;
				return str;
			case 'NewCommand':
				var commandName = latexExpression.a;
				var numberOfArgs = latexExpression.b;
				var commandBody = latexExpression.c;
				return 'newCommand: ' + commandName;
			default:
				var error = latexExpression.a;
				return A2(
					elm$core$String$join,
					'; ',
					A2(elm$core$List$map, jxxcarlson$meenylatex$Internal$ErrorMessages2$renderError, error));
		}
	});
var jxxcarlson$meenylatex$Internal$RenderToString$renderAlignEnvironment = F2(
	function (latexState, body) {
		var s1 = A2(jxxcarlson$meenylatex$Internal$LatexState$getCounter, 's1', latexState);
		var r = A3(
			elm$core$String$replace,
			'\\ \\',
			'\\\\',
			A2(jxxcarlson$meenylatex$Internal$RenderToString$render, latexState, body));
		var eqno = A2(jxxcarlson$meenylatex$Internal$LatexState$getCounter, 'eqno', latexState);
		var addendum = (eqno > 0) ? ((s1 > 0) ? ('\\tag{' + (elm$core$String$fromInt(s1) + ('.' + (elm$core$String$fromInt(eqno) + '}')))) : ('\\tag{' + (elm$core$String$fromInt(eqno) + '}'))) : '';
		return '\n$$\n\\begin{align}\n' + (addendum + (r + '\n\\end{align}\n$$\n'));
	});
var jxxcarlson$meenylatex$Internal$RenderToString$renderArg = F3(
	function (k, latexState, args) {
		return elm$core$String$trim(
			A2(
				jxxcarlson$meenylatex$Internal$RenderToString$render,
				latexState,
				A2(jxxcarlson$meenylatex$Internal$RenderToString$getElement, k, args)));
	});
var jxxcarlson$meenylatex$Internal$RenderToString$renderArgList = F2(
	function (latexState, args) {
		return A2(
			elm$core$String$join,
			'',
			A2(
				elm$core$List$map,
				function (x) {
					return '{' + (x + '}');
				},
				A2(
					elm$core$List$map,
					jxxcarlson$meenylatex$Internal$RenderToString$render(latexState),
					args)));
	});
var jxxcarlson$meenylatex$Internal$RenderToString$renderBibItem = F4(
	function (latexState, optArgs, args, body) {
		var label = (elm$core$List$length(optArgs) === 1) ? A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 0, latexState, optArgs) : A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 0, latexState, args);
		return ' <p id=bibitem:' + (label + ('>[' + (label + ('] ' + (A2(jxxcarlson$meenylatex$Internal$RenderToString$render, latexState, body) + '</p>\n')))));
	});
var jxxcarlson$meenylatex$Internal$RenderToString$renderBozo = F2(
	function (latexState, args) {
		return 'bozo{' + (A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 0, latexState, args) + ('}{' + (A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 1, latexState, args) + '}')));
	});
var jxxcarlson$meenylatex$Internal$RenderToString$renderCenterEnvironment = F2(
	function (latexState, body) {
		var r = A2(jxxcarlson$meenylatex$Internal$RenderToString$render, latexState, body);
		return '\n<div class=\"center\" >\n' + (r + '\n</div>\n');
	});
var jxxcarlson$meenylatex$Internal$RenderToString$renderDefaultEnvironment = F4(
	function (name, latexState, args, body) {
		return A2(
			elm$core$List$member,
			name,
			_List_fromArray(
				['theorem', 'proposition', 'corollary', 'lemma', 'definition'])) ? A4(jxxcarlson$meenylatex$Internal$RenderToString$renderTheoremLikeEnvironment, latexState, name, args, body) : A4(jxxcarlson$meenylatex$Internal$RenderToString$renderDefaultEnvironment2, latexState, name, args, body);
	});
var jxxcarlson$meenylatex$Internal$RenderToString$renderDefaultEnvironment2 = F4(
	function (latexState, name, args, body) {
		var r = A2(jxxcarlson$meenylatex$Internal$RenderToString$render, latexState, body);
		return '\n<div class=\"environment\">\n<strong>' + (name + ('</strong>\n<div>\n' + (r + '\n</div>\n</div>\n')));
	});
var jxxcarlson$meenylatex$Internal$RenderToString$renderEnumerate = F2(
	function (latexState, body) {
		return '\n<ol>\n' + (A2(jxxcarlson$meenylatex$Internal$RenderToString$render, latexState, body) + '\n</ol>\n');
	});
var jxxcarlson$meenylatex$Internal$RenderToString$renderEnvironment = F4(
	function (latexState, name, args, body) {
		return A4(jxxcarlson$meenylatex$Internal$RenderToString$environmentRenderer, name, latexState, args, body);
	});
var jxxcarlson$meenylatex$Internal$RenderToString$renderEqnArray = F2(
	function (latexState, body) {
		return '\n$$\n' + (A2(jxxcarlson$meenylatex$Internal$RenderToString$render, latexState, body) + '\n$$\n');
	});
var jxxcarlson$meenylatex$Internal$RenderToString$renderEquationEnvironment = F2(
	function (latexState, body) {
		var s1 = A2(jxxcarlson$meenylatex$Internal$LatexState$getCounter, 's1', latexState);
		var r = A2(jxxcarlson$meenylatex$Internal$RenderToString$render, latexState, body);
		var eqno = A2(jxxcarlson$meenylatex$Internal$LatexState$getCounter, 'eqno', latexState);
		var addendum = (eqno > 0) ? ((s1 > 0) ? ('\\tag{' + (elm$core$String$fromInt(s1) + ('.' + (elm$core$String$fromInt(eqno) + '}')))) : ('\\tag{' + (elm$core$String$fromInt(eqno) + '}'))) : '';
		return '\n$$\n\\begin{equation}' + (addendum + (r + '\\end{equation}\n$$\n'));
	});
var jxxcarlson$meenylatex$Internal$RenderToString$renderIndentEnvironment = F2(
	function (latexState, body) {
		return A2(
			jxxcarlson$meenylatex$Internal$Html$div,
			_List_fromArray(
				['style=\"margin-left:2em\"']),
			_List_fromArray(
				[
					A2(jxxcarlson$meenylatex$Internal$RenderToString$render, latexState, body)
				]));
	});
var jxxcarlson$meenylatex$Internal$RenderToString$renderItem = F3(
	function (latexState, level, latexExpression) {
		return '<li class=\"' + (jxxcarlson$meenylatex$Internal$RenderToString$itemClass(level) + ('\">' + (A2(jxxcarlson$meenylatex$Internal$RenderToString$render, latexState, latexExpression) + '</li>\n')));
	});
var jxxcarlson$meenylatex$Internal$RenderToString$renderItemize = F2(
	function (latexState, body) {
		return '\n<ul>\n' + (A2(jxxcarlson$meenylatex$Internal$RenderToString$render, latexState, body) + '\n</ul>\n');
	});
var jxxcarlson$meenylatex$Internal$RenderToString$renderLatexList = F2(
	function (latexState, args) {
		return jxxcarlson$meenylatex$Internal$RenderToString$postProcess(
			jxxcarlson$meenylatex$Internal$JoinStrings$joinList(
				A2(
					elm$core$List$map,
					jxxcarlson$meenylatex$Internal$RenderToString$render(latexState),
					args)));
	});
var jxxcarlson$meenylatex$Internal$RenderToString$renderListing = F2(
	function (latexState, body) {
		var text = A2(jxxcarlson$meenylatex$Internal$RenderToString$render, latexState, body);
		return '\n<pre class=\"verbatim\">' + (jxxcarlson$meenylatex$Internal$Utility$addLineNumbers(text) + '</pre>\n');
	});
var jxxcarlson$meenylatex$Internal$RenderToString$renderMacro = F4(
	function (latexState, name, optArgs, args) {
		return A4(jxxcarlson$meenylatex$Internal$RenderToString$macroRenderer, name, latexState, optArgs, args);
	});
var jxxcarlson$meenylatex$Internal$RenderToString$renderMacros = F2(
	function (latexState, body) {
		return '\n$$\n' + (A2(jxxcarlson$meenylatex$Internal$RenderToString$render, latexState, body) + '\n$$\n');
	});
var jxxcarlson$meenylatex$Internal$RenderToString$renderOptArgList = F2(
	function (latexState, args) {
		return A2(
			elm$core$String$join,
			'',
			A2(
				elm$core$List$map,
				function (x) {
					return '[' + (x + ']');
				},
				A2(
					elm$core$List$map,
					jxxcarlson$meenylatex$Internal$RenderToString$render(latexState),
					args)));
	});
var jxxcarlson$meenylatex$Internal$RenderToString$renderQuotation = F2(
	function (latexState, body) {
		return A2(
			jxxcarlson$meenylatex$Internal$Html$div,
			_List_fromArray(
				['class=\"quotation\"']),
			_List_fromArray(
				[
					A2(jxxcarlson$meenylatex$Internal$RenderToString$render, latexState, body)
				]));
	});
var jxxcarlson$meenylatex$Internal$RenderToString$renderSMacro = F5(
	function (latexState, name, optArgs, args, le) {
		var _n0 = A2(
			elm$core$Dict$get,
			name,
			jxxcarlson$meenylatex$Internal$RenderToString$cyclic$renderSMacroDict());
		if (_n0.$ === 'Just') {
			var f = _n0.a;
			return A4(f, latexState, optArgs, args, le);
		} else {
			return '<span style=\"color: red;\">\\' + (name + (A2(jxxcarlson$meenylatex$Internal$RenderToString$renderArgList, jxxcarlson$meenylatex$Internal$LatexState$emptyLatexState, args) + (' ' + (A2(jxxcarlson$meenylatex$Internal$RenderToString$render, latexState, le) + '</span>'))));
		}
	});
var jxxcarlson$meenylatex$Internal$RenderToString$renderTheBibliography = F2(
	function (latexState, body) {
		return A2(
			jxxcarlson$meenylatex$Internal$Html$div,
			_List_fromArray(
				['style=\"\"']),
			_List_fromArray(
				[
					A2(jxxcarlson$meenylatex$Internal$RenderToString$render, latexState, body)
				]));
	});
var jxxcarlson$meenylatex$Internal$RenderToString$renderTheoremLikeEnvironment = F4(
	function (latexState, name, args, body) {
		var tno = A2(jxxcarlson$meenylatex$Internal$LatexState$getCounter, 'tno', latexState);
		var s1 = A2(jxxcarlson$meenylatex$Internal$LatexState$getCounter, 's1', latexState);
		var tnoString = (s1 > 0) ? (' ' + (elm$core$String$fromInt(s1) + ('.' + elm$core$String$fromInt(tno)))) : (' ' + elm$core$String$fromInt(tno));
		var r = A2(jxxcarlson$meenylatex$Internal$RenderToString$render, latexState, body);
		var eqno = A2(jxxcarlson$meenylatex$Internal$LatexState$getCounter, 'eqno', latexState);
		return '\n<div class=\"environment\">\n<strong>' + (name + (tnoString + ('</strong>\n<div class=\"italic\">\n' + (r + '\n</div>\n</div>\n'))));
	});
var jxxcarlson$meenylatex$Internal$RenderToString$renderUseForWeb = F2(
	function (latexState, body) {
		return '\n$$\n' + (A2(jxxcarlson$meenylatex$Internal$RenderToString$render, latexState, body) + '\n$$\n');
	});
var jxxcarlson$meenylatex$Internal$RenderToString$renderVerbatim = F2(
	function (latexState, body) {
		var body2 = A3(
			elm$core$String$replace,
			'<',
			'&lt;',
			A3(
				elm$core$String$replace,
				'>',
				'&gt;',
				A2(jxxcarlson$meenylatex$Internal$RenderToString$render, latexState, body)));
		return '\n<pre class=\"verbatim\">' + (body2 + '</pre>\n');
	});
var jxxcarlson$meenylatex$Internal$RenderToString$renderVerse = F2(
	function (latexState, body) {
		return A2(
			jxxcarlson$meenylatex$Internal$Html$div,
			_List_fromArray(
				['class=\"verse\"']),
			_List_fromArray(
				[
					elm$core$String$trim(
					A2(jxxcarlson$meenylatex$Internal$RenderToString$render, latexState, body))
				]));
	});
var jxxcarlson$meenylatex$Internal$RenderToString$reproduceMacro = F4(
	function (name, latexState, optArgs, args) {
		return '<span style=\"color: red;\">\\' + (name + (A2(jxxcarlson$meenylatex$Internal$RenderToString$renderOptArgList, jxxcarlson$meenylatex$Internal$LatexState$emptyLatexState, optArgs) + (A2(jxxcarlson$meenylatex$Internal$RenderToString$renderArgList, jxxcarlson$meenylatex$Internal$LatexState$emptyLatexState, args) + '</span>')));
	});
function jxxcarlson$meenylatex$Internal$RenderToString$cyclic$renderEnvironmentDict() {
	return elm$core$Dict$fromList(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'align',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$Internal$RenderToString$renderAlignEnvironment, x, y);
					})),
				_Utils_Tuple2(
				'center',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$Internal$RenderToString$renderCenterEnvironment, x, y);
					})),
				_Utils_Tuple2(
				'comment',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$Internal$RenderToString$renderCommentEnvironment, x, y);
					})),
				_Utils_Tuple2(
				'indent',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$Internal$RenderToString$renderIndentEnvironment, x, y);
					})),
				_Utils_Tuple2(
				'enumerate',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$Internal$RenderToString$renderEnumerate, x, y);
					})),
				_Utils_Tuple2(
				'eqnarray',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$Internal$RenderToString$renderEqnArray, x, y);
					})),
				_Utils_Tuple2(
				'equation',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$Internal$RenderToString$renderEquationEnvironment, x, y);
					})),
				_Utils_Tuple2(
				'itemize',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$Internal$RenderToString$renderItemize, x, y);
					})),
				_Utils_Tuple2(
				'listing',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$Internal$RenderToString$renderListing, x, y);
					})),
				_Utils_Tuple2(
				'macros',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$Internal$RenderToString$renderMacros, x, y);
					})),
				_Utils_Tuple2(
				'quotation',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$Internal$RenderToString$renderQuotation, x, y);
					})),
				_Utils_Tuple2(
				'tabular',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$Internal$RenderToString$renderTabular, x, y);
					})),
				_Utils_Tuple2(
				'thebibliography',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$Internal$RenderToString$renderTheBibliography, x, y);
					})),
				_Utils_Tuple2(
				'maskforweb',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$Internal$RenderToString$renderCommentEnvironment, x, y);
					})),
				_Utils_Tuple2(
				'useforweb',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$Internal$RenderToString$renderUseForWeb, x, y);
					})),
				_Utils_Tuple2(
				'verbatim',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$Internal$RenderToString$renderVerbatim, x, y);
					})),
				_Utils_Tuple2(
				'verse',
				F3(
					function (x, a, y) {
						return A2(jxxcarlson$meenylatex$Internal$RenderToString$renderVerse, x, y);
					}))
			]));
}
function jxxcarlson$meenylatex$Internal$RenderToString$cyclic$renderMacroDict() {
	return elm$core$Dict$fromList(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'italic',
				F3(
					function (x, y, z) {
						return A2(jxxcarlson$meenylatex$Internal$RenderToString$renderBozo, x, z);
					}))
			]));
}
function jxxcarlson$meenylatex$Internal$RenderToString$cyclic$renderSMacroDict() {
	return elm$core$Dict$fromList(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'bibitem',
				F4(
					function (latexState, optArgs, args, body) {
						return A4(jxxcarlson$meenylatex$Internal$RenderToString$renderBibItem, latexState, optArgs, args, body);
					}))
			]));
}
try {
	var jxxcarlson$meenylatex$Internal$RenderToString$renderEnvironmentDict = jxxcarlson$meenylatex$Internal$RenderToString$cyclic$renderEnvironmentDict();
	jxxcarlson$meenylatex$Internal$RenderToString$cyclic$renderEnvironmentDict = function () {
		return jxxcarlson$meenylatex$Internal$RenderToString$renderEnvironmentDict;
	};
	var jxxcarlson$meenylatex$Internal$RenderToString$renderMacroDict = jxxcarlson$meenylatex$Internal$RenderToString$cyclic$renderMacroDict();
	jxxcarlson$meenylatex$Internal$RenderToString$cyclic$renderMacroDict = function () {
		return jxxcarlson$meenylatex$Internal$RenderToString$renderMacroDict;
	};
	var jxxcarlson$meenylatex$Internal$RenderToString$renderSMacroDict = jxxcarlson$meenylatex$Internal$RenderToString$cyclic$renderSMacroDict();
	jxxcarlson$meenylatex$Internal$RenderToString$cyclic$renderSMacroDict = function () {
		return jxxcarlson$meenylatex$Internal$RenderToString$renderSMacroDict;
	};
} catch ($) {
throw 'Some top-level definitions from `Internal.RenderToString` are causing infinite recursion:\n\n  ┌─────┐\n  │    environmentRenderer\n  │     ↓\n  │    macroRenderer\n  │     ↓\n  │    render\n  │     ↓\n  │    renderAlignEnvironment\n  │     ↓\n  │    renderArg\n  │     ↓\n  │    renderArgList\n  │     ↓\n  │    renderBibItem\n  │     ↓\n  │    renderBozo\n  │     ↓\n  │    renderCenterEnvironment\n  │     ↓\n  │    renderDefaultEnvironment\n  │     ↓\n  │    renderDefaultEnvironment2\n  │     ↓\n  │    renderEnumerate\n  │     ↓\n  │    renderEnvironment\n  │     ↓\n  │    renderEnvironmentDict\n  │     ↓\n  │    renderEqnArray\n  │     ↓\n  │    renderEquationEnvironment\n  │     ↓\n  │    renderIndentEnvironment\n  │     ↓\n  │    renderItem\n  │     ↓\n  │    renderItemize\n  │     ↓\n  │    renderLatexList\n  │     ↓\n  │    renderListing\n  │     ↓\n  │    renderMacro\n  │     ↓\n  │    renderMacroDict\n  │     ↓\n  │    renderMacros\n  │     ↓\n  │    renderOptArgList\n  │     ↓\n  │    renderQuotation\n  │     ↓\n  │    renderSMacro\n  │     ↓\n  │    renderSMacroDict\n  │     ↓\n  │    renderTheBibliography\n  │     ↓\n  │    renderTheoremLikeEnvironment\n  │     ↓\n  │    renderUseForWeb\n  │     ↓\n  │    renderVerbatim\n  │     ↓\n  │    renderVerse\n  │     ↓\n  │    reproduceMacro\n  └─────┘\n\nThese errors are very tricky, so read https://elm-lang.org/0.19.0/halting-problem to learn how to fix it!';}
var jxxcarlson$meenylatex$Internal$Macro$renderArg = F2(
	function (k, macro) {
		if (macro.$ === 'Macro') {
			var name = macro.a;
			var optArgs = macro.b;
			var args = macro.c;
			return A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, k - 1, jxxcarlson$meenylatex$Internal$LatexState$emptyLatexState, args);
		} else {
			return '';
		}
	});
var jxxcarlson$meenylatex$Internal$Macro$substituteOne = F3(
	function (k, macro, str) {
		var hashK = '#' + elm$core$String$fromInt(k);
		var arg = A2(jxxcarlson$meenylatex$Internal$Macro$renderArg, k, macro);
		return A3(elm$core$String$replace, hashK, arg, str);
	});
var jxxcarlson$meenylatex$Internal$Macro$substituteMany = F3(
	function (k, macro, str) {
		substituteMany:
		while (true) {
			if (!k) {
				return str;
			} else {
				var $temp$k = k - 1,
					$temp$macro = macro,
					$temp$str = A3(jxxcarlson$meenylatex$Internal$Macro$substituteOne, k, macro, str);
				k = $temp$k;
				macro = $temp$macro;
				str = $temp$str;
				continue substituteMany;
			}
		}
	});
var jxxcarlson$meenylatex$Internal$Macro$substitute = F2(
	function (macro, str) {
		return A3(
			jxxcarlson$meenylatex$Internal$Macro$substituteMany,
			jxxcarlson$meenylatex$Internal$Macro$nArgs(macro),
			macro,
			str);
	});
var jxxcarlson$meenylatex$Internal$Macro$expandMacro_ = F2(
	function (macro, macroDef) {
		switch (macroDef.$) {
			case 'Comment':
				var str = macroDef.a;
				return jxxcarlson$meenylatex$Internal$Parser$Comment(str);
			case 'Macro':
				var name = macroDef.a;
				var optArgs = macroDef.b;
				var args = macroDef.c;
				return A3(
					jxxcarlson$meenylatex$Internal$Parser$Macro,
					name,
					optArgs,
					A2(
						elm$core$List$map,
						jxxcarlson$meenylatex$Internal$Macro$expandMacro_(macro),
						args));
			case 'SMacro':
				var name = macroDef.a;
				var optArgs = macroDef.b;
				var args = macroDef.c;
				var le = macroDef.d;
				return A4(
					jxxcarlson$meenylatex$Internal$Parser$SMacro,
					name,
					optArgs,
					A2(
						elm$core$List$map,
						jxxcarlson$meenylatex$Internal$Macro$expandMacro_(macro),
						args),
					A2(jxxcarlson$meenylatex$Internal$Macro$expandMacro_, macro, le));
			case 'Item':
				var level = macroDef.a;
				var latexExpr = macroDef.b;
				return A2(
					jxxcarlson$meenylatex$Internal$Parser$Item,
					level,
					A2(jxxcarlson$meenylatex$Internal$Macro$expandMacro_, macro, latexExpr));
			case 'InlineMath':
				var str = macroDef.a;
				return jxxcarlson$meenylatex$Internal$Parser$InlineMath(str);
			case 'DisplayMath':
				var str = macroDef.a;
				return jxxcarlson$meenylatex$Internal$Parser$DisplayMath(str);
			case 'Environment':
				var name = macroDef.a;
				var args = macroDef.b;
				var body = macroDef.c;
				return A3(
					jxxcarlson$meenylatex$Internal$Parser$Environment,
					name,
					args,
					A2(jxxcarlson$meenylatex$Internal$Macro$expandMacro_, macro, body));
			case 'LatexList':
				var latexList = macroDef.a;
				return jxxcarlson$meenylatex$Internal$Parser$LatexList(
					A2(
						elm$core$List$map,
						jxxcarlson$meenylatex$Internal$Macro$expandMacro_(macro),
						latexList));
			case 'LXString':
				var str = macroDef.a;
				return jxxcarlson$meenylatex$Internal$Parser$LXString(
					A2(jxxcarlson$meenylatex$Internal$Macro$substitute, macro, str));
			case 'NewCommand':
				var commandName = macroDef.a;
				var numberOfArgs = macroDef.b;
				var commandBody = macroDef.c;
				return A3(
					jxxcarlson$meenylatex$Internal$Parser$NewCommand,
					commandName,
					numberOfArgs,
					A2(jxxcarlson$meenylatex$Internal$Macro$expandMacro_, macro, commandBody));
			default:
				var error = macroDef.a;
				return jxxcarlson$meenylatex$Internal$Parser$LXError(error);
		}
	});
var jxxcarlson$meenylatex$Internal$Macro$expandMacro = F2(
	function (macro, macroDef) {
		var _n0 = A2(jxxcarlson$meenylatex$Internal$Macro$expandMacro_, macro, macroDef);
		if (_n0.$ === 'NewCommand') {
			var latexList = _n0.c;
			return latexList;
		} else {
			return jxxcarlson$meenylatex$Internal$Parser$LXString('error');
		}
	});
var elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var jxxcarlson$meenylatex$Internal$MathMacro$enclose = function (arg_) {
	return '{' + (arg_ + '}');
};
var jxxcarlson$meenylatex$Internal$MathMacro$evalNewCommand = F3(
	function (name, nargs, args) {
		return '\\newcommand{\\' + (name + ('}[' + (nargs + (']' + A2(
			elm$core$String$join,
			'',
			A2(
				elm$core$List$map,
				A2(elm$core$Basics$composeR, jxxcarlson$meenylatex$Internal$MathMacro$toText_, jxxcarlson$meenylatex$Internal$MathMacro$enclose),
				args))))));
	});
var jxxcarlson$meenylatex$Internal$MathMacro$toText_ = function (expr) {
	switch (expr.$) {
		case 'MathText':
			var str = expr.a;
			return str;
		case 'Macro':
			var name = expr.a;
			var args = expr.b;
			return '\\' + (name + A2(
				elm$core$String$join,
				'',
				A2(
					elm$core$List$map,
					A2(elm$core$Basics$composeR, jxxcarlson$meenylatex$Internal$MathMacro$toText_, jxxcarlson$meenylatex$Internal$MathMacro$enclose),
					args)));
		case 'MathList':
			var list = expr.a;
			return A2(
				elm$core$String$join,
				' ',
				A2(elm$core$List$map, jxxcarlson$meenylatex$Internal$MathMacro$toText_, list));
		default:
			var name = expr.a;
			var nargs = expr.b;
			var args = expr.c;
			return A3(jxxcarlson$meenylatex$Internal$MathMacro$evalNewCommand, name, nargs, args);
	}
};
var elm_community$list_extra$List$Extra$getAt = F2(
	function (idx, xs) {
		return (idx < 0) ? elm$core$Maybe$Nothing : elm$core$List$head(
			A2(elm$core$List$drop, idx, xs));
	});
var jxxcarlson$meenylatex$Internal$MathMacro$getArg = F2(
	function (k, list) {
		return A2(
			elm$core$Maybe$withDefault,
			'',
			A2(elm_community$list_extra$List$Extra$getAt, k, list));
	});
var jxxcarlson$meenylatex$Internal$MathMacro$replaceArg = F2(
	function (k, f) {
		return function (list) {
			return A3(
				elm$core$String$replace,
				'#' + elm$core$String$fromInt(k + 1),
				A2(jxxcarlson$meenylatex$Internal$MathMacro$getArg, k, list),
				f(list));
		};
	});
var jxxcarlson$meenylatex$Internal$MathMacro$replaceArgs = F2(
	function (n, f) {
		return A3(
			elm$core$List$foldl,
			jxxcarlson$meenylatex$Internal$MathMacro$replaceArg,
			f,
			A2(elm$core$List$range, 0, n - 1));
	});
var jxxcarlson$meenylatex$Internal$MathMacro$transform = F2(
	function (n, args) {
		return A2(
			jxxcarlson$meenylatex$Internal$MathMacro$replaceArgs,
			n,
			function (str) {
				return function (list) {
					return str;
				};
			}(
				A2(
					elm$core$Maybe$withDefault,
					'XXX',
					elm$core$List$head(
						A2(elm$core$List$map, jxxcarlson$meenylatex$Internal$MathMacro$toText_, args)))));
	});
var jxxcarlson$meenylatex$Internal$MathMacro$evalList = F2(
	function (macroDict_, list) {
		return A2(
			elm$core$String$join,
			' ',
			A2(
				elm$core$List$map,
				jxxcarlson$meenylatex$Internal$MathMacro$evalMathExpr(macroDict_),
				list));
	});
var jxxcarlson$meenylatex$Internal$MathMacro$evalMacro = F3(
	function (macroDict_, name, args) {
		var _n1 = A2(elm$core$Dict$get, name, macroDict_);
		if (_n1.$ === 'Nothing') {
			return '\\' + (name + A2(
				elm$core$String$join,
				'',
				A2(
					elm$core$List$map,
					A2(
						elm$core$Basics$composeR,
						jxxcarlson$meenylatex$Internal$MathMacro$evalMathExpr(macroDict_),
						jxxcarlson$meenylatex$Internal$MathMacro$enclose),
					args)));
		} else {
			var _n2 = _n1.a;
			var n = _n2.a;
			var body = _n2.b;
			return A3(
				jxxcarlson$meenylatex$Internal$MathMacro$transform,
				n,
				body,
				A2(
					elm$core$List$map,
					jxxcarlson$meenylatex$Internal$MathMacro$evalMathExpr(macroDict_),
					args));
		}
	});
var jxxcarlson$meenylatex$Internal$MathMacro$evalMathExpr = F2(
	function (macroDict_, expr) {
		switch (expr.$) {
			case 'MathText':
				var str = expr.a;
				return str;
			case 'Macro':
				var name = expr.a;
				var args = expr.b;
				return A3(jxxcarlson$meenylatex$Internal$MathMacro$evalMacro, macroDict_, name, args);
			case 'NewCommand':
				var name = expr.a;
				var nargs = expr.b;
				var args = expr.c;
				return A3(jxxcarlson$meenylatex$Internal$MathMacro$evalNewCommand, name, nargs, args);
			default:
				var list = expr.a;
				return A2(jxxcarlson$meenylatex$Internal$MathMacro$evalList, macroDict_, list);
		}
	});
var elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3(elm$core$List$foldr, elm$core$List$cons, ys, xs);
		}
	});
var elm$core$List$concat = function (lists) {
	return A3(elm$core$List$foldr, elm$core$List$append, _List_Nil, lists);
};
var elm$core$Result$map = F2(
	function (func, ra) {
		if (ra.$ === 'Ok') {
			var a = ra.a;
			return elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return elm$core$Result$Err(e);
		}
	});
var elm$core$Result$map2 = F3(
	function (func, ra, rb) {
		if (ra.$ === 'Err') {
			var x = ra.a;
			return elm$core$Result$Err(x);
		} else {
			var a = ra.a;
			if (rb.$ === 'Err') {
				var x = rb.a;
				return elm$core$Result$Err(x);
			} else {
				var b = rb.a;
				return elm$core$Result$Ok(
					A2(func, a, b));
			}
		}
	});
var elm_community$result_extra$Result$Extra$combine = A2(
	elm$core$List$foldr,
	elm$core$Result$map2(elm$core$List$cons),
	elm$core$Result$Ok(_List_Nil));
var jxxcarlson$meenylatex$Internal$MathMacro$parseMany = function (str) {
	return A2(
		elm$core$Result$map,
		elm$core$List$concat,
		elm_community$result_extra$Result$Extra$combine(
			A2(
				elm$core$List$map,
				jxxcarlson$meenylatex$Internal$MathMacro$parse,
				A2(
					elm$core$List$map,
					elm$core$String$trim,
					elm$core$String$lines(
						elm$core$String$trim(str))))));
};
var jxxcarlson$meenylatex$Internal$MathMacro$evalStr = F2(
	function (macroDict_, str) {
		var _n0 = jxxcarlson$meenylatex$Internal$MathMacro$parseMany(
			elm$core$String$trim(str));
		if (_n0.$ === 'Ok') {
			var result = _n0.a;
			return A2(jxxcarlson$meenylatex$Internal$MathMacro$evalList, macroDict_, result);
		} else {
			return str;
		}
	});
var jxxcarlson$meenylatex$Internal$Render$DisplayMathMode = {$: 'DisplayMathMode'};
var elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var elm$html$Html$node = elm$virtual_dom$VirtualDom$node;
var elm$virtual_dom$VirtualDom$property = F2(
	function (key, value) {
		return A2(
			_VirtualDom_property,
			_VirtualDom_noInnerHtmlOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var elm$html$Html$Attributes$property = elm$virtual_dom$VirtualDom$property;
var elm$json$Json$Encode$bool = _Json_wrap;
var jxxcarlson$meenylatex$Internal$Render$isDisplayMathMode = function (displayMode) {
	if (displayMode.$ === 'InlineMathMode') {
		return false;
	} else {
		return true;
	}
};
var jxxcarlson$meenylatex$Internal$Render$mathText = F2(
	function (displayMode, content) {
		return A3(
			elm$html$Html$node,
			'math-text',
			_List_fromArray(
				[
					A2(
					elm$html$Html$Attributes$property,
					'delay',
					elm$json$Json$Encode$bool(false)),
					A2(
					elm$html$Html$Attributes$property,
					'display',
					elm$json$Json$Encode$bool(
						jxxcarlson$meenylatex$Internal$Render$isDisplayMathMode(displayMode))),
					A2(
					elm$html$Html$Attributes$property,
					'content',
					elm$json$Json$Encode$string(
						A3(elm$core$String$replace, '\\ \\', '\\\\', content)))
				]),
			_List_Nil);
	});
var jxxcarlson$meenylatex$Internal$Render$displayMathText = F2(
	function (latexState, str_) {
		var str = A2(jxxcarlson$meenylatex$Internal$MathMacro$evalStr, latexState.mathMacroDictionary, str_);
		return A2(
			jxxcarlson$meenylatex$Internal$Render$mathText,
			jxxcarlson$meenylatex$Internal$Render$DisplayMathMode,
			elm$core$String$trim(str));
	});
var jxxcarlson$meenylatex$Internal$Render$enclose = function (msg) {
	return A2(
		elm$html$Html$span,
		_List_Nil,
		_List_fromArray(
			[
				elm$html$Html$text('{'),
				msg,
				elm$html$Html$text('}')
			]));
};
var jxxcarlson$meenylatex$Internal$Render$getElement = F2(
	function (k, list) {
		return A2(
			elm$core$Maybe$withDefault,
			jxxcarlson$meenylatex$Internal$Parser$LXString('xxx'),
			A2(jxxcarlson$meenylatex$Internal$Utility$getAt, k, list));
	});
var elm$core$String$fromFloat = _String_fromNumber;
var jxxcarlson$meenylatex$Internal$Render$headingStyle = F2(
	function (ref, h) {
		return _List_fromArray(
			[
				elm$html$Html$Attributes$id(ref),
				A2(
				elm$html$Html$Attributes$style,
				'margin-top',
				elm$core$String$fromFloat(h) + 'px'),
				A2(
				elm$html$Html$Attributes$style,
				'margin-bottom',
				elm$core$String$fromFloat(0.0 * h) + 'px')
			]);
	});
var elm$core$String$toLower = _String_toLower;
var elm$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {index: index, match: match, number: number, submatches: submatches};
	});
var elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var elm$regex$Regex$fromString = function (string) {
	return A2(
		elm$regex$Regex$fromStringWith,
		{caseInsensitive: false, multiline: false},
		string);
};
var elm$regex$Regex$replace = _Regex_replaceAtMost(_Regex_infinity);
var jxxcarlson$meenylatex$Internal$Render$userReplace = F3(
	function (userRegex, replacer, string) {
		var _n0 = elm$regex$Regex$fromString(userRegex);
		if (_n0.$ === 'Nothing') {
			return string;
		} else {
			var regex = _n0.a;
			return A3(elm$regex$Regex$replace, regex, replacer, string);
		}
	});
var jxxcarlson$meenylatex$Internal$Render$compress = F2(
	function (replaceBlank, str) {
		return A3(
			jxxcarlson$meenylatex$Internal$Render$userReplace,
			'[,;.!?&_]',
			function (_n0) {
				return '';
			},
			A3(
				elm$core$String$replace,
				' ',
				replaceBlank,
				elm$core$String$toLower(str)));
	});
var jxxcarlson$meenylatex$Internal$Render$makeId = F2(
	function (prefix, name) {
		return A2(
			elm$core$String$join,
			'_',
			_List_fromArray(
				[
					'',
					prefix,
					A2(jxxcarlson$meenylatex$Internal$Render$compress, '_', name)
				]));
	});
var jxxcarlson$meenylatex$Internal$Render$idPhrase = F2(
	function (prefix, name) {
		var compressedName = A3(
			elm$core$String$replace,
			' ',
			'_',
			elm$core$String$toLower(name));
		return A2(jxxcarlson$meenylatex$Internal$Render$makeId, prefix, name);
	});
var jxxcarlson$meenylatex$Internal$Render$InlineMathMode = {$: 'InlineMathMode'};
var jxxcarlson$meenylatex$Internal$Render$inlineMathText = F2(
	function (latexState, str_) {
		var str = A2(jxxcarlson$meenylatex$Internal$MathMacro$evalStr, latexState.mathMacroDictionary, str_);
		return A2(
			jxxcarlson$meenylatex$Internal$Render$mathText,
			jxxcarlson$meenylatex$Internal$Render$InlineMathMode,
			elm$core$String$trim(str));
	});
var jxxcarlson$meenylatex$Internal$Render$oneSpace = elm$html$Html$text(' ');
var jxxcarlson$meenylatex$Internal$Render$renderAttachNote = F3(
	function (_n0, latexState, args) {
		var content = A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 1, latexState, args);
		var author = A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 0, latexState, args);
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					A2(elm$html$Html$Attributes$style, 'display', 'flex'),
					A2(elm$html$Html$Attributes$style, 'flex-direction', 'column')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							A2(elm$html$Html$Attributes$style, 'color', 'blue')
						]),
					_List_fromArray(
						[
							elm$html$Html$text(author)
						])),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							A2(elm$html$Html$Attributes$style, 'background-color', 'yellow')
						]),
					_List_fromArray(
						[
							elm$html$Html$text(content)
						]))
				]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderAuthor = F3(
	function (_n0, latexState, args) {
		return A2(elm$html$Html$span, _List_Nil, _List_Nil);
	});
var jxxcarlson$meenylatex$Internal$Render$renderBegin = F3(
	function (_n0, latexState, args) {
		return A2(
			elm$html$Html$span,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('\\begin')
				]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderBigSkip = F3(
	function (_n0, latexState, args) {
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					A2(elm$html$Html$Attributes$style, 'height', '40px')
				]),
			_List_Nil);
	});
var jxxcarlson$meenylatex$Internal$Render$renderBlue = F3(
	function (_n0, latexState, args) {
		var arg = A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 0, latexState, args);
		return A2(
			elm$html$Html$span,
			_List_fromArray(
				[
					A2(elm$html$Html$Attributes$style, 'color', 'blue')
				]),
			_List_fromArray(
				[
					elm$html$Html$text(arg)
				]));
	});
var elm$html$Html$a = _VirtualDom_node('a');
var elm$html$Html$Attributes$href = function (url) {
	return A2(
		elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var jxxcarlson$meenylatex$Internal$LatexState$getDictionaryItem = F2(
	function (key, latexState) {
		var _n0 = A2(elm$core$Dict$get, key, latexState.dictionary);
		if (_n0.$ === 'Just') {
			var value = _n0.a;
			return value;
		} else {
			return '';
		}
	});
var jxxcarlson$meenylatex$Internal$Render$renderCite = F3(
	function (_n0, latexState, args) {
		var label_ = A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 0, latexState, args);
		var ref = A2(jxxcarlson$meenylatex$Internal$LatexState$getDictionaryItem, 'bibitem:' + label_, latexState);
		var label = (ref !== '') ? ref : label_;
		return A2(
			elm$html$Html$strong,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text('[')
						])),
					A2(
					elm$html$Html$a,
					_List_fromArray(
						[
							elm$html$Html$Attributes$href('#bibitem:' + label)
						]),
					_List_fromArray(
						[
							elm$html$Html$text(label)
						])),
					A2(
					elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text('] ')
						]))
				]));
	});
var elm$core$Result$withDefault = F2(
	function (def, result) {
		if (result.$ === 'Ok') {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var elm$html$Html$pre = _VirtualDom_node('pre');
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$HCode = function (a) {
	return {$: 'HCode', a: a};
};
var elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {col: col, problem: problem, row: row};
	});
var elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3(elm$parser$Parser$DeadEnd, p.row, p.col, p.problem);
};
var elm$parser$Parser$run = F2(
	function (parser, source) {
		var _n0 = A2(elm$parser$Parser$Advanced$run, parser, source);
		if (_n0.$ === 'Ok') {
			var a = _n0.a;
			return elm$core$Result$Ok(a);
		} else {
			var problems = _n0.a;
			return elm$core$Result$Err(
				A2(elm$core$List$map, elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style3 = {$: 'Style3'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style4 = {$: 'Style4'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style5 = {$: 'Style5'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$atRuleToFragment = function (a) {
	switch (a.$) {
		case 'Identifier':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style3, 'css-ar-i');
		case 'Prefix':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style5, 'css-ar-p');
		case 'Keyword':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style3, 'css-ar-k');
		default:
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style4, 'css-ar-v');
	}
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style2 = {$: 'Style2'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$attributeSelectorToFragment = function (att) {
	switch (att.$) {
		case 'AttributeName':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style5, 'css-s-a-an');
		case 'AttributeValue':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style2, 'css-s-a-av');
		default:
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style3, 'css-s-a-o');
	}
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Default = {$: 'Default'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style7 = {$: 'Style7'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$selectorToFragment = function (s) {
	switch (s.$) {
		case 'Element':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style3, 'css-s-e');
		case 'Id':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style5, 'css-s-i');
		case 'Class':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style5, 'css-s-cl');
		case 'Combinator':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style7, 'css-s-c');
		case 'Universal':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style3, 'css-s-u');
		case 'AttributeSelector':
			var att = s.a;
			return pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$attributeSelectorToFragment(att);
		case 'PseudoElement':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Default, 'css-s-pe');
		default:
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Default, 'css-s-pc');
	}
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style1 = {$: 'Style1'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$syntaxToStyle = function (syntax) {
	switch (syntax.$) {
		case 'String':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style2, 'css-s');
		case 'AtRule':
			var a = syntax.a;
			return pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$atRuleToFragment(a);
		case 'Selector':
			var s = syntax.a;
			return pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$selectorToFragment(s);
		case 'Property':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style4, 'css-p');
		case 'PropertyValue':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style4, 'css-pv');
		case 'Number':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style1, 'css-n');
		default:
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style3, 'css-u');
	}
};
var elm$parser$Parser$map = elm$parser$Parser$Advanced$map;
var elm$parser$Parser$toAdvancedStep = function (step) {
	if (step.$ === 'Loop') {
		var s = step.a;
		return elm$parser$Parser$Advanced$Loop(s);
	} else {
		var a = step.a;
		return elm$parser$Parser$Advanced$Done(a);
	}
};
var elm$parser$Parser$loop = F2(
	function (state, callback) {
		return A2(
			elm$parser$Parser$Advanced$loop,
			state,
			function (s) {
				return A2(
					elm$parser$Parser$map,
					elm$parser$Parser$toAdvancedStep,
					callback(s));
			});
	});
var elm$parser$Parser$Done = function (a) {
	return {$: 'Done', a: a};
};
var elm$parser$Parser$Loop = function (a) {
	return {$: 'Loop', a: a};
};
var elm$parser$Parser$UnexpectedChar = {$: 'UnexpectedChar'};
var elm$parser$Parser$chompIf = function (isGood) {
	return A2(elm$parser$Parser$Advanced$chompIf, isGood, elm$parser$Parser$UnexpectedChar);
};
var elm$parser$Parser$getChompedString = elm$parser$Parser$Advanced$getChompedString;
var elm$parser$Parser$oneOf = elm$parser$Parser$Advanced$oneOf;
var elm$parser$Parser$succeed = elm$parser$Parser$Advanced$succeed;
var elm$parser$Parser$andThen = elm$parser$Parser$Advanced$andThen;
var elm$parser$Parser$ExpectingSymbol = function (a) {
	return {$: 'ExpectingSymbol', a: a};
};
var elm$parser$Parser$symbol = function (str) {
	return elm$parser$Parser$Advanced$symbol(
		A2(
			elm$parser$Parser$Advanced$Token,
			str,
			elm$parser$Parser$ExpectingSymbol(str)));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$AtRule = function (a) {
	return {$: 'AtRule', a: a};
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$Identifier = {$: 'Identifier'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$Prefix = {$: 'Prefix'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$String = {$: 'String'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$AtRuleValue = {$: 'AtRuleValue'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$Keyword = {$: 'Keyword'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$atRuleKeywordSet = elm$core$Set$fromList(
	_List_fromArray(
		['and', 'or', 'not', 'only']));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$isAtRuleKeyword = function (n) {
	return A2(elm$core$Set$member, n, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$atRuleKeywordSet);
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$isCommentChar = function (c) {
	return _Utils_eq(
		c,
		_Utils_chr('/'));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$selectorNameInvalidCharSet = elm$core$Set$fromList(
	_List_fromArray(
		[
			_Utils_chr(':'),
			_Utils_chr('{'),
			_Utils_chr('}'),
			_Utils_chr(','),
			_Utils_chr('.'),
			_Utils_chr('#'),
			_Utils_chr('>'),
			_Utils_chr('+'),
			_Utils_chr('~'),
			_Utils_chr('*'),
			_Utils_chr('['),
			_Utils_chr(']'),
			_Utils_chr('|'),
			_Utils_chr(';'),
			_Utils_chr('('),
			_Utils_chr(')')
		]));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isLineBreak = function (c) {
	return _Utils_eq(
		c,
		_Utils_chr('\n'));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isSpace = function (c) {
	return _Utils_eq(
		c,
		_Utils_chr(' ')) || _Utils_eq(
		c,
		_Utils_chr('\t'));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isWhitespace = function (c) {
	return pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isSpace(c) || pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isLineBreak(c);
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$isSelectorNameChar = function (c) {
	return !(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isWhitespace(c) || (pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$isCommentChar(c) || A2(elm$core$Set$member, c, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$selectorNameInvalidCharSet)));
};
var elm$parser$Parser$chompWhile = elm$parser$Parser$Advanced$chompWhile;
var elm$parser$Parser$ignorer = elm$parser$Parser$Advanced$ignorer;
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile = function (isNotRelevant) {
	return A2(
		elm$parser$Parser$ignorer,
		A2(
			elm$parser$Parser$ignorer,
			elm$parser$Parser$succeed(_Utils_Tuple0),
			elm$parser$Parser$chompIf(isNotRelevant)),
		elm$parser$Parser$chompWhile(isNotRelevant));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C = function (a) {
	return {$: 'C', a: a};
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$atRuleKeywordOrValue = function (revTokens) {
	return A2(
		elm$parser$Parser$map,
		function (n) {
			return pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$isAtRuleKeyword(n) ? A2(
				elm$core$List$cons,
				_Utils_Tuple2(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(
						pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$AtRule(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$Keyword)),
					n),
				revTokens) : A2(
				elm$core$List$cons,
				_Utils_Tuple2(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(
						pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$AtRule(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$AtRuleValue)),
					n),
				revTokens);
		},
		elm$parser$Parser$getChompedString(
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$isSelectorNameChar)));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$atRuleSet = elm$core$Set$fromList(
	_List_fromArray(
		['@page', '@font-face', '@swash', '@annotation', '@ornaments', '@stylistic', '@styleset', '@character-variant']));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$LineBreak = {$: 'LineBreak'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$lineBreak = A2(
	elm$parser$Parser$map,
	function (_n0) {
		return _List_fromArray(
			[
				_Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$LineBreak, '\n')
			]);
	},
	elm$parser$Parser$symbol('\n'));
var elm$parser$Parser$Problem = function (a) {
	return {$: 'Problem', a: a};
};
var elm$parser$Parser$Advanced$problem = function (x) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			return A2(
				elm$parser$Parser$Advanced$Bad,
				false,
				A2(elm$parser$Parser$Advanced$fromState, s, x));
		});
};
var elm$parser$Parser$problem = function (msg) {
	return elm$parser$Parser$Advanced$problem(
		elm$parser$Parser$Problem(msg));
};
var elm$parser$Parser$ExpectingEnd = {$: 'ExpectingEnd'};
var elm$parser$Parser$Advanced$end = function (x) {
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			return _Utils_eq(
				elm$core$String$length(s.src),
				s.offset) ? A3(elm$parser$Parser$Advanced$Good, false, _Utils_Tuple0, s) : A2(
				elm$parser$Parser$Advanced$Bad,
				false,
				A2(elm$parser$Parser$Advanced$fromState, s, x));
		});
};
var elm$parser$Parser$end = elm$parser$Parser$Advanced$end(elm$parser$Parser$ExpectingEnd);
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$addThen = F3(
	function (f, list, plist) {
		return A2(
			elm$parser$Parser$andThen,
			function (n) {
				return f(
					_Utils_ap(n, list));
			},
			plist);
	});
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$consThen = F3(
	function (f, list, pn) {
		return A2(
			elm$parser$Parser$andThen,
			function (n) {
				return f(
					A2(elm$core$List$cons, n, list));
			},
			pn);
	});
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$thenChompWhile = F2(
	function (isNotRelevant, previousParser) {
		return A2(
			elm$parser$Parser$ignorer,
			previousParser,
			elm$parser$Parser$chompWhile(isNotRelevant));
	});
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimitedUnnestable = F2(
	function (options, revAList) {
		var defaultMap = options.defaultMap;
		var isNotRelevant = options.isNotRelevant;
		var end = options.end;
		var innerParsers = options.innerParsers;
		return elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					elm$parser$Parser$map,
					elm$core$Basics$always(
						A2(
							elm$core$List$cons,
							defaultMap(end),
							revAList)),
					elm$parser$Parser$symbol(end)),
					A2(
					elm$parser$Parser$map,
					elm$core$Basics$always(revAList),
					elm$parser$Parser$end),
					A3(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$addThen,
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimitedUnnestable(options),
					revAList,
					elm$parser$Parser$oneOf(innerParsers)),
					A3(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$consThen,
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimitedUnnestable(options),
					revAList,
					A2(
						elm$parser$Parser$map,
						defaultMap,
						elm$parser$Parser$getChompedString(
							A2(
								pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$thenChompWhile,
								isNotRelevant,
								elm$parser$Parser$chompIf(
									elm$core$Basics$always(true))))))
				]));
	});
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimitedNestable = F3(
	function (nestLevel, options, revAList) {
		var defaultMap = options.defaultMap;
		var isNotRelevant = options.isNotRelevant;
		var start = options.start;
		var end = options.end;
		var innerParsers = options.innerParsers;
		return elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					A2(
					elm$parser$Parser$andThen,
					function (n) {
						return (nestLevel === 1) ? elm$parser$Parser$succeed(n) : A3(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimitedNestable, nestLevel - 1, options, n);
					},
					A2(
						elm$parser$Parser$map,
						elm$core$Basics$always(
							A2(
								elm$core$List$cons,
								defaultMap(end),
								revAList)),
						elm$parser$Parser$symbol(end))),
					A3(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$consThen,
					A2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimitedNestable, nestLevel + 1, options),
					revAList,
					A2(
						elm$parser$Parser$map,
						defaultMap,
						elm$parser$Parser$getChompedString(
							A2(
								pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$thenChompWhile,
								isNotRelevant,
								elm$parser$Parser$symbol(start))))),
					A3(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$addThen,
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimitedUnnestable(options),
					revAList,
					elm$parser$Parser$oneOf(innerParsers)),
					A2(
					elm$parser$Parser$map,
					elm$core$Basics$always(revAList),
					elm$parser$Parser$end),
					A3(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$consThen,
					A2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimitedNestable, nestLevel, options),
					revAList,
					A2(
						elm$parser$Parser$map,
						defaultMap,
						elm$parser$Parser$getChompedString(
							A2(
								pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$thenChompWhile,
								isNotRelevant,
								elm$parser$Parser$chompIf(
									elm$core$Basics$always(true))))))
				]));
	});
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimitedHelp = F2(
	function (options, revAList) {
		var start = options.start;
		var end = options.end;
		var isNotRelevant = options.isNotRelevant;
		var _n0 = _Utils_Tuple2(
			elm$core$String$uncons(options.start),
			elm$core$String$uncons(options.end));
		if (_n0.a.$ === 'Nothing') {
			var _n1 = _n0.a;
			return elm$parser$Parser$problem('Trying to parse a delimited helper, but the start token cannot be an empty string!');
		} else {
			if (_n0.b.$ === 'Nothing') {
				var _n2 = _n0.b;
				return elm$parser$Parser$problem('Trying to parse a delimited helper, but the end token cannot be an empty string!');
			} else {
				var _n3 = _n0.a.a;
				var startChar = _n3.a;
				var _n4 = _n0.b.a;
				var endChar = _n4.a;
				return options.isNestable ? A3(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimitedNestable,
					1,
					_Utils_update(
						options,
						{
							isNotRelevant: function (c) {
								return isNotRelevant(c) && ((!_Utils_eq(c, startChar)) && (!_Utils_eq(c, endChar)));
							}
						}),
					revAList) : A2(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimitedUnnestable,
					_Utils_update(
						options,
						{
							isNotRelevant: function (c) {
								return isNotRelevant(c) && (!_Utils_eq(c, endChar));
							}
						}),
					revAList);
			}
		}
	});
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimited = function (options) {
	var start = options.start;
	var isNotRelevant = options.isNotRelevant;
	var defaultMap = options.defaultMap;
	return A2(
		elm$parser$Parser$andThen,
		function (n) {
			return A2(
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimitedHelp,
				options,
				_List_fromArray(
					[n]));
		},
		A2(
			elm$parser$Parser$map,
			elm$core$Basics$always(
				defaultMap(start)),
			elm$parser$Parser$symbol(start)));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Comment = {$: 'Comment'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$comment = pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimited(
	{
		defaultMap: function (b) {
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Comment, b);
		},
		end: '*/',
		innerParsers: _List_fromArray(
			[pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$lineBreak]),
		isNestable: false,
		isNotRelevant: function (c) {
			return !pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isLineBreak(c);
		},
		start: '/*'
	});
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal = {$: 'Normal'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$whitespaceOrCommentStep = function (revTokens) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				elm$parser$Parser$map,
				function (b) {
					return elm$parser$Parser$Loop(
						A2(
							elm$core$List$cons,
							_Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, b),
							revTokens));
				},
				elm$parser$Parser$getChompedString(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isSpace))),
				A2(
				elm$parser$Parser$map,
				function (ns) {
					return elm$parser$Parser$Loop(
						_Utils_ap(ns, revTokens));
				},
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$lineBreak),
				A2(
				elm$parser$Parser$map,
				function (ns) {
					return elm$parser$Parser$Loop(
						_Utils_ap(ns, revTokens));
				},
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$comment)
			]));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$keyframesOrCounterStyle = function (a) {
	return A2(
		elm$parser$Parser$loop,
		_List_fromArray(
			[
				_Utils_Tuple2(
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$AtRule(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$Identifier)),
				a)
			]),
		function (ns) {
			return elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$whitespaceOrCommentStep(ns),
						A2(
						elm$parser$Parser$map,
						function (b) {
							return elm$parser$Parser$Loop(
								A2(
									elm$core$List$cons,
									_Utils_Tuple2(
										pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(
											pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$AtRule(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$Prefix)),
										b),
									ns));
						},
						elm$parser$Parser$getChompedString(
							pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$isSelectorNameChar))),
						A2(
						elm$parser$Parser$map,
						function (b) {
							return elm$parser$Parser$Loop(
								A2(
									elm$core$List$cons,
									_Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, b),
									ns));
						},
						elm$parser$Parser$getChompedString(
							elm$parser$Parser$chompIf(
								function (c) {
									return !_Utils_eq(
										c,
										_Utils_chr('{'));
								}))),
						elm$parser$Parser$succeed(
						elm$parser$Parser$Done(ns))
					]));
		});
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$nestableAtRuleOpener = function (ns) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				elm$parser$Parser$map,
				elm$core$Basics$always(
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, '{'),
						ns)),
				elm$parser$Parser$symbol('{')),
				elm$parser$Parser$succeed(ns)
			]));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$Number = {$: 'Number'};
var elm$parser$Parser$backtrackable = elm$parser$Parser$Advanced$backtrackable;
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$escapableSet = elm$core$Set$fromList(
	_List_fromArray(
		[
			_Utils_chr('\''),
			_Utils_chr('\"'),
			_Utils_chr('\\'),
			_Utils_chr('n'),
			_Utils_chr('r'),
			_Utils_chr('t'),
			_Utils_chr('b'),
			_Utils_chr('f'),
			_Utils_chr('v')
		]));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isEscapableChar = function (c) {
	return A2(elm$core$Set$member, c, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$escapableSet);
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$escapable = A2(
	elm$parser$Parser$ignorer,
	A2(
		elm$parser$Parser$ignorer,
		elm$parser$Parser$succeed(_Utils_Tuple0),
		elm$parser$Parser$backtrackable(
			elm$parser$Parser$symbol('\\'))),
	elm$parser$Parser$chompIf(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isEscapableChar));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$cssEscapable = A2(
	elm$parser$Parser$map,
	function (b) {
		return _List_fromArray(
			[
				_Utils_Tuple2(
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$Number),
				b)
			]);
	},
	elm$parser$Parser$getChompedString(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$escapable));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isEscapable = function (c) {
	return _Utils_eq(
		c,
		_Utils_chr('\\'));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$quoteDelimiter = {
	defaultMap: function (b) {
		return _Utils_Tuple2(
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$String),
			b);
	},
	end: '\'',
	innerParsers: _List_fromArray(
		[pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$lineBreak, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$cssEscapable]),
	isNestable: false,
	isNotRelevant: function (c) {
		return !(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isLineBreak(c) || pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isEscapable(c));
	},
	start: '\''
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$doubleQuote = pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimited(
	_Utils_update(
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$quoteDelimiter,
		{end: '\"', start: '\"'}));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$quote = pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimited(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$quoteDelimiter);
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$stringLiteral = function (revTokens) {
	return A2(
		elm$parser$Parser$map,
		function (n) {
			return _Utils_ap(n, revTokens);
		},
		elm$parser$Parser$oneOf(
			_List_fromArray(
				[pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$quote, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$doubleQuote])));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$mediaOrSupports = function (a) {
	return A2(
		elm$parser$Parser$andThen,
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$nestableAtRuleOpener,
		A2(
			elm$parser$Parser$loop,
			_List_fromArray(
				[
					_Utils_Tuple2(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(
						pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$AtRule(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$Identifier)),
					a)
				]),
			function (ns) {
				return elm$parser$Parser$oneOf(
					_List_fromArray(
						[
							pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$whitespaceOrCommentStep(ns),
							A2(
							elm$parser$Parser$map,
							elm$parser$Parser$Loop,
							pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$stringLiteral(ns)),
							A2(
							elm$parser$Parser$map,
							elm$parser$Parser$Loop,
							pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$atRuleKeywordOrValue(ns)),
							A2(
							elm$parser$Parser$map,
							function (b) {
								return elm$parser$Parser$Loop(
									A2(
										elm$core$List$cons,
										_Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, b),
										ns));
							},
							elm$parser$Parser$getChompedString(
								elm$parser$Parser$chompIf(
									function (c) {
										return !_Utils_eq(
											c,
											_Utils_chr('{'));
									}))),
							elm$parser$Parser$succeed(
							elm$parser$Parser$Done(ns))
						]));
			}));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$PropertyValue = {$: 'PropertyValue'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$stringArg = F2(
	function (fnStr, revTokens) {
		return A2(
			elm$parser$Parser$andThen,
			function (revT_) {
				return elm$parser$Parser$oneOf(
					_List_fromArray(
						[
							pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$stringLiteral(revT_),
							A2(
							elm$parser$Parser$map,
							function (n) {
								return A2(
									elm$core$List$cons,
									_Utils_Tuple2(
										pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$String),
										n),
									revT_);
							},
							elm$parser$Parser$getChompedString(
								pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(
									function (c) {
										return !_Utils_eq(
											c,
											_Utils_chr(')'));
									}))),
							elm$parser$Parser$succeed(revT_)
						]));
			},
			A2(
				elm$parser$Parser$map,
				elm$core$Basics$always(
					A2(
						elm$core$List$cons,
						_Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, '('),
						A2(
							elm$core$List$cons,
							_Utils_Tuple2(
								pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$PropertyValue),
								fnStr),
							revTokens))),
				elm$parser$Parser$symbol(fnStr + '(')));
	});
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$atRuleHelper = function (a) {
	switch (a) {
		case '@import':
			return A2(
				elm$parser$Parser$loop,
				_List_fromArray(
					[
						_Utils_Tuple2(
						pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(
							pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$AtRule(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$Identifier)),
						a)
					]),
				function (ns) {
					return elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$whitespaceOrCommentStep(ns),
								A2(
								elm$parser$Parser$map,
								elm$parser$Parser$Loop,
								A2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$stringArg, 'url', ns)),
								A2(
								elm$parser$Parser$map,
								elm$parser$Parser$Loop,
								pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$stringLiteral(ns)),
								A2(
								elm$parser$Parser$map,
								elm$parser$Parser$Loop,
								pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$atRuleKeywordOrValue(ns)),
								A2(
								elm$parser$Parser$map,
								function (b) {
									return elm$parser$Parser$Loop(
										A2(
											elm$core$List$cons,
											_Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, b),
											ns));
								},
								elm$parser$Parser$getChompedString(
									elm$parser$Parser$chompIf(
										function (c) {
											return !_Utils_eq(
												c,
												_Utils_chr(';'));
										}))),
								elm$parser$Parser$succeed(
								elm$parser$Parser$Done(ns))
							]));
				});
		case '@namespace':
			return A2(
				elm$parser$Parser$loop,
				_List_fromArray(
					[
						_Utils_Tuple2(
						pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(
							pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$AtRule(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$Identifier)),
						a)
					]),
				function (ns) {
					return elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$whitespaceOrCommentStep(ns),
								A2(
								elm$parser$Parser$map,
								elm$parser$Parser$Loop,
								A2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$stringArg, 'url', ns)),
								A2(
								elm$parser$Parser$map,
								elm$parser$Parser$Loop,
								pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$stringLiteral(ns)),
								A2(
								elm$parser$Parser$map,
								function (b) {
									return elm$parser$Parser$Loop(
										A2(
											elm$core$List$cons,
											_Utils_Tuple2(
												pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(
													pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$AtRule(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$Prefix)),
												b),
											ns));
								},
								elm$parser$Parser$getChompedString(
									pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$isSelectorNameChar))),
								A2(
								elm$parser$Parser$map,
								function (b) {
									return elm$parser$Parser$Loop(
										A2(
											elm$core$List$cons,
											_Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, b),
											ns));
								},
								elm$parser$Parser$getChompedString(
									elm$parser$Parser$chompIf(
										function (c) {
											return !_Utils_eq(
												c,
												_Utils_chr(';'));
										}))),
								elm$parser$Parser$succeed(
								elm$parser$Parser$Done(ns))
							]));
				});
		case '@charset':
			return A2(
				elm$parser$Parser$loop,
				_List_fromArray(
					[
						_Utils_Tuple2(
						pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(
							pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$AtRule(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$Identifier)),
						a)
					]),
				function (ns) {
					return elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$whitespaceOrCommentStep(ns),
								A2(
								elm$parser$Parser$map,
								elm$parser$Parser$Loop,
								pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$stringLiteral(ns)),
								A2(
								elm$parser$Parser$map,
								function (b) {
									return elm$parser$Parser$Loop(
										A2(
											elm$core$List$cons,
											_Utils_Tuple2(
												pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$String),
												b),
											ns));
								},
								elm$parser$Parser$getChompedString(
									pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$isSelectorNameChar))),
								A2(
								elm$parser$Parser$map,
								function (b) {
									return elm$parser$Parser$Loop(
										A2(
											elm$core$List$cons,
											_Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, b),
											ns));
								},
								elm$parser$Parser$getChompedString(
									elm$parser$Parser$chompIf(
										function (c) {
											return !_Utils_eq(
												c,
												_Utils_chr(';'));
										}))),
								elm$parser$Parser$succeed(
								elm$parser$Parser$Done(ns))
							]));
				});
		case '@media':
			return pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$mediaOrSupports(a);
		case '@supports':
			return pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$mediaOrSupports(a);
		case '@keyframes':
			return A2(
				elm$parser$Parser$andThen,
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$nestableAtRuleOpener,
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$keyframesOrCounterStyle(a));
		case '@counter-style':
			return pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$keyframesOrCounterStyle(a);
		case '@font-feature-values':
			return A2(
				elm$parser$Parser$andThen,
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$nestableAtRuleOpener,
				A2(
					elm$parser$Parser$loop,
					_List_fromArray(
						[
							_Utils_Tuple2(
							pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(
								pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$AtRule(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$Identifier)),
							a)
						]),
					function (ns) {
						return elm$parser$Parser$oneOf(
							_List_fromArray(
								[
									pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$whitespaceOrCommentStep(ns),
									A2(
									elm$parser$Parser$map,
									function (b) {
										return elm$parser$Parser$Loop(
											A2(
												elm$core$List$cons,
												_Utils_Tuple2(
													pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(
														pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$AtRule(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$Prefix)),
													b),
												ns));
									},
									elm$parser$Parser$getChompedString(
										pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$isSelectorNameChar))),
									A2(
									elm$parser$Parser$map,
									function (b) {
										return elm$parser$Parser$Loop(
											A2(
												elm$core$List$cons,
												_Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, b),
												ns));
									},
									elm$parser$Parser$getChompedString(
										elm$parser$Parser$chompIf(
											function (c) {
												return !_Utils_eq(
													c,
													_Utils_chr('{'));
											}))),
									elm$parser$Parser$succeed(
									elm$parser$Parser$Done(ns))
								]));
					}));
		default:
			return A2(elm$core$Set$member, a, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$atRuleSet) ? elm$parser$Parser$succeed(
				_List_fromArray(
					[
						_Utils_Tuple2(
						pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(
							pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$AtRule(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$Identifier)),
						a)
					])) : elm$parser$Parser$succeed(
				_List_fromArray(
					[
						_Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, a)
					]));
	}
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$atRule = A2(
	elm$parser$Parser$andThen,
	pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$atRuleHelper,
	elm$parser$Parser$getChompedString(
		A2(
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$thenChompWhile,
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$isSelectorNameChar,
			elm$parser$Parser$symbol('@'))));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$Property = {$: 'Property'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$isPropertyChar = function (c) {
	return !(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isWhitespace(c) || (pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$isCommentChar(c) || (_Utils_eq(
		c,
		_Utils_chr(':')) || (_Utils_eq(
		c,
		_Utils_chr(';')) || _Utils_eq(
		c,
		_Utils_chr('}'))))));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$Unit = {$: 'Unit'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$operatorCharSet = elm$core$Set$fromList(
	_List_fromArray(
		[
			_Utils_chr('+'),
			_Utils_chr('-'),
			_Utils_chr('%'),
			_Utils_chr('*'),
			_Utils_chr('/')
		]));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$isOperatorChar = function (c) {
	return A2(elm$core$Set$member, c, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$operatorCharSet);
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$isPropertyValueChar = function (c) {
	return pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$isPropertyChar(c) && (!(_Utils_eq(
		c,
		_Utils_chr('(')) || (_Utils_eq(
		c,
		_Utils_chr(')')) || (_Utils_eq(
		c,
		_Utils_chr(',')) || pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$isOperatorChar(c)))));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$hexColor = function (revTokens) {
	return A2(
		elm$parser$Parser$map,
		function (n) {
			return A2(
				elm$core$List$cons,
				_Utils_Tuple2(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$Number),
					n),
				revTokens);
		},
		elm$parser$Parser$getChompedString(
			A2(
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$thenChompWhile,
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$isPropertyValueChar,
				elm$parser$Parser$symbol('#'))));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$isNotPropertyValueChar = function (c) {
	return _Utils_eq(
		c,
		_Utils_chr('(')) || (_Utils_eq(
		c,
		_Utils_chr(')')) || (_Utils_eq(
		c,
		_Utils_chr(':')) || (_Utils_eq(
		c,
		_Utils_chr(',')) || _Utils_eq(
		c,
		_Utils_chr('/')))));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$unitSet = elm$core$Set$fromList(
	_List_fromArray(
		['em', 'ex', 'ch', 'rem', 'vw', 'vh', 'vmin', 'vmax', 'cm', 'mm', 'q', 'in', 'pt', 'pc', 'px', 'deg', 'grad', 'rad', 'turn', 's', 'ms', 'Hz', 'kHz', 'dpi', 'dpcm', 'dppx']));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$isUnit = function (n) {
	return A2(elm$core$Set$member, n, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$unitSet);
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isNumber = function (c) {
	return elm$core$Char$isDigit(c) || _Utils_eq(
		c,
		_Utils_chr('.'));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$positiveNumber = A2(
	elm$parser$Parser$ignorer,
	A2(
		elm$parser$Parser$ignorer,
		elm$parser$Parser$succeed(_Utils_Tuple0),
		elm$parser$Parser$chompIf(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isNumber)),
	elm$parser$Parser$chompWhile(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isNumber));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$negativeNumber = A2(
	elm$parser$Parser$ignorer,
	A2(
		elm$parser$Parser$ignorer,
		elm$parser$Parser$succeed(_Utils_Tuple0),
		elm$parser$Parser$backtrackable(
			elm$parser$Parser$symbol('-'))),
	pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$positiveNumber);
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$number = elm$parser$Parser$oneOf(
	_List_fromArray(
		[pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$positiveNumber, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$negativeNumber]));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$number = A2(
	elm$parser$Parser$map,
	function (b) {
		return _Utils_Tuple2(
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$Number),
			b);
	},
	elm$parser$Parser$getChompedString(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$number));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$valueLoop = function (revTokens) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$whitespaceOrCommentStep(revTokens),
				A2(
				elm$parser$Parser$map,
				elm$parser$Parser$Loop,
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$stringLiteral(revTokens)),
				A2(
				elm$parser$Parser$map,
				function (n) {
					return elm$parser$Parser$Loop(
						A2(elm$core$List$cons, n, revTokens));
				},
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$number),
				A2(
				elm$parser$Parser$map,
				elm$parser$Parser$Loop,
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$hexColor(revTokens)),
				A2(
				elm$parser$Parser$map,
				elm$parser$Parser$Loop,
				A2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$stringArg, 'url', revTokens)),
				A2(
				elm$parser$Parser$map,
				elm$parser$Parser$Loop,
				A2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$stringArg, 'format', revTokens)),
				A2(
				elm$parser$Parser$map,
				elm$parser$Parser$Loop,
				A2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$stringArg, 'local', revTokens)),
				A2(
				elm$parser$Parser$map,
				function (n) {
					return pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$isUnit(n) ? elm$parser$Parser$Loop(
						A2(
							elm$core$List$cons,
							_Utils_Tuple2(
								pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$Unit),
								n),
							revTokens)) : elm$parser$Parser$Loop(
						A2(
							elm$core$List$cons,
							_Utils_Tuple2(
								pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$PropertyValue),
								n),
							revTokens));
				},
				elm$parser$Parser$getChompedString(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$isPropertyValueChar))),
				A2(
				elm$parser$Parser$map,
				function (b) {
					return elm$parser$Parser$Loop(
						A2(
							elm$core$List$cons,
							_Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, b),
							revTokens));
				},
				elm$parser$Parser$getChompedString(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$isNotPropertyValueChar))),
				A2(
				elm$parser$Parser$map,
				function (b) {
					return elm$parser$Parser$Loop(
						A2(
							elm$core$List$cons,
							_Utils_Tuple2(
								pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$Unit),
								b),
							revTokens));
				},
				elm$parser$Parser$getChompedString(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$isOperatorChar))),
				elm$parser$Parser$succeed(
				elm$parser$Parser$Done(revTokens))
			]));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$valueHelper = function (opener) {
	return A2(
		elm$parser$Parser$loop,
		_List_fromArray(
			[opener]),
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$valueLoop);
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$value = A2(
	elm$parser$Parser$andThen,
	pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$valueHelper,
	A2(
		elm$parser$Parser$map,
		function (b) {
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, b);
		},
		elm$parser$Parser$getChompedString(
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(
				elm$core$Basics$eq(
					_Utils_chr(':'))))));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$declarationLoop = function (revTokens) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$whitespaceOrCommentStep(revTokens),
				A2(
				elm$parser$Parser$map,
				function (b) {
					return elm$parser$Parser$Loop(
						A2(
							elm$core$List$cons,
							_Utils_Tuple2(
								pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$Property),
								b),
							revTokens));
				},
				elm$parser$Parser$getChompedString(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$isPropertyChar))),
				A2(
				elm$parser$Parser$map,
				function (b) {
					return elm$parser$Parser$Loop(
						A2(
							elm$core$List$cons,
							_Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, b),
							revTokens));
				},
				elm$parser$Parser$getChompedString(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(
						function (c) {
							return _Utils_eq(
								c,
								_Utils_chr(';')) || _Utils_eq(
								c,
								_Utils_chr('/'));
						}))),
				A2(
				elm$parser$Parser$map,
				function (n) {
					return elm$parser$Parser$Loop(
						_Utils_ap(n, revTokens));
				},
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$value),
				elm$parser$Parser$succeed(
				elm$parser$Parser$Done(revTokens))
			]));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$declarationBlockHelper = function (opener) {
	return A2(
		elm$parser$Parser$loop,
		_List_fromArray(
			[opener]),
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$declarationLoop);
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$declarationBlock = A2(
	elm$parser$Parser$andThen,
	pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$declarationBlockHelper,
	A2(
		elm$parser$Parser$map,
		function (b) {
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, b);
		},
		elm$parser$Parser$getChompedString(
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(
				function (c) {
					return _Utils_eq(
						c,
						_Utils_chr('{'));
				}))));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$Selector = function (a) {
	return {$: 'Selector', a: a};
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$AttributeName = {$: 'AttributeName'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$AttributeSelector = function (a) {
	return {$: 'AttributeSelector', a: a};
};
var elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === 'RBEmpty_elm_builtin') {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3(elm$core$Dict$foldl, elm$core$Dict$insert, t2, t1);
	});
var elm$core$Set$union = F2(
	function (_n0, _n1) {
		var dict1 = _n0.a;
		var dict2 = _n1.a;
		return elm$core$Set$Set_elm_builtin(
			A2(elm$core$Dict$union, dict1, dict2));
	});
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$attSelOperatorCharSet = elm$core$Set$fromList(
	_List_fromArray(
		[
			_Utils_chr('='),
			_Utils_chr('~'),
			_Utils_chr('|'),
			_Utils_chr('^'),
			_Utils_chr('$'),
			_Utils_chr('*')
		]));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$whitespaceCharSet = elm$core$Set$fromList(
	_List_fromArray(
		[
			_Utils_chr(' '),
			_Utils_chr('\t'),
			_Utils_chr('\n')
		]));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$attSelNameInvalidCharSet = A2(
	elm$core$Set$insert,
	_Utils_chr(']'),
	A2(elm$core$Set$union, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$attSelOperatorCharSet, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$whitespaceCharSet));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$attributeName = A2(
	elm$parser$Parser$map,
	function (b) {
		return _Utils_Tuple2(
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$Selector(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$AttributeSelector(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$AttributeName))),
			b);
	},
	elm$parser$Parser$getChompedString(
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(
			function (c) {
				return !A2(elm$core$Set$member, c, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$attSelNameInvalidCharSet);
			})));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$AttributeOperator = {$: 'AttributeOperator'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$attributeOperator = A2(
	elm$parser$Parser$map,
	function (b) {
		return _Utils_Tuple2(
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$Selector(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$AttributeSelector(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$AttributeOperator))),
			b);
	},
	elm$parser$Parser$getChompedString(
		elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					elm$parser$Parser$symbol('~='),
					elm$parser$Parser$symbol('|='),
					elm$parser$Parser$symbol('^='),
					elm$parser$Parser$symbol('$='),
					elm$parser$Parser$symbol('*='),
					elm$parser$Parser$symbol('=')
				]))));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$AttributeValue = {$: 'AttributeValue'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$attributeValue = function (revTokens) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$whitespaceOrCommentStep(revTokens),
				A2(
				elm$parser$Parser$map,
				elm$parser$Parser$Done,
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$stringLiteral(revTokens)),
				A2(
				elm$parser$Parser$map,
				elm$parser$Parser$Done,
				A2(
					elm$parser$Parser$map,
					function (b) {
						return A2(
							elm$core$List$cons,
							_Utils_Tuple2(
								pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(
									pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$Selector(
										pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$AttributeSelector(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$AttributeValue))),
								b),
							revTokens);
					},
					elm$parser$Parser$getChompedString(
						pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(
							function (c) {
								return (!_Utils_eq(
									c,
									_Utils_chr(']'))) && (!pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isWhitespace(c));
							})))),
				elm$parser$Parser$succeed(
				elm$parser$Parser$Done(revTokens))
			]));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$attributeSelectorLoop = function (revTokens) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$whitespaceOrCommentStep(revTokens),
				A2(
				elm$parser$Parser$map,
				function (n) {
					return elm$parser$Parser$Loop(
						A2(elm$core$List$cons, n, revTokens));
				},
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$attributeName),
				A2(
				elm$parser$Parser$andThen,
				function (operator) {
					return A2(
						elm$parser$Parser$map,
						function (n) {
							return elm$parser$Parser$Loop(
								_Utils_ap(n, revTokens));
						},
						A2(
							elm$parser$Parser$loop,
							_List_fromArray(
								[operator]),
							pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$attributeValue));
				},
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$attributeOperator),
				elm$parser$Parser$succeed(
				elm$parser$Parser$Done(revTokens))
			]));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$attributeSelector = A2(
	elm$parser$Parser$andThen,
	function (opener) {
		return A2(
			elm$parser$Parser$loop,
			_List_fromArray(
				[opener]),
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$attributeSelectorLoop);
	},
	A2(
		elm$parser$Parser$map,
		elm$core$Basics$always(
			_Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, '[')),
		elm$parser$Parser$symbol('[')));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$Class = {$: 'Class'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$class = A2(
	elm$parser$Parser$map,
	function (b) {
		return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$Class, b);
	},
	elm$parser$Parser$getChompedString(
		A2(
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$thenChompWhile,
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$isSelectorNameChar,
			elm$parser$Parser$symbol('.'))));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$Combinator = {$: 'Combinator'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$combinator = A2(
	elm$parser$Parser$map,
	function (b) {
		return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$Combinator, b);
	},
	elm$parser$Parser$getChompedString(
		elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					elm$parser$Parser$symbol('+'),
					elm$parser$Parser$symbol('~'),
					elm$parser$Parser$symbol('>')
				]))));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$Element = {$: 'Element'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$element = A2(
	elm$parser$Parser$map,
	function (b) {
		return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$Element, b);
	},
	elm$parser$Parser$getChompedString(
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$isSelectorNameChar)));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$Id = {$: 'Id'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$id = A2(
	elm$parser$Parser$map,
	function (b) {
		return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$Id, b);
	},
	elm$parser$Parser$getChompedString(
		A2(
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$thenChompWhile,
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$isSelectorNameChar,
			elm$parser$Parser$symbol('#'))));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$PseudoClass = {$: 'PseudoClass'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$pseudoClass = A2(
	elm$parser$Parser$map,
	function (b) {
		return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$PseudoClass, b);
	},
	elm$parser$Parser$getChompedString(
		A2(
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$thenChompWhile,
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$isSelectorNameChar,
			elm$parser$Parser$symbol(':'))));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$PseudoElement = {$: 'PseudoElement'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$pseudoElement = A2(
	elm$parser$Parser$map,
	function (b) {
		return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$PseudoElement, b);
	},
	elm$parser$Parser$getChompedString(
		A2(
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$thenChompWhile,
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$isSelectorNameChar,
			elm$parser$Parser$symbol('::'))));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$Universal = {$: 'Universal'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$universal = A2(
	elm$parser$Parser$map,
	elm$core$Basics$always(
		_Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$Universal, '*')),
	elm$parser$Parser$symbol('*'));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$selector = elm$parser$Parser$oneOf(
	_List_fromArray(
		[
			A2(
			elm$parser$Parser$map,
			function (_n0) {
				var n = _n0.a;
				var s = _n0.b;
				return _List_fromArray(
					[
						_Utils_Tuple2(
						pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(
							pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$Selector(n)),
						s)
					]);
			},
			elm$parser$Parser$oneOf(
				_List_fromArray(
					[pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$id, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$class, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$element, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$universal, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$combinator, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$pseudoElement, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$pseudoClass]))),
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$attributeSelector
		]));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$mainLoop = function (revTokens) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$whitespaceOrCommentStep(revTokens),
				A2(
				elm$parser$Parser$map,
				function (n) {
					return elm$parser$Parser$Loop(
						_Utils_ap(n, revTokens));
				},
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$atRule),
				A2(
				elm$parser$Parser$map,
				function (n) {
					return elm$parser$Parser$Loop(
						_Utils_ap(n, revTokens));
				},
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$selector),
				A2(
				elm$parser$Parser$map,
				function (n) {
					return elm$parser$Parser$Loop(
						_Utils_ap(n, revTokens));
				},
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$declarationBlock),
				A2(
				elm$parser$Parser$map,
				function (b) {
					return elm$parser$Parser$Loop(
						A2(
							elm$core$List$cons,
							_Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, b),
							revTokens));
				},
				elm$parser$Parser$getChompedString(
					elm$parser$Parser$chompIf(
						elm$core$Basics$always(true)))),
				elm$parser$Parser$succeed(
				elm$parser$Parser$Done(revTokens))
			]));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$toRevTokens = A2(elm$parser$Parser$loop, _List_Nil, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$mainLoop);
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Helpers$newLine = function (fragments) {
	return {fragments: fragments, highlight: elm$core$Maybe$Nothing};
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Comment = {$: 'Comment'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Helpers$toFragment = F2(
	function (toStyle, _n0) {
		var syntax = _n0.a;
		var text = _n0.b;
		switch (syntax.$) {
			case 'Normal':
				return {additionalClass: '', requiredStyle: pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Default, text: text};
			case 'Comment':
				return {additionalClass: '', requiredStyle: pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Comment, text: text};
			case 'LineBreak':
				return {additionalClass: '', requiredStyle: pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Default, text: text};
			default:
				var c = syntax.a;
				var _n2 = toStyle(c);
				var requiredStyle = _n2.a;
				var additionalClass = _n2.b;
				return {additionalClass: additionalClass, requiredStyle: requiredStyle, text: text};
		}
	});
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Helpers$toLinesHelp = F3(
	function (toStyle, _n0, _n1) {
		var syntax = _n0.a;
		var text = _n0.b;
		var lines = _n1.a;
		var fragments = _n1.b;
		var maybeLastSyntax = _n1.c;
		if (_Utils_eq(syntax, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$LineBreak)) {
			return _Utils_Tuple3(
				A2(
					elm$core$List$cons,
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Helpers$newLine(fragments),
					lines),
				_List_fromArray(
					[
						A2(
						pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Helpers$toFragment,
						toStyle,
						_Utils_Tuple2(syntax, text))
					]),
				elm$core$Maybe$Nothing);
		} else {
			if (_Utils_eq(
				elm$core$Maybe$Just(syntax),
				maybeLastSyntax)) {
				if (fragments.b) {
					var headFrag = fragments.a;
					var tailFrags = fragments.b;
					return _Utils_Tuple3(
						lines,
						A2(
							elm$core$List$cons,
							_Utils_update(
								headFrag,
								{
									text: _Utils_ap(text, headFrag.text)
								}),
							tailFrags),
						maybeLastSyntax);
				} else {
					return _Utils_Tuple3(
						lines,
						A2(
							elm$core$List$cons,
							A2(
								pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Helpers$toFragment,
								toStyle,
								_Utils_Tuple2(syntax, text)),
							fragments),
						maybeLastSyntax);
				}
			} else {
				return _Utils_Tuple3(
					lines,
					A2(
						elm$core$List$cons,
						A2(
							pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Helpers$toFragment,
							toStyle,
							_Utils_Tuple2(syntax, text)),
						fragments),
					elm$core$Maybe$Just(syntax));
			}
		}
	});
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Helpers$toLines = F2(
	function (toStyle, revTokens) {
		return function (_n0) {
			var lines = _n0.a;
			var frags = _n0.b;
			return A2(
				elm$core$List$cons,
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Helpers$newLine(frags),
				lines);
		}(
			A3(
				elm$core$List$foldl,
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Helpers$toLinesHelp(toStyle),
				_Utils_Tuple3(_List_Nil, _List_Nil, elm$core$Maybe$Nothing),
				revTokens));
	});
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$toLines = A2(
	elm$core$Basics$composeR,
	elm$parser$Parser$run(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$toRevTokens),
	elm$core$Result$map(
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Helpers$toLines(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$syntaxToStyle)));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$css = A2(
	elm$core$Basics$composeR,
	pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$toLines,
	elm$core$Result$map(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$HCode));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style6 = {$: 'Style6'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$syntaxToStyle = function (syntax) {
	switch (syntax.$) {
		case 'String':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style2, 'elm-s');
		case 'BasicSymbol':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style3, 'elm-bs');
		case 'GroupSymbol':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style4, 'elm-gs');
		case 'Capitalized':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style6, 'elm-c');
		case 'Keyword':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style3, 'elm-k');
		case 'Function':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style5, 'elm-f');
		case 'TypeSignature':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style4, 'elm-ts');
		default:
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style1, 'elm-n');
	}
};
var elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$inlineComment = A2(
	elm$parser$Parser$map,
	function (b) {
		return _List_fromArray(
			[
				_Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Comment, b)
			]);
	},
	elm$parser$Parser$getChompedString(
		A2(
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$thenChompWhile,
			A2(elm$core$Basics$composeL, elm$core$Basics$not, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isLineBreak),
			elm$parser$Parser$symbol('--'))));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$lineBreakList = A2(
	elm$parser$Parser$map,
	function (_n0) {
		return _List_fromArray(
			[
				_Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$LineBreak, '\n')
			]);
	},
	elm$parser$Parser$symbol('\n'));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$multilineComment = pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimited(
	{
		defaultMap: function (b) {
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Comment, b);
		},
		end: '-}',
		innerParsers: _List_fromArray(
			[pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$lineBreakList]),
		isNestable: true,
		isNotRelevant: function (c) {
			return !pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isLineBreak(c);
		},
		start: '{-'
	});
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$comment = elm$parser$Parser$oneOf(
	_List_fromArray(
		[pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$inlineComment, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$multilineComment]));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$BasicSymbol = {$: 'BasicSymbol'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$Capitalized = {$: 'Capitalized'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$GroupSymbol = {$: 'GroupSymbol'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$Keyword = {$: 'Keyword'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$Number = {$: 'Number'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$basicSymbols = elm$core$Set$fromList(
	_List_fromArray(
		[
			_Utils_chr('|'),
			_Utils_chr('.'),
			_Utils_chr('='),
			_Utils_chr('\\'),
			_Utils_chr('/'),
			_Utils_chr('('),
			_Utils_chr(')'),
			_Utils_chr('-'),
			_Utils_chr('>'),
			_Utils_chr('<'),
			_Utils_chr(':'),
			_Utils_chr('+'),
			_Utils_chr('!'),
			_Utils_chr('$'),
			_Utils_chr('%'),
			_Utils_chr('&'),
			_Utils_chr('*')
		]));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$isBasicSymbol = function (c) {
	return A2(elm$core$Set$member, c, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$basicSymbols);
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$basicSymbol = elm$parser$Parser$getChompedString(
	pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$isBasicSymbol));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$groupSymbols = elm$core$Set$fromList(
	_List_fromArray(
		[
			_Utils_chr(','),
			_Utils_chr('['),
			_Utils_chr(']'),
			_Utils_chr('{'),
			_Utils_chr('}')
		]));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$isGroupSymbol = function (c) {
	return A2(elm$core$Set$member, c, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$groupSymbols);
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$isStringLiteralChar = function (c) {
	return _Utils_eq(
		c,
		_Utils_chr('\"')) || _Utils_eq(
		c,
		_Utils_chr('\''));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$isVariableChar = function (c) {
	return !(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isWhitespace(c) || (pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$isBasicSymbol(c) || (pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$isGroupSymbol(c) || pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$isStringLiteralChar(c))));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$capitalized = elm$parser$Parser$getChompedString(
	A2(
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$thenChompWhile,
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$isVariableChar,
		elm$parser$Parser$chompIf(elm$core$Char$isUpper)));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$groupSymbol = elm$parser$Parser$getChompedString(
	pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$isGroupSymbol));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$Function = {$: 'Function'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$infixSet = elm$core$Set$fromList(
	_List_fromArray(
		[
			_Utils_chr('+'),
			_Utils_chr('-'),
			_Utils_chr('/'),
			_Utils_chr('*'),
			_Utils_chr('='),
			_Utils_chr('.'),
			_Utils_chr('$'),
			_Utils_chr('<'),
			_Utils_chr('>'),
			_Utils_chr(':'),
			_Utils_chr('&'),
			_Utils_chr('|'),
			_Utils_chr('^'),
			_Utils_chr('?'),
			_Utils_chr('%'),
			_Utils_chr('#'),
			_Utils_chr('@'),
			_Utils_chr('~'),
			_Utils_chr('!'),
			_Utils_chr(',')
		]));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$isInfixChar = function (c) {
	return A2(elm$core$Set$member, c, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$infixSet);
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$infixParser = A2(
	elm$parser$Parser$map,
	function (b) {
		return _Utils_Tuple2(
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$Function),
			b);
	},
	elm$parser$Parser$getChompedString(
		A2(
			elm$parser$Parser$ignorer,
			A2(
				elm$parser$Parser$ignorer,
				A2(
					elm$parser$Parser$ignorer,
					elm$parser$Parser$succeed(_Utils_Tuple0),
					elm$parser$Parser$backtrackable(
						elm$parser$Parser$symbol('('))),
				elm$parser$Parser$backtrackable(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$isInfixChar))),
			elm$parser$Parser$backtrackable(
				elm$parser$Parser$symbol(')')))));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$keywordSet = elm$core$Set$fromList(
	_List_fromArray(
		['as', 'where', 'let', 'in', 'if', 'else', 'then', 'case', 'of', 'type', 'alias']));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$isKeyword = function (str) {
	return A2(elm$core$Set$member, str, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$keywordSet);
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$variable = elm$parser$Parser$getChompedString(
	A2(
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$thenChompWhile,
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$isVariableChar,
		elm$parser$Parser$chompIf(elm$core$Char$isLower)));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$weirdText = elm$parser$Parser$getChompedString(
	pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$isVariableChar));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$functionBodyContent = elm$parser$Parser$oneOf(
	_List_fromArray(
		[
			A2(
			elm$parser$Parser$map,
			function (b) {
				return _Utils_Tuple2(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$Number),
					b);
			},
			elm$parser$Parser$getChompedString(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$number)),
			A2(
			elm$parser$Parser$map,
			elm$core$Basics$always(
				_Utils_Tuple2(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$Capitalized),
					'()')),
			elm$parser$Parser$symbol('()')),
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$infixParser,
			A2(
			elm$parser$Parser$map,
			function (b) {
				return _Utils_Tuple2(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$BasicSymbol),
					b);
			},
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$basicSymbol),
			A2(
			elm$parser$Parser$map,
			function (b) {
				return _Utils_Tuple2(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$GroupSymbol),
					b);
			},
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$groupSymbol),
			A2(
			elm$parser$Parser$map,
			function (b) {
				return _Utils_Tuple2(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$Capitalized),
					b);
			},
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$capitalized),
			A2(
			elm$parser$Parser$map,
			function (n) {
				return pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$isKeyword(n) ? _Utils_Tuple2(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$Keyword),
					n) : _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, n);
			},
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$variable),
			A2(
			elm$parser$Parser$map,
			function (b) {
				return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, b);
			},
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$weirdText)
		]));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$String = {$: 'String'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$elmEscapable = A2(
	elm$parser$Parser$map,
	function (b) {
		return _List_fromArray(
			[
				_Utils_Tuple2(
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$Capitalized),
				b)
			]);
	},
	elm$parser$Parser$getChompedString(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$escapable));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$stringDelimiter = {
	defaultMap: function (b) {
		return _Utils_Tuple2(
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$String),
			b);
	},
	end: '\"',
	innerParsers: _List_fromArray(
		[pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$lineBreakList, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$elmEscapable]),
	isNestable: false,
	isNotRelevant: function (c) {
		return !(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isLineBreak(c) || pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isEscapable(c));
	},
	start: '\"'
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$doubleQuote = pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimited(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$stringDelimiter);
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$quote = pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimited(
	_Utils_update(
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$stringDelimiter,
		{end: '\'', start: '\''}));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$tripleDoubleQuote = pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimited(
	_Utils_update(
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$stringDelimiter,
		{end: '\"\"\"', start: '\"\"\"'}));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$stringLiteral = elm$parser$Parser$oneOf(
	_List_fromArray(
		[pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$tripleDoubleQuote, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$doubleQuote, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$quote]));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$lineBreak = A2(
	elm$parser$Parser$map,
	function (_n0) {
		return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$LineBreak, '\n');
	},
	elm$parser$Parser$symbol('\n'));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$space = A2(
	elm$parser$Parser$map,
	function (b) {
		return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, b);
	},
	elm$parser$Parser$getChompedString(
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isSpace)));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$checkContext = function (revTokens) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$whitespaceOrCommentStep(revTokens),
				elm$parser$Parser$succeed(
				elm$parser$Parser$Done(revTokens))
			]));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$whitespaceOrCommentStep = function (revTokens) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				elm$parser$Parser$map,
				function (n) {
					return elm$parser$Parser$Loop(
						A2(elm$core$List$cons, n, revTokens));
				},
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$space),
				A2(
				elm$parser$Parser$andThen,
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$checkContext,
				A2(
					elm$parser$Parser$map,
					function (n) {
						return A2(elm$core$List$cons, n, revTokens);
					},
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$lineBreak)),
				A2(
				elm$parser$Parser$map,
				function (n) {
					return elm$parser$Parser$Loop(
						_Utils_ap(n, revTokens));
				},
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$comment)
			]));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$functionBody = function (revTokens) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$whitespaceOrCommentStep(revTokens),
				A2(
				elm$parser$Parser$map,
				function (ns) {
					return elm$parser$Parser$Loop(
						_Utils_ap(ns, revTokens));
				},
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$stringLiteral),
				A2(
				elm$parser$Parser$map,
				function (n) {
					return elm$parser$Parser$Loop(
						A2(elm$core$List$cons, n, revTokens));
				},
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$functionBodyContent),
				elm$parser$Parser$succeed(
				elm$parser$Parser$Done(revTokens))
			]));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$TypeSignature = {$: 'TypeSignature'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$fnSigIsNotRelevant = function (c) {
	return !(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isWhitespace(c) || (_Utils_eq(
		c,
		_Utils_chr('(')) || (_Utils_eq(
		c,
		_Utils_chr(')')) || (_Utils_eq(
		c,
		_Utils_chr('-')) || _Utils_eq(
		c,
		_Utils_chr(','))))));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$fnSigContentHelp = elm$parser$Parser$oneOf(
	_List_fromArray(
		[
			A2(
			elm$parser$Parser$map,
			elm$core$Basics$always(
				_Utils_Tuple2(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$TypeSignature),
					'()')),
			elm$parser$Parser$symbol('()')),
			A2(
			elm$parser$Parser$map,
			elm$core$Basics$always(
				_Utils_Tuple2(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$BasicSymbol),
					'->')),
			elm$parser$Parser$symbol('->')),
			A2(
			elm$parser$Parser$map,
			function (b) {
				return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, b);
			},
			elm$parser$Parser$getChompedString(
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(
					function (c) {
						return _Utils_eq(
							c,
							_Utils_chr('(')) || (_Utils_eq(
							c,
							_Utils_chr(')')) || (_Utils_eq(
							c,
							_Utils_chr('-')) || _Utils_eq(
							c,
							_Utils_chr(','))));
					}))),
			A2(
			elm$parser$Parser$map,
			function (b) {
				return _Utils_Tuple2(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$TypeSignature),
					b);
			},
			elm$parser$Parser$getChompedString(
				A2(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$thenChompWhile,
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$fnSigIsNotRelevant,
					elm$parser$Parser$chompIf(elm$core$Char$isUpper)))),
			A2(
			elm$parser$Parser$map,
			function (b) {
				return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, b);
			},
			elm$parser$Parser$getChompedString(
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$fnSigIsNotRelevant)))
		]));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$fnSigContent = function (revTokens) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$whitespaceOrCommentStep(revTokens),
				A2(
				elm$parser$Parser$map,
				function (n) {
					return elm$parser$Parser$Loop(
						A2(elm$core$List$cons, n, revTokens));
				},
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$fnSigContentHelp),
				elm$parser$Parser$succeed(
				elm$parser$Parser$Done(revTokens))
			]));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$functionSignature = function (revTokens) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				elm$parser$Parser$map,
				elm$parser$Parser$Done,
				A2(
					elm$parser$Parser$andThen,
					function (ns) {
						return A2(elm$parser$Parser$loop, ns, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$fnSigContent);
					},
					A2(
						elm$parser$Parser$map,
						elm$core$Basics$always(
							A2(
								elm$core$List$cons,
								_Utils_Tuple2(
									pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$BasicSymbol),
									':'),
								revTokens)),
						elm$parser$Parser$symbol(':')))),
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$whitespaceOrCommentStep(revTokens),
				A2(
				elm$parser$Parser$map,
				elm$parser$Parser$Done,
				A2(elm$parser$Parser$loop, revTokens, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$functionBody)),
				elm$parser$Parser$succeed(
				elm$parser$Parser$Done(revTokens))
			]));
};
var elm$parser$Parser$ExpectingKeyword = function (a) {
	return {$: 'ExpectingKeyword', a: a};
};
var elm$parser$Parser$Advanced$keyword = function (_n0) {
	var kwd = _n0.a;
	var expecting = _n0.b;
	var progress = !elm$core$String$isEmpty(kwd);
	return elm$parser$Parser$Advanced$Parser(
		function (s) {
			var _n1 = A5(elm$parser$Parser$Advanced$isSubString, kwd, s.offset, s.row, s.col, s.src);
			var newOffset = _n1.a;
			var newRow = _n1.b;
			var newCol = _n1.c;
			return (_Utils_eq(newOffset, -1) || (0 <= A3(
				elm$parser$Parser$Advanced$isSubChar,
				function (c) {
					return elm$core$Char$isAlphaNum(c) || _Utils_eq(
						c,
						_Utils_chr('_'));
				},
				newOffset,
				s.src))) ? A2(
				elm$parser$Parser$Advanced$Bad,
				false,
				A2(elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
				elm$parser$Parser$Advanced$Good,
				progress,
				_Utils_Tuple0,
				{col: newCol, context: s.context, indent: s.indent, offset: newOffset, row: newRow, src: s.src});
		});
};
var elm$parser$Parser$keyword = function (kwd) {
	return elm$parser$Parser$Advanced$keyword(
		A2(
			elm$parser$Parser$Advanced$Token,
			kwd,
			elm$parser$Parser$ExpectingKeyword(kwd)));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$isCommentChar = function (c) {
	return _Utils_eq(
		c,
		_Utils_chr('-')) || _Utils_eq(
		c,
		_Utils_chr('{'));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$commentChar = elm$parser$Parser$getChompedString(
	elm$parser$Parser$chompIf(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$isCommentChar));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$modDecIsNotRelevant = function (c) {
	return !(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isWhitespace(c) || (pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$isCommentChar(c) || _Utils_eq(
		c,
		_Utils_chr('('))));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$mdpIsNotRelevant = function (c) {
	return !(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isWhitespace(c) || (pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$isCommentChar(c) || (_Utils_eq(
		c,
		_Utils_chr('(')) || (_Utils_eq(
		c,
		_Utils_chr(')')) || (_Utils_eq(
		c,
		_Utils_chr(',')) || _Utils_eq(
		c,
		_Utils_chr('.')))))));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$mdpnIsSpecialChar = function (c) {
	return pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isLineBreak(c) || (pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$isCommentChar(c) || (_Utils_eq(
		c,
		_Utils_chr('(')) || _Utils_eq(
		c,
		_Utils_chr(')'))));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$checkContextNested = function (_n1) {
	var nestLevel = _n1.a;
	var revTokens = _n1.b;
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$whitespaceOrCommentStepNested(
				_Utils_Tuple2(nestLevel, revTokens)),
				elm$parser$Parser$succeed(
				elm$parser$Parser$Done(revTokens))
			]));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$whitespaceOrCommentStepNested = function (_n0) {
	var nestLevel = _n0.a;
	var revTokens = _n0.b;
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				elm$parser$Parser$map,
				function (n) {
					return elm$parser$Parser$Loop(
						_Utils_Tuple2(
							nestLevel,
							A2(elm$core$List$cons, n, revTokens)));
				},
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$space),
				A2(
				elm$parser$Parser$andThen,
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$checkContextNested,
				A2(
					elm$parser$Parser$map,
					function (n) {
						return _Utils_Tuple2(
							nestLevel,
							A2(elm$core$List$cons, n, revTokens));
					},
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$lineBreak)),
				A2(
				elm$parser$Parser$map,
				function (n) {
					return elm$parser$Parser$Loop(
						_Utils_Tuple2(
							nestLevel,
							_Utils_ap(n, revTokens)));
				},
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$comment)
			]));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$modDecParNest = function (_n0) {
	var nestLevel = _n0.a;
	var revTokens = _n0.b;
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$whitespaceOrCommentStepNested(
				_Utils_Tuple2(nestLevel, revTokens)),
				A2(
				elm$parser$Parser$map,
				function (ns) {
					return elm$parser$Parser$Loop(
						_Utils_Tuple2(nestLevel + 1, ns));
				},
				A2(
					elm$parser$Parser$map,
					elm$core$Basics$always(
						A2(
							elm$core$List$cons,
							_Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, '('),
							revTokens)),
					elm$parser$Parser$symbol('('))),
				A2(
				elm$parser$Parser$map,
				function (ns) {
					return (!nestLevel) ? elm$parser$Parser$Done(ns) : elm$parser$Parser$Loop(
						_Utils_Tuple2(nestLevel - 1, ns));
				},
				A2(
					elm$parser$Parser$map,
					elm$core$Basics$always(
						A2(
							elm$core$List$cons,
							_Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, ')'),
							revTokens)),
					elm$parser$Parser$symbol(')'))),
				A2(
				elm$parser$Parser$map,
				function (n) {
					return elm$parser$Parser$Loop(
						_Utils_Tuple2(
							nestLevel,
							A2(elm$core$List$cons, n, revTokens)));
				},
				elm$parser$Parser$oneOf(
					_List_fromArray(
						[
							A2(
							elm$parser$Parser$map,
							function (b) {
								return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, b);
							},
							pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$commentChar),
							A2(
							elm$parser$Parser$map,
							function (s) {
								return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, s);
							},
							elm$parser$Parser$getChompedString(
								pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(
									A2(elm$core$Basics$composeL, elm$core$Basics$not, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$mdpnIsSpecialChar))))
						]))),
				elm$parser$Parser$succeed(
				elm$parser$Parser$Done(revTokens))
			]));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$modDecParentheses = function (revTokens) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$whitespaceOrCommentStep(revTokens),
				A2(
				elm$parser$Parser$map,
				elm$parser$Parser$Done,
				A2(
					elm$parser$Parser$map,
					elm$core$Basics$always(
						A2(
							elm$core$List$cons,
							_Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, ')'),
							revTokens)),
					elm$parser$Parser$symbol(')'))),
				A2(
				elm$parser$Parser$map,
				function (n) {
					return elm$parser$Parser$Loop(
						A2(elm$core$List$cons, n, revTokens));
				},
				elm$parser$Parser$oneOf(
					_List_fromArray(
						[
							pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$infixParser,
							A2(
							elm$parser$Parser$map,
							function (b) {
								return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, b);
							},
							pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$commentChar),
							A2(
							elm$parser$Parser$map,
							function (b) {
								return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, b);
							},
							elm$parser$Parser$getChompedString(
								pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(
									function (c) {
										return _Utils_eq(
											c,
											_Utils_chr(',')) || _Utils_eq(
											c,
											_Utils_chr('.'));
									}))),
							A2(
							elm$parser$Parser$map,
							function (b) {
								return _Utils_Tuple2(
									pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$TypeSignature),
									b);
							},
							elm$parser$Parser$getChompedString(
								A2(
									pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$thenChompWhile,
									pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$mdpIsNotRelevant,
									elm$parser$Parser$chompIf(elm$core$Char$isUpper)))),
							A2(
							elm$parser$Parser$map,
							function (b) {
								return _Utils_Tuple2(
									pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$Function),
									b);
							},
							elm$parser$Parser$getChompedString(
								pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$mdpIsNotRelevant)))
						]))),
				A2(
				elm$parser$Parser$map,
				elm$parser$Parser$Loop,
				A2(
					elm$parser$Parser$andThen,
					function (n) {
						return A2(
							elm$parser$Parser$loop,
							_Utils_Tuple2(0, n),
							pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$modDecParNest);
					},
					A2(
						elm$parser$Parser$map,
						elm$core$Basics$always(
							A2(
								elm$core$List$cons,
								_Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, '('),
								revTokens)),
						elm$parser$Parser$symbol('(')))),
				elm$parser$Parser$succeed(
				elm$parser$Parser$Done(revTokens))
			]));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$moduleDeclaration = function (revTokens) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$whitespaceOrCommentStep(revTokens),
				A2(
				elm$parser$Parser$map,
				elm$parser$Parser$Loop,
				A2(
					elm$parser$Parser$andThen,
					function (n) {
						return A2(elm$parser$Parser$loop, n, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$modDecParentheses);
					},
					A2(
						elm$parser$Parser$map,
						elm$core$Basics$always(
							A2(
								elm$core$List$cons,
								_Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, '('),
								revTokens)),
						elm$parser$Parser$symbol('(')))),
				A2(
				elm$parser$Parser$map,
				function (n) {
					return elm$parser$Parser$Loop(
						A2(elm$core$List$cons, n, revTokens));
				},
				elm$parser$Parser$oneOf(
					_List_fromArray(
						[
							A2(
							elm$parser$Parser$map,
							function (b) {
								return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, b);
							},
							pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$commentChar),
							A2(
							elm$parser$Parser$map,
							elm$core$Basics$always(
								_Utils_Tuple2(
									pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$Keyword),
									'exposing')),
							elm$parser$Parser$keyword('exposing')),
							A2(
							elm$parser$Parser$map,
							elm$core$Basics$always(
								_Utils_Tuple2(
									pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$Keyword),
									'as')),
							elm$parser$Parser$keyword('as')),
							A2(
							elm$parser$Parser$map,
							function (b) {
								return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, b);
							},
							elm$parser$Parser$getChompedString(
								pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$modDecIsNotRelevant)))
						]))),
				elm$parser$Parser$succeed(
				elm$parser$Parser$Done(revTokens))
			]));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$portDeclarationHelp = F2(
	function (revTokens, str) {
		return (str === 'module') ? A2(
			elm$parser$Parser$loop,
			A2(
				elm$core$List$cons,
				_Utils_Tuple2(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$Keyword),
					str),
				revTokens),
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$moduleDeclaration) : A2(
			elm$parser$Parser$loop,
			A2(
				elm$core$List$cons,
				_Utils_Tuple2(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$Function),
					str),
				revTokens),
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$functionSignature);
	});
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$portDeclaration = function (revTokens) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$whitespaceOrCommentStep(revTokens),
				A2(
				elm$parser$Parser$map,
				elm$parser$Parser$Done,
				A2(
					elm$parser$Parser$andThen,
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$portDeclarationHelp(revTokens),
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$variable)),
				A2(
				elm$parser$Parser$map,
				elm$parser$Parser$Done,
				A2(elm$parser$Parser$loop, revTokens, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$functionBody)),
				elm$parser$Parser$succeed(
				elm$parser$Parser$Done(revTokens))
			]));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$lineStartVariable = F2(
	function (revTokens, n) {
		return ((n === 'module') || (n === 'import')) ? A2(
			elm$parser$Parser$loop,
			A2(
				elm$core$List$cons,
				_Utils_Tuple2(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$Keyword),
					n),
				revTokens),
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$moduleDeclaration) : ((n === 'port') ? A2(
			elm$parser$Parser$loop,
			A2(
				elm$core$List$cons,
				_Utils_Tuple2(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$Keyword),
					n),
				revTokens),
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$portDeclaration) : (pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$isKeyword(n) ? A2(
			elm$parser$Parser$loop,
			A2(
				elm$core$List$cons,
				_Utils_Tuple2(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$Keyword),
					n),
				revTokens),
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$functionBody) : A2(
			elm$parser$Parser$loop,
			A2(
				elm$core$List$cons,
				_Utils_Tuple2(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$Function),
					n),
				revTokens),
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$functionSignature)));
	});
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$mainLoop = function (revTokens) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				elm$parser$Parser$map,
				function (n) {
					return elm$parser$Parser$Loop(
						A2(elm$core$List$cons, n, revTokens));
				},
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$space),
				A2(
				elm$parser$Parser$map,
				function (n) {
					return elm$parser$Parser$Loop(
						A2(elm$core$List$cons, n, revTokens));
				},
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$lineBreak),
				A2(
				elm$parser$Parser$map,
				function (n) {
					return elm$parser$Parser$Loop(
						_Utils_ap(n, revTokens));
				},
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$comment),
				A2(
				elm$parser$Parser$map,
				elm$parser$Parser$Loop,
				A2(
					elm$parser$Parser$andThen,
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$lineStartVariable(revTokens),
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$variable)),
				A2(
				elm$parser$Parser$map,
				elm$parser$Parser$Loop,
				A2(
					elm$parser$Parser$andThen,
					function (s) {
						return A2(
							elm$parser$Parser$loop,
							_Utils_ap(s, revTokens),
							pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$functionBody);
					},
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$stringLiteral)),
				A2(
				elm$parser$Parser$map,
				elm$parser$Parser$Loop,
				A2(
					elm$parser$Parser$andThen,
					function (s) {
						return A2(
							elm$parser$Parser$loop,
							A2(elm$core$List$cons, s, revTokens),
							pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$functionBody);
					},
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$functionBodyContent)),
				elm$parser$Parser$succeed(
				elm$parser$Parser$Done(revTokens))
			]));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$toRevTokens = A2(elm$parser$Parser$loop, _List_Nil, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$mainLoop);
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$toLines = A2(
	elm$core$Basics$composeR,
	elm$parser$Parser$run(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$toRevTokens),
	elm$core$Result$map(
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Helpers$toLines(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$syntaxToStyle)));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$elm = A2(
	elm$core$Basics$composeR,
	pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$toLines,
	elm$core$Result$map(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$HCode));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$syntaxToStyle = function (syntax) {
	switch (syntax.$) {
		case 'Number':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style1, 'js-n');
		case 'String':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style2, 'js-s');
		case 'Keyword':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style3, 'js-k');
		case 'DeclarationKeyword':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style4, 'js-dk');
		case 'FunctionEval':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style4, 'js-fe');
		case 'Function':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style5, 'js-f');
		case 'LiteralKeyword':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style6, 'js-lk');
		case 'Param':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style7, 'js-p');
		default:
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style5, 'js-ce');
	}
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$groupSet = elm$core$Set$fromList(
	_List_fromArray(
		[
			_Utils_chr('{'),
			_Utils_chr('}'),
			_Utils_chr('('),
			_Utils_chr(')'),
			_Utils_chr('['),
			_Utils_chr(']'),
			_Utils_chr(','),
			_Utils_chr(';')
		]));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$isGroupChar = function (c) {
	return A2(elm$core$Set$member, c, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$groupSet);
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$groupChar = A2(
	elm$parser$Parser$map,
	function (b) {
		return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, b);
	},
	elm$parser$Parser$getChompedString(
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$isGroupChar)));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$isCommentChar = function (c) {
	return _Utils_eq(
		c,
		_Utils_chr('/'));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$operatorSet = elm$core$Set$fromList(
	_List_fromArray(
		[
			_Utils_chr('+'),
			_Utils_chr('-'),
			_Utils_chr('*'),
			_Utils_chr('/'),
			_Utils_chr('='),
			_Utils_chr('!'),
			_Utils_chr('<'),
			_Utils_chr('>'),
			_Utils_chr('&'),
			_Utils_chr('|'),
			_Utils_chr('?'),
			_Utils_chr('^'),
			_Utils_chr(':'),
			_Utils_chr('~'),
			_Utils_chr('%'),
			_Utils_chr('.')
		]));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$punctuactorSet = A2(elm$core$Set$union, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$operatorSet, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$groupSet);
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$isPunctuaction = function (c) {
	return A2(elm$core$Set$member, c, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$punctuactorSet);
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$isStringLiteralChar = function (c) {
	return _Utils_eq(
		c,
		_Utils_chr('\"')) || (_Utils_eq(
		c,
		_Utils_chr('\'')) || _Utils_eq(
		c,
		_Utils_chr('`')));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$isIdentifierNameChar = function (c) {
	return !(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$isPunctuaction(c) || (pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$isStringLiteralChar(c) || (pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$isCommentChar(c) || pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isWhitespace(c))));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$DeclarationKeyword = {$: 'DeclarationKeyword'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$Function = {$: 'Function'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$Keyword = {$: 'Keyword'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$LiteralKeyword = {$: 'LiteralKeyword'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$Param = {$: 'Param'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$ClassExtends = {$: 'ClassExtends'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$inlineComment = A2(
	elm$parser$Parser$map,
	function (b) {
		return _List_fromArray(
			[
				_Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Comment, b)
			]);
	},
	elm$parser$Parser$getChompedString(
		A2(
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$thenChompWhile,
			A2(elm$core$Basics$composeL, elm$core$Basics$not, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isLineBreak),
			elm$parser$Parser$symbol('//'))));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$lineBreakList = A2(
	elm$parser$Parser$map,
	function (_n0) {
		return _List_fromArray(
			[
				_Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$LineBreak, '\n')
			]);
	},
	elm$parser$Parser$symbol('\n'));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$multilineComment = pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimited(
	{
		defaultMap: function (b) {
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Comment, b);
		},
		end: '*/',
		innerParsers: _List_fromArray(
			[pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$lineBreakList]),
		isNestable: false,
		isNotRelevant: function (c) {
			return !pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isLineBreak(c);
		},
		start: '/*'
	});
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$comment = elm$parser$Parser$oneOf(
	_List_fromArray(
		[pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$inlineComment, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$multilineComment]));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$whitespaceOrCommentStep = function (revTokens) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				elm$parser$Parser$map,
				function (b) {
					return elm$parser$Parser$Loop(
						A2(
							elm$core$List$cons,
							_Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, b),
							revTokens));
				},
				elm$parser$Parser$getChompedString(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isSpace))),
				A2(
				elm$parser$Parser$map,
				function (ns) {
					return elm$parser$Parser$Loop(
						_Utils_ap(ns, revTokens));
				},
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$lineBreakList),
				A2(
				elm$parser$Parser$map,
				function (ns) {
					return elm$parser$Parser$Loop(
						_Utils_ap(ns, revTokens));
				},
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$comment)
			]));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$classExtendsLoop = function (revTokens) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$whitespaceOrCommentStep(revTokens),
				A2(
				elm$parser$Parser$map,
				function (b) {
					return elm$parser$Parser$Loop(
						A2(
							elm$core$List$cons,
							_Utils_Tuple2(
								pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$ClassExtends),
								b),
							revTokens));
				},
				elm$parser$Parser$getChompedString(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$isIdentifierNameChar))),
				elm$parser$Parser$succeed(
				elm$parser$Parser$Done(revTokens))
			]));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$classDeclarationLoop = function (revTokens) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$whitespaceOrCommentStep(revTokens),
				A2(
				elm$parser$Parser$andThen,
				function (n) {
					return (n === 'extends') ? A2(
						elm$parser$Parser$map,
						elm$parser$Parser$Loop,
						A2(
							elm$parser$Parser$loop,
							A2(
								elm$core$List$cons,
								_Utils_Tuple2(
									pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$Keyword),
									n),
								revTokens),
							pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$classExtendsLoop)) : elm$parser$Parser$succeed(
						elm$parser$Parser$Loop(
							A2(
								elm$core$List$cons,
								_Utils_Tuple2(
									pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$Function),
									n),
								revTokens)));
				},
				elm$parser$Parser$getChompedString(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$isIdentifierNameChar))),
				elm$parser$Parser$succeed(
				elm$parser$Parser$Done(revTokens))
			]));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$argLoop = function (revTokens) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$whitespaceOrCommentStep(revTokens),
				A2(
				elm$parser$Parser$map,
				function (b) {
					return elm$parser$Parser$Loop(
						A2(
							elm$core$List$cons,
							_Utils_Tuple2(
								pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$Param),
								b),
							revTokens));
				},
				elm$parser$Parser$getChompedString(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(
						function (c) {
							return !(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$isCommentChar(c) || (pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isWhitespace(c) || (_Utils_eq(
								c,
								_Utils_chr(',')) || _Utils_eq(
								c,
								_Utils_chr(')')))));
						}))),
				A2(
				elm$parser$Parser$map,
				function (b) {
					return elm$parser$Parser$Loop(
						A2(
							elm$core$List$cons,
							_Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, b),
							revTokens));
				},
				elm$parser$Parser$getChompedString(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(
						function (c) {
							return _Utils_eq(
								c,
								_Utils_chr('/')) || _Utils_eq(
								c,
								_Utils_chr(','));
						}))),
				elm$parser$Parser$succeed(
				elm$parser$Parser$Done(revTokens))
			]));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$functionDeclarationLoop = function (revTokens) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$whitespaceOrCommentStep(revTokens),
				A2(
				elm$parser$Parser$map,
				function (b) {
					return elm$parser$Parser$Loop(
						A2(
							elm$core$List$cons,
							_Utils_Tuple2(
								pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$Function),
								b),
							revTokens));
				},
				elm$parser$Parser$getChompedString(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$isIdentifierNameChar))),
				A2(
				elm$parser$Parser$map,
				function (_n0) {
					return elm$parser$Parser$Loop(
						A2(
							elm$core$List$cons,
							_Utils_Tuple2(
								pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$Keyword),
								'*'),
							revTokens));
				},
				elm$parser$Parser$symbol('*')),
				A2(
				elm$parser$Parser$map,
				elm$parser$Parser$Loop,
				A2(
					elm$parser$Parser$andThen,
					function (_n1) {
						return A2(
							elm$parser$Parser$loop,
							A2(
								elm$core$List$cons,
								_Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, '('),
								revTokens),
							pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$argLoop);
					},
					elm$parser$Parser$symbol('('))),
				elm$parser$Parser$succeed(
				elm$parser$Parser$Done(revTokens))
			]));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$FunctionEval = {$: 'FunctionEval'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$functionEvalLoop = F3(
	function (identifier, revTokens, thisRevToken) {
		return elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$whitespaceOrCommentStep(thisRevToken),
					A2(
					elm$parser$Parser$map,
					function (_n0) {
						return elm$parser$Parser$Done(
							_Utils_ap(
								A2(
									elm$core$List$cons,
									_Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, '('),
									thisRevToken),
								A2(
									elm$core$List$cons,
									_Utils_Tuple2(
										pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$FunctionEval),
										identifier),
									revTokens)));
					},
					elm$parser$Parser$symbol('(')),
					elm$parser$Parser$succeed(
					elm$parser$Parser$Done(
						_Utils_ap(
							thisRevToken,
							A2(
								elm$core$List$cons,
								_Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, identifier),
								revTokens))))
				]));
	});
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$declarationKeywordSet = elm$core$Set$fromList(
	_List_fromArray(
		['var', 'const', 'let']));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$isDeclarationKeyword = function (str) {
	return A2(elm$core$Set$member, str, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$declarationKeywordSet);
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$keywordSet = elm$core$Set$fromList(
	_List_fromArray(
		['break', 'do', 'instanceof', 'typeof', 'case', 'else', 'new', 'catch', 'finally', 'return', 'void', 'continue', 'for', 'switch', 'while', 'debugger', 'this', 'with', 'default', 'if', 'throw', 'delete', 'in', 'try', 'enum', 'extends', 'export', 'import', 'implements', 'private', 'public', 'yield', 'interface', 'package', 'protected']));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$isKeyword = function (str) {
	return A2(elm$core$Set$member, str, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$keywordSet);
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$literalKeywordSet = elm$core$Set$fromList(
	_List_fromArray(
		['true', 'false', 'null', 'undefined', 'NaN', 'Infinity']));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$isLiteralKeyword = function (str) {
	return A2(elm$core$Set$member, str, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$literalKeywordSet);
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$keywordParser = F2(
	function (revTokens, n) {
		return ((n === 'function') || (n === 'static')) ? A2(
			elm$parser$Parser$loop,
			A2(
				elm$core$List$cons,
				_Utils_Tuple2(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$DeclarationKeyword),
					n),
				revTokens),
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$functionDeclarationLoop) : ((n === 'class') ? A2(
			elm$parser$Parser$loop,
			A2(
				elm$core$List$cons,
				_Utils_Tuple2(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$DeclarationKeyword),
					n),
				revTokens),
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$classDeclarationLoop) : (((n === 'this') || (n === 'super')) ? elm$parser$Parser$succeed(
			A2(
				elm$core$List$cons,
				_Utils_Tuple2(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$Param),
					n),
				revTokens)) : ((n === 'constructor') ? A2(
			elm$parser$Parser$loop,
			A2(
				elm$core$List$cons,
				_Utils_Tuple2(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$Function),
					n),
				revTokens),
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$functionDeclarationLoop) : (pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$isKeyword(n) ? elm$parser$Parser$succeed(
			A2(
				elm$core$List$cons,
				_Utils_Tuple2(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$Keyword),
					n),
				revTokens)) : (pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$isDeclarationKeyword(n) ? elm$parser$Parser$succeed(
			A2(
				elm$core$List$cons,
				_Utils_Tuple2(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$DeclarationKeyword),
					n),
				revTokens)) : (pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$isLiteralKeyword(n) ? elm$parser$Parser$succeed(
			A2(
				elm$core$List$cons,
				_Utils_Tuple2(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$LiteralKeyword),
					n),
				revTokens)) : A2(
			elm$parser$Parser$loop,
			_List_Nil,
			A2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$functionEvalLoop, n, revTokens))))))));
	});
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$Number = {$: 'Number'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$number = A2(
	elm$parser$Parser$map,
	function (b) {
		return _Utils_Tuple2(
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$Number),
			b);
	},
	elm$parser$Parser$getChompedString(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$number));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$isOperatorChar = function (c) {
	return A2(elm$core$Set$member, c, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$operatorSet);
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$operatorChar = A2(
	elm$parser$Parser$map,
	function (b) {
		return _Utils_Tuple2(
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$Keyword),
			b);
	},
	elm$parser$Parser$getChompedString(
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$isOperatorChar)));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$String = {$: 'String'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$jsEscapable = A2(
	elm$parser$Parser$map,
	function (b) {
		return _List_fromArray(
			[
				_Utils_Tuple2(
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$LiteralKeyword),
				b)
			]);
	},
	elm$parser$Parser$getChompedString(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$escapable));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$quoteDelimiter = {
	defaultMap: function (b) {
		return _Utils_Tuple2(
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$String),
			b);
	},
	end: '\'',
	innerParsers: _List_fromArray(
		[pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$lineBreakList, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$jsEscapable]),
	isNestable: false,
	isNotRelevant: function (c) {
		return !(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isLineBreak(c) || pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isEscapable(c));
	},
	start: '\''
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$doubleQuote = pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimited(
	_Utils_update(
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$quoteDelimiter,
		{end: '\"', start: '\"'}));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$quote = pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimited(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$quoteDelimiter);
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$templateString = pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimited(
	_Utils_update(
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$quoteDelimiter,
		{
			end: '`',
			innerParsers: _List_fromArray(
				[pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$lineBreakList, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$jsEscapable]),
			isNotRelevant: function (c) {
				return !(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isLineBreak(c) || pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isEscapable(c));
			},
			start: '`'
		}));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$stringLiteral = elm$parser$Parser$oneOf(
	_List_fromArray(
		[pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$quote, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$doubleQuote, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$templateString]));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$mainLoop = function (revTokens) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$whitespaceOrCommentStep(revTokens),
				A2(
				elm$parser$Parser$map,
				function (s) {
					return elm$parser$Parser$Loop(
						_Utils_ap(s, revTokens));
				},
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$stringLiteral),
				A2(
				elm$parser$Parser$map,
				function (s) {
					return elm$parser$Parser$Loop(
						A2(elm$core$List$cons, s, revTokens));
				},
				elm$parser$Parser$oneOf(
					_List_fromArray(
						[pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$operatorChar, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$groupChar, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$number]))),
				A2(
				elm$parser$Parser$map,
				elm$parser$Parser$Loop,
				A2(
					elm$parser$Parser$andThen,
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$keywordParser(revTokens),
					elm$parser$Parser$getChompedString(
						pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$isIdentifierNameChar)))),
				elm$parser$Parser$succeed(
				elm$parser$Parser$Done(revTokens))
			]));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$toRevTokens = A2(elm$parser$Parser$loop, _List_Nil, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$mainLoop);
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$toLines = A2(
	elm$core$Basics$composeR,
	elm$parser$Parser$run(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$toRevTokens),
	elm$core$Result$map(
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Helpers$toLines(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$syntaxToStyle)));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$javascript = A2(
	elm$core$Basics$composeR,
	pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$toLines,
	elm$core$Result$map(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$HCode));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$syntaxToStyle = function (syntax) {
	switch (syntax.$) {
		case 'String':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style2, 'json-s');
		case 'Escapable':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style1, 'json-e');
		case 'Number':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style1, 'json-n');
		case 'Boolean':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style3, 'json-b');
		case 'Null':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style3, 'json-null');
		case 'ObjectKey':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style4, 'json-k');
		case 'Object':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Default, 'json-o');
		default:
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Default, 'json-a');
	}
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$Array = {$: 'Array'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$Boolean = {$: 'Boolean'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$Null = {$: 'Null'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$Object = {$: 'Object'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$ObjectKey = {$: 'ObjectKey'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$String = {$: 'String'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$Number = {$: 'Number'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$number = A2(
	elm$parser$Parser$map,
	function (b) {
		return _Utils_Tuple2(
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$Number),
			b);
	},
	elm$parser$Parser$getChompedString(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$number));
var elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$lineBreak = A2(
	elm$parser$Parser$map,
	function (_n0) {
		return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$LineBreak, '\n');
	},
	elm$parser$Parser$symbol('\n'));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$Escapable = {$: 'Escapable'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$escapableSet = elm$core$Set$fromList(
	_List_fromArray(
		[
			_Utils_chr('\"'),
			_Utils_chr('\\'),
			_Utils_chr('/'),
			_Utils_chr('b'),
			_Utils_chr('f'),
			_Utils_chr('n'),
			_Utils_chr('r'),
			_Utils_chr('t'),
			_Utils_chr('u')
		]));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$isEscapableChar = function (c) {
	return A2(elm$core$Set$member, c, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$escapableSet);
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$escapable = A2(
	elm$parser$Parser$ignorer,
	A2(
		elm$parser$Parser$ignorer,
		elm$parser$Parser$succeed(_Utils_Tuple0),
		elm$parser$Parser$backtrackable(
			elm$parser$Parser$symbol('\\'))),
	elm$parser$Parser$chompIf(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$isEscapableChar));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$stringEscapable = A2(
	elm$parser$Parser$map,
	function (b) {
		return _List_fromArray(
			[
				_Utils_Tuple2(
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$Escapable),
				b)
			]);
	},
	elm$parser$Parser$getChompedString(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$escapable));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$doubleQuoteDelimiter = function (syntax_) {
	return {
		defaultMap: function (b) {
			return _Utils_Tuple2(
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(syntax_),
				b);
		},
		end: '\"',
		innerParsers: _List_fromArray(
			[
				A2(elm$parser$Parser$map, elm$core$List$singleton, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$lineBreak),
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$stringEscapable
			]),
		isNestable: false,
		isNotRelevant: function (c) {
			return !(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isLineBreak(c) || pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isEscapable(c));
		},
		start: '\"'
	};
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$stringLiteral = F2(
	function (syntax_, revTokens) {
		return A2(
			elm$parser$Parser$map,
			function (n) {
				return _Utils_ap(n, revTokens);
			},
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimited(
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$doubleQuoteDelimiter(syntax_)));
	});
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$space = A2(
	elm$parser$Parser$map,
	function (b) {
		return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, b);
	},
	elm$parser$Parser$getChompedString(
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isSpace)));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$whitespace = elm$parser$Parser$oneOf(
	_List_fromArray(
		[pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$space, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$lineBreak]));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$arrayLoop = function (revTokens) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				elm$parser$Parser$map,
				function (n) {
					return elm$parser$Parser$Loop(
						A2(elm$core$List$cons, n, revTokens));
				},
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$whitespace),
				A2(
				elm$parser$Parser$map,
				function (n) {
					return elm$parser$Parser$Loop(
						A2(elm$core$List$cons, n, revTokens));
				},
				A2(
					elm$parser$Parser$map,
					function (_n4) {
						return _Utils_Tuple2(
							pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$Array),
							',');
					},
					elm$parser$Parser$symbol(','))),
				A2(
				elm$parser$Parser$map,
				function (n) {
					return elm$parser$Parser$Done(
						A2(elm$core$List$cons, n, revTokens));
				},
				A2(
					elm$parser$Parser$map,
					function (_n5) {
						return _Utils_Tuple2(
							pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$Array),
							']');
					},
					elm$parser$Parser$symbol(']'))),
				A2(
				elm$parser$Parser$map,
				function (ns) {
					return elm$parser$Parser$Loop(
						_Utils_ap(ns, revTokens));
				},
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$cyclic$value()),
				elm$parser$Parser$succeed(
				elm$parser$Parser$Done(revTokens))
			]));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$objectLoop = function (revTokens) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				elm$parser$Parser$map,
				function (n) {
					return elm$parser$Parser$Loop(
						A2(elm$core$List$cons, n, revTokens));
				},
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$whitespace),
				A2(
				elm$parser$Parser$map,
				elm$parser$Parser$Loop,
				A2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$stringLiteral, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$ObjectKey, revTokens)),
				A2(
				elm$parser$Parser$map,
				elm$parser$Parser$Loop,
				A2(
					elm$parser$Parser$andThen,
					function (_n0) {
						var revTokens_ = A2(
							elm$core$List$cons,
							_Utils_Tuple2(
								pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$Object),
								':'),
							revTokens);
						return A2(
							elm$parser$Parser$map,
							function (ns) {
								return _Utils_ap(ns, revTokens_);
							},
							elm$parser$Parser$oneOf(
								_List_fromArray(
									[
										A2(
										elm$parser$Parser$andThen,
										function (ws) {
											return elm$parser$Parser$oneOf(
												_List_fromArray(
													[
														A2(
														elm$parser$Parser$map,
														function (v) {
															return _Utils_ap(
																v,
																_List_fromArray(
																	[ws]));
														},
														pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$cyclic$value()),
														elm$parser$Parser$succeed(
														_List_fromArray(
															[ws]))
													]));
										},
										pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$whitespace),
										pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$cyclic$value(),
										elm$parser$Parser$succeed(_List_Nil)
									])));
					},
					elm$parser$Parser$symbol(':'))),
				A2(
				elm$parser$Parser$map,
				function (n) {
					return elm$parser$Parser$Loop(
						A2(elm$core$List$cons, n, revTokens));
				},
				A2(
					elm$parser$Parser$map,
					function (_n1) {
						return _Utils_Tuple2(
							pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$Object),
							',');
					},
					elm$parser$Parser$symbol(','))),
				A2(
				elm$parser$Parser$map,
				function (n) {
					return elm$parser$Parser$Done(
						A2(elm$core$List$cons, n, revTokens));
				},
				A2(
					elm$parser$Parser$map,
					function (_n2) {
						return _Utils_Tuple2(
							pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$Object),
							'}');
					},
					elm$parser$Parser$symbol('}'))),
				elm$parser$Parser$succeed(
				elm$parser$Parser$Done(revTokens))
			]));
};
function pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$cyclic$value() {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$stringLiteral, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$String, _List_Nil),
				A2(
				elm$parser$Parser$map,
				function (n) {
					return _List_fromArray(
						[n]);
				},
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$number),
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$cyclic$object(),
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$cyclic$array(),
				A2(
				elm$parser$Parser$map,
				function (s) {
					return _List_fromArray(
						[
							_Utils_Tuple2(
							pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$Null),
							s)
						]);
				},
				elm$parser$Parser$getChompedString(
					elm$parser$Parser$keyword('null'))),
				A2(
				elm$parser$Parser$map,
				function (s) {
					return _List_fromArray(
						[
							_Utils_Tuple2(
							pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$Boolean),
							s)
						]);
				},
				elm$parser$Parser$getChompedString(
					elm$parser$Parser$oneOf(
						_List_fromArray(
							[
								elm$parser$Parser$keyword('true'),
								elm$parser$Parser$keyword('false')
							]))))
			]));
}
function pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$cyclic$array() {
	return A2(
		elm$parser$Parser$andThen,
		function (_n6) {
			return A2(
				elm$parser$Parser$loop,
				_List_fromArray(
					[
						_Utils_Tuple2(
						pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$Array),
						'[')
					]),
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$arrayLoop);
		},
		elm$parser$Parser$symbol('['));
}
function pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$cyclic$object() {
	return A2(
		elm$parser$Parser$andThen,
		function (_n3) {
			return A2(
				elm$parser$Parser$loop,
				_List_fromArray(
					[
						_Utils_Tuple2(
						pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$Object),
						'{')
					]),
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$objectLoop);
		},
		elm$parser$Parser$symbol('{'));
}
try {
	var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$value = pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$cyclic$value();
	pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$cyclic$value = function () {
		return pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$value;
	};
	var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$array = pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$cyclic$array();
	pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$cyclic$array = function () {
		return pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$array;
	};
	var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$object = pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$cyclic$object();
	pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$cyclic$object = function () {
		return pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$object;
	};
} catch ($) {
throw 'Some top-level definitions from `SyntaxHighlight.Language.Json` are causing infinite recursion:\n\n  ┌─────┐\n  │    value\n  │     ↓\n  │    array\n  │     ↓\n  │    arrayLoop\n  │     ↓\n  │    object\n  │     ↓\n  │    objectLoop\n  └─────┘\n\nThese errors are very tricky, so read https://elm-lang.org/0.19.0/halting-problem to learn how to fix it!';}
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$mainLoop = function (revTokens) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				elm$parser$Parser$map,
				function (n) {
					return elm$parser$Parser$Loop(
						A2(elm$core$List$cons, n, revTokens));
				},
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$whitespace),
				A2(
				elm$parser$Parser$map,
				function (n) {
					return elm$parser$Parser$Loop(
						_Utils_ap(n, revTokens));
				},
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$object),
				A2(
				elm$parser$Parser$map,
				function (b) {
					return elm$parser$Parser$Loop(
						A2(
							elm$core$List$cons,
							_Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, b),
							revTokens));
				},
				elm$parser$Parser$getChompedString(
					elm$parser$Parser$chompIf(
						elm$core$Basics$always(true)))),
				elm$parser$Parser$succeed(
				elm$parser$Parser$Done(revTokens))
			]));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$toRevTokens = A2(elm$parser$Parser$loop, _List_Nil, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$mainLoop);
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$toLines = A2(
	elm$core$Basics$composeR,
	elm$parser$Parser$run(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$toRevTokens),
	elm$core$Result$map(
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Helpers$toLines(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$syntaxToStyle)));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$json = A2(
	elm$core$Basics$composeR,
	pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Json$toLines,
	elm$core$Result$map(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$HCode));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$NoLang$syntaxToStyle = function (syntax) {
	return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Default, 'nolang');
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$NoLang$lineBreak = A2(
	elm$parser$Parser$map,
	function (_n0) {
		return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$LineBreak, '\n');
	},
	elm$parser$Parser$symbol('\n'));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$NoLang$space = A2(
	elm$parser$Parser$map,
	function (b) {
		return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, b);
	},
	elm$parser$Parser$getChompedString(
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isSpace)));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$NoLang$whitespace = elm$parser$Parser$oneOf(
	_List_fromArray(
		[pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$NoLang$space, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$NoLang$lineBreak]));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$NoLang$mainLoop = function (revTokens) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				elm$parser$Parser$map,
				function (n) {
					return elm$parser$Parser$Loop(
						A2(elm$core$List$cons, n, revTokens));
				},
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$NoLang$whitespace),
				A2(
				elm$parser$Parser$map,
				function (b) {
					return elm$parser$Parser$Loop(
						A2(
							elm$core$List$cons,
							_Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, b),
							revTokens));
				},
				elm$parser$Parser$getChompedString(
					elm$parser$Parser$chompIf(
						elm$core$Basics$always(true)))),
				elm$parser$Parser$succeed(
				elm$parser$Parser$Done(revTokens))
			]));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$NoLang$toRevTokens = A2(elm$parser$Parser$loop, _List_Nil, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$NoLang$mainLoop);
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$NoLang$toLines = A2(
	elm$core$Basics$composeR,
	elm$parser$Parser$run(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$NoLang$toRevTokens),
	elm$core$Result$map(
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Helpers$toLines(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$NoLang$syntaxToStyle)));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$noLang = A2(
	elm$core$Basics$composeR,
	pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$NoLang$toLines,
	elm$core$Result$map(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$HCode));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$syntaxToStyle = function (syntax) {
	switch (syntax.$) {
		case 'Number':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style1, 'py-n');
		case 'String':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style2, 'py-s');
		case 'Keyword':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style3, 'py-k');
		case 'DeclarationKeyword':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style4, 'py-dk');
		case 'Function':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style5, 'py-f');
		case 'LiteralKeyword':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style6, 'py-lk');
		case 'Param':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style7, 'py-p');
		default:
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Default, 'py-fe');
	}
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$groupSet = elm$core$Set$fromList(
	_List_fromArray(
		[
			_Utils_chr('{'),
			_Utils_chr('}'),
			_Utils_chr('('),
			_Utils_chr(')'),
			_Utils_chr('['),
			_Utils_chr(']'),
			_Utils_chr(','),
			_Utils_chr(';')
		]));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$isGroupChar = function (c) {
	return A2(elm$core$Set$member, c, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$groupSet);
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$groupChar = A2(
	elm$parser$Parser$map,
	function (b) {
		return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, b);
	},
	elm$parser$Parser$getChompedString(
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$isGroupChar)));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$isCommentChar = function (c) {
	return _Utils_eq(
		c,
		_Utils_chr('#'));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$operatorSet = elm$core$Set$fromList(
	_List_fromArray(
		[
			_Utils_chr('+'),
			_Utils_chr('-'),
			_Utils_chr('*'),
			_Utils_chr('/'),
			_Utils_chr('='),
			_Utils_chr('!'),
			_Utils_chr('<'),
			_Utils_chr('>'),
			_Utils_chr('&'),
			_Utils_chr('|'),
			_Utils_chr('?'),
			_Utils_chr('^'),
			_Utils_chr(':'),
			_Utils_chr('~'),
			_Utils_chr('%'),
			_Utils_chr('.')
		]));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$punctuationSet = A2(elm$core$Set$union, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$operatorSet, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$groupSet);
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$isPunctuation = function (c) {
	return A2(elm$core$Set$member, c, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$punctuationSet);
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$isStringLiteralChar = function (c) {
	return _Utils_eq(
		c,
		_Utils_chr('\"')) || _Utils_eq(
		c,
		_Utils_chr('\''));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$isIdentifierNameChar = function (c) {
	return !(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$isPunctuation(c) || (pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$isStringLiteralChar(c) || (pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$isCommentChar(c) || pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isWhitespace(c))));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$DeclarationKeyword = {$: 'DeclarationKeyword'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$FunctionEval = {$: 'FunctionEval'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$Keyword = {$: 'Keyword'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$LiteralKeyword = {$: 'LiteralKeyword'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$Function = {$: 'Function'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$inlineComment = A2(
	elm$parser$Parser$map,
	function (b) {
		return _List_fromArray(
			[
				_Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Comment, b)
			]);
	},
	elm$parser$Parser$getChompedString(
		A2(
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$thenChompWhile,
			A2(elm$core$Basics$composeL, elm$core$Basics$not, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isLineBreak),
			elm$parser$Parser$symbol('#'))));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$lineBreak = A2(
	elm$parser$Parser$map,
	function (_n0) {
		return _List_fromArray(
			[
				_Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$LineBreak, '\n')
			]);
	},
	elm$parser$Parser$symbol('\n'));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$multilineComment = pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimited(
	{
		defaultMap: function (b) {
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Comment, b);
		},
		end: '\'\'\'',
		innerParsers: _List_fromArray(
			[pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$lineBreak]),
		isNestable: false,
		isNotRelevant: function (c) {
			return !pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isLineBreak(c);
		},
		start: '\'\'\''
	});
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$comment = elm$parser$Parser$oneOf(
	_List_fromArray(
		[pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$inlineComment, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$multilineComment]));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$whitespaceOrCommentStep = function (revTokens) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				elm$parser$Parser$map,
				function (s) {
					return elm$parser$Parser$Loop(
						A2(
							elm$core$List$cons,
							_Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, s),
							revTokens));
				},
				elm$parser$Parser$getChompedString(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isSpace))),
				A2(
				elm$parser$Parser$map,
				function (ns) {
					return elm$parser$Parser$Loop(
						_Utils_ap(ns, revTokens));
				},
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$lineBreak),
				A2(
				elm$parser$Parser$map,
				function (ns) {
					return elm$parser$Parser$Loop(
						_Utils_ap(ns, revTokens));
				},
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$comment)
			]));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$classDeclarationLoop = function (revTokens) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$whitespaceOrCommentStep(revTokens),
				A2(
				elm$parser$Parser$map,
				function (b) {
					return elm$parser$Parser$Loop(
						A2(
							elm$core$List$cons,
							_Utils_Tuple2(
								pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$Function),
								b),
							revTokens));
				},
				elm$parser$Parser$getChompedString(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$isIdentifierNameChar))),
				elm$parser$Parser$succeed(
				elm$parser$Parser$Done(revTokens))
			]));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$Param = {$: 'Param'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$argLoop = function (revTokens) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$whitespaceOrCommentStep(revTokens),
				A2(
				elm$parser$Parser$map,
				function (b) {
					return elm$parser$Parser$Loop(
						A2(
							elm$core$List$cons,
							_Utils_Tuple2(
								pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$Param),
								b),
							revTokens));
				},
				elm$parser$Parser$getChompedString(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(
						function (c) {
							return !(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$isCommentChar(c) || (pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isWhitespace(c) || (_Utils_eq(
								c,
								_Utils_chr(',')) || _Utils_eq(
								c,
								_Utils_chr(')')))));
						}))),
				A2(
				elm$parser$Parser$map,
				function (b) {
					return elm$parser$Parser$Loop(
						A2(
							elm$core$List$cons,
							_Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, b),
							revTokens));
				},
				elm$parser$Parser$getChompedString(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(
						function (c) {
							return _Utils_eq(
								c,
								_Utils_chr('/')) || _Utils_eq(
								c,
								_Utils_chr(','));
						}))),
				elm$parser$Parser$succeed(
				elm$parser$Parser$Done(revTokens))
			]));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$functionDeclarationLoop = function (revTokens) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$whitespaceOrCommentStep(revTokens),
				A2(
				elm$parser$Parser$map,
				function (b) {
					return elm$parser$Parser$Loop(
						A2(
							elm$core$List$cons,
							_Utils_Tuple2(
								pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$Function),
								b),
							revTokens));
				},
				elm$parser$Parser$getChompedString(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$isIdentifierNameChar))),
				A2(
				elm$parser$Parser$map,
				elm$parser$Parser$Loop,
				A2(
					elm$parser$Parser$andThen,
					function (_n0) {
						return A2(
							elm$parser$Parser$loop,
							A2(
								elm$core$List$cons,
								_Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, '('),
								revTokens),
							pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$argLoop);
					},
					elm$parser$Parser$symbol('('))),
				elm$parser$Parser$succeed(
				elm$parser$Parser$Done(revTokens))
			]));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$functionEvalLoop = function (revTokens) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$whitespaceOrCommentStep(revTokens),
				A2(
				elm$parser$Parser$map,
				function (_n0) {
					return elm$parser$Parser$Done(
						A2(
							elm$core$List$cons,
							_Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, '('),
							revTokens));
				},
				elm$parser$Parser$symbol('(')),
				elm$parser$Parser$succeed(
				elm$parser$Parser$Done(revTokens))
			]));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$keywordSet = elm$core$Set$fromList(
	_List_fromArray(
		['finally', 'is', 'return', 'continue', 'for', 'lambda', 'try', 'from', 'nonlocal', 'while', 'and', 'del', 'global', 'not', 'with', 'as', 'elif', 'if', 'or', 'yield', 'assert', 'else', 'import', 'pass', 'break', 'except', 'in', 'raise']));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$isKeyword = function (str) {
	return A2(elm$core$Set$member, str, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$keywordSet);
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$literalKeywordSet = elm$core$Set$fromList(
	_List_fromArray(
		['True', 'False', 'None']));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$isLiteralKeyword = function (str) {
	return A2(elm$core$Set$member, str, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$literalKeywordSet);
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$keywordParser = F2(
	function (revTokens, n) {
		return (n === 'def') ? A2(
			elm$parser$Parser$loop,
			A2(
				elm$core$List$cons,
				_Utils_Tuple2(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$DeclarationKeyword),
					n),
				revTokens),
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$functionDeclarationLoop) : ((n === 'class') ? A2(
			elm$parser$Parser$loop,
			A2(
				elm$core$List$cons,
				_Utils_Tuple2(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$DeclarationKeyword),
					n),
				revTokens),
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$classDeclarationLoop) : (pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$isKeyword(n) ? elm$parser$Parser$succeed(
			A2(
				elm$core$List$cons,
				_Utils_Tuple2(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$Keyword),
					n),
				revTokens)) : (pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$isLiteralKeyword(n) ? elm$parser$Parser$succeed(
			A2(
				elm$core$List$cons,
				_Utils_Tuple2(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$LiteralKeyword),
					n),
				revTokens)) : A2(
			elm$parser$Parser$loop,
			A2(
				elm$core$List$cons,
				_Utils_Tuple2(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$FunctionEval),
					n),
				revTokens),
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$functionEvalLoop))));
	});
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$Number = {$: 'Number'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$number = A2(
	elm$parser$Parser$map,
	function (b) {
		return _Utils_Tuple2(
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$Number),
			b);
	},
	elm$parser$Parser$getChompedString(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$number));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$isOperatorChar = function (c) {
	return A2(elm$core$Set$member, c, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$operatorSet);
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$operatorChar = A2(
	elm$parser$Parser$map,
	function (b) {
		return _Utils_Tuple2(
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$Keyword),
			b);
	},
	elm$parser$Parser$getChompedString(
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$isOperatorChar)));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$String = {$: 'String'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$quoteDelimiter = {
	defaultMap: function (b) {
		return _Utils_Tuple2(
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$String),
			b);
	},
	end: '\'',
	innerParsers: _List_fromArray(
		[pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$lineBreak]),
	isNestable: false,
	isNotRelevant: function (c) {
		return !(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isLineBreak(c) || pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isEscapable(c));
	},
	start: '\''
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$doubleQuote = pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimited(
	_Utils_update(
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$quoteDelimiter,
		{end: '\"', start: '\"'}));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$quote = pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimited(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$quoteDelimiter);
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$stringLiteral = elm$parser$Parser$oneOf(
	_List_fromArray(
		[pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$quote, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$doubleQuote]));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$mainLoop = function (revTokens) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$whitespaceOrCommentStep(revTokens),
				A2(
				elm$parser$Parser$map,
				function (s) {
					return elm$parser$Parser$Loop(
						_Utils_ap(s, revTokens));
				},
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$stringLiteral),
				A2(
				elm$parser$Parser$map,
				function (s) {
					return elm$parser$Parser$Loop(
						A2(elm$core$List$cons, s, revTokens));
				},
				elm$parser$Parser$oneOf(
					_List_fromArray(
						[pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$operatorChar, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$groupChar, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$number]))),
				A2(
				elm$parser$Parser$map,
				elm$parser$Parser$Loop,
				A2(
					elm$parser$Parser$andThen,
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$keywordParser(revTokens),
					elm$parser$Parser$getChompedString(
						pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$isIdentifierNameChar)))),
				elm$parser$Parser$succeed(
				elm$parser$Parser$Done(revTokens))
			]));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$toRevTokens = A2(elm$parser$Parser$loop, _List_Nil, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$mainLoop);
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$toLines = A2(
	elm$core$Basics$composeR,
	elm$parser$Parser$run(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$toRevTokens),
	elm$core$Result$map(
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Helpers$toLines(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$syntaxToStyle)));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$python = A2(
	elm$core$Basics$composeR,
	pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$toLines,
	elm$core$Result$map(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$HCode));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$syntaxToStyle = function (syntax) {
	switch (syntax.$) {
		case 'Number':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style1, 'sql-n');
		case 'String':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style2, 'sql-s');
		case 'Keyword':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style3, 'sql-k');
		case 'Operator':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style4, 'sql-o');
		case 'Function':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style5, 'sql-f');
		case 'Punctuation':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style6, 'sql-p');
		default:
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style7, 'sql-l');
	}
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$inlineComment = elm$parser$Parser$oneOf(
	A2(
		elm$core$List$map,
		A2(
			elm$core$Basics$composeR,
			elm$parser$Parser$symbol,
			A2(
				elm$core$Basics$composeR,
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$thenChompWhile(
					A2(elm$core$Basics$composeL, elm$core$Basics$not, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isLineBreak)),
				A2(
					elm$core$Basics$composeR,
					elm$parser$Parser$getChompedString,
					elm$parser$Parser$map(
						function (b) {
							return _List_fromArray(
								[
									_Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Comment, b)
								]);
						})))),
		_List_fromArray(
			['--', '$', '#'])));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$lineBreakList = A2(
	elm$parser$Parser$map,
	function (_n0) {
		return _List_fromArray(
			[
				_Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$LineBreak, '\n')
			]);
	},
	elm$parser$Parser$symbol('\n'));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$multilineComment = pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimited(
	{
		defaultMap: function (b) {
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Comment, b);
		},
		end: '*/',
		innerParsers: _List_fromArray(
			[pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$lineBreakList]),
		isNestable: false,
		isNotRelevant: A2(elm$core$Basics$composeL, elm$core$Basics$not, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isLineBreak),
		start: '/*'
	});
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$comment = elm$parser$Parser$oneOf(
	_List_fromArray(
		[pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$inlineComment, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$multilineComment]));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$punctuatorSet = elm$core$Set$fromList(
	_List_fromArray(
		[
			_Utils_chr(';'),
			_Utils_chr('['),
			_Utils_chr(']'),
			_Utils_chr('('),
			_Utils_chr(')'),
			_Utils_chr('`'),
			_Utils_chr(','),
			_Utils_chr('.')
		]));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$isPunctuationChar = function (c) {
	return A2(elm$core$Set$member, c, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$punctuatorSet);
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$isIdentifierChar = function (c) {
	return !(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isWhitespace(c) || pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$isPunctuationChar(c));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$Function = {$: 'Function'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$Keyword = {$: 'Keyword'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$Literal = {$: 'Literal'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$Operator = {$: 'Operator'};
var elm$core$String$toUpper = _String_toUpper;
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$functionSet = elm$core$Set$fromList(
	_List_fromArray(
		['AVG', 'COUNT', 'FIRST', 'FORMAT', 'LAST', 'LCASE', 'LEN', 'MAX', 'MID', 'MIN', 'MOD', 'NOW', 'ROUND', 'SUM', 'UCASE']));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$isFunction = function (str) {
	return A2(
		elm$core$Set$member,
		elm$core$String$toUpper(str),
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$functionSet);
};
var elm$regex$Regex$contains = _Regex_contains;
var elm$regex$Regex$never = _Regex_never;
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$keywordPattern = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	A2(
		elm$regex$Regex$fromStringWith,
		{caseInsensitive: true, multiline: false},
		'^(ACTION|ADD|AFTER|ALGORITHM|ALL|ALTER|ANALYZE|ANY|APPLY|AS|ASC|AUTHORIZATION|AUTO_INCREMENT|BACKUP|BDB|BEGIN|BERKELEYDB|BIGINT|BINARY|BIT|BLOB|BOOL|BOOLEAN|BREAK|BROWSE|BTREE|BULK|BY|CALL|CASCADED?|CASE|CHAIN|CHAR(?:ACTER|SET)?|CHECK(?:POINT)?|CLOSE|CLUSTERED|COALESCE|COLLATE|COLUMNS?|COMMENT|COMMIT(?:TED)?|COMPUTE|CONNECT|CONSISTENT|CONSTRAINT|CONTAINS(?:TABLE)?|CONTINUE|CONVERT|CREATE|CROSS|CURRENT(?:_DATE|_TIME|_TIMESTAMP|_USER)?|CURSOR|CYCLE|DATA(?:BASES?)?|DATE(?:TIME)?|DAY|DBCC|DEALLOCATE|DEC|DECIMAL|DECLARE|DEFAULT|DEFINER|DELAYED|DELETE|DELIMITERS?|DENY|DESC|DESCRIBE|DETERMINISTIC|DISABLE|DISCARD|DISK|DISTINCT|DISTINCTROW|DISTRIBUTED|DO|DOUBLE|DROP|DUMMY|DUMP(?:FILE)?|DUPLICATE|ELSE(?:IF)?|ENABLE|ENCLOSED|END|ENGINE|ENUM|ERRLVL|ERRORS|ESCAPED?|EXCEPT|EXEC(?:UTE)?|EXISTS|EXIT|EXPLAIN|EXTENDED|FETCH|FIELDS|FILE|FILLFACTOR|FIRST|FIXED|FLOAT|FOLLOWING|FOR(?: EACH ROW)?|FORCE|FOREIGN|FREETEXT(?:TABLE)?|FROM|FULL|FUNCTION|GEOMETRY(?:COLLECTION)?|GLOBAL|GOTO|GRANT|GROUP|HANDLER|HASH|HAVING|HOLDLOCK|HOUR|IDENTITY(?:_INSERT|COL)?|IF|IGNORE|IMPORT|INDEX|INFILE|INNER|INNODB|INOUT|INSERT|INT|INTEGER|INTERSECT|INTERVAL|INTO|INVOKER|ISOLATION|ITERATE|JOIN|KEYS?|KILL|LANGUAGE|LAST|LEAVE|LEFT|LEVEL|LIMIT|LINENO|LINES|LINESTRING|LOAD|LOCAL|LOCK|LONG(?:BLOB|TEXT)|LOOP|MATCH(?:ED)?|MEDIUM(?:BLOB|INT|TEXT)|MERGE|MIDDLEINT|MINUTE|MODE|MODIFIES|MODIFY|MONTH|MULTI(?:LINESTRING|POINT|POLYGON)|NATIONAL|NATURAL|NCHAR|NEXT|NO|NONCLUSTERED|NULLIF|NUMERIC|OFF?|OFFSETS?|ON|OPEN(?:DATASOURCE|QUERY|ROWSET)?|OPTIMIZE|OPTION(?:ALLY)?|ORDER|OUT(?:ER|FILE)?|OVER|PARTIAL|PARTITION|PERCENT|PIVOT|PLAN|POINT|POLYGON|PRECEDING|PRECISION|PREPARE|PREV|PRIMARY|PRINT|PRIVILEGES|PROC(?:EDURE)?|PUBLIC|PURGE|QUICK|RAISERROR|READS?|REAL|RECONFIGURE|REFERENCES|RELEASE|RENAME|REPEAT(?:ABLE)?|REPLACE|REPLICATION|REQUIRE|RESIGNAL|RESTORE|RESTRICT|RETURNS?|REVOKE|RIGHT|ROLLBACK|ROUTINE|ROW(?:COUNT|GUIDCOL|S)?|RTREE|RULE|SAVE(?:POINT)?|SCHEMA|SECOND|SELECT|SERIAL(?:IZABLE)?|SESSION(?:_USER)?|SET(?:USER)?|SHARE|SHOW|SHUTDOWN|SIMPLE|SMALLINT|SNAPSHOT|SOME|SONAME|SQL|START(?:ING)?|STATISTICS|STATUS|STRIPED|SYSTEM_USER|TABLES?|TABLESPACE|TEMP(?:ORARY|TABLE)?|TERMINATED|TEXT(?:SIZE)?|THEN|TIME(?:STAMP)?|TINY(?:BLOB|INT|TEXT)|TOP?|TRAN(?:SACTIONS?)?|TRIGGER|TRUNCATE|TSEQUAL|TYPES?|UNBOUNDED|UNCOMMITTED|UNDEFINED|UNION|UNIQUE|UNLOCK|UNPIVOT|UNSIGNED|UPDATE(?:TEXT)?|USAGE|USE|USER|USING|VALUES?|VAR(?:BINARY|CHAR|CHARACTER|YING)|VIEW|WAITFOR|WARNINGS|WHEN|WHERE|WHILE|WITH(?: ROLLUP|IN)?|WORK|WRITE(?:TEXT)?|YEAR)$'));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$isKeyword = elm$regex$Regex$contains(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$keywordPattern);
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$literalSet = elm$core$Set$fromList(
	_List_fromArray(
		['TRUE', 'FALSE', 'NULL']));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$isLiteral = function (str) {
	return A2(
		elm$core$Set$member,
		elm$core$String$toUpper(str),
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$literalSet);
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$operatorPattern = A2(
	elm$core$Maybe$withDefault,
	elm$regex$Regex$never,
	A2(
		elm$regex$Regex$fromStringWith,
		{caseInsensitive: true, multiline: false},
		'^([-+*\\/=%^~]|&&?|\\|\\|?|!=?|<(?:=>?|<|>)?|>[>=]?|AND|BETWEEN|IN|LIKE|NOT|OR|IS|DIV|REGEXP|RLIKE|SOUNDS LIKE|XOR)$'));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$isOperator = elm$regex$Regex$contains(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$operatorPattern);
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$keywordParser = F2(
	function (revTokens, s) {
		return pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$isOperator(s) ? elm$parser$Parser$succeed(
			A2(
				elm$core$List$cons,
				_Utils_Tuple2(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$Operator),
					s),
				revTokens)) : (pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$isFunction(s) ? elm$parser$Parser$succeed(
			A2(
				elm$core$List$cons,
				_Utils_Tuple2(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$Function),
					s),
				revTokens)) : (pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$isKeyword(s) ? elm$parser$Parser$succeed(
			A2(
				elm$core$List$cons,
				_Utils_Tuple2(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$Keyword),
					s),
				revTokens)) : (pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$isLiteral(s) ? elm$parser$Parser$succeed(
			A2(
				elm$core$List$cons,
				_Utils_Tuple2(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$Literal),
					s),
				revTokens)) : elm$parser$Parser$succeed(
			A2(
				elm$core$List$cons,
				_Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, s),
				revTokens)))));
	});
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$lineBreak = A2(
	elm$parser$Parser$map,
	function (_n0) {
		return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$LineBreak, '\n');
	},
	elm$parser$Parser$symbol('\n'));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$Number = {$: 'Number'};
var elm$core$Char$isHexDigit = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return ((48 <= code) && (code <= 57)) || (((65 <= code) && (code <= 70)) || ((97 <= code) && (code <= 102)));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$hexNumber = A2(
	elm$parser$Parser$ignorer,
	A2(
		elm$parser$Parser$ignorer,
		elm$parser$Parser$succeed(_Utils_Tuple0),
		elm$parser$Parser$backtrackable(
			elm$parser$Parser$symbol('0x'))),
	pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(elm$core$Char$isHexDigit));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$number = A2(
	elm$parser$Parser$map,
	function (b) {
		return _Utils_Tuple2(
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$Number),
			b);
	},
	elm$parser$Parser$getChompedString(
		elm$parser$Parser$oneOf(
			_List_fromArray(
				[pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$hexNumber, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$number]))));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$Punctuation = {$: 'Punctuation'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$punctuationChar = A2(
	elm$parser$Parser$map,
	function (b) {
		return _Utils_Tuple2(
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$Punctuation),
			b);
	},
	elm$parser$Parser$getChompedString(
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$isPunctuationChar)));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$space = A2(
	elm$parser$Parser$map,
	function (b) {
		return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, b);
	},
	elm$parser$Parser$getChompedString(
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isSpace)));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$String = {$: 'String'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$sqlEscapable = A2(
	elm$parser$Parser$map,
	function (b) {
		return _List_fromArray(
			[
				_Utils_Tuple2(
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$Function),
				b)
			]);
	},
	elm$parser$Parser$getChompedString(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$escapable));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$quoteDelimiter = {
	defaultMap: function (b) {
		return _Utils_Tuple2(
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$String),
			b);
	},
	end: '\'',
	innerParsers: _List_fromArray(
		[pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$lineBreakList, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$sqlEscapable]),
	isNestable: false,
	isNotRelevant: function (c) {
		return !(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isLineBreak(c) || pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isEscapable(c));
	},
	start: '\''
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$doubleQuote = pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimited(
	_Utils_update(
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$quoteDelimiter,
		{end: '\"', start: '\"'}));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$quote = pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimited(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$quoteDelimiter);
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$stringLiteral = elm$parser$Parser$oneOf(
	_List_fromArray(
		[pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$quote, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$doubleQuote]));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$checkContext = function (revTokens) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$whitespaceOrCommentStep(revTokens),
				elm$parser$Parser$succeed(
				elm$parser$Parser$Done(revTokens))
			]));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$whitespaceOrCommentStep = function (revTokens) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				elm$parser$Parser$map,
				function (s) {
					return elm$parser$Parser$Loop(
						A2(elm$core$List$cons, s, revTokens));
				},
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$space),
				A2(
				elm$parser$Parser$andThen,
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$checkContext,
				A2(
					elm$parser$Parser$map,
					function (s) {
						return A2(elm$core$List$cons, s, revTokens);
					},
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$lineBreak)),
				A2(
				elm$parser$Parser$map,
				function (s) {
					return elm$parser$Parser$Loop(
						_Utils_ap(s, revTokens));
				},
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$comment)
			]));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$stringBody = function (revTokens) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$whitespaceOrCommentStep(revTokens),
				A2(
				elm$parser$Parser$map,
				function (s) {
					return elm$parser$Parser$Loop(
						_Utils_ap(s, revTokens));
				},
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$stringLiteral),
				elm$parser$Parser$succeed(
				elm$parser$Parser$Done(revTokens))
			]));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$mainLoop = function (revTokens) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				elm$parser$Parser$map,
				function (n) {
					return elm$parser$Parser$Loop(
						A2(elm$core$List$cons, n, revTokens));
				},
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$space),
				A2(
				elm$parser$Parser$map,
				function (n) {
					return elm$parser$Parser$Loop(
						A2(elm$core$List$cons, n, revTokens));
				},
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$lineBreak),
				A2(
				elm$parser$Parser$map,
				function (n) {
					return elm$parser$Parser$Loop(
						A2(elm$core$List$cons, n, revTokens));
				},
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$punctuationChar),
				A2(
				elm$parser$Parser$map,
				function (n) {
					return elm$parser$Parser$Loop(
						A2(elm$core$List$cons, n, revTokens));
				},
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$number),
				A2(
				elm$parser$Parser$map,
				function (n) {
					return elm$parser$Parser$Loop(
						_Utils_ap(n, revTokens));
				},
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$comment),
				A2(
				elm$parser$Parser$map,
				elm$parser$Parser$Loop,
				A2(
					elm$parser$Parser$andThen,
					function (n) {
						return A2(
							elm$parser$Parser$loop,
							_Utils_ap(n, revTokens),
							pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$stringBody);
					},
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$stringLiteral)),
				A2(
				elm$parser$Parser$map,
				elm$parser$Parser$Loop,
				A2(
					elm$parser$Parser$andThen,
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$keywordParser(revTokens),
					elm$parser$Parser$getChompedString(
						pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$isIdentifierChar)))),
				elm$parser$Parser$succeed(
				elm$parser$Parser$Done(revTokens))
			]));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$toRevTokens = A2(elm$parser$Parser$loop, _List_Nil, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$mainLoop);
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$toLines = A2(
	elm$core$Basics$composeR,
	elm$parser$Parser$run(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$toRevTokens),
	elm$core$Result$map(
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Helpers$toLines(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$syntaxToStyle)));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$sql = A2(
	elm$core$Basics$composeR,
	pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$toLines,
	elm$core$Result$map(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$HCode));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$syntaxToStyle = function (syntax) {
	switch (syntax.$) {
		case 'Tag':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style3, 'xml-t');
		case 'Attribute':
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style5, 'xml-a');
		default:
			return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Style2, 'xlm-av');
	}
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$AttributeValue = {$: 'AttributeValue'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$lineBreak = A2(
	elm$parser$Parser$map,
	function (_n0) {
		return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$LineBreak, '\n');
	},
	elm$parser$Parser$symbol('\n'));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$lineBreakList = A2(elm$parser$Parser$map, elm$core$List$singleton, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$lineBreak);
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$doubleQuoteDelimiter = {
	defaultMap: function (b) {
		return _Utils_Tuple2(
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$AttributeValue),
			b);
	},
	end: '\"',
	innerParsers: _List_fromArray(
		[pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$lineBreakList]),
	isNestable: false,
	isNotRelevant: A2(elm$core$Basics$composeL, elm$core$Basics$not, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isLineBreak),
	start: '\"'
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$comment = pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimited(
	_Utils_update(
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$doubleQuoteDelimiter,
		{
			defaultMap: function (b) {
				return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Comment, b);
			},
			end: '-->',
			start: '<!--'
		}));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$openTagParser = A2(
	elm$parser$Parser$ignorer,
	A2(
		elm$parser$Parser$ignorer,
		elm$parser$Parser$succeed(_Utils_Tuple0),
		elm$parser$Parser$chompIf(
			function (c) {
				return _Utils_eq(
					c,
					_Utils_chr('<'));
			})),
	elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				elm$parser$Parser$chompIf(
				function (c) {
					return _Utils_eq(
						c,
						_Utils_chr('/')) || (_Utils_eq(
						c,
						_Utils_chr('!')) || _Utils_eq(
						c,
						_Utils_chr('?')));
				}),
				elm$parser$Parser$succeed(_Utils_Tuple0)
			])));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$Tag = {$: 'Tag'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$Attribute = {$: 'Attribute'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$doubleQuote = pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimited(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$doubleQuoteDelimiter);
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$quote = pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$delimited(
	_Utils_update(
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$doubleQuoteDelimiter,
		{end: '\'', start: '\''}));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$attributeValue = elm$parser$Parser$oneOf(
	_List_fromArray(
		[
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$doubleQuote,
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$quote,
			A2(
			elm$parser$Parser$map,
			function (b) {
				return _List_fromArray(
					[
						_Utils_Tuple2(
						pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$AttributeValue),
						b)
					]);
			},
			elm$parser$Parser$getChompedString(
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(
					function (c) {
						return (!pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isWhitespace(c)) && (!_Utils_eq(
							c,
							_Utils_chr('>')));
					})))
		]));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$whitespace = elm$parser$Parser$oneOf(
	_List_fromArray(
		[
			A2(
			elm$parser$Parser$map,
			function (s) {
				return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, s);
			},
			elm$parser$Parser$getChompedString(
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isSpace))),
			pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$lineBreak
		]));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$attributeValueLoop = function (revTokens) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A3(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$consThen, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$attributeValueLoop, revTokens, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$whitespace),
				A3(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$addThen, elm$parser$Parser$succeed, revTokens, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$attributeValue),
				elm$parser$Parser$succeed(revTokens)
			]));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$attributeConfirm = function (revTokens) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A3(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$consThen, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$attributeConfirm, revTokens, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$whitespace),
				A3(
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$consThen,
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$attributeValueLoop,
				revTokens,
				A2(
					elm$parser$Parser$map,
					function (_n0) {
						return _Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, '=');
					},
					elm$parser$Parser$symbol('='))),
				elm$parser$Parser$succeed(revTokens)
			]));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$isStartTagChar = function (c) {
	return elm$core$Char$isUpper(c) || (elm$core$Char$isLower(c) || elm$core$Char$isDigit(c));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$isTagChar = function (c) {
	return pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$isStartTagChar(c) || _Utils_eq(
		c,
		_Utils_chr('-'));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$isAttributeChar = function (c) {
	return pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$isTagChar(c) || _Utils_eq(
		c,
		_Utils_chr('_'));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$attributeLoop = function (revTokens) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				elm$parser$Parser$map,
				elm$parser$Parser$Loop,
				A3(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$consThen,
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$attributeConfirm,
					revTokens,
					A2(
						elm$parser$Parser$map,
						function (b) {
							return _Utils_Tuple2(
								pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$Attribute),
								b);
						},
						elm$parser$Parser$getChompedString(
							pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$isAttributeChar))))),
				A2(
				elm$parser$Parser$map,
				function (n) {
					return elm$parser$Parser$Loop(
						A2(elm$core$List$cons, n, revTokens));
				},
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$whitespace),
				A2(
				elm$parser$Parser$map,
				function (b) {
					return elm$parser$Parser$Loop(
						A2(
							elm$core$List$cons,
							_Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, b),
							revTokens));
				},
				elm$parser$Parser$getChompedString(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(
						function (c) {
							return (!pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isWhitespace(c)) && (!_Utils_eq(
								c,
								_Utils_chr('>')));
						}))),
				elm$parser$Parser$succeed(
				elm$parser$Parser$Done(revTokens))
			]));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$tag = function (revTokens) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				elm$parser$Parser$andThen,
				function (n) {
					return A2(
						elm$parser$Parser$loop,
						A2(elm$core$List$cons, n, revTokens),
						pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$attributeLoop);
				},
				A2(
					elm$parser$Parser$map,
					function (b) {
						return _Utils_Tuple2(
							pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$C(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$Tag),
							b);
					},
					elm$parser$Parser$getChompedString(
						A2(
							pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$thenChompWhile,
							pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$isTagChar,
							elm$parser$Parser$chompIf(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$isStartTagChar))))),
				elm$parser$Parser$succeed(revTokens)
			]));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$openTag = function (revTokens) {
	return A2(
		elm$parser$Parser$andThen,
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$tag,
		A2(
			elm$parser$Parser$map,
			function (b) {
				return A2(
					elm$core$List$cons,
					_Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, b),
					revTokens);
			},
			elm$parser$Parser$getChompedString(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$openTagParser)));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$mainLoop = function (revTokens) {
	return elm$parser$Parser$oneOf(
		_List_fromArray(
			[
				A2(
				elm$parser$Parser$map,
				function (n) {
					return elm$parser$Parser$Loop(
						A2(elm$core$List$cons, n, revTokens));
				},
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$whitespace),
				A2(
				elm$parser$Parser$map,
				function (n) {
					return elm$parser$Parser$Loop(
						_Utils_ap(n, revTokens));
				},
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$comment),
				A2(
				elm$parser$Parser$map,
				function (n) {
					return elm$parser$Parser$Loop(
						A2(
							elm$core$List$cons,
							_Utils_Tuple2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Type$Normal, n),
							revTokens));
				},
				elm$parser$Parser$getChompedString(
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$chompIfThenWhile(
						function (c) {
							return (!_Utils_eq(
								c,
								_Utils_chr('<'))) && (!pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Helpers$isLineBreak(c));
						}))),
				A2(
				elm$parser$Parser$map,
				elm$parser$Parser$Loop,
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$openTag(revTokens)),
				elm$parser$Parser$succeed(
				elm$parser$Parser$Done(revTokens))
			]));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$toRevTokens = A2(elm$parser$Parser$loop, _List_Nil, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$mainLoop);
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$toLines = A2(
	elm$core$Basics$composeR,
	elm$parser$Parser$run(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$toRevTokens),
	elm$core$Result$map(
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Helpers$toLines(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$syntaxToStyle)));
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$xml = A2(
	elm$core$Basics$composeR,
	pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$toLines,
	elm$core$Result$map(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$HCode));
var jxxcarlson$meenylatex$Internal$Render$getLang = function (langString) {
	switch (langString) {
		case 'elm':
			return pablohirafuji$elm_syntax_highlight$SyntaxHighlight$elm;
		case 'haskell':
			return pablohirafuji$elm_syntax_highlight$SyntaxHighlight$elm;
		case 'js':
			return pablohirafuji$elm_syntax_highlight$SyntaxHighlight$javascript;
		case 'xml':
			return pablohirafuji$elm_syntax_highlight$SyntaxHighlight$xml;
		case 'css':
			return pablohirafuji$elm_syntax_highlight$SyntaxHighlight$css;
		case 'python':
			return pablohirafuji$elm_syntax_highlight$SyntaxHighlight$python;
		case 'sql':
			return pablohirafuji$elm_syntax_highlight$SyntaxHighlight$sql;
		case 'json':
			return pablohirafuji$elm_syntax_highlight$SyntaxHighlight$json;
		case 'nolang':
			return pablohirafuji$elm_syntax_highlight$SyntaxHighlight$noLang;
		default:
			return pablohirafuji$elm_syntax_highlight$SyntaxHighlight$noLang;
	}
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Theme = function (a) {
	return {$: 'Theme', a: a};
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Hex = function (a) {
	return {$: 'Hex', a: a};
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$DefaultColor = {$: 'DefaultColor'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$backgroundColor = function (background) {
	return {background: background, isBold: false, isItalic: false, isUnderline: false, text: pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$DefaultColor};
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$noEmphasis = F2(
	function (text, background) {
		return {background: background, isBold: false, isItalic: false, isUnderline: false, text: text};
	});
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$textColor = function (text) {
	return {background: pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$DefaultColor, isBold: false, isItalic: false, isUnderline: false, text: text};
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Theme$GitHub$requiredStyles = {
	addition: pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$backgroundColor(
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Hex('#eaffea')),
	comment: pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$textColor(
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Hex('#969896')),
	_default: A2(
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$noEmphasis,
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Hex('#24292e'),
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Hex('#ffffff')),
	deletion: pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$backgroundColor(
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Hex('#ffecec')),
	highlight: pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$backgroundColor(
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Hex('#fffbdd')),
	style1: pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$textColor(
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Hex('#005cc5')),
	style2: pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$textColor(
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Hex('#df5000')),
	style3: pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$textColor(
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Hex('#d73a49')),
	style4: pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$textColor(
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Hex('#0086b3')),
	style5: pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$textColor(
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Hex('#63a35c')),
	style6: pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$textColor(
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Hex('#005cc5')),
	style7: pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$textColor(
		pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Hex('#795da3'))
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Theme$GitHub$theme = {customStyles: _List_Nil, requiredStyles: pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Theme$GitHub$requiredStyles};
var elm$core$Tuple$mapFirst = F2(
	function (func, _n0) {
		var x = _n0.a;
		var y = _n0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var elm$core$String$concat = function (strings) {
	return A2(elm$core$String$join, '', strings);
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$colorToCss = F2(
	function (property, color) {
		switch (color.$) {
			case 'DefaultColor':
				return '';
			case 'Hex':
				var hex = color.a;
				return property + (hex + ';');
			case 'Rgb':
				var r = color.a;
				var g = color.b;
				var b = color.c;
				return elm$core$String$concat(
					_List_fromArray(
						[
							property,
							'rgb(',
							elm$core$String$fromInt(r),
							', ',
							elm$core$String$fromInt(g),
							',',
							elm$core$String$fromInt(b),
							');'
						]));
			default:
				var r = color.a;
				var g = color.b;
				var b = color.c;
				var a = color.d;
				return elm$core$String$concat(
					_List_fromArray(
						[
							property,
							'rgba(',
							elm$core$String$fromInt(r),
							', ',
							elm$core$String$fromInt(g),
							',',
							elm$core$String$fromInt(b),
							', ',
							elm$core$String$fromFloat(a),
							');'
						]));
		}
	});
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$emptyIfFalse = F2(
	function (bool, str) {
		return bool ? str : '';
	});
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$styleToCss = function (_n0) {
	var isBold = _n0.isBold;
	var isItalic = _n0.isItalic;
	var isUnderline = _n0.isUnderline;
	var text = _n0.text;
	var background = _n0.background;
	return elm$core$String$concat(
		_List_fromArray(
			[
				A2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$emptyIfFalse, isBold, 'font-weight: bold;'),
				A2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$emptyIfFalse, isItalic, 'font-style: italic;'),
				A2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$emptyIfFalse, isUnderline, 'text-decoration: underline;'),
				A2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$colorToCss, 'color: ', text),
				A2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$colorToCss, 'background: ', background)
			]));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$toCssClass = function (_n0) {
	var selectors = _n0.a;
	var style = _n0.b;
	return elm$core$String$isEmpty(selectors) ? '' : (selectors + (' {' + (pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$styleToCss(style) + '}')));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$toCss = function (classes) {
	return elm$core$String$concat(
		A2(elm$core$List$map, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$toCssClass, classes));
};
var elm$core$List$intersperse = F2(
	function (sep, xs) {
		if (!xs.b) {
			return _List_Nil;
		} else {
			var hd = xs.a;
			var tl = xs.b;
			var step = F2(
				function (x, rest) {
					return A2(
						elm$core$List$cons,
						sep,
						A2(elm$core$List$cons, x, rest));
				});
			var spersed = A3(elm$core$List$foldr, step, _List_Nil, tl);
			return A2(elm$core$List$cons, hd, spersed);
		}
	});
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Theme$Type$syntaxToSelector = function (syntax) {
	switch (syntax.$) {
		case 'Elm':
			var elmSyntax = syntax.a;
			return pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Elm$syntaxToStyle(elmSyntax).b;
		case 'Xml':
			var xmlSyntax = syntax.a;
			return pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Xml$syntaxToStyle(xmlSyntax).b;
		case 'Javascript':
			var jsSyntax = syntax.a;
			return pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Javascript$syntaxToStyle(jsSyntax).b;
		case 'Css':
			var cssSyntax = syntax.a;
			return pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Css$syntaxToStyle(cssSyntax).b;
		case 'Python':
			var pythonSyntax = syntax.a;
			return pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Python$syntaxToStyle(pythonSyntax).b;
		case 'Sql':
			var sqlSyntax = syntax.a;
			return pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$Sql$syntaxToStyle(sqlSyntax).b;
		default:
			var noLangSyntax = syntax.a;
			return pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Language$NoLang$syntaxToStyle(noLangSyntax).b;
	}
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Theme$Type$syntaxesToSelectors = function (syntaxes) {
	return elm$core$String$concat(
		A2(
			elm$core$List$intersperse,
			', ',
			A2(
				elm$core$List$map,
				elm$core$Basics$append('.elmsh-'),
				A2(elm$core$List$map, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Theme$Type$syntaxToSelector, syntaxes))));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Theme$Type$toCss = function (_n0) {
	var requiredStyles = _n0.requiredStyles;
	var customStyles = _n0.customStyles;
	return pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$toCss(
		_Utils_ap(
			_List_fromArray(
				[
					_Utils_Tuple2('.elmsh', requiredStyles._default),
					_Utils_Tuple2('.elmsh-hl', requiredStyles.highlight),
					_Utils_Tuple2('.elmsh-add', requiredStyles.addition),
					_Utils_Tuple2('.elmsh-del', requiredStyles.deletion),
					_Utils_Tuple2('.elmsh-comm', requiredStyles.comment),
					_Utils_Tuple2('.elmsh1', requiredStyles.style1),
					_Utils_Tuple2('.elmsh2', requiredStyles.style2),
					_Utils_Tuple2('.elmsh3', requiredStyles.style3),
					_Utils_Tuple2('.elmsh4', requiredStyles.style4),
					_Utils_Tuple2('.elmsh5', requiredStyles.style5),
					_Utils_Tuple2('.elmsh6', requiredStyles.style6),
					_Utils_Tuple2('.elmsh7', requiredStyles.style7)
				]),
			A2(
				elm$core$List$map,
				elm$core$Tuple$mapFirst(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Theme$Type$syntaxesToSelectors),
				customStyles)));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Theme$GitHub$css = pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Theme$Type$toCss(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Theme$GitHub$theme);
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Theme$gitHub = pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Theme$GitHub$css;
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$gitHub = pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Theme(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Theme$gitHub);
var elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var elm$html$Html$Attributes$attribute = elm$virtual_dom$VirtualDom$attribute;
var elm$html$Html$Attributes$classList = function (classes) {
	return elm$html$Html$Attributes$class(
		A2(
			elm$core$String$join,
			' ',
			A2(
				elm$core$List$map,
				elm$core$Tuple$first,
				A2(elm$core$List$filter, elm$core$Tuple$second, classes))));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Add = {$: 'Add'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Del = {$: 'Del'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Normal = {$: 'Normal'};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$View$requiredStyleToString = function (required) {
	return 'elmsh' + function () {
		switch (required.$) {
			case 'Default':
				return '0';
			case 'Comment':
				return '-comm';
			case 'Style1':
				return '1';
			case 'Style2':
				return '2';
			case 'Style3':
				return '3';
			case 'Style4':
				return '4';
			case 'Style5':
				return '5';
			case 'Style6':
				return '6';
			default:
				return '7';
		}
	}();
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$View$fragmentView = function (_n0) {
	var text = _n0.text;
	var requiredStyle = _n0.requiredStyle;
	var additionalClass = _n0.additionalClass;
	return (_Utils_eq(requiredStyle, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Default) && elm$core$String$isEmpty(additionalClass)) ? elm$html$Html$text(text) : A2(
		elm$html$Html$span,
		_List_fromArray(
			[
				elm$html$Html$Attributes$classList(
				_List_fromArray(
					[
						_Utils_Tuple2(
						pablohirafuji$elm_syntax_highlight$SyntaxHighlight$View$requiredStyleToString(requiredStyle),
						!_Utils_eq(requiredStyle, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Style$Default)),
						_Utils_Tuple2('elmsh-' + additionalClass, additionalClass !== '')
					]))
			]),
		_List_fromArray(
			[
				elm$html$Html$text(text)
			]));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$View$lineView = F3(
	function (start, index, _n0) {
		var fragments = _n0.fragments;
		var highlight = _n0.highlight;
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$classList(
					_List_fromArray(
						[
							_Utils_Tuple2('elmsh-line', true),
							_Utils_Tuple2(
							'elmsh-hl',
							_Utils_eq(
								highlight,
								elm$core$Maybe$Just(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Normal))),
							_Utils_Tuple2(
							'elmsh-add',
							_Utils_eq(
								highlight,
								elm$core$Maybe$Just(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Add))),
							_Utils_Tuple2(
							'elmsh-del',
							_Utils_eq(
								highlight,
								elm$core$Maybe$Just(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Del)))
						])),
					A2(
					elm$html$Html$Attributes$attribute,
					'data-elmsh-lc',
					elm$core$String$fromInt(start + index))
				]),
			A2(elm$core$List$map, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$View$fragmentView, fragments));
	});
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$View$toInlineHtml = function (lines) {
	return A2(
		elm$html$Html$code,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('elmsh')
			]),
		elm$core$List$concat(
			A2(
				elm$core$List$map,
				function (_n0) {
					var highlight = _n0.highlight;
					var fragments = _n0.fragments;
					return _Utils_eq(highlight, elm$core$Maybe$Nothing) ? A2(elm$core$List$map, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$View$fragmentView, fragments) : _List_fromArray(
						[
							A2(
							elm$html$Html$span,
							_List_fromArray(
								[
									elm$html$Html$Attributes$classList(
									_List_fromArray(
										[
											_Utils_Tuple2(
											'elmsh-hl',
											_Utils_eq(
												highlight,
												elm$core$Maybe$Just(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Normal))),
											_Utils_Tuple2(
											'elmsh-add',
											_Utils_eq(
												highlight,
												elm$core$Maybe$Just(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Add))),
											_Utils_Tuple2(
											'elmsh-del',
											_Utils_eq(
												highlight,
												elm$core$Maybe$Just(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$Line$Del)))
										]))
								]),
							A2(elm$core$List$map, pablohirafuji$elm_syntax_highlight$SyntaxHighlight$View$fragmentView, fragments))
						]);
				},
				lines)));
};
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$View$toBlockHtml = F2(
	function (maybeStart, lines) {
		if (maybeStart.$ === 'Nothing') {
			return A2(
				elm$html$Html$pre,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('elmsh')
					]),
				_List_fromArray(
					[
						pablohirafuji$elm_syntax_highlight$SyntaxHighlight$View$toInlineHtml(lines)
					]));
		} else {
			var start = maybeStart.a;
			return A2(
				elm$html$Html$pre,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('elmsh')
					]),
				elm$core$List$singleton(
					A2(
						elm$html$Html$code,
						_List_Nil,
						A2(
							elm$core$List$indexedMap,
							pablohirafuji$elm_syntax_highlight$SyntaxHighlight$View$lineView(start),
							lines))));
		}
	});
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$toBlockHtml = F2(
	function (maybeStart, _n0) {
		var lines = _n0.a;
		return A2(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$View$toBlockHtml, maybeStart, lines);
	});
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$useTheme = function (_n0) {
	var theme = _n0.a;
	return A3(
		elm$html$Html$node,
		'style',
		_List_Nil,
		_List_fromArray(
			[
				elm$html$Html$text(theme)
			]));
};
var jxxcarlson$meenylatex$Internal$Render$highlightSyntax = F2(
	function (lang_, source) {
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					A2(elm$html$Html$Attributes$style, 'class', 'elmsh-pa')
				]),
			_List_fromArray(
				[
					pablohirafuji$elm_syntax_highlight$SyntaxHighlight$useTheme(pablohirafuji$elm_syntax_highlight$SyntaxHighlight$gitHub),
					A2(
					elm$core$Result$withDefault,
					A2(
						elm$html$Html$pre,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								elm$html$Html$code,
								_List_fromArray(
									[
										A2(elm$html$Html$Attributes$style, 'padding', '8px')
									]),
								_List_fromArray(
									[
										elm$html$Html$text(source)
									]))
							])),
					A2(
						elm$core$Result$map,
						pablohirafuji$elm_syntax_highlight$SyntaxHighlight$toBlockHtml(
							elm$core$Maybe$Just(1)),
						jxxcarlson$meenylatex$Internal$Render$getLang(lang_)(source)))
				]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderCodeEnvironment = F4(
	function (source_, latexState, optArgs, body) {
		var suffix = '\n\\end{colored}';
		var lang = A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 0, latexState, optArgs);
		var prefix = '\\begin{colored}[' + (lang + ']\n');
		var source = elm$core$String$trim(
			A3(
				elm$core$String$replace,
				suffix,
				'',
				A3(elm$core$String$replace, prefix, '', source_)));
		return A2(jxxcarlson$meenylatex$Internal$Render$highlightSyntax, lang, source);
	});
var pablohirafuji$elm_syntax_highlight$SyntaxHighlight$toInlineHtml = function (_n0) {
	var lines = _n0.a;
	return pablohirafuji$elm_syntax_highlight$SyntaxHighlight$View$toInlineHtml(lines);
};
var jxxcarlson$meenylatex$Internal$Render$renderColored = F3(
	function (source, latexState, args) {
		var theCode = A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 1, latexState, args);
		var lang = jxxcarlson$meenylatex$Internal$Render$getLang(
			A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 0, latexState, args));
		return A2(
			elm$core$Result$withDefault,
			A2(
				elm$html$Html$code,
				_List_Nil,
				_List_fromArray(
					[
						elm$html$Html$text('isEmpty : String -> Bool')
					])),
			A2(
				elm$core$Result$map,
				pablohirafuji$elm_syntax_highlight$SyntaxHighlight$toInlineHtml,
				lang(theCode)));
	});
var jxxcarlson$meenylatex$Internal$Render$renderCommentEnvironment = F3(
	function (source, latexState, body) {
		return A2(elm$html$Html$div, _List_Nil, _List_Nil);
	});
var jxxcarlson$meenylatex$Internal$Render$renderDate = F3(
	function (_n0, latexState, args) {
		return A2(elm$html$Html$span, _List_Nil, _List_Nil);
	});
var jxxcarlson$meenylatex$Internal$Render$renderDocumentTitle = F3(
	function (_n0, latexState, list) {
		var title = A2(jxxcarlson$meenylatex$Internal$LatexState$getDictionaryItem, 'title', latexState);
		var titlePart = A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('title')
				]),
			_List_fromArray(
				[
					elm$html$Html$text(title)
				]));
		var revision = A2(jxxcarlson$meenylatex$Internal$LatexState$getDictionaryItem, 'revision', latexState);
		var revisionText = (revision !== '') ? ('Last revised ' + revision) : '';
		var email = A2(jxxcarlson$meenylatex$Internal$LatexState$getDictionaryItem, 'email', latexState);
		var date = A2(jxxcarlson$meenylatex$Internal$LatexState$getDictionaryItem, 'date', latexState);
		var author = A2(jxxcarlson$meenylatex$Internal$LatexState$getDictionaryItem, 'author', latexState);
		var bodyParts = A2(
			elm$core$List$map,
			function (x) {
				return A2(
					elm$html$Html$li,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text(x)
						]));
			},
			A2(
				elm$core$List$filter,
				function (x) {
					return x !== '';
				},
				_List_fromArray(
					[author, email, date, revisionText])));
		var bodyPart = A2(elm$html$Html$ul, _List_Nil, bodyParts);
		return A2(
			elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[titlePart, bodyPart]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderDollar = F3(
	function (_n0, atexState, args) {
		return A2(
			elm$html$Html$span,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('$')
				]));
	});
var elm$html$Html$iframe = _VirtualDom_node('iframe');
var elm$html$Html$Attributes$height = function (n) {
	return A2(
		_VirtualDom_attribute,
		'height',
		elm$core$String$fromInt(n));
};
var elm$html$Html$Attributes$src = function (url) {
	return A2(
		elm$html$Html$Attributes$stringProperty,
		'src',
		_VirtualDom_noJavaScriptOrHtmlUri(url));
};
var elm$html$Html$Attributes$width = function (n) {
	return A2(
		_VirtualDom_attribute,
		'width',
		elm$core$String$fromInt(n));
};
var jxxcarlson$meenylatex$Internal$Render$renderEllie = F3(
	function (_n0, latexState, args) {
		var title_ = A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 1, latexState, args);
		var title = (title_ === 'xxx') ? 'Link to Ellie' : title_;
		var id = A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 0, latexState, args);
		var url = 'https://ellie-app.com/embed/' + id;
		return A2(
			elm$html$Html$iframe,
			_List_fromArray(
				[
					elm$html$Html$Attributes$src(url),
					elm$html$Html$Attributes$width(500),
					elm$html$Html$Attributes$height(600)
				]),
			_List_fromArray(
				[
					elm$html$Html$text(title)
				]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderEmail = F3(
	function (_n0, latexState, args) {
		return A2(elm$html$Html$span, _List_Nil, _List_Nil);
	});
var jxxcarlson$meenylatex$Internal$Render$renderEnd = F3(
	function (_n0, atexState, args) {
		return A2(
			elm$html$Html$span,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('\\end')
				]));
	});
var jxxcarlson$meenylatex$Internal$LatexState$getCrossReference = F2(
	function (label, latexState) {
		var _n0 = A2(elm$core$Dict$get, label, latexState.crossReferences);
		if (_n0.$ === 'Just') {
			var ref = _n0.a;
			return ref;
		} else {
			return '??';
		}
	});
var jxxcarlson$meenylatex$Internal$Render$renderEqRef = F3(
	function (source, latexState, args) {
		var key = A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 0, jxxcarlson$meenylatex$Internal$LatexState$emptyLatexState, args);
		var ref = A2(jxxcarlson$meenylatex$Internal$LatexState$getCrossReference, key, latexState);
		return A2(
			elm$html$Html$i,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('('),
					elm$html$Html$text(ref),
					elm$html$Html$text(')')
				]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderEqnArray = F3(
	function (source, latexState, body) {
		var body1 = A2(jxxcarlson$meenylatex$Internal$RenderToString$render, latexState, body);
		var body2 = '\\begin{aligned}' + (body1 + '\\end{aligned}');
		return A2(jxxcarlson$meenylatex$Internal$Render$displayMathText, latexState, body2);
	});
var jxxcarlson$meenylatex$Internal$ParserHelpers$ExpectingLabel = {$: 'ExpectingLabel'};
var jxxcarlson$meenylatex$Internal$ParserHelpers$ExpectingRightBrace = {$: 'ExpectingRightBrace'};
var jxxcarlson$meenylatex$Internal$ParserHelpers$parseArg = function (macroName) {
	return A2(
		elm$parser$Parser$Advanced$keeper,
		A2(
			elm$parser$Parser$Advanced$ignorer,
			elm$parser$Parser$Advanced$succeed(elm$core$Basics$identity),
			elm$parser$Parser$Advanced$symbol(
				A2(elm$parser$Parser$Advanced$Token, '\\' + (macroName + '{'), jxxcarlson$meenylatex$Internal$ParserHelpers$ExpectingLabel))),
		A2(
			elm$parser$Parser$Advanced$ignorer,
			elm$parser$Parser$Advanced$getChompedString(
				elm$parser$Parser$Advanced$chompWhile(
					function (c) {
						return !_Utils_eq(
							c,
							_Utils_chr('}'));
					})),
			elm$parser$Parser$Advanced$symbol(
				A2(elm$parser$Parser$Advanced$Token, '}', jxxcarlson$meenylatex$Internal$ParserHelpers$ExpectingRightBrace))));
};
var jxxcarlson$meenylatex$Internal$ParserHelpers$getArg = F2(
	function (macroName, str) {
		var _n0 = A2(
			elm$parser$Parser$Advanced$run,
			jxxcarlson$meenylatex$Internal$ParserHelpers$parseArg(macroName),
			str);
		if (_n0.$ === 'Ok') {
			var str_ = _n0.a;
			return elm$core$Maybe$Just(str_);
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var jxxcarlson$meenylatex$Internal$ParserHelpers$getTag = function (str) {
	return A2(jxxcarlson$meenylatex$Internal$ParserHelpers$getArg, 'tag', str);
};
var jxxcarlson$meenylatex$Internal$ParserHelpers$removeLabel = function (str) {
	var _n0 = A2(jxxcarlson$meenylatex$Internal$ParserHelpers$getArg, 'label', str);
	if (_n0.$ === 'Nothing') {
		return str;
	} else {
		var word = _n0.a;
		return A3(elm$core$String$replace, '\\label{' + (word + '}'), '', str);
	}
};
var jxxcarlson$meenylatex$Internal$Render$displayMathTextWithLabel_ = F3(
	function (latexState, str, label) {
		return A2(
			elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							A2(elm$html$Html$Attributes$style, 'float', 'right'),
							A2(elm$html$Html$Attributes$style, 'margin-top', '3px')
						]),
					_List_fromArray(
						[
							elm$html$Html$text(label)
						])),
					A2(
					elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							jxxcarlson$meenylatex$Internal$Render$mathText,
							jxxcarlson$meenylatex$Internal$Render$DisplayMathMode,
							elm$core$String$trim(str))
						]))
				]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderEquationEnvironment = F3(
	function (source, latexState, body) {
		var s1 = A2(jxxcarlson$meenylatex$Internal$LatexState$getCounter, 's1', latexState);
		var eqno = A2(jxxcarlson$meenylatex$Internal$LatexState$getCounter, 'eqno', latexState);
		var contents = function () {
			if (body.$ === 'LXString') {
				var str = body.a;
				return jxxcarlson$meenylatex$Internal$ParserHelpers$removeLabel(
					A2(
						jxxcarlson$meenylatex$Internal$MathMacro$evalStr,
						latexState.mathMacroDictionary,
						elm$core$String$trim(str)));
			} else {
				return 'Parser error in render equation environment';
			}
		}();
		var addendum = (eqno > 0) ? ((s1 > 0) ? ('\\tag{' + (elm$core$String$fromInt(s1) + ('.' + (elm$core$String$fromInt(eqno) + '}')))) : ('\\tag{' + (elm$core$String$fromInt(eqno) + '}'))) : '';
		var tag = function () {
			var _n0 = jxxcarlson$meenylatex$Internal$ParserHelpers$getTag(addendum);
			if (_n0.$ === 'Nothing') {
				return '';
			} else {
				var tag_ = _n0.a;
				return '(' + (tag_ + ')');
			}
		}();
		return A3(jxxcarlson$meenylatex$Internal$Render$displayMathTextWithLabel_, latexState, contents, tag);
	});
var elm$html$Html$Attributes$target = elm$html$Html$Attributes$stringProperty('target');
var jxxcarlson$meenylatex$Internal$Render$renderHRef = F3(
	function (source, latexState, args) {
		var url = A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 0, jxxcarlson$meenylatex$Internal$LatexState$emptyLatexState, args);
		var label = A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 1, jxxcarlson$meenylatex$Internal$LatexState$emptyLatexState, args);
		return A2(
			elm$html$Html$a,
			_List_fromArray(
				[
					elm$html$Html$Attributes$href(url),
					elm$html$Html$Attributes$target('_blank')
				]),
			_List_fromArray(
				[
					elm$html$Html$text(label)
				]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderHighlighted = F3(
	function (_n0, latexState, args) {
		var arg = A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 0, latexState, args);
		return A2(
			elm$html$Html$span,
			_List_fromArray(
				[
					A2(elm$html$Html$Attributes$style, 'background-color', 'yellow')
				]),
			_List_fromArray(
				[
					elm$html$Html$text(arg)
				]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderHomePageLink = F3(
	function (_n0, latexState, args) {
		var label = A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 1, latexState, args);
		var id = A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 0, latexState, args);
		var ref = A2(jxxcarlson$meenylatex$Internal$LatexState$getDictionaryItem, 'setclient', latexState) + ('/h/' + id);
		return A2(
			elm$html$Html$a,
			_List_fromArray(
				[
					elm$html$Html$Attributes$href(ref)
				]),
			_List_fromArray(
				[
					elm$html$Html$text(label)
				]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderIFrame = F3(
	function (_n0, latexState, args) {
		var url = A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 0, latexState, args);
		var title = A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 1, latexState, args);
		return A2(
			elm$html$Html$iframe,
			_List_fromArray(
				[
					elm$html$Html$Attributes$src(url),
					elm$html$Html$Attributes$width(400),
					elm$html$Html$Attributes$height(500),
					A2(elm$html$Html$Attributes$attribute, 'Content-Type', 'application/pdf'),
					A2(elm$html$Html$Attributes$attribute, 'Content-Disposition', 'inline')
				]),
			_List_fromArray(
				[
					elm$html$Html$text(title)
				]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderILink = F3(
	function (_n0, latexState, args) {
		return A2(elm$html$Html$span, _List_Nil, _List_Nil);
	});
var elm$html$Html$br = _VirtualDom_node('br');
var elm$html$Html$img = _VirtualDom_node('img');
var elm$html$Html$Attributes$alt = elm$html$Html$Attributes$stringProperty('alt');
var jxxcarlson$meenylatex$Internal$Image$ImageAttributes = F3(
	function (width, _float, align) {
		return {align: align, _float: _float, width: width};
	});
var jxxcarlson$meenylatex$Internal$KeyValueUtilities$itemListHelper = F2(
	function (itemParser, revItems) {
		return elm$parser$Parser$Advanced$oneOf(
			_List_fromArray(
				[
					A2(
					elm$parser$Parser$Advanced$keeper,
					elm$parser$Parser$Advanced$succeed(
						function (item_) {
							return elm$parser$Parser$Advanced$Loop(
								A2(elm$core$List$cons, item_, revItems));
						}),
					itemParser),
					A2(
					elm$parser$Parser$Advanced$map,
					function (_n0) {
						return elm$parser$Parser$Advanced$Done(
							elm$core$List$reverse(revItems));
					},
					elm$parser$Parser$Advanced$succeed(_Utils_Tuple0))
				]));
	});
var jxxcarlson$meenylatex$Internal$KeyValueUtilities$itemList_ = F2(
	function (initialList, itemParser) {
		return A2(
			elm$parser$Parser$Advanced$loop,
			initialList,
			jxxcarlson$meenylatex$Internal$KeyValueUtilities$itemListHelper(itemParser));
	});
var jxxcarlson$meenylatex$Internal$KeyValueUtilities$itemList = function (itemParser) {
	return A2(jxxcarlson$meenylatex$Internal$KeyValueUtilities$itemList_, _List_Nil, itemParser);
};
var elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var elm$parser$Parser$Advanced$spaces = elm$parser$Parser$Advanced$chompWhile(
	function (c) {
		return _Utils_eq(
			c,
			_Utils_chr(' ')) || (_Utils_eq(
			c,
			_Utils_chr('\n')) || _Utils_eq(
			c,
			_Utils_chr('\r')));
	});
var jxxcarlson$meenylatex$Internal$KeyValueUtilities$ExpectingColon = {$: 'ExpectingColon'};
var jxxcarlson$meenylatex$Internal$KeyValueUtilities$ExpectingComma = {$: 'ExpectingComma'};
var jxxcarlson$meenylatex$Internal$KeyValueUtilities$ws = elm$parser$Parser$Advanced$chompWhile(
	function (c) {
		return _Utils_eq(
			c,
			_Utils_chr(' ')) || _Utils_eq(
			c,
			_Utils_chr('\n'));
	});
var jxxcarlson$meenylatex$Internal$KeyValueUtilities$word = F2(
	function (problem, inWord) {
		return A2(
			elm$parser$Parser$Advanced$keeper,
			A2(
				elm$parser$Parser$Advanced$keeper,
				A2(
					elm$parser$Parser$Advanced$keeper,
					A2(
						elm$parser$Parser$Advanced$ignorer,
						elm$parser$Parser$Advanced$succeed(elm$core$String$slice),
						jxxcarlson$meenylatex$Internal$KeyValueUtilities$ws),
					A2(
						elm$parser$Parser$Advanced$ignorer,
						A2(
							elm$parser$Parser$Advanced$ignorer,
							A2(
								elm$parser$Parser$Advanced$ignorer,
								elm$parser$Parser$Advanced$getOffset,
								A2(elm$parser$Parser$Advanced$chompIf, inWord, problem)),
							elm$parser$Parser$Advanced$chompWhile(inWord)),
						jxxcarlson$meenylatex$Internal$KeyValueUtilities$ws)),
				elm$parser$Parser$Advanced$getOffset),
			elm$parser$Parser$Advanced$getSource);
	});
var jxxcarlson$meenylatex$Internal$KeyValueUtilities$keyValuePair = A2(
	elm$parser$Parser$Advanced$map,
	function (_n0) {
		var a = _n0.a;
		var b = _n0.b;
		return _Utils_Tuple2(
			elm$core$String$trim(a),
			elm$core$String$trim(b));
	},
	A2(
		elm$parser$Parser$Advanced$keeper,
		A2(
			elm$parser$Parser$Advanced$keeper,
			A2(
				elm$parser$Parser$Advanced$ignorer,
				elm$parser$Parser$Advanced$succeed(elm$core$Tuple$pair),
				elm$parser$Parser$Advanced$spaces),
			A2(
				elm$parser$Parser$Advanced$ignorer,
				A2(
					elm$parser$Parser$Advanced$ignorer,
					A2(
						elm$parser$Parser$Advanced$ignorer,
						A2(
							jxxcarlson$meenylatex$Internal$KeyValueUtilities$word,
							jxxcarlson$meenylatex$Internal$KeyValueUtilities$ExpectingColon,
							function (c) {
								return !_Utils_eq(
									c,
									_Utils_chr(':'));
							}),
						elm$parser$Parser$Advanced$spaces),
					elm$parser$Parser$Advanced$symbol(
						A2(elm$parser$Parser$Advanced$Token, ':', jxxcarlson$meenylatex$Internal$KeyValueUtilities$ExpectingColon))),
				elm$parser$Parser$Advanced$spaces)),
		A2(
			elm$parser$Parser$Advanced$ignorer,
			A2(
				jxxcarlson$meenylatex$Internal$KeyValueUtilities$word,
				jxxcarlson$meenylatex$Internal$KeyValueUtilities$ExpectingComma,
				function (c) {
					return !_Utils_eq(
						c,
						_Utils_chr(','));
				}),
			elm$parser$Parser$Advanced$oneOf(
				_List_fromArray(
					[
						elm$parser$Parser$Advanced$symbol(
						A2(elm$parser$Parser$Advanced$Token, ',', jxxcarlson$meenylatex$Internal$KeyValueUtilities$ExpectingComma)),
						elm$parser$Parser$Advanced$spaces
					])))));
var jxxcarlson$meenylatex$Internal$KeyValueUtilities$keyValuePairs = A2(
	elm$parser$Parser$Advanced$keeper,
	elm$parser$Parser$Advanced$succeed(elm$core$Basics$identity),
	jxxcarlson$meenylatex$Internal$KeyValueUtilities$itemList(jxxcarlson$meenylatex$Internal$KeyValueUtilities$keyValuePair));
var jxxcarlson$meenylatex$Internal$KeyValueUtilities$getKeyValueList = function (str) {
	return A2(
		elm$core$Result$withDefault,
		_List_Nil,
		A2(elm$parser$Parser$Advanced$run, jxxcarlson$meenylatex$Internal$KeyValueUtilities$keyValuePairs, str));
};
var jxxcarlson$meenylatex$Internal$KeyValueUtilities$getValue = F2(
	function (key, kvpList) {
		return A2(
			elm$core$Maybe$withDefault,
			'',
			elm$core$List$head(
				A2(
					elm$core$List$map,
					function (x) {
						return x.b;
					},
					A2(
						elm$core$List$filter,
						function (x) {
							return _Utils_eq(x.a, key);
						},
						kvpList))));
	});
var jxxcarlson$meenylatex$Internal$Image$parseImageAttributes = function (attributeString) {
	var kvList = jxxcarlson$meenylatex$Internal$KeyValueUtilities$getKeyValueList(attributeString);
	var widthValue = A2(
		elm$core$Maybe$withDefault,
		200,
		elm$core$String$toInt(
			A2(jxxcarlson$meenylatex$Internal$KeyValueUtilities$getValue, 'width', kvList)));
	var floatValue = A2(jxxcarlson$meenylatex$Internal$KeyValueUtilities$getValue, 'float', kvList);
	var alignValue = A2(jxxcarlson$meenylatex$Internal$KeyValueUtilities$getValue, 'align', kvList);
	return A3(jxxcarlson$meenylatex$Internal$Image$ImageAttributes, widthValue, floatValue, alignValue);
};
var jxxcarlson$meenylatex$Internal$Render$renderImage = F3(
	function (source, latexState, args) {
		var url = A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 0, latexState, args);
		var label = A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 1, latexState, args);
		var attributeString = A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 2, latexState, args);
		var imageAttrs = jxxcarlson$meenylatex$Internal$Image$parseImageAttributes(attributeString);
		var width = elm$core$String$fromInt(imageAttrs.width) + 'px';
		return (imageAttrs._float === 'left') ? A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					A2(elm$html$Html$Attributes$style, 'float', 'left')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$img,
					_List_fromArray(
						[
							elm$html$Html$Attributes$src(url),
							elm$html$Html$Attributes$alt(label),
							A2(elm$html$Html$Attributes$style, 'width', width),
							A2(elm$html$Html$Attributes$style, 'margin-right', '12px')
						]),
					_List_Nil),
					A2(elm$html$Html$br, _List_Nil, _List_Nil),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							A2(elm$html$Html$Attributes$style, 'width', width),
							A2(elm$html$Html$Attributes$style, 'text-align', 'center'),
							A2(elm$html$Html$Attributes$style, 'display', 'block')
						]),
					_List_fromArray(
						[
							elm$html$Html$text(label)
						]))
				])) : ((imageAttrs._float === 'right') ? A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					A2(elm$html$Html$Attributes$style, 'float', 'right')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$img,
					_List_fromArray(
						[
							elm$html$Html$Attributes$src(url),
							elm$html$Html$Attributes$alt(label),
							A2(elm$html$Html$Attributes$style, 'width', width),
							A2(elm$html$Html$Attributes$style, 'margin-left', '12px')
						]),
					_List_Nil),
					A2(elm$html$Html$br, _List_Nil, _List_Nil),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							A2(elm$html$Html$Attributes$style, 'width', width),
							A2(elm$html$Html$Attributes$style, 'text-align', 'center'),
							A2(elm$html$Html$Attributes$style, 'display', 'block')
						]),
					_List_fromArray(
						[
							elm$html$Html$text(label)
						]))
				])) : ((imageAttrs.align === 'center') ? A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					A2(elm$html$Html$Attributes$style, 'margin-left', 'auto'),
					A2(elm$html$Html$Attributes$style, 'margin-right', 'auto'),
					A2(elm$html$Html$Attributes$style, 'width', width)
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$img,
					_List_fromArray(
						[
							elm$html$Html$Attributes$src(url),
							elm$html$Html$Attributes$alt(label),
							A2(elm$html$Html$Attributes$style, 'width', width)
						]),
					_List_Nil),
					A2(elm$html$Html$br, _List_Nil, _List_Nil),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							A2(elm$html$Html$Attributes$style, 'width', width),
							A2(elm$html$Html$Attributes$style, 'text-align', 'center'),
							A2(elm$html$Html$Attributes$style, 'display', 'block')
						]),
					_List_fromArray(
						[
							elm$html$Html$text(label)
						]))
				])) : A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					A2(elm$html$Html$Attributes$style, 'margin-left', 'auto'),
					A2(elm$html$Html$Attributes$style, 'margin-right', 'auto'),
					A2(elm$html$Html$Attributes$style, 'width', width)
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$img,
					_List_fromArray(
						[
							elm$html$Html$Attributes$src(url),
							elm$html$Html$Attributes$alt(label),
							A2(elm$html$Html$Attributes$style, 'width', width)
						]),
					_List_Nil),
					A2(elm$html$Html$br, _List_Nil, _List_Nil),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							A2(elm$html$Html$Attributes$style, 'width', width),
							A2(elm$html$Html$Attributes$style, 'text-align', 'center'),
							A2(elm$html$Html$Attributes$style, 'display', 'block')
						]),
					_List_fromArray(
						[
							elm$html$Html$text(label)
						]))
				]))));
	});
var jxxcarlson$meenylatex$Internal$Render$renderImageRef = F3(
	function (source, latexState, args) {
		var url = A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 0, latexState, args);
		var imageUrl = A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 1, latexState, args);
		var attributeString = A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 2, latexState, args);
		var imageAttrs = jxxcarlson$meenylatex$Internal$Image$parseImageAttributes(attributeString);
		var width = elm$core$String$fromInt(imageAttrs.width) + 'px';
		var theImage = (imageAttrs._float === 'left') ? A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					A2(elm$html$Html$Attributes$style, 'float', 'left')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$img,
					_List_fromArray(
						[
							elm$html$Html$Attributes$src(imageUrl),
							elm$html$Html$Attributes$alt('image link'),
							A2(elm$html$Html$Attributes$style, 'width', width),
							A2(elm$html$Html$Attributes$style, 'margin-right', '12px')
						]),
					_List_Nil),
					A2(elm$html$Html$br, _List_Nil, _List_Nil),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							A2(elm$html$Html$Attributes$style, 'width', width),
							A2(elm$html$Html$Attributes$style, 'text-align', 'center'),
							A2(elm$html$Html$Attributes$style, 'display', 'block')
						]),
					_List_Nil)
				])) : ((imageAttrs._float === 'right') ? A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					A2(elm$html$Html$Attributes$style, 'float', 'right')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$img,
					_List_fromArray(
						[
							elm$html$Html$Attributes$src(imageUrl),
							elm$html$Html$Attributes$alt('image link'),
							A2(elm$html$Html$Attributes$style, 'width', width),
							A2(elm$html$Html$Attributes$style, 'margin-left', '12px')
						]),
					_List_Nil),
					A2(elm$html$Html$br, _List_Nil, _List_Nil),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							A2(elm$html$Html$Attributes$style, 'width', width),
							A2(elm$html$Html$Attributes$style, 'text-align', 'center'),
							A2(elm$html$Html$Attributes$style, 'display', 'block')
						]),
					_List_Nil)
				])) : ((imageAttrs.align === 'center') ? A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					A2(elm$html$Html$Attributes$style, 'margin-left', 'auto'),
					A2(elm$html$Html$Attributes$style, 'margin-right', 'auto'),
					A2(elm$html$Html$Attributes$style, 'width', width)
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$img,
					_List_fromArray(
						[
							elm$html$Html$Attributes$src(imageUrl),
							elm$html$Html$Attributes$alt('image link'),
							A2(elm$html$Html$Attributes$style, 'width', width)
						]),
					_List_Nil),
					A2(elm$html$Html$br, _List_Nil, _List_Nil),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							A2(elm$html$Html$Attributes$style, 'width', width),
							A2(elm$html$Html$Attributes$style, 'text-align', 'center'),
							A2(elm$html$Html$Attributes$style, 'display', 'block')
						]),
					_List_Nil)
				])) : A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					A2(elm$html$Html$Attributes$style, 'margin-left', 'auto'),
					A2(elm$html$Html$Attributes$style, 'margin-right', 'auto'),
					A2(elm$html$Html$Attributes$style, 'width', width)
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$img,
					_List_fromArray(
						[
							elm$html$Html$Attributes$src(imageUrl),
							elm$html$Html$Attributes$alt('image link'),
							A2(elm$html$Html$Attributes$style, 'width', width)
						]),
					_List_Nil),
					A2(elm$html$Html$br, _List_Nil, _List_Nil),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							A2(elm$html$Html$Attributes$style, 'width', width),
							A2(elm$html$Html$Attributes$style, 'text-align', 'center'),
							A2(elm$html$Html$Attributes$style, 'display', 'block')
						]),
					_List_Nil)
				]))));
		return A2(
			elm$html$Html$a,
			_List_fromArray(
				[
					elm$html$Html$Attributes$href(url)
				]),
			_List_fromArray(
				[theImage]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderInclude = F3(
	function (_n0, latexState, args) {
		return A2(elm$html$Html$span, _List_Nil, _List_Nil);
	});
var jxxcarlson$meenylatex$Internal$Render$renderIndex = F3(
	function (source, x, z) {
		return A2(elm$html$Html$span, _List_Nil, _List_Nil);
	});
var jxxcarlson$meenylatex$Internal$Render$sectionPrefix = function (level) {
	switch (level) {
		case 1:
			return 'section';
		case 2:
			return 'subsection';
		case 3:
			return 'subsubsection';
		default:
			return 'asection';
	}
};
var jxxcarlson$meenylatex$Internal$Render$makeTocItem = F2(
	function (prefix, tocItem) {
		var ti = tocItem.b;
		var id = A2(
			jxxcarlson$meenylatex$Internal$Render$makeId,
			jxxcarlson$meenylatex$Internal$Render$sectionPrefix(ti.level),
			ti.name);
		var i = tocItem.a;
		var number = prefix + (elm$core$String$fromInt(i + 1) + '. ');
		var href = '#' + id;
		var classProperty = 'class=\"sectionLevel' + (elm$core$String$fromInt(ti.level) + '\"');
		return A2(
			elm$html$Html$p,
			_List_fromArray(
				[
					A2(elm$html$Html$Attributes$style, 'font-size', '14px'),
					A2(elm$html$Html$Attributes$style, 'padding-bottom', '0px'),
					A2(elm$html$Html$Attributes$style, 'margin-bottom', '0px'),
					A2(elm$html$Html$Attributes$style, 'padding-top', '0px'),
					A2(elm$html$Html$Attributes$style, 'margin-top', '0px'),
					A2(elm$html$Html$Attributes$style, 'line-height', '20px')
				]),
			_List_fromArray(
				[
					elm$html$Html$text(number),
					A2(
					elm$html$Html$a,
					_List_fromArray(
						[
							elm$html$Html$Attributes$href(href)
						]),
					_List_fromArray(
						[
							elm$html$Html$text(ti.name)
						]))
				]));
	});
var jxxcarlson$meenylatex$Internal$Render$makeInnerTableOfContents = F2(
	function (prefix, latexState) {
		var toc = A2(
			elm$core$List$filter,
			function (item) {
				return item.level === 2;
			},
			latexState.tableOfContents);
		return A3(
			elm$core$List$foldl,
			F2(
				function (tocItem, acc) {
					return _Utils_ap(
						acc,
						_List_fromArray(
							[
								A2(jxxcarlson$meenylatex$Internal$Render$makeTocItem, prefix, tocItem)
							]));
				}),
			_List_Nil,
			A2(elm$core$List$indexedMap, elm$core$Tuple$pair, toc));
	});
var jxxcarlson$meenylatex$Internal$Render$renderInnerTableOfContents = F3(
	function (_n0, latexState, args) {
		var s1 = A2(jxxcarlson$meenylatex$Internal$LatexState$getCounter, 's1', latexState);
		var prefix = elm$core$String$fromInt(s1) + '.';
		var innerPart = A2(jxxcarlson$meenylatex$Internal$Render$makeInnerTableOfContents, prefix, latexState);
		return A2(
			elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					elm$html$Html$h3,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text('Table of Contents')
						])),
					A2(elm$html$Html$ul, _List_Nil, innerPart)
				]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderLabel = F3(
	function (source, x, z) {
		return A2(elm$html$Html$span, _List_Nil, _List_Nil);
	});
var jxxcarlson$meenylatex$Internal$Render$renderListing = F3(
	function (_n0, latexState, body) {
		var text = A2(jxxcarlson$meenylatex$Internal$RenderToString$render, latexState, body);
		var lines = jxxcarlson$meenylatex$Internal$Utility$addLineNumbers(text);
		return A2(
			elm$html$Html$pre,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('verbatim')
				]),
			_List_fromArray(
				[
					elm$html$Html$text(lines)
				]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderLocal = F3(
	function (_n0, latexState, args) {
		var arg = A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 0, latexState, args);
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					A2(elm$html$Html$Attributes$style, 'color', 'blue'),
					A2(elm$html$Html$Attributes$style, 'white-space', 'pre')
				]),
			_List_fromArray(
				[
					elm$html$Html$text(arg)
				]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderMacros = F3(
	function (_n0, latexState, body) {
		return A2(
			jxxcarlson$meenylatex$Internal$Render$displayMathText,
			latexState,
			A2(jxxcarlson$meenylatex$Internal$RenderToString$render, latexState, body));
	});
var jxxcarlson$meenylatex$Internal$Render$renderMainTableOfContents = F3(
	function (source, latexState, args) {
		return A2(elm$html$Html$span, _List_Nil, _List_Nil);
	});
var jxxcarlson$meenylatex$Internal$Render$renderMakeTitle = F3(
	function (source, latexState, list) {
		var title = A2(jxxcarlson$meenylatex$Internal$LatexState$getDictionaryItem, 'title', latexState);
		var titlePart = A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					A2(elm$html$Html$Attributes$style, 'font-size', '28px'),
					A2(elm$html$Html$Attributes$style, 'padding-bottom', '12px')
				]),
			_List_fromArray(
				[
					elm$html$Html$text(title)
				]));
		var revision = A2(jxxcarlson$meenylatex$Internal$LatexState$getDictionaryItem, 'revision', latexState);
		var revisionText = (revision !== '') ? ('Last revised ' + revision) : '';
		var email = A2(jxxcarlson$meenylatex$Internal$LatexState$getDictionaryItem, 'email', latexState);
		var date = A2(jxxcarlson$meenylatex$Internal$LatexState$getDictionaryItem, 'date', latexState);
		var bodyParts = A2(
			elm$core$List$map,
			function (x) {
				return A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							A2(elm$html$Html$Attributes$style, 'font-size', '14px')
						]),
					_List_fromArray(
						[
							elm$html$Html$text(x)
						]));
			},
			A2(
				elm$core$List$filter,
				function (x) {
					return x !== '';
				},
				_List_fromArray(
					[date, revisionText, email])));
		var author = A2(jxxcarlson$meenylatex$Internal$LatexState$getDictionaryItem, 'author', latexState);
		var authorPart = A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					A2(elm$html$Html$Attributes$style, 'font-size', '18px'),
					A2(elm$html$Html$Attributes$style, 'padding-bottom', '4px')
				]),
			_List_fromArray(
				[
					elm$html$Html$text(author)
				]));
		return A2(
			elm$html$Html$div,
			_List_Nil,
			A2(
				elm$core$List$cons,
				titlePart,
				A2(elm$core$List$cons, authorPart, bodyParts)));
	});
var jxxcarlson$meenylatex$Internal$Render$renderMathEnvironment = F4(
	function (envName, _n0, latexState, body) {
		var s1 = A2(jxxcarlson$meenylatex$Internal$LatexState$getCounter, 's1', latexState);
		var r = A2(jxxcarlson$meenylatex$Internal$RenderToString$render, latexState, body);
		var innerContents = function () {
			if (body.$ === 'LXString') {
				var str = body.a;
				return jxxcarlson$meenylatex$Internal$ParserHelpers$removeLabel(
					A3(
						elm$core$String$replace,
						'\\ \\',
						'\\\\',
						A2(
							jxxcarlson$meenylatex$Internal$MathMacro$evalStr,
							latexState.mathMacroDictionary,
							elm$core$String$trim(str))));
			} else {
				return '';
			}
		}();
		var eqno = A2(jxxcarlson$meenylatex$Internal$LatexState$getCounter, 'eqno', latexState);
		var content = '\n\\begin{' + (envName + ('}\n' + (innerContents + ('\n\\end{' + (envName + '}\n')))));
		var addendum = (eqno > 0) ? ((s1 > 0) ? ('\\tag{' + (elm$core$String$fromInt(s1) + ('.' + (elm$core$String$fromInt(eqno) + '}')))) : ('\\tag{' + (elm$core$String$fromInt(eqno) + '}'))) : '';
		var tag = function () {
			var _n1 = jxxcarlson$meenylatex$Internal$ParserHelpers$getTag(addendum);
			if (_n1.$ === 'Nothing') {
				return '';
			} else {
				var tag_ = _n1.a;
				return '(' + (tag_ + ')');
			}
		}();
		return A3(jxxcarlson$meenylatex$Internal$Render$displayMathTextWithLabel_, latexState, content, tag);
	});
var jxxcarlson$meenylatex$Internal$Render$mathJaxText = F2(
	function (displayMode, content) {
		return A3(
			elm$html$Html$node,
			'mathjax-text',
			_List_fromArray(
				[
					A2(
					elm$html$Html$Attributes$property,
					'display',
					elm$json$Json$Encode$bool(true)),
					A2(
					elm$html$Html$Attributes$property,
					'content',
					elm$json$Json$Encode$string(
						A3(elm$core$String$replace, '\\ \\', '\\\\', content)))
				]),
			_List_Nil);
	});
var jxxcarlson$meenylatex$Internal$Render$displayMathJaxTextWithLabel_ = F3(
	function (latexState, str, label) {
		return A2(
			elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							A2(elm$html$Html$Attributes$style, 'float', 'right'),
							A2(elm$html$Html$Attributes$style, 'margin-top', '3px')
						]),
					_List_fromArray(
						[
							elm$html$Html$text(label)
						])),
					A2(
					elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[
							A2(
							jxxcarlson$meenylatex$Internal$Render$mathJaxText,
							jxxcarlson$meenylatex$Internal$Render$DisplayMathMode,
							elm$core$String$trim(str))
						]))
				]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderMathJaxEnvironment = F4(
	function (envName, source, latexState, body) {
		var s1 = A2(jxxcarlson$meenylatex$Internal$LatexState$getCounter, 's1', latexState);
		var r = A2(jxxcarlson$meenylatex$Internal$RenderToString$render, latexState, body);
		var innerContents = function () {
			if (body.$ === 'LXString') {
				var str = body.a;
				return function (x) {
					return '\\begin{' + (envName + ('}\n' + (x + ('\n\\end{' + (envName + '}')))));
				}(
					jxxcarlson$meenylatex$Internal$ParserHelpers$removeLabel(
						A3(
							elm$core$String$replace,
							'\\ \\',
							'\\\\',
							A2(
								jxxcarlson$meenylatex$Internal$MathMacro$evalStr,
								latexState.mathMacroDictionary,
								elm$core$String$trim(str)))));
			} else {
				return '';
			}
		}();
		var eqno = A2(jxxcarlson$meenylatex$Internal$LatexState$getCounter, 'eqno', latexState);
		var content = '\n\\begin{' + (envName + ('}\n' + (innerContents + ('\n\\end{' + (envName + '}\n')))));
		var addendum = (eqno > 0) ? ((s1 > 0) ? ('\\tag{' + (elm$core$String$fromInt(s1) + ('.' + (elm$core$String$fromInt(eqno) + '}')))) : ('\\tag{' + (elm$core$String$fromInt(eqno) + '}'))) : '';
		var tag = function () {
			var _n0 = jxxcarlson$meenylatex$Internal$ParserHelpers$getTag(addendum);
			if (_n0.$ === 'Nothing') {
				return '';
			} else {
				var tag_ = _n0.a;
				return '(' + (tag_ + ')');
			}
		}();
		return A3(jxxcarlson$meenylatex$Internal$Render$displayMathJaxTextWithLabel_, latexState, innerContents, tag);
	});
var jxxcarlson$meenylatex$Internal$Render$renderMathMacros = F3(
	function (_n0, _n1, _n2) {
		return A2(elm$html$Html$div, _List_Nil, _List_Nil);
	});
var jxxcarlson$meenylatex$Internal$Render$renderMdash = F3(
	function (source, latexState, args) {
		return A2(
			elm$html$Html$span,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('— ')
				]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderMedSkip = F3(
	function (_n0, latexState, args) {
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					A2(elm$html$Html$Attributes$style, 'height', '10px')
				]),
			_List_Nil);
	});
var jxxcarlson$meenylatex$Internal$Render$renderNdash = F3(
	function (source, latexState, args) {
		return A2(
			elm$html$Html$span,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('– ')
				]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderPercent = F3(
	function (_n0, latexState, args) {
		return A2(
			elm$html$Html$span,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('%')
				]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderPublicLink = F3(
	function (_n0, latexState, args) {
		var label = A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 1, latexState, args);
		var id = A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 0, latexState, args);
		var ref = A2(jxxcarlson$meenylatex$Internal$LatexState$getDictionaryItem, 'setclient', latexState) + ('/' + id);
		return A2(
			elm$html$Html$a,
			_List_fromArray(
				[
					elm$html$Html$Attributes$href(ref)
				]),
			_List_fromArray(
				[
					elm$html$Html$text(label)
				]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderRed = F3(
	function (_n0, latexState, args) {
		var arg = A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 0, latexState, args);
		return A2(
			elm$html$Html$span,
			_List_fromArray(
				[
					A2(elm$html$Html$Attributes$style, 'color', 'red')
				]),
			_List_fromArray(
				[
					elm$html$Html$text(arg)
				]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderRef = F3(
	function (source, latexState, args) {
		var key = A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 0, latexState, args);
		return A2(
			elm$html$Html$span,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text(
					A2(jxxcarlson$meenylatex$Internal$LatexState$getCrossReference, key, latexState))
				]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderRemote = F3(
	function (_n0, latexState, args) {
		var arg = A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 0, latexState, args);
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					A2(elm$html$Html$Attributes$style, 'color', 'red'),
					A2(elm$html$Html$Attributes$style, 'white-space', 'pre')
				]),
			_List_fromArray(
				[
					elm$html$Html$text(arg)
				]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderRevision = F3(
	function (_n0, latexState, args) {
		return A2(elm$html$Html$span, _List_Nil, _List_Nil);
	});
var jxxcarlson$meenylatex$Internal$Render$renderSetClient = F3(
	function (_n0, latexState, args) {
		return A2(elm$html$Html$span, _List_Nil, _List_Nil);
	});
var jxxcarlson$meenylatex$Internal$Render$renderSetCounter = F3(
	function (_n0, latexState, list) {
		return A2(elm$html$Html$span, _List_Nil, _List_Nil);
	});
var jxxcarlson$meenylatex$Internal$Render$renderSetDocId = F3(
	function (_n0, latexState, args) {
		return A2(elm$html$Html$span, _List_Nil, _List_Nil);
	});
var jxxcarlson$meenylatex$Internal$Render$renderSmallSkip = F3(
	function (_n0, latexState, args) {
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					A2(elm$html$Html$Attributes$style, 'height', '0px')
				]),
			_List_Nil);
	});
var jxxcarlson$meenylatex$Internal$Render$renderStrikeThrough = F3(
	function (_n0, latexState, args) {
		var arg = A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 0, latexState, args);
		return A2(
			elm$html$Html$span,
			_List_fromArray(
				[
					A2(elm$html$Html$Attributes$style, 'text-decoration', 'line-through')
				]),
			_List_fromArray(
				[
					elm$html$Html$text(arg)
				]));
	});
var Garados007$elm_svg_parser$SvgParser$toAttribute = function (_n0) {
	var name = _n0.a;
	var value = _n0.b;
	return A2(elm$virtual_dom$VirtualDom$attribute, name, value);
};
var elm$virtual_dom$VirtualDom$nodeNS = function (tag) {
	return _VirtualDom_nodeNS(
		_VirtualDom_noScript(tag));
};
var elm$svg$Svg$node = elm$virtual_dom$VirtualDom$nodeNS('http://www.w3.org/2000/svg');
var elm$svg$Svg$text = elm$virtual_dom$VirtualDom$text;
var Garados007$elm_svg_parser$SvgParser$elementToSvg = function (element) {
	return A3(
		elm$svg$Svg$node,
		element.name,
		A2(elm$core$List$map, Garados007$elm_svg_parser$SvgParser$toAttribute, element.attributes),
		A2(elm$core$List$map, Garados007$elm_svg_parser$SvgParser$nodeToSvg, element.children));
};
var Garados007$elm_svg_parser$SvgParser$nodeToSvg = function (svgNode) {
	switch (svgNode.$) {
		case 'SvgElement':
			var element = svgNode.a;
			return Garados007$elm_svg_parser$SvgParser$elementToSvg(element);
		case 'SvgText':
			var content = svgNode.a;
			return elm$svg$Svg$text(content);
		default:
			var content = svgNode.a;
			return elm$svg$Svg$text('');
	}
};
var Garados007$elm_svg_parser$SvgParser$flip = F3(
	function (func, b, a) {
		return A2(func, a, b);
	});
var andre_dietrich$parser_combinators$Combine$Parser = function (a) {
	return {$: 'Parser', a: a};
};
var andre_dietrich$parser_combinators$Combine$app = function (_n0) {
	var inner = _n0.a;
	return inner;
};
var andre_dietrich$parser_combinators$Combine$andThen = F2(
	function (f, p) {
		return andre_dietrich$parser_combinators$Combine$Parser(
			F2(
				function (state, stream) {
					var _n0 = A3(andre_dietrich$parser_combinators$Combine$app, p, state, stream);
					if (_n0.c.$ === 'Ok') {
						var rstate = _n0.a;
						var rstream = _n0.b;
						var res = _n0.c.a;
						return A3(
							andre_dietrich$parser_combinators$Combine$app,
							f(res),
							rstate,
							rstream);
					} else {
						var estate = _n0.a;
						var estream = _n0.b;
						var ms = _n0.c.a;
						return _Utils_Tuple3(
							estate,
							estream,
							elm$core$Result$Err(ms));
					}
				}));
	});
var andre_dietrich$parser_combinators$Combine$bimap = F3(
	function (fok, ferr, p) {
		return andre_dietrich$parser_combinators$Combine$Parser(
			F2(
				function (state, stream) {
					var _n0 = A3(andre_dietrich$parser_combinators$Combine$app, p, state, stream);
					if (_n0.c.$ === 'Ok') {
						var rstate = _n0.a;
						var rstream = _n0.b;
						var res = _n0.c.a;
						return _Utils_Tuple3(
							rstate,
							rstream,
							elm$core$Result$Ok(
								fok(res)));
					} else {
						var estate = _n0.a;
						var estream = _n0.b;
						var ms = _n0.c.a;
						return _Utils_Tuple3(
							estate,
							estream,
							elm$core$Result$Err(
								ferr(ms)));
					}
				}));
	});
var andre_dietrich$parser_combinators$Combine$map = F2(
	function (f, p) {
		return A3(andre_dietrich$parser_combinators$Combine$bimap, f, elm$core$Basics$identity, p);
	});
var pilatch$flip$Flip$flip = F3(
	function (_function, argB, argA) {
		return A2(_function, argA, argB);
	});
var andre_dietrich$parser_combinators$Combine$andMap = F2(
	function (rp, lp) {
		return A2(
			andre_dietrich$parser_combinators$Combine$andThen,
			A2(pilatch$flip$Flip$flip, andre_dietrich$parser_combinators$Combine$map, rp),
			lp);
	});
var Garados007$elm_svg_parser$SvgParser$andMapRight = F2(
	function (lp, rp) {
		return A2(
			andre_dietrich$parser_combinators$Combine$andMap,
			rp,
			A2(
				andre_dietrich$parser_combinators$Combine$map,
				Garados007$elm_svg_parser$SvgParser$flip(elm$core$Basics$always),
				lp));
	});
var Garados007$elm_svg_parser$SvgParser$SvgElement = function (a) {
	return {$: 'SvgElement', a: a};
};
var Garados007$elm_svg_parser$SvgParser$andMapLeft = F2(
	function (lp, rp) {
		return A2(
			andre_dietrich$parser_combinators$Combine$andMap,
			rp,
			A2(andre_dietrich$parser_combinators$Combine$map, elm$core$Basics$always, lp));
	});
var Garados007$elm_svg_parser$SvgParser$SvgComment = function (a) {
	return {$: 'SvgComment', a: a};
};
var andre_dietrich$parser_combinators$Combine$succeed = function (res) {
	return andre_dietrich$parser_combinators$Combine$Parser(
		F2(
			function (state, stream) {
				return _Utils_Tuple3(
					state,
					stream,
					elm$core$Result$Ok(res));
			}));
};
var andre_dietrich$parser_combinators$Combine$lazy = function (t) {
	return A2(
		andre_dietrich$parser_combinators$Combine$andThen,
		t,
		andre_dietrich$parser_combinators$Combine$succeed(_Utils_Tuple0));
};
var andre_dietrich$parser_combinators$Combine$manyTill = F2(
	function (p, end_) {
		var accumulate = F3(
			function (acc, state, stream) {
				accumulate:
				while (true) {
					var _n0 = A3(andre_dietrich$parser_combinators$Combine$app, end_, state, stream);
					if (_n0.c.$ === 'Ok') {
						var rstate = _n0.a;
						var rstream = _n0.b;
						return _Utils_Tuple3(
							rstate,
							rstream,
							elm$core$Result$Ok(
								elm$core$List$reverse(acc)));
					} else {
						var estate = _n0.a;
						var estream = _n0.b;
						var ms = _n0.c.a;
						var _n1 = A3(andre_dietrich$parser_combinators$Combine$app, p, state, stream);
						if (_n1.c.$ === 'Ok') {
							var rstate = _n1.a;
							var rstream = _n1.b;
							var res = _n1.c.a;
							var $temp$acc = A2(elm$core$List$cons, res, acc),
								$temp$state = rstate,
								$temp$stream = rstream;
							acc = $temp$acc;
							state = $temp$state;
							stream = $temp$stream;
							continue accumulate;
						} else {
							return _Utils_Tuple3(
								estate,
								estream,
								elm$core$Result$Err(ms));
						}
					}
				}
			});
		return andre_dietrich$parser_combinators$Combine$Parser(
			accumulate(_List_Nil));
	});
var elm$core$String$startsWith = _String_startsWith;
var andre_dietrich$parser_combinators$Combine$string = function (s) {
	return andre_dietrich$parser_combinators$Combine$Parser(
		F2(
			function (state, stream) {
				if (A2(elm$core$String$startsWith, s, stream.input)) {
					var len = elm$core$String$length(s);
					var pos = stream.position + len;
					var rem = A2(elm$core$String$dropLeft, len, stream.input);
					return _Utils_Tuple3(
						state,
						_Utils_update(
							stream,
							{input: rem, position: pos}),
						elm$core$Result$Ok(s));
				} else {
					return _Utils_Tuple3(
						state,
						stream,
						elm$core$Result$Err(
							_List_fromArray(
								['expected \"' + (s + '\"')])));
				}
			}));
};
var andre_dietrich$parser_combinators$Combine$mapError = andre_dietrich$parser_combinators$Combine$bimap(elm$core$Basics$identity);
var andre_dietrich$parser_combinators$Combine$onerror = F2(
	function (m, p) {
		return A2(
			andre_dietrich$parser_combinators$Combine$mapError,
			elm$core$Basics$always(
				_List_fromArray(
					[m])),
			p);
	});
var elm$regex$Regex$findAtMost = _Regex_findAtMost;
var andre_dietrich$parser_combinators$Combine$regexer = F5(
	function (input, output, pat, state, stream) {
		var pattern = A2(elm$core$String$startsWith, '^', pat) ? pat : ('^' + pat);
		var _n0 = A3(
			elm$regex$Regex$findAtMost,
			1,
			A2(
				elm$core$Maybe$withDefault,
				elm$regex$Regex$never,
				input(pattern)),
			stream.input);
		if (_n0.b && (!_n0.b.b)) {
			var match = _n0.a;
			var len = elm$core$String$length(match.match);
			var pos = stream.position + len;
			var rem = A2(elm$core$String$dropLeft, len, stream.input);
			return _Utils_Tuple3(
				state,
				_Utils_update(
					stream,
					{input: rem, position: pos}),
				elm$core$Result$Ok(
					output(match)));
		} else {
			return _Utils_Tuple3(
				state,
				stream,
				elm$core$Result$Err(
					_List_fromArray(
						['expected input matching Regexp /' + (pattern + '/')])));
		}
	});
var andre_dietrich$parser_combinators$Combine$regex = A2(
	elm$core$Basics$composeR,
	A2(
		andre_dietrich$parser_combinators$Combine$regexer,
		elm$regex$Regex$fromString,
		function ($) {
			return $.match;
		}),
	andre_dietrich$parser_combinators$Combine$Parser);
var andre_dietrich$parser_combinators$Combine$whitespace = A2(
	andre_dietrich$parser_combinators$Combine$onerror,
	'optional whitespace',
	andre_dietrich$parser_combinators$Combine$regex('\\s*'));
var andre_dietrich$parser_combinators$Combine$primitive = andre_dietrich$parser_combinators$Combine$Parser;
var andre_dietrich$parser_combinators$Combine$Char$satisfy = function (pred) {
	return andre_dietrich$parser_combinators$Combine$primitive(
		F2(
			function (state, stream) {
				var message = 'could not satisfy predicate';
				var _n0 = elm$core$String$uncons(stream.input);
				if (_n0.$ === 'Just') {
					var _n1 = _n0.a;
					var h = _n1.a;
					var rest = _n1.b;
					return pred(h) ? _Utils_Tuple3(
						state,
						_Utils_update(
							stream,
							{input: rest, position: stream.position + 1}),
						elm$core$Result$Ok(h)) : _Utils_Tuple3(
						state,
						stream,
						elm$core$Result$Err(
							_List_fromArray(
								[message])));
				} else {
					return _Utils_Tuple3(
						state,
						stream,
						elm$core$Result$Err(
							_List_fromArray(
								[message])));
				}
			}));
};
var andre_dietrich$parser_combinators$Combine$Char$anyChar = A2(
	andre_dietrich$parser_combinators$Combine$onerror,
	'expected any character',
	andre_dietrich$parser_combinators$Combine$Char$satisfy(
		elm$core$Basics$always(true)));
var elm$core$String$fromList = _String_fromList;
var Garados007$elm_svg_parser$SvgParser$commentParser = andre_dietrich$parser_combinators$Combine$lazy(
	function (_n0) {
		return A2(
			andre_dietrich$parser_combinators$Combine$map,
			A2(elm$core$Basics$composeL, Garados007$elm_svg_parser$SvgParser$SvgComment, elm$core$String$fromList),
			A2(
				Garados007$elm_svg_parser$SvgParser$andMapRight,
				A2(
					Garados007$elm_svg_parser$SvgParser$andMapRight,
					andre_dietrich$parser_combinators$Combine$whitespace,
					andre_dietrich$parser_combinators$Combine$string('<!--')),
				A2(
					andre_dietrich$parser_combinators$Combine$manyTill,
					andre_dietrich$parser_combinators$Combine$Char$anyChar,
					andre_dietrich$parser_combinators$Combine$string('-->'))));
	});
var Garados007$elm_svg_parser$SvgParser$Element = F3(
	function (name, attributes, children) {
		return {attributes: attributes, children: children, name: name};
	});
var andre_dietrich$parser_combinators$Combine$or = F2(
	function (lp, rp) {
		return andre_dietrich$parser_combinators$Combine$Parser(
			F2(
				function (state, stream) {
					var _n0 = A3(andre_dietrich$parser_combinators$Combine$app, lp, state, stream);
					if (_n0.c.$ === 'Ok') {
						var res = _n0;
						return res;
					} else {
						var lms = _n0.c.a;
						var _n1 = A3(andre_dietrich$parser_combinators$Combine$app, rp, state, stream);
						if (_n1.c.$ === 'Ok') {
							var res = _n1;
							return res;
						} else {
							var rms = _n1.c.a;
							return _Utils_Tuple3(
								state,
								stream,
								elm$core$Result$Err(
									_Utils_ap(lms, rms)));
						}
					}
				}));
	});
var andre_dietrich$parser_combinators$Combine$optional = F2(
	function (res, p) {
		return A2(
			andre_dietrich$parser_combinators$Combine$or,
			p,
			andre_dietrich$parser_combinators$Combine$succeed(res));
	});
var Garados007$elm_svg_parser$SvgParser$attributeParser = A2(
	andre_dietrich$parser_combinators$Combine$andMap,
	A2(
		andre_dietrich$parser_combinators$Combine$optional,
		'',
		A2(
			Garados007$elm_svg_parser$SvgParser$andMapLeft,
			A2(
				Garados007$elm_svg_parser$SvgParser$andMapRight,
				andre_dietrich$parser_combinators$Combine$string('=\"'),
				andre_dietrich$parser_combinators$Combine$regex('[^\"]*')),
			andre_dietrich$parser_combinators$Combine$string('\"'))),
	A2(
		andre_dietrich$parser_combinators$Combine$map,
		elm$core$Tuple$pair,
		andre_dietrich$parser_combinators$Combine$regex('[^=>/]+')));
var andre_dietrich$parser_combinators$Combine$keep = F2(
	function (p1, p2) {
		return A2(
			andre_dietrich$parser_combinators$Combine$andMap,
			p1,
			A2(
				andre_dietrich$parser_combinators$Combine$map,
				pilatch$flip$Flip$flip(elm$core$Basics$always),
				p2));
	});
var andre_dietrich$parser_combinators$Combine$many = function (p) {
	var accumulate = F3(
		function (acc, state, stream) {
			accumulate:
			while (true) {
				var _n0 = A3(andre_dietrich$parser_combinators$Combine$app, p, state, stream);
				if (_n0.c.$ === 'Ok') {
					var rstate = _n0.a;
					var rstream = _n0.b;
					var res = _n0.c.a;
					if (_Utils_eq(stream, rstream)) {
						return _Utils_Tuple3(
							rstate,
							rstream,
							elm$core$List$reverse(acc));
					} else {
						var $temp$acc = A2(elm$core$List$cons, res, acc),
							$temp$state = rstate,
							$temp$stream = rstream;
						acc = $temp$acc;
						state = $temp$state;
						stream = $temp$stream;
						continue accumulate;
					}
				} else {
					return _Utils_Tuple3(
						state,
						stream,
						elm$core$List$reverse(acc));
				}
			}
		});
	return andre_dietrich$parser_combinators$Combine$Parser(
		F2(
			function (state, stream) {
				var _n1 = A3(accumulate, _List_Nil, state, stream);
				var rstate = _n1.a;
				var rstream = _n1.b;
				var res = _n1.c;
				return _Utils_Tuple3(
					rstate,
					rstream,
					elm$core$Result$Ok(res));
			}));
};
var andre_dietrich$parser_combinators$Combine$sepBy1 = F2(
	function (sep, p) {
		return A2(
			andre_dietrich$parser_combinators$Combine$andMap,
			andre_dietrich$parser_combinators$Combine$many(
				A2(andre_dietrich$parser_combinators$Combine$keep, p, sep)),
			A2(andre_dietrich$parser_combinators$Combine$map, elm$core$List$cons, p));
	});
var andre_dietrich$parser_combinators$Combine$sepBy = F2(
	function (sep, p) {
		return A2(
			andre_dietrich$parser_combinators$Combine$or,
			A2(andre_dietrich$parser_combinators$Combine$sepBy1, sep, p),
			andre_dietrich$parser_combinators$Combine$succeed(_List_Nil));
	});
var Garados007$elm_svg_parser$SvgParser$openingParser = A3(
	Garados007$elm_svg_parser$SvgParser$flip,
	andre_dietrich$parser_combinators$Combine$andMap,
	A2(
		andre_dietrich$parser_combinators$Combine$andMap,
		andre_dietrich$parser_combinators$Combine$regex('[^/>\\s]+'),
		A2(
			andre_dietrich$parser_combinators$Combine$map,
			F3(
				function (_n0, tagName, attributes) {
					return A3(Garados007$elm_svg_parser$SvgParser$Element, tagName, attributes, _List_Nil);
				}),
			andre_dietrich$parser_combinators$Combine$string('<'))),
	A2(
		Garados007$elm_svg_parser$SvgParser$andMapLeft,
		A2(
			Garados007$elm_svg_parser$SvgParser$andMapRight,
			andre_dietrich$parser_combinators$Combine$whitespace,
			A2(andre_dietrich$parser_combinators$Combine$sepBy, andre_dietrich$parser_combinators$Combine$whitespace, Garados007$elm_svg_parser$SvgParser$attributeParser)),
		andre_dietrich$parser_combinators$Combine$whitespace));
var Garados007$elm_svg_parser$SvgParser$SvgText = function (a) {
	return {$: 'SvgText', a: a};
};
var Garados007$elm_svg_parser$SvgParser$textParser = andre_dietrich$parser_combinators$Combine$lazy(
	function (_n0) {
		return A2(
			andre_dietrich$parser_combinators$Combine$map,
			Garados007$elm_svg_parser$SvgParser$SvgText,
			A2(
				Garados007$elm_svg_parser$SvgParser$andMapRight,
				andre_dietrich$parser_combinators$Combine$whitespace,
				andre_dietrich$parser_combinators$Combine$regex('[^<]+')));
	});
var andre_dietrich$parser_combinators$Combine$emptyErr = andre_dietrich$parser_combinators$Combine$Parser(
	F2(
		function (state, stream) {
			return _Utils_Tuple3(
				state,
				stream,
				elm$core$Result$Err(_List_Nil));
		}));
var andre_dietrich$parser_combinators$Combine$choice = function (xs) {
	return A3(elm$core$List$foldr, andre_dietrich$parser_combinators$Combine$or, andre_dietrich$parser_combinators$Combine$emptyErr, xs);
};
var Garados007$elm_svg_parser$SvgParser$closingOrChildrenParser = function (element) {
	var childrenParser = A2(
		andre_dietrich$parser_combinators$Combine$map,
		function (children) {
			return _Utils_update(
				element,
				{children: children});
		},
		A2(
			Garados007$elm_svg_parser$SvgParser$andMapLeft,
			A2(
				Garados007$elm_svg_parser$SvgParser$andMapLeft,
				A2(
					Garados007$elm_svg_parser$SvgParser$andMapRight,
					A2(
						Garados007$elm_svg_parser$SvgParser$andMapRight,
						andre_dietrich$parser_combinators$Combine$whitespace,
						andre_dietrich$parser_combinators$Combine$string('>')),
					andre_dietrich$parser_combinators$Combine$many(
						Garados007$elm_svg_parser$SvgParser$cyclic$nodeParser())),
				andre_dietrich$parser_combinators$Combine$whitespace),
			andre_dietrich$parser_combinators$Combine$string('</' + (element.name + '>'))));
	return andre_dietrich$parser_combinators$Combine$lazy(
		function (_n2) {
			return andre_dietrich$parser_combinators$Combine$choice(
				_List_fromArray(
					[
						A2(
						Garados007$elm_svg_parser$SvgParser$andMapRight,
						A2(
							Garados007$elm_svg_parser$SvgParser$andMapRight,
							andre_dietrich$parser_combinators$Combine$whitespace,
							andre_dietrich$parser_combinators$Combine$string('/>')),
						andre_dietrich$parser_combinators$Combine$succeed(element)),
						childrenParser
					]));
		});
};
function Garados007$elm_svg_parser$SvgParser$cyclic$elementParser() {
	return andre_dietrich$parser_combinators$Combine$lazy(
		function (_n1) {
			return A2(
				andre_dietrich$parser_combinators$Combine$map,
				Garados007$elm_svg_parser$SvgParser$SvgElement,
				A2(
					andre_dietrich$parser_combinators$Combine$andThen,
					Garados007$elm_svg_parser$SvgParser$closingOrChildrenParser,
					A2(
						andre_dietrich$parser_combinators$Combine$andMap,
						Garados007$elm_svg_parser$SvgParser$openingParser,
						A2(
							andre_dietrich$parser_combinators$Combine$map,
							Garados007$elm_svg_parser$SvgParser$flip(elm$core$Basics$always),
							andre_dietrich$parser_combinators$Combine$whitespace))));
		});
}
function Garados007$elm_svg_parser$SvgParser$cyclic$nodeParser() {
	return andre_dietrich$parser_combinators$Combine$lazy(
		function (_n0) {
			return andre_dietrich$parser_combinators$Combine$choice(
				_List_fromArray(
					[
						Garados007$elm_svg_parser$SvgParser$textParser,
						Garados007$elm_svg_parser$SvgParser$commentParser,
						Garados007$elm_svg_parser$SvgParser$cyclic$elementParser()
					]));
		});
}
try {
	var Garados007$elm_svg_parser$SvgParser$elementParser = Garados007$elm_svg_parser$SvgParser$cyclic$elementParser();
	Garados007$elm_svg_parser$SvgParser$cyclic$elementParser = function () {
		return Garados007$elm_svg_parser$SvgParser$elementParser;
	};
	var Garados007$elm_svg_parser$SvgParser$nodeParser = Garados007$elm_svg_parser$SvgParser$cyclic$nodeParser();
	Garados007$elm_svg_parser$SvgParser$cyclic$nodeParser = function () {
		return Garados007$elm_svg_parser$SvgParser$nodeParser;
	};
} catch ($) {
throw 'Some top-level definitions from `SvgParser` are causing infinite recursion:\n\n  ┌─────┐\n  │    closingOrChildrenParser\n  │     ↓\n  │    elementParser\n  │     ↓\n  │    nodeParser\n  └─────┘\n\nThese errors are very tricky, so read https://elm-lang.org/0.19.0/halting-problem to learn how to fix it!';}
var Garados007$elm_svg_parser$SvgParser$xmlDeclarationParser = A2(
	andre_dietrich$parser_combinators$Combine$map,
	elm$core$String$fromList,
	A2(
		Garados007$elm_svg_parser$SvgParser$andMapRight,
		A2(
			Garados007$elm_svg_parser$SvgParser$andMapRight,
			andre_dietrich$parser_combinators$Combine$whitespace,
			andre_dietrich$parser_combinators$Combine$string('<?xml')),
		A2(
			andre_dietrich$parser_combinators$Combine$manyTill,
			andre_dietrich$parser_combinators$Combine$Char$anyChar,
			andre_dietrich$parser_combinators$Combine$string('?>'))));
var andre_dietrich$parser_combinators$Combine$InputStream = F3(
	function (data, input, position) {
		return {data: data, input: input, position: position};
	});
var andre_dietrich$parser_combinators$Combine$initStream = function (s) {
	return A3(andre_dietrich$parser_combinators$Combine$InputStream, s, s, 0);
};
var andre_dietrich$parser_combinators$Combine$runParser = F3(
	function (p, st, s) {
		var _n0 = A3(
			andre_dietrich$parser_combinators$Combine$app,
			p,
			st,
			andre_dietrich$parser_combinators$Combine$initStream(s));
		if (_n0.c.$ === 'Ok') {
			var state = _n0.a;
			var stream = _n0.b;
			var res = _n0.c.a;
			return elm$core$Result$Ok(
				_Utils_Tuple3(state, stream, res));
		} else {
			var state = _n0.a;
			var stream = _n0.b;
			var ms = _n0.c.a;
			return elm$core$Result$Err(
				_Utils_Tuple3(state, stream, ms));
		}
	});
var Garados007$elm_svg_parser$SvgParser$parseToNode = function (input) {
	var _n0 = A3(
		andre_dietrich$parser_combinators$Combine$runParser,
		A2(
			Garados007$elm_svg_parser$SvgParser$andMapRight,
			A2(andre_dietrich$parser_combinators$Combine$optional, '', Garados007$elm_svg_parser$SvgParser$xmlDeclarationParser),
			Garados007$elm_svg_parser$SvgParser$nodeParser),
		_List_Nil,
		input);
	if (_n0.$ === 'Ok') {
		var _n1 = _n0.a;
		var svgNode = _n1.c;
		return elm$core$Result$Ok(svgNode);
	} else {
		var _n2 = _n0.a;
		var stream = _n2.b;
		var errors = _n2.c;
		return elm$core$Result$Err(
			A2(elm$core$String$join, ' or ', errors));
	}
};
var elm$core$Result$andThen = F2(
	function (callback, result) {
		if (result.$ === 'Ok') {
			var value = result.a;
			return callback(value);
		} else {
			var msg = result.a;
			return elm$core$Result$Err(msg);
		}
	});
var elm$svg$Svg$trustedNode = _VirtualDom_nodeNS('http://www.w3.org/2000/svg');
var elm$svg$Svg$svg = elm$svg$Svg$trustedNode('svg');
var Garados007$elm_svg_parser$SvgParser$parse = function (input) {
	var toHtml = function (svgNode) {
		if (svgNode.$ === 'SvgElement') {
			var element = svgNode.a;
			return (element.name === 'svg') ? elm$core$Result$Ok(
				A2(
					elm$svg$Svg$svg,
					A2(elm$core$List$map, Garados007$elm_svg_parser$SvgParser$toAttribute, element.attributes),
					A2(elm$core$List$map, Garados007$elm_svg_parser$SvgParser$nodeToSvg, element.children))) : elm$core$Result$Err('Top element is not svg');
		} else {
			return elm$core$Result$Err('Top element is not svg');
		}
	};
	return A2(
		elm$core$Result$andThen,
		toHtml,
		Garados007$elm_svg_parser$SvgParser$parseToNode(input));
};
var jxxcarlson$meenylatex$Internal$Render$renderSvg = F3(
	function (source, latexState, body) {
		var _n0 = Garados007$elm_svg_parser$SvgParser$parse(
			A2(jxxcarlson$meenylatex$Internal$RenderToString$render, latexState, body));
		if (_n0.$ === 'Ok') {
			var html_ = _n0.a;
			return html_;
		} else {
			return A2(
				elm$html$Html$span,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('X6')
					]),
				_List_fromArray(
					[
						elm$html$Html$text('SVG parse error')
					]));
		}
	});
var jxxcarlson$meenylatex$Internal$Render$makeTableOfContents = function (latexState) {
	var toc = A2(
		elm$core$List$filter,
		function (item) {
			return item.level === 1;
		},
		latexState.tableOfContents);
	return A3(
		elm$core$List$foldl,
		F2(
			function (tocItem, acc) {
				return _Utils_ap(
					acc,
					_List_fromArray(
						[
							A2(jxxcarlson$meenylatex$Internal$Render$makeTocItem, '', tocItem)
						]));
			}),
		_List_Nil,
		A2(elm$core$List$indexedMap, elm$core$Tuple$pair, toc));
};
var jxxcarlson$meenylatex$Internal$Render$renderTableOfContents = F3(
	function (_n0, latexState, list) {
		var innerPart = jxxcarlson$meenylatex$Internal$Render$makeTableOfContents(latexState);
		return A2(
			elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					elm$html$Html$h3,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text('Table of Contents')
						])),
					A2(elm$html$Html$ul, _List_Nil, innerPart)
				]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderTerm = F3(
	function (_n0, latexState, args) {
		var arg = A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 0, latexState, args);
		return A2(
			elm$html$Html$i,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text(arg)
				]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderTextMacros = F3(
	function (_n0, _n1, _n2) {
		return A2(elm$html$Html$div, _List_Nil, _List_Nil);
	});
var jxxcarlson$meenylatex$Internal$Render$renderTitle = F2(
	function (latexState, args) {
		return A2(elm$html$Html$span, _List_Nil, _List_Nil);
	});
var jxxcarlson$meenylatex$Internal$Render$renderUnderscore = F3(
	function (source, latexState, args) {
		return A2(
			elm$html$Html$span,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('_')
				]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderUseForWeb = F3(
	function (source, latexState, body) {
		return A2(
			jxxcarlson$meenylatex$Internal$Render$displayMathText,
			latexState,
			A2(jxxcarlson$meenylatex$Internal$RenderToString$render, latexState, body));
	});
var jxxcarlson$meenylatex$Internal$Render$renderUuid = F3(
	function (_n0, _n1, _n2) {
		return A2(elm$html$Html$span, _List_Nil, _List_Nil);
	});
var jxxcarlson$meenylatex$Internal$Render$renderVerbatim = F3(
	function (source, latexState, body) {
		var body2 = A2(jxxcarlson$meenylatex$Internal$RenderToString$render, latexState, body);
		return A2(
			elm$html$Html$pre,
			_List_fromArray(
				[
					A2(elm$html$Html$Attributes$style, 'margin-top', '0px'),
					A2(elm$html$Html$Attributes$style, 'margin-bottom', '0px'),
					A2(elm$html$Html$Attributes$style, 'margin-left', '25px'),
					A2(elm$html$Html$Attributes$style, 'font-size', '14px')
				]),
			_List_fromArray(
				[
					elm$html$Html$text(body2)
				]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderVerse = F3(
	function (source, latexState, body) {
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					A2(elm$html$Html$Attributes$style, 'white-space', 'pre-line')
				]),
			_List_fromArray(
				[
					elm$html$Html$text(
					elm$core$String$trim(
						A2(jxxcarlson$meenylatex$Internal$RenderToString$render, latexState, body)))
				]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderXLink = F3(
	function (_n0, latexState, args) {
		var label = A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 1, latexState, args);
		var id = A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 0, latexState, args);
		var ref = A2(jxxcarlson$meenylatex$Internal$LatexState$getDictionaryItem, 'setclient', latexState) + ('/' + id);
		return A2(
			elm$html$Html$a,
			_List_fromArray(
				[
					elm$html$Html$Attributes$href(ref)
				]),
			_List_fromArray(
				[
					elm$html$Html$text(label)
				]));
	});
var jxxcarlson$meenylatex$Internal$ListMachine$nextState = function (internalState_) {
	var nextInputList_ = A2(elm$core$List$drop, 1, internalState_.inputList);
	return {
		after: elm$core$List$head(
			A2(elm$core$List$drop, 1, nextInputList_)),
		before: internalState_.current,
		current: internalState_.after,
		inputList: nextInputList_
	};
};
var jxxcarlson$meenylatex$Internal$ListMachine$makeReducer = F3(
	function (computeOutput, input, machineState) {
		var nextInternalState_ = jxxcarlson$meenylatex$Internal$ListMachine$nextState(machineState.state);
		var nextInputList = A2(elm$core$List$drop, 1, machineState.state.inputList);
		var newOutput = computeOutput(machineState.state);
		var outputList = A2(elm$core$List$cons, newOutput, machineState.outputList);
		return {outputList: outputList, state: nextInternalState_};
	});
var jxxcarlson$meenylatex$Internal$ListMachine$initialState = function (inputList) {
	return {
		after: elm$core$List$head(
			A2(elm$core$List$drop, 1, inputList)),
		before: elm$core$Maybe$Nothing,
		current: elm$core$List$head(inputList),
		inputList: inputList
	};
};
var jxxcarlson$meenylatex$Internal$ListMachine$initialTotalState = function (inputList) {
	return {
		outputList: _List_Nil,
		state: jxxcarlson$meenylatex$Internal$ListMachine$initialState(inputList)
	};
};
var jxxcarlson$meenylatex$Internal$ListMachine$makeMachine = F3(
	function (reducer, initialMachineState_, inputList) {
		return A3(elm$core$List$foldl, reducer, initialMachineState_, inputList);
	});
var jxxcarlson$meenylatex$Internal$ListMachine$run_ = F2(
	function (reducer, inputList) {
		var initialTotalState_ = jxxcarlson$meenylatex$Internal$ListMachine$initialTotalState(inputList);
		var finalTotalState = A3(jxxcarlson$meenylatex$Internal$ListMachine$makeMachine, reducer, initialTotalState_, inputList);
		return elm$core$List$reverse(finalTotalState.outputList);
	});
var jxxcarlson$meenylatex$Internal$ListMachine$run = F2(
	function (outputFunction, inputList) {
		return A2(
			jxxcarlson$meenylatex$Internal$ListMachine$run_,
			jxxcarlson$meenylatex$Internal$ListMachine$makeReducer(outputFunction),
			inputList);
	});
var jxxcarlson$meenylatex$Internal$Render$firstChar = elm$core$String$left(1);
var jxxcarlson$meenylatex$Internal$Render$lastChar = elm$core$String$right(1);
var jxxcarlson$meenylatex$Internal$Render$addSpace = function (internalState) {
	var c = A2(
		elm$core$Maybe$withDefault,
		jxxcarlson$meenylatex$Internal$Parser$LXString(''),
		internalState.after);
	var b = A2(
		elm$core$Maybe$withDefault,
		jxxcarlson$meenylatex$Internal$Parser$LXString(''),
		internalState.current);
	var a = A2(
		elm$core$Maybe$withDefault,
		jxxcarlson$meenylatex$Internal$Parser$LXString(''),
		internalState.before);
	var _n0 = _Utils_Tuple3(a, b, c);
	if (_n0.b.$ === 'LXString') {
		switch (_n0.a.$) {
			case 'Macro':
				var _n1 = _n0.a;
				var str = _n0.b.a;
				return A2(
					elm$core$List$member,
					jxxcarlson$meenylatex$Internal$Render$firstChar(str),
					_List_fromArray(
						['.', ',', '?', '!', ';', ':'])) ? jxxcarlson$meenylatex$Internal$Parser$LXString(str) : jxxcarlson$meenylatex$Internal$Parser$LXString(' ' + str);
			case 'InlineMath':
				var str = _n0.b.a;
				return A2(
					elm$core$List$member,
					jxxcarlson$meenylatex$Internal$Render$firstChar(str),
					_List_fromArray(
						['-', '.', ',', '?', '!', ';', ':'])) ? jxxcarlson$meenylatex$Internal$Parser$LXString(str) : jxxcarlson$meenylatex$Internal$Parser$LXString(' ' + str);
			default:
				var str = _n0.b.a;
				return A2(
					elm$core$List$member,
					jxxcarlson$meenylatex$Internal$Render$lastChar(str),
					_List_fromArray(
						[')', '.', ',', '?', '!', ';', ':'])) ? jxxcarlson$meenylatex$Internal$Parser$LXString(str + ' ') : jxxcarlson$meenylatex$Internal$Parser$LXString(str);
		}
	} else {
		return b;
	}
};
var jxxcarlson$meenylatex$Internal$Render$spacify = function (latexList) {
	return A2(jxxcarlson$meenylatex$Internal$ListMachine$run, jxxcarlson$meenylatex$Internal$Render$addSpace, latexList);
};
var jxxcarlson$meenylatex$Internal$Render$theoremLikeEnvironments = _List_fromArray(
	['theorem', 'proposition', 'corollary', 'lemma', 'definition', 'problem']);
var jxxcarlson$meenylatex$Internal$Utility$capitalize = function (str) {
	return _Utils_ap(
		elm$core$String$toUpper(
			A2(elm$core$String$left, 1, str)),
		A2(elm$core$String$dropLeft, 1, str));
};
var jxxcarlson$meenylatex$Internal$Render$environmentRenderer = F2(
	function (source, name) {
		var _n8 = A2(
			elm$core$Dict$get,
			name,
			jxxcarlson$meenylatex$Internal$Render$cyclic$renderEnvironmentDict());
		if (_n8.$ === 'Just') {
			var f = _n8.a;
			return f(source);
		} else {
			return A2(jxxcarlson$meenylatex$Internal$Render$renderDefaultEnvironment, source, name);
		}
	});
var jxxcarlson$meenylatex$Internal$Render$render = F3(
	function (source, latexState, latexExpression) {
		switch (latexExpression.$) {
			case 'Comment':
				var str = latexExpression.a;
				return A2(
					elm$html$Html$p,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text('')
						]));
			case 'Macro':
				var name = latexExpression.a;
				var optArgs = latexExpression.b;
				var args = latexExpression.c;
				return A5(jxxcarlson$meenylatex$Internal$Render$renderMacro, source, latexState, name, optArgs, args);
			case 'SMacro':
				var name = latexExpression.a;
				var optArgs = latexExpression.b;
				var args = latexExpression.c;
				var le = latexExpression.d;
				return A6(jxxcarlson$meenylatex$Internal$Render$renderSMacro, source, latexState, name, optArgs, args, le);
			case 'Item':
				var level = latexExpression.a;
				var latexExpr = latexExpression.b;
				return A4(jxxcarlson$meenylatex$Internal$Render$renderItem, source, latexState, level, latexExpr);
			case 'InlineMath':
				var str = latexExpression.a;
				return A2(
					elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							jxxcarlson$meenylatex$Internal$Render$oneSpace,
							A2(
							jxxcarlson$meenylatex$Internal$Render$inlineMathText,
							latexState,
							A2(jxxcarlson$meenylatex$Internal$MathMacro$evalStr, latexState.mathMacroDictionary, str))
						]));
			case 'DisplayMath':
				var str = latexExpression.a;
				return A2(
					jxxcarlson$meenylatex$Internal$Render$displayMathText,
					latexState,
					A2(jxxcarlson$meenylatex$Internal$MathMacro$evalStr, latexState.mathMacroDictionary, str));
			case 'Environment':
				var name = latexExpression.a;
				var args = latexExpression.b;
				var body = latexExpression.c;
				return A5(jxxcarlson$meenylatex$Internal$Render$renderEnvironment, source, latexState, name, args, body);
			case 'LatexList':
				var latexList = latexExpression.a;
				return A3(
					jxxcarlson$meenylatex$Internal$Render$renderLatexList,
					source,
					latexState,
					jxxcarlson$meenylatex$Internal$Render$spacify(latexList));
			case 'LXString':
				var str = latexExpression.a;
				var _n7 = A2(elm$core$String$left, 1, str);
				if (_n7 === ' ') {
					return A2(
						elm$html$Html$span,
						_List_fromArray(
							[
								A2(elm$html$Html$Attributes$style, 'margin-left', '1px')
							]),
						_List_fromArray(
							[
								elm$html$Html$text(str)
							]));
				} else {
					return A2(
						elm$html$Html$span,
						_List_Nil,
						_List_fromArray(
							[
								elm$html$Html$text(str)
							]));
				}
			case 'NewCommand':
				var commandName = latexExpression.a;
				var numberOfArgs = latexExpression.b;
				var commandBody = latexExpression.c;
				return A2(elm$html$Html$span, _List_Nil, _List_Nil);
			default:
				var error = latexExpression.a;
				var err = A2(jxxcarlson$meenylatex$Internal$ErrorMessages2$renderErrors, source, error);
				var errorText = A2(
					elm$html$Html$p,
					_List_fromArray(
						[
							A2(elm$html$Html$Attributes$style, 'margin', '0')
						]),
					_List_fromArray(
						[
							elm$html$Html$text(
							A2(elm$core$String$join, '\n', err.errorText) + ' ...')
						]));
				var offset = elm$core$String$fromInt(5 * err.markerOffset) + 'px';
				return A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							A2(elm$html$Html$Attributes$style, 'font', 'Courier'),
							A2(elm$html$Html$Attributes$style, 'font-family', 'Mono'),
							A2(elm$html$Html$Attributes$style, 'font-size', '15px')
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									A2(elm$html$Html$Attributes$style, 'color', 'blue'),
									A2(elm$html$Html$Attributes$style, 'margin', '0')
								]),
							_List_fromArray(
								[errorText])),
							A2(
							elm$html$Html$div,
							_List_fromArray(
								[
									A2(elm$html$Html$Attributes$style, 'color', 'blue'),
									A2(elm$html$Html$Attributes$style, 'margin-left', offset)
								]),
							_List_fromArray(
								[
									elm$html$Html$text('^')
								])),
							A2(
							elm$html$Html$p,
							_List_fromArray(
								[
									A2(elm$html$Html$Attributes$style, 'color', 'red'),
									A2(elm$html$Html$Attributes$style, 'margin', '0')
								]),
							_List_fromArray(
								[
									elm$html$Html$text(err.explanation)
								]))
						]));
		}
	});
var jxxcarlson$meenylatex$Internal$Render$renderArg = F4(
	function (source, k, latexState, args) {
		return A3(
			jxxcarlson$meenylatex$Internal$Render$render,
			source,
			latexState,
			A2(jxxcarlson$meenylatex$Internal$Render$getElement, k, args));
	});
var jxxcarlson$meenylatex$Internal$Render$renderArgList = F3(
	function (source, latexState, args) {
		return A2(
			elm$core$List$map,
			A2(jxxcarlson$meenylatex$Internal$Render$render, source, latexState),
			args);
	});
var jxxcarlson$meenylatex$Internal$Render$renderBackslash = F3(
	function (source, latexState, args) {
		return A2(
			elm$html$Html$span,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('\\'),
					A4(jxxcarlson$meenylatex$Internal$Render$renderArg, source, 0, latexState, args)
				]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderBibItem = F5(
	function (source, latexState, optArgs, args, body) {
		var label = (elm$core$List$length(optArgs) === 1) ? A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 0, latexState, optArgs) : A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 0, latexState, args);
		var id = 'bibitem:' + label;
		return A2(
			elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					elm$html$Html$strong,
					_List_fromArray(
						[
							elm$html$Html$Attributes$id(id),
							A2(elm$html$Html$Attributes$style, 'margin-right', '10px')
						]),
					_List_fromArray(
						[
							elm$html$Html$text('[' + (label + ']'))
						])),
					A2(
					elm$html$Html$span,
					_List_Nil,
					_List_fromArray(
						[
							A3(jxxcarlson$meenylatex$Internal$Render$render, source, latexState, body)
						]))
				]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderCell = F3(
	function (source, latexState, cell) {
		switch (cell.$) {
			case 'LXString':
				var s = cell.a;
				return A2(
					elm$html$Html$td,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text(s)
						]));
			case 'InlineMath':
				var s = cell.a;
				return A2(
					elm$html$Html$td,
					_List_Nil,
					_List_fromArray(
						[
							A2(jxxcarlson$meenylatex$Internal$Render$inlineMathText, latexState, s)
						]));
			case 'Macro':
				var s = cell.a;
				var x = cell.b;
				var y = cell.c;
				return A2(
					elm$html$Html$td,
					_List_Nil,
					_List_fromArray(
						[
							A5(jxxcarlson$meenylatex$Internal$Render$renderMacro, source, jxxcarlson$meenylatex$Internal$LatexState$emptyLatexState, s, x, y)
						]));
			default:
				return A2(elm$html$Html$td, _List_Nil, _List_Nil);
		}
	});
var jxxcarlson$meenylatex$Internal$Render$renderCenterEnvironment = F3(
	function (source, latexState, body) {
		var r = A3(jxxcarlson$meenylatex$Internal$Render$render, source, latexState, body);
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					A2(elm$html$Html$Attributes$style, 'display', 'flex'),
					A2(elm$html$Html$Attributes$style, 'flex-direction', 'row'),
					A2(elm$html$Html$Attributes$style, 'justify-content', 'center')
				]),
			_List_fromArray(
				[r]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderCode = F3(
	function (source, latexState, args) {
		var arg = A4(jxxcarlson$meenylatex$Internal$Render$renderArg, source, 0, latexState, args);
		return A2(
			elm$html$Html$code,
			_List_Nil,
			_List_fromArray(
				[jxxcarlson$meenylatex$Internal$Render$oneSpace, arg]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderDefItemEnvironment = F4(
	function (source, latexState, optArgs, body) {
		return A2(
			elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A2(
					elm$html$Html$strong,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text(
							A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 0, latexState, optArgs))
						])),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							A2(elm$html$Html$Attributes$style, 'margin-left', '25px'),
							A2(elm$html$Html$Attributes$style, 'margin-top', '10px')
						]),
					_List_fromArray(
						[
							A3(jxxcarlson$meenylatex$Internal$Render$render, source, latexState, body)
						]))
				]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderDefaultEnvironment = F5(
	function (source, name, latexState, args, body) {
		return A2(elm$core$List$member, name, jxxcarlson$meenylatex$Internal$Render$theoremLikeEnvironments) ? A5(jxxcarlson$meenylatex$Internal$Render$renderTheoremLikeEnvironment, source, latexState, name, args, body) : A5(
			jxxcarlson$meenylatex$Internal$Render$renderDefaultEnvironment2,
			source,
			latexState,
			jxxcarlson$meenylatex$Internal$Utility$capitalize(name),
			args,
			body);
	});
var jxxcarlson$meenylatex$Internal$Render$renderDefaultEnvironment2 = F5(
	function (source, latexState, name, args, body) {
		var r = A3(jxxcarlson$meenylatex$Internal$Render$render, source, latexState, body);
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('environment')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$strong,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text(name)
						])),
					A2(
					elm$html$Html$div,
					_List_Nil,
					_List_fromArray(
						[r]))
				]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderEnumerate = F3(
	function (source, latexState, body) {
		return A2(
			elm$html$Html$ol,
			_List_fromArray(
				[
					A2(elm$html$Html$Attributes$style, 'margin-top', '0px')
				]),
			_List_fromArray(
				[
					A3(jxxcarlson$meenylatex$Internal$Render$render, source, latexState, body)
				]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderEnvironment = F5(
	function (source, latexState, name, args, body) {
		return A5(jxxcarlson$meenylatex$Internal$Render$environmentRenderer, source, name, latexState, args, body);
	});
var jxxcarlson$meenylatex$Internal$Render$renderIndentEnvironment = F3(
	function (source, latexState, body) {
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					A2(elm$html$Html$Attributes$style, 'margin-left', '2em')
				]),
			_List_fromArray(
				[
					A3(jxxcarlson$meenylatex$Internal$Render$render, source, latexState, body)
				]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderItalic = F3(
	function (source, latexState, args) {
		return A2(
			elm$html$Html$i,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text(' '),
					A4(jxxcarlson$meenylatex$Internal$Render$renderArg, source, 0, latexState, args)
				]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderItem = F4(
	function (source, latexState, level, latexExpression) {
		return A2(
			elm$html$Html$li,
			_List_fromArray(
				[
					A2(elm$html$Html$Attributes$style, 'margin-bottom', '8px')
				]),
			_List_fromArray(
				[
					A3(jxxcarlson$meenylatex$Internal$Render$render, source, latexState, latexExpression)
				]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderItemize = F3(
	function (source, latexState, body) {
		return A2(
			elm$html$Html$ul,
			_List_fromArray(
				[
					A2(elm$html$Html$Attributes$style, 'margin-top', '0px')
				]),
			_List_fromArray(
				[
					A3(jxxcarlson$meenylatex$Internal$Render$render, source, latexState, body)
				]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderLatexList = F3(
	function (source, latexState, latexList) {
		return function (list) {
			return A2(
				elm$html$Html$span,
				_List_fromArray(
					[
						A2(elm$html$Html$Attributes$style, 'margin-bottom', '10px')
					]),
				list);
		}(
			A2(
				elm$core$List$map,
				A2(jxxcarlson$meenylatex$Internal$Render$render, source, latexState),
				latexList));
	});
var jxxcarlson$meenylatex$Internal$Render$renderMacro = F5(
	function (source, latexState, name, optArgs, args) {
		var _n3 = A2(
			elm$core$Dict$get,
			name,
			jxxcarlson$meenylatex$Internal$Render$cyclic$renderMacroDict());
		if (_n3.$ === 'Just') {
			var f = _n3.a;
			return A4(f, source, latexState, optArgs, args);
		} else {
			var _n4 = A2(elm$core$Dict$get, name, latexState.macroDictionary);
			if (_n4.$ === 'Nothing') {
				return A5(jxxcarlson$meenylatex$Internal$Render$reproduceMacro, source, name, latexState, optArgs, args);
			} else {
				var macroDefinition = _n4.a;
				var macro = A3(jxxcarlson$meenylatex$Internal$Parser$Macro, name, optArgs, args);
				var expr = A2(jxxcarlson$meenylatex$Internal$Macro$expandMacro, macro, macroDefinition);
				return A3(jxxcarlson$meenylatex$Internal$Render$render, source, latexState, expr);
			}
		}
	});
var jxxcarlson$meenylatex$Internal$Render$renderObeyLinesEnvironment = F3(
	function (source, latexState, body) {
		var r = A3(jxxcarlson$meenylatex$Internal$Render$render, source, latexState, body);
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					A2(elm$html$Html$Attributes$style, 'white-space', 'pre')
				]),
			_List_fromArray(
				[r]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderQuotation = F3(
	function (source, latexState, body) {
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					A2(elm$html$Html$Attributes$style, 'margin-left', '2em'),
					A2(elm$html$Html$Attributes$style, 'font-style', 'italic')
				]),
			_List_fromArray(
				[
					A3(jxxcarlson$meenylatex$Internal$Render$render, source, latexState, body)
				]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderRow = F3(
	function (source, latexState, row) {
		if (row.$ === 'LatexList') {
			var row_ = row.a;
			return A2(
				elm$html$Html$tr,
				_List_Nil,
				A2(
					elm$core$List$map,
					A2(jxxcarlson$meenylatex$Internal$Render$renderCell, source, latexState),
					row_));
		} else {
			return A2(elm$html$Html$tr, _List_Nil, _List_Nil);
		}
	});
var jxxcarlson$meenylatex$Internal$Render$renderSMacro = F6(
	function (source, latexState, name, optArgs, args, le) {
		var _n1 = A2(
			elm$core$Dict$get,
			name,
			jxxcarlson$meenylatex$Internal$Render$cyclic$renderSMacroDict());
		if (_n1.$ === 'Just') {
			var f = _n1.a;
			return A5(f, source, latexState, optArgs, args, le);
		} else {
			return A6(jxxcarlson$meenylatex$Internal$Render$reproduceSMacro, source, name, latexState, optArgs, args, le);
		}
	});
var jxxcarlson$meenylatex$Internal$Render$renderSection = F3(
	function (source, latexState, args) {
		var s1 = A2(jxxcarlson$meenylatex$Internal$LatexState$getCounter, 's1', latexState);
		var renderedArgs = A3(jxxcarlson$meenylatex$Internal$Render$renderArgList, source, latexState, args);
		var ref = A2(
			jxxcarlson$meenylatex$Internal$Render$idPhrase,
			'section',
			A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 0, latexState, args));
		var label = (s1 > 0) ? (elm$core$String$fromInt(s1) + ' ') : '';
		return A2(
			elm$html$Html$h2,
			A2(jxxcarlson$meenylatex$Internal$Render$headingStyle, ref, 24),
			A2(
				elm$core$List$cons,
				elm$html$Html$text(label),
				renderedArgs));
	});
var jxxcarlson$meenylatex$Internal$Render$renderSectionStar = F3(
	function (source, latexState, args) {
		var renderedArgs = A3(jxxcarlson$meenylatex$Internal$Render$renderArgList, source, latexState, args);
		var ref = A2(
			jxxcarlson$meenylatex$Internal$Render$idPhrase,
			'section',
			A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 0, latexState, args));
		return A2(
			elm$html$Html$h2,
			A2(jxxcarlson$meenylatex$Internal$Render$headingStyle, ref, 24),
			renderedArgs);
	});
var jxxcarlson$meenylatex$Internal$Render$renderStrong = F3(
	function (source, latexState, args) {
		return A2(
			elm$html$Html$strong,
			_List_Nil,
			_List_fromArray(
				[
					jxxcarlson$meenylatex$Internal$Render$oneSpace,
					A4(jxxcarlson$meenylatex$Internal$Render$renderArg, source, 0, latexState, args)
				]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderSubSubsection = F3(
	function (source, latexState, args) {
		var s3 = A2(jxxcarlson$meenylatex$Internal$LatexState$getCounter, 's3', latexState);
		var s2 = A2(jxxcarlson$meenylatex$Internal$LatexState$getCounter, 's2', latexState);
		var s1 = A2(jxxcarlson$meenylatex$Internal$LatexState$getCounter, 's1', latexState);
		var renderedArgs = A3(jxxcarlson$meenylatex$Internal$Render$renderArgList, source, latexState, args);
		var ref = A2(
			jxxcarlson$meenylatex$Internal$Render$idPhrase,
			'subsubsection',
			A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 0, latexState, args));
		var label = (s1 > 0) ? (elm$core$String$fromInt(s1) + ('.' + (elm$core$String$fromInt(s2) + ('.' + (elm$core$String$fromInt(s3) + ' '))))) : '';
		return A2(
			elm$html$Html$h4,
			_List_fromArray(
				[
					elm$html$Html$Attributes$id(ref)
				]),
			A2(
				elm$core$List$cons,
				elm$html$Html$text(label),
				renderedArgs));
	});
var jxxcarlson$meenylatex$Internal$Render$renderSubSubsectionStar = F3(
	function (source, latexState, args) {
		var renderedArgs = A3(jxxcarlson$meenylatex$Internal$Render$renderArgList, source, latexState, args);
		var ref = A2(
			jxxcarlson$meenylatex$Internal$Render$idPhrase,
			'subsubsection',
			A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 0, latexState, args));
		return A2(
			elm$html$Html$h4,
			_List_fromArray(
				[
					elm$html$Html$Attributes$id(ref)
				]),
			renderedArgs);
	});
var jxxcarlson$meenylatex$Internal$Render$renderSubheading = F3(
	function (source, latexState, args) {
		var renderedArgs = A3(jxxcarlson$meenylatex$Internal$Render$renderArgList, source, latexState, args);
		var ref = A2(
			jxxcarlson$meenylatex$Internal$Render$idPhrase,
			'subsubsection',
			A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 0, latexState, args));
		return A2(
			elm$html$Html$p,
			_List_fromArray(
				[
					A2(elm$html$Html$Attributes$style, 'font-weight', 'bold'),
					A2(elm$html$Html$Attributes$style, 'margin-bottom', '0'),
					A2(elm$html$Html$Attributes$style, 'margin-left', '-2px'),
					elm$html$Html$Attributes$id(ref)
				]),
			renderedArgs);
	});
var jxxcarlson$meenylatex$Internal$Render$renderSubsection = F3(
	function (source, latexState, args) {
		var s2 = A2(jxxcarlson$meenylatex$Internal$LatexState$getCounter, 's2', latexState);
		var s1 = A2(jxxcarlson$meenylatex$Internal$LatexState$getCounter, 's1', latexState);
		var renderedArgs = A3(jxxcarlson$meenylatex$Internal$Render$renderArgList, source, latexState, args);
		var ref = A2(
			jxxcarlson$meenylatex$Internal$Render$idPhrase,
			'subsection',
			A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 0, latexState, args));
		var label = (s1 > 0) ? (elm$core$String$fromInt(s1) + ('.' + (elm$core$String$fromInt(s2) + ' '))) : '';
		return A2(
			elm$html$Html$h3,
			A2(jxxcarlson$meenylatex$Internal$Render$headingStyle, ref, 12),
			A2(
				elm$core$List$cons,
				elm$html$Html$text(label),
				renderedArgs));
	});
var jxxcarlson$meenylatex$Internal$Render$renderSubsectionStar = F3(
	function (source, latexState, args) {
		var renderedArgs = A3(jxxcarlson$meenylatex$Internal$Render$renderArgList, source, latexState, args);
		var ref = A2(
			jxxcarlson$meenylatex$Internal$Render$idPhrase,
			'subsection',
			A3(jxxcarlson$meenylatex$Internal$RenderToString$renderArg, 0, latexState, args));
		return A2(
			elm$html$Html$h3,
			A2(jxxcarlson$meenylatex$Internal$Render$headingStyle, ref, 12),
			renderedArgs);
	});
var jxxcarlson$meenylatex$Internal$Render$renderTableBody = F3(
	function (source, latexState, body) {
		if (body.$ === 'LatexList') {
			var body_ = body.a;
			return A2(
				elm$html$Html$tbody,
				_List_Nil,
				A2(
					elm$core$List$map,
					A2(jxxcarlson$meenylatex$Internal$Render$renderRow, source, latexState),
					body_));
		} else {
			return A2(elm$html$Html$tbody, _List_Nil, _List_Nil);
		}
	});
var jxxcarlson$meenylatex$Internal$Render$renderTabular = F3(
	function (source, latexState, body) {
		return A2(
			elm$html$Html$table,
			_List_fromArray(
				[
					A2(elm$html$Html$Attributes$style, 'border-spacing', '20px 10px'),
					A2(elm$html$Html$Attributes$style, 'margin-left', '-20px')
				]),
			_List_fromArray(
				[
					A3(jxxcarlson$meenylatex$Internal$Render$renderTableBody, source, latexState, body)
				]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderTexArg = F3(
	function (source, latexState, args) {
		return A2(
			elm$html$Html$span,
			_List_Nil,
			_List_fromArray(
				[
					elm$html$Html$text('{'),
					A4(jxxcarlson$meenylatex$Internal$Render$renderArg, source, 0, latexState, args),
					elm$html$Html$text('}')
				]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderTheBibliography = F3(
	function (source, latexState, body) {
		return A2(
			elm$html$Html$div,
			_List_Nil,
			_List_fromArray(
				[
					A3(jxxcarlson$meenylatex$Internal$Render$render, source, latexState, body)
				]));
	});
var jxxcarlson$meenylatex$Internal$Render$renderTheoremLikeEnvironment = F5(
	function (source, latexState, name, args, body) {
		var tno = A2(jxxcarlson$meenylatex$Internal$LatexState$getCounter, 'tno', latexState);
		var s1 = A2(jxxcarlson$meenylatex$Internal$LatexState$getCounter, 's1', latexState);
		var tnoString = (s1 > 0) ? (' ' + (elm$core$String$fromInt(s1) + ('.' + elm$core$String$fromInt(tno)))) : (' ' + elm$core$String$fromInt(tno));
		var r = A3(jxxcarlson$meenylatex$Internal$Render$render, source, latexState, body);
		var eqno = A2(jxxcarlson$meenylatex$Internal$LatexState$getCounter, 'eqno', latexState);
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('environment')
				]),
			_List_fromArray(
				[
					A2(
					elm$html$Html$strong,
					_List_Nil,
					_List_fromArray(
						[
							elm$html$Html$text(
							_Utils_ap(
								jxxcarlson$meenylatex$Internal$Utility$capitalize(name),
								tnoString))
						])),
					A2(
					elm$html$Html$div,
					_List_fromArray(
						[
							elm$html$Html$Attributes$class('italic')
						]),
					_List_fromArray(
						[r]))
				]));
	});
var jxxcarlson$meenylatex$Internal$Render$reproduceMacro = F5(
	function (source, name, latexState, optArgs, args) {
		var renderedArgs = A2(
			elm$core$List$map,
			jxxcarlson$meenylatex$Internal$Render$enclose,
			A3(jxxcarlson$meenylatex$Internal$Render$renderArgList, source, latexState, args));
		return A2(
			elm$html$Html$span,
			_List_fromArray(
				[
					A2(elm$html$Html$Attributes$style, 'color', 'red')
				]),
			_Utils_ap(
				_List_fromArray(
					[
						elm$html$Html$text('\\' + name)
					]),
				renderedArgs));
	});
var jxxcarlson$meenylatex$Internal$Render$reproduceSMacro = F6(
	function (source, name, latexState, optArgs, args, le) {
		var renderedOptArgs = A2(
			elm$core$List$map,
			jxxcarlson$meenylatex$Internal$Render$enclose,
			A3(jxxcarlson$meenylatex$Internal$Render$renderArgList, source, latexState, optArgs));
		var renderedLe = jxxcarlson$meenylatex$Internal$Render$enclose(
			A3(jxxcarlson$meenylatex$Internal$Render$render, source, latexState, le));
		var renderedArgs = A2(
			elm$core$List$map,
			jxxcarlson$meenylatex$Internal$Render$enclose,
			A3(jxxcarlson$meenylatex$Internal$Render$renderArgList, source, latexState, args));
		return A2(
			elm$html$Html$span,
			_List_Nil,
			_Utils_ap(
				_List_fromArray(
					[
						elm$html$Html$text('\\' + name)
					]),
				_Utils_ap(
					renderedOptArgs,
					_Utils_ap(
						renderedArgs,
						_List_fromArray(
							[renderedLe])))));
	});
function jxxcarlson$meenylatex$Internal$Render$cyclic$renderEnvironmentDict() {
	return elm$core$Dict$fromList(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'align',
				F4(
					function (s, x, a, y) {
						return A4(jxxcarlson$meenylatex$Internal$Render$renderMathEnvironment, 'aligned', s, x, y);
					})),
				_Utils_Tuple2(
				'matrix',
				F4(
					function (s, x, a, y) {
						return A4(jxxcarlson$meenylatex$Internal$Render$renderMathEnvironment, 'matrix', s, x, y);
					})),
				_Utils_Tuple2(
				'pmatrix',
				F4(
					function (s, x, a, y) {
						return A4(jxxcarlson$meenylatex$Internal$Render$renderMathEnvironment, 'pmatrix', s, x, y);
					})),
				_Utils_Tuple2(
				'bmatrix',
				F4(
					function (s, x, a, y) {
						return A4(jxxcarlson$meenylatex$Internal$Render$renderMathEnvironment, 'bmatrix', s, x, y);
					})),
				_Utils_Tuple2(
				'Bmatrix',
				F4(
					function (s, x, a, y) {
						return A4(jxxcarlson$meenylatex$Internal$Render$renderMathEnvironment, 'Bmatrix', s, x, y);
					})),
				_Utils_Tuple2(
				'vmatrix',
				F4(
					function (s, x, a, y) {
						return A4(jxxcarlson$meenylatex$Internal$Render$renderMathEnvironment, 'vmatrix', s, x, y);
					})),
				_Utils_Tuple2(
				'Vmatrix',
				F4(
					function (s, x, a, y) {
						return A4(jxxcarlson$meenylatex$Internal$Render$renderMathEnvironment, 'Vmatrix', s, x, y);
					})),
				_Utils_Tuple2(
				'colored',
				F4(
					function (s, x, a, y) {
						return A4(jxxcarlson$meenylatex$Internal$Render$renderCodeEnvironment, s, x, a, y);
					})),
				_Utils_Tuple2(
				'center',
				F4(
					function (s, x, a, y) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderCenterEnvironment, s, x, y);
					})),
				_Utils_Tuple2(
				'obeylines',
				F4(
					function (s, x, a, y) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderObeyLinesEnvironment, s, x, y);
					})),
				_Utils_Tuple2(
				'CD',
				F4(
					function (s, x, a, y) {
						return A4(jxxcarlson$meenylatex$Internal$Render$renderMathJaxEnvironment, 'CD', s, x, y);
					})),
				_Utils_Tuple2(
				'comment',
				F4(
					function (s, x, a, y) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderCommentEnvironment, s, x, y);
					})),
				_Utils_Tuple2(
				'defitem',
				F4(
					function (s, x, a, y) {
						return A4(jxxcarlson$meenylatex$Internal$Render$renderDefItemEnvironment, s, x, a, y);
					})),
				_Utils_Tuple2(
				'enumerate',
				F4(
					function (s, x, a, y) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderEnumerate, s, x, y);
					})),
				_Utils_Tuple2(
				'eqnarray',
				F4(
					function (s, x, a, y) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderEqnArray, s, x, y);
					})),
				_Utils_Tuple2(
				'equation',
				F4(
					function (s, x, a, y) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderEquationEnvironment, s, x, y);
					})),
				_Utils_Tuple2(
				'indent',
				F4(
					function (s, x, a, y) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderIndentEnvironment, s, x, y);
					})),
				_Utils_Tuple2(
				'itemize',
				F4(
					function (s, x, a, y) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderItemize, s, x, y);
					})),
				_Utils_Tuple2(
				'listing',
				F4(
					function (s, x, a, y) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderListing, s, x, y);
					})),
				_Utils_Tuple2(
				'macros',
				F4(
					function (s, x, a, y) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderMacros, s, x, y);
					})),
				_Utils_Tuple2(
				'maskforweb',
				F4(
					function (s, x, a, y) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderCommentEnvironment, s, x, y);
					})),
				_Utils_Tuple2(
				'quotation',
				F4(
					function (s, x, a, y) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderQuotation, s, x, y);
					})),
				_Utils_Tuple2(
				'tabular',
				F4(
					function (s, x, a, y) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderTabular, s, x, y);
					})),
				_Utils_Tuple2(
				'thebibliography',
				F4(
					function (s, x, a, y) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderTheBibliography, s, x, y);
					})),
				_Utils_Tuple2(
				'useforweb',
				F4(
					function (s, x, a, y) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderUseForWeb, s, x, y);
					})),
				_Utils_Tuple2(
				'verbatim',
				F4(
					function (s, x, a, y) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderVerbatim, s, x, y);
					})),
				_Utils_Tuple2(
				'verse',
				F4(
					function (s, x, a, y) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderVerse, s, x, y);
					})),
				_Utils_Tuple2(
				'mathmacro',
				F4(
					function (s, x, a, y) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderMathMacros, s, x, y);
					})),
				_Utils_Tuple2(
				'textmacro',
				F4(
					function (s, x, a, y) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderTextMacros, s, x, y);
					})),
				_Utils_Tuple2(
				'svg',
				F4(
					function (s, x, a, y) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderSvg, s, x, y);
					}))
			]));
}
function jxxcarlson$meenylatex$Internal$Render$cyclic$renderMacroDict() {
	return elm$core$Dict$fromList(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'bigskip',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderBigSkip, s, x, z);
					})),
				_Utils_Tuple2(
				'medskip',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderMedSkip, s, x, z);
					})),
				_Utils_Tuple2(
				'smallskip',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderSmallSkip, s, x, z);
					})),
				_Utils_Tuple2(
				'cite',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderCite, s, x, z);
					})),
				_Utils_Tuple2(
				'colored',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderColored, s, x, z);
					})),
				_Utils_Tuple2(
				'dollar',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderDollar, s, x, z);
					})),
				_Utils_Tuple2(
				'texbegin',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderBegin, s, x, z);
					})),
				_Utils_Tuple2(
				'texend',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderEnd, s, x, z);
					})),
				_Utils_Tuple2(
				'percent',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderPercent, s, x, z);
					})),
				_Utils_Tuple2(
				'code',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderCode, s, x, z);
					})),
				_Utils_Tuple2(
				'ellie',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderEllie, s, x, z);
					})),
				_Utils_Tuple2(
				'emph',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderItalic, s, x, z);
					})),
				_Utils_Tuple2(
				'eqref',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderEqRef, s, x, z);
					})),
				_Utils_Tuple2(
				'href',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderHRef, s, x, z);
					})),
				_Utils_Tuple2(
				'iframe',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderIFrame, s, x, z);
					})),
				_Utils_Tuple2(
				'image',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderImage, s, x, z);
					})),
				_Utils_Tuple2(
				'imageref',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderImageRef, s, x, z);
					})),
				_Utils_Tuple2(
				'index',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderIndex, s, x, z);
					})),
				_Utils_Tuple2(
				'italic',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderItalic, s, x, z);
					})),
				_Utils_Tuple2(
				'label',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderLabel, s, x, z);
					})),
				_Utils_Tuple2(
				'maintableofcontents',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderMainTableOfContents, s, x, z);
					})),
				_Utils_Tuple2(
				'maketitle',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderMakeTitle, s, x, z);
					})),
				_Utils_Tuple2(
				'mdash',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderMdash, s, x, z);
					})),
				_Utils_Tuple2(
				'ndash',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderNdash, s, x, z);
					})),
				_Utils_Tuple2(
				'underscore',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderUnderscore, s, x, z);
					})),
				_Utils_Tuple2(
				'bs',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderBackslash, s, x, z);
					})),
				_Utils_Tuple2(
				'texarg',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderTexArg, s, x, z);
					})),
				_Utils_Tuple2(
				'ref',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderRef, s, x, z);
					})),
				_Utils_Tuple2(
				'medskip',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderMedSkip, s, x, z);
					})),
				_Utils_Tuple2(
				'par',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderMedSkip, s, x, z);
					})),
				_Utils_Tuple2(
				'smallskip',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderSmallSkip, s, x, z);
					})),
				_Utils_Tuple2(
				'section',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderSection, s, x, z);
					})),
				_Utils_Tuple2(
				'section*',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderSectionStar, s, x, z);
					})),
				_Utils_Tuple2(
				'subsection',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderSubsection, s, x, z);
					})),
				_Utils_Tuple2(
				'subsection*',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderSubsectionStar, s, x, z);
					})),
				_Utils_Tuple2(
				'subsubsection',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderSubSubsection, s, x, z);
					})),
				_Utils_Tuple2(
				'subsubsection*',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderSubSubsectionStar, s, x, z);
					})),
				_Utils_Tuple2(
				'setcounter',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderSetCounter, s, x, z);
					})),
				_Utils_Tuple2(
				'subheading',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderSubheading, s, x, z);
					})),
				_Utils_Tuple2(
				'tableofcontents',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderTableOfContents, s, x, z);
					})),
				_Utils_Tuple2(
				'innertableofcontents',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderInnerTableOfContents, s, x, z);
					})),
				_Utils_Tuple2(
				'red',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderRed, s, x, z);
					})),
				_Utils_Tuple2(
				'blue',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderBlue, s, x, z);
					})),
				_Utils_Tuple2(
				'remote',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderRemote, s, x, z);
					})),
				_Utils_Tuple2(
				'local',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderLocal, s, x, z);
					})),
				_Utils_Tuple2(
				'note',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderAttachNote, s, x, z);
					})),
				_Utils_Tuple2(
				'highlight',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderHighlighted, s, x, z);
					})),
				_Utils_Tuple2(
				'strike',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderStrikeThrough, s, x, z);
					})),
				_Utils_Tuple2(
				'term',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderTerm, s, x, z);
					})),
				_Utils_Tuple2(
				'xlink',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderXLink, s, x, z);
					})),
				_Utils_Tuple2(
				'ilink1',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderILink, s, x, z);
					})),
				_Utils_Tuple2(
				'ilink2',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderILink, s, x, z);
					})),
				_Utils_Tuple2(
				'ilink3',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderILink, s, x, z);
					})),
				_Utils_Tuple2(
				'include',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderInclude, s, x, z);
					})),
				_Utils_Tuple2(
				'publiclink',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderPublicLink, s, x, z);
					})),
				_Utils_Tuple2(
				'homepagelink',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderHomePageLink, s, x, z);
					})),
				_Utils_Tuple2(
				'documentTitle',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderDocumentTitle, s, x, z);
					})),
				_Utils_Tuple2(
				'title',
				F4(
					function (s, x, y, z) {
						return A2(jxxcarlson$meenylatex$Internal$Render$renderTitle, x, z);
					})),
				_Utils_Tuple2(
				'author',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderAuthor, s, x, z);
					})),
				_Utils_Tuple2(
				'date',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderDate, s, x, z);
					})),
				_Utils_Tuple2(
				'revision',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderRevision, s, x, z);
					})),
				_Utils_Tuple2(
				'email',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderEmail, s, x, z);
					})),
				_Utils_Tuple2(
				'setdocid',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderSetDocId, s, x, z);
					})),
				_Utils_Tuple2(
				'setclient',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderSetClient, s, x, z);
					})),
				_Utils_Tuple2(
				'strong',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderStrong, s, x, z);
					})),
				_Utils_Tuple2(
				'textbf',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderStrong, s, x, z);
					})),
				_Utils_Tuple2(
				'uuid',
				F4(
					function (s, x, y, z) {
						return A3(jxxcarlson$meenylatex$Internal$Render$renderUuid, s, x, z);
					}))
			]));
}
function jxxcarlson$meenylatex$Internal$Render$cyclic$renderSMacroDict() {
	return elm$core$Dict$fromList(
		_List_fromArray(
			[
				_Utils_Tuple2(
				'bibitem',
				F5(
					function (source, latexState, optArgs, args, body) {
						return A5(jxxcarlson$meenylatex$Internal$Render$renderBibItem, source, latexState, optArgs, args, body);
					}))
			]));
}
try {
	var jxxcarlson$meenylatex$Internal$Render$renderEnvironmentDict = jxxcarlson$meenylatex$Internal$Render$cyclic$renderEnvironmentDict();
	jxxcarlson$meenylatex$Internal$Render$cyclic$renderEnvironmentDict = function () {
		return jxxcarlson$meenylatex$Internal$Render$renderEnvironmentDict;
	};
	var jxxcarlson$meenylatex$Internal$Render$renderMacroDict = jxxcarlson$meenylatex$Internal$Render$cyclic$renderMacroDict();
	jxxcarlson$meenylatex$Internal$Render$cyclic$renderMacroDict = function () {
		return jxxcarlson$meenylatex$Internal$Render$renderMacroDict;
	};
	var jxxcarlson$meenylatex$Internal$Render$renderSMacroDict = jxxcarlson$meenylatex$Internal$Render$cyclic$renderSMacroDict();
	jxxcarlson$meenylatex$Internal$Render$cyclic$renderSMacroDict = function () {
		return jxxcarlson$meenylatex$Internal$Render$renderSMacroDict;
	};
} catch ($) {
throw 'Some top-level definitions from `Internal.Render` are causing infinite recursion:\n\n  ┌─────┐\n  │    environmentRenderer\n  │     ↓\n  │    render\n  │     ↓\n  │    renderArg\n  │     ↓\n  │    renderArgList\n  │     ↓\n  │    renderBackslash\n  │     ↓\n  │    renderBibItem\n  │     ↓\n  │    renderCell\n  │     ↓\n  │    renderCenterEnvironment\n  │     ↓\n  │    renderCode\n  │     ↓\n  │    renderDefItemEnvironment\n  │     ↓\n  │    renderDefaultEnvironment\n  │     ↓\n  │    renderDefaultEnvironment2\n  │     ↓\n  │    renderEnumerate\n  │     ↓\n  │    renderEnvironment\n  │     ↓\n  │    renderEnvironmentDict\n  │     ↓\n  │    renderIndentEnvironment\n  │     ↓\n  │    renderItalic\n  │     ↓\n  │    renderItem\n  │     ↓\n  │    renderItemize\n  │     ↓\n  │    renderLatexList\n  │     ↓\n  │    renderMacro\n  │     ↓\n  │    renderMacroDict\n  │     ↓\n  │    renderObeyLinesEnvironment\n  │     ↓\n  │    renderQuotation\n  │     ↓\n  │    renderRow\n  │     ↓\n  │    renderSMacro\n  │     ↓\n  │    renderSMacroDict\n  │     ↓\n  │    renderSection\n  │     ↓\n  │    renderSectionStar\n  │     ↓\n  │    renderStrong\n  │     ↓\n  │    renderSubSubsection\n  │     ↓\n  │    renderSubSubsectionStar\n  │     ↓\n  │    renderSubheading\n  │     ↓\n  │    renderSubsection\n  │     ↓\n  │    renderSubsectionStar\n  │     ↓\n  │    renderTableBody\n  │     ↓\n  │    renderTabular\n  │     ↓\n  │    renderTexArg\n  │     ↓\n  │    renderTheBibliography\n  │     ↓\n  │    renderTheoremLikeEnvironment\n  │     ↓\n  │    reproduceMacro\n  │     ↓\n  │    reproduceSMacro\n  └─────┘\n\nThese errors are very tricky, so read https://elm-lang.org/0.19.0/halting-problem to learn how to fix it!';}
var jxxcarlson$meenylatex$Internal$Render$renderLatexListToList = F2(
	function (latexState, list) {
		return A3(
			elm$core$List$map2,
			F2(
				function (x, y) {
					return A3(jxxcarlson$meenylatex$Internal$Render$renderLatexList, x, latexState, y);
				}),
			A2(elm$core$List$map, elm$core$Tuple$first, list),
			A2(
				elm$core$List$map,
				jxxcarlson$meenylatex$Internal$Render$spacify,
				A2(elm$core$List$map, elm$core$Tuple$second, list)));
	});
var jxxcarlson$meenylatex$MiniLatex$EditSimple$IDClicked = function (a) {
	return {$: 'IDClicked', a: a};
};
var jxxcarlson$meenylatex$MiniLatex$EditSimple$highlightColor = '#d7d6ff';
var jxxcarlson$meenylatex$MiniLatex$EditSimple$selectedStyle = F2(
	function (targetId, currentId) {
		var _n0 = _Utils_eq('select:' + targetId, currentId);
		if (_n0) {
			return A2(elm$html$Html$Attributes$style, 'background-color', jxxcarlson$meenylatex$MiniLatex$EditSimple$highlightColor);
		} else {
			return A2(elm$html$Html$Attributes$style, 'background-color', '#fff');
		}
	});
var jxxcarlson$meenylatex$MiniLatex$EditSimple$get = F2(
	function (selectedId, data) {
		var mark = function (id_) {
			return _Utils_eq(selectedId, id_) ? ('select:' + id_) : ((A2(elm$core$String$left, 7, id_) === 'selected:') ? A2(elm$core$String$dropLeft, 7, id_) : id_);
		};
		var keyedNode = F2(
			function (id, para) {
				return A3(
					elm$html$Html$Keyed$node,
					'p',
					_List_fromArray(
						[
							elm$html$Html$Attributes$id(id),
							A2(jxxcarlson$meenylatex$MiniLatex$EditSimple$selectedStyle, selectedId, id),
							elm$html$Html$Events$onClick(
							jxxcarlson$meenylatex$MiniLatex$EditSimple$IDClicked(id)),
							A2(elm$html$Html$Attributes$style, 'margin-bottom', '10px')
						]),
					_List_fromArray(
						[
							_Utils_Tuple2(id, para)
						]));
			});
		var ids = A2(elm$core$List$map, mark, data.idList);
		var _n0 = A3(jxxcarlson$meenylatex$Internal$Accumulator$renderNew, jxxcarlson$meenylatex$Internal$Render$renderLatexListToList, data.latexState, data.astList);
		var paragraphs_ = _n0.b;
		var paragraphs = A2(
			elm$core$List$map,
			function (x) {
				return A2(elm$html$Html$div, _List_Nil, x);
			},
			paragraphs_);
		return A3(elm$core$List$map2, keyedNode, ids, paragraphs);
	});
var jxxcarlson$meenylatex$Internal$DifferSimple$EditRecord = F6(
	function (source, mpreamble, paragraphs, astList, idList, latexState) {
		return {astList: astList, idList: idList, latexState: latexState, mpreamble: mpreamble, paragraphs: paragraphs, source: source};
	});
var jxxcarlson$meenylatex$Internal$DifferSimple$emptyEditRecord = A6(jxxcarlson$meenylatex$Internal$DifferSimple$EditRecord, '', elm$core$Maybe$Nothing, _List_Nil, _List_Nil, _List_Nil, jxxcarlson$meenylatex$Internal$LatexState$emptyLatexState);
var jxxcarlson$meenylatex$Internal$DifferSimple$isEmpty = function (editRecord) {
	return _Utils_eq(editRecord.paragraphs, _List_Nil);
};
var jxxcarlson$meenylatex$Internal$DifferSimple$addPreamble = F2(
	function (text, mpreamble) {
		if (mpreamble.$ === 'Nothing') {
			return text;
		} else {
			var str = mpreamble.a;
			return str + ('\n\n' + text);
		}
	});
var jxxcarlson$meenylatex$Internal$DifferSimple$DiffRecord = F4(
	function (commonInitialSegment, commonTerminalSegment, middleSegmentInSource, middleSegmentInTarget) {
		return {commonInitialSegment: commonInitialSegment, commonTerminalSegment: commonTerminalSegment, middleSegmentInSource: middleSegmentInSource, middleSegmentInTarget: middleSegmentInTarget};
	});
var elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2(elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var elm$core$List$takeTailRec = F2(
	function (n, list) {
		return elm$core$List$reverse(
			A3(elm$core$List$takeReverse, n, list, _List_Nil));
	});
var elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _n0 = _Utils_Tuple2(n, list);
			_n0$1:
			while (true) {
				_n0$5:
				while (true) {
					if (!_n0.b.b) {
						return list;
					} else {
						if (_n0.b.b.b) {
							switch (_n0.a) {
								case 1:
									break _n0$1;
								case 2:
									var _n2 = _n0.b;
									var x = _n2.a;
									var _n3 = _n2.b;
									var y = _n3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_n0.b.b.b.b) {
										var _n4 = _n0.b;
										var x = _n4.a;
										var _n5 = _n4.b;
										var y = _n5.a;
										var _n6 = _n5.b;
										var z = _n6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _n0$5;
									}
								default:
									if (_n0.b.b.b.b && _n0.b.b.b.b.b) {
										var _n7 = _n0.b;
										var x = _n7.a;
										var _n8 = _n7.b;
										var y = _n8.a;
										var _n9 = _n8.b;
										var z = _n9.a;
										var _n10 = _n9.b;
										var w = _n10.a;
										var tl = _n10.b;
										return (ctr > 1000) ? A2(
											elm$core$List$cons,
											x,
											A2(
												elm$core$List$cons,
												y,
												A2(
													elm$core$List$cons,
													z,
													A2(
														elm$core$List$cons,
														w,
														A2(elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											elm$core$List$cons,
											x,
											A2(
												elm$core$List$cons,
												y,
												A2(
													elm$core$List$cons,
													z,
													A2(
														elm$core$List$cons,
														w,
														A3(elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _n0$5;
									}
							}
						} else {
							if (_n0.a === 1) {
								break _n0$1;
							} else {
								break _n0$5;
							}
						}
					}
				}
				return list;
			}
			var _n1 = _n0.b;
			var x = _n1.a;
			return _List_fromArray(
				[x]);
		}
	});
var elm$core$List$take = F2(
	function (n, list) {
		return A3(elm$core$List$takeFast, 0, n, list);
	});
var jxxcarlson$meenylatex$Internal$DifferSimple$commonInitialSegment = F2(
	function (x, y) {
		if (_Utils_eq(x, _List_Nil)) {
			return _List_Nil;
		} else {
			if (_Utils_eq(y, _List_Nil)) {
				return _List_Nil;
			} else {
				var b = A2(elm$core$List$take, 1, y);
				var a = A2(elm$core$List$take, 1, x);
				return _Utils_eq(a, b) ? _Utils_ap(
					a,
					A2(
						jxxcarlson$meenylatex$Internal$DifferSimple$commonInitialSegment,
						A2(elm$core$List$drop, 1, x),
						A2(elm$core$List$drop, 1, y))) : _List_Nil;
			}
		}
	});
var jxxcarlson$meenylatex$Internal$DifferSimple$commonTerminalSegmentAux = F3(
	function (cis, x, y) {
		var n = elm$core$List$length(cis);
		var xx = elm$core$List$reverse(
			A2(elm$core$List$drop, n, x));
		var yy = elm$core$List$reverse(
			A2(elm$core$List$drop, n, y));
		return elm$core$List$reverse(
			A2(jxxcarlson$meenylatex$Internal$DifferSimple$commonInitialSegment, xx, yy));
	});
var jxxcarlson$meenylatex$Internal$DifferSimple$dropLast = F2(
	function (k, x) {
		return elm$core$List$reverse(
			A2(
				elm$core$List$drop,
				k,
				elm$core$List$reverse(x)));
	});
var jxxcarlson$meenylatex$Internal$DifferSimple$diff = F2(
	function (u, v) {
		var a = A2(jxxcarlson$meenylatex$Internal$DifferSimple$commonInitialSegment, u, v);
		var b_ = A3(jxxcarlson$meenylatex$Internal$DifferSimple$commonTerminalSegmentAux, a, u, v);
		var lb = elm$core$List$length(b_);
		var la = elm$core$List$length(a);
		var b = _Utils_eq(
			la,
			elm$core$List$length(u)) ? _List_Nil : b_;
		var x = A2(
			jxxcarlson$meenylatex$Internal$DifferSimple$dropLast,
			lb,
			A2(elm$core$List$drop, la, u));
		var y = A2(
			jxxcarlson$meenylatex$Internal$DifferSimple$dropLast,
			lb,
			A2(elm$core$List$drop, la, v));
		return A4(jxxcarlson$meenylatex$Internal$DifferSimple$DiffRecord, a, b, x, y);
	});
var jxxcarlson$meenylatex$Internal$DifferSimple$takeLast = F2(
	function (k, x) {
		return elm$core$List$reverse(
			A2(
				elm$core$List$take,
				k,
				elm$core$List$reverse(x)));
	});
var jxxcarlson$meenylatex$Internal$DifferSimple$differentialCompiler = F3(
	function (parser, diffRecord, editRecord) {
		var middleSegmentParsed = A2(
			elm$core$List$map,
			function (p) {
				return _Utils_Tuple2(
					p,
					parser(p));
			},
			diffRecord.middleSegmentInTarget);
		var it = elm$core$List$length(diffRecord.commonTerminalSegment);
		var terminalSegmentParsed = A2(jxxcarlson$meenylatex$Internal$DifferSimple$takeLast, it, editRecord.astList);
		var ii = elm$core$List$length(diffRecord.commonInitialSegment);
		var initialSegmentParsed = A2(elm$core$List$take, ii, editRecord.astList);
		return _Utils_ap(
			initialSegmentParsed,
			_Utils_ap(middleSegmentParsed, terminalSegmentParsed));
	});
var jxxcarlson$meenylatex$Internal$DifferSimple$prefixer = F2(
	function (b, k) {
		return 'p.' + (elm$core$String$fromInt(b) + ('.' + elm$core$String$fromInt(k)));
	});
var jxxcarlson$meenylatex$Internal$DifferSimple$differentialIdList = F3(
	function (seed, diffRecord, editRecord) {
		var nt = elm$core$List$length(diffRecord.middleSegmentInTarget);
		var ns = elm$core$List$length(diffRecord.middleSegmentInSource);
		var it = elm$core$List$length(diffRecord.commonTerminalSegment);
		var ii = elm$core$List$length(diffRecord.commonInitialSegment);
		var idListTerminal = A2(elm$core$List$drop, ii + ns, editRecord.idList);
		var idListMiddle = A2(
			elm$core$List$map,
			jxxcarlson$meenylatex$Internal$DifferSimple$prefixer(seed),
			A2(elm$core$List$range, ii + 1, ii + nt));
		var idListInitial = A2(elm$core$List$take, ii, editRecord.idList);
		var idList = _Utils_ap(
			idListInitial,
			_Utils_ap(idListMiddle, idListTerminal));
		var _n0 = (!nt) ? _Utils_Tuple2(elm$core$Maybe$Nothing, elm$core$Maybe$Nothing) : _Utils_Tuple2(
			elm$core$Maybe$Just(ii),
			elm$core$Maybe$Just((ii + nt) - 1));
		var newIdsStart = _n0.a;
		var newIdsEnd = _n0.b;
		return {idList: idList, newIdsEnd: newIdsEnd, newIdsStart: newIdsStart};
	});
var jxxcarlson$meenylatex$Internal$Paragraph$Start = {$: 'Start'};
var jxxcarlson$meenylatex$Internal$Paragraph$fixLine = function (line) {
	return (line === '') ? '\n' : line;
};
var elm$core$String$endsWith = _String_endsWith;
var jxxcarlson$meenylatex$Internal$Paragraph$Error = {$: 'Error'};
var jxxcarlson$meenylatex$Internal$Paragraph$IgnoreLine = {$: 'IgnoreLine'};
var jxxcarlson$meenylatex$Internal$Paragraph$InBlock = function (a) {
	return {$: 'InBlock', a: a};
};
var jxxcarlson$meenylatex$Internal$Paragraph$InMathBlock = {$: 'InMathBlock'};
var jxxcarlson$meenylatex$Internal$Paragraph$InParagraph = {$: 'InParagraph'};
var jxxcarlson$meenylatex$Internal$Paragraph$BeginBlock = function (a) {
	return {$: 'BeginBlock', a: a};
};
var jxxcarlson$meenylatex$Internal$Paragraph$Blank = {$: 'Blank'};
var jxxcarlson$meenylatex$Internal$Paragraph$EndBlock = function (a) {
	return {$: 'EndBlock', a: a};
};
var jxxcarlson$meenylatex$Internal$Paragraph$MathBlock = {$: 'MathBlock'};
var jxxcarlson$meenylatex$Internal$Paragraph$Text = {$: 'Text'};
var jxxcarlson$meenylatex$Internal$Paragraph$getBeginArg = function (line) {
	var parseResult = A2(elm$parser$Parser$Advanced$run, jxxcarlson$meenylatex$Internal$Parser$envName, line);
	var arg = function () {
		if (parseResult.$ === 'Ok') {
			var word = parseResult.a;
			return word;
		} else {
			return '';
		}
	}();
	return arg;
};
var jxxcarlson$meenylatex$Internal$Parser$ExpectingEndAndRightBrace = {$: 'ExpectingEndAndRightBrace'};
var jxxcarlson$meenylatex$Internal$Parser$ExpectingEnvironmentNameEnd = {$: 'ExpectingEnvironmentNameEnd'};
var jxxcarlson$meenylatex$Internal$Parser$endWord = A2(
	elm$parser$Parser$Advanced$keeper,
	A2(
		elm$parser$Parser$Advanced$ignorer,
		A2(
			elm$parser$Parser$Advanced$ignorer,
			elm$parser$Parser$Advanced$succeed(elm$core$Basics$identity),
			jxxcarlson$meenylatex$Internal$Parser$spaces),
		elm$parser$Parser$Advanced$symbol(
			A2(elm$parser$Parser$Advanced$Token, '\\end{', jxxcarlson$meenylatex$Internal$Parser$ExpectingEnvironmentNameEnd))),
	A2(
		elm$parser$Parser$Advanced$ignorer,
		A2(jxxcarlson$meenylatex$Internal$Parser$parseToSymbol, jxxcarlson$meenylatex$Internal$Parser$ExpectingEndAndRightBrace, '}'),
		jxxcarlson$meenylatex$Internal$Parser$ws));
var jxxcarlson$meenylatex$Internal$Paragraph$getEndArg = function (line) {
	var parseResult = A2(elm$parser$Parser$Advanced$run, jxxcarlson$meenylatex$Internal$Parser$endWord, line);
	var arg = function () {
		if (parseResult.$ === 'Ok') {
			var word = parseResult.a;
			return word;
		} else {
			return '';
		}
	}();
	return arg;
};
var jxxcarlson$meenylatex$Internal$Paragraph$lineType = function (line) {
	return (line === '') ? jxxcarlson$meenylatex$Internal$Paragraph$Blank : (A2(elm$core$String$startsWith, '\\begin', line) ? jxxcarlson$meenylatex$Internal$Paragraph$BeginBlock(
		jxxcarlson$meenylatex$Internal$Paragraph$getBeginArg(line)) : (A2(elm$core$String$startsWith, '\\end', line) ? jxxcarlson$meenylatex$Internal$Paragraph$EndBlock(
		jxxcarlson$meenylatex$Internal$Paragraph$getEndArg(line)) : (A2(elm$core$String$startsWith, '$$', line) ? jxxcarlson$meenylatex$Internal$Paragraph$MathBlock : jxxcarlson$meenylatex$Internal$Paragraph$Text)));
};
var elm$core$List$tail = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(xs);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var jxxcarlson$meenylatex$Internal$Stack$Stack = function (a) {
	return {$: 'Stack', a: a};
};
var jxxcarlson$meenylatex$Internal$Stack$pop = function (_n0) {
	var list = _n0.a;
	var _n1 = elm$core$List$tail(list);
	if (_n1.$ === 'Nothing') {
		return jxxcarlson$meenylatex$Internal$Stack$Stack(_List_Nil);
	} else {
		var tail = _n1.a;
		return jxxcarlson$meenylatex$Internal$Stack$Stack(tail);
	}
};
var jxxcarlson$meenylatex$Internal$Stack$push = F2(
	function (element, _n0) {
		var list = _n0.a;
		return jxxcarlson$meenylatex$Internal$Stack$Stack(
			A2(elm$core$List$cons, element, list));
	});
var jxxcarlson$meenylatex$Internal$Stack$top = function (_n0) {
	var list = _n0.a;
	return elm$core$List$head(list);
};
var jxxcarlson$meenylatex$Internal$Paragraph$getNextState = F2(
	function (line, _n0) {
		var parserState = _n0.a;
		var stack = _n0.b;
		var _n1 = _Utils_Tuple2(
			parserState,
			jxxcarlson$meenylatex$Internal$Paragraph$lineType(line));
		_n1$23:
		while (true) {
			switch (_n1.a.$) {
				case 'Start':
					switch (_n1.b.$) {
						case 'Blank':
							var _n2 = _n1.a;
							var _n3 = _n1.b;
							return _Utils_Tuple2(jxxcarlson$meenylatex$Internal$Paragraph$Start, stack);
						case 'Text':
							var _n4 = _n1.a;
							var _n5 = _n1.b;
							return _Utils_Tuple2(jxxcarlson$meenylatex$Internal$Paragraph$InParagraph, stack);
						case 'BeginBlock':
							var _n6 = _n1.a;
							var arg = _n1.b.a;
							return _Utils_Tuple2(
								jxxcarlson$meenylatex$Internal$Paragraph$InBlock(arg),
								A2(jxxcarlson$meenylatex$Internal$Stack$push, arg, stack));
						case 'MathBlock':
							var _n7 = _n1.a;
							var _n8 = _n1.b;
							return A2(
								elm$core$String$endsWith,
								'$$',
								A2(elm$core$String$dropLeft, 2, line)) ? _Utils_Tuple2(jxxcarlson$meenylatex$Internal$Paragraph$Start, stack) : _Utils_Tuple2(jxxcarlson$meenylatex$Internal$Paragraph$InMathBlock, stack);
						case 'Ignore':
							var _n9 = _n1.a;
							var _n10 = _n1.b;
							return _Utils_Tuple2(jxxcarlson$meenylatex$Internal$Paragraph$IgnoreLine, stack);
						default:
							break _n1$23;
					}
				case 'IgnoreLine':
					switch (_n1.b.$) {
						case 'Blank':
							var _n11 = _n1.a;
							var _n12 = _n1.b;
							return _Utils_Tuple2(jxxcarlson$meenylatex$Internal$Paragraph$Start, stack);
						case 'Text':
							var _n13 = _n1.a;
							var _n14 = _n1.b;
							return _Utils_Tuple2(jxxcarlson$meenylatex$Internal$Paragraph$InParagraph, stack);
						case 'BeginBlock':
							var _n15 = _n1.a;
							var arg = _n1.b.a;
							return _Utils_Tuple2(
								jxxcarlson$meenylatex$Internal$Paragraph$InBlock(arg),
								A2(jxxcarlson$meenylatex$Internal$Stack$push, arg, stack));
						case 'MathBlock':
							var _n16 = _n1.a;
							var _n17 = _n1.b;
							return _Utils_Tuple2(jxxcarlson$meenylatex$Internal$Paragraph$InMathBlock, stack);
						default:
							break _n1$23;
					}
				case 'InBlock':
					switch (_n1.b.$) {
						case 'Blank':
							var arg = _n1.a.a;
							var _n18 = _n1.b;
							return _Utils_Tuple2(
								jxxcarlson$meenylatex$Internal$Paragraph$InBlock(arg),
								stack);
						case 'Text':
							var arg = _n1.a.a;
							var _n19 = _n1.b;
							return _Utils_Tuple2(
								jxxcarlson$meenylatex$Internal$Paragraph$InBlock(arg),
								stack);
						case 'MathBlock':
							var arg = _n1.a.a;
							var _n20 = _n1.b;
							return _Utils_Tuple2(jxxcarlson$meenylatex$Internal$Paragraph$InMathBlock, stack);
						case 'BeginBlock':
							var arg = _n1.a.a;
							var arg2 = _n1.b.a;
							return _Utils_Tuple2(
								jxxcarlson$meenylatex$Internal$Paragraph$InBlock(arg),
								A2(jxxcarlson$meenylatex$Internal$Stack$push, arg2, stack));
						case 'EndBlock':
							var arg1 = _n1.a.a;
							var arg2 = _n1.b.a;
							var _n21 = _Utils_Tuple2(
								jxxcarlson$meenylatex$Internal$Stack$pop(stack),
								line);
							var nextStack = _n21.a;
							var line_ = _n21.b;
							var _n22 = jxxcarlson$meenylatex$Internal$Stack$top(nextStack);
							if (_n22.$ === 'Nothing') {
								return _Utils_Tuple2(jxxcarlson$meenylatex$Internal$Paragraph$Start, nextStack);
							} else {
								var arg = _n22.a;
								return _Utils_Tuple2(
									jxxcarlson$meenylatex$Internal$Paragraph$InBlock(arg),
									nextStack);
							}
						default:
							break _n1$23;
					}
				case 'InParagraph':
					switch (_n1.b.$) {
						case 'Text':
							var _n23 = _n1.a;
							var _n24 = _n1.b;
							return _Utils_Tuple2(jxxcarlson$meenylatex$Internal$Paragraph$InParagraph, stack);
						case 'BeginBlock':
							var _n25 = _n1.a;
							var str = _n1.b.a;
							return _Utils_Tuple2(
								jxxcarlson$meenylatex$Internal$Paragraph$InParagraph,
								A2(jxxcarlson$meenylatex$Internal$Stack$push, str, stack));
						case 'MathBlock':
							var _n26 = _n1.a;
							var _n27 = _n1.b;
							return _Utils_Tuple2(jxxcarlson$meenylatex$Internal$Paragraph$InMathBlock, stack);
						case 'EndBlock':
							var _n28 = _n1.a;
							var arg = _n1.b.a;
							return _Utils_Tuple2(jxxcarlson$meenylatex$Internal$Paragraph$Error, stack);
						case 'Blank':
							var _n29 = _n1.a;
							var _n30 = _n1.b;
							return _Utils_Tuple2(jxxcarlson$meenylatex$Internal$Paragraph$Start, stack);
						default:
							break _n1$23;
					}
				case 'InMathBlock':
					switch (_n1.b.$) {
						case 'BeginBlock':
							var _n31 = _n1.a;
							var str = _n1.b.a;
							return _Utils_Tuple2(jxxcarlson$meenylatex$Internal$Paragraph$InMathBlock, stack);
						case 'EndBlock':
							var _n32 = _n1.a;
							var str = _n1.b.a;
							return _Utils_Tuple2(jxxcarlson$meenylatex$Internal$Paragraph$InMathBlock, stack);
						case 'MathBlock':
							var _n33 = _n1.a;
							var _n34 = _n1.b;
							return _Utils_Tuple2(jxxcarlson$meenylatex$Internal$Paragraph$Start, stack);
						default:
							var _n35 = _n1.a;
							return A2(
								elm$core$String$endsWith,
								'$$',
								A2(elm$core$String$dropLeft, 2, line)) ? _Utils_Tuple2(jxxcarlson$meenylatex$Internal$Paragraph$Start, stack) : ((line === '') ? _Utils_Tuple2(jxxcarlson$meenylatex$Internal$Paragraph$Start, stack) : _Utils_Tuple2(jxxcarlson$meenylatex$Internal$Paragraph$InMathBlock, stack));
					}
				default:
					break _n1$23;
			}
		}
		return _Utils_Tuple2(jxxcarlson$meenylatex$Internal$Paragraph$Error, stack);
	});
var jxxcarlson$meenylatex$Internal$Paragraph$joinLines = F2(
	function (a, b) {
		var _n0 = _Utils_Tuple2(a, b);
		_n0$1:
		while (true) {
			_n0$2:
			while (true) {
				switch (_n0.a) {
					case '':
						return b;
					case '\n':
						switch (_n0.b) {
							case '':
								break _n0$1;
							case '\n':
								break _n0$2;
							default:
								break _n0$2;
						}
					default:
						switch (_n0.b) {
							case '':
								break _n0$1;
							case '\n':
								return a + '\n';
							default:
								var aa = _n0.a;
								var bb = _n0.b;
								return aa + ('\n' + bb);
						}
				}
			}
			return '\n' + b;
		}
		return a;
	});
var jxxcarlson$meenylatex$Internal$Paragraph$updateParserRecord = F2(
	function (line, parserRecord) {
		var _n0 = A2(
			jxxcarlson$meenylatex$Internal$Paragraph$getNextState,
			line,
			_Utils_Tuple2(parserRecord.state, parserRecord.stack));
		var nextState = _n0.a;
		var nextStack = _n0.b;
		switch (nextState.$) {
			case 'Start':
				return _Utils_update(
					parserRecord,
					{
						currentParagraph: '',
						paragraphList: _Utils_ap(
							parserRecord.paragraphList,
							_List_fromArray(
								[
									A2(jxxcarlson$meenylatex$Internal$Paragraph$joinLines, parserRecord.currentParagraph, line)
								])),
						stack: nextStack,
						state: nextState
					});
			case 'InParagraph':
				return _Utils_update(
					parserRecord,
					{
						currentParagraph: A2(jxxcarlson$meenylatex$Internal$Paragraph$joinLines, parserRecord.currentParagraph, line),
						stack: nextStack,
						state: nextState
					});
			case 'InMathBlock':
				return _Utils_update(
					parserRecord,
					{
						currentParagraph: A2(jxxcarlson$meenylatex$Internal$Paragraph$joinLines, parserRecord.currentParagraph, line),
						stack: nextStack,
						state: nextState
					});
			case 'InBlock':
				var arg = nextState.a;
				return _Utils_update(
					parserRecord,
					{
						currentParagraph: A2(
							jxxcarlson$meenylatex$Internal$Paragraph$joinLines,
							parserRecord.currentParagraph,
							jxxcarlson$meenylatex$Internal$Paragraph$fixLine(line)),
						stack: nextStack,
						state: nextState
					});
			case 'IgnoreLine':
				return _Utils_update(
					parserRecord,
					{stack: nextStack, state: nextState});
			default:
				return _Utils_update(
					parserRecord,
					{stack: nextStack});
		}
	});
var jxxcarlson$meenylatex$Internal$Stack$empty = jxxcarlson$meenylatex$Internal$Stack$Stack(_List_Nil);
var jxxcarlson$meenylatex$Internal$Paragraph$logicalParagraphParse = function (text) {
	return A3(
		elm$core$List$foldl,
		jxxcarlson$meenylatex$Internal$Paragraph$updateParserRecord,
		{currentParagraph: '', paragraphList: _List_Nil, stack: jxxcarlson$meenylatex$Internal$Stack$empty, state: jxxcarlson$meenylatex$Internal$Paragraph$Start},
		A2(elm$core$String$split, '\n', text + '\n'));
};
var jxxcarlson$meenylatex$Internal$Paragraph$logicalParagraphify = function (text) {
	var lastState = jxxcarlson$meenylatex$Internal$Paragraph$logicalParagraphParse(text);
	return A2(
		elm$core$List$map,
		function (paragraph) {
			return elm$core$String$trim(paragraph) + '\n\n';
		},
		A2(
			elm$core$List$filter,
			function (x) {
				return x !== '';
			},
			_Utils_ap(
				lastState.paragraphList,
				_List_fromArray(
					[lastState.currentParagraph]))));
};
var jxxcarlson$meenylatex$Internal$DifferSimple$update = F5(
	function (seed, parser, editRecord, text, mpreamble) {
		var newParagraphs = function () {
			if (mpreamble.$ === 'Nothing') {
				return jxxcarlson$meenylatex$Internal$Paragraph$logicalParagraphify(
					A2(jxxcarlson$meenylatex$Internal$DifferSimple$addPreamble, text, editRecord.mpreamble));
			} else {
				var preamble = mpreamble.a;
				return jxxcarlson$meenylatex$Internal$Paragraph$logicalParagraphify(preamble + ('\n\n' + text));
			}
		}();
		var diffRecord = A2(jxxcarlson$meenylatex$Internal$DifferSimple$diff, editRecord.paragraphs, newParagraphs);
		var p = A3(jxxcarlson$meenylatex$Internal$DifferSimple$differentialIdList, seed, diffRecord, editRecord);
		var astList = A3(jxxcarlson$meenylatex$Internal$DifferSimple$differentialCompiler, parser, diffRecord, editRecord);
		return A6(jxxcarlson$meenylatex$Internal$DifferSimple$EditRecord, text, editRecord.mpreamble, newParagraphs, astList, p.idList, editRecord.latexState);
	});
var jxxcarlson$meenylatex$Internal$Accumulator$parseReducer = F2(
	function (inputString, _n0) {
		var latexState = _n0.a;
		var inputList = _n0.b;
		var parsedInput = _Utils_Tuple2(
			inputString,
			jxxcarlson$meenylatex$Internal$Parser$parse(inputString));
		var newLatexState = A2(jxxcarlson$meenylatex$Internal$Accumulator$latexStateReducer, parsedInput.b, latexState);
		return _Utils_Tuple2(
			newLatexState,
			_Utils_ap(
				inputList,
				_List_fromArray(
					[parsedInput])));
	});
var jxxcarlson$meenylatex$Internal$Accumulator$parse = F2(
	function (latexState, paragraphs) {
		return A3(
			elm$core$List$foldl,
			jxxcarlson$meenylatex$Internal$Accumulator$parseReducer,
			_Utils_Tuple2(latexState, _List_Nil),
			paragraphs);
	});
var jxxcarlson$meenylatex$Internal$LatexDifferSimple$addPreamble = F2(
	function (text, mpreamble) {
		if (mpreamble.$ === 'Nothing') {
			return text;
		} else {
			var str = mpreamble.a;
			return str + ('\n\n' + text);
		}
	});
var jxxcarlson$meenylatex$Internal$LatexDifferSimple$makeIdListWithSeed = F2(
	function (seed, paragraphs) {
		return A2(
			elm$core$List$map,
			jxxcarlson$meenylatex$Internal$DifferSimple$prefixer(seed),
			A2(
				elm$core$List$range,
				1,
				elm$core$List$length(paragraphs)));
	});
var jxxcarlson$meenylatex$Internal$LatexDifferSimple$initWithSeed = F5(
	function (seed, parser, latexState, text, mpreamble) {
		var paragraphs = jxxcarlson$meenylatex$Internal$Paragraph$logicalParagraphify(
			A2(jxxcarlson$meenylatex$Internal$LatexDifferSimple$addPreamble, text, mpreamble));
		var idList = A2(jxxcarlson$meenylatex$Internal$LatexDifferSimple$makeIdListWithSeed, seed, paragraphs);
		var _n0 = A2(jxxcarlson$meenylatex$Internal$Accumulator$parse, jxxcarlson$meenylatex$Internal$LatexState$emptyLatexState, paragraphs);
		var latexState1 = _n0.a;
		var latexExpressionList = _n0.b;
		var latexState2 = _Utils_update(
			jxxcarlson$meenylatex$Internal$LatexState$emptyLatexState,
			{crossReferences: latexState1.crossReferences, dictionary: latexState1.dictionary, macroDictionary: latexState1.macroDictionary, mathMacroDictionary: latexState1.mathMacroDictionary, tableOfContents: latexState1.tableOfContents});
		return A6(jxxcarlson$meenylatex$Internal$DifferSimple$EditRecord, text, mpreamble, paragraphs, latexExpressionList, idList, latexState2);
	});
var jxxcarlson$meenylatex$Internal$LatexDifferSimple$init = F4(
	function (parser, latexState, text, mpreamble) {
		return A5(jxxcarlson$meenylatex$Internal$LatexDifferSimple$initWithSeed, 0, parser, latexState, text, mpreamble);
	});
var jxxcarlson$meenylatex$Internal$LatexDifferSimple$update = F5(
	function (seed, parser, editRecord, source, mpreamble) {
		return jxxcarlson$meenylatex$Internal$DifferSimple$isEmpty(editRecord) ? A4(jxxcarlson$meenylatex$Internal$LatexDifferSimple$init, parser, jxxcarlson$meenylatex$Internal$LatexState$emptyLatexState, source, mpreamble) : A5(jxxcarlson$meenylatex$Internal$DifferSimple$update, seed, parser, editRecord, source, mpreamble);
	});
var jxxcarlson$meenylatex$MiniLatex$EditSimple$init = F3(
	function (seed, source, mpreamble) {
		return A5(jxxcarlson$meenylatex$Internal$LatexDifferSimple$update, seed, jxxcarlson$meenylatex$Internal$Parser$parse, jxxcarlson$meenylatex$Internal$DifferSimple$emptyEditRecord, source, mpreamble);
	});
var jxxcarlson$meenylatex$MiniLatex$EditSimple$render = function (source) {
	return A2(
		jxxcarlson$meenylatex$MiniLatex$EditSimple$get,
		'-',
		A3(jxxcarlson$meenylatex$MiniLatex$EditSimple$init, 1, source, elm$core$Maybe$Nothing));
};
var author$project$Main$view = function (model) {
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				A2(elm$html$Html$Attributes$style, 'margin', '50px')
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$h1,
				_List_Nil,
				_List_fromArray(
					[
						elm$html$Html$text('Example')
					])),
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						A2(elm$html$Html$Attributes$style, 'font-size', '18px')
					]),
				A2(
					elm$core$List$map,
					elm$html$Html$map(author$project$Main$LatexMsg),
					jxxcarlson$meenylatex$MiniLatex$EditSimple$render(author$project$Strings$miniLaTeX)))
			]));
};
var elm$browser$Browser$External = function (a) {
	return {$: 'External', a: a};
};
var elm$browser$Browser$Internal = function (a) {
	return {$: 'Internal', a: a};
};
var elm$browser$Browser$Dom$NotFound = function (a) {
	return {$: 'NotFound', a: a};
};
var elm$core$Basics$never = function (_n0) {
	never:
	while (true) {
		var nvr = _n0.a;
		var $temp$_n0 = nvr;
		_n0 = $temp$_n0;
		continue never;
	}
};
var elm$core$Task$Perform = function (a) {
	return {$: 'Perform', a: a};
};
var elm$core$Task$succeed = _Scheduler_succeed;
var elm$core$Task$init = elm$core$Task$succeed(_Utils_Tuple0);
var elm$core$Task$andThen = _Scheduler_andThen;
var elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return A2(
					elm$core$Task$andThen,
					function (b) {
						return elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var elm$core$Task$sequence = function (tasks) {
	return A3(
		elm$core$List$foldr,
		elm$core$Task$map2(elm$core$List$cons),
		elm$core$Task$succeed(_List_Nil),
		tasks);
};
var elm$core$Platform$sendToApp = _Platform_sendToApp;
var elm$core$Task$spawnCmd = F2(
	function (router, _n0) {
		var task = _n0.a;
		return _Scheduler_spawn(
			A2(
				elm$core$Task$andThen,
				elm$core$Platform$sendToApp(router),
				task));
	});
var elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			elm$core$Task$map,
			function (_n0) {
				return _Utils_Tuple0;
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					elm$core$Task$spawnCmd(router),
					commands)));
	});
var elm$core$Task$onSelfMsg = F3(
	function (_n0, _n1, _n2) {
		return elm$core$Task$succeed(_Utils_Tuple0);
	});
var elm$core$Task$cmdMap = F2(
	function (tagger, _n0) {
		var task = _n0.a;
		return elm$core$Task$Perform(
			A2(elm$core$Task$map, tagger, task));
	});
_Platform_effectManagers['Task'] = _Platform_createManager(elm$core$Task$init, elm$core$Task$onEffects, elm$core$Task$onSelfMsg, elm$core$Task$cmdMap);
var elm$core$Task$command = _Platform_leaf('Task');
var elm$core$Task$perform = F2(
	function (toMessage, task) {
		return elm$core$Task$command(
			elm$core$Task$Perform(
				A2(elm$core$Task$map, toMessage, task)));
	});
var elm$url$Url$Http = {$: 'Http'};
var elm$url$Url$Https = {$: 'Https'};
var elm$core$String$contains = _String_contains;
var elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {fragment: fragment, host: host, path: path, port_: port_, protocol: protocol, query: query};
	});
var elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if (elm$core$String$isEmpty(str) || A2(elm$core$String$contains, '@', str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, ':', str);
			if (!_n0.b) {
				return elm$core$Maybe$Just(
					A6(elm$url$Url$Url, protocol, str, elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_n0.b.b) {
					var i = _n0.a;
					var _n1 = elm$core$String$toInt(
						A2(elm$core$String$dropLeft, i + 1, str));
					if (_n1.$ === 'Nothing') {
						return elm$core$Maybe$Nothing;
					} else {
						var port_ = _n1;
						return elm$core$Maybe$Just(
							A6(
								elm$url$Url$Url,
								protocol,
								A2(elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return elm$core$Maybe$Nothing;
				}
			}
		}
	});
var elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '/', str);
			if (!_n0.b) {
				return A5(elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _n0.a;
				return A5(
					elm$url$Url$chompBeforePath,
					protocol,
					A2(elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '?', str);
			if (!_n0.b) {
				return A4(elm$url$Url$chompBeforeQuery, protocol, elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _n0.a;
				return A4(
					elm$url$Url$chompBeforeQuery,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '#', str);
			if (!_n0.b) {
				return A3(elm$url$Url$chompBeforeFragment, protocol, elm$core$Maybe$Nothing, str);
			} else {
				var i = _n0.a;
				return A3(
					elm$url$Url$chompBeforeFragment,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$fromString = function (str) {
	return A2(elm$core$String$startsWith, 'http://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		elm$url$Url$Http,
		A2(elm$core$String$dropLeft, 7, str)) : (A2(elm$core$String$startsWith, 'https://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		elm$url$Url$Https,
		A2(elm$core$String$dropLeft, 8, str)) : elm$core$Maybe$Nothing);
};
var elm$browser$Browser$element = _Browser_element;
var elm$core$Platform$Sub$batch = _Platform_batch;
var elm$core$Platform$Sub$none = elm$core$Platform$Sub$batch(_List_Nil);
var author$project$Main$main = elm$browser$Browser$element(
	{
		init: function (_n0) {
			return author$project$Main$init;
		},
		subscriptions: elm$core$Basics$always(elm$core$Platform$Sub$none),
		update: author$project$Main$update,
		view: author$project$Main$view
	});
_Platform_export({'Main':{'init':author$project$Main$main(
	elm$json$Json$Decode$succeed(_Utils_Tuple0))(0)}});}(this));