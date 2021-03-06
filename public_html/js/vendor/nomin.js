/* jQuery Bracket | Copyright (c) Teijo Laine 2011-2013 | Licenced under the MIT licence */
var _BRACKET_HEIGHT = 96;
var _ROUND_WIDTH = 200;
var _ROUND_MARGIN = 40;
! function(a) {
    function b(a) {
        return !isNaN(parseFloat(a)) && isFinite(a)
    }

    function c(a) {
        function b(a, c) {
            return a instanceof Array ? b(a[0], c + 1) : c
        }
        return b(a, 0)
    }

    function d(a, b) {
        return b > 0 && (a = d([a], b - 1)), a
    }

    function e() {
        return {
            source: null,
            name: null,
            id: -1,
            idx: -1,
            score: null
        }
    }

    function f(a) {
        if (b(a.a.score) && b(a.b.score)) {
            if (a.a.score > a.b.score) return [a.a, a.b];
            if (a.a.score < a.b.score) return [a.b, a.a]
        }
        return []
    }

    function g(a) {
        return f(a)[0] || e()
    }

    function h(a) {
        return f(a)[1] || e()
    }

    function i(b, c, d) {
        var e, f = d.find(".team[data-teamid=" + b + "]");
        return e = c ? c : "highlight", {
            highlight: function() {
                f.each(function() {
                    a(this).addClass(e), a(this).hasClass("win") && a(this).parent().find(".connector").addClass(e)
                })
            },
            deHighlight: function() {
                f.each(function() {
                    a(this).removeClass(e), a(this).parent().find(".connector").removeClass(e)
                })
            }
        }
    }

    function j(b, c, d) {
        var e = d || c,
            f = e.winner(),
            g = e.loser(),
            h = null,
            j = null;
        f && g && (h = i(f.idx, "highlightWinner", b), j = i(g.idx, "highlightLoser", b), h.highlight(), j.highlight()), b.find(".team").mouseover(function() {
            var c = a(this).attr("data-teamid"),
                d = i(c, null, b);
            d.highlight(), a(this).mouseout(function() {
                d.deHighlight(), a(this).unbind("mouseout")
            })
        })
    }

    function k(b, c, d) {
        var e = a('<input type="text">');
        e.val(c), b.html(e), e.focus(), e.blur(function() {
            d(e.val())
        }), e.keydown(function(a) {
            var b = a.keyCode || a.which;
            (9 === b || 13 === b || 27 === b) && (a.preventDefault(), d(e.val(), 27 !== b))
        })
    }

    function l(a, b) {
        a.append(b)
    }

    function m(a) {
        var b = a.el,
            c = b.find(".team.win");
        c.append('<div class="bubble">1st</div>');
        var d = b.find(".team.lose");
        return d.append('<div class="bubble">2nd</div>'), !0
    }

    function n(a) {
        var b = a.el,
            c = b.find(".team.win");
        c.append('<div class="bubble third">3rd</div>');
        var d = b.find(".team.lose");
        return d.append('<div class="bubble fourth">4th</div>'), !0
    }

    function o(a, b, c, d) {
        for (var e, f = Math.log(2 * b.length) / Math.log(2), g = b.length, h = 0; f > h; h += 1) {
            e = a.addRound();
            for (var i = 0; g > i; i += 1) {
                var j = null;
                if (0 === h && (j = function() {
                        var a = b[i],
                            c = i;
                        return [{
                            source: function() {
                                return {
                                    name: a[0],
                                    idx: 2 * c
                                }
                            }
                        }, {
                            source: function() {
                                return {
                                    name: a[1],
                                    idx: 2 * c + 1
                                }
                            }
                        }]
                    }), h === f - 1 && c) {
                    var k = e.addMatch(j, m);
                    k.setAlignCb(function(a) {
                        a.css("top", ""), a.css("position", "absolute"), d ? a.css("top", k.el.height() / 2 - a.height() / 2 + "px") : a.css("bottom", -a.height() / 2 + "px")
                    })
                } else e.addMatch(j)
            }
            g /= 2
        }
        if (c && (a.final().connectorCb(function() {
                return null
            }), b.length > 1 && !d)) {
            var l = a.final().round().prev().match(0).loser,
                o = a.final().round().prev().match(1).loser,
                p = e.addMatch(function() {
                    return [{
                        source: l
                    }, {
                        source: o
                    }]
                }, n);
            p.setAlignCb(function(b) {
                var c = a.el.height() / 2;
                p.el.css("height", c + "px");
                var d = b.height();
                b.css("top", d + "px")
            }), p.connectorCb(function() {
                return null
            })
        }
    }

    function p(a, b, c) {
        for (var d = Math.log(2 * c) / Math.log(2) - 1, e = c / 2, f = 0; d > f; f += 1) {
            for (var g = 0; 2 > g; g += 1)
                for (var h = b.addRound(), i = 0; e > i; i += 1) {
                    var j = null;
                    (0 !== g % 2 || 0 === f) && (j = function() {
                        if (0 === g % 2 && 0 === f) return [{
                            source: a.round(0).match(2 * i).loser
                        }, {
                            source: a.round(0).match(2 * i + 1).loser
                        }];
                        var c = i;
                        return 0 === f % 2 && (c = e - i - 1), [{
                            source: b.round(2 * f).match(i).winner
                        }, {
                            source: a.round(f + 1).match(c).loser
                        }]
                    });
                    var k = h.addMatch(j),
                        l = k.el.find(".teamContainer");
                    if (k.setAlignCb(function() {
                            l.css("top", k.el.height() / 2 - l.height() / 2 + "px")
                        }), d - 1 > f || 1 > g) {
                        var m = null;
                        0 === g % 2 && (m = function(a, b) {
                            var c = a.height() / 4,
                                d = 0,
                                e = 0;
                            return 0 === b.winner().id ? e = c : 1 === b.winner().id ? (d = 2 * -c, e = c) : e = 2 * c, {
                                height: d,
                                shift: e
                            }
                        }), k.connectorCb(m)
                    }
                }
            e /= 2
        }
    }

    function q(a, b, c, d, e, f) {
        var g = a.addRound(),
            h = g.addMatch(function() {
                return [{
                    source: b.winner
                }, {
                    source: c.winner
                }]
            }, function(e) {
                var g = !1;
                if (d || null === e.winner().name || e.winner().name !== c.winner().name) return m(e);
                if (2 !== a.size()) {
                    var h = a.addRound(function() {
                            var b = null !== e.winner().name && e.winner().name === c.winner().name;
                            return g === !1 && b && (g = !0, f.css("width", parseInt(f.css("width"), 10) + (_ROUND_WIDTH + _ROUND_MARGIN) + "px")), !b && g && (g = !1, a.dropRound(), f.css("width", parseInt(f.css("width"), 10) - (_ROUND_WIDTH + _ROUND_MARGIN) + "px")), b
                        }),
                        i = h.addMatch(function() {
                            return [{
                                source: e.first
                            }, {
                                source: e.second
                            }]
                        }, m);
                    return e.connectorCb(function(a) {
                        return {
                            height: 0,
                            shift: a.height() / 2
                        }
                    }), i.connectorCb(function() {
                        return null
                    }), i.setAlignCb(function(a) {
                        var d = b.el.height() + c.el.height();
                        i.el.css("height", d + "px");
                        var e = (b.el.height() / 2 + b.el.height() + c.el.height() / 2) / 2 - a.height();
                        a.css("top", e + "px")
                    }), !1
                }
            });
        h.setAlignCb(function(a) {
            var d = b.el.height() + c.el.height();
            e || (d /= 2), h.el.css("height", d + "px");
            var f = (b.el.height() / 2 + b.el.height() + c.el.height() / 2) / 2 - a.height();
            a.css("top", f + "px")
        });
        var i, j;
        if (!e) {
            var k = c.final().round().prev().match(0).loser,
                l = g.addMatch(function() {
                    return [{
                        source: k
                    }, {
                        source: c.loser
                    }]
                }, n);
            l.setAlignCb(function(a) {
                var d = (b.el.height() + c.el.height()) / 2;
                l.el.css("height", d + "px");
                var e = (b.el.height() / 2 + b.el.height() + c.el.height() / 2) / 2 + a.height() / 2 - d;
                a.css("top", e + "px")
            }), h.connectorCb(function() {
                return null
            }), l.connectorCb(function() {
                return null
            })
        }
        b.final().connectorCb(function(a) {
            var d = a.height() / 4,
                e = (b.el.height() / 2 + b.el.height() + c.el.height() / 2) / 2 - a.height() / 2,
                f = e - b.el.height() / 2;
            return 0 === b.winner().id ? (j = f + 2 * d, i = d) : 1 === b.winner().id ? (j = f, i = 3 * d) : (j = f + d, i = 2 * d), j -= a.height() / 2, {
                height: j,
                shift: i
            }
        }), c.final().connectorCb(function(a) {
            var d = a.height() / 4,
                e = (b.el.height() / 2 + b.el.height() + c.el.height() / 2) / 2 - a.height() / 2,
                f = e - b.el.height() / 2;
            return 0 === c.winner().id ? (j = f, i = 3 * d) : 1 === c.winner().id ? (j = f + 2 * d, i = d) : (j = f + d, i = 2 * d), j += a.height() / 2, {
                height: -j,
                shift: -i
            }
        })
    }

    function r(b, c, d, e, f, g) {
        var h = [],
            i = a('<div class="round"></div>');
        return {
            el: i,
            bracket: b,
            id: d,
            addMatch: function(a, c) {
                var f, i = h.length;
                f = null !== a ? a() : [{
                    source: b.round(d - 1).match(2 * i).winner
                }, {
                    source: b.round(d - 1).match(2 * i + 1).winner
                }];
                var j = g(this, f, i, e ? e[i] : null, c);
                return h.push(j), j
            },
            match: function(a) {
                return h[a]
            },
            prev: function() {
                return c
            },
            size: function() {
                return h.length
            },
            render: function() {
                i.empty(), ("function" != typeof f || f()) && (i.appendTo(b.el), a.each(h, function(a, b) {
                    b.render()
                }))
            },
            results: function() {
                var b = [];
                return a.each(h, function(a, c) {
                    b.push(c.results())
                }), b
            }
        }
    }

    function s(b, c, d) {
        var e = [];
        return {
            el: b,
            addRound: function(a) {
                var b = e.length,
                    f = null;
                b > 0 && (f = e[b - 1]);
                var g = r(this, f, b, c ? c[b] : null, a, d);
                return e.push(g), g
            },
            dropRound: function() {
                e.pop()
            },
            round: function(a) {
                return e[a]
            },
            size: function() {
                return e.length
            },
            "final": function() {
                return e[e.length - 1].match(0)
            },
            winner: function() {
                return e[e.length - 1].match(0).winner()
            },
            loser: function() {
                return e[e.length - 1].match(0).loser()
            },
            render: function() {
                b.empty();
                for (var a = 0; a < e.length; a += 1) e[a].render()
            },
            results: function() {
                var b = [];
                return a.each(e, function(a, c) {
                    b.push(c.results())
                }), b
            }
        }
    }

    function t(b, c, d, e) {
        var f = parseInt(a(".round:first").css("margin-right"), 10) / 2,
            g = !0;
        0 > b && (g = !1, b = -b), 2 > b && (b = 0);
        var h = a('<div class="connector"></div>').appendTo(d);
        h.css("height", b), h.css("width", f + 2 + "px"), h.css(e, -f - 2 + "px"), c >= 0 ? h.css("top", c + "px") : h.css("bottom", -c + "px"), g ? h.css("border-bottom", "none") : h.css("border-top", "none");
        var i = a('<div class="connector"></div>').appendTo(h);
        return i.css("width", f + "px"), i.css(e, -f + "px"), g ? i.css("bottom", "0px") : i.css("top", "0px"), h
    }

    function u(b, c, d) {
        var e = a('<div class="tools"></div>').appendTo(b),
            f = a('<span class="increment">+</span>').appendTo(e);
        if (f.click(function() {
                var a, b = c.teams.length;
                for (a = 0; b > a; a += 1) c.teams.push(["", ""]);
                return v(d)
            }), c.teams.length > 1 && 1 === c.results.length || c.teams.length > 2 && 3 === c.results.length) {
            var g = a('<span class="decrement">-</span>').appendTo(e);
            g.click(function() {
                return c.teams.length > 1 ? (c.teams = c.teams.slice(0, c.teams.length / 2), v(d)) : void 0
            })
        }
        var h;
        1 === c.results.length && c.teams.length > 1 ? (h = a('<span class="doubleElimination">de</span>').appendTo(e), h.click(function() {
            return c.teams.length > 1 && c.results.length < 3 ? (c.results.push([], []), v(d)) : void 0
        })) : 3 === c.results.length && c.teams.length > 1 && (h = a('<span class="singleElimination">se</span>').appendTo(e), h.click(function() {
            return 3 === c.results.length ? (c.results = c.results.slice(0, 1), v(d)) : void 0
        }))
    }
    var v = function(e) {
            function f(a) {
                m = 0, v.render(), w && x && (w.render(), x.render()), j(y, v, x), a && (r.results[0] = v.results(), w && x && (r.results[1] = w.results(), r.results[2] = x.results()), e.save && e.save(r, e.userData))
            }

            function i(c, d, i, j, k) {
                function l(c, d, i) {
                    var j, k = m,
                        l = a('<div class="score" data-resultid="result-' + k + '"></div>');
                    j = d.name && i ? b(d.score) ? d.score : "--" : "--", l.append(j), m += 1;
                    var n = d.name ? d.name : "--",
                        p = a('<div class="team"></div>'),
                        q = a('<div class="label"></div>').appendTo(p);
                    return 0 === c && p.attr("data-resultid", "team-" + k), e.decorator.render(q, n, j), b(d.idx) && p.attr("data-teamid", d.idx), null === d.name ? p.addClass("na") : g(o).name === d.name ? p.addClass("win") : h(o).name === d.name && p.addClass("lose"), p.append(l), null !== d.name && i && e.save && e.save && (q.addClass("editable"), q.click(function() {
                        function b() {
                            function h(h, i) {
                                h && (e.init.teams[~~(d.idx / 2)][d.idx % 2] = h), f(!0), g.click(b);
                                var j = e.el.find(".team[data-teamid=" + (d.idx + 1) + "] div.label:first");
                                j.length && i === !0 && 0 === c && a(j).click()
                            }
                            g.unbind(), e.decorator.edit(g, d.name, h)
                        }
                        var g = a(this);
                        b()
                    }), d.name && (l.addClass("editable"), l.click(function() {
                        function c() {
                            e.unbind();
                            var g;
                            g = b(d.score) ? e.text() : "0";
                            var h = a('<input type="text">');
                            h.val(g), e.html(h), h.focus().select(), h.keydown(function(c) {
                                b(a(this).val()) ? a(this).removeClass("error") : a(this).addClass("error");
                                var d = c.keyCode || c.which;
                                if (9 === d || 13 === d || 27 === d) {
                                    if (c.preventDefault(), a(this).blur(), 27 === d) return;
                                    var e = y.find("div.score[data-resultid=result-" + (k + 1) + "]");
                                    e && e.click()
                                }
                            }), h.blur(function() {
                                var a = h.val();
                                a && b(a) || b(d.score) ? a && b(a) || !b(d.score) || (a = d.score) : a = "0", e.html(a), b(a) && g !== parseInt(a, 10) && (d.score = parseInt(a, 10), f(!0)), e.click(c)
                            })
                        }
                        var e = a(this);
                        c()
                    }))), p
                }
                var o = {
                        a: d[0],
                        b: d[1]
                    },
                    p = null,
                    q = null,
                    r = a('<div class="match"></div>'),
                    s = a('<div class="teamContainer"></div>');
                if (!e.save) {
                    var u = j ? j[2] : null;
                    e.onMatchHover && s.hover(function() {
                        e.onMatchHover(u, !0)
                    }, function() {
                        e.onMatchHover(u, !1)
                    }), e.onMatchClick && s.click(function() {
                        e.onMatchClick(u)
                    })
                }
                return o.a.id = 0, o.b.id = 1, o.a.name = o.a.source().name, o.b.name = o.b.source().name, o.a.score = j ? j[0] : null, o.b.score = j ? j[1] : null, o.a.name && o.b.name || !b(o.a.score) && !b(o.b.score) || (console.log("ERROR IN SCORE DATA: " + o.a.source().name + ": " + o.a.score + ", " + o.b.source().name + ": " + o.b.score), o.a.score = o.b.score = null), {
                    el: r,
                    id: i,
                    round: function() {
                        return c
                    },
                    connectorCb: function(a) {
                        p = a
                    },
                    connect: function(a) {
                        var b, c, d = s.height() / 4,
                            e = r.height() / 2;
                        if (a && null !== a) {
                            var f = a(s, this);
                            if (null === f) return;
                            b = f.shift, c = f.height
                        } else 0 === i % 2 ? 0 === this.winner().id ? (b = d, c = e) : 1 === this.winner().id ? (b = 3 * d, c = e - 2 * d) : (b = 2 * d, c = e - d) : 0 === this.winner().id ? (b = 3 * -d, c = -e + 2 * d) : 1 === this.winner().id ? (b = -d, c = -e) : (b = 2 * -d, c = -e + d);
                        s.append(t(c, b, s, n))
                    },
                    winner: function() {
                        return g(o)
                    },
                    loser: function() {
                        return h(o)
                    },
                    first: function() {
                        return o.a
                    },
                    second: function() {
                        return o.b
                    },
                    setAlignCb: function(a) {
                        q = a
                    },
                    render: function() {
                        r.empty(), s.empty(), o.a.name = o.a.source().name, o.b.name = o.b.source().name, o.a.idx = o.a.source().idx, o.b.idx = o.b.source().idx;
                        var a = !1;
                        !o.a.name && "" !== o.a.name || !o.b.name && "" !== o.b.name || (a = !0), g(o).name ? s.removeClass("np") : s.addClass("np"), s.append(l(c.id, o.a, a)), s.append(l(c.id, o.b, a)), r.appendTo(c.el), r.append(s), this.el.css("height", c.bracket.el.height() / c.size() + "px"), s.css("top", this.el.height() / 2 - s.height() / 2 + "px"), q && q(s);
                        var b = !1;
                        "function" == typeof k && (b = k(this)), b || this.connect(p)
                    },
                    results: function() {
                        return [o.a.score, o.b.score]
                    }
                }
            }
            var m, n = "lr" === e.dir ? "right" : "left";
            if (!e) throw Error("Options not set");
            if (!e.el) throw Error("Invalid jQuery object as container");
            if (!e.init && !e.save) throw Error("No bracket data or save callback given");
            if (void 0 === e.userData && (e.userData = null), !(!e.decorator || e.decorator.edit && e.decorator.render)) throw Error("Invalid decorator input");
            e.decorator || (e.decorator = {
                edit: k,
                render: l
            });
            var r;
            e.init || (e.init = {
                teams: [
                    ["", ""]
                ],
                results: []
            }), r = e.init;
            var v, w, x, y = a('<div class="jQBracket ' + e.dir + '"></div>').appendTo(e.el.empty()),
                z = r.results;
            z = d(z, 4 - c(z)), r.results = z;
            var A = z.length <= 1;
            e.skipSecondaryFinal && A && a.error("skipSecondaryFinal setting is viable only in double elimination mode"), e.save && u(y, r, e);
            var B, C, D;
            A ? C = a('<div class="bracket"></div>').appendTo(y) : (B = a('<div class="finals"></div>').appendTo(y), C = a('<div class="bracket"></div>').appendTo(y), D = a('<div class="loserBracket"></div>').appendTo(y));
            var E = _BRACKET_HEIGHT * r.teams.length;
            C.css("height", E), A && r.teams.length <= 2 && !e.skipConsolationRound && (E += 40, y.css("height", E)), D && D.css("height", C.height() / 2);
            var F;
            return F = A ? Math.log(2 * r.teams.length) / Math.log(2) : 2 * (Math.log(2 * r.teams.length) / Math.log(2) - 1) + 1, e.save ? y.css("width", (_ROUND_WIDTH + _ROUND_MARGIN) * F + 40) : y.css("width", (_ROUND_WIDTH + _ROUND_MARGIN) * F + 10), v = s(C, z && z[0] ? z[0] : null, i), A || (w = s(D, z && z[1] ? z[1] : null, i), x = s(B, z && z[2] ? z[2] : null, i)), o(v, r.teams, A, e.skipConsolationRound), A || (p(v, w, r.teams.length), q(x, v, w, e.skipSecondaryFinal, e.skipConsolationRound, y)), f(!1), {
                data: function() {
                    return e.init
                }
            }
        },
        w = {
            init: function(b) {
                var c = this;
                b.el = this, b.save && (b.onMatchClick || b.onMatchHover) && a.error("Match callbacks may not be passed in edit mode (in conjunction with save callback)"), b.dir = b.dir || "lr", b.skipConsolationRound = b.skipConsolationRound || !1, b.skipSecondaryFinal = b.skipSecondaryFinal || !1, "lr" !== b.dir && "rl" !== b.dir && a.error('Direction must be either: "lr" or "rl"');
                var d = v(b);
                return a(this).data("bracket", {
                    target: c,
                    obj: d
                }), d
            },
            data: function() {
                var b = a(this).data("bracket");
                return b.obj.data()
            }
        };
    a.fn.bracket = function(b) {
        return w[b] ? w[b].apply(this, Array.prototype.slice.call(arguments, 1)) : "object" != typeof b && b ? (a.error("Method " + b + " does not exist on jQuery.bracket"), void 0) : w.init.apply(this, arguments)
    }
}(jQuery);