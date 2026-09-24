(() => {
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __esm = (fn, res, err) => function __init() {
    if (err) throw err[0];
    try {
      return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
    } catch (e) {
      throw err = [e], e;
    }
  };
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };

  // node_modules/@marijn/find-cluster-break/src/index.js
  function isExtendingChar(code2) {
    if (code2 < 768) return false;
    for (let from = 0, to = rangeFrom.length; ; ) {
      let mid = from + to >> 1;
      if (code2 < rangeFrom[mid]) to = mid;
      else if (code2 >= rangeTo[mid]) from = mid + 1;
      else return true;
      if (from == to) return false;
    }
  }
  function isRegionalIndicator(code2) {
    return code2 >= 127462 && code2 <= 127487;
  }
  function findClusterBreak(str, pos, forward = true, includeExtending = true) {
    return (forward ? nextClusterBreak : prevClusterBreak)(str, pos, includeExtending);
  }
  function nextClusterBreak(str, pos, includeExtending) {
    if (pos == str.length) return pos;
    if (pos && surrogateLow(str.charCodeAt(pos)) && surrogateHigh(str.charCodeAt(pos - 1))) pos--;
    let prev = codePointAt(str, pos);
    pos += codePointSize(prev);
    while (pos < str.length) {
      let next = codePointAt(str, pos);
      if (prev == ZWJ || next == ZWJ || includeExtending && isExtendingChar(next)) {
        pos += codePointSize(next);
        prev = next;
      } else if (isRegionalIndicator(next)) {
        let countBefore = 0, i2 = pos - 2;
        while (i2 >= 0 && isRegionalIndicator(codePointAt(str, i2))) {
          countBefore++;
          i2 -= 2;
        }
        if (countBefore % 2 == 0) break;
        else pos += 2;
      } else {
        break;
      }
    }
    return pos;
  }
  function prevClusterBreak(str, pos, includeExtending) {
    while (pos > 1) {
      let found = nextClusterBreak(str, pos - 2, includeExtending);
      if (found < pos) return found;
      pos--;
    }
    return 0;
  }
  function codePointAt(str, pos) {
    let code0 = str.charCodeAt(pos);
    if (!surrogateHigh(code0) || pos + 1 == str.length) return code0;
    let code1 = str.charCodeAt(pos + 1);
    if (!surrogateLow(code1)) return code0;
    return (code0 - 55296 << 10) + (code1 - 56320) + 65536;
  }
  function surrogateLow(ch) {
    return ch >= 56320 && ch < 57344;
  }
  function surrogateHigh(ch) {
    return ch >= 55296 && ch < 56320;
  }
  function codePointSize(code2) {
    return code2 < 65536 ? 1 : 2;
  }
  var rangeFrom, rangeTo, ZWJ;
  var init_src = __esm({
    "node_modules/@marijn/find-cluster-break/src/index.js"() {
      rangeFrom = [];
      rangeTo = [];
      (() => {
        let numbers = "lc,34,7n,7,7b,19,,,,2,,2,,,20,b,1c,l,g,,2t,7,2,6,2,2,,4,z,,u,r,2j,b,1m,9,9,,o,4,,9,,3,,5,17,3,1n,9,16,o,,x,1i,3,,i,,7,a,2,t,3,1k,,,7,2,2,2,3,9,,a,2,q,,2,3,1k,,,5,4,2,2,3,3,,u,2,3,,b,3,1k,,,8,,3,,3,k,2,m,6,,3,1k,,,7,2,2,2,3,7,3,a,2,u,,1n,5,3,3,,4,9,,14,5,1j,,,7,,3,,4,7,2,b,2,t,3,1k,,,7,,3,,4,7,2,b,2,f,,c,4,1j,2,,7,,3,,4,9,,a,2,t,3,1y,,4,6,,,,8,i,2,1p,,,8,c,8,2q,,,a,b,7,21,2,r,,,,,,4,2,1d,k,,2,5,b,,10,9,,2u,b,,6,n,4,4,3,g,4,d,,,3,6,,f,,jj,3,qa,4,s,3,t,2,u,2,1s,w,9,,19,3,,,39,2,y,,3a,c,4,c,63,5,1l,a,,,,,2,o,2,,1c,1a,2,c,k,5,1b,h,12,9,c,3,u,d,1k,e,1c,k,48,3,,l,4,,6,,2,3,5i,1s,ek,,5f,x,2da,3,3x,,2o,w,fe,6,2x,2,n9w,4,,a,w,2,28,2,7k,,3,,4,,n,5,4,,2b,2,1e,i,q,i,d,,12,8,p,d,18,4,1b,e,10,,1v,e,c,,8,2,1a,,1f,,,3,2,2,5,2,,,15,5,5,2,6k,8,,2,fn4,,kh,g,g,g,a6,2,gt,,6a,,45,5,1ae,3,,2,5,4,14,3,4,,4l,2,fx,4,1t,5,8t,2,25,6,1y,b,1d,4,3e,3,1h,f,15,,2,2,a,4,19,b,7,,1p,3,10,e,g,2,18,,c,3,1c,e,8,4,,2,2k,c,6,,2,,4d,c,l,4,1j,2,,7,2,2,2,3,9,,a,2,2,7,3,5,1v,9,,,2,,,4,,5,,,e,2,2a,i,n,,29,k,6j,7,2,9,r,2,2a,h,2y,d,2t,3,2,a,74,f,6t,6,,2,2,4,,,,2,3x,7,2,7,3,,s,a,14,7,,4,8,,9,b,1a,g,5i,8,5j,8,,8,2a,m,,e,3e,6,3,,,2,,7,,,1u,5,,2,,5,9n,4,9,2,,,1c,7,3,5,n,,44l,,6,f,8ug,i,1xc,5,1n,7,t4,,,1j,7,4,29,,b,2,f57,2,3mp,1a,2,n,f2,5,3,6,8,8,2,7,u,4,44,3,1iz,1j,4,1e,8,,e,,m,5,,f,11s,7,,h,2,7,,2,,5,2s,,4g,7,af,,1p,4,e4,4,72,2,6r,,2,,7,2,5,,d6,7,31,7,240,5".split(",").map((s) => s ? parseInt(s, 36) : 1);
        for (let i2 = 0, n = 0; i2 < numbers.length; i2++)
          (i2 % 2 ? rangeTo : rangeFrom).push(n = n + numbers[i2]);
      })();
      ZWJ = 8205;
    }
  });

  // node_modules/@codemirror/state/dist/index.js
  function textLength(text) {
    let length = -1;
    for (let line of text)
      length += line.length + 1;
    return length;
  }
  function appendText(text, target, from = 0, to = 1e9) {
    for (let pos = 0, i2 = 0, first = true; i2 < text.length && pos <= to; i2++) {
      let line = text[i2], end = pos + line.length;
      if (end >= from) {
        if (end > to)
          line = line.slice(0, to - pos);
        if (pos < from)
          line = line.slice(from - pos);
        if (first) {
          target[target.length - 1] += line;
          first = false;
        } else
          target.push(line);
      }
      pos = end + 1;
    }
    return target;
  }
  function sliceText(text, from, to) {
    return appendText(text, [""], from, to);
  }
  function clip(text, from, to) {
    from = Math.max(0, Math.min(text.length, from));
    return [from, Math.max(from, Math.min(text.length, to))];
  }
  function findClusterBreak2(str, pos, forward = true, includeExtending = true) {
    return findClusterBreak(str, pos, forward, includeExtending);
  }
  function surrogateLow2(ch) {
    return ch >= 56320 && ch < 57344;
  }
  function surrogateHigh2(ch) {
    return ch >= 55296 && ch < 56320;
  }
  function codePointAt2(str, pos) {
    let code0 = str.charCodeAt(pos);
    if (!surrogateHigh2(code0) || pos + 1 == str.length)
      return code0;
    let code1 = str.charCodeAt(pos + 1);
    if (!surrogateLow2(code1))
      return code0;
    return (code0 - 55296 << 10) + (code1 - 56320) + 65536;
  }
  function codePointSize2(code2) {
    return code2 < 65536 ? 1 : 2;
  }
  function addSection(sections, len, ins, forceJoin = false) {
    if (len == 0 && ins <= 0)
      return;
    let last2 = sections.length - 2;
    if (last2 >= 0 && ins <= 0 && ins == sections[last2 + 1])
      sections[last2] += len;
    else if (last2 >= 0 && len == 0 && sections[last2] == 0)
      sections[last2 + 1] += ins;
    else if (forceJoin) {
      sections[last2] += len;
      sections[last2 + 1] += ins;
    } else
      sections.push(len, ins);
  }
  function addInsert(values, sections, value) {
    if (value.length == 0)
      return;
    let index = sections.length - 2 >> 1;
    if (index < values.length) {
      values[values.length - 1] = values[values.length - 1].append(value);
    } else {
      while (values.length < index)
        values.push(Text.empty);
      values.push(value);
    }
  }
  function iterChanges(desc, f, individual) {
    let inserted = desc.inserted;
    for (let posA = 0, posB = 0, i2 = 0; i2 < desc.sections.length; ) {
      let len = desc.sections[i2++], ins = desc.sections[i2++];
      if (ins < 0) {
        posA += len;
        posB += len;
      } else {
        let endA = posA, endB = posB, text = Text.empty;
        for (; ; ) {
          endA += len;
          endB += ins;
          if (ins && inserted)
            text = text.append(inserted[i2 - 2 >> 1]);
          if (individual || i2 == desc.sections.length || desc.sections[i2 + 1] < 0)
            break;
          len = desc.sections[i2++];
          ins = desc.sections[i2++];
        }
        f(posA, endA, posB, endB, text);
        posA = endA;
        posB = endB;
      }
    }
  }
  function mapSet(setA, setB, before, mkSet = false) {
    let sections = [], insert2 = mkSet ? [] : null;
    let a2 = new SectionIter(setA), b = new SectionIter(setB);
    for (let inserted = -1; ; ) {
      if (a2.done && b.len || b.done && a2.len) {
        throw new Error("Mismatched change set lengths");
      } else if (a2.ins == -1 && b.ins == -1) {
        let len = Math.min(a2.len, b.len);
        addSection(sections, len, -1);
        a2.forward(len);
        b.forward(len);
      } else if (b.ins >= 0 && (a2.ins < 0 || inserted == a2.i || a2.off == 0 && (b.len < a2.len || b.len == a2.len && !before))) {
        let len = b.len;
        addSection(sections, b.ins, -1);
        while (len) {
          let piece = Math.min(a2.len, len);
          if (a2.ins >= 0 && inserted < a2.i && a2.len <= piece) {
            addSection(sections, 0, a2.ins);
            if (insert2)
              addInsert(insert2, sections, a2.text);
            inserted = a2.i;
          }
          a2.forward(piece);
          len -= piece;
        }
        b.next();
      } else if (a2.ins >= 0) {
        let len = 0, left = a2.len;
        while (left) {
          if (b.ins == -1) {
            let piece = Math.min(left, b.len);
            len += piece;
            left -= piece;
            b.forward(piece);
          } else if (b.ins == 0 && b.len < left) {
            left -= b.len;
            b.next();
          } else {
            break;
          }
        }
        addSection(sections, len, inserted < a2.i ? a2.ins : 0);
        if (insert2 && inserted < a2.i)
          addInsert(insert2, sections, a2.text);
        inserted = a2.i;
        a2.forward(a2.len - left);
      } else if (a2.done && b.done) {
        return insert2 ? ChangeSet.createSet(sections, insert2) : ChangeDesc.create(sections);
      } else {
        throw new Error("Mismatched change set lengths");
      }
    }
  }
  function composeSets(setA, setB, mkSet = false) {
    let sections = [];
    let insert2 = mkSet ? [] : null;
    let a2 = new SectionIter(setA), b = new SectionIter(setB);
    for (let open = false; ; ) {
      if (a2.done && b.done) {
        return insert2 ? ChangeSet.createSet(sections, insert2) : ChangeDesc.create(sections);
      } else if (a2.ins == 0) {
        addSection(sections, a2.len, 0, open);
        a2.next();
      } else if (b.len == 0 && !b.done) {
        addSection(sections, 0, b.ins, open);
        if (insert2)
          addInsert(insert2, sections, b.text);
        b.next();
      } else if (a2.done || b.done) {
        throw new Error("Mismatched change set lengths");
      } else {
        let len = Math.min(a2.len2, b.len), sectionLen = sections.length;
        if (a2.ins == -1) {
          let insB = b.ins == -1 ? -1 : b.off ? 0 : b.ins;
          addSection(sections, len, insB, open);
          if (insert2 && insB)
            addInsert(insert2, sections, b.text);
        } else if (b.ins == -1) {
          addSection(sections, a2.off ? 0 : a2.len, len, open);
          if (insert2)
            addInsert(insert2, sections, a2.textBit(len));
        } else {
          addSection(sections, a2.off ? 0 : a2.len, b.off ? 0 : b.ins, open);
          if (insert2 && !b.off)
            addInsert(insert2, sections, b.text);
        }
        open = (a2.ins > len || b.ins >= 0 && b.len > len) && (open || sections.length > sectionLen);
        a2.forward2(len);
        b.forward(len);
      }
    }
  }
  function checkSelection(selection, docLength) {
    for (let range of selection.ranges)
      if (range.to > docLength)
        throw new RangeError("Selection points outside of document");
  }
  function sameArray(a2, b) {
    return a2 == b || a2.length == b.length && a2.every((e, i2) => e === b[i2]);
  }
  function compareArray(a2, b, compare2) {
    if (a2.length != b.length)
      return false;
    for (let i2 = 0; i2 < a2.length; i2++)
      if (!compare2(a2[i2], b[i2]))
        return false;
    return true;
  }
  function ensureAll(state, addrs) {
    let changed = false;
    for (let addr of addrs)
      if (ensureAddr(state, addr) & 1)
        changed = true;
    return changed;
  }
  function dynamicFacetSlot(addresses, facet, providers) {
    let providerAddrs = providers.map((p) => addresses[p.id]);
    let providerTypes = providers.map((p) => p.type);
    let dynamic = providerAddrs.filter((p) => !(p & 1));
    let idx = addresses[facet.id] >> 1;
    function get(state) {
      let values = [];
      for (let i2 = 0; i2 < providerAddrs.length; i2++) {
        let value = getAddr(state, providerAddrs[i2]);
        if (providerTypes[i2] == 2)
          for (let val of value)
            values.push(val);
        else
          values.push(value);
      }
      return facet.combine(values);
    }
    return {
      create(state) {
        for (let addr of providerAddrs)
          ensureAddr(state, addr);
        state.values[idx] = get(state);
        return 1;
      },
      update(state, tr) {
        if (!ensureAll(state, dynamic))
          return 0;
        let value = get(state);
        if (facet.compare(value, state.values[idx]))
          return 0;
        state.values[idx] = value;
        return 1;
      },
      reconfigure(state, oldState) {
        let depChanged = ensureAll(state, providerAddrs);
        let oldProviders = oldState.config.facets[facet.id], oldValue = oldState.facet(facet);
        if (oldProviders && !depChanged && sameArray(providers, oldProviders)) {
          state.values[idx] = oldValue;
          return 0;
        }
        let value = get(state);
        if (facet.compare(value, oldValue)) {
          state.values[idx] = oldValue;
          return 0;
        }
        state.values[idx] = value;
        return 1;
      }
    };
  }
  function prec(value) {
    return (ext) => new PrecExtension(ext, value);
  }
  function flatten(extension, compartments, newCompartments) {
    let result = [[], [], [], [], []];
    let seen = /* @__PURE__ */ new Map();
    function inner(ext, prec2) {
      let known = seen.get(ext);
      if (known != null) {
        if (known <= prec2)
          return;
        let found = result[known].indexOf(ext);
        if (found > -1)
          result[known].splice(found, 1);
        if (ext instanceof CompartmentInstance)
          newCompartments.delete(ext.compartment);
      }
      seen.set(ext, prec2);
      if (Array.isArray(ext)) {
        for (let e of ext)
          inner(e, prec2);
      } else if (ext instanceof CompartmentInstance) {
        if (newCompartments.has(ext.compartment))
          throw new RangeError(`Duplicate use of compartment in extensions`);
        let content2 = compartments.get(ext.compartment) || ext.inner;
        newCompartments.set(ext.compartment, content2);
        inner(content2, prec2);
      } else if (ext instanceof PrecExtension) {
        inner(ext.inner, ext.prec);
      } else if (ext instanceof StateField) {
        result[prec2].push(ext);
        if (ext.provides)
          inner(ext.provides, prec2);
      } else if (ext instanceof FacetProvider) {
        result[prec2].push(ext);
        if (ext.facet.extensions)
          inner(ext.facet.extensions, Prec_.default);
      } else {
        let content2 = ext.extension;
        if (!content2)
          throw new Error(`Unrecognized extension value in extension set (${ext}).`);
        if (content2 == ext)
          throw new Error(`Unrecognized extension value in extension set (${ext}). This sometimes happens because multiple instances of @codemirror/state are loaded, breaking instanceof checks.`);
        inner(content2, prec2);
      }
    }
    inner(extension, Prec_.default);
    return result.reduce((a2, b) => a2.concat(b));
  }
  function ensureAddr(state, addr) {
    if (addr & 1)
      return 2;
    let idx = addr >> 1;
    let status = state.status[idx];
    if (status == 4)
      throw new Error("Cyclic dependency between fields and/or facets");
    if (status & 2)
      return status;
    state.status[idx] = 4;
    let changed = state.computeSlot(state, state.config.dynamicSlots[idx]);
    return state.status[idx] = 2 | changed;
  }
  function getAddr(state, addr) {
    return addr & 1 ? state.config.staticValues[addr >> 1] : state.values[addr >> 1];
  }
  function joinRanges(a2, b) {
    let result = [];
    for (let iA = 0, iB = 0; ; ) {
      let from, to;
      if (iA < a2.length && (iB == b.length || b[iB] >= a2[iA])) {
        from = a2[iA++];
        to = a2[iA++];
      } else if (iB < b.length) {
        from = b[iB++];
        to = b[iB++];
      } else
        return result;
      if (!result.length || result[result.length - 1] < from)
        result.push(from, to);
      else if (result[result.length - 1] < to)
        result[result.length - 1] = to;
    }
  }
  function mergeTransaction(a2, b, sequential) {
    var _a2;
    let mapForA, mapForB, changes;
    if (sequential) {
      mapForA = b.changes;
      mapForB = ChangeSet.empty(b.changes.length);
      changes = a2.changes.compose(b.changes);
    } else {
      mapForA = b.changes.map(a2.changes);
      mapForB = a2.changes.mapDesc(b.changes, true);
      changes = a2.changes.compose(mapForA);
    }
    return {
      changes,
      selection: b.selection ? b.selection.map(mapForB) : (_a2 = a2.selection) === null || _a2 === void 0 ? void 0 : _a2.map(mapForA),
      effects: StateEffect.mapEffects(a2.effects, mapForA).concat(StateEffect.mapEffects(b.effects, mapForB)),
      annotations: a2.annotations.length ? a2.annotations.concat(b.annotations) : b.annotations,
      scrollIntoView: a2.scrollIntoView || b.scrollIntoView
    };
  }
  function resolveTransactionInner(state, spec, docSize) {
    let sel = spec.selection, annotations = asArray(spec.annotations);
    if (spec.userEvent)
      annotations = annotations.concat(Transaction.userEvent.of(spec.userEvent));
    return {
      changes: spec.changes instanceof ChangeSet ? spec.changes : ChangeSet.of(spec.changes || [], docSize, state.facet(lineSeparator)),
      selection: sel && (sel instanceof EditorSelection ? sel : EditorSelection.single(sel.anchor, sel.head)),
      effects: asArray(spec.effects),
      annotations,
      scrollIntoView: !!spec.scrollIntoView
    };
  }
  function resolveTransaction(state, specs, filter) {
    let s = resolveTransactionInner(state, specs.length ? specs[0] : {}, state.doc.length);
    if (specs.length && specs[0].filter === false)
      filter = false;
    for (let i2 = 1; i2 < specs.length; i2++) {
      if (specs[i2].filter === false)
        filter = false;
      let seq = !!specs[i2].sequential;
      s = mergeTransaction(s, resolveTransactionInner(state, specs[i2], seq ? s.changes.newLength : state.doc.length), seq);
    }
    let tr = Transaction.create(state, s.changes, s.selection, s.effects, s.annotations, s.scrollIntoView);
    return extendTransaction(filter ? filterTransaction(tr) : tr);
  }
  function filterTransaction(tr) {
    let state = tr.startState;
    let result = true;
    for (let filter of state.facet(changeFilter)) {
      let value = filter(tr);
      if (value === false) {
        result = false;
        break;
      }
      if (Array.isArray(value))
        result = result === true ? value : joinRanges(result, value);
    }
    if (result !== true) {
      let changes, back;
      if (result === false) {
        back = tr.changes.invertedDesc;
        changes = ChangeSet.empty(state.doc.length);
      } else {
        let filtered = tr.changes.filter(result);
        changes = filtered.changes;
        back = filtered.filtered.mapDesc(filtered.changes).invertedDesc;
      }
      tr = Transaction.create(state, changes, tr.selection && tr.selection.map(back), StateEffect.mapEffects(tr.effects, back), tr.annotations, tr.scrollIntoView);
    }
    let filters = state.facet(transactionFilter);
    for (let i2 = filters.length - 1; i2 >= 0; i2--) {
      let filtered = filters[i2](tr);
      if (filtered instanceof Transaction)
        tr = filtered;
      else if (Array.isArray(filtered) && filtered.length == 1 && filtered[0] instanceof Transaction)
        tr = filtered[0];
      else
        tr = resolveTransaction(state, asArray(filtered), false);
    }
    return tr;
  }
  function extendTransaction(tr) {
    let state = tr.startState, extenders = state.facet(transactionExtender), spec = tr;
    for (let i2 = extenders.length - 1; i2 >= 0; i2--) {
      let extension = extenders[i2](tr);
      if (extension && Object.keys(extension).length)
        spec = mergeTransaction(spec, resolveTransactionInner(state, extension, tr.changes.newLength), true);
    }
    return spec == tr ? tr : Transaction.create(state, tr.changes, tr.selection, spec.effects, spec.annotations, spec.scrollIntoView);
  }
  function asArray(value) {
    return value == null ? none : Array.isArray(value) ? value : [value];
  }
  function hasWordChar(str) {
    if (wordChar)
      return wordChar.test(str);
    for (let i2 = 0; i2 < str.length; i2++) {
      let ch = str[i2];
      if (/\w/.test(ch) || ch > "\x80" && (ch.toUpperCase() != ch.toLowerCase() || nonASCIISingleCaseWordChar.test(ch)))
        return true;
    }
    return false;
  }
  function makeCategorizer(wordChars) {
    return (char) => {
      if (!/\S/.test(char))
        return CharCategory.Space;
      if (hasWordChar(char))
        return CharCategory.Word;
      for (let i2 = 0; i2 < wordChars.length; i2++)
        if (char.indexOf(wordChars[i2]) > -1)
          return CharCategory.Word;
      return CharCategory.Other;
    };
  }
  function combineConfig(configs, defaults, combine = {}) {
    let result = {};
    for (let config of configs)
      for (let key of Object.keys(config)) {
        let value = config[key], current = result[key];
        if (current === void 0)
          result[key] = value;
        else if (current === value || value === void 0) ;
        else if (Object.hasOwnProperty.call(combine, key))
          result[key] = combine[key](current, value);
        else
          throw new Error("Config merge conflict for field " + key);
      }
    for (let key in defaults)
      if (result[key] === void 0)
        result[key] = defaults[key];
    return result;
  }
  function cmpVal(a2, b) {
    return a2 == b || a2.constructor == b.constructor && a2.eq(b);
  }
  function cmpRange(a2, b) {
    return a2.from - b.from || a2.value.startSide - b.value.startSide;
  }
  function last(arr) {
    return arr[arr.length - 1];
  }
  function lazySort(ranges) {
    if (ranges.length > 1)
      for (let prev = ranges[0], i2 = 1; i2 < ranges.length; i2++) {
        let cur = ranges[i2];
        if (cmpRange(prev, cur) > 0)
          return ranges.slice().sort(cmpRange);
        prev = cur;
      }
    return ranges;
  }
  function findSharedChunks(a2, b, textDiff) {
    let inA = /* @__PURE__ */ new Map();
    for (let set of a2)
      for (let i2 = 0; i2 < set.chunk.length; i2++)
        if (set.chunk[i2].maxPoint <= 0)
          inA.set(set.chunk[i2], set.chunkPos[i2]);
    let shared = /* @__PURE__ */ new Set();
    for (let set of b)
      for (let i2 = 0; i2 < set.chunk.length; i2++) {
        let known = inA.get(set.chunk[i2]);
        if (known != null && (textDiff ? textDiff.mapPos(known) : known) == set.chunkPos[i2] && !(textDiff === null || textDiff === void 0 ? void 0 : textDiff.touchesRange(known, known + set.chunk[i2].length)))
          shared.add(set.chunk[i2]);
      }
    return shared;
  }
  function heapBubble(heap, index) {
    for (let cur = heap[index]; ; ) {
      let childIndex = (index << 1) + 1;
      if (childIndex >= heap.length)
        break;
      let child = heap[childIndex];
      if (childIndex + 1 < heap.length && child.compare(heap[childIndex + 1]) >= 0) {
        child = heap[childIndex + 1];
        childIndex++;
      }
      if (cur.compare(child) < 0)
        break;
      heap[childIndex] = cur;
      heap[index] = child;
      index = childIndex;
    }
  }
  function compare(a2, startA, b, startB, length, comparator) {
    a2.goto(startA);
    b.goto(startB);
    let endB = startB + length;
    let pos = startB, dPos = startB - startA;
    let bounds = !!comparator.boundChange;
    for (let boundChange = false; ; ) {
      let dEnd = a2.to + dPos - b.to, diff = dEnd || a2.endSide - b.endSide;
      let end = diff < 0 ? a2.to + dPos : b.to, clipEnd = Math.min(end, endB);
      let point = a2.point || b.point;
      if (point) {
        if (!(a2.point && b.point && cmpVal(a2.point, b.point) && sameValues(a2.activeForPoint(a2.to), b.activeForPoint(b.to))))
          comparator.comparePoint(pos, clipEnd, a2.point, b.point);
        boundChange = false;
      } else {
        if (boundChange) {
          comparator.boundChange(pos);
          boundChange = false;
        }
        if (clipEnd > pos && !sameValues(a2.active, b.active))
          comparator.compareRange(pos, clipEnd, a2.active, b.active);
        if (bounds && clipEnd < endB && (dEnd || a2.openEnd(end) != b.openEnd(end)))
          boundChange = true;
      }
      if (end > endB)
        break;
      pos = end;
      if (diff <= 0)
        a2.next();
      if (diff >= 0)
        b.next();
    }
  }
  function sameValues(a2, b) {
    if (a2.length != b.length)
      return false;
    for (let i2 = 0; i2 < a2.length; i2++)
      if (a2[i2] != b[i2] && !cmpVal(a2[i2], b[i2]))
        return false;
    return true;
  }
  function remove(array, index) {
    for (let i2 = index, e = array.length - 1; i2 < e; i2++)
      array[i2] = array[i2 + 1];
    array.pop();
  }
  function insert(array, index, value) {
    for (let i2 = array.length - 1; i2 >= index; i2--)
      array[i2 + 1] = array[i2];
    array[index] = value;
  }
  function findMinIndex(value, array) {
    let found = -1, foundPos = 1e9;
    for (let i2 = 0; i2 < array.length; i2++)
      if ((array[i2] - foundPos || value[i2].endSide - value[found].endSide) < 0) {
        found = i2;
        foundPos = array[i2];
      }
    return found;
  }
  function countColumn(string2, tabSize, to = string2.length) {
    let n = 0;
    for (let i2 = 0; i2 < to && i2 < string2.length; ) {
      if (string2.charCodeAt(i2) == 9) {
        n += tabSize - n % tabSize;
        i2++;
      } else {
        n++;
        i2 = findClusterBreak2(string2, i2);
      }
    }
    return n;
  }
  function findColumn(string2, col, tabSize, strict) {
    for (let i2 = 0, n = 0; ; ) {
      if (n >= col)
        return i2;
      if (i2 == string2.length)
        break;
      n += string2.charCodeAt(i2) == 9 ? tabSize - n % tabSize : 1;
      i2 = findClusterBreak2(string2, i2);
    }
    return strict === true ? -1 : string2.length;
  }
  var Text, TextLeaf, TextNode, RawTextCursor, PartialTextCursor, LineCursor, Line, DefaultSplit, MapMode, ChangeDesc, ChangeSet, SectionIter, SelectionRange, EditorSelection, nextID, Facet, FacetProvider, initField, StateField, Prec_, Prec, PrecExtension, Compartment, CompartmentInstance, Configuration, languageData, allowMultipleSelections, lineSeparator, changeFilter, transactionFilter, transactionExtender, readOnly, Annotation, AnnotationType, StateEffectType, StateEffect, Transaction, none, CharCategory, nonASCIISingleCaseWordChar, wordChar, EditorState, RangeValue, Range, Chunk, RangeSet, RangeSetBuilder, LayerCursor, HeapCursor, SpanCursor;
  var init_dist = __esm({
    "node_modules/@codemirror/state/dist/index.js"() {
      init_src();
      Text = class _Text {
        /**
        Get the line description around the given position.
        */
        lineAt(pos) {
          if (pos < 0 || pos > this.length)
            throw new RangeError(`Invalid position ${pos} in document of length ${this.length}`);
          return this.lineInner(pos, false, 1, 0);
        }
        /**
        Get the description for the given (1-based) line number.
        */
        line(n) {
          if (n < 1 || n > this.lines)
            throw new RangeError(`Invalid line number ${n} in ${this.lines}-line document`);
          return this.lineInner(n, true, 1, 0);
        }
        /**
        Replace a range of the text with the given content.
        */
        replace(from, to, text) {
          [from, to] = clip(this, from, to);
          let parts = [];
          this.decompose(
            0,
            from,
            parts,
            2
            /* Open.To */
          );
          if (text.length)
            text.decompose(
              0,
              text.length,
              parts,
              1 | 2
              /* Open.To */
            );
          this.decompose(
            to,
            this.length,
            parts,
            1
            /* Open.From */
          );
          return TextNode.from(parts, this.length - (to - from) + text.length);
        }
        /**
        Append another document to this one.
        */
        append(other) {
          return this.replace(this.length, this.length, other);
        }
        /**
        Retrieve the text between the given points.
        */
        slice(from, to = this.length) {
          [from, to] = clip(this, from, to);
          let parts = [];
          this.decompose(from, to, parts, 0);
          return TextNode.from(parts, to - from);
        }
        /**
        Test whether this text is equal to another instance.
        */
        eq(other) {
          if (other == this)
            return true;
          if (other.length != this.length || other.lines != this.lines)
            return false;
          let start = this.scanIdentical(other, 1), end = this.length - this.scanIdentical(other, -1);
          let a2 = new RawTextCursor(this), b = new RawTextCursor(other);
          for (let skip = start, pos = start; ; ) {
            a2.next(skip);
            b.next(skip);
            skip = 0;
            if (a2.lineBreak != b.lineBreak || a2.done != b.done || a2.value != b.value)
              return false;
            pos += a2.value.length;
            if (a2.done || pos >= end)
              return true;
          }
        }
        /**
        Iterate over the text. When `dir` is `-1`, iteration happens
        from end to start. This will return lines and the breaks between
        them as separate strings.
        */
        iter(dir = 1) {
          return new RawTextCursor(this, dir);
        }
        /**
        Iterate over a range of the text. When `from` > `to`, the
        iterator will run in reverse.
        */
        iterRange(from, to = this.length) {
          return new PartialTextCursor(this, from, to);
        }
        /**
        Return a cursor that iterates over the given range of lines,
        _without_ returning the line breaks between, and yielding empty
        strings for empty lines.
        
        When `from` and `to` are given, they should be 1-based line numbers.
        */
        iterLines(from, to) {
          let inner;
          if (from == null) {
            inner = this.iter();
          } else {
            if (to == null)
              to = this.lines + 1;
            let start = this.line(from).from;
            inner = this.iterRange(start, Math.max(start, to == this.lines + 1 ? this.length : to <= 1 ? 0 : this.line(to - 1).to));
          }
          return new LineCursor(inner);
        }
        /**
        Return the document as a string, using newline characters to
        separate lines.
        */
        toString() {
          return this.sliceString(0);
        }
        /**
        Convert the document to an array of lines (which can be
        deserialized again via [`Text.of`](https://codemirror.net/6/docs/ref/#state.Text^of)).
        */
        toJSON() {
          let lines = [];
          this.flatten(lines);
          return lines;
        }
        /**
        @internal
        */
        constructor() {
        }
        /**
        Create a `Text` instance for the given array of lines.
        */
        static of(text) {
          if (text.length == 0)
            throw new RangeError("A document must have at least one line");
          if (text.length == 1 && !text[0])
            return _Text.empty;
          return text.length <= 32 ? new TextLeaf(text) : TextNode.from(TextLeaf.split(text, []));
        }
      };
      TextLeaf = class _TextLeaf extends Text {
        constructor(text, length = textLength(text)) {
          super();
          this.text = text;
          this.length = length;
        }
        get lines() {
          return this.text.length;
        }
        get children() {
          return null;
        }
        lineInner(target, isLine, line, offset) {
          for (let i2 = 0; ; i2++) {
            let string2 = this.text[i2], end = offset + string2.length;
            if ((isLine ? line : end) >= target)
              return new Line(offset, end, line, string2);
            offset = end + 1;
            line++;
          }
        }
        decompose(from, to, target, open) {
          let text = from <= 0 && to >= this.length ? this : new _TextLeaf(sliceText(this.text, from, to), Math.min(to, this.length) - Math.max(0, from));
          if (open & 1) {
            let prev = target.pop();
            let joined = appendText(text.text, prev.text.slice(), 0, text.length);
            if (joined.length <= 32) {
              target.push(new _TextLeaf(joined, prev.length + text.length));
            } else {
              let mid = joined.length >> 1;
              target.push(new _TextLeaf(joined.slice(0, mid)), new _TextLeaf(joined.slice(mid)));
            }
          } else {
            target.push(text);
          }
        }
        replace(from, to, text) {
          if (!(text instanceof _TextLeaf))
            return super.replace(from, to, text);
          [from, to] = clip(this, from, to);
          let lines = appendText(this.text, appendText(text.text, sliceText(this.text, 0, from)), to);
          let newLen = this.length + text.length - (to - from);
          if (lines.length <= 32)
            return new _TextLeaf(lines, newLen);
          return TextNode.from(_TextLeaf.split(lines, []), newLen);
        }
        sliceString(from, to = this.length, lineSep = "\n") {
          [from, to] = clip(this, from, to);
          let result = "";
          for (let pos = 0, i2 = 0; pos <= to && i2 < this.text.length; i2++) {
            let line = this.text[i2], end = pos + line.length;
            if (pos > from && i2)
              result += lineSep;
            if (from < end && to > pos)
              result += line.slice(Math.max(0, from - pos), to - pos);
            pos = end + 1;
          }
          return result;
        }
        flatten(target) {
          for (let line of this.text)
            target.push(line);
        }
        scanIdentical() {
          return 0;
        }
        static split(text, target) {
          let part = [], len = -1;
          for (let line of text) {
            part.push(line);
            len += line.length + 1;
            if (part.length == 32) {
              target.push(new _TextLeaf(part, len));
              part = [];
              len = -1;
            }
          }
          if (len > -1)
            target.push(new _TextLeaf(part, len));
          return target;
        }
      };
      TextNode = class _TextNode extends Text {
        constructor(children, length) {
          super();
          this.children = children;
          this.length = length;
          this.lines = 0;
          for (let child of children)
            this.lines += child.lines;
        }
        lineInner(target, isLine, line, offset) {
          for (let i2 = 0; ; i2++) {
            let child = this.children[i2], end = offset + child.length, endLine = line + child.lines - 1;
            if ((isLine ? endLine : end) >= target)
              return child.lineInner(target, isLine, line, offset);
            offset = end + 1;
            line = endLine + 1;
          }
        }
        decompose(from, to, target, open) {
          for (let i2 = 0, pos = 0; pos <= to && i2 < this.children.length; i2++) {
            let child = this.children[i2], end = pos + child.length;
            if (from <= end && to >= pos) {
              let childOpen = open & ((pos <= from ? 1 : 0) | (end >= to ? 2 : 0));
              if (pos >= from && end <= to && !childOpen)
                target.push(child);
              else
                child.decompose(from - pos, to - pos, target, childOpen);
            }
            pos = end + 1;
          }
        }
        replace(from, to, text) {
          [from, to] = clip(this, from, to);
          if (text.lines < this.lines)
            for (let i2 = 0, pos = 0; i2 < this.children.length; i2++) {
              let child = this.children[i2], end = pos + child.length;
              if (from >= pos && to <= end) {
                let updated = child.replace(from - pos, to - pos, text);
                let totalLines = this.lines - child.lines + updated.lines;
                if (updated.lines < totalLines >> 5 - 1 && updated.lines > totalLines >> 5 + 1) {
                  let copy = this.children.slice();
                  copy[i2] = updated;
                  return new _TextNode(copy, this.length - (to - from) + text.length);
                }
                return super.replace(pos, end, updated);
              }
              pos = end + 1;
            }
          return super.replace(from, to, text);
        }
        sliceString(from, to = this.length, lineSep = "\n") {
          [from, to] = clip(this, from, to);
          let result = "";
          for (let i2 = 0, pos = 0; i2 < this.children.length && pos <= to; i2++) {
            let child = this.children[i2], end = pos + child.length;
            if (pos > from && i2)
              result += lineSep;
            if (from < end && to > pos)
              result += child.sliceString(from - pos, to - pos, lineSep);
            pos = end + 1;
          }
          return result;
        }
        flatten(target) {
          for (let child of this.children)
            child.flatten(target);
        }
        scanIdentical(other, dir) {
          if (!(other instanceof _TextNode))
            return 0;
          let length = 0;
          let [iA, iB, eA, eB] = dir > 0 ? [0, 0, this.children.length, other.children.length] : [this.children.length - 1, other.children.length - 1, -1, -1];
          for (; ; iA += dir, iB += dir) {
            if (iA == eA || iB == eB)
              return length;
            let chA = this.children[iA], chB = other.children[iB];
            if (chA != chB)
              return length + chA.scanIdentical(chB, dir);
            length += chA.length + 1;
          }
        }
        static from(children, length = children.reduce((l, ch) => l + ch.length + 1, -1)) {
          let lines = 0;
          for (let ch of children)
            lines += ch.lines;
          if (lines < 32) {
            let flat = [];
            for (let ch of children)
              ch.flatten(flat);
            return new TextLeaf(flat, length);
          }
          let chunk = Math.max(
            32,
            lines >> 5
            /* Tree.BranchShift */
          ), maxChunk = chunk << 1, minChunk = chunk >> 1;
          let chunked = [], currentLines = 0, currentLen = -1, currentChunk = [];
          function add(child) {
            let last2;
            if (child.lines > maxChunk && child instanceof _TextNode) {
              for (let node of child.children)
                add(node);
            } else if (child.lines > minChunk && (currentLines > minChunk || !currentLines)) {
              flush();
              chunked.push(child);
            } else if (child instanceof TextLeaf && currentLines && (last2 = currentChunk[currentChunk.length - 1]) instanceof TextLeaf && child.lines + last2.lines <= 32) {
              currentLines += child.lines;
              currentLen += child.length + 1;
              currentChunk[currentChunk.length - 1] = new TextLeaf(last2.text.concat(child.text), last2.length + 1 + child.length);
            } else {
              if (currentLines + child.lines > chunk)
                flush();
              currentLines += child.lines;
              currentLen += child.length + 1;
              currentChunk.push(child);
            }
          }
          function flush() {
            if (currentLines == 0)
              return;
            chunked.push(currentChunk.length == 1 ? currentChunk[0] : _TextNode.from(currentChunk, currentLen));
            currentLen = -1;
            currentLines = currentChunk.length = 0;
          }
          for (let child of children)
            add(child);
          flush();
          return chunked.length == 1 ? chunked[0] : new _TextNode(chunked, length);
        }
      };
      Text.empty = /* @__PURE__ */ new TextLeaf([""], 0);
      RawTextCursor = class {
        constructor(text, dir = 1) {
          this.dir = dir;
          this.done = false;
          this.lineBreak = false;
          this.value = "";
          this.nodes = [text];
          this.offsets = [dir > 0 ? 1 : (text instanceof TextLeaf ? text.text.length : text.children.length) << 1];
        }
        nextInner(skip, dir) {
          this.done = this.lineBreak = false;
          for (; ; ) {
            let last2 = this.nodes.length - 1;
            let top2 = this.nodes[last2], offsetValue = this.offsets[last2], offset = offsetValue >> 1;
            let size = top2 instanceof TextLeaf ? top2.text.length : top2.children.length;
            if (offset == (dir > 0 ? size : 0)) {
              if (last2 == 0) {
                this.done = true;
                this.value = "";
                return this;
              }
              if (dir > 0)
                this.offsets[last2 - 1]++;
              this.nodes.pop();
              this.offsets.pop();
            } else if ((offsetValue & 1) == (dir > 0 ? 0 : 1)) {
              this.offsets[last2] += dir;
              if (skip == 0) {
                this.lineBreak = true;
                this.value = "\n";
                return this;
              }
              skip--;
            } else if (top2 instanceof TextLeaf) {
              let next = top2.text[offset + (dir < 0 ? -1 : 0)];
              this.offsets[last2] += dir;
              if (next.length > Math.max(0, skip)) {
                this.value = skip == 0 ? next : dir > 0 ? next.slice(skip) : next.slice(0, next.length - skip);
                return this;
              }
              skip -= next.length;
            } else {
              let next = top2.children[offset + (dir < 0 ? -1 : 0)];
              if (skip > next.length) {
                skip -= next.length;
                this.offsets[last2] += dir;
              } else {
                if (dir < 0)
                  this.offsets[last2]--;
                this.nodes.push(next);
                this.offsets.push(dir > 0 ? 1 : (next instanceof TextLeaf ? next.text.length : next.children.length) << 1);
              }
            }
          }
        }
        next(skip = 0) {
          if (skip < 0) {
            this.nextInner(-skip, -this.dir);
            skip = this.value.length;
          }
          return this.nextInner(skip, this.dir);
        }
      };
      PartialTextCursor = class {
        constructor(text, start, end) {
          this.value = "";
          this.done = false;
          this.cursor = new RawTextCursor(text, start > end ? -1 : 1);
          this.pos = start > end ? text.length : 0;
          this.from = Math.min(start, end);
          this.to = Math.max(start, end);
        }
        nextInner(skip, dir) {
          if (dir < 0 ? this.pos <= this.from : this.pos >= this.to) {
            this.value = "";
            this.done = true;
            return this;
          }
          skip += Math.max(0, dir < 0 ? this.pos - this.to : this.from - this.pos);
          let limit = dir < 0 ? this.pos - this.from : this.to - this.pos;
          if (skip > limit)
            skip = limit;
          limit -= skip;
          let { value } = this.cursor.next(skip);
          this.pos += (value.length + skip) * dir;
          this.value = value.length <= limit ? value : dir < 0 ? value.slice(value.length - limit) : value.slice(0, limit);
          this.done = !this.value;
          return this;
        }
        next(skip = 0) {
          if (skip < 0)
            skip = Math.max(skip, this.from - this.pos);
          else if (skip > 0)
            skip = Math.min(skip, this.to - this.pos);
          return this.nextInner(skip, this.cursor.dir);
        }
        get lineBreak() {
          return this.cursor.lineBreak && this.value != "";
        }
      };
      LineCursor = class {
        constructor(inner) {
          this.inner = inner;
          this.afterBreak = true;
          this.value = "";
          this.done = false;
        }
        next(skip = 0) {
          let { done, lineBreak, value } = this.inner.next(skip);
          if (done && this.afterBreak) {
            this.value = "";
            this.afterBreak = false;
          } else if (done) {
            this.done = true;
            this.value = "";
          } else if (lineBreak) {
            if (this.afterBreak) {
              this.value = "";
            } else {
              this.afterBreak = true;
              this.next();
            }
          } else {
            this.value = value;
            this.afterBreak = false;
          }
          return this;
        }
        get lineBreak() {
          return false;
        }
      };
      if (typeof Symbol != "undefined") {
        Text.prototype[Symbol.iterator] = function() {
          return this.iter();
        };
        RawTextCursor.prototype[Symbol.iterator] = PartialTextCursor.prototype[Symbol.iterator] = LineCursor.prototype[Symbol.iterator] = function() {
          return this;
        };
      }
      Line = class {
        /**
        @internal
        */
        constructor(from, to, number2, text) {
          this.from = from;
          this.to = to;
          this.number = number2;
          this.text = text;
        }
        /**
        The length of the line (not including any line break after it).
        */
        get length() {
          return this.to - this.from;
        }
      };
      DefaultSplit = /\r\n?|\n/;
      MapMode = /* @__PURE__ */ (function(MapMode2) {
        MapMode2[MapMode2["Simple"] = 0] = "Simple";
        MapMode2[MapMode2["TrackDel"] = 1] = "TrackDel";
        MapMode2[MapMode2["TrackBefore"] = 2] = "TrackBefore";
        MapMode2[MapMode2["TrackAfter"] = 3] = "TrackAfter";
        return MapMode2;
      })(MapMode || (MapMode = {}));
      ChangeDesc = class _ChangeDesc {
        // Sections are encoded as pairs of integers. The first is the
        // length in the current document, and the second is -1 for
        // unaffected sections, and the length of the replacement content
        // otherwise. So an insertion would be (0, n>0), a deletion (n>0,
        // 0), and a replacement two positive numbers.
        /**
        @internal
        */
        constructor(sections) {
          this.sections = sections;
        }
        /**
        The length of the document before the change.
        */
        get length() {
          let result = 0;
          for (let i2 = 0; i2 < this.sections.length; i2 += 2)
            result += this.sections[i2];
          return result;
        }
        /**
        The length of the document after the change.
        */
        get newLength() {
          let result = 0;
          for (let i2 = 0; i2 < this.sections.length; i2 += 2) {
            let ins = this.sections[i2 + 1];
            result += ins < 0 ? this.sections[i2] : ins;
          }
          return result;
        }
        /**
        False when there are actual changes in this set.
        */
        get empty() {
          return this.sections.length == 0 || this.sections.length == 2 && this.sections[1] < 0;
        }
        /**
        Iterate over the unchanged parts left by these changes. `posA`
        provides the position of the range in the old document, `posB`
        the new position in the changed document.
        */
        iterGaps(f) {
          for (let i2 = 0, posA = 0, posB = 0; i2 < this.sections.length; ) {
            let len = this.sections[i2++], ins = this.sections[i2++];
            if (ins < 0) {
              f(posA, posB, len);
              posB += len;
            } else {
              posB += ins;
            }
            posA += len;
          }
        }
        /**
        Iterate over the ranges changed by these changes. (See
        [`ChangeSet.iterChanges`](https://codemirror.net/6/docs/ref/#state.ChangeSet.iterChanges) for a
        variant that also provides you with the inserted text.)
        `fromA`/`toA` provides the extent of the change in the starting
        document, `fromB`/`toB` the extent of the replacement in the
        changed document.
        
        When `individual` is true, adjacent changes (which are kept
        separate for [position mapping](https://codemirror.net/6/docs/ref/#state.ChangeDesc.mapPos)) are
        reported separately.
        */
        iterChangedRanges(f, individual = false) {
          iterChanges(this, f, individual);
        }
        /**
        Get a description of the inverted form of these changes.
        */
        get invertedDesc() {
          let sections = [];
          for (let i2 = 0; i2 < this.sections.length; ) {
            let len = this.sections[i2++], ins = this.sections[i2++];
            if (ins < 0)
              sections.push(len, ins);
            else
              sections.push(ins, len);
          }
          return new _ChangeDesc(sections);
        }
        /**
        Compute the combined effect of applying another set of changes
        after this one. The length of the document after this set should
        match the length before `other`.
        */
        composeDesc(other) {
          return this.empty ? other : other.empty ? this : composeSets(this, other);
        }
        /**
        Map this description, which should start with the same document
        as `other`, over another set of changes, so that it can be
        applied after it. When `before` is true, map as if the changes
        in `this` happened before the ones in `other`.
        */
        mapDesc(other, before = false) {
          return other.empty ? this : mapSet(this, other, before);
        }
        mapPos(pos, assoc = -1, mode = MapMode.Simple) {
          let posA = 0, posB = 0;
          for (let i2 = 0; i2 < this.sections.length; ) {
            let len = this.sections[i2++], ins = this.sections[i2++], endA = posA + len;
            if (ins < 0) {
              if (endA > pos)
                return posB + (pos - posA);
              posB += len;
            } else {
              if (mode != MapMode.Simple && endA >= pos && (mode == MapMode.TrackDel && posA < pos && endA > pos || mode == MapMode.TrackBefore && posA < pos || mode == MapMode.TrackAfter && endA > pos))
                return null;
              if (endA > pos || endA == pos && assoc < 0 && !len)
                return pos == posA || assoc < 0 ? posB : posB + ins;
              posB += ins;
            }
            posA = endA;
          }
          if (pos > posA)
            throw new RangeError(`Position ${pos} is out of range for changeset of length ${posA}`);
          return posB;
        }
        /**
        Check whether these changes touch a given range. When one of the
        changes entirely covers the range, the string `"cover"` is
        returned.
        */
        touchesRange(from, to = from) {
          for (let i2 = 0, pos = 0; i2 < this.sections.length && pos <= to; ) {
            let len = this.sections[i2++], ins = this.sections[i2++], end = pos + len;
            if (ins >= 0 && pos <= to && end >= from)
              return pos < from && end > to ? "cover" : true;
            pos = end;
          }
          return false;
        }
        /**
        @internal
        */
        toString() {
          let result = "";
          for (let i2 = 0; i2 < this.sections.length; ) {
            let len = this.sections[i2++], ins = this.sections[i2++];
            result += (result ? " " : "") + len + (ins >= 0 ? ":" + ins : "");
          }
          return result;
        }
        /**
        Serialize this change desc to a JSON-representable value.
        */
        toJSON() {
          return this.sections;
        }
        /**
        Create a change desc from its JSON representation (as produced
        by [`toJSON`](https://codemirror.net/6/docs/ref/#state.ChangeDesc.toJSON).
        */
        static fromJSON(json) {
          if (!Array.isArray(json) || json.length % 2 || json.some((a2) => typeof a2 != "number"))
            throw new RangeError("Invalid JSON representation of ChangeDesc");
          return new _ChangeDesc(json);
        }
        /**
        @internal
        */
        static create(sections) {
          return new _ChangeDesc(sections);
        }
      };
      ChangeSet = class _ChangeSet extends ChangeDesc {
        constructor(sections, inserted) {
          super(sections);
          this.inserted = inserted;
        }
        /**
        Apply the changes to a document, returning the modified
        document.
        */
        apply(doc2) {
          if (this.length != doc2.length)
            throw new RangeError("Applying change set to a document with the wrong length");
          iterChanges(this, (fromA, toA, fromB, _toB, text) => doc2 = doc2.replace(fromB, fromB + (toA - fromA), text), false);
          return doc2;
        }
        mapDesc(other, before = false) {
          return mapSet(this, other, before, true);
        }
        /**
        Given the document as it existed _before_ the changes, return a
        change set that represents the inverse of this set, which could
        be used to go from the document created by the changes back to
        the document as it existed before the changes.
        */
        invert(doc2) {
          let sections = this.sections.slice(), inserted = [];
          for (let i2 = 0, pos = 0; i2 < sections.length; i2 += 2) {
            let len = sections[i2], ins = sections[i2 + 1];
            if (ins >= 0) {
              sections[i2] = ins;
              sections[i2 + 1] = len;
              let index = i2 >> 1;
              while (inserted.length < index)
                inserted.push(Text.empty);
              inserted.push(len ? doc2.slice(pos, pos + len) : Text.empty);
            }
            pos += len;
          }
          return new _ChangeSet(sections, inserted);
        }
        /**
        Combine two subsequent change sets into a single set. `other`
        must start in the document produced by `this`. If `this` goes
        `docA` → `docB` and `other` represents `docB` → `docC`, the
        returned value will represent the change `docA` → `docC`.
        */
        compose(other) {
          return this.empty ? other : other.empty ? this : composeSets(this, other, true);
        }
        /**
        Given another change set starting in the same document, maps this
        change set over the other, producing a new change set that can be
        applied to the document produced by applying `other`. When
        `before` is `true`, order changes as if `this` comes before
        `other`, otherwise (the default) treat `other` as coming first.
        
        Given two changes `A` and `B`, `A.compose(B.map(A))` and
        `B.compose(A.map(B, true))` will produce the same document. This
        provides a basic form of [operational
        transformation](https://en.wikipedia.org/wiki/Operational_transformation),
        and can be used for collaborative editing.
        */
        map(other, before = false) {
          return other.empty ? this : mapSet(this, other, before, true);
        }
        /**
        Iterate over the changed ranges in the document, calling `f` for
        each, with the range in the original document (`fromA`-`toA`)
        and the range that replaces it in the new document
        (`fromB`-`toB`).
        
        When `individual` is true, adjacent changes are reported
        separately.
        */
        iterChanges(f, individual = false) {
          iterChanges(this, f, individual);
        }
        /**
        Get a [change description](https://codemirror.net/6/docs/ref/#state.ChangeDesc) for this change
        set.
        */
        get desc() {
          return ChangeDesc.create(this.sections);
        }
        /**
        @internal
        */
        filter(ranges) {
          let resultSections = [], resultInserted = [], filteredSections = [];
          let iter = new SectionIter(this);
          done: for (let i2 = 0, pos = 0; ; ) {
            let next = i2 == ranges.length ? 1e9 : ranges[i2++];
            while (pos < next || pos == next && iter.len == 0) {
              if (iter.done)
                break done;
              let len = Math.min(iter.len, next - pos);
              addSection(filteredSections, len, -1);
              let ins = iter.ins == -1 ? -1 : iter.off == 0 ? iter.ins : 0;
              addSection(resultSections, len, ins);
              if (ins > 0)
                addInsert(resultInserted, resultSections, iter.text);
              iter.forward(len);
              pos += len;
            }
            let end = ranges[i2++];
            while (pos < end) {
              if (iter.done)
                break done;
              let len = Math.min(iter.len, end - pos);
              addSection(resultSections, len, -1);
              addSection(filteredSections, len, iter.ins == -1 ? -1 : iter.off == 0 ? iter.ins : 0);
              iter.forward(len);
              pos += len;
            }
          }
          return {
            changes: new _ChangeSet(resultSections, resultInserted),
            filtered: ChangeDesc.create(filteredSections)
          };
        }
        /**
        Serialize this change set to a JSON-representable value.
        */
        toJSON() {
          let parts = [];
          for (let i2 = 0; i2 < this.sections.length; i2 += 2) {
            let len = this.sections[i2], ins = this.sections[i2 + 1];
            if (ins < 0)
              parts.push(len);
            else if (ins == 0)
              parts.push([len]);
            else
              parts.push([len].concat(this.inserted[i2 >> 1].toJSON()));
          }
          return parts;
        }
        /**
        Create a change set for the given changes, for a document of the
        given length, using `lineSep` as line separator.
        */
        static of(changes, length, lineSep) {
          let sections = [], inserted = [], pos = 0;
          let total = null;
          function flush(force = false) {
            if (!force && !sections.length)
              return;
            if (pos < length)
              addSection(sections, length - pos, -1);
            let set = new _ChangeSet(sections, inserted);
            total = total ? total.compose(set.map(total)) : set;
            sections = [];
            inserted = [];
            pos = 0;
          }
          function process2(spec) {
            if (Array.isArray(spec)) {
              for (let sub of spec)
                process2(sub);
            } else if (spec instanceof _ChangeSet) {
              if (spec.length != length)
                throw new RangeError(`Mismatched change set length (got ${spec.length}, expected ${length})`);
              flush();
              total = total ? total.compose(spec.map(total)) : spec;
            } else {
              let { from, to = from, insert: insert2 } = spec;
              if (from > to || from < 0 || to > length)
                throw new RangeError(`Invalid change range ${from} to ${to} (in doc of length ${length})`);
              let insText = !insert2 ? Text.empty : typeof insert2 == "string" ? Text.of(insert2.split(lineSep || DefaultSplit)) : insert2;
              let insLen = insText.length;
              if (from == to && insLen == 0)
                return;
              if (from < pos)
                flush();
              if (from > pos)
                addSection(sections, from - pos, -1);
              addSection(sections, to - from, insLen);
              addInsert(inserted, sections, insText);
              pos = to;
            }
          }
          process2(changes);
          flush(!total);
          return total;
        }
        /**
        Create an empty changeset of the given length.
        */
        static empty(length) {
          return new _ChangeSet(length ? [length, -1] : [], []);
        }
        /**
        Create a changeset from its JSON representation (as produced by
        [`toJSON`](https://codemirror.net/6/docs/ref/#state.ChangeSet.toJSON).
        */
        static fromJSON(json) {
          if (!Array.isArray(json))
            throw new RangeError("Invalid JSON representation of ChangeSet");
          let sections = [], inserted = [];
          for (let i2 = 0; i2 < json.length; i2++) {
            let part = json[i2];
            if (typeof part == "number") {
              sections.push(part, -1);
            } else if (!Array.isArray(part) || typeof part[0] != "number" || part.some((e, i3) => i3 && typeof e != "string")) {
              throw new RangeError("Invalid JSON representation of ChangeSet");
            } else if (part.length == 1) {
              sections.push(part[0], 0);
            } else {
              while (inserted.length < i2)
                inserted.push(Text.empty);
              inserted[i2] = Text.of(part.slice(1));
              sections.push(part[0], inserted[i2].length);
            }
          }
          return new _ChangeSet(sections, inserted);
        }
        /**
        @internal
        */
        static createSet(sections, inserted) {
          return new _ChangeSet(sections, inserted);
        }
      };
      SectionIter = class {
        constructor(set) {
          this.set = set;
          this.i = 0;
          this.next();
        }
        next() {
          let { sections } = this.set;
          if (this.i < sections.length) {
            this.len = sections[this.i++];
            this.ins = sections[this.i++];
          } else {
            this.len = 0;
            this.ins = -2;
          }
          this.off = 0;
        }
        get done() {
          return this.ins == -2;
        }
        get len2() {
          return this.ins < 0 ? this.len : this.ins;
        }
        get text() {
          let { inserted } = this.set, index = this.i - 2 >> 1;
          return index >= inserted.length ? Text.empty : inserted[index];
        }
        textBit(len) {
          let { inserted } = this.set, index = this.i - 2 >> 1;
          return index >= inserted.length && !len ? Text.empty : inserted[index].slice(this.off, len == null ? void 0 : this.off + len);
        }
        forward(len) {
          if (len == this.len)
            this.next();
          else {
            this.len -= len;
            this.off += len;
          }
        }
        forward2(len) {
          if (this.ins == -1)
            this.forward(len);
          else if (len == this.ins)
            this.next();
          else {
            this.ins -= len;
            this.off += len;
          }
        }
      };
      SelectionRange = class _SelectionRange {
        constructor(from, to, flags, goalColumn) {
          this.from = from;
          this.to = to;
          this.flags = flags;
          this.goalColumn = goalColumn;
        }
        /**
        The anchor of the range—the side that doesn't move when you
        extend it.
        */
        get anchor() {
          return this.flags & 32 ? this.to : this.from;
        }
        /**
        The head of the range, which is moved when the range is
        [extended](https://codemirror.net/6/docs/ref/#state.SelectionRange.extend).
        */
        get head() {
          return this.flags & 32 ? this.from : this.to;
        }
        /**
        True when `anchor` and `head` are at the same position.
        */
        get empty() {
          return this.from == this.to;
        }
        /**
        If this is a cursor that is explicitly associated with the
        character on one of its sides, this returns the side. -1 means
        the character before its position, 1 the character after, and 0
        means no association.
        */
        get assoc() {
          return this.flags & 8 ? -1 : this.flags & 16 ? 1 : 0;
        }
        /**
        A flag that, when set, makes some selection-extending commands
        treat the range's head and anchor as exchangeable, so that for
        example Shift-ArrowUp will make the lower side of the selection
        the anchor, even if that was the head before. Used to implement
        MacOS-style undirectional selections.
        */
        get undirectional() {
          return (this.flags & 64) > 0;
        }
        /**
        The bidirectional text level associated with this cursor, if
        any.
        */
        get bidiLevel() {
          let level = this.flags & 7;
          return level == 7 ? null : level;
        }
        /**
        Map this range through a change, producing a valid range in the
        updated document.
        */
        map(change, assoc = -1) {
          let from, to;
          if (this.empty) {
            from = to = change.mapPos(this.from, assoc);
          } else {
            from = change.mapPos(this.from, 1);
            to = change.mapPos(this.to, -1);
          }
          return from == this.from && to == this.to ? this : new _SelectionRange(from, to, this.flags, this.goalColumn);
        }
        /**
        Extend this range to cover at least `from` to `to`.
        */
        extend(from, to = from, assoc = 0) {
          if (from <= this.anchor && to >= this.anchor)
            return EditorSelection.range(from, to, void 0, void 0, assoc);
          let head = Math.abs(from - this.anchor) > Math.abs(to - this.anchor) ? from : to;
          return EditorSelection.range(this.anchor, head, void 0, void 0, assoc);
        }
        /**
        Compare this range to another range.
        */
        eq(other, includeAssoc = false) {
          return this.anchor == other.anchor && this.head == other.head && this.goalColumn == other.goalColumn && (!includeAssoc || !this.empty || this.assoc == other.assoc);
        }
        /**
        Return a JSON-serializable object representing the range.
        */
        toJSON() {
          return { anchor: this.anchor, head: this.head };
        }
        /**
        Convert a JSON representation of a range to a `SelectionRange`
        instance.
        */
        static fromJSON(json) {
          if (!json || typeof json.anchor != "number" || typeof json.head != "number")
            throw new RangeError("Invalid JSON representation for SelectionRange");
          return EditorSelection.range(json.anchor, json.head);
        }
        /**
        @internal
        */
        static create(from, to, flags, goalColumn) {
          return new _SelectionRange(from, to, flags, goalColumn);
        }
      };
      EditorSelection = class _EditorSelection {
        constructor(ranges, mainIndex) {
          this.ranges = ranges;
          this.mainIndex = mainIndex;
        }
        /**
        Map a selection through a change. Used to adjust the selection
        position for changes.
        */
        map(change, assoc = -1) {
          if (change.empty)
            return this;
          return _EditorSelection.create(this.ranges.map((r) => r.map(change, assoc)), this.mainIndex);
        }
        /**
        Compare this selection to another selection. By default, ranges
        are compared only by position. When `includeAssoc` is true,
        cursor ranges must also have the same
        [`assoc`](https://codemirror.net/6/docs/ref/#state.SelectionRange.assoc) value.
        */
        eq(other, includeAssoc = false) {
          if (this.ranges.length != other.ranges.length || this.mainIndex != other.mainIndex)
            return false;
          for (let i2 = 0; i2 < this.ranges.length; i2++)
            if (!this.ranges[i2].eq(other.ranges[i2], includeAssoc))
              return false;
          return true;
        }
        /**
        Get the primary selection range. Usually, you should make sure
        your code applies to _all_ ranges, by using methods like
        [`changeByRange`](https://codemirror.net/6/docs/ref/#state.EditorState.changeByRange).
        */
        get main() {
          return this.ranges[this.mainIndex];
        }
        /**
        Make sure the selection only has one range. Returns a selection
        holding only the main range from this selection.
        */
        asSingle() {
          return this.ranges.length == 1 ? this : new _EditorSelection([this.main], 0);
        }
        /**
        Extend this selection with an extra range.
        */
        addRange(range, main = true) {
          return _EditorSelection.create([range].concat(this.ranges), main ? 0 : this.mainIndex + 1);
        }
        /**
        Replace a given range with another range, and then normalize the
        selection to merge and sort ranges if necessary.
        */
        replaceRange(range, which = this.mainIndex) {
          let ranges = this.ranges.slice();
          ranges[which] = range;
          return _EditorSelection.create(ranges, this.mainIndex);
        }
        /**
        Convert this selection to an object that can be serialized to
        JSON.
        */
        toJSON() {
          return { ranges: this.ranges.map((r) => r.toJSON()), main: this.mainIndex };
        }
        /**
        Create a selection from a JSON representation.
        */
        static fromJSON(json) {
          if (!json || !Array.isArray(json.ranges) || typeof json.main != "number" || json.main >= json.ranges.length)
            throw new RangeError("Invalid JSON representation for EditorSelection");
          return new _EditorSelection(json.ranges.map((r) => SelectionRange.fromJSON(r)), json.main);
        }
        /**
        Create a selection holding a single range.
        */
        static single(anchor, head = anchor) {
          return new _EditorSelection([_EditorSelection.range(anchor, head)], 0);
        }
        /**
        Sort and merge the given set of ranges, creating a valid
        selection.
        */
        static create(ranges, mainIndex = 0) {
          if (ranges.length == 0)
            throw new RangeError("A selection needs at least one range");
          for (let pos = 0, i2 = 0; i2 < ranges.length; i2++) {
            let range = ranges[i2];
            if (range.empty ? range.from <= pos : range.from < pos)
              return _EditorSelection.normalized(ranges.slice(), mainIndex);
            pos = range.to;
          }
          return new _EditorSelection(ranges, mainIndex);
        }
        /**
        Create a cursor selection range at the given position. You can
        safely ignore the optional arguments in most situations.
        */
        static cursor(pos, assoc = 0, bidiLevel, goalColumn) {
          return SelectionRange.create(pos, pos, (assoc == 0 ? 0 : assoc < 0 ? 8 : 16) | (bidiLevel == null ? 7 : Math.min(6, bidiLevel)), goalColumn);
        }
        /**
        Create a selection range.
        */
        static range(anchor, head, goalColumn, bidiLevel, assoc) {
          let flags = bidiLevel == null ? 7 : Math.min(6, bidiLevel);
          if (!assoc && anchor != head)
            assoc = head < anchor ? 1 : -1;
          if (assoc)
            flags |= assoc < 0 ? 8 : 16;
          return head < anchor ? SelectionRange.create(head, anchor, flags | 32, goalColumn) : SelectionRange.create(anchor, head, flags, goalColumn);
        }
        /**
        Create an [undirectional](https://codemirror.net/6/docs/ref/#state.SelectionRange.undirectional)
        selection range.
        */
        static undirectionalRange(from, to) {
          return SelectionRange.create(from, to, 64, void 0);
        }
        /**
        @internal
        */
        static normalized(ranges, mainIndex = 0) {
          let main = ranges[mainIndex];
          ranges.sort((a2, b) => a2.from - b.from);
          mainIndex = ranges.indexOf(main);
          for (let i2 = 1; i2 < ranges.length; i2++) {
            let range = ranges[i2], prev = ranges[i2 - 1];
            if (range.empty ? range.from <= prev.to : range.from < prev.to) {
              let from = prev.from, to = Math.max(range.to, prev.to);
              if (i2 <= mainIndex)
                mainIndex--;
              ranges.splice(--i2, 2, range.anchor > range.head ? _EditorSelection.range(to, from) : _EditorSelection.range(from, to));
            }
          }
          return new _EditorSelection(ranges, mainIndex);
        }
      };
      nextID = 0;
      Facet = class _Facet {
        constructor(combine, compareInput, compare2, isStatic, enables) {
          this.combine = combine;
          this.compareInput = compareInput;
          this.compare = compare2;
          this.isStatic = isStatic;
          this.id = nextID++;
          this.default = combine([]);
          this.extensions = typeof enables == "function" ? enables(this) : enables;
        }
        /**
        Returns a facet reader for this facet, which can be used to
        [read](https://codemirror.net/6/docs/ref/#state.EditorState.facet) it but not to define values for it.
        */
        get reader() {
          return this;
        }
        /**
        Define a new facet.
        */
        static define(config = {}) {
          return new _Facet(config.combine || ((a2) => a2), config.compareInput || ((a2, b) => a2 === b), config.compare || (!config.combine ? sameArray : (a2, b) => a2 === b), !!config.static, config.enables);
        }
        /**
        Returns an extension that adds the given value to this facet.
        */
        of(value) {
          return new FacetProvider([], this, 0, value);
        }
        /**
        Create an extension that computes a value for the facet from a
        state. You must take care to declare the parts of the state that
        this value depends on, since your function is only called again
        for a new state when one of those parts changed.
        
        In cases where your value depends only on a single field, you'll
        want to use the [`from`](https://codemirror.net/6/docs/ref/#state.Facet.from) method instead.
        */
        compute(deps, get) {
          if (this.isStatic)
            throw new Error("Can't compute a static facet");
          return new FacetProvider(deps, this, 1, get);
        }
        /**
        Create an extension that computes zero or more values for this
        facet from a state.
        */
        computeN(deps, get) {
          if (this.isStatic)
            throw new Error("Can't compute a static facet");
          return new FacetProvider(deps, this, 2, get);
        }
        from(field, get) {
          if (!get)
            get = (x) => x;
          return this.compute([field], (state) => get(state.field(field)));
        }
      };
      FacetProvider = class {
        constructor(dependencies, facet, type, value) {
          this.dependencies = dependencies;
          this.facet = facet;
          this.type = type;
          this.value = value;
          this.id = nextID++;
        }
        dynamicSlot(addresses) {
          var _a2;
          let getter = this.value;
          let compare2 = this.facet.compareInput;
          let id2 = this.id, idx = addresses[id2] >> 1, multi = this.type == 2;
          let depDoc = false, depSel = false, depAddrs = [];
          for (let dep of this.dependencies) {
            if (dep == "doc")
              depDoc = true;
            else if (dep == "selection")
              depSel = true;
            else if ((((_a2 = addresses[dep.id]) !== null && _a2 !== void 0 ? _a2 : 1) & 1) == 0)
              depAddrs.push(addresses[dep.id]);
          }
          return {
            create(state) {
              state.values[idx] = getter(state);
              return 1;
            },
            update(state, tr) {
              if (depDoc && tr.docChanged || depSel && (tr.docChanged || tr.selection) || ensureAll(state, depAddrs)) {
                let newVal = getter(state);
                if (multi ? !compareArray(newVal, state.values[idx], compare2) : !compare2(newVal, state.values[idx])) {
                  state.values[idx] = newVal;
                  return 1;
                }
              }
              return 0;
            },
            reconfigure: (state, oldState) => {
              let newVal, oldAddr = oldState.config.address[id2];
              if (oldAddr != null) {
                let oldVal = getAddr(oldState, oldAddr);
                if (this.dependencies.every((dep) => {
                  return dep instanceof Facet ? oldState.facet(dep) === state.facet(dep) : dep instanceof StateField ? oldState.field(dep, false) == state.field(dep, false) : true;
                }) || (multi ? compareArray(newVal = getter(state), oldVal, compare2) : compare2(newVal = getter(state), oldVal))) {
                  state.values[idx] = oldVal;
                  return 0;
                }
              } else {
                newVal = getter(state);
              }
              state.values[idx] = newVal;
              return 1;
            }
          };
        }
        get extension() {
          return this;
        }
      };
      initField = /* @__PURE__ */ Facet.define({ static: true });
      StateField = class _StateField {
        constructor(id2, createF, updateF, compareF, spec) {
          this.id = id2;
          this.createF = createF;
          this.updateF = updateF;
          this.compareF = compareF;
          this.spec = spec;
          this.provides = void 0;
        }
        /**
        Define a state field.
        */
        static define(config) {
          let field = new _StateField(nextID++, config.create, config.update, config.compare || ((a2, b) => a2 === b), config);
          if (config.provide)
            field.provides = config.provide(field);
          return field;
        }
        create(state) {
          let init = state.facet(initField).find((i2) => i2.field == this);
          return ((init === null || init === void 0 ? void 0 : init.create) || this.createF)(state);
        }
        /**
        @internal
        */
        slot(addresses) {
          let idx = addresses[this.id] >> 1;
          return {
            create: (state) => {
              state.values[idx] = this.create(state);
              return 1;
            },
            update: (state, tr) => {
              let oldVal = state.values[idx];
              let value = this.updateF(oldVal, tr);
              if (this.compareF(oldVal, value))
                return 0;
              state.values[idx] = value;
              return 1;
            },
            reconfigure: (state, oldState) => {
              let init = state.facet(initField), oldInit = oldState.facet(initField), reInit;
              if ((reInit = init.find((i2) => i2.field == this)) && reInit != oldInit.find((i2) => i2.field == this)) {
                state.values[idx] = reInit.create(state);
                return 1;
              }
              if (oldState.config.address[this.id] != null) {
                state.values[idx] = oldState.field(this);
                return 0;
              }
              state.values[idx] = this.create(state);
              return 1;
            }
          };
        }
        /**
        Returns an extension that enables this field and overrides the
        way it is initialized. Can be useful when you need to provide a
        non-default starting value for the field.
        */
        init(create) {
          return [this, initField.of({ field: this, create })];
        }
        /**
        State field instances can be used as
        [`Extension`](https://codemirror.net/6/docs/ref/#state.Extension) values to enable the field in a
        given state.
        */
        get extension() {
          return this;
        }
      };
      Prec_ = { lowest: 4, low: 3, default: 2, high: 1, highest: 0 };
      Prec = {
        /**
        The highest precedence level, for extensions that should end up
        near the start of the precedence ordering.
        */
        highest: /* @__PURE__ */ prec(Prec_.highest),
        /**
        A higher-than-default precedence, for extensions that should
        come before those with default precedence.
        */
        high: /* @__PURE__ */ prec(Prec_.high),
        /**
        The default precedence, which is also used for extensions
        without an explicit precedence.
        */
        default: /* @__PURE__ */ prec(Prec_.default),
        /**
        A lower-than-default precedence.
        */
        low: /* @__PURE__ */ prec(Prec_.low),
        /**
        The lowest precedence level. Meant for things that should end up
        near the end of the extension order.
        */
        lowest: /* @__PURE__ */ prec(Prec_.lowest)
      };
      PrecExtension = class {
        constructor(inner, prec2) {
          this.inner = inner;
          this.prec = prec2;
        }
        get extension() {
          return this;
        }
      };
      Compartment = class _Compartment {
        /**
        Create an instance of this compartment to add to your [state
        configuration](https://codemirror.net/6/docs/ref/#state.EditorStateConfig.extensions).
        */
        of(ext) {
          return new CompartmentInstance(this, ext);
        }
        /**
        Create an [effect](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) that
        reconfigures this compartment.
        */
        reconfigure(content2) {
          return _Compartment.reconfigure.of({ compartment: this, extension: content2 });
        }
        /**
        Get the current content of the compartment in the state, or
        `undefined` if it isn't present.
        */
        get(state) {
          return state.config.compartments.get(this);
        }
      };
      CompartmentInstance = class {
        constructor(compartment, inner) {
          this.compartment = compartment;
          this.inner = inner;
        }
        get extension() {
          return this;
        }
      };
      Configuration = class _Configuration {
        constructor(base2, compartments, dynamicSlots, address, staticValues, facets) {
          this.base = base2;
          this.compartments = compartments;
          this.dynamicSlots = dynamicSlots;
          this.address = address;
          this.staticValues = staticValues;
          this.facets = facets;
          this.statusTemplate = [];
          while (this.statusTemplate.length < dynamicSlots.length)
            this.statusTemplate.push(
              0
              /* SlotStatus.Unresolved */
            );
        }
        staticFacet(facet) {
          let addr = this.address[facet.id];
          return addr == null ? facet.default : this.staticValues[addr >> 1];
        }
        static resolve(base2, compartments, oldState) {
          let fields = [];
          let facets = /* @__PURE__ */ Object.create(null);
          let newCompartments = /* @__PURE__ */ new Map();
          for (let ext of flatten(base2, compartments, newCompartments)) {
            if (ext instanceof StateField)
              fields.push(ext);
            else
              (facets[ext.facet.id] || (facets[ext.facet.id] = [])).push(ext);
          }
          let address = /* @__PURE__ */ Object.create(null);
          let staticValues = [];
          let dynamicSlots = [];
          for (let field of fields) {
            address[field.id] = dynamicSlots.length << 1;
            dynamicSlots.push((a2) => field.slot(a2));
          }
          let oldFacets = oldState === null || oldState === void 0 ? void 0 : oldState.config.facets;
          for (let id2 in facets) {
            let providers = facets[id2], facet = providers[0].facet;
            let oldProviders = oldFacets && oldFacets[id2] || [];
            if (providers.every(
              (p) => p.type == 0
              /* Provider.Static */
            )) {
              address[facet.id] = staticValues.length << 1 | 1;
              if (sameArray(oldProviders, providers)) {
                staticValues.push(oldState.facet(facet));
              } else {
                let value = facet.combine(providers.map((p) => p.value));
                staticValues.push(oldState && facet.compare(value, oldState.facet(facet)) ? oldState.facet(facet) : value);
              }
            } else {
              for (let p of providers) {
                if (p.type == 0) {
                  address[p.id] = staticValues.length << 1 | 1;
                  staticValues.push(p.value);
                } else {
                  address[p.id] = dynamicSlots.length << 1;
                  dynamicSlots.push((a2) => p.dynamicSlot(a2));
                }
              }
              address[facet.id] = dynamicSlots.length << 1;
              dynamicSlots.push((a2) => dynamicFacetSlot(a2, facet, providers));
            }
          }
          let dynamic = dynamicSlots.map((f) => f(address));
          return new _Configuration(base2, newCompartments, dynamic, address, staticValues, facets);
        }
      };
      languageData = /* @__PURE__ */ Facet.define();
      allowMultipleSelections = /* @__PURE__ */ Facet.define({
        combine: (values) => values.some((v) => v),
        static: true
      });
      lineSeparator = /* @__PURE__ */ Facet.define({
        combine: (values) => values.length ? values[0] : void 0,
        static: true
      });
      changeFilter = /* @__PURE__ */ Facet.define();
      transactionFilter = /* @__PURE__ */ Facet.define();
      transactionExtender = /* @__PURE__ */ Facet.define();
      readOnly = /* @__PURE__ */ Facet.define({
        combine: (values) => values.length ? values[0] : false
      });
      Annotation = class {
        /**
        @internal
        */
        constructor(type, value) {
          this.type = type;
          this.value = value;
        }
        /**
        Define a new type of annotation.
        */
        static define() {
          return new AnnotationType();
        }
      };
      AnnotationType = class {
        /**
        Create an instance of this annotation.
        */
        of(value) {
          return new Annotation(this, value);
        }
      };
      StateEffectType = class {
        /**
        @internal
        */
        constructor(map) {
          this.map = map;
        }
        /**
        Create a [state effect](https://codemirror.net/6/docs/ref/#state.StateEffect) instance of this
        type.
        */
        of(value) {
          return new StateEffect(this, value);
        }
      };
      StateEffect = class _StateEffect {
        /**
        @internal
        */
        constructor(type, value) {
          this.type = type;
          this.value = value;
        }
        /**
        Map this effect through a position mapping. Will return
        `undefined` when that ends up deleting the effect.
        */
        map(mapping) {
          let mapped = this.type.map(this.value, mapping);
          return mapped === void 0 ? void 0 : mapped == this.value ? this : new _StateEffect(this.type, mapped);
        }
        /**
        Tells you whether this effect object is of a given
        [type](https://codemirror.net/6/docs/ref/#state.StateEffectType).
        */
        is(type) {
          return this.type == type;
        }
        /**
        Define a new effect type. The type parameter indicates the type
        of values that his effect holds. It should be a type that
        doesn't include `undefined`, since that is used in
        [mapping](https://codemirror.net/6/docs/ref/#state.StateEffect.map) to indicate that an effect is
        removed.
        */
        static define(spec = {}) {
          return new StateEffectType(spec.map || ((v) => v));
        }
        /**
        Map an array of effects through a change set.
        */
        static mapEffects(effects, mapping) {
          if (!effects.length)
            return effects;
          let result = [];
          for (let effect of effects) {
            let mapped = effect.map(mapping);
            if (mapped)
              result.push(mapped);
          }
          return result;
        }
      };
      StateEffect.reconfigure = /* @__PURE__ */ StateEffect.define();
      StateEffect.appendConfig = /* @__PURE__ */ StateEffect.define();
      Transaction = class _Transaction {
        constructor(startState, changes, selection, effects, annotations, scrollIntoView2) {
          this.startState = startState;
          this.changes = changes;
          this.selection = selection;
          this.effects = effects;
          this.annotations = annotations;
          this.scrollIntoView = scrollIntoView2;
          this._doc = null;
          this._state = null;
          if (selection)
            checkSelection(selection, changes.newLength);
          if (!annotations.some((a2) => a2.type == _Transaction.time))
            this.annotations = annotations.concat(_Transaction.time.of(Date.now()));
        }
        /**
        @internal
        */
        static create(startState, changes, selection, effects, annotations, scrollIntoView2) {
          return new _Transaction(startState, changes, selection, effects, annotations, scrollIntoView2);
        }
        /**
        The new document produced by the transaction. Contrary to
        [`.state`](https://codemirror.net/6/docs/ref/#state.Transaction.state)`.doc`, accessing this won't
        force the entire new state to be computed right away, so it is
        recommended that [transaction
        filters](https://codemirror.net/6/docs/ref/#state.EditorState^transactionFilter) use this getter
        when they need to look at the new document.
        */
        get newDoc() {
          return this._doc || (this._doc = this.changes.apply(this.startState.doc));
        }
        /**
        The new selection produced by the transaction. If
        [`this.selection`](https://codemirror.net/6/docs/ref/#state.Transaction.selection) is undefined,
        this will [map](https://codemirror.net/6/docs/ref/#state.EditorSelection.map) the start state's
        current selection through the changes made by the transaction.
        */
        get newSelection() {
          return this.selection || this.startState.selection.map(this.changes);
        }
        /**
        The new state created by the transaction. Computed on demand
        (but retained for subsequent access), so it is recommended not to
        access it in [transaction
        filters](https://codemirror.net/6/docs/ref/#state.EditorState^transactionFilter) when possible.
        */
        get state() {
          if (!this._state)
            this.startState.applyTransaction(this);
          return this._state;
        }
        /**
        Get the value of the given annotation type, if any.
        */
        annotation(type) {
          for (let ann of this.annotations)
            if (ann.type == type)
              return ann.value;
          return void 0;
        }
        /**
        Indicates whether the transaction changed the document.
        */
        get docChanged() {
          return !this.changes.empty;
        }
        /**
        Indicates whether this transaction reconfigures the state
        (through a [configuration compartment](https://codemirror.net/6/docs/ref/#state.Compartment) or
        with a top-level configuration
        [effect](https://codemirror.net/6/docs/ref/#state.StateEffect^reconfigure).
        */
        get reconfigured() {
          return this.startState.config != this.state.config;
        }
        /**
        Returns true if the transaction has a [user
        event](https://codemirror.net/6/docs/ref/#state.Transaction^userEvent) annotation that is equal to
        or more specific than `event`. For example, if the transaction
        has `"select.pointer"` as user event, `"select"` and
        `"select.pointer"` will match it.
        */
        isUserEvent(event) {
          let e = this.annotation(_Transaction.userEvent);
          return !!(e && (e == event || e.length > event.length && e.slice(0, event.length) == event && e[event.length] == "."));
        }
      };
      Transaction.time = /* @__PURE__ */ Annotation.define();
      Transaction.userEvent = /* @__PURE__ */ Annotation.define();
      Transaction.addToHistory = /* @__PURE__ */ Annotation.define();
      Transaction.remote = /* @__PURE__ */ Annotation.define();
      none = [];
      CharCategory = /* @__PURE__ */ (function(CharCategory2) {
        CharCategory2[CharCategory2["Word"] = 0] = "Word";
        CharCategory2[CharCategory2["Space"] = 1] = "Space";
        CharCategory2[CharCategory2["Other"] = 2] = "Other";
        return CharCategory2;
      })(CharCategory || (CharCategory = {}));
      nonASCIISingleCaseWordChar = /[\u00df\u0587\u0590-\u05f4\u0600-\u06ff\u3040-\u309f\u30a0-\u30ff\u3400-\u4db5\u4e00-\u9fcc\uac00-\ud7af]/;
      try {
        wordChar = /* @__PURE__ */ new RegExp("[\\p{Alphabetic}\\p{Number}_]", "u");
      } catch (_) {
      }
      EditorState = class _EditorState {
        constructor(config, doc2, selection, values, computeSlot, tr) {
          this.config = config;
          this.doc = doc2;
          this.selection = selection;
          this.values = values;
          this.status = config.statusTemplate.slice();
          this.computeSlot = computeSlot;
          if (tr)
            tr._state = this;
          for (let i2 = 0; i2 < this.config.dynamicSlots.length; i2++)
            ensureAddr(this, i2 << 1);
          this.computeSlot = null;
        }
        field(field, require2 = true) {
          let addr = this.config.address[field.id];
          if (addr == null) {
            if (require2)
              throw new RangeError("Field is not present in this state");
            return void 0;
          }
          ensureAddr(this, addr);
          return getAddr(this, addr);
        }
        /**
        Create a [transaction](https://codemirror.net/6/docs/ref/#state.Transaction) that updates this
        state. Any number of [transaction specs](https://codemirror.net/6/docs/ref/#state.TransactionSpec)
        can be passed. Unless
        [`sequential`](https://codemirror.net/6/docs/ref/#state.TransactionSpec.sequential) is set, the
        [changes](https://codemirror.net/6/docs/ref/#state.TransactionSpec.changes) (if any) of each spec
        are assumed to start in the _current_ document (not the document
        produced by previous specs), and its
        [selection](https://codemirror.net/6/docs/ref/#state.TransactionSpec.selection) and
        [effects](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) are assumed to refer
        to the document created by its _own_ changes. The resulting
        transaction contains the combined effect of all the different
        specs. For [selection](https://codemirror.net/6/docs/ref/#state.TransactionSpec.selection), later
        specs take precedence over earlier ones.
        */
        update(...specs) {
          return resolveTransaction(this, specs, true);
        }
        /**
        @internal
        */
        applyTransaction(tr) {
          let conf = this.config, { base: base2, compartments } = conf;
          for (let effect of tr.effects) {
            if (effect.is(Compartment.reconfigure)) {
              if (conf) {
                compartments = /* @__PURE__ */ new Map();
                conf.compartments.forEach((val, key) => compartments.set(key, val));
                conf = null;
              }
              compartments.set(effect.value.compartment, effect.value.extension);
            } else if (effect.is(StateEffect.reconfigure)) {
              conf = null;
              base2 = effect.value;
            } else if (effect.is(StateEffect.appendConfig)) {
              conf = null;
              base2 = asArray(base2).concat(effect.value);
            }
          }
          let startValues;
          if (!conf) {
            conf = Configuration.resolve(base2, compartments, this);
            let intermediateState = new _EditorState(conf, this.doc, this.selection, conf.dynamicSlots.map(() => null), (state, slot) => slot.reconfigure(state, this), null);
            startValues = intermediateState.values;
          } else {
            startValues = tr.startState.values.slice();
          }
          let selection = tr.startState.facet(allowMultipleSelections) ? tr.newSelection : tr.newSelection.asSingle();
          new _EditorState(conf, tr.newDoc, selection, startValues, (state, slot) => slot.update(state, tr), tr);
        }
        /**
        Create a [transaction spec](https://codemirror.net/6/docs/ref/#state.TransactionSpec) that
        replaces every selection range with the given content.
        */
        replaceSelection(text) {
          if (typeof text == "string")
            text = this.toText(text);
          return this.changeByRange((range) => ({
            changes: { from: range.from, to: range.to, insert: text },
            range: EditorSelection.cursor(range.from + text.length, -1)
          }));
        }
        /**
        Create a set of changes and a new selection by running the given
        function for each range in the active selection. The function
        can return an optional set of changes (in the coordinate space
        of the start document), plus an updated range (in the coordinate
        space of the document produced by the call's own changes). This
        method will merge all the changes and ranges into a single
        changeset and selection, and return it as a [transaction
        spec](https://codemirror.net/6/docs/ref/#state.TransactionSpec), which can be passed to
        [`update`](https://codemirror.net/6/docs/ref/#state.EditorState.update).
        */
        changeByRange(f) {
          let sel = this.selection;
          let result1 = f(sel.ranges[0]);
          let changes = this.changes(result1.changes), ranges = [result1.range];
          let effects = asArray(result1.effects);
          for (let i2 = 1; i2 < sel.ranges.length; i2++) {
            let result = f(sel.ranges[i2]);
            let newChanges = this.changes(result.changes), newMapped = newChanges.map(changes);
            for (let j = 0; j < i2; j++)
              ranges[j] = ranges[j].map(newMapped);
            let mapBy = changes.mapDesc(newChanges, true);
            ranges.push(result.range.map(mapBy));
            changes = changes.compose(newMapped);
            effects = StateEffect.mapEffects(effects, newMapped).concat(StateEffect.mapEffects(asArray(result.effects), mapBy));
          }
          return {
            changes,
            selection: EditorSelection.create(ranges, sel.mainIndex),
            effects
          };
        }
        /**
        Create a [change set](https://codemirror.net/6/docs/ref/#state.ChangeSet) from the given change
        description, taking the state's document length and line
        separator into account.
        */
        changes(spec = []) {
          if (spec instanceof ChangeSet)
            return spec;
          return ChangeSet.of(spec, this.doc.length, this.facet(_EditorState.lineSeparator));
        }
        /**
        Using the state's [line
        separator](https://codemirror.net/6/docs/ref/#state.EditorState^lineSeparator), create a
        [`Text`](https://codemirror.net/6/docs/ref/#state.Text) instance from the given string.
        */
        toText(string2) {
          return Text.of(string2.split(this.facet(_EditorState.lineSeparator) || DefaultSplit));
        }
        /**
        Return the given range of the document as a string.
        */
        sliceDoc(from = 0, to = this.doc.length) {
          return this.doc.sliceString(from, to, this.lineBreak);
        }
        /**
        Get the value of a state [facet](https://codemirror.net/6/docs/ref/#state.Facet).
        */
        facet(facet) {
          let addr = this.config.address[facet.id];
          if (addr == null)
            return facet.default;
          ensureAddr(this, addr);
          return getAddr(this, addr);
        }
        /**
        Convert this state to a JSON-serializable object. When custom
        fields should be serialized, you can pass them in as an object
        mapping property names (in the resulting object, which should
        not use `doc` or `selection`) to fields.
        */
        toJSON(fields) {
          let result = {
            doc: this.sliceDoc(),
            selection: this.selection.toJSON()
          };
          if (fields)
            for (let prop in fields) {
              let value = fields[prop];
              if (value instanceof StateField && this.config.address[value.id] != null)
                result[prop] = value.spec.toJSON(this.field(fields[prop]), this);
            }
          return result;
        }
        /**
        Deserialize a state from its JSON representation. When custom
        fields should be deserialized, pass the same object you passed
        to [`toJSON`](https://codemirror.net/6/docs/ref/#state.EditorState.toJSON) when serializing as
        third argument.
        */
        static fromJSON(json, config = {}, fields) {
          if (!json || typeof json.doc != "string")
            throw new RangeError("Invalid JSON representation for EditorState");
          let fieldInit = [];
          if (fields)
            for (let prop in fields) {
              if (Object.prototype.hasOwnProperty.call(json, prop)) {
                let field = fields[prop], value = json[prop];
                fieldInit.push(field.init((state) => field.spec.fromJSON(value, state)));
              }
            }
          return _EditorState.create({
            doc: json.doc,
            selection: EditorSelection.fromJSON(json.selection),
            extensions: config.extensions ? fieldInit.concat([config.extensions]) : fieldInit
          });
        }
        /**
        Create a new state. You'll usually only need this when
        initializing an editor—updated states are created by applying
        transactions.
        */
        static create(config = {}) {
          let configuration = Configuration.resolve(config.extensions || [], /* @__PURE__ */ new Map());
          let doc2 = config.doc instanceof Text ? config.doc : Text.of((config.doc || "").split(configuration.staticFacet(_EditorState.lineSeparator) || DefaultSplit));
          let selection = !config.selection ? EditorSelection.single(0) : config.selection instanceof EditorSelection ? config.selection : EditorSelection.single(config.selection.anchor, config.selection.head);
          checkSelection(selection, doc2.length);
          if (!configuration.staticFacet(allowMultipleSelections))
            selection = selection.asSingle();
          return new _EditorState(configuration, doc2, selection, configuration.dynamicSlots.map(() => null), (state, slot) => slot.create(state), null);
        }
        /**
        The size (in columns) of a tab in the document, determined by
        the [`tabSize`](https://codemirror.net/6/docs/ref/#state.EditorState^tabSize) facet.
        */
        get tabSize() {
          return this.facet(_EditorState.tabSize);
        }
        /**
        Get the proper [line-break](https://codemirror.net/6/docs/ref/#state.EditorState^lineSeparator)
        string for this state.
        */
        get lineBreak() {
          return this.facet(_EditorState.lineSeparator) || "\n";
        }
        /**
        Returns true when the editor is
        [configured](https://codemirror.net/6/docs/ref/#state.EditorState^readOnly) to be read-only.
        */
        get readOnly() {
          return this.facet(readOnly);
        }
        /**
        Look up a translation for the given phrase (via the
        [`phrases`](https://codemirror.net/6/docs/ref/#state.EditorState^phrases) facet), or return the
        original string if no translation is found.
        
        If additional arguments are passed, they will be inserted in
        place of markers like `$1` (for the first value) and `$2`, etc.
        A single `$` is equivalent to `$1`, and `$$` will produce a
        literal dollar sign.
        */
        phrase(phrase, ...insert2) {
          for (let map of this.facet(_EditorState.phrases))
            if (Object.prototype.hasOwnProperty.call(map, phrase)) {
              phrase = map[phrase];
              break;
            }
          if (insert2.length)
            phrase = phrase.replace(/\$(\$|\d*)/g, (m, i2) => {
              if (i2 == "$")
                return "$";
              let n = +(i2 || 1);
              return !n || n > insert2.length ? m : insert2[n - 1];
            });
          return phrase;
        }
        /**
        Find the values for a given language data field, provided by the
        the [`languageData`](https://codemirror.net/6/docs/ref/#state.EditorState^languageData) facet.
        
        Examples of language data fields are...
        
        - [`"commentTokens"`](https://codemirror.net/6/docs/ref/#commands.CommentTokens) for specifying
          comment syntax.
        - [`"autocomplete"`](https://codemirror.net/6/docs/ref/#autocomplete.autocompletion^config.override)
          for providing language-specific completion sources.
        - [`"wordChars"`](https://codemirror.net/6/docs/ref/#state.EditorState.charCategorizer) for adding
          characters that should be considered part of words in this
          language.
        - [`"closeBrackets"`](https://codemirror.net/6/docs/ref/#autocomplete.CloseBracketConfig) controls
          bracket closing behavior.
        */
        languageDataAt(name2, pos, side = -1) {
          let values = [];
          for (let provider of this.facet(languageData)) {
            for (let result of provider(this, pos, side)) {
              if (Object.prototype.hasOwnProperty.call(result, name2))
                values.push(result[name2]);
            }
          }
          return values;
        }
        /**
        Return a function that can categorize strings (expected to
        represent a single [grapheme cluster](https://codemirror.net/6/docs/ref/#state.findClusterBreak))
        into one of:
        
         - Word (contains an alphanumeric character or a character
           explicitly listed in the local language's `"wordChars"`
           language data, which should be a string)
         - Space (contains only whitespace)
         - Other (anything else)
        */
        charCategorizer(at) {
          let chars = this.languageDataAt("wordChars", at);
          return makeCategorizer(chars.length ? chars[0] : "");
        }
        /**
        Find the word at the given position, meaning the range
        containing all [word](https://codemirror.net/6/docs/ref/#state.CharCategory.Word) characters
        around it. If no word characters are adjacent to the position,
        this returns null.
        */
        wordAt(pos) {
          let { text, from, length } = this.doc.lineAt(pos);
          let cat = this.charCategorizer(pos);
          let start = pos - from, end = pos - from;
          while (start > 0) {
            let prev = findClusterBreak2(text, start, false);
            if (cat(text.slice(prev, start)) != CharCategory.Word)
              break;
            start = prev;
          }
          while (end < length) {
            let next = findClusterBreak2(text, end);
            if (cat(text.slice(end, next)) != CharCategory.Word)
              break;
            end = next;
          }
          return start == end ? null : EditorSelection.range(start + from, end + from);
        }
      };
      EditorState.allowMultipleSelections = allowMultipleSelections;
      EditorState.tabSize = /* @__PURE__ */ Facet.define({
        combine: (values) => values.length ? values[0] : 4
      });
      EditorState.lineSeparator = lineSeparator;
      EditorState.readOnly = readOnly;
      EditorState.phrases = /* @__PURE__ */ Facet.define({
        compare(a2, b) {
          let kA = Object.keys(a2), kB = Object.keys(b);
          return kA.length == kB.length && kA.every((k) => a2[k] == b[k]);
        }
      });
      EditorState.languageData = languageData;
      EditorState.changeFilter = changeFilter;
      EditorState.transactionFilter = transactionFilter;
      EditorState.transactionExtender = transactionExtender;
      Compartment.reconfigure = /* @__PURE__ */ StateEffect.define();
      RangeValue = class {
        /**
        Compare this value with another value. Used when comparing
        rangesets. The default implementation compares by identity.
        Unless you are only creating a fixed number of unique instances
        of your value type, it is a good idea to implement this
        properly.
        */
        eq(other) {
          return this == other;
        }
        /**
        Create a [range](https://codemirror.net/6/docs/ref/#state.Range) with this value.
        */
        range(from, to = from) {
          return Range.create(from, to, this);
        }
      };
      RangeValue.prototype.startSide = RangeValue.prototype.endSide = 0;
      RangeValue.prototype.point = false;
      RangeValue.prototype.mapMode = MapMode.TrackDel;
      Range = class _Range {
        constructor(from, to, value) {
          this.from = from;
          this.to = to;
          this.value = value;
        }
        /**
        @internal
        */
        static create(from, to, value) {
          return new _Range(from, to, value);
        }
      };
      Chunk = class _Chunk {
        constructor(from, to, value, maxPoint) {
          this.from = from;
          this.to = to;
          this.value = value;
          this.maxPoint = maxPoint;
        }
        get length() {
          return last(this.to);
        }
        // Find the index of the given position and side. Use the ranges'
        // `from` pos when `end == false`, `to` when `end == true`.
        findIndex(pos, side, end, startAt = 0) {
          let arr = end ? this.to : this.from;
          for (let lo = startAt, hi = arr.length; ; ) {
            if (lo == hi)
              return lo;
            let mid = lo + hi >> 1;
            let diff = arr[mid] - pos || (end ? this.value[mid].endSide : this.value[mid].startSide) - side;
            if (mid == lo)
              return diff >= 0 ? lo : hi;
            if (diff >= 0)
              hi = mid;
            else
              lo = mid + 1;
          }
        }
        between(offset, from, to, f) {
          for (let i2 = this.findIndex(from, -1e9, true), e = this.findIndex(to, 1e9, false, i2); i2 < e; i2++)
            if (f(this.from[i2] + offset, this.to[i2] + offset, this.value[i2]) === false)
              return false;
        }
        map(offset, changes, basePos, baseSide, spill) {
          let value = [], from = [], to = [], newPos = -1, maxPoint = -1;
          iter: for (let i2 = 0; i2 < this.value.length; i2++) {
            let val = this.value[i2], curFrom = this.from[i2] + offset, curTo = this.to[i2] + offset, newFrom, newTo;
            if (curFrom == curTo) {
              let mapped = changes.mapPos(curFrom, val.startSide, val.mapMode);
              if (mapped == null)
                continue;
              newFrom = newTo = mapped;
              if (val.startSide != val.endSide) {
                newTo = changes.mapPos(curFrom, val.endSide);
                if (newTo < newFrom)
                  continue;
              }
            } else {
              newFrom = changes.mapPos(curFrom, val.startSide);
              newTo = changes.mapPos(curTo, val.endSide);
              if (newFrom > newTo || newFrom == newTo && val.startSide > 0 && val.endSide <= 0)
                continue;
            }
            if ((newTo - newFrom || val.endSide - val.startSide) < 0)
              continue;
            if (newPos < 0)
              newPos = newFrom;
            if (val.point)
              maxPoint = Math.max(maxPoint, newTo - newFrom);
            if ((newFrom - basePos || val.startSide - baseSide) >= 0) {
              value.push(val);
              from.push(newFrom - newPos);
              to.push(newTo - newPos);
              basePos = newTo;
              baseSide = val.endSide;
            } else {
              if (newFrom == newTo) {
                for (let i3 = value.length; i3 > 0; i3--) {
                  if ((newFrom - (to[i3 - 1] + newPos) || val.startSide - value[i3 - 1].endSide) >= 0) {
                    value.splice(i3, 0, val);
                    from.splice(i3, 0, newFrom - newPos);
                    to.splice(i3, 0, newTo - newPos);
                    continue iter;
                  }
                  if ((newFrom - (from[i3 - 1] + newPos) || val.endSide - value[i3 - 1].startSide) > 0)
                    break;
                }
              }
              spill(newFrom, newTo, val);
            }
          }
          return { mapped: value.length ? new _Chunk(from, to, value, maxPoint) : null, pos: newPos };
        }
      };
      RangeSet = class _RangeSet {
        constructor(chunkPos, chunk, nextLayer, maxPoint) {
          this.chunkPos = chunkPos;
          this.chunk = chunk;
          this.nextLayer = nextLayer;
          this.maxPoint = maxPoint;
        }
        /**
        @internal
        */
        static create(chunkPos, chunk, nextLayer, maxPoint) {
          return new _RangeSet(chunkPos, chunk, nextLayer, maxPoint);
        }
        /**
        @internal
        */
        get length() {
          let last2 = this.chunk.length - 1;
          return last2 < 0 ? 0 : Math.max(this.chunkEnd(last2), this.nextLayer.length);
        }
        /**
        The number of ranges in the set.
        */
        get size() {
          if (this.isEmpty)
            return 0;
          let size = this.nextLayer.size;
          for (let chunk of this.chunk)
            size += chunk.value.length;
          return size;
        }
        /**
        @internal
        */
        chunkEnd(index) {
          return this.chunkPos[index] + this.chunk[index].length;
        }
        /**
        Update the range set, optionally adding new ranges or filtering
        out existing ones.
        
        (Note: The type parameter is just there as a kludge to work
        around TypeScript variance issues that prevented `RangeSet<X>`
        from being a subtype of `RangeSet<Y>` when `X` is a subtype of
        `Y`.)
        */
        update(updateSpec) {
          let { add = [], sort = false, filterFrom = 0, filterTo = this.length } = updateSpec;
          let filter = updateSpec.filter;
          if (add.length == 0 && !filter)
            return this;
          if (sort)
            add = add.slice().sort(cmpRange);
          if (this.isEmpty)
            return add.length ? _RangeSet.of(add) : this;
          let cur = new LayerCursor(this, null, -1).goto(0), i2 = 0, spill = [];
          let builder = new RangeSetBuilder();
          while (cur.value || i2 < add.length) {
            if (i2 < add.length && (cur.from - add[i2].from || cur.startSide - add[i2].value.startSide) >= 0) {
              let range = add[i2++];
              if (!builder.addInner(range.from, range.to, range.value, false))
                spill.push(range);
            } else if (cur.rangeIndex == 1 && cur.chunkIndex < this.chunk.length && (i2 == add.length || this.chunkEnd(cur.chunkIndex) < add[i2].from) && (!filter || filterFrom > this.chunkEnd(cur.chunkIndex) || filterTo < this.chunkPos[cur.chunkIndex]) && builder.addChunk(this.chunkPos[cur.chunkIndex], this.chunk[cur.chunkIndex])) {
              cur.nextChunk();
            } else {
              if (!filter || filterFrom > cur.to || filterTo < cur.from || filter(cur.from, cur.to, cur.value)) {
                if (!builder.addInner(cur.from, cur.to, cur.value, false))
                  spill.push(Range.create(cur.from, cur.to, cur.value));
              }
              cur.next();
            }
          }
          return builder.finishInner(this.nextLayer.isEmpty && !spill.length ? _RangeSet.empty : this.nextLayer.update({ add: spill, filter, filterFrom, filterTo }));
        }
        /**
        Map this range set through a set of changes, return the new set.
        */
        map(changes) {
          if (changes.empty || this.isEmpty)
            return this;
          let chunks = [], chunkPos = [], maxPoint = -1;
          let spilled;
          let spill = (from, to, value) => {
            if (!spilled)
              spilled = new RangeSetBuilder();
            spilled.addRange(from, to, value, false);
          };
          for (let i2 = 0; i2 < this.chunk.length; i2++) {
            let start = this.chunkPos[i2], chunk = this.chunk[i2];
            let touch = changes.touchesRange(start, start + chunk.length);
            if (touch === false) {
              maxPoint = Math.max(maxPoint, chunk.maxPoint);
              chunks.push(chunk);
              chunkPos.push(changes.mapPos(start));
            } else if (touch === true) {
              let [prevPos, prevSide] = !chunks.length ? [-1, -1] : [last(chunkPos) + last(chunks).length, last(last(chunks).value).endSide];
              let { mapped, pos } = chunk.map(start, changes, prevPos, prevSide, spill);
              if (mapped) {
                maxPoint = Math.max(maxPoint, mapped.maxPoint);
                chunks.push(mapped);
                chunkPos.push(pos);
              }
            }
          }
          let next = this.nextLayer.map(changes);
          if (spilled)
            next = spilled.finishInner(next);
          return chunks.length == 0 ? next : new _RangeSet(chunkPos, chunks, next || _RangeSet.empty, maxPoint);
        }
        /**
        Iterate over the ranges that touch the region `from` to `to`,
        calling `f` for each. There is no guarantee that the ranges will
        be reported in any specific order. When the callback returns
        `false`, iteration stops.
        */
        between(from, to, f) {
          if (this.isEmpty)
            return;
          for (let i2 = 0; i2 < this.chunk.length; i2++) {
            let start = this.chunkPos[i2], chunk = this.chunk[i2];
            if (to >= start && from <= start + chunk.length && chunk.between(start, from - start, to - start, f) === false)
              return;
          }
          this.nextLayer.between(from, to, f);
        }
        /**
        Iterate over the ranges in this set, in order, including all
        ranges that end at or after `from`.
        */
        iter(from = 0) {
          return HeapCursor.from([this]).goto(from);
        }
        /**
        @internal
        */
        get isEmpty() {
          return this.nextLayer == this;
        }
        /**
        Iterate over the ranges in a collection of sets, in order,
        starting from `from`.
        */
        static iter(sets, from = 0) {
          return HeapCursor.from(sets).goto(from);
        }
        /**
        Iterate over two groups of sets, calling methods on `comparator`
        to notify it of possible differences.
        */
        static compare(oldSets, newSets, textDiff, comparator, minPointSize = -1) {
          let a2 = oldSets.filter((set) => set.maxPoint > 0 || !set.isEmpty && set.maxPoint >= minPointSize);
          let b = newSets.filter((set) => set.maxPoint > 0 || !set.isEmpty && set.maxPoint >= minPointSize);
          let sharedChunks = findSharedChunks(a2, b, textDiff);
          let sideA = new SpanCursor(a2, sharedChunks, minPointSize);
          let sideB = new SpanCursor(b, sharedChunks, minPointSize);
          textDiff.iterGaps((fromA, fromB, length) => compare(sideA, fromA, sideB, fromB, length, comparator));
          if (textDiff.empty && textDiff.length == 0)
            compare(sideA, 0, sideB, 0, 0, comparator);
        }
        /**
        Compare the contents of two groups of range sets, returning true
        if they are equivalent in the given range.
        */
        static eq(oldSets, newSets, from = 0, to) {
          if (to == null)
            to = 1e9 - 1;
          let a2 = oldSets.filter((set) => !set.isEmpty && newSets.indexOf(set) < 0);
          let b = newSets.filter((set) => !set.isEmpty && oldSets.indexOf(set) < 0);
          if (a2.length != b.length)
            return false;
          if (!a2.length)
            return true;
          let sharedChunks = findSharedChunks(a2, b);
          let sideA = new SpanCursor(a2, sharedChunks, 0).goto(from), sideB = new SpanCursor(b, sharedChunks, 0).goto(from);
          for (; ; ) {
            if (sideA.to != sideB.to || !sameValues(sideA.active, sideB.active) || sideA.point && (!sideB.point || !cmpVal(sideA.point, sideB.point)))
              return false;
            if (sideA.to > to)
              return true;
            sideA.next();
            sideB.next();
          }
        }
        /**
        Iterate over a group of range sets at the same time, notifying
        the iterator about the ranges covering every given piece of
        content. Returns the open count (see
        [`SpanIterator.span`](https://codemirror.net/6/docs/ref/#state.SpanIterator.span)) at the end
        of the iteration.
        */
        static spans(sets, from, to, iterator, minPointSize = -1) {
          let cursor = new SpanCursor(sets, null, minPointSize).goto(from), pos = from;
          let openRanges = cursor.openStart;
          for (; ; ) {
            let curTo = Math.min(cursor.to, to);
            if (cursor.point) {
              let active = cursor.activeForPoint(cursor.to);
              let openCount = cursor.pointFrom < from ? active.length + 1 : cursor.point.startSide < 0 ? active.length : Math.min(active.length, openRanges);
              iterator.point(pos, curTo, cursor.point, active, openCount, cursor.pointRank);
              openRanges = Math.min(cursor.openEnd(curTo), active.length);
            } else if (curTo > pos) {
              iterator.span(pos, curTo, cursor.active, openRanges);
              openRanges = cursor.openEnd(curTo);
            }
            if (cursor.to > to)
              return openRanges + (cursor.point && cursor.to > to ? 1 : 0);
            pos = cursor.to;
            cursor.next();
          }
        }
        /**
        Create a range set for the given range or array of ranges. By
        default, this expects the ranges to be _sorted_ (by start
        position and, if two start at the same position,
        `value.startSide`). You can pass `true` as second argument to
        cause the method to sort them.
        */
        static of(ranges, sort = false) {
          let build = new RangeSetBuilder();
          for (let range of ranges instanceof Range ? [ranges] : sort ? lazySort(ranges) : ranges)
            build.add(range.from, range.to, range.value);
          return build.finish();
        }
        /**
        Join an array of range sets into a single set.
        */
        static join(sets) {
          if (!sets.length)
            return _RangeSet.empty;
          let result = last(sets);
          for (let i2 = sets.length - 2; i2 >= 0; i2--) {
            for (let layer2 = sets[i2]; layer2 != _RangeSet.empty; layer2 = layer2.nextLayer)
              result = new _RangeSet(layer2.chunkPos, layer2.chunk, result, Math.max(layer2.maxPoint, result.maxPoint));
          }
          return result;
        }
      };
      RangeSet.empty = /* @__PURE__ */ new RangeSet([], [], null, -1);
      RangeSet.empty.nextLayer = RangeSet.empty;
      RangeSetBuilder = class _RangeSetBuilder {
        finishChunk(newArrays) {
          this.chunks.push(new Chunk(this.from, this.to, this.value, this.maxPoint));
          this.chunkPos.push(this.chunkStart);
          this.chunkStart = -1;
          this.setMaxPoint = Math.max(this.setMaxPoint, this.maxPoint);
          this.maxPoint = -1;
          if (newArrays) {
            this.from = [];
            this.to = [];
            this.value = [];
          }
        }
        /**
        Create an empty builder.
        */
        constructor() {
          this.chunks = [];
          this.chunkPos = [];
          this.chunkStart = -1;
          this.last = null;
          this.lastFrom = -1e9;
          this.lastTo = -1e9;
          this.from = [];
          this.to = [];
          this.value = [];
          this.maxPoint = -1;
          this.setMaxPoint = -1;
          this.nextLayer = null;
        }
        /**
        Add a range. Ranges should be added in sorted (by `from` and
        `value.startSide`) order.
        */
        add(from, to, value) {
          this.addRange(from, to, value, true);
        }
        /**
        @internal
        */
        addRange(from, to, value, strict) {
          if (!this.addInner(from, to, value, strict))
            (this.nextLayer || (this.nextLayer = new _RangeSetBuilder())).addRange(from, to, value, strict);
        }
        /**
        @internal
        */
        addInner(from, to, value, strict) {
          let diff = from - this.lastTo || value.startSide - this.last.endSide;
          if (strict && diff <= 0 && (from - this.lastFrom || value.startSide - this.last.startSide) < 0)
            throw new Error("Ranges must be added sorted by `from` position and `startSide`");
          if (diff < 0)
            return false;
          if (this.from.length == 250)
            this.finishChunk(true);
          if (this.chunkStart < 0)
            this.chunkStart = from;
          this.from.push(from - this.chunkStart);
          this.to.push(to - this.chunkStart);
          this.last = value;
          this.lastFrom = from;
          this.lastTo = to;
          this.value.push(value);
          if (value.point)
            this.maxPoint = Math.max(this.maxPoint, to - from);
          return true;
        }
        /**
        @internal
        */
        addChunk(from, chunk) {
          if ((from - this.lastTo || chunk.value[0].startSide - this.last.endSide) < 0)
            return false;
          if (this.from.length)
            this.finishChunk(true);
          this.setMaxPoint = Math.max(this.setMaxPoint, chunk.maxPoint);
          this.chunks.push(chunk);
          this.chunkPos.push(from);
          let last2 = chunk.value.length - 1;
          this.last = chunk.value[last2];
          this.lastFrom = chunk.from[last2] + from;
          this.lastTo = chunk.to[last2] + from;
          return true;
        }
        /**
        Finish the range set. Returns the new set. The builder can't be
        used anymore after this has been called.
        */
        finish() {
          return this.finishInner(RangeSet.empty);
        }
        /**
        @internal
        */
        finishInner(next) {
          if (this.from.length)
            this.finishChunk(false);
          if (this.chunks.length == 0)
            return next;
          let result = RangeSet.create(this.chunkPos, this.chunks, this.nextLayer ? this.nextLayer.finishInner(next) : next, this.setMaxPoint);
          this.from = null;
          return result;
        }
      };
      LayerCursor = class {
        constructor(layer2, skip, minPoint, rank = 0) {
          this.layer = layer2;
          this.skip = skip;
          this.minPoint = minPoint;
          this.rank = rank;
        }
        get startSide() {
          return this.value ? this.value.startSide : 0;
        }
        get endSide() {
          return this.value ? this.value.endSide : 0;
        }
        goto(pos, side = -1e9) {
          this.chunkIndex = this.rangeIndex = 0;
          this.gotoInner(pos, side, false);
          return this;
        }
        gotoInner(pos, side, forward) {
          while (this.chunkIndex < this.layer.chunk.length) {
            let next = this.layer.chunk[this.chunkIndex];
            if (!(this.skip && this.skip.has(next) || this.layer.chunkEnd(this.chunkIndex) < pos || next.maxPoint < this.minPoint))
              break;
            this.chunkIndex++;
            forward = false;
          }
          if (this.chunkIndex < this.layer.chunk.length) {
            let rangeIndex = this.layer.chunk[this.chunkIndex].findIndex(pos - this.layer.chunkPos[this.chunkIndex], side, true);
            if (!forward || this.rangeIndex < rangeIndex)
              this.setRangeIndex(rangeIndex);
          }
          this.next();
        }
        forward(pos, side) {
          if ((this.to - pos || this.endSide - side) < 0)
            this.gotoInner(pos, side, true);
        }
        next() {
          for (; ; ) {
            if (this.chunkIndex == this.layer.chunk.length) {
              this.from = this.to = 1e9;
              this.value = null;
              break;
            } else {
              let chunkPos = this.layer.chunkPos[this.chunkIndex], chunk = this.layer.chunk[this.chunkIndex];
              let from = chunkPos + chunk.from[this.rangeIndex];
              this.from = from;
              this.to = chunkPos + chunk.to[this.rangeIndex];
              this.value = chunk.value[this.rangeIndex];
              this.setRangeIndex(this.rangeIndex + 1);
              if (this.minPoint < 0 || this.value.point && this.to - this.from >= this.minPoint)
                break;
            }
          }
        }
        setRangeIndex(index) {
          if (index == this.layer.chunk[this.chunkIndex].value.length) {
            this.chunkIndex++;
            if (this.skip) {
              while (this.chunkIndex < this.layer.chunk.length && this.skip.has(this.layer.chunk[this.chunkIndex]))
                this.chunkIndex++;
            }
            this.rangeIndex = 0;
          } else {
            this.rangeIndex = index;
          }
        }
        nextChunk() {
          this.chunkIndex++;
          this.rangeIndex = 0;
          this.next();
        }
        compare(other) {
          return this.from - other.from || this.startSide - other.startSide || this.rank - other.rank || this.to - other.to || this.endSide - other.endSide;
        }
      };
      HeapCursor = class _HeapCursor {
        constructor(heap) {
          this.heap = heap;
        }
        static from(sets, skip = null, minPoint = -1) {
          let heap = [];
          for (let i2 = 0; i2 < sets.length; i2++) {
            for (let cur = sets[i2]; !cur.isEmpty; cur = cur.nextLayer) {
              if (cur.maxPoint >= minPoint)
                heap.push(new LayerCursor(cur, skip, minPoint, i2));
            }
          }
          return heap.length == 1 ? heap[0] : new _HeapCursor(heap);
        }
        get startSide() {
          return this.value ? this.value.startSide : 0;
        }
        goto(pos, side = -1e9) {
          for (let cur of this.heap)
            cur.goto(pos, side);
          for (let i2 = this.heap.length >> 1; i2 >= 0; i2--)
            heapBubble(this.heap, i2);
          this.next();
          return this;
        }
        forward(pos, side) {
          for (let cur of this.heap)
            cur.forward(pos, side);
          for (let i2 = this.heap.length >> 1; i2 >= 0; i2--)
            heapBubble(this.heap, i2);
          if ((this.to - pos || this.value.endSide - side) < 0)
            this.next();
        }
        next() {
          if (this.heap.length == 0) {
            this.from = this.to = 1e9;
            this.value = null;
            this.rank = -1;
          } else {
            let top2 = this.heap[0];
            this.from = top2.from;
            this.to = top2.to;
            this.value = top2.value;
            this.rank = top2.rank;
            if (top2.value)
              top2.next();
            heapBubble(this.heap, 0);
          }
        }
      };
      SpanCursor = class {
        constructor(sets, skip, minPoint) {
          this.minPoint = minPoint;
          this.active = [];
          this.activeTo = [];
          this.activeRank = [];
          this.minActive = -1;
          this.point = null;
          this.pointFrom = 0;
          this.pointRank = 0;
          this.to = -1e9;
          this.endSide = 0;
          this.openStart = -1;
          this.cursor = HeapCursor.from(sets, skip, minPoint);
        }
        goto(pos, side = -1e9) {
          this.cursor.goto(pos, side);
          this.active.length = this.activeTo.length = this.activeRank.length = 0;
          this.minActive = -1;
          this.to = pos;
          this.endSide = side;
          this.openStart = -1;
          this.next();
          return this;
        }
        forward(pos, side) {
          while (this.minActive > -1 && (this.activeTo[this.minActive] - pos || this.active[this.minActive].endSide - side) < 0)
            this.removeActive(this.minActive);
          this.cursor.forward(pos, side);
        }
        removeActive(index) {
          remove(this.active, index);
          remove(this.activeTo, index);
          remove(this.activeRank, index);
          this.minActive = findMinIndex(this.active, this.activeTo);
        }
        addActive(trackOpen) {
          let i2 = 0, { value, to, rank } = this.cursor;
          while (i2 < this.activeRank.length && (rank - this.activeRank[i2] || to - this.activeTo[i2]) > 0)
            i2++;
          insert(this.active, i2, value);
          insert(this.activeTo, i2, to);
          insert(this.activeRank, i2, rank);
          if (trackOpen)
            insert(trackOpen, i2, this.cursor.from);
          this.minActive = findMinIndex(this.active, this.activeTo);
        }
        // After calling this, if `this.point` != null, the next range is a
        // point. Otherwise, it's a regular range, covered by `this.active`.
        next() {
          let from = this.to, wasPoint = this.point;
          this.point = null;
          let trackOpen = this.openStart < 0 ? [] : null;
          for (; ; ) {
            let a2 = this.minActive;
            if (a2 > -1 && (this.activeTo[a2] - this.cursor.from || this.active[a2].endSide - this.cursor.startSide) < 0) {
              if (this.activeTo[a2] > from) {
                this.to = this.activeTo[a2];
                this.endSide = this.active[a2].endSide;
                break;
              }
              this.removeActive(a2);
              if (trackOpen)
                remove(trackOpen, a2);
            } else if (!this.cursor.value) {
              this.to = this.endSide = 1e9;
              break;
            } else if (this.cursor.from > from) {
              this.to = this.cursor.from;
              this.endSide = this.cursor.startSide;
              break;
            } else {
              let nextVal = this.cursor.value;
              if (!nextVal.point) {
                this.addActive(trackOpen);
                this.cursor.next();
              } else if (wasPoint && this.cursor.to == this.to && this.cursor.from < this.cursor.to) {
                this.cursor.next();
              } else {
                this.point = nextVal;
                this.pointFrom = this.cursor.from;
                this.pointRank = this.cursor.rank;
                this.to = this.cursor.to;
                this.endSide = nextVal.endSide;
                this.cursor.next();
                this.forward(this.to, this.endSide);
                break;
              }
            }
          }
          if (trackOpen) {
            this.openStart = 0;
            for (let i2 = trackOpen.length - 1; i2 >= 0 && trackOpen[i2] < from; i2--)
              this.openStart++;
          }
        }
        activeForPoint(to) {
          if (!this.active.length)
            return this.active;
          let active = [];
          for (let i2 = this.active.length - 1; i2 >= 0; i2--) {
            if (this.activeRank[i2] < this.pointRank)
              break;
            if (this.activeTo[i2] > to || this.activeTo[i2] == to && this.active[i2].endSide >= this.point.endSide)
              active.push(this.active[i2]);
          }
          return active.reverse();
        }
        openEnd(to) {
          let open = 0;
          for (let i2 = this.activeTo.length - 1; i2 >= 0 && this.activeTo[i2] > to; i2--)
            open++;
          return open;
        }
      };
    }
  });

  // node_modules/style-mod/src/style-mod.js
  var C, COUNT, SET, top, StyleModule, adoptedSet, StyleSet;
  var init_style_mod = __esm({
    "node_modules/style-mod/src/style-mod.js"() {
      C = "\u037C";
      COUNT = typeof Symbol == "undefined" ? "__" + C : Symbol.for(C);
      SET = typeof Symbol == "undefined" ? "__styleSet" + Math.floor(Math.random() * 1e8) : /* @__PURE__ */ Symbol("styleSet");
      top = typeof globalThis != "undefined" ? globalThis : typeof window != "undefined" ? window : {};
      StyleModule = class {
        // :: (Object<Style>, ?{finish: ?(string) → string})
        // Create a style module from the given spec.
        //
        // When `finish` is given, it is called on regular (non-`@`)
        // selectors (after `&` expansion) to compute the final selector.
        constructor(spec, options) {
          this.rules = [];
          let { finish } = options || {};
          function splitSelector(selector) {
            return /^@/.test(selector) ? [selector] : selector.split(/,\s*/);
          }
          function render(selectors, spec2, target, isKeyframes) {
            let local = [], isAt = /^@(\w+)\b/.exec(selectors[0]), keyframes = isAt && isAt[1] == "keyframes";
            if (isAt && spec2 == null) return target.push(selectors[0] + ";");
            for (let prop in spec2) {
              let value = spec2[prop];
              if (/&/.test(prop)) {
                render(
                  prop.split(/,\s*/).map((part) => selectors.map((sel) => part.replace(/&/, sel))).reduce((a2, b) => a2.concat(b)),
                  value,
                  target
                );
              } else if (value && typeof value == "object") {
                if (!isAt) throw new RangeError("The value of a property (" + prop + ") should be a primitive value.");
                render(splitSelector(prop), value, local, keyframes);
              } else if (value != null) {
                local.push(prop.replace(/_.*/, "").replace(/[A-Z]/g, (l) => "-" + l.toLowerCase()) + ": " + value + ";");
              }
            }
            if (local.length || keyframes) {
              target.push((finish && !isAt && !isKeyframes ? selectors.map(finish) : selectors).join(", ") + " {" + local.join(" ") + "}");
            }
          }
          for (let prop in spec) render(splitSelector(prop), spec[prop], this.rules);
        }
        // :: () → string
        // Returns a string containing the module's CSS rules.
        getRules() {
          return this.rules.join("\n");
        }
        // :: () → string
        // Generate a new unique CSS class name.
        static newName() {
          let id2 = top[COUNT] || 1;
          top[COUNT] = id2 + 1;
          return C + id2.toString(36);
        }
        // :: (union<Document, ShadowRoot>, union<[StyleModule], StyleModule>, ?{nonce: ?string})
        //
        // Mount the given set of modules in the given DOM root, which ensures
        // that the CSS rules defined by the module are available in that
        // context.
        //
        // Rules are only added to the document once per root.
        //
        // Rule order will follow the order of the modules, so that rules from
        // modules later in the array take precedence of those from earlier
        // modules. If you call this function multiple times for the same root
        // in a way that changes the order of already mounted modules, the old
        // order will be changed.
        //
        // If a Content Security Policy nonce is provided, it is added to
        // the `<style>` tag generated by the library.
        static mount(root, modules, options) {
          let set = root[SET], nonce = options && options.nonce;
          if (!set) set = new StyleSet(root, nonce);
          else if (nonce) set.setNonce(nonce);
          set.mount(Array.isArray(modules) ? modules : [modules], root);
        }
      };
      adoptedSet = /* @__PURE__ */ new Map();
      StyleSet = class {
        constructor(root, nonce) {
          let doc2 = root.ownerDocument || root, win = doc2.defaultView;
          if (!root.head && root.adoptedStyleSheets && win.CSSStyleSheet) {
            let adopted = adoptedSet.get(doc2);
            if (adopted) return root[SET] = adopted;
            this.sheet = new win.CSSStyleSheet();
            adoptedSet.set(doc2, this);
          } else {
            this.styleTag = doc2.createElement("style");
            if (nonce) this.styleTag.setAttribute("nonce", nonce);
          }
          this.modules = [];
          root[SET] = this;
        }
        mount(modules, root) {
          let sheet = this.sheet;
          let pos = 0, j = 0;
          let changed = false;
          for (let i2 = 0; i2 < modules.length; i2++) {
            let mod = modules[i2], index = this.modules.indexOf(mod);
            if (index < j && index > -1) {
              this.modules.splice(index, 1);
              changed = true;
              j--;
              index = -1;
            }
            if (index == -1) {
              this.modules.splice(j++, 0, mod);
              changed = true;
              if (sheet) for (let k = 0; k < mod.rules.length; k++)
                sheet.insertRule(mod.rules[k], pos++);
            } else {
              while (j < index) pos += this.modules[j++].rules.length;
              pos += mod.rules.length;
              j++;
            }
          }
          if (sheet) {
            if (root.adoptedStyleSheets.indexOf(this.sheet) < 0)
              root.adoptedStyleSheets = [this.sheet, ...root.adoptedStyleSheets];
          } else {
            if (changed) {
              let text = "";
              for (let i2 = 0; i2 < this.modules.length; i2++)
                text += this.modules[i2].getRules() + "\n";
              this.styleTag.textContent = text;
            }
            let target = root.head || root;
            if (this.styleTag.parentNode != target)
              target.insertBefore(this.styleTag, target.firstChild);
          }
        }
        setNonce(nonce) {
          if (this.styleTag && this.styleTag.getAttribute("nonce") != nonce)
            this.styleTag.setAttribute("nonce", nonce);
        }
      };
    }
  });

  // node_modules/w3c-keyname/index.js
  function keyName(event) {
    var ignoreKey = mac && event.metaKey && event.shiftKey && !event.ctrlKey && !event.altKey || ie && event.shiftKey && event.key && event.key.length == 1 || event.key == "Unidentified";
    var name2 = !ignoreKey && event.key || (event.shiftKey ? shift : base)[event.keyCode] || event.key || "Unidentified";
    if (name2 == "Esc") name2 = "Escape";
    if (name2 == "Del") name2 = "Delete";
    if (name2 == "Left") name2 = "ArrowLeft";
    if (name2 == "Up") name2 = "ArrowUp";
    if (name2 == "Right") name2 = "ArrowRight";
    if (name2 == "Down") name2 = "ArrowDown";
    return name2;
  }
  var base, shift, mac, ie, i, i, i, code;
  var init_w3c_keyname = __esm({
    "node_modules/w3c-keyname/index.js"() {
      base = {
        8: "Backspace",
        9: "Tab",
        10: "Enter",
        12: "NumLock",
        13: "Enter",
        16: "Shift",
        17: "Control",
        18: "Alt",
        20: "CapsLock",
        27: "Escape",
        32: " ",
        33: "PageUp",
        34: "PageDown",
        35: "End",
        36: "Home",
        37: "ArrowLeft",
        38: "ArrowUp",
        39: "ArrowRight",
        40: "ArrowDown",
        44: "PrintScreen",
        45: "Insert",
        46: "Delete",
        59: ";",
        61: "=",
        91: "Meta",
        92: "Meta",
        106: "*",
        107: "+",
        108: ",",
        109: "-",
        110: ".",
        111: "/",
        144: "NumLock",
        145: "ScrollLock",
        160: "Shift",
        161: "Shift",
        162: "Control",
        163: "Control",
        164: "Alt",
        165: "Alt",
        173: "-",
        186: ";",
        187: "=",
        188: ",",
        189: "-",
        190: ".",
        191: "/",
        192: "`",
        219: "[",
        220: "\\",
        221: "]",
        222: "'"
      };
      shift = {
        48: ")",
        49: "!",
        50: "@",
        51: "#",
        52: "$",
        53: "%",
        54: "^",
        55: "&",
        56: "*",
        57: "(",
        59: ":",
        61: "+",
        173: "_",
        186: ":",
        187: "+",
        188: "<",
        189: "_",
        190: ">",
        191: "?",
        192: "~",
        219: "{",
        220: "|",
        221: "}",
        222: '"'
      };
      mac = typeof navigator != "undefined" && /Mac/.test(navigator.platform);
      ie = typeof navigator != "undefined" && /MSIE \d|Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(navigator.userAgent);
      for (i = 0; i < 10; i++) base[48 + i] = base[96 + i] = String(i);
      for (i = 1; i <= 24; i++) base[i + 111] = "F" + i;
      for (i = 65; i <= 90; i++) {
        base[i] = String.fromCharCode(i + 32);
        shift[i] = String.fromCharCode(i);
      }
      for (code in base) if (!shift.hasOwnProperty(code)) shift[code] = base[code];
    }
  });

  // node_modules/crelt/index.js
  var init_crelt = __esm({
    "node_modules/crelt/index.js"() {
    }
  });

  // node_modules/@codemirror/view/dist/index.js
  function combineAttrs(source, target) {
    for (let name2 in source) {
      if (name2 == "class" && target.class)
        target.class += " " + source.class;
      else if (name2 == "style" && target.style)
        target.style += ";" + source.style;
      else
        target[name2] = source[name2];
    }
    return target;
  }
  function attrsEq(a2, b, ignore) {
    if (a2 == b)
      return true;
    if (!a2)
      a2 = noAttrs;
    if (!b)
      b = noAttrs;
    let keysA = Object.keys(a2), keysB = Object.keys(b);
    if (keysA.length - (ignore && keysA.indexOf(ignore) > -1 ? 1 : 0) != keysB.length - (ignore && keysB.indexOf(ignore) > -1 ? 1 : 0))
      return false;
    for (let key of keysA) {
      if (key != ignore && (keysB.indexOf(key) == -1 || a2[key] !== b[key]))
        return false;
    }
    return true;
  }
  function setAttrs(dom, attrs) {
    for (let i2 = dom.attributes.length - 1; i2 >= 0; i2--) {
      let name2 = dom.attributes[i2].name;
      if (attrs[name2] == null)
        dom.removeAttribute(name2);
    }
    for (let name2 in attrs) {
      let value = attrs[name2];
      if (name2 == "style")
        dom.style.cssText = value;
      else if (dom.getAttribute(name2) != value)
        dom.setAttribute(name2, value);
    }
  }
  function updateAttrs(dom, prev, attrs) {
    let changed = false;
    if (prev) {
      for (let name2 in prev)
        if (!(attrs && name2 in attrs)) {
          changed = true;
          if (name2 == "style")
            dom.style.cssText = "";
          else
            dom.removeAttribute(name2);
        }
    }
    if (attrs) {
      for (let name2 in attrs)
        if (!(prev && prev[name2] == attrs[name2])) {
          changed = true;
          if (name2 == "style")
            dom.style.cssText = attrs[name2];
          else
            dom.setAttribute(name2, attrs[name2]);
        }
    }
    return changed;
  }
  function getAttrs(dom) {
    let attrs = /* @__PURE__ */ Object.create(null);
    for (let i2 = 0; i2 < dom.attributes.length; i2++) {
      let attr = dom.attributes[i2];
      attrs[attr.name] = attr.value;
    }
    return attrs;
  }
  function getInclusive(spec, block = false) {
    let { inclusiveStart: start, inclusiveEnd: end } = spec;
    if (start == null)
      start = spec.inclusive;
    if (end == null)
      end = spec.inclusive;
    return { start: start !== null && start !== void 0 ? start : block, end: end !== null && end !== void 0 ? end : block };
  }
  function widgetsEq(a2, b) {
    return a2 == b || !!(a2 && b && a2.compare(b));
  }
  function addRange(from, to, ranges, margin = 0) {
    let last2 = ranges.length - 1;
    if (last2 >= 0 && ranges[last2] + margin >= from)
      ranges[last2] = Math.max(ranges[last2], to);
    else
      ranges.push(from, to);
  }
  function getSelection(root) {
    let target;
    if (root.nodeType == 11) {
      target = root.getSelection ? root : root.ownerDocument;
    } else {
      target = root;
    }
    return target.getSelection();
  }
  function contains(dom, node) {
    return node ? dom == node || dom.contains(node.nodeType != 1 ? node.parentNode : node) : false;
  }
  function hasSelection(dom, selection) {
    if (!selection.anchorNode)
      return false;
    try {
      return contains(dom, selection.anchorNode);
    } catch (_) {
      return false;
    }
  }
  function clientRectsFor(dom) {
    if (dom.nodeType == 3)
      return textRange(dom, 0, dom.nodeValue.length).getClientRects();
    else if (dom.nodeType == 1)
      return dom.getClientRects();
    else
      return [];
  }
  function isEquivalentPosition(node, off, targetNode, targetOff) {
    return targetNode ? scanFor(node, off, targetNode, targetOff, -1) || scanFor(node, off, targetNode, targetOff, 1) : false;
  }
  function domIndex(node) {
    for (var index = 0; ; index++) {
      node = node.previousSibling;
      if (!node)
        return index;
    }
  }
  function isBlockElement(node) {
    return node.nodeType == 1 && /^(DIV|P|LI|UL|OL|BLOCKQUOTE|DD|DT|H\d|SECTION|PRE)$/.test(node.nodeName);
  }
  function scanFor(node, off, targetNode, targetOff, dir) {
    for (; ; ) {
      if (node == targetNode && off == targetOff)
        return true;
      if (off == (dir < 0 ? 0 : maxOffset(node))) {
        if (node.nodeName == "DIV")
          return false;
        let parent = node.parentNode;
        if (!parent || parent.nodeType != 1)
          return false;
        off = domIndex(node) + (dir < 0 ? 0 : 1);
        node = parent;
      } else if (node.nodeType == 1) {
        node = node.childNodes[off + (dir < 0 ? -1 : 0)];
        if (node.nodeType == 1 && node.contentEditable == "false")
          return false;
        off = dir < 0 ? maxOffset(node) : 0;
      } else {
        return false;
      }
    }
  }
  function maxOffset(node) {
    return node.nodeType == 3 ? node.nodeValue.length : node.childNodes.length;
  }
  function flattenRect(rect, toLeft) {
    let { left, right } = rect;
    if (left == right)
      return rect;
    let x = toLeft ? left : right;
    return { left: x, right: x, top: rect.top, bottom: rect.bottom };
  }
  function windowRect(win) {
    let vp = win.visualViewport;
    if (vp)
      return {
        left: 0,
        right: vp.width,
        top: 0,
        bottom: vp.height
      };
    return {
      left: 0,
      right: win.innerWidth,
      top: 0,
      bottom: win.innerHeight
    };
  }
  function getScale(elt, rect) {
    let scaleX = rect.width / elt.offsetWidth;
    let scaleY = rect.height / elt.offsetHeight;
    if (scaleX > 0.995 && scaleX < 1.005 || !isFinite(scaleX) || Math.abs(rect.width - elt.offsetWidth) < 1)
      scaleX = 1;
    if (scaleY > 0.995 && scaleY < 1.005 || !isFinite(scaleY) || Math.abs(rect.height - elt.offsetHeight) < 1)
      scaleY = 1;
    return { scaleX, scaleY };
  }
  function scrollRectIntoView(dom, rect, side, x, y, xMargin, yMargin, ltr) {
    let doc2 = dom.ownerDocument, win = doc2.defaultView || window;
    for (let cur = dom, stop = false; cur && !stop; ) {
      if (cur.nodeType == 1) {
        let bounding, top2 = cur == doc2.body;
        let scaleX = 1, scaleY = 1;
        if (top2) {
          bounding = windowRect(win);
        } else {
          if (/^(fixed|sticky)$/.test(getComputedStyle(cur).position))
            stop = true;
          if (cur.scrollHeight <= cur.clientHeight && cur.scrollWidth <= cur.clientWidth) {
            cur = cur.assignedSlot || cur.parentNode;
            continue;
          }
          let rect2 = cur.getBoundingClientRect();
          ({ scaleX, scaleY } = getScale(cur, rect2));
          bounding = {
            left: rect2.left,
            right: rect2.left + cur.clientWidth * scaleX,
            top: rect2.top,
            bottom: rect2.top + cur.clientHeight * scaleY
          };
        }
        let moveX = 0, moveY = 0;
        if (y == "nearest") {
          if (rect.top < bounding.top + yMargin) {
            moveY = rect.top - (bounding.top + yMargin);
            if (side > 0 && rect.bottom > bounding.bottom + moveY)
              moveY = rect.bottom - bounding.bottom + yMargin;
          } else if (rect.bottom > bounding.bottom - yMargin) {
            moveY = rect.bottom - bounding.bottom + yMargin;
            if (side < 0 && rect.top - moveY < bounding.top)
              moveY = rect.top - (bounding.top + yMargin);
          }
        } else {
          let rectHeight = rect.bottom - rect.top, boundingHeight = bounding.bottom - bounding.top;
          let targetTop = y == "center" && rectHeight <= boundingHeight ? rect.top + rectHeight / 2 - boundingHeight / 2 : y == "start" || y == "center" && side < 0 ? rect.top - yMargin : rect.bottom - boundingHeight + yMargin;
          moveY = targetTop - bounding.top;
        }
        if (x == "nearest") {
          if (rect.left < bounding.left + xMargin) {
            moveX = rect.left - (bounding.left + xMargin);
            if (side > 0 && rect.right > bounding.right + moveX)
              moveX = rect.right - bounding.right + xMargin;
          } else if (rect.right > bounding.right - xMargin) {
            moveX = rect.right - bounding.right + xMargin;
            if (side < 0 && rect.left < bounding.left + moveX)
              moveX = rect.left - (bounding.left + xMargin);
          }
        } else {
          let targetLeft = x == "center" ? rect.left + (rect.right - rect.left) / 2 - (bounding.right - bounding.left) / 2 : x == "start" == ltr ? rect.left - xMargin : rect.right - (bounding.right - bounding.left) + xMargin;
          moveX = targetLeft - bounding.left;
        }
        if (moveX || moveY) {
          if (top2) {
            win.scrollBy(moveX, moveY);
          } else {
            let movedX = 0, movedY = 0;
            if (moveY) {
              let start = cur.scrollTop;
              cur.scrollTop += moveY / scaleY;
              movedY = (cur.scrollTop - start) * scaleY;
            }
            if (moveX) {
              let start = cur.scrollLeft;
              cur.scrollLeft += moveX / scaleX;
              movedX = (cur.scrollLeft - start) * scaleX;
            }
            rect = {
              left: rect.left - movedX,
              top: rect.top - movedY,
              right: rect.right - movedX,
              bottom: rect.bottom - movedY
            };
            if (movedX && Math.abs(movedX - moveX) < 1)
              x = "nearest";
            if (movedY && Math.abs(movedY - moveY) < 1)
              y = "nearest";
          }
        }
        if (top2)
          break;
        if (rect.top < bounding.top || rect.bottom > bounding.bottom || rect.left < bounding.left || rect.right > bounding.right)
          rect = {
            left: Math.max(rect.left, bounding.left),
            right: Math.min(rect.right, bounding.right),
            top: Math.max(rect.top, bounding.top),
            bottom: Math.min(rect.bottom, bounding.bottom)
          };
        cur = cur.assignedSlot || cur.parentNode;
      } else if (cur.nodeType == 11) {
        cur = cur.host;
      } else {
        break;
      }
    }
  }
  function scrollableParents(dom, getX = true) {
    let doc2 = dom.ownerDocument, x = null, y = null;
    for (let cur = dom.parentNode; cur; ) {
      if (cur == doc2.body || (!getX || x) && y) {
        break;
      } else if (cur.nodeType == 1) {
        if (!y && cur.scrollHeight > cur.clientHeight)
          y = cur;
        if (getX && !x && cur.scrollWidth > cur.clientWidth)
          x = cur;
        cur = cur.assignedSlot || cur.parentNode;
      } else if (cur.nodeType == 11) {
        cur = cur.host;
      } else {
        break;
      }
    }
    return { x, y };
  }
  function getScrollStack(target) {
    let stack = [];
    for (let cur = target; cur; cur = cur.nodeType == 11 ? cur.host : cur.parentNode) {
      if (cur.nodeType == 1)
        stack.push({ node: cur, left: cur.scrollLeft, top: cur.scrollTop });
    }
    return stack;
  }
  function restoreScrollStack(stack, vert = true) {
    for (let { node, left, top: top2 } of stack) {
      if (vert && node.scrollTop != top2)
        node.scrollTop = top2;
      if (node.scrollLeft != left)
        node.scrollLeft = left;
    }
  }
  function focusPreventScroll(dom) {
    if (dom.setActive)
      return dom.setActive();
    if (preventScrollSupported)
      return dom.focus(preventScrollSupported);
    let stack = getScrollStack(dom);
    dom.focus(preventScrollSupported == null ? {
      get preventScroll() {
        preventScrollSupported = { preventScroll: true };
        return true;
      }
    } : void 0);
    if (!preventScrollSupported) {
      preventScrollSupported = false;
      restoreScrollStack(stack);
    }
  }
  function textRange(node, from, to = from) {
    let range = scratchRange || (scratchRange = document.createRange());
    range.setEnd(node, to);
    range.setStart(node, from);
    return range;
  }
  function dispatchKey(elt, name2, code2, mods) {
    let options = { key: name2, code: name2, keyCode: code2, which: code2, cancelable: true };
    if (mods)
      ({ altKey: options.altKey, ctrlKey: options.ctrlKey, shiftKey: options.shiftKey, metaKey: options.metaKey } = mods);
    let down = new KeyboardEvent("keydown", options);
    down.synthetic = true;
    elt.dispatchEvent(down);
    let up = new KeyboardEvent("keyup", options);
    up.synthetic = true;
    elt.dispatchEvent(up);
    return down.defaultPrevented || up.defaultPrevented;
  }
  function getRoot(node) {
    while (node) {
      if (node && (node.nodeType == 9 || node.nodeType == 11 && node.host))
        return node;
      node = node.assignedSlot || node.parentNode;
    }
    return null;
  }
  function atElementStart(doc2, selection) {
    let node = selection.focusNode, offset = selection.focusOffset;
    if (!node || selection.anchorNode != node || selection.anchorOffset != offset)
      return false;
    offset = Math.min(offset, maxOffset(node));
    for (; ; ) {
      if (offset) {
        if (node.nodeType != 1)
          return false;
        let prev = node.childNodes[offset - 1];
        if (prev.contentEditable == "false")
          offset--;
        else {
          node = prev;
          offset = maxOffset(node);
        }
      } else if (node == doc2) {
        return true;
      } else {
        offset = domIndex(node);
        node = node.parentNode;
      }
    }
  }
  function isScrolledToBottom(elt) {
    if (elt instanceof Window)
      return elt.pageYOffset > Math.max(0, elt.document.documentElement.scrollHeight - elt.innerHeight - 4);
    return elt.scrollTop > Math.max(1, elt.scrollHeight - elt.clientHeight - 4);
  }
  function textNodeBefore(startNode, startOffset) {
    for (let node = startNode, offset = startOffset; ; ) {
      if (node.nodeType == 3 && offset > 0) {
        return { node, offset };
      } else if (node.nodeType == 1 && offset > 0) {
        if (node.contentEditable == "false")
          return null;
        node = node.childNodes[offset - 1];
        offset = maxOffset(node);
      } else if (node.parentNode && !isBlockElement(node)) {
        offset = domIndex(node);
        node = node.parentNode;
      } else {
        return null;
      }
    }
  }
  function textNodeAfter(startNode, startOffset) {
    for (let node = startNode, offset = startOffset; ; ) {
      if (node.nodeType == 3 && offset < node.nodeValue.length) {
        return { node, offset };
      } else if (node.nodeType == 1 && offset < node.childNodes.length) {
        if (node.contentEditable == "false")
          return null;
        node = node.childNodes[offset];
        offset = 0;
      } else if (node.parentNode && !isBlockElement(node)) {
        offset = domIndex(node) + 1;
        node = node.parentNode;
      } else {
        return null;
      }
    }
  }
  function dec(str) {
    let result = [];
    for (let i2 = 0; i2 < str.length; i2++)
      result.push(1 << +str[i2]);
    return result;
  }
  function charType(ch) {
    return ch <= 247 ? LowTypes[ch] : 1424 <= ch && ch <= 1524 ? 2 : 1536 <= ch && ch <= 1785 ? ArabicTypes[ch - 1536] : 1774 <= ch && ch <= 2220 ? 4 : 8192 <= ch && ch <= 8204 ? 256 : 64336 <= ch && ch <= 65023 ? 4 : 1;
  }
  function isolatesEq(a2, b) {
    if (a2.length != b.length)
      return false;
    for (let i2 = 0; i2 < a2.length; i2++) {
      let iA = a2[i2], iB = b[i2];
      if (iA.from != iB.from || iA.to != iB.to || iA.direction != iB.direction || !isolatesEq(iA.inner, iB.inner))
        return false;
    }
    return true;
  }
  function computeCharTypes(line, rFrom, rTo, isolates, outerType) {
    for (let iI = 0; iI <= isolates.length; iI++) {
      let from = iI ? isolates[iI - 1].to : rFrom, to = iI < isolates.length ? isolates[iI].from : rTo;
      let prevType = iI ? 256 : outerType;
      for (let i2 = from, prev = prevType, prevStrong = prevType; i2 < to; i2++) {
        let type = charType(line.charCodeAt(i2));
        if (type == 512)
          type = prev;
        else if (type == 8 && prevStrong == 4)
          type = 16;
        types[i2] = type == 4 ? 2 : type;
        if (type & 7)
          prevStrong = type;
        prev = type;
      }
      for (let i2 = from, prev = prevType, prevStrong = prevType; i2 < to; i2++) {
        let type = types[i2];
        if (type == 128) {
          if (i2 < to - 1 && prev == types[i2 + 1] && prev & 24)
            type = types[i2] = prev;
          else
            types[i2] = 256;
        } else if (type == 64) {
          let end = i2 + 1;
          while (end < to && types[end] == 64)
            end++;
          let replace2 = i2 && prev == 8 || end < rTo && types[end] == 8 ? prevStrong == 1 ? 1 : 8 : 256;
          for (let j = i2; j < end; j++)
            types[j] = replace2;
          i2 = end - 1;
        } else if (type == 8 && prevStrong == 1) {
          types[i2] = 1;
        }
        prev = type;
        if (type & 7)
          prevStrong = type;
      }
    }
  }
  function processBracketPairs(line, rFrom, rTo, isolates, outerType) {
    let oppositeType = outerType == 1 ? 2 : 1;
    for (let iI = 0, sI = 0, context = 0; iI <= isolates.length; iI++) {
      let from = iI ? isolates[iI - 1].to : rFrom, to = iI < isolates.length ? isolates[iI].from : rTo;
      for (let i2 = from, ch, br, type; i2 < to; i2++) {
        if (br = Brackets[ch = line.charCodeAt(i2)]) {
          if (br < 0) {
            for (let sJ = sI - 3; sJ >= 0; sJ -= 3) {
              if (BracketStack[sJ + 1] == -br) {
                let flags = BracketStack[sJ + 2];
                let type2 = flags & 2 ? outerType : !(flags & 4) ? 0 : flags & 1 ? oppositeType : outerType;
                if (type2)
                  types[i2] = types[BracketStack[sJ]] = type2;
                sI = sJ;
                break;
              }
            }
          } else if (BracketStack.length == 189) {
            break;
          } else {
            BracketStack[sI++] = i2;
            BracketStack[sI++] = ch;
            BracketStack[sI++] = context;
          }
        } else if ((type = types[i2]) == 2 || type == 1) {
          let embed = type == outerType;
          context = embed ? 0 : 1;
          for (let sJ = sI - 3; sJ >= 0; sJ -= 3) {
            let cur = BracketStack[sJ + 2];
            if (cur & 2)
              break;
            if (embed) {
              BracketStack[sJ + 2] |= 2;
            } else {
              if (cur & 4)
                break;
              BracketStack[sJ + 2] |= 4;
            }
          }
        }
      }
    }
  }
  function processNeutrals(rFrom, rTo, isolates, outerType) {
    for (let iI = 0, prev = outerType; iI <= isolates.length; iI++) {
      let from = iI ? isolates[iI - 1].to : rFrom, to = iI < isolates.length ? isolates[iI].from : rTo;
      for (let i2 = from; i2 < to; ) {
        let type = types[i2];
        if (type == 256) {
          let end = i2 + 1;
          for (; ; ) {
            if (end == to) {
              if (iI == isolates.length)
                break;
              end = isolates[iI++].to;
              to = iI < isolates.length ? isolates[iI].from : rTo;
            } else if (types[end] == 256) {
              end++;
            } else {
              break;
            }
          }
          let beforeL = prev == 1;
          let afterL = (end < rTo ? types[end] : outerType) == 1;
          let replace2 = beforeL == afterL ? beforeL ? 1 : 2 : outerType;
          for (let j = end, jI = iI, fromJ = jI ? isolates[jI - 1].to : rFrom; j > i2; ) {
            if (j == fromJ) {
              j = isolates[--jI].from;
              fromJ = jI ? isolates[jI - 1].to : rFrom;
            }
            types[--j] = replace2;
          }
          i2 = end;
        } else {
          prev = type;
          i2++;
        }
      }
    }
  }
  function emitSpans(line, from, to, level, baseLevel, isolates, order) {
    let ourType = level % 2 ? 2 : 1;
    if (level % 2 == baseLevel % 2) {
      for (let iCh = from, iI = 0; iCh < to; ) {
        let sameDir = true, isNum = false;
        if (iI == isolates.length || iCh < isolates[iI].from) {
          let next = types[iCh];
          if (next != ourType) {
            sameDir = false;
            isNum = next == 16;
          }
        }
        let recurse = !sameDir && ourType == 1 ? [] : null;
        let localLevel = sameDir ? level : level + 1;
        let iScan = iCh;
        run: for (; ; ) {
          if (iI < isolates.length && iScan == isolates[iI].from) {
            if (isNum)
              break run;
            let iso = isolates[iI];
            if (!sameDir)
              for (let upto = iso.to, jI = iI + 1; ; ) {
                if (upto == to)
                  break run;
                if (jI < isolates.length && isolates[jI].from == upto)
                  upto = isolates[jI++].to;
                else if (types[upto] == ourType)
                  break run;
                else
                  break;
              }
            iI++;
            if (recurse) {
              recurse.push(iso);
            } else {
              if (iso.from > iCh)
                order.push(new BidiSpan(iCh, iso.from, localLevel));
              let dirSwap = iso.direction == LTR != !(localLevel % 2);
              computeSectionOrder(line, dirSwap ? level + 1 : level, baseLevel, iso.inner, iso.from, iso.to, order);
              iCh = iso.to;
            }
            iScan = iso.to;
          } else if (iScan == to || (sameDir ? types[iScan] != ourType : types[iScan] == ourType)) {
            break;
          } else {
            iScan++;
          }
        }
        if (recurse)
          emitSpans(line, iCh, iScan, level + 1, baseLevel, recurse, order);
        else if (iCh < iScan)
          order.push(new BidiSpan(iCh, iScan, localLevel));
        iCh = iScan;
      }
    } else {
      for (let iCh = to, iI = isolates.length; iCh > from; ) {
        let sameDir = true, isNum = false;
        if (!iI || iCh > isolates[iI - 1].to) {
          let next = types[iCh - 1];
          if (next != ourType) {
            sameDir = false;
            isNum = next == 16;
          }
        }
        let recurse = !sameDir && ourType == 1 ? [] : null;
        let localLevel = sameDir ? level : level + 1;
        let iScan = iCh;
        run: for (; ; ) {
          if (iI && iScan == isolates[iI - 1].to) {
            if (isNum)
              break run;
            let iso = isolates[--iI];
            if (!sameDir)
              for (let upto = iso.from, jI = iI; ; ) {
                if (upto == from)
                  break run;
                if (jI && isolates[jI - 1].to == upto)
                  upto = isolates[--jI].from;
                else if (types[upto - 1] == ourType)
                  break run;
                else
                  break;
              }
            if (recurse) {
              recurse.push(iso);
            } else {
              if (iso.to < iCh)
                order.push(new BidiSpan(iso.to, iCh, localLevel));
              let dirSwap = iso.direction == LTR != !(localLevel % 2);
              computeSectionOrder(line, dirSwap ? level + 1 : level, baseLevel, iso.inner, iso.from, iso.to, order);
              iCh = iso.from;
            }
            iScan = iso.from;
          } else if (iScan == from || (sameDir ? types[iScan - 1] != ourType : types[iScan - 1] == ourType)) {
            break;
          } else {
            iScan--;
          }
        }
        if (recurse)
          emitSpans(line, iScan, iCh, level + 1, baseLevel, recurse, order);
        else if (iScan < iCh)
          order.push(new BidiSpan(iScan, iCh, localLevel));
        iCh = iScan;
      }
    }
  }
  function computeSectionOrder(line, level, baseLevel, isolates, from, to, order) {
    let outerType = level % 2 ? 2 : 1;
    computeCharTypes(line, from, to, isolates, outerType);
    processBracketPairs(line, from, to, isolates, outerType);
    processNeutrals(from, to, isolates, outerType);
    emitSpans(line, from, to, level, baseLevel, isolates, order);
  }
  function computeOrder(line, direction, isolates) {
    if (!line)
      return [new BidiSpan(0, 0, direction == RTL ? 1 : 0)];
    if (direction == LTR && !isolates.length && !BidiRE.test(line))
      return trivialOrder(line.length);
    if (isolates.length)
      while (line.length > types.length)
        types[types.length] = 256;
    let order = [], level = direction == LTR ? 0 : 1;
    computeSectionOrder(line, level, level, isolates, 0, line.length, order);
    return order;
  }
  function trivialOrder(length) {
    return [new BidiSpan(0, length, 0)];
  }
  function moveVisually(line, order, dir, start, forward) {
    var _a2;
    if (!line.length)
      return null;
    let startIndex = start.head - line.from, spanI;
    if (start.head == line.from && start.assoc < 0) {
      if (!forward)
        return null;
      startIndex = order[spanI = 0].side(false, dir);
    } else if (start.head == line.to && start.assoc > 0) {
      if (forward)
        return null;
      startIndex = order[spanI = order.length - 1].side(true, dir);
    } else {
      spanI = BidiSpan.find(order, startIndex, (_a2 = start.bidiLevel) !== null && _a2 !== void 0 ? _a2 : -1, start.assoc);
    }
    let span = order[spanI], spanEnd = span.side(forward, dir);
    if (startIndex == spanEnd) {
      let nextI = spanI += forward ? 1 : -1;
      if (nextI < 0 || nextI >= order.length)
        return null;
      span = order[spanI = nextI];
      startIndex = span.side(!forward, dir);
      spanEnd = span.side(forward, dir);
    }
    let nextIndex = findClusterBreak2(line.text, startIndex, span.forward(forward, dir));
    if (nextIndex < span.from || nextIndex > span.to)
      nextIndex = spanEnd;
    movedOver = line.text.slice(Math.min(startIndex, nextIndex), Math.max(startIndex, nextIndex));
    let nextSpan = spanI == (forward ? order.length - 1 : 0) ? null : order[spanI + (forward ? 1 : -1)];
    if (nextIndex == spanEnd) {
      if (!nextSpan)
        return forward ? EditorSelection.cursor(line.to, 1) : EditorSelection.cursor(line.from, -1);
      if (nextSpan.level + (forward ? 0 : 1) < span.level)
        return EditorSelection.cursor(nextSpan.side(!forward, dir) + line.from, nextSpan.forward(forward, dir) ? 1 : -1, nextSpan.level);
    }
    return EditorSelection.cursor(nextIndex + line.from, span.forward(forward, dir) ? -1 : 1, span.level);
  }
  function autoDirection(text, from, to) {
    for (let i2 = from; i2 < to; i2++) {
      let type = charType(text.charCodeAt(i2));
      if (type == 1)
        return LTR;
      if (type == 2 || type == 4)
        return RTL;
    }
    return LTR;
  }
  function logException(state, exception, context) {
    let handler = state.facet(exceptionSink);
    if (handler.length)
      handler[0](exception);
    else if (window.onerror && window.onerror(String(exception), context, void 0, void 0, exception)) ;
    else if (context)
      console.error(context + ":", exception);
    else
      console.error(exception);
  }
  function getIsolatedRanges(view, line) {
    let isolates = view.state.facet(bidiIsolatedRanges);
    if (!isolates.length)
      return isolates;
    let sets = isolates.map((i2) => i2 instanceof Function ? i2(view) : i2);
    let result = [];
    RangeSet.spans(sets, line.from, line.to, {
      point() {
      },
      span(fromDoc, toDoc, active, open) {
        let from = fromDoc - line.from, to = toDoc - line.from;
        let level = result;
        for (let i2 = active.length - 1; i2 >= 0; i2--, open--) {
          let direction = active[i2].spec.bidiIsolate, update;
          if (direction == null)
            direction = autoDirection(line.text, from, to);
          if (open > 0 && level.length && (update = level[level.length - 1]).to == from && update.direction == direction) {
            update.to = to;
            level = update.inner;
          } else {
            let add = { from, to, direction, inner: [] };
            level.push(add);
            level = add.inner;
          }
        }
      }
    });
    return result;
  }
  function getScrollMargins(view) {
    let left = 0, right = 0, top2 = 0, bottom = 0;
    for (let source of view.state.facet(scrollMargins)) {
      let m = source(view);
      if (m) {
        if (m.left != null)
          left = Math.max(left, m.left);
        if (m.right != null)
          right = Math.max(right, m.right);
        if (m.top != null)
          top2 = Math.max(top2, m.top);
        if (m.bottom != null)
          bottom = Math.max(bottom, m.bottom);
      }
    }
    return { left, right, top: top2, bottom };
  }
  function rm$1(dom) {
    let next = dom.nextSibling;
    dom.parentNode.removeChild(dom);
    return next;
  }
  function fallbackRect(tile) {
    let last2 = tile.dom.lastChild;
    if (!last2)
      return tile.dom.getBoundingClientRect();
    let rects = clientRectsFor(last2);
    return rects[rects.length - 1] || null;
  }
  function onSameLine(a2, b) {
    let posA = a2.coordsIn(0, 1), posB = b.coordsIn(0, 1);
    return posA && posB && posB.top < posA.bottom;
  }
  function hasContent(tile, requireText) {
    let scan = (tile2) => {
      for (let ch of tile2.children)
        if ((requireText ? ch.isText() : ch.length) || scan(ch))
          return true;
      return false;
    };
    return scan(tile);
  }
  function widgetFlags(deco) {
    let flags = deco.isReplace ? (deco.startSide < 0 ? 64 : 0) | (deco.endSide > 0 ? 128 : 0) : deco.startSide > 0 ? 32 : 16;
    if (deco.block)
      flags |= 256;
    return flags;
  }
  function addLineDeco(value, deco) {
    let attrs = deco.spec.attributes, cls = deco.spec.class;
    if (!attrs && !cls)
      return value;
    if (!value)
      value = { class: "cm-line" };
    if (attrs)
      combineAttrs(attrs, value);
    if (cls)
      value.class += " " + cls;
    return value;
  }
  function getMarks(ptr) {
    let found = [];
    for (let i2 = ptr.parents.length; i2 > 1; i2--) {
      let tile = i2 == ptr.parents.length ? ptr.tile : ptr.parents[i2].tile;
      if (tile instanceof MarkTile)
        found.push(tile.mark);
    }
    return found;
  }
  function freeNode(node) {
    let tile = Tile.get(node);
    if (tile)
      tile.setDOM(node.cloneNode());
    return node;
  }
  function destroyDropped(tile, reused) {
    let r = reused === null || reused === void 0 ? void 0 : reused.get(tile);
    if (r != 1) {
      if (r == null)
        tile.destroy();
      for (let ch of tile.children)
        destroyDropped(ch, reused);
    }
  }
  function betweenUneditable(pos) {
    return pos.node.nodeType == 1 && pos.node.firstChild && (pos.offset == 0 || pos.node.childNodes[pos.offset - 1].contentEditable == "false") && (pos.offset == pos.node.childNodes.length || pos.node.childNodes[pos.offset].contentEditable == "false");
  }
  function findCompositionNode(view, headPos) {
    let sel = view.observer.selectionRange;
    if (!sel.focusNode)
      return null;
    let textBefore = textNodeBefore(sel.focusNode, sel.focusOffset);
    let textAfter = textNodeAfter(sel.focusNode, sel.focusOffset);
    let textNode = textBefore || textAfter;
    if (textAfter && textBefore && textAfter.node != textBefore.node) {
      let tileAfter = Tile.get(textAfter.node);
      if (!tileAfter || tileAfter.isText() && tileAfter.text != textAfter.node.nodeValue) {
        textNode = textAfter;
      } else if (view.docView.lastCompositionAfterCursor) {
        let tileBefore = Tile.get(textBefore.node);
        if (!(!tileBefore || tileBefore.isText() && tileBefore.text != textBefore.node.nodeValue))
          textNode = textAfter;
      }
    }
    view.docView.lastCompositionAfterCursor = textNode != textBefore;
    if (!textNode)
      return null;
    let from = headPos - textNode.offset;
    return { from, to: from + textNode.node.nodeValue.length, node: textNode.node };
  }
  function findCompositionRange(view, changes, headPos) {
    let found = findCompositionNode(view, headPos);
    if (!found)
      return null;
    let { node: textNode, from, to } = found, text = textNode.nodeValue;
    if (/[\n\r]/.test(text))
      return null;
    if (view.state.doc.sliceString(found.from, found.to) != text)
      return null;
    let inv = changes.invertedDesc;
    return { range: new ChangedRange(inv.mapPos(from), inv.mapPos(to), from, to), text: textNode };
  }
  function nextToUneditable(node, offset) {
    if (node.nodeType != 1)
      return 0;
    return (offset && node.childNodes[offset - 1].contentEditable == "false" ? 1 : 0) | (offset < node.childNodes.length && node.childNodes[offset].contentEditable == "false" ? 2 : 0);
  }
  function findChangedDeco(a2, b, diff) {
    let comp = new DecorationComparator$1();
    RangeSet.compare(a2, b, diff, comp);
    return comp.changes;
  }
  function findChangedWrappers(a2, b, diff) {
    let comp = new WrapperComparator();
    RangeSet.compare(a2, b, diff, comp);
    return comp.changes;
  }
  function inUneditable(node, inside) {
    for (let cur = node; cur && cur != inside; cur = cur.assignedSlot || cur.parentNode) {
      if (cur.nodeType == 1 && cur.contentEditable == "false") {
        return true;
      }
    }
    return false;
  }
  function touchesComposition(changes, composition) {
    let touched = false;
    if (composition)
      changes.iterChangedRanges((from, to) => {
        if (from < composition.to && to > composition.from)
          touched = true;
      });
    return touched;
  }
  function groupAt(state, pos, bias = 1) {
    let categorize = state.charCategorizer(pos);
    let line = state.doc.lineAt(pos), linePos = pos - line.from;
    if (line.length == 0)
      return EditorSelection.cursor(pos);
    if (linePos == 0)
      bias = 1;
    else if (linePos == line.length)
      bias = -1;
    let from = linePos, to = linePos;
    if (bias < 0)
      from = findClusterBreak2(line.text, linePos, false);
    else
      to = findClusterBreak2(line.text, linePos);
    let cat = categorize(line.text.slice(from, to));
    while (from > 0) {
      let prev = findClusterBreak2(line.text, from, false);
      if (categorize(line.text.slice(prev, from)) != cat)
        break;
      from = prev;
    }
    while (to < line.length) {
      let next = findClusterBreak2(line.text, to);
      if (categorize(line.text.slice(to, next)) != cat)
        break;
      to = next;
    }
    return EditorSelection.undirectionalRange(from + line.from, to + line.from);
  }
  function posAtCoordsImprecise(view, contentRect, block, x, y) {
    let into = Math.round((x - contentRect.left) * view.defaultCharacterWidth);
    if (view.lineWrapping && block.height > view.defaultLineHeight * 1.5) {
      let textHeight = view.viewState.heightOracle.textHeight;
      let line = Math.floor((y - block.top - (view.defaultLineHeight - textHeight) * 0.5) / textHeight);
      into += line * view.viewState.heightOracle.lineLength;
    }
    let content2 = view.state.sliceDoc(block.from, block.to);
    return block.from + findColumn(content2, into, view.state.tabSize);
  }
  function blockAt(view, pos, side) {
    let line = view.lineBlockAt(pos);
    if (Array.isArray(line.type)) {
      let best;
      for (let l of line.type) {
        if (l.from > pos)
          break;
        if (l.to < pos)
          continue;
        if (l.from < pos && l.to > pos)
          return l;
        if (!best || l.type == BlockType.Text && (best.type != l.type || (side < 0 ? l.from < pos : l.to > pos)))
          best = l;
      }
      return best || line;
    }
    return line;
  }
  function moveToLineBoundary(view, start, forward, includeWrap) {
    let block = blockAt(view, start.head, start.assoc || -1);
    let coords = !includeWrap || block.type != BlockType.Text || !(view.lineWrapping || block.widgetLineBreaks) ? null : view.coordsAtPos(start.assoc < 0 && start.head > block.from ? start.head - 1 : start.head);
    if (coords) {
      let editorRect = view.dom.getBoundingClientRect();
      let direction = view.textDirectionAt(block.from);
      let pos = view.posAtCoords({
        x: forward == (direction == Direction.LTR) ? editorRect.right - 1 : editorRect.left + 1,
        y: (coords.top + coords.bottom) / 2
      });
      if (pos != null)
        return EditorSelection.cursor(pos, forward ? -1 : 1);
    }
    return EditorSelection.cursor(forward ? block.to : block.from, forward ? -1 : 1);
  }
  function moveByChar(view, start, forward, by) {
    let line = view.state.doc.lineAt(start.head), spans = view.bidiSpans(line);
    let direction = view.textDirectionAt(line.from);
    for (let cur = start, check = null; ; ) {
      let next = moveVisually(line, spans, direction, cur, forward), char = movedOver;
      if (!next) {
        if (line.number == (forward ? view.state.doc.lines : 1))
          return cur;
        char = "\n";
        line = view.state.doc.line(line.number + (forward ? 1 : -1));
        spans = view.bidiSpans(line);
        next = forward ? EditorSelection.cursor(line.from, -1) : EditorSelection.cursor(line.to, 1);
      }
      if (!check) {
        if (!by)
          return next;
        check = by(char);
      } else if (!check(char)) {
        return cur;
      }
      cur = next;
    }
  }
  function byGroup(view, pos, start) {
    let categorize = view.state.charCategorizer(pos);
    let cat = categorize(start);
    return (next) => {
      let nextCat = categorize(next);
      if (cat == CharCategory.Space)
        cat = nextCat;
      return cat == nextCat;
    };
  }
  function moveVertically(view, start, forward, distance) {
    let startPos = start.head, dir = forward ? 1 : -1;
    if (startPos == (forward ? view.state.doc.length : 0))
      return EditorSelection.cursor(startPos, start.assoc);
    let goal = start.goalColumn, startY;
    let rect = view.contentDOM.getBoundingClientRect();
    let startCoords = view.coordsAtPos(startPos, start.assoc || ((start.empty ? forward : start.head == start.from) ? 1 : -1));
    let docTop = view.documentTop;
    if (startCoords) {
      if (goal == null)
        goal = startCoords.left - rect.left;
      startY = dir < 0 ? startCoords.top : startCoords.bottom;
    } else {
      let line = view.viewState.lineBlockAt(startPos);
      if (goal == null)
        goal = Math.min(rect.right - rect.left, view.defaultCharacterWidth * (startPos - line.from));
      startY = (dir < 0 ? line.top : line.bottom) + docTop;
    }
    let resolvedGoal = rect.left + goal;
    let halfText = view.viewState.heightOracle.textHeight >> 1, dist2 = distance !== null && distance !== void 0 ? distance : halfText;
    for (let scan = 0; ; scan += halfText) {
      let y = startY + (dist2 + scan) * dir;
      let pos = posAtCoords(view, { x: resolvedGoal, y }, false, dir);
      if (forward ? y > rect.bottom : y < rect.top)
        return EditorSelection.cursor(pos.pos, pos.assoc);
      let posCoords = view.coordsAtPos(pos.pos, pos.assoc), mid = posCoords ? (posCoords.top + posCoords.bottom) / 2 : 0;
      if (!posCoords || (forward ? mid > startY : mid < startY))
        return EditorSelection.cursor(pos.pos, pos.assoc, void 0, goal);
    }
  }
  function skipAtomicRanges(atoms, pos, bias) {
    for (; ; ) {
      let moved = 0;
      for (let set of atoms) {
        set.between(pos - 1, pos + 1, (from, to, value) => {
          if (pos > from && pos < to) {
            let side = moved || bias || (pos - from < to - pos ? -1 : 1);
            pos = side < 0 ? from : to;
            moved = side;
          }
        });
      }
      if (!moved)
        return pos;
    }
  }
  function skipAtomsForSelection(atoms, sel) {
    let ranges = null;
    for (let i2 = 0; i2 < sel.ranges.length; i2++) {
      let range = sel.ranges[i2], updated = null;
      if (range.empty) {
        let pos = skipAtomicRanges(atoms, range.from, 0);
        if (pos != range.from)
          updated = EditorSelection.cursor(pos, -1);
      } else {
        let from = skipAtomicRanges(atoms, range.from, -1);
        let to = skipAtomicRanges(atoms, range.to, 1);
        if (from != range.from || to != range.to) {
          if (range.undirectional)
            updated = EditorSelection.undirectionalRange(range.from, range.to);
          else
            updated = EditorSelection.range(range.from == range.anchor ? from : to, range.from == range.head ? from : to);
        }
      }
      if (updated) {
        if (!ranges)
          ranges = sel.ranges.slice();
        ranges[i2] = updated;
      }
    }
    return ranges ? EditorSelection.create(ranges, sel.mainIndex) : sel;
  }
  function skipAtoms(view, oldPos, pos) {
    let newPos = skipAtomicRanges(view.state.facet(atomicRanges).map((f) => f(view)), pos.from, oldPos.head > pos.from ? -1 : 1);
    return newPos == pos.from ? pos : EditorSelection.cursor(newPos, newPos < pos.from ? 1 : -1);
  }
  function posAtCoords(view, coords, precise, scanY) {
    let content2 = view.contentDOM.getBoundingClientRect(), docTop = content2.top + view.viewState.paddingTop;
    let { x, y } = coords, yOffset = y - docTop, block;
    for (; ; ) {
      if (yOffset < 0)
        return new PosAssoc(0, 1);
      if (yOffset > view.viewState.docHeight)
        return new PosAssoc(view.state.doc.length, -1);
      block = view.elementAtHeight(yOffset);
      if (scanY == null)
        break;
      if (block.type == BlockType.Text) {
        if (scanY < 0 ? block.to < view.viewport.from : block.from > view.viewport.to)
          break;
        let rect = view.docView.coordsAt(scanY < 0 ? block.from : block.to, scanY > 0 ? -1 : 1);
        if (rect && (scanY < 0 ? rect.top <= yOffset + docTop : rect.bottom >= yOffset + docTop))
          break;
      }
      let halfLine = view.viewState.heightOracle.textHeight / 2;
      yOffset = scanY > 0 ? block.bottom + halfLine : block.top - halfLine;
    }
    if (view.viewport.from >= block.to || view.viewport.to <= block.from) {
      if (precise)
        return null;
      if (block.type == BlockType.Text) {
        let pos = posAtCoordsImprecise(view, content2, block, x, y);
        return new PosAssoc(pos, pos == block.from ? 1 : -1);
      }
    }
    if (block.type != BlockType.Text)
      return yOffset < (block.top + block.bottom) / 2 ? new PosAssoc(block.from, 1) : new PosAssoc(block.to, -1);
    let line = view.docView.lineAt(block.from, 2);
    if (!line || line.length != block.length)
      line = view.docView.lineAt(block.from, -2);
    return new InlineCoordsScan(view, x, y, view.textDirectionAt(block.from)).scanTile(line, block.from);
  }
  function isAtEnd(parent, node, offset) {
    for (; ; ) {
      if (!node || offset < maxOffset(node))
        return false;
      if (node == parent)
        return true;
      offset = domIndex(node) + 1;
      node = node.parentNode;
    }
  }
  function isEmptyToEnd(node, end) {
    let widgets;
    for (; ; node = node.nextSibling) {
      if (node == end || !node)
        break;
      let view = Tile.get(node);
      if (!(view === null || view === void 0 ? void 0 : view.isWidget()))
        return false;
      if (view)
        (widgets || (widgets = [])).push(view);
    }
    if (widgets)
      for (let w of widgets) {
        let override = w.overrideDOMText;
        if (override === null || override === void 0 ? void 0 : override.length)
          return false;
      }
    return true;
  }
  function domBoundsAround(tile, from, to, offset) {
    if (tile.isComposite()) {
      let fromI = -1, fromStart = -1, toI = -1, toEnd = -1;
      for (let i2 = 0, pos = offset, prevEnd = offset; i2 < tile.children.length; i2++) {
        let child = tile.children[i2], end = pos + child.length;
        if (pos < from && end > to)
          return domBoundsAround(child, from, to, pos);
        if (end >= from && fromI == -1) {
          fromI = i2;
          fromStart = pos;
        }
        if (pos > to && child.dom.parentNode == tile.dom) {
          toI = i2;
          toEnd = prevEnd;
          break;
        }
        prevEnd = end;
        pos = end + child.breakAfter;
      }
      return {
        from: fromStart,
        to: toEnd < 0 ? offset + tile.length : toEnd,
        startDOM: (fromI ? tile.children[fromI - 1].dom.nextSibling : null) || tile.dom.firstChild,
        endDOM: toI < tile.children.length && toI >= 0 ? tile.children[toI].dom : null
      };
    } else if (tile.isText()) {
      return { from: offset, to: offset + tile.length, startDOM: tile.dom, endDOM: tile.dom.nextSibling };
    } else {
      return null;
    }
  }
  function applyDOMChange(view, domChange) {
    let change;
    let { newSel } = domChange, { state } = view, sel = state.selection.main;
    let lastKey = view.inputState.lastKeyTime > Date.now() - 100 ? view.inputState.lastKeyCode : -1;
    if (domChange.bounds) {
      let { from, to } = domChange.bounds;
      let preferredPos = sel.from, preferredSide = null;
      if (lastKey === 8 || browser.android && domChange.text.length < to - from) {
        preferredPos = sel.to;
        preferredSide = "end";
      }
      let cmp = state.doc.sliceString(from, to, LineBreakPlaceholder), selEnd, diff;
      if (!sel.empty && sel.from >= from && sel.to <= to && (domChange.typeOver || cmp != domChange.text) && cmp.slice(0, sel.from - from) == domChange.text.slice(0, sel.from - from) && cmp.slice(sel.to - from) == domChange.text.slice(selEnd = domChange.text.length - (cmp.length - (sel.to - from)))) {
        change = {
          from: sel.from,
          to: sel.to,
          insert: Text.of(domChange.text.slice(sel.from - from, selEnd).split(LineBreakPlaceholder))
        };
      } else if (diff = findDiff(cmp, domChange.text, preferredPos - from, preferredSide)) {
        if (browser.chrome && lastKey == 13 && diff.toB == diff.from + 2 && domChange.text.slice(diff.from, diff.toB) == LineBreakPlaceholder + LineBreakPlaceholder)
          diff.toB--;
        change = {
          from: from + diff.from,
          to: from + diff.toA,
          insert: Text.of(domChange.text.slice(diff.from, diff.toB).split(LineBreakPlaceholder))
        };
      }
    } else if (newSel && (!view.hasFocus && state.facet(editable) || sameSelPos(newSel, sel))) {
      newSel = null;
    }
    if (!change && !newSel)
      return false;
    if ((browser.mac || browser.android) && change && change.from == change.to && change.from == sel.head - 1 && /^\. ?$/.test(change.insert.toString()) && view.contentDOM.getAttribute("autocorrect") == "off") {
      if (newSel && change.insert.length == 2)
        newSel = EditorSelection.single(newSel.main.anchor - 1, newSel.main.head - 1);
      change = { from: change.from, to: change.to, insert: Text.of([change.insert.toString().replace(".", " ")]) };
    } else if (state.doc.lineAt(sel.from).to < sel.to && view.docView.lineHasWidget(sel.to) && view.inputState.insertingTextAt > Date.now() - 50) {
      change = {
        from: sel.from,
        to: sel.to,
        insert: state.toText(view.inputState.insertingText)
      };
    } else if (browser.chrome && change && change.from == change.to && change.from == sel.head && change.insert.toString() == "\n " && view.lineWrapping) {
      if (newSel)
        newSel = EditorSelection.single(newSel.main.anchor - 1, newSel.main.head - 1);
      change = { from: sel.from, to: sel.to, insert: Text.of([" "]) };
    }
    if (change) {
      return applyDOMChangeInner(view, change, newSel, lastKey);
    } else if (newSel && !sameSelPos(newSel, sel)) {
      let scrollIntoView2 = false, userEvent = "select";
      if (view.inputState.lastSelectionTime > Date.now() - 50) {
        if (view.inputState.lastSelectionOrigin == "select")
          scrollIntoView2 = true;
        userEvent = view.inputState.lastSelectionOrigin;
        if (userEvent == "select.pointer")
          newSel = skipAtomsForSelection(state.facet(atomicRanges).map((f) => f(view)), newSel);
      }
      view.dispatch({ selection: newSel, scrollIntoView: scrollIntoView2, userEvent });
      return true;
    } else {
      return false;
    }
  }
  function applyDOMChangeInner(view, change, newSel, lastKey = -1) {
    if (browser.ios && view.inputState.flushIOSKey(change))
      return true;
    let sel = view.state.selection.main;
    if (browser.android && (change.to == sel.to && // GBoard will sometimes remove a space it just inserted
    // after a completion when you press enter
    (change.from == sel.from || change.from == sel.from - 1 && view.state.sliceDoc(change.from, sel.from) == " ") && change.insert.length == 1 && change.insert.lines == 2 && dispatchKey(view.contentDOM, "Enter", 13) || (change.from == sel.from - 1 && change.to == sel.to && change.insert.length == 0 || lastKey == 8 && change.insert.length < change.to - change.from && change.to > sel.head) && dispatchKey(view.contentDOM, "Backspace", 8) || change.from == sel.from && change.to == sel.to + 1 && change.insert.length == 0 && dispatchKey(view.contentDOM, "Delete", 46)))
      return true;
    let text = change.insert.toString();
    if (view.inputState.composing >= 0)
      view.inputState.composing++;
    let defaultTr;
    let defaultInsert = () => defaultTr || (defaultTr = applyDefaultInsert(view, change, newSel));
    if (!view.state.facet(inputHandler).some((h) => h(view, change.from, change.to, text, defaultInsert)))
      view.dispatch(defaultInsert());
    return true;
  }
  function applyDefaultInsert(view, change, newSel) {
    let tr, startState = view.state, sel = startState.selection.main, inAtomic = -1;
    if (change.from == change.to && change.from < sel.from || change.from > sel.to) {
      let side = change.from < sel.from ? -1 : 1, pos = side < 0 ? sel.from : sel.to;
      let moved = skipAtomicRanges(startState.facet(atomicRanges).map((f) => f(view)), pos, side);
      if (change.from == moved)
        inAtomic = moved;
    }
    if (inAtomic > -1) {
      tr = {
        changes: change,
        selection: EditorSelection.cursor(change.from + change.insert.length, -1)
      };
    } else if (change.from >= sel.from && change.to <= sel.to && change.to - change.from >= (sel.to - sel.from) / 3 && (!newSel || newSel.main.empty && newSel.main.from == change.from + change.insert.length) && view.inputState.composing < 0) {
      let before = sel.from < change.from ? startState.sliceDoc(sel.from, change.from) : "";
      let after = sel.to > change.to ? startState.sliceDoc(change.to, sel.to) : "";
      tr = startState.replaceSelection(view.state.toText(before + change.insert.sliceString(0, void 0, view.state.lineBreak) + after));
    } else {
      let changes = startState.changes(change);
      let mainSel = newSel && newSel.main.to <= changes.newLength ? newSel.main : void 0;
      if (startState.selection.ranges.length > 1 && (view.inputState.composing >= 0 || view.inputState.compositionPendingChange) && change.to <= sel.to + 10 && change.to >= sel.to - 10) {
        let replaced = view.state.sliceDoc(change.from, change.to);
        let compositionRange, composition = newSel && findCompositionNode(view, newSel.main.head);
        if (composition) {
          let dLen = change.insert.length - (change.to - change.from);
          compositionRange = { from: composition.from, to: composition.to - dLen };
        } else {
          compositionRange = view.state.doc.lineAt(sel.head);
        }
        let offset = sel.to - change.to;
        tr = startState.changeByRange((range) => {
          if (range.from == sel.from && range.to == sel.to)
            return { changes, range: mainSel || range.map(changes) };
          let to = range.to - offset, from = to - replaced.length;
          if (view.state.sliceDoc(from, to) != replaced || // Unfortunately, there's no way to make multiple
          // changes in the same node work without aborting
          // composition, so cursors in the composition range are
          // ignored.
          to >= compositionRange.from && from <= compositionRange.to)
            return { range };
          let rangeChanges = startState.changes({ from, to, insert: change.insert }), selOff = range.to - sel.to;
          return {
            changes: rangeChanges,
            range: !mainSel ? range.map(rangeChanges) : EditorSelection.range(Math.max(0, mainSel.anchor + selOff), Math.max(0, mainSel.head + selOff))
          };
        });
      } else {
        tr = {
          changes,
          selection: mainSel && startState.selection.replaceRange(mainSel)
        };
      }
    }
    let userEvent = "input.type";
    if (view.composing || view.inputState.compositionPendingChange && view.inputState.compositionEndedAt > Date.now() - 50) {
      view.inputState.compositionPendingChange = false;
      userEvent += ".compose";
      if (view.inputState.compositionFirstChange) {
        userEvent += ".start";
        view.inputState.compositionFirstChange = false;
      }
    }
    return startState.update(tr, { userEvent, scrollIntoView: true });
  }
  function findDiff(a2, b, preferredPos, preferredSide) {
    let minLen = Math.min(a2.length, b.length);
    let from = 0;
    while (from < minLen && a2.charCodeAt(from) == b.charCodeAt(from))
      from++;
    if (from == minLen && a2.length == b.length)
      return null;
    let toA = a2.length, toB = b.length;
    while (toA > 0 && toB > 0 && a2.charCodeAt(toA - 1) == b.charCodeAt(toB - 1)) {
      toA--;
      toB--;
    }
    if (preferredSide == "end") {
      let adjust = Math.max(0, from - Math.min(toA, toB));
      preferredPos -= toA + adjust - from;
    }
    if (toA < from && a2.length < b.length) {
      let move = preferredPos <= from && preferredPos >= toA ? from - preferredPos : 0;
      from -= move;
      toB = from + (toB - toA);
      toA = from;
    } else if (toB < from) {
      let move = preferredPos <= from && preferredPos >= toB ? from - preferredPos : 0;
      from -= move;
      toA = from + (toA - toB);
      toB = from;
    }
    return { from, toA, toB };
  }
  function selectionPoints(view) {
    let result = [];
    if (view.root.activeElement != view.contentDOM)
      return result;
    let { anchorNode, anchorOffset, focusNode, focusOffset } = view.observer.selectionRange;
    if (anchorNode) {
      result.push(new DOMPoint(anchorNode, anchorOffset));
      if (focusNode != anchorNode || focusOffset != anchorOffset)
        result.push(new DOMPoint(focusNode, focusOffset));
    }
    return result;
  }
  function selectionFromPoints(points, base2) {
    if (points.length == 0)
      return null;
    let anchor = points[0].pos, head = points.length == 2 ? points[1].pos : anchor;
    return anchor < 0 || head < 0 ? null : anchor == head ? EditorSelection.create([EditorSelection.cursor(head + base2, -1)]) : EditorSelection.single(anchor + base2, head + base2);
  }
  function sameSelPos(selection, range) {
    return range.head == selection.main.head && range.anchor == selection.main.anchor;
  }
  function iosVirtualKeyboardOpen(win) {
    if (!win.visualViewport)
      return false;
    return win.visualViewport.height * win.visualViewport.scale / win.document.documentElement.clientHeight < 0.85;
  }
  function bindHandler(plugin, handler) {
    return (view, event) => {
      try {
        return handler.call(plugin, event, view);
      } catch (e) {
        logException(view.state, e);
      }
    };
  }
  function computeHandlers(plugins) {
    let result = /* @__PURE__ */ Object.create(null);
    function record(type) {
      return result[type] || (result[type] = { observers: [], handlers: [] });
    }
    for (let plugin of plugins) {
      let spec = plugin.spec, handlers2 = spec && spec.plugin.domEventHandlers, observers2 = spec && spec.plugin.domEventObservers;
      if (handlers2)
        for (let type in handlers2) {
          let f = handlers2[type];
          if (f)
            record(type).handlers.push(bindHandler(plugin.value, f));
        }
      if (observers2)
        for (let type in observers2) {
          let f = observers2[type];
          if (f)
            record(type).observers.push(bindHandler(plugin.value, f));
        }
    }
    for (let type in handlers)
      record(type).handlers.push(handlers[type]);
    for (let type in observers)
      record(type).observers.push(observers[type]);
    return result;
  }
  function dragScrollSpeed(dist2) {
    return Math.max(0, dist2) * 0.7 + 8;
  }
  function dist(a2, b) {
    return Math.max(Math.abs(a2.clientX - b.clientX), Math.abs(a2.clientY - b.clientY));
  }
  function addsSelectionRange(view, event) {
    let facet = view.state.facet(clickAddsSelectionRange);
    return facet.length ? facet[0](event) : browser.mac ? event.metaKey : event.ctrlKey;
  }
  function dragMovesSelection(view, event) {
    let facet = view.state.facet(dragMovesSelection$1);
    return facet.length ? facet[0](event) : browser.mac ? !event.altKey : !event.ctrlKey;
  }
  function isInPrimarySelection(view, event) {
    let { main } = view.state.selection;
    if (main.empty)
      return false;
    let sel = getSelection(view.root);
    if (!sel || sel.rangeCount == 0)
      return true;
    let rects = sel.getRangeAt(0).getClientRects();
    for (let i2 = 0; i2 < rects.length; i2++) {
      let rect = rects[i2];
      if (rect.left <= event.clientX && rect.right >= event.clientX && rect.top <= event.clientY && rect.bottom >= event.clientY)
        return true;
    }
    return false;
  }
  function eventBelongsToEditor(view, event) {
    if (!event.bubbles)
      return true;
    if (event.defaultPrevented)
      return false;
    for (let node = event.target, tile; node != view.contentDOM; node = node.parentNode)
      if (!node || node.nodeType == 11 || (tile = Tile.get(node)) && tile.isWidget() && !tile.isHidden && tile.widget.ignoreEvent(event))
        return false;
    return true;
  }
  function capturePaste(view) {
    let parent = view.dom.parentNode;
    if (!parent)
      return;
    let target = parent.appendChild(document.createElement("textarea"));
    target.style.cssText = "position: fixed; left: -10000px; top: 10px";
    target.focus();
    setTimeout(() => {
      view.focus();
      target.remove();
      doPaste(view, target.value);
    }, 50);
  }
  function textFilter(state, facet, text) {
    for (let filter of state.facet(facet))
      text = filter(text, state);
    return text;
  }
  function doPaste(view, input) {
    input = textFilter(view.state, clipboardInputFilter, input);
    let { state } = view, changes, i2 = 1, text = state.toText(input);
    let byLine = text.lines == state.selection.ranges.length;
    let linewise = lastLinewiseCopy != null && state.selection.ranges.every((r) => r.empty) && lastLinewiseCopy == text.toString();
    if (linewise) {
      let lastLine = -1;
      changes = state.changeByRange((range) => {
        let line = state.doc.lineAt(range.from);
        if (line.from == lastLine)
          return { range };
        lastLine = line.from;
        let insert2 = state.toText((byLine ? text.line(i2++).text : input) + state.lineBreak);
        return {
          changes: { from: line.from, insert: insert2 },
          range: EditorSelection.cursor(range.from + insert2.length, -1)
        };
      });
    } else if (byLine) {
      changes = state.changeByRange((range) => {
        let line = text.line(i2++);
        return {
          changes: { from: range.from, to: range.to, insert: line.text },
          range: EditorSelection.cursor(range.from + line.length, -1)
        };
      });
    } else {
      changes = state.replaceSelection(text);
    }
    view.dispatch(changes, {
      userEvent: "input.paste",
      scrollIntoView: true
    });
  }
  function rangeForClick(view, pos, bias, type) {
    if (type == 1) {
      return EditorSelection.cursor(pos, bias);
    } else if (type == 2) {
      return groupAt(view.state, pos, bias);
    } else {
      let visual = view.docView.lineAt(pos, bias), line = view.state.doc.lineAt(visual ? visual.posAtEnd : pos);
      let from = visual ? visual.posAtStart : line.from, to = visual ? visual.posAtEnd : line.to;
      if (to < view.state.doc.length && to == line.to)
        to++;
      return EditorSelection.undirectionalRange(from, to);
    }
  }
  function getClickType(event) {
    if (!BadMouseDetail)
      return event.detail;
    let last2 = lastMouseDown, lastTime = lastMouseDownTime;
    lastMouseDown = event;
    lastMouseDownTime = Date.now();
    return lastMouseDownCount = !last2 || lastTime > Date.now() - 400 && Math.abs(last2.clientX - event.clientX) < 2 && Math.abs(last2.clientY - event.clientY) < 2 ? (lastMouseDownCount + 1) % 3 : 1;
  }
  function basicMouseSelection(view, event) {
    let start = view.posAndSideAtCoords({ x: event.clientX, y: event.clientY }, false), type = getClickType(event);
    let startSel = view.state.selection;
    return {
      update(update) {
        if (update.docChanged) {
          start.pos = update.changes.mapPos(start.pos);
          startSel = startSel.map(update.changes);
        }
      },
      get(event2, extend, multiple) {
        let cur = view.posAndSideAtCoords({ x: event2.clientX, y: event2.clientY }, false), removed;
        let range = rangeForClick(view, cur.pos, cur.assoc, type);
        if (start.pos != cur.pos && !extend) {
          let startRange = rangeForClick(view, start.pos, start.assoc, type);
          let from = Math.min(startRange.from, range.from), to = Math.max(startRange.to, range.to);
          range = from < range.from ? EditorSelection.range(from, to, range.assoc) : EditorSelection.range(to, from, range.assoc);
        }
        if (extend)
          return startSel.replaceRange(startSel.main.extend(range.from, range.to, range.assoc));
        else if (multiple && type == 1 && startSel.ranges.length > 1 && (removed = removeRangeAround(startSel, cur.pos)))
          return removed;
        else if (multiple)
          return startSel.addRange(range);
        else
          return EditorSelection.create([range]);
      }
    };
  }
  function removeRangeAround(sel, pos) {
    for (let i2 = 0; i2 < sel.ranges.length; i2++) {
      let { from, to } = sel.ranges[i2];
      if (from <= pos && to >= pos)
        return EditorSelection.create(sel.ranges.slice(0, i2).concat(sel.ranges.slice(i2 + 1)), sel.mainIndex == i2 ? 0 : sel.mainIndex - (sel.mainIndex > i2 ? 1 : 0));
    }
    return null;
  }
  function dropText(view, event, text, direct) {
    text = textFilter(view.state, clipboardInputFilter, text);
    if (!text)
      return;
    let dropPos = view.posAtCoords({ x: event.clientX, y: event.clientY }, false);
    let { draggedContent } = view.inputState;
    let del = direct && draggedContent && dragMovesSelection(view, event) ? { from: draggedContent.from, to: draggedContent.to } : null;
    let ins = { from: dropPos, insert: text };
    let changes = view.state.changes(del ? [del, ins] : ins);
    view.focus();
    view.dispatch({
      changes,
      selection: { anchor: changes.mapPos(dropPos, -1), head: changes.mapPos(dropPos, 1) },
      userEvent: del ? "move.drop" : "input.drop"
    });
    view.inputState.draggedContent = null;
  }
  function captureCopy(view, text) {
    let parent = view.dom.parentNode;
    if (!parent)
      return;
    let target = parent.appendChild(document.createElement("textarea"));
    target.style.cssText = "position: fixed; left: -10000px; top: 10px";
    target.value = text;
    target.focus();
    target.selectionEnd = text.length;
    target.selectionStart = 0;
    setTimeout(() => {
      target.remove();
      view.focus();
    }, 50);
  }
  function copiedRange(state) {
    let content2 = [], ranges = [], linewise = false;
    for (let range of state.selection.ranges)
      if (!range.empty) {
        content2.push(state.sliceDoc(range.from, range.to));
        ranges.push(range);
      }
    if (!content2.length) {
      let upto = -1;
      for (let { from } of state.selection.ranges) {
        let line = state.doc.lineAt(from);
        if (line.number > upto) {
          content2.push(line.text);
          ranges.push({ from: line.from, to: Math.min(state.doc.length, line.to + 1) });
        }
        upto = line.number;
      }
      linewise = true;
    }
    return { text: textFilter(state, clipboardOutputFilter, content2.join(state.lineBreak)), ranges, linewise };
  }
  function focusChangeTransaction(state, focus) {
    let effects = [];
    for (let getEffect of state.facet(focusChangeEffect)) {
      let effect = getEffect(state, focus);
      if (effect)
        effects.push(effect);
    }
    return effects.length ? state.update({ effects, annotations: isFocusChange.of(true) }) : null;
  }
  function updateForFocusChange(view) {
    setTimeout(() => {
      let focus = view.hasFocus;
      if (focus != view.inputState.notifiedFocused) {
        let tr = focusChangeTransaction(view.state, focus);
        if (tr)
          view.dispatch(tr);
        else
          view.update([]);
      }
    }, 10);
  }
  function firefoxCopyCutHack(doc2) {
    if (!appliedFirefoxHack.has(doc2)) {
      appliedFirefoxHack.add(doc2);
      doc2.addEventListener("copy", () => {
      });
      doc2.addEventListener("cut", () => {
      });
    }
  }
  function clearHeightChangeFlag() {
    heightChangeFlag = false;
  }
  function replace(old, val) {
    if (old == val)
      return old;
    if (old.constructor != val.constructor)
      heightChangeFlag = true;
    return val;
  }
  function mergeGaps(nodes, around) {
    let before, after;
    if (nodes[around] == null && (before = nodes[around - 1]) instanceof HeightMapGap && (after = nodes[around + 1]) instanceof HeightMapGap)
      nodes.splice(around - 1, 3, new HeightMapGap(before.length + 1 + after.length));
  }
  function heightRelevantDecoChanges(a2, b, diff) {
    let comp = new DecorationComparator2();
    RangeSet.compare(a2, b, diff, comp, 0);
    return comp.changes;
  }
  function visiblePixelRange(dom, paddingTop) {
    let rect = dom.getBoundingClientRect();
    let doc2 = dom.ownerDocument, win = doc2.defaultView || window;
    let left = Math.max(0, rect.left), right = Math.min(win.innerWidth, rect.right);
    let top2 = Math.max(0, rect.top), bottom = Math.min(win.innerHeight, rect.bottom);
    for (let parent = dom.parentNode; parent && parent != doc2.body; ) {
      if (parent.nodeType == 1) {
        let elt = parent;
        let style = window.getComputedStyle(elt);
        if ((elt.scrollHeight > elt.clientHeight || elt.scrollWidth > elt.clientWidth) && style.overflow != "visible") {
          let parentRect = elt.getBoundingClientRect();
          left = Math.max(left, parentRect.left);
          right = Math.min(right, parentRect.right);
          top2 = Math.max(top2, parentRect.top);
          bottom = Math.min(parent == dom.parentNode ? win.innerHeight : bottom, parentRect.bottom);
        }
        parent = style.position == "absolute" || style.position == "fixed" ? elt.offsetParent : elt.parentNode;
      } else if (parent.nodeType == 11) {
        parent = parent.host;
      } else {
        break;
      }
    }
    return {
      left: left - rect.left,
      right: Math.max(left, right) - rect.left,
      top: top2 - (rect.top + paddingTop),
      bottom: Math.max(top2, bottom) - (rect.top + paddingTop)
    };
  }
  function inWindow(elt) {
    let rect = elt.getBoundingClientRect(), win = elt.ownerDocument.defaultView || window;
    return rect.left < win.innerWidth && rect.right > 0 && rect.top < win.innerHeight && rect.bottom > 0;
  }
  function fullPixelRange(dom, paddingTop) {
    let rect = dom.getBoundingClientRect();
    return {
      left: 0,
      right: rect.right - rect.left,
      top: paddingTop,
      bottom: rect.bottom - (rect.top + paddingTop)
    };
  }
  function lineStructure(from, to, stateDeco) {
    let ranges = [], pos = from, total = 0;
    RangeSet.spans(stateDeco, from, to, {
      span() {
      },
      point(from2, to2) {
        if (from2 > pos) {
          ranges.push({ from: pos, to: from2 });
          total += from2 - pos;
        }
        pos = to2;
      }
    }, 20);
    if (pos < to) {
      ranges.push({ from: pos, to });
      total += to - pos;
    }
    return { total, ranges };
  }
  function findPosition({ total, ranges }, ratio) {
    if (ratio <= 0)
      return ranges[0].from;
    if (ratio >= 1)
      return ranges[ranges.length - 1].to;
    let dist2 = Math.floor(total * ratio);
    for (let i2 = 0; ; i2++) {
      let { from, to } = ranges[i2], size = to - from;
      if (dist2 <= size)
        return from + dist2;
      dist2 -= size;
    }
  }
  function findFraction(structure, pos) {
    let counted = 0;
    for (let { from, to } of structure.ranges) {
      if (pos <= to) {
        counted += pos - from;
        break;
      }
      counted += to - from;
    }
    return counted / structure.total;
  }
  function find(array, f) {
    for (let val of array)
      if (f(val))
        return val;
    return void 0;
  }
  function staticDeco(state) {
    let deco = state.facet(decorations).filter((d) => typeof d != "function");
    let outer = state.facet(outerDecorations).filter((d) => typeof d != "function");
    if (outer.length)
      deco.push(RangeSet.join(outer));
    return deco;
  }
  function scaleBlock(block, scaler) {
    if (scaler.scale == 1)
      return block;
    let bTop = scaler.toDOM(block.top), bBottom = scaler.toDOM(block.bottom);
    return new BlockInfo(block.from, block.length, bTop, bBottom - bTop, Array.isArray(block._content) ? block._content.map((b) => scaleBlock(b, scaler)) : block._content);
  }
  function buildTheme(main, spec, scopes) {
    return new StyleModule(spec, {
      finish(sel) {
        return /&/.test(sel) ? sel.replace(/&\w*/, (m) => {
          if (m == "&")
            return main;
          if (!scopes || !scopes[m])
            throw new RangeError(`Unsupported selector: ${m}`);
          return scopes[m];
        }) : main + " " + sel;
      }
    });
  }
  function findChild(tile, dom, dir) {
    while (dom) {
      let curTile = Tile.get(dom);
      if (curTile && curTile.parent == tile)
        return curTile;
      let parent = dom.parentNode;
      dom = parent != tile.dom ? parent : dir > 0 ? dom.nextSibling : dom.previousSibling;
    }
    return null;
  }
  function buildSelectionRangeFromRange(view, range) {
    let anchorNode = range.startContainer, anchorOffset = range.startOffset;
    let focusNode = range.endContainer, focusOffset = range.endOffset;
    let curAnchor = view.docView.domAtPos(view.state.selection.main.anchor, 1);
    if (isEquivalentPosition(curAnchor.node, curAnchor.offset, focusNode, focusOffset))
      [anchorNode, anchorOffset, focusNode, focusOffset] = [focusNode, focusOffset, anchorNode, anchorOffset];
    return { anchorNode, anchorOffset, focusNode, focusOffset };
  }
  function safariSelectionRangeHack(view, selection) {
    if (selection.getComposedRanges) {
      let range = selection.getComposedRanges(view.root)[0];
      if (range)
        return buildSelectionRangeFromRange(view, range);
    }
    let found = null;
    function read(event) {
      event.preventDefault();
      event.stopImmediatePropagation();
      found = event.getTargetRanges()[0];
    }
    view.contentDOM.addEventListener("beforeinput", read, true);
    view.dom.ownerDocument.execCommand("indent");
    view.contentDOM.removeEventListener("beforeinput", read, true);
    return found ? buildSelectionRangeFromRange(view, found) : null;
  }
  function attrsFromFacet(view, facet, base2) {
    for (let sources = view.state.facet(facet), i2 = sources.length - 1; i2 >= 0; i2--) {
      let source = sources[i2], value = typeof source == "function" ? source(view) : source;
      if (value)
        combineAttrs(value, base2);
    }
    return base2;
  }
  function normalizeKeyName(name2, platform) {
    const parts = name2.split(/-(?!$)/);
    let result = parts[parts.length - 1];
    if (result == "Space")
      result = " ";
    let alt, ctrl, shift2, meta2;
    for (let i2 = 0; i2 < parts.length - 1; ++i2) {
      const mod = parts[i2];
      if (/^(cmd|meta|m)$/i.test(mod))
        meta2 = true;
      else if (/^a(lt)?$/i.test(mod))
        alt = true;
      else if (/^(c|ctrl|control)$/i.test(mod))
        ctrl = true;
      else if (/^s(hift)?$/i.test(mod))
        shift2 = true;
      else if (/^mod$/i.test(mod)) {
        if (platform == "mac")
          meta2 = true;
        else
          ctrl = true;
      } else
        throw new Error("Unrecognized modifier name: " + mod);
    }
    if (alt)
      result = "Alt-" + result;
    if (ctrl)
      result = "Ctrl-" + result;
    if (meta2)
      result = "Meta-" + result;
    if (shift2)
      result = "Shift-" + result;
    return result;
  }
  function modifiers(name2, event, shift2) {
    if (event.altKey)
      name2 = "Alt-" + name2;
    if (event.ctrlKey)
      name2 = "Ctrl-" + name2;
    if (event.metaKey)
      name2 = "Meta-" + name2;
    if (shift2 !== false && event.shiftKey)
      name2 = "Shift-" + name2;
    return name2;
  }
  function getKeymap(state) {
    let bindings = state.facet(keymap);
    let map = Keymaps.get(bindings);
    if (!map)
      Keymaps.set(bindings, map = buildKeymap(bindings.reduce((a2, b) => a2.concat(b), [])));
    return map;
  }
  function buildKeymap(bindings, platform = currentPlatform) {
    let bound = /* @__PURE__ */ Object.create(null);
    let isPrefix = /* @__PURE__ */ Object.create(null);
    let checkPrefix = (name2, is) => {
      let current = isPrefix[name2];
      if (current == null)
        isPrefix[name2] = is;
      else if (current != is)
        throw new Error("Key binding " + name2 + " is used both as a regular binding and as a multi-stroke prefix");
    };
    let add = (scope, key, command, preventDefault, stopPropagation) => {
      var _a2, _b;
      let scopeObj = bound[scope] || (bound[scope] = /* @__PURE__ */ Object.create(null));
      let parts = key.split(/ (?!$)/).map((k) => normalizeKeyName(k, platform));
      for (let i2 = 1; i2 < parts.length; i2++) {
        let prefix = parts.slice(0, i2).join(" ");
        checkPrefix(prefix, true);
        if (!scopeObj[prefix])
          scopeObj[prefix] = {
            preventDefault: true,
            stopPropagation: false,
            run: [(view) => {
              let ourObj = storedPrefix = { view, prefix, scope };
              setTimeout(() => {
                if (storedPrefix == ourObj)
                  storedPrefix = null;
              }, PrefixTimeout);
              return true;
            }]
          };
      }
      let full = parts.join(" ");
      checkPrefix(full, false);
      let binding = scopeObj[full] || (scopeObj[full] = {
        preventDefault: false,
        stopPropagation: false,
        run: ((_b = (_a2 = scopeObj._any) === null || _a2 === void 0 ? void 0 : _a2.run) === null || _b === void 0 ? void 0 : _b.slice()) || []
      });
      if (command)
        binding.run.push(command);
      if (preventDefault)
        binding.preventDefault = true;
      if (stopPropagation)
        binding.stopPropagation = true;
    };
    for (let b of bindings) {
      let scopes = b.scope ? b.scope.split(" ") : ["editor"];
      if (b.any)
        for (let scope of scopes) {
          let scopeObj = bound[scope] || (bound[scope] = /* @__PURE__ */ Object.create(null));
          if (!scopeObj._any)
            scopeObj._any = { preventDefault: false, stopPropagation: false, run: [] };
          let { any } = b;
          for (let key in scopeObj)
            scopeObj[key].run.push((view) => any(view, currentKeyEvent));
        }
      let name2 = b[platform] || b.key;
      if (!name2)
        continue;
      for (let scope of scopes) {
        add(scope, name2, b.run, b.preventDefault, b.stopPropagation);
        if (b.shift)
          add(scope, "Shift-" + name2, b.shift, b.preventDefault, b.stopPropagation);
      }
    }
    return bound;
  }
  function runHandlers(map, event, view, scope) {
    currentKeyEvent = event;
    let name2 = keyName(event);
    let charCode = codePointAt2(name2, 0), isChar = codePointSize2(charCode) == name2.length && name2 != " ";
    let prefix = "", handled = false, prevented = false, stopPropagation = false;
    if (storedPrefix && storedPrefix.view == view && storedPrefix.scope == scope) {
      prefix = storedPrefix.prefix + " ";
      if (modifierCodes.indexOf(event.keyCode) < 0) {
        prevented = true;
        storedPrefix = null;
      }
    }
    let ran = /* @__PURE__ */ new Set();
    let runFor = (binding) => {
      if (binding) {
        for (let cmd of binding.run)
          if (!ran.has(cmd)) {
            ran.add(cmd);
            if (cmd(view)) {
              if (binding.stopPropagation)
                stopPropagation = true;
              return true;
            }
          }
        if (binding.preventDefault) {
          if (binding.stopPropagation)
            stopPropagation = true;
          prevented = true;
        }
      }
      return false;
    };
    let scopeObj = map[scope], baseName, shiftName;
    if (scopeObj) {
      if (runFor(scopeObj[prefix + modifiers(name2, event, !isChar)])) {
        handled = true;
      } else if (isChar && (event.altKey || event.metaKey || event.ctrlKey) && // Ctrl-Alt may be used for AltGr on Windows
      !(browser.windows && event.ctrlKey && event.altKey) && // Alt-combinations on macOS tend to be typed characters
      !(browser.mac && event.altKey && !(event.ctrlKey || event.metaKey)) && (baseName = base[event.keyCode]) && baseName != name2) {
        if (runFor(scopeObj[prefix + modifiers(baseName, event, true)])) {
          handled = true;
        } else if (event.shiftKey && (shiftName = shift[event.keyCode]) != name2 && shiftName != baseName && runFor(scopeObj[prefix + modifiers(shiftName, event, false)])) {
          handled = true;
        }
      } else if (isChar && event.shiftKey && runFor(scopeObj[prefix + modifiers(name2, event, true)])) {
        handled = true;
      }
      if (!handled && runFor(scopeObj._any))
        handled = true;
    }
    if (prevented)
      handled = true;
    if (handled && stopPropagation)
      event.stopPropagation();
    currentKeyEvent = null;
    return handled;
  }
  function getBase(view) {
    let rect = view.scrollDOM.getBoundingClientRect();
    let left = view.textDirection == Direction.LTR ? rect.left : rect.right - view.scrollDOM.clientWidth * view.scaleX;
    return { left: left - view.scrollDOM.scrollLeft * view.scaleX, top: rect.top - view.scrollDOM.scrollTop * view.scaleY };
  }
  function wrappedLine(view, pos, side, inside) {
    let coords = view.coordsAtPos(pos, side * 2);
    if (!coords)
      return inside;
    let editorRect = view.dom.getBoundingClientRect();
    let y = (coords.top + coords.bottom) / 2;
    let left = view.posAtCoords({ x: editorRect.left + 1, y });
    let right = view.posAtCoords({ x: editorRect.right - 1, y });
    if (left == null || right == null)
      return inside;
    return { from: Math.max(inside.from, Math.min(left, right)), to: Math.min(inside.to, Math.max(left, right)) };
  }
  function rectanglesForRange(view, className, range) {
    if (range.to <= view.viewport.from || range.from >= view.viewport.to)
      return [];
    let from = Math.max(range.from, view.viewport.from), to = Math.min(range.to, view.viewport.to);
    let ltr = view.textDirection == Direction.LTR;
    let content2 = view.contentDOM, contentRect = content2.getBoundingClientRect(), base2 = getBase(view);
    let lineElt = content2.querySelector(".cm-line"), lineStyle = lineElt && window.getComputedStyle(lineElt);
    let leftSide = contentRect.left + (lineStyle ? parseInt(lineStyle.paddingLeft) + Math.min(0, parseInt(lineStyle.textIndent)) : 0);
    let rightSide = contentRect.right - (lineStyle ? parseInt(lineStyle.paddingRight) : 0);
    let startBlock = blockAt(view, from, 1), endBlock = blockAt(view, to, -1);
    let visualStart = startBlock.type == BlockType.Text ? startBlock : null;
    let visualEnd = endBlock.type == BlockType.Text ? endBlock : null;
    if (visualStart && (view.lineWrapping || startBlock.widgetLineBreaks))
      visualStart = wrappedLine(view, from, 1, visualStart);
    if (visualEnd && (view.lineWrapping || endBlock.widgetLineBreaks))
      visualEnd = wrappedLine(view, to, -1, visualEnd);
    if (visualStart && visualEnd && visualStart.from == visualEnd.from && visualStart.to == visualEnd.to) {
      return pieces(drawForLine(range.from, range.to, visualStart));
    } else {
      let top2 = visualStart ? drawForLine(range.from, null, visualStart) : drawForWidget(startBlock, false);
      let bottom = visualEnd ? drawForLine(null, range.to, visualEnd) : drawForWidget(endBlock, true);
      let between = [];
      if ((visualStart || startBlock).to < (visualEnd || endBlock).from - (visualStart && visualEnd ? 1 : 0) || startBlock.widgetLineBreaks > 1 && top2.bottom + view.defaultLineHeight / 2 < bottom.top)
        between.push(piece(leftSide, top2.bottom, rightSide, bottom.top));
      else if (top2.bottom < bottom.top && view.elementAtHeight((top2.bottom + bottom.top) / 2).type == BlockType.Text)
        top2.bottom = bottom.top = (top2.bottom + bottom.top) / 2;
      return pieces(top2).concat(between).concat(pieces(bottom));
    }
    function piece(left, top2, right, bottom) {
      return new RectangleMarker(className, left - base2.left, top2 - base2.top, Math.max(0, right - left), bottom - top2);
    }
    function pieces({ top: top2, bottom, horizontal }) {
      let pieces2 = [];
      for (let i2 = 0; i2 < horizontal.length; i2 += 2)
        pieces2.push(piece(horizontal[i2], top2, horizontal[i2 + 1], bottom));
      return pieces2;
    }
    function drawForLine(from2, to2, line) {
      let top2 = 1e9, bottom = -1e9, horizontal = [];
      function addSpan(from3, fromOpen, to3, toOpen, dir) {
        let fromCoords = view.coordsAtPos(from3, from3 == line.to ? -2 : 2);
        let toCoords = view.coordsAtPos(to3, to3 == line.from ? 2 : -2);
        if (!fromCoords || !toCoords)
          return;
        top2 = Math.min(fromCoords.top, toCoords.top, top2);
        bottom = Math.max(fromCoords.bottom, toCoords.bottom, bottom);
        if (dir == Direction.LTR)
          horizontal.push(ltr && fromOpen ? leftSide : fromCoords.left, ltr && toOpen ? rightSide : toCoords.right);
        else
          horizontal.push(!ltr && toOpen ? leftSide : toCoords.left, !ltr && fromOpen ? rightSide : fromCoords.right);
      }
      let start = from2 !== null && from2 !== void 0 ? from2 : line.from, end = to2 !== null && to2 !== void 0 ? to2 : line.to;
      for (let r of view.visibleRanges)
        if (r.to > start && r.from < end) {
          for (let pos = Math.max(r.from, start), endPos = Math.min(r.to, end); ; ) {
            let docLine = view.state.doc.lineAt(pos);
            for (let span of view.bidiSpans(docLine)) {
              let spanFrom = span.from + docLine.from, spanTo = span.to + docLine.from;
              if (spanFrom >= endPos)
                break;
              if (spanTo > pos)
                addSpan(Math.max(spanFrom, pos), from2 == null && spanFrom <= start, Math.min(spanTo, endPos), to2 == null && spanTo >= end, span.dir);
            }
            pos = docLine.to + 1;
            if (pos >= endPos)
              break;
          }
        }
      if (horizontal.length == 0)
        addSpan(start, from2 == null, end, to2 == null, view.textDirection);
      return { top: top2, bottom, horizontal };
    }
    function drawForWidget(block, top2) {
      let y = contentRect.top + (top2 ? block.top : block.bottom);
      return { top: y, bottom: y, horizontal: [] };
    }
  }
  function sameMarker(a2, b) {
    return a2.constructor == b.constructor && a2.eq(b);
  }
  function layer(config) {
    return [
      ViewPlugin.define((v) => new LayerView(v, config)),
      layerOrder.of(config)
    ];
  }
  function drawSelection(config = {}) {
    return [
      selectionConfig.of(config),
      cursorLayer,
      selectionLayer,
      hideNativeSelection,
      nativeSelectionHidden.of(true)
    ];
  }
  function configChanged(update) {
    return update.startState.facet(selectionConfig) != update.state.facet(selectionConfig);
  }
  function setBlinkRate(state, dom) {
    dom.style.animationDuration = state.facet(selectionConfig).cursorBlinkRate + "ms";
  }
  function iterMatches(doc2, re, from, to, f) {
    re.lastIndex = 0;
    for (let cursor = doc2.iterRange(from, to), pos = from, m; !cursor.next().done; pos += cursor.value.length) {
      if (!cursor.lineBreak)
        while (m = re.exec(cursor.value))
          f(pos + m.index, m);
    }
  }
  function matchRanges(view, maxLength) {
    let visible = view.visibleRanges;
    if (visible.length == 1 && visible[0].from == view.viewport.from && visible[0].to == view.viewport.to)
      return visible;
    let result = [];
    for (let { from, to } of visible) {
      from = Math.max(view.state.doc.lineAt(from).from, from - maxLength);
      to = Math.min(view.state.doc.lineAt(to).to, to + maxLength);
      if (result.length && result[result.length - 1].to >= from)
        result[result.length - 1].to = to;
      else
        result.push({ from, to });
    }
    return result;
  }
  function supportsTabSize() {
    var _a2;
    if (_supportsTabSize == null && typeof document != "undefined" && document.body) {
      let styles = document.body.style;
      _supportsTabSize = ((_a2 = styles.tabSize) !== null && _a2 !== void 0 ? _a2 : styles.MozTabSize) != null;
    }
    return _supportsTabSize || false;
  }
  function highlightSpecialChars(config = {}) {
    return [specialCharConfig.of(config), specialCharPlugin()];
  }
  function specialCharPlugin() {
    return _plugin || (_plugin = ViewPlugin.fromClass(class {
      constructor(view) {
        this.view = view;
        this.decorations = Decoration.none;
        this.decorationCache = /* @__PURE__ */ Object.create(null);
        this.decorator = this.makeDecorator(view.state.facet(specialCharConfig));
        this.decorations = this.decorator.createDeco(view);
      }
      makeDecorator(conf) {
        return new MatchDecorator({
          regexp: conf.specialChars,
          decoration: (m, view, pos) => {
            let { doc: doc2 } = view.state;
            let code2 = codePointAt2(m[0], 0);
            if (code2 == 9) {
              let line = doc2.lineAt(pos);
              let size = view.state.tabSize, col = countColumn(line.text, size, pos - line.from);
              return Decoration.replace({
                widget: new TabWidget((size - col % size) * this.view.defaultCharacterWidth / this.view.scaleX)
              });
            }
            return this.decorationCache[code2] || (this.decorationCache[code2] = Decoration.replace({ widget: new SpecialCharWidget(conf, code2) }));
          },
          boundary: conf.replaceTabs ? void 0 : /[^]/
        });
      }
      update(update) {
        let conf = update.state.facet(specialCharConfig);
        if (update.startState.facet(specialCharConfig) != conf) {
          this.decorator = this.makeDecorator(conf);
          this.decorations = this.decorator.createDeco(update.view);
        } else {
          this.decorations = this.decorator.updateDeco(update, this.decorations);
        }
      }
    }, {
      decorations: (v) => v.decorations
    }));
  }
  function placeholder$1(code2) {
    if (code2 >= 32)
      return DefaultPlaceholder;
    if (code2 == 10)
      return "\u2424";
    return String.fromCharCode(9216 + code2);
  }
  function highlightActiveLine() {
    return activeLineHighlighter;
  }
  function rectangleFor(state, a2, b) {
    let startLine = Math.min(a2.line, b.line), endLine = Math.max(a2.line, b.line);
    let ranges = [];
    if (a2.off > MaxOff || b.off > MaxOff || a2.col < 0 || b.col < 0) {
      let startOff = Math.min(a2.off, b.off), endOff = Math.max(a2.off, b.off);
      for (let i2 = startLine; i2 <= endLine; i2++) {
        let line = state.doc.line(i2);
        if (line.length <= endOff)
          ranges.push(EditorSelection.range(line.from + startOff, line.to + endOff));
      }
    } else {
      let startCol = Math.min(a2.col, b.col), endCol = Math.max(a2.col, b.col);
      for (let i2 = startLine; i2 <= endLine; i2++) {
        let line = state.doc.line(i2);
        let start = findColumn(line.text, startCol, state.tabSize, true);
        if (start < 0) {
          ranges.push(EditorSelection.cursor(line.to));
        } else {
          let end = findColumn(line.text, endCol, state.tabSize);
          ranges.push(EditorSelection.range(line.from + start, line.from + end));
        }
      }
    }
    return ranges;
  }
  function absoluteColumn(view, x) {
    let ref = view.coordsAtPos(view.viewport.from);
    return ref ? Math.round(Math.abs((ref.left - x) / view.defaultCharacterWidth)) : -1;
  }
  function getPos(view, event) {
    let offset = view.posAtCoords({ x: event.clientX, y: event.clientY }, false);
    let line = view.state.doc.lineAt(offset), off = offset - line.from;
    let col = off > MaxOff ? -1 : off == line.length ? absoluteColumn(view, event.clientX) : countColumn(line.text, view.state.tabSize, offset - line.from);
    return { line: line.number, col, off };
  }
  function rectangleSelectionStyle(view, event) {
    let start = getPos(view, event), startSel = view.state.selection;
    if (!start)
      return null;
    return {
      update(update) {
        if (update.docChanged) {
          let newStart = update.changes.mapPos(update.startState.doc.line(start.line).from);
          let newLine = update.state.doc.lineAt(newStart);
          start = { line: newLine.number, col: start.col, off: Math.min(start.off, newLine.length) };
          startSel = startSel.map(update.changes);
        }
      },
      get(event2, _extend, multiple) {
        let cur = getPos(view, event2);
        if (!cur)
          return startSel;
        let ranges = rectangleFor(view.state, start, cur);
        if (!ranges.length)
          return startSel;
        if (multiple)
          return EditorSelection.create(ranges.concat(startSel.ranges));
        else
          return EditorSelection.create(ranges);
      }
    };
  }
  function rectangularSelection(options) {
    let filter = (options === null || options === void 0 ? void 0 : options.eventFilter) || ((e) => e.altKey && e.button == 0);
    return EditorView.mouseSelectionStyle.of((view, event) => filter(event) ? rectangleSelectionStyle(view, event) : null);
  }
  function gutters(config) {
    let result = [
      gutterView
    ];
    if (config && config.fixed === false)
      result.push(unfixGutters.of(true));
    return result;
  }
  function asArray2(val) {
    return Array.isArray(val) ? val : [val];
  }
  function advanceCursor(cursor, collect, pos) {
    while (cursor.value && cursor.from <= pos) {
      if (cursor.from == pos)
        collect.push(cursor.value);
      cursor.next();
    }
  }
  function sameMarkers(a2, b) {
    if (a2.length != b.length)
      return false;
    for (let i2 = 0; i2 < a2.length; i2++)
      if (!a2[i2].compare(b[i2]))
        return false;
    return true;
  }
  function formatNumber(view, number2) {
    return view.state.facet(lineNumberConfig).formatNumber(number2, view.state);
  }
  function lineNumbers(config = {}) {
    return [
      lineNumberConfig.of(config),
      gutters(),
      lineNumberGutter
    ];
  }
  function maxLineNumber(lines) {
    let last2 = 9;
    while (last2 < lines)
      last2 = last2 * 10 + 9;
    return last2;
  }
  function highlightActiveLineGutter() {
    return activeLineGutterHighlighter;
  }
  var nav, doc, ie_edge, ie_upto10, ie_11up, ie2, gecko, chrome, webkit, safari, ios, browser, noAttrs, WidgetType, BlockType, Decoration, MarkDecoration, LineDecoration, PointDecoration, BlockWrapper, DOMSelectionState, preventScrollSupported, scratchRange, DOMPos, Direction, LTR, RTL, LowTypes, ArabicTypes, Brackets, BracketStack, BidiRE, BidiSpan, types, movedOver, clickAddsSelectionRange, dragMovesSelection$1, mouseSelectionStyle, exceptionSink, updateListener, inputHandler, focusChangeEffect, clipboardInputFilter, clipboardOutputFilter, perLineTextDirection, nativeSelectionHidden, scrollHandler, ScrollTarget, scrollIntoView, setEditContextFormatting, editable, nextPluginID, viewPlugin, ViewPlugin, PluginInstance, editorAttributes, contentAttributes, decorations, blockWrappers, outerDecorations, atomicRanges, bidiIsolatedRanges, scrollMargins, styleModule, ChangedRange, ViewUpdate, noChildren, Tile, CompositeTile, DocTile, BlockWrapperTile, LineTile, MarkTile, TextTile, WidgetTile, WidgetBufferTile, TilePointer, OpenWrapper, TileBuilder, TextStream, buckets, TileCache, TileUpdate, lineBaseAttrs, NullWidget, BreakWidget, DocView, DecorationComparator$1, WrapperComparator, BlockGapWidget, PosAssoc, InlineCoordsScan, LineBreakPlaceholder, DOMReader, DOMPoint, DOMChange, InputState, PendingKeys, EmacsyPendingKeys, modifierCodes, dragScrollMargin, MouseSelection, handlers, observers, brokenClipboardAPI, BadMouseDetail, lastMouseDown, lastMouseDownCount, lastMouseDownTime, lastLinewiseCopy, isFocusChange, appliedFirefoxHack, wrappingWhiteSpace, heightChangeFlag, HeightOracle, MeasuredHeights, BlockInfo, QueryType, Epsilon, HeightMap, SpaceDeco, HeightMapBlock, HeightMapText, HeightMapGap, HeightMapBranch, relevantWidgetHeight, NodeBuilder, DecorationComparator2, LineGap, LineGapWidget, ViewState, Viewport, IdScaler, BigScaler, theme, darkTheme, baseThemeID, baseLightID, baseDarkID, lightDarkIDs, baseTheme$1, observeOptions, useCharData, DOMObserver, EditContextManager, EditorView, MaxBidiLine, BadMeasure, CachedOrder, currentPlatform, handleKeyEvents, keymap, Keymaps, storedPrefix, PrefixTimeout, currentKeyEvent, RectangleMarker, LayerView, layerOrder, selectionConfig, cursorLayer, selectionLayer, selectionBg, hideNativeSelection, MatchDecorator, UnicodeRegexpSupport, Specials, Names, _supportsTabSize, specialCharConfig, _plugin, DefaultPlaceholder, SpecialCharWidget, TabWidget, lineDeco, activeLineHighlighter, MaxOff, baseTheme, GutterMarker, gutterLineClass, gutterWidgetClass, activeGutters, unfixGutters, gutterView, UpdateContext, SingleGutterView, GutterElement, lineNumberMarkers, lineNumberWidgetMarker, lineNumberConfig, NumberMarker, lineNumberGutter, activeLineGutterMarker, activeLineGutterHighlighter;
  var init_dist2 = __esm({
    "node_modules/@codemirror/view/dist/index.js"() {
      init_dist();
      init_style_mod();
      init_w3c_keyname();
      init_crelt();
      nav = typeof navigator != "undefined" ? navigator : { userAgent: "", vendor: "", platform: "" };
      doc = typeof document != "undefined" ? document : { documentElement: { style: {} } };
      ie_edge = /* @__PURE__ */ /Edge\/(\d+)/.exec(nav.userAgent);
      ie_upto10 = /* @__PURE__ */ /MSIE \d/.test(nav.userAgent);
      ie_11up = /* @__PURE__ */ /Trident\/(?:[7-9]|\d{2,})\..*rv:(\d+)/.exec(nav.userAgent);
      ie2 = !!(ie_upto10 || ie_11up || ie_edge);
      gecko = !ie2 && /* @__PURE__ */ /gecko\/(\d+)/i.test(nav.userAgent);
      chrome = !ie2 && /* @__PURE__ */ /Chrome\/(\d+)/.exec(nav.userAgent);
      webkit = "webkitFontSmoothing" in doc.documentElement.style;
      safari = !ie2 && /* @__PURE__ */ /Apple Computer/.test(nav.vendor);
      ios = safari && (/* @__PURE__ */ /Mobile\/\w+/.test(nav.userAgent) || nav.maxTouchPoints > 2);
      browser = {
        mac: ios || /* @__PURE__ */ /Mac/.test(nav.platform),
        windows: /* @__PURE__ */ /Win/.test(nav.platform),
        linux: /* @__PURE__ */ /Linux|X11/.test(nav.platform),
        ie: ie2,
        ie_version: ie_upto10 ? doc.documentMode || 6 : ie_11up ? +ie_11up[1] : ie_edge ? +ie_edge[1] : 0,
        gecko,
        gecko_version: gecko ? +(/* @__PURE__ */ /Firefox\/(\d+)/.exec(nav.userAgent) || [0, 0])[1] : 0,
        chrome: !!chrome,
        chrome_version: chrome ? +chrome[1] : 0,
        ios,
        android: /* @__PURE__ */ /Android\b/.test(nav.userAgent),
        webkit,
        webkit_version: webkit ? +(/* @__PURE__ */ /\bAppleWebKit\/(\d+)/.exec(nav.userAgent) || [0, 0])[1] : 0,
        safari,
        safari_version: safari ? +(/* @__PURE__ */ /\bVersion\/(\d+(\.\d+)?)/.exec(nav.userAgent) || [0, 0])[1] : 0,
        tabSize: doc.documentElement.style.tabSize != null ? "tab-size" : "-moz-tab-size"
      };
      noAttrs = /* @__PURE__ */ Object.create(null);
      WidgetType = class {
        /**
        Compare this instance to another instance of the same type.
        (TypeScript can't express this, but only instances of the same
        specific class will be passed to this method.) This is used to
        avoid redrawing widgets when they are replaced by a new
        decoration of the same type. The default implementation just
        returns `false`, which will cause new instances of the widget to
        always be redrawn.
        */
        eq(widget) {
          return false;
        }
        /**
        Update a DOM element created by a widget of the same type (but
        different, non-`eq` content) to reflect this widget. May return
        true to indicate that it could update, false to indicate it
        couldn't (in which case the widget will be redrawn). The default
        implementation just returns false.
        */
        updateDOM(dom, view, from) {
          return false;
        }
        /**
        @internal
        */
        compare(other) {
          return this == other || this.constructor == other.constructor && this.eq(other);
        }
        /**
        The estimated height this widget will have, to be used when
        estimating the height of content that hasn't been drawn. May
        return -1 to indicate you don't know. The default implementation
        returns -1.
        */
        get estimatedHeight() {
          return -1;
        }
        /**
        For inline widgets that are displayed inline (as opposed to
        `inline-block`) and introduce line breaks (through `<br>` tags
        or textual newlines), this must indicate the amount of line
        breaks they introduce. Defaults to 0.
        */
        get lineBreaks() {
          return 0;
        }
        /**
        Can be used to configure which kinds of events inside the widget
        should be ignored by the editor. The default is to ignore all
        events.
        */
        ignoreEvent(event) {
          return true;
        }
        /**
        Override the way screen coordinates for positions at/in the
        widget are found. `pos` will be the offset into the widget, and
        `side` the side of the position that is being queried—less than
        zero for before, greater than zero for after, and zero for
        directly at that position.
        */
        coordsAt(dom, pos, side) {
          return null;
        }
        /**
        @internal
        */
        get isHidden() {
          return false;
        }
        /**
        @internal
        */
        get editable() {
          return false;
        }
        /**
        This is called when the an instance of the widget is removed
        from the editor view.
        */
        destroy(dom) {
        }
      };
      BlockType = /* @__PURE__ */ (function(BlockType2) {
        BlockType2[BlockType2["Text"] = 0] = "Text";
        BlockType2[BlockType2["WidgetBefore"] = 1] = "WidgetBefore";
        BlockType2[BlockType2["WidgetAfter"] = 2] = "WidgetAfter";
        BlockType2[BlockType2["WidgetRange"] = 3] = "WidgetRange";
        return BlockType2;
      })(BlockType || (BlockType = {}));
      Decoration = class extends RangeValue {
        constructor(startSide, endSide, widget, spec) {
          super();
          this.startSide = startSide;
          this.endSide = endSide;
          this.widget = widget;
          this.spec = spec;
        }
        /**
        @internal
        */
        get heightRelevant() {
          return false;
        }
        /**
        Create a mark decoration, which influences the styling of the
        content in its range. Nested mark decorations will cause nested
        DOM elements to be created. Nesting order is determined by
        precedence of the [facet](https://codemirror.net/6/docs/ref/#view.EditorView^decorations), with
        the higher-precedence decorations creating the inner DOM nodes.
        Such elements are split on line boundaries and on the boundaries
        of lower-precedence decorations.
        */
        static mark(spec) {
          return new MarkDecoration(spec);
        }
        /**
        Create a widget decoration, which displays a DOM element at the
        given position.
        */
        static widget(spec) {
          let side = Math.max(-1e4, Math.min(1e4, spec.side || 0)), block = !!spec.block;
          side += block && !spec.inlineOrder ? side > 0 ? 3e8 : -4e8 : side > 0 ? 1e8 : -1e8;
          return new PointDecoration(spec, side, side, block, spec.widget || null, false);
        }
        /**
        Create a replace decoration which replaces the given range with
        a widget, or simply hides it.
        */
        static replace(spec) {
          let block = !!spec.block, startSide, endSide;
          if (spec.isBlockGap) {
            startSide = -5e8;
            endSide = 4e8;
          } else {
            let { start, end } = getInclusive(spec, block);
            startSide = (start ? block ? -3e8 : -1 : 5e8) - 1;
            endSide = (end ? block ? 2e8 : 1 : -6e8) + 1;
          }
          return new PointDecoration(spec, startSide, endSide, block, spec.widget || null, true);
        }
        /**
        Create a line decoration, which can add DOM attributes to the
        line starting at the given position.
        */
        static line(spec) {
          return new LineDecoration(spec);
        }
        /**
        Build a [`DecorationSet`](https://codemirror.net/6/docs/ref/#view.DecorationSet) from the given
        decorated range or ranges. If the ranges aren't already sorted,
        pass `true` for `sort` to make the library sort them for you.
        */
        static set(of, sort = false) {
          return RangeSet.of(of, sort);
        }
        /**
        @internal
        */
        hasHeight() {
          return this.widget ? this.widget.estimatedHeight > -1 : false;
        }
      };
      Decoration.none = RangeSet.empty;
      MarkDecoration = class _MarkDecoration extends Decoration {
        constructor(spec) {
          let { start, end } = getInclusive(spec);
          super(start ? -1 : 5e8, end ? 1 : -6e8, null, spec);
          this.tagName = spec.tagName || "span";
          this.attrs = spec.class && spec.attributes ? combineAttrs(spec.attributes, { class: spec.class }) : spec.class ? { class: spec.class } : spec.attributes || noAttrs;
        }
        eq(other) {
          return this == other || other instanceof _MarkDecoration && this.tagName == other.tagName && attrsEq(this.attrs, other.attrs);
        }
        range(from, to = from) {
          if (from >= to)
            throw new RangeError("Mark decorations may not be empty");
          return super.range(from, to);
        }
      };
      MarkDecoration.prototype.point = false;
      LineDecoration = class _LineDecoration extends Decoration {
        constructor(spec) {
          super(-2e8, -2e8, null, spec);
        }
        eq(other) {
          return other instanceof _LineDecoration && this.spec.class == other.spec.class && attrsEq(this.spec.attributes, other.spec.attributes);
        }
        range(from, to = from) {
          if (to != from)
            throw new RangeError("Line decoration ranges must be zero-length");
          return super.range(from, to);
        }
      };
      LineDecoration.prototype.mapMode = MapMode.TrackBefore;
      LineDecoration.prototype.point = true;
      PointDecoration = class _PointDecoration extends Decoration {
        constructor(spec, startSide, endSide, block, widget, isReplace) {
          super(startSide, endSide, widget, spec);
          this.block = block;
          this.isReplace = isReplace;
          this.mapMode = !block ? MapMode.TrackDel : startSide <= 0 ? MapMode.TrackBefore : MapMode.TrackAfter;
        }
        // Only relevant when this.block == true
        get type() {
          return this.startSide != this.endSide ? BlockType.WidgetRange : this.startSide <= 0 ? BlockType.WidgetBefore : BlockType.WidgetAfter;
        }
        get heightRelevant() {
          return this.block || !!this.widget && (this.widget.estimatedHeight >= 5 || this.widget.lineBreaks > 0);
        }
        eq(other) {
          return other instanceof _PointDecoration && widgetsEq(this.widget, other.widget) && this.block == other.block && this.startSide == other.startSide && this.endSide == other.endSide;
        }
        range(from, to = from) {
          if (this.isReplace && (from > to || from == to && this.startSide > 0 && this.endSide <= 0))
            throw new RangeError("Invalid range for replacement decoration");
          if (!this.isReplace && to != from)
            throw new RangeError("Widget decorations can only have zero-length ranges");
          return super.range(from, to);
        }
      };
      PointDecoration.prototype.point = true;
      BlockWrapper = class _BlockWrapper extends RangeValue {
        constructor(tagName, attributes, rank) {
          super();
          this.tagName = tagName;
          this.attributes = attributes;
          this.rank = rank;
        }
        eq(other) {
          return other == this || other instanceof _BlockWrapper && this.tagName == other.tagName && attrsEq(this.attributes, other.attributes);
        }
        /**
        Create a block wrapper object with the given tag name and
        attributes.
        */
        static create(spec) {
          return new _BlockWrapper(spec.tagName, spec.attributes || noAttrs, spec.rank == null ? 50 : Math.max(0, Math.min(spec.rank, 100)));
        }
        /**
        Create a range set from the given block wrapper ranges.
        */
        static set(of, sort = false) {
          return RangeSet.of(of, sort);
        }
      };
      BlockWrapper.prototype.startSide = BlockWrapper.prototype.endSide = -1;
      DOMSelectionState = class {
        constructor() {
          this.anchorNode = null;
          this.anchorOffset = 0;
          this.focusNode = null;
          this.focusOffset = 0;
        }
        eq(domSel) {
          return this.anchorNode == domSel.anchorNode && this.anchorOffset == domSel.anchorOffset && this.focusNode == domSel.focusNode && this.focusOffset == domSel.focusOffset;
        }
        setRange(range) {
          let { anchorNode, focusNode } = range;
          this.set(anchorNode, Math.min(range.anchorOffset, anchorNode ? maxOffset(anchorNode) : 0), focusNode, Math.min(range.focusOffset, focusNode ? maxOffset(focusNode) : 0));
        }
        set(anchorNode, anchorOffset, focusNode, focusOffset) {
          this.anchorNode = anchorNode;
          this.anchorOffset = anchorOffset;
          this.focusNode = focusNode;
          this.focusOffset = focusOffset;
        }
      };
      preventScrollSupported = null;
      if (browser.safari && browser.safari_version >= 26)
        preventScrollSupported = false;
      DOMPos = class _DOMPos {
        constructor(node, offset, precise = true) {
          this.node = node;
          this.offset = offset;
          this.precise = precise;
        }
        static before(dom, precise) {
          return new _DOMPos(dom.parentNode, domIndex(dom), precise);
        }
        static after(dom, precise) {
          return new _DOMPos(dom.parentNode, domIndex(dom) + 1, precise);
        }
      };
      Direction = /* @__PURE__ */ (function(Direction2) {
        Direction2[Direction2["LTR"] = 0] = "LTR";
        Direction2[Direction2["RTL"] = 1] = "RTL";
        return Direction2;
      })(Direction || (Direction = {}));
      LTR = Direction.LTR;
      RTL = Direction.RTL;
      LowTypes = /* @__PURE__ */ dec("88888888888888888888888888888888888666888888787833333333337888888000000000000000000000000008888880000000000000000000000000088888888888888888888888888888888888887866668888088888663380888308888800000000000000000000000800000000000000000000000000000008");
      ArabicTypes = /* @__PURE__ */ dec("4444448826627288999999999992222222222222222222222222222222222222222222222229999999999999999999994444444444644222822222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222222999999949999999229989999223333333333");
      Brackets = /* @__PURE__ */ Object.create(null);
      BracketStack = [];
      for (let p of ["()", "[]", "{}"]) {
        let l = /* @__PURE__ */ p.charCodeAt(0), r = /* @__PURE__ */ p.charCodeAt(1);
        Brackets[l] = r;
        Brackets[r] = -l;
      }
      BidiRE = /[\u0590-\u05f4\u0600-\u06ff\u0700-\u08ac\ufb50-\ufdff]/;
      BidiSpan = class {
        /**
        The direction of this span.
        */
        get dir() {
          return this.level % 2 ? RTL : LTR;
        }
        /**
        @internal
        */
        constructor(from, to, level) {
          this.from = from;
          this.to = to;
          this.level = level;
        }
        /**
        @internal
        */
        side(end, dir) {
          return this.dir == dir == end ? this.to : this.from;
        }
        /**
        @internal
        */
        forward(forward, dir) {
          return forward == (this.dir == dir);
        }
        /**
        @internal
        */
        static find(order, index, level, assoc) {
          let maybe = -1;
          for (let i2 = 0; i2 < order.length; i2++) {
            let span = order[i2];
            if (span.from <= index && span.to >= index) {
              if (span.level == level)
                return i2;
              if (maybe < 0 || (assoc != 0 ? assoc < 0 ? span.from < index : span.to > index : order[maybe].level > span.level))
                maybe = i2;
            }
          }
          if (maybe < 0)
            throw new RangeError("Index out of range");
          return maybe;
        }
      };
      types = [];
      movedOver = "";
      clickAddsSelectionRange = /* @__PURE__ */ Facet.define();
      dragMovesSelection$1 = /* @__PURE__ */ Facet.define();
      mouseSelectionStyle = /* @__PURE__ */ Facet.define();
      exceptionSink = /* @__PURE__ */ Facet.define();
      updateListener = /* @__PURE__ */ Facet.define();
      inputHandler = /* @__PURE__ */ Facet.define();
      focusChangeEffect = /* @__PURE__ */ Facet.define();
      clipboardInputFilter = /* @__PURE__ */ Facet.define();
      clipboardOutputFilter = /* @__PURE__ */ Facet.define();
      perLineTextDirection = /* @__PURE__ */ Facet.define({
        combine: (values) => values.some((x) => x)
      });
      nativeSelectionHidden = /* @__PURE__ */ Facet.define({
        combine: (values) => values.some((x) => x)
      });
      scrollHandler = /* @__PURE__ */ Facet.define();
      ScrollTarget = class _ScrollTarget {
        constructor(range, y, x, yMargin, xMargin, isSnapshot = false) {
          this.range = range;
          this.y = y;
          this.x = x;
          this.yMargin = yMargin;
          this.xMargin = xMargin;
          this.isSnapshot = isSnapshot;
        }
        map(changes) {
          return changes.empty ? this : new _ScrollTarget(this.range.map(changes), this.y, this.x, this.yMargin, this.xMargin, this.isSnapshot);
        }
        clip(state) {
          return this.range.to <= state.doc.length ? this : new _ScrollTarget(EditorSelection.cursor(state.doc.length), this.y, this.x, this.yMargin, this.xMargin, this.isSnapshot);
        }
      };
      scrollIntoView = /* @__PURE__ */ StateEffect.define({ map: (t2, ch) => t2.map(ch) });
      setEditContextFormatting = /* @__PURE__ */ StateEffect.define();
      editable = /* @__PURE__ */ Facet.define({ combine: (values) => values.length ? values[0] : true });
      nextPluginID = 0;
      viewPlugin = /* @__PURE__ */ Facet.define({
        combine(plugins) {
          return plugins.filter((p, i2) => {
            for (let j = 0; j < i2; j++)
              if (plugins[j].plugin == p.plugin)
                return false;
            return true;
          });
        }
      });
      ViewPlugin = class _ViewPlugin {
        constructor(id2, create, domEventHandlers, domEventObservers, buildExtensions) {
          this.id = id2;
          this.create = create;
          this.domEventHandlers = domEventHandlers;
          this.domEventObservers = domEventObservers;
          this.baseExtensions = buildExtensions(this);
          this.extension = this.baseExtensions.concat(viewPlugin.of({ plugin: this, arg: void 0 }));
        }
        /**
        Create an extension for this plugin with the given argument.
        */
        of(arg) {
          return this.baseExtensions.concat(viewPlugin.of({ plugin: this, arg }));
        }
        /**
        Define a plugin from a constructor function that creates the
        plugin's value, given an editor view.
        */
        static define(create, spec) {
          const { eventHandlers, eventObservers, provide, decorations: deco } = spec || {};
          return new _ViewPlugin(nextPluginID++, create, eventHandlers, eventObservers, (plugin) => {
            let ext = [];
            if (deco)
              ext.push(decorations.of((view) => {
                let pluginInst = view.plugin(plugin);
                return pluginInst ? deco(pluginInst) : Decoration.none;
              }));
            if (provide)
              ext.push(provide(plugin));
            return ext;
          });
        }
        /**
        Create a plugin for a class whose constructor takes a single
        editor view as argument.
        */
        static fromClass(cls, spec) {
          return _ViewPlugin.define((view, arg) => new cls(view, arg), spec);
        }
      };
      PluginInstance = class {
        constructor(spec) {
          this.spec = spec;
          this.mustUpdate = null;
          this.value = null;
        }
        get plugin() {
          return this.spec && this.spec.plugin;
        }
        update(view) {
          if (!this.value) {
            if (this.spec) {
              try {
                this.value = this.spec.plugin.create(view, this.spec.arg);
              } catch (e) {
                logException(view.state, e, "CodeMirror plugin crashed");
                this.deactivate();
              }
            }
          } else if (this.mustUpdate) {
            let update = this.mustUpdate;
            this.mustUpdate = null;
            if (this.value.update) {
              try {
                this.value.update(update);
              } catch (e) {
                logException(update.state, e, "CodeMirror plugin crashed");
                if (this.value.destroy)
                  try {
                    this.value.destroy();
                  } catch (_) {
                  }
                this.deactivate();
              }
            }
          }
          return this;
        }
        destroy(view) {
          var _a2;
          if ((_a2 = this.value) === null || _a2 === void 0 ? void 0 : _a2.destroy) {
            try {
              this.value.destroy();
            } catch (e) {
              logException(view.state, e, "CodeMirror plugin crashed");
            }
          }
        }
        deactivate() {
          this.spec = this.value = null;
        }
      };
      editorAttributes = /* @__PURE__ */ Facet.define();
      contentAttributes = /* @__PURE__ */ Facet.define();
      decorations = /* @__PURE__ */ Facet.define();
      blockWrappers = /* @__PURE__ */ Facet.define();
      outerDecorations = /* @__PURE__ */ Facet.define();
      atomicRanges = /* @__PURE__ */ Facet.define();
      bidiIsolatedRanges = /* @__PURE__ */ Facet.define();
      scrollMargins = /* @__PURE__ */ Facet.define();
      styleModule = /* @__PURE__ */ Facet.define();
      ChangedRange = class _ChangedRange {
        constructor(fromA, toA, fromB, toB) {
          this.fromA = fromA;
          this.toA = toA;
          this.fromB = fromB;
          this.toB = toB;
        }
        join(other) {
          return new _ChangedRange(Math.min(this.fromA, other.fromA), Math.max(this.toA, other.toA), Math.min(this.fromB, other.fromB), Math.max(this.toB, other.toB));
        }
        addToSet(set) {
          let i2 = set.length, me = this;
          for (; i2 > 0; i2--) {
            let range = set[i2 - 1];
            if (range.fromA > me.toA)
              continue;
            if (range.toA < me.fromA)
              break;
            me = me.join(range);
            set.splice(i2 - 1, 1);
          }
          set.splice(i2, 0, me);
          return set;
        }
        // Extend a set to cover all the content in `ranges`, which is a
        // flat array with each pair of numbers representing fromB/toB
        // positions. These pairs are generated in unchanged ranges, so the
        // offset between doc A and doc B is the same for their start and
        // end points.
        static extendWithRanges(diff, ranges) {
          if (ranges.length == 0)
            return diff;
          let result = [];
          for (let dI = 0, rI = 0, off = 0; ; ) {
            let nextD = dI < diff.length ? diff[dI].fromB : 1e9;
            let nextR = rI < ranges.length ? ranges[rI] : 1e9;
            let fromB = Math.min(nextD, nextR);
            if (fromB == 1e9)
              break;
            let fromA = fromB + off, toB = fromB, toA = fromA;
            for (; ; ) {
              if (rI < ranges.length && ranges[rI] <= toB) {
                let end = ranges[rI + 1];
                rI += 2;
                toB = Math.max(toB, end);
                for (let i2 = dI; i2 < diff.length && diff[i2].fromB <= toB; i2++)
                  off = diff[i2].toA - diff[i2].toB;
                toA = Math.max(toA, end + off);
              } else if (dI < diff.length && diff[dI].fromB <= toB) {
                let next = diff[dI++];
                toB = Math.max(toB, next.toB);
                toA = Math.max(toA, next.toA);
                off = next.toA - next.toB;
              } else {
                break;
              }
            }
            result.push(new _ChangedRange(fromA, toA, fromB, toB));
          }
          return result;
        }
      };
      ViewUpdate = class _ViewUpdate {
        constructor(view, state, transactions) {
          this.view = view;
          this.state = state;
          this.transactions = transactions;
          this.flags = 0;
          this.startState = view.state;
          this.changes = ChangeSet.empty(this.startState.doc.length);
          for (let tr of transactions)
            this.changes = this.changes.compose(tr.changes);
          let changedRanges = [];
          this.changes.iterChangedRanges((fromA, toA, fromB, toB) => changedRanges.push(new ChangedRange(fromA, toA, fromB, toB)));
          this.changedRanges = changedRanges;
        }
        /**
        @internal
        */
        static create(view, state, transactions) {
          return new _ViewUpdate(view, state, transactions);
        }
        /**
        Tells you whether the [viewport](https://codemirror.net/6/docs/ref/#view.EditorView.viewport) or
        [visible ranges](https://codemirror.net/6/docs/ref/#view.EditorView.visibleRanges) changed in this
        update.
        */
        get viewportChanged() {
          return (this.flags & 4) > 0;
        }
        /**
        Returns true when
        [`viewportChanged`](https://codemirror.net/6/docs/ref/#view.ViewUpdate.viewportChanged) is true
        and the viewport change is not just the result of mapping it in
        response to document changes.
        */
        get viewportMoved() {
          return (this.flags & 8) > 0;
        }
        /**
        Indicates whether the height of a block element in the editor
        changed in this update.
        */
        get heightChanged() {
          return (this.flags & 2) > 0;
        }
        /**
        Returns true when the document was modified or the size of the
        editor, or elements within the editor, changed.
        */
        get geometryChanged() {
          return this.docChanged || (this.flags & (16 | 2)) > 0;
        }
        /**
        True when this update indicates a focus change.
        */
        get focusChanged() {
          return (this.flags & 1) > 0;
        }
        /**
        Whether the document changed in this update.
        */
        get docChanged() {
          return !this.changes.empty;
        }
        /**
        Whether the selection was explicitly set in this update.
        */
        get selectionSet() {
          return this.transactions.some((tr) => tr.selection);
        }
        /**
        @internal
        */
        get empty() {
          return this.flags == 0 && this.transactions.length == 0;
        }
      };
      noChildren = [];
      Tile = class {
        constructor(dom, length, flags = 0) {
          this.dom = dom;
          this.length = length;
          this.flags = flags;
          this.parent = null;
          dom.cmTile = this;
        }
        get breakAfter() {
          return this.flags & 1;
        }
        get children() {
          return noChildren;
        }
        isWidget() {
          return false;
        }
        get isHidden() {
          return false;
        }
        isComposite() {
          return false;
        }
        isLine() {
          return false;
        }
        isText() {
          return false;
        }
        isBlock() {
          return false;
        }
        get domAttrs() {
          return null;
        }
        sync(track) {
          this.flags |= 2;
          if (this.flags & 4) {
            this.flags &= ~4;
            let attrs = this.domAttrs;
            if (attrs)
              setAttrs(this.dom, attrs);
          }
        }
        toString() {
          return this.constructor.name + (this.children.length ? `(${this.children})` : "") + (this.breakAfter ? "#" : "");
        }
        destroy() {
          this.parent = null;
        }
        setDOM(dom) {
          this.dom = dom;
          dom.cmTile = this;
        }
        get posAtStart() {
          return this.parent ? this.parent.posBefore(this) : 0;
        }
        get posAtEnd() {
          return this.posAtStart + this.length;
        }
        posBefore(tile, start = this.posAtStart) {
          let pos = start;
          for (let child of this.children) {
            if (child == tile)
              return pos;
            pos += child.length + child.breakAfter;
          }
          throw new RangeError("Invalid child in posBefore");
        }
        posAfter(tile) {
          return this.posBefore(tile) + tile.length;
        }
        covers(side) {
          return true;
        }
        coordsIn(pos, side, rtl) {
          return null;
        }
        domPosFor(off, side) {
          let index = domIndex(this.dom);
          let after = this.length ? off > 0 : side > 0;
          return new DOMPos(this.parent.dom, index + (after ? 1 : 0), off == 0 || off == this.length);
        }
        markDirty(attrs) {
          this.flags &= ~2;
          if (attrs)
            this.flags |= 4;
          if (this.parent && this.parent.flags & 2)
            this.parent.markDirty(false);
        }
        get overrideDOMText() {
          return null;
        }
        get root() {
          for (let t2 = this; t2; t2 = t2.parent)
            if (t2 instanceof DocTile)
              return t2;
          return null;
        }
        static get(dom) {
          return dom.cmTile;
        }
      };
      CompositeTile = class extends Tile {
        constructor(dom) {
          super(dom, 0);
          this._children = [];
        }
        isComposite() {
          return true;
        }
        get children() {
          return this._children;
        }
        get lastChild() {
          return this.children.length ? this.children[this.children.length - 1] : null;
        }
        append(child) {
          this.children.push(child);
          child.parent = this;
        }
        sync(track) {
          if (this.flags & 2)
            return;
          super.sync(track);
          let parent = this.dom, prev = null, next;
          let tracking = (track === null || track === void 0 ? void 0 : track.node) == parent ? track : null;
          let length = 0;
          for (let child of this.children) {
            child.sync(track);
            length += child.length + child.breakAfter;
            next = prev ? prev.nextSibling : parent.firstChild;
            if (tracking && next != child.dom)
              tracking.written = true;
            if (child.dom.parentNode == parent) {
              while (next && next != child.dom)
                next = rm$1(next);
            } else {
              parent.insertBefore(child.dom, next);
            }
            prev = child.dom;
          }
          next = prev ? prev.nextSibling : parent.firstChild;
          if (tracking && next)
            tracking.written = true;
          while (next)
            next = rm$1(next);
          this.length = length;
        }
      };
      DocTile = class extends CompositeTile {
        constructor(view, dom) {
          super(dom);
          this.view = view;
        }
        owns(tile) {
          for (; tile; tile = tile.parent)
            if (tile == this)
              return true;
          return false;
        }
        isBlock() {
          return true;
        }
        nearest(dom) {
          for (; ; ) {
            if (!dom)
              return null;
            let tile = Tile.get(dom);
            if (tile && this.owns(tile))
              return tile;
            dom = dom.parentNode;
          }
        }
        blockTiles(f) {
          for (let stack = [], cur = this, i2 = 0, pos = 0; ; ) {
            if (i2 == cur.children.length) {
              if (!stack.length)
                return;
              cur = cur.parent;
              if (cur.breakAfter)
                pos++;
              i2 = stack.pop();
            } else {
              let next = cur.children[i2++];
              if (next instanceof BlockWrapperTile) {
                stack.push(i2);
                cur = next;
                i2 = 0;
              } else {
                let end = pos + next.length;
                let result = f(next, pos);
                if (result !== void 0)
                  return result;
                pos = end + next.breakAfter;
              }
            }
          }
        }
        // Find the block at the given position. If side < -1, make sure to
        // stay before block widgets at that position, if side > 1, after
        // such widgets (used for selection drawing, which needs to be able
        // to get coordinates for positions that aren't valid cursor positions).
        resolveBlock(pos, side) {
          let before, beforeOff = -1, after, afterOff = -1;
          this.blockTiles((tile, off) => {
            let end = off + tile.length;
            if (pos >= off && pos <= end) {
              if (tile.isWidget() && side >= -1 && side <= 1) {
                if (tile.flags & 32)
                  return true;
                if (tile.flags & 16)
                  before = void 0;
              }
              if ((off < pos || pos == end && (side < -1 ? tile.length : tile.covers(1))) && (!before || !tile.isWidget() && before.isWidget())) {
                before = tile;
                beforeOff = pos - off;
              }
              if ((end > pos || pos == off && (side > 1 ? tile.length : tile.covers(-1))) && (!after || !tile.isWidget() && after.isWidget())) {
                after = tile;
                afterOff = pos - off;
              }
            }
          });
          if (!before && !after)
            throw new Error("No tile at position " + pos);
          return before && side < 0 || !after ? { tile: before, offset: beforeOff } : { tile: after, offset: afterOff };
        }
      };
      BlockWrapperTile = class _BlockWrapperTile extends CompositeTile {
        constructor(dom, wrapper) {
          super(dom);
          this.wrapper = wrapper;
        }
        isBlock() {
          return true;
        }
        covers(side) {
          if (!this.children.length)
            return false;
          return side < 0 ? this.children[0].covers(-1) : this.lastChild.covers(1);
        }
        get domAttrs() {
          return this.wrapper.attributes;
        }
        static of(wrapper, dom) {
          let tile = new _BlockWrapperTile(dom || document.createElement(wrapper.tagName), wrapper);
          if (!dom)
            tile.flags |= 4;
          return tile;
        }
      };
      LineTile = class _LineTile extends CompositeTile {
        constructor(dom, attrs) {
          super(dom);
          this.attrs = attrs;
        }
        isLine() {
          return true;
        }
        static start(attrs, dom, keepAttrs) {
          let line = new _LineTile(dom || document.createElement("div"), attrs);
          if (!dom || !keepAttrs)
            line.flags |= 4;
          return line;
        }
        get domAttrs() {
          return this.attrs;
        }
        // Find the tile associated with a given position in this line.
        // Side -2/2 is handled specially, in that it allows the position
        // returned to be before (-2) or after (2) widgets that would always
        // be after/before a cursor position.
        resolveInline(pos, side, forCoords) {
          let before = null, beforeOff = -1, after = null, afterOff = -1;
          function scan(tile, pos2) {
            for (let i2 = 0, off = 0; i2 < tile.children.length && off <= pos2; i2++) {
              let child = tile.children[i2], end = off + child.length;
              if (end >= pos2) {
                if (child.isComposite()) {
                  scan(child, pos2 - off);
                } else if ((!after || after.isHidden && (side > 0 && !(after.flags & 32) || forCoords && onSameLine(after, child))) && (end > pos2 || child.flags & 32 && side <= 1)) {
                  after = child;
                  afterOff = pos2 - off;
                } else if (off < pos2 || child.flags & 16 && !child.isHidden && side >= -1) {
                  before = child;
                  beforeOff = pos2 - off;
                }
              }
              off = end;
            }
          }
          scan(this, pos);
          let target = (side < 0 ? before : after) || before || after;
          return target ? { tile: target, offset: target == before ? beforeOff : afterOff } : null;
        }
        coordsIn(pos, side, rtl) {
          let found = this.resolveInline(pos, side, true);
          if (!found)
            return fallbackRect(this);
          return found.tile.coordsIn(Math.max(0, found.offset), side, rtl);
        }
        domIn(pos, side) {
          let found = this.resolveInline(pos, side);
          if (found) {
            let { tile, offset } = found;
            if (this.dom.contains(tile.dom)) {
              if (tile.isText())
                return new DOMPos(tile.dom, Math.min(tile.dom.nodeValue.length, offset));
              return tile.domPosFor(offset, tile.flags & 16 ? 1 : tile.flags & 32 ? -1 : side);
            }
            let parent = found.tile.parent, saw = false;
            for (let ch of parent.children) {
              if (saw)
                return new DOMPos(ch.dom, 0);
              if (ch == found.tile) {
                saw = true;
              }
            }
          }
          return new DOMPos(this.dom, 0);
        }
      };
      MarkTile = class _MarkTile extends CompositeTile {
        constructor(dom, mark) {
          super(dom);
          this.mark = mark;
        }
        get domAttrs() {
          return this.mark.attrs;
        }
        static of(mark, dom) {
          let tile = new _MarkTile(dom || document.createElement(mark.tagName), mark);
          if (!dom)
            tile.flags |= 4;
          return tile;
        }
      };
      TextTile = class _TextTile extends Tile {
        constructor(dom, text) {
          super(dom, text.length);
          this.text = text;
        }
        sync(track) {
          if (this.flags & 2)
            return;
          super.sync(track);
          if (this.dom.nodeValue != this.text) {
            if (track && track.node == this.dom)
              track.written = true;
            this.dom.nodeValue = this.text;
          }
        }
        isText() {
          return true;
        }
        toString() {
          return JSON.stringify(this.text);
        }
        coordsIn(pos, side, rtl) {
          let length = this.dom.nodeValue.length;
          if (pos > length)
            pos = length;
          let from = pos, to = pos, flatten2 = 0;
          if (pos == 0 && side < 0 || pos == length && side >= 0) {
            if (!(browser.chrome || browser.gecko)) {
              if (pos) {
                from--;
                flatten2 = 1;
              } else if (to < length) {
                to++;
                flatten2 = -1;
              }
            }
          } else {
            if (side < 0)
              from--;
            else if (to < length)
              to++;
          }
          let rects = textRange(this.dom, from, to).getClientRects();
          if (!rects.length)
            return null;
          let rect = rects[(flatten2 ? flatten2 < 0 : side >= 0) ? 0 : rects.length - 1];
          if (browser.safari && !flatten2 && rect.width == 0)
            rect = Array.prototype.find.call(rects, (r) => r.width) || rect;
          return rtl == null ? rect : flattenRect(rect, (flatten2 ? flatten2 > 0 : side < 0) == rtl);
        }
        static of(text, dom) {
          let tile = new _TextTile(dom || document.createTextNode(text), text);
          if (!dom)
            tile.flags |= 2;
          return tile;
        }
      };
      WidgetTile = class _WidgetTile extends Tile {
        constructor(dom, length, widget, flags) {
          super(dom, length, flags);
          this.widget = widget;
        }
        isWidget() {
          return true;
        }
        get isHidden() {
          return this.widget.isHidden;
        }
        covers(side) {
          if (this.flags & 48)
            return false;
          return (this.flags & (side < 0 ? 64 : 128)) > 0;
        }
        coordsIn(pos, side) {
          return this.coordsInWidget(pos, side, false);
        }
        coordsInWidget(pos, side, block) {
          let custom = this.widget.coordsAt(this.dom, pos, side);
          if (custom)
            return custom;
          if (block) {
            return flattenRect(this.dom.getBoundingClientRect(), this.length ? pos == 0 : side <= 0);
          } else {
            let rects = this.dom.getClientRects(), rect = null;
            if (!rects.length)
              return null;
            let fromBack = this.flags & 16 ? true : this.flags & 32 ? false : pos > 0;
            for (let i2 = fromBack ? rects.length - 1 : 0; ; i2 += fromBack ? -1 : 1) {
              rect = rects[i2];
              if (pos > 0 ? i2 == 0 : i2 == rects.length - 1 || rect.top < rect.bottom)
                break;
            }
            return flattenRect(rect, !fromBack);
          }
        }
        get overrideDOMText() {
          if (!this.length)
            return Text.empty;
          let { root } = this;
          if (!root)
            return Text.empty;
          let start = this.posAtStart;
          return root.view.state.doc.slice(start, start + this.length);
        }
        destroy() {
          super.destroy();
          this.widget.destroy(this.dom);
        }
        static of(widget, view, length, flags, dom) {
          if (!dom) {
            dom = widget.toDOM(view);
            if (!widget.editable)
              dom.contentEditable = "false";
          }
          return new _WidgetTile(dom, length, widget, flags);
        }
      };
      WidgetBufferTile = class extends Tile {
        constructor(flags) {
          let img = document.createElement("img");
          img.className = "cm-widgetBuffer";
          img.setAttribute("aria-hidden", "true");
          super(img, 0, flags);
        }
        get isHidden() {
          return true;
        }
        get overrideDOMText() {
          return Text.empty;
        }
        coordsIn(pos, side, rtl) {
          let rect = this.dom.getBoundingClientRect();
          return rtl == null ? rect : flattenRect(rect, side > 0 == rtl);
        }
      };
      TilePointer = class {
        constructor(top2) {
          this.index = 0;
          this.beforeBreak = false;
          this.parents = [];
          this.tile = top2;
        }
        // Advance by the given distance. If side is -1, stop leaving or
        // entering tiles, or skipping zero-length tiles, once the distance
        // has been traversed. When side is 1, leave, enter, or skip
        // everything at the end position.
        advance(dist2, side, walker) {
          let { tile, index, beforeBreak, parents } = this;
          while (dist2 || side > 0) {
            if (!tile.isComposite()) {
              let len = tile.length;
              if (index < len && dist2) {
                let take = Math.min(dist2, len - index);
                if (walker)
                  walker.skip(tile, index, index + take);
                dist2 -= take;
                index += take;
              }
              if (index == len) {
                beforeBreak = !!tile.breakAfter;
                ({ tile, index } = parents.pop());
                index++;
              } else if (!dist2) {
                break;
              }
            } else if (beforeBreak) {
              if (!dist2)
                break;
              if (walker)
                walker.break();
              dist2--;
              beforeBreak = false;
            } else if (index == tile.children.length) {
              if (!dist2 && !parents.length)
                break;
              if (walker)
                walker.leave(tile);
              beforeBreak = !!tile.breakAfter;
              ({ tile, index } = parents.pop());
              index++;
            } else {
              let next = tile.children[index], brk = next.breakAfter;
              if ((side > 0 ? next.length <= dist2 : next.length < dist2) && (!walker || walker.skip(next, 0, next.length) !== false || !next.isComposite)) {
                beforeBreak = !!brk;
                index++;
                dist2 -= next.length;
              } else {
                parents.push({ tile, index });
                tile = next;
                index = 0;
                if (walker && next.isComposite())
                  walker.enter(next);
              }
            }
          }
          this.tile = tile;
          this.index = index;
          this.beforeBreak = beforeBreak;
          return this;
        }
        get root() {
          return this.parents.length ? this.parents[0].tile : this.tile;
        }
      };
      OpenWrapper = class {
        constructor(from, to, wrapper, rank) {
          this.from = from;
          this.to = to;
          this.wrapper = wrapper;
          this.rank = rank;
        }
      };
      TileBuilder = class {
        constructor(cache2, root, blockWrappers2) {
          this.cache = cache2;
          this.root = root;
          this.blockWrappers = blockWrappers2;
          this.curLine = null;
          this.lastBlock = null;
          this.afterWidget = null;
          this.pos = 0;
          this.wrappers = [];
          this.wrapperPos = 0;
        }
        addText(text, marks2, openStart, tile) {
          var _a2;
          this.flushBuffer();
          let parent = this.ensureMarks(marks2, openStart);
          let prev = parent.lastChild;
          if (prev && prev.isText() && !(prev.flags & 8) && prev.length + text.length < 512) {
            this.cache.reused.set(
              prev,
              2
              /* Reused.DOM */
            );
            let tile2 = parent.children[parent.children.length - 1] = new TextTile(prev.dom, prev.text + text);
            tile2.parent = parent;
          } else {
            parent.append(tile || TextTile.of(text, (_a2 = this.cache.find(TextTile)) === null || _a2 === void 0 ? void 0 : _a2.dom));
          }
          this.pos += text.length;
          this.afterWidget = null;
        }
        addComposition(composition, context) {
          let line = this.curLine;
          if (line.dom != context.line.dom) {
            line.setDOM(this.cache.reused.has(context.line) ? freeNode(context.line.dom) : context.line.dom);
            this.cache.reused.set(
              context.line,
              2
              /* Reused.DOM */
            );
          }
          let head = line;
          for (let i2 = context.marks.length - 1; i2 >= 0; i2--) {
            let mark = context.marks[i2];
            let last2 = head.lastChild;
            if (last2 instanceof MarkTile && last2.mark.eq(mark.mark)) {
              if (last2.dom != mark.dom)
                last2.setDOM(freeNode(mark.dom));
              head = last2;
            } else {
              let { dom } = mark;
              if (this.cache.reused.get(mark)) {
                let tile = Tile.get(mark.dom);
                if (tile)
                  dom = freeNode(mark.dom);
              }
              let nw = MarkTile.of(mark.mark, dom);
              head.append(nw);
              head = nw;
            }
            this.cache.reused.set(
              mark,
              2
              /* Reused.DOM */
            );
          }
          let oldTile = Tile.get(composition.text);
          if (oldTile)
            this.cache.reused.set(
              oldTile,
              2
              /* Reused.DOM */
            );
          let text = new TextTile(composition.text, composition.text.nodeValue);
          text.flags |= 8;
          this.pos = composition.range.toB;
          head.append(text);
        }
        addInlineWidget(widget, marks2, openStart) {
          let noSpace = this.afterWidget && widget.flags & 48 && (this.afterWidget.flags & 48) == (widget.flags & 48);
          if (!noSpace)
            this.flushBuffer();
          let parent = this.ensureMarks(marks2, openStart);
          if (!noSpace && !(widget.flags & 16))
            parent.append(this.getBuffer(1));
          parent.append(widget);
          this.pos += widget.length;
          this.afterWidget = widget;
        }
        addMark(tile, marks2, openStart) {
          this.flushBuffer();
          let parent = this.ensureMarks(marks2, openStart);
          parent.append(tile);
          this.pos += tile.length;
          this.afterWidget = null;
        }
        addBlockWidget(widget) {
          this.getBlockPos().append(widget);
          this.pos += widget.length;
          this.lastBlock = widget;
          this.endLine();
        }
        continueWidget(length) {
          let widget = this.afterWidget || this.lastBlock;
          widget.length += length;
          this.pos += length;
        }
        addLineStart(attrs, dom) {
          var _a2;
          if (!attrs)
            attrs = lineBaseAttrs;
          let tile = LineTile.start(attrs, dom || ((_a2 = this.cache.find(LineTile)) === null || _a2 === void 0 ? void 0 : _a2.dom), !!dom);
          this.getBlockPos().append(this.lastBlock = this.curLine = tile);
        }
        addLine(tile) {
          this.getBlockPos().append(tile);
          this.pos += tile.length;
          this.lastBlock = tile;
          this.endLine();
        }
        addBreak() {
          this.lastBlock.flags |= 1;
          this.endLine();
          this.pos++;
        }
        addLineStartIfNotCovered(attrs) {
          if (!this.blockPosCovered())
            this.addLineStart(attrs);
        }
        ensureLine(attrs) {
          if (!this.curLine)
            this.addLineStart(attrs);
        }
        ensureMarks(marks2, openStart) {
          var _a2;
          let parent = this.curLine;
          for (let i2 = marks2.length - 1; i2 >= 0; i2--) {
            let mark = marks2[i2], last2;
            if (openStart > 0 && (last2 = parent.lastChild) && last2 instanceof MarkTile && last2.mark.eq(mark)) {
              parent = last2;
              openStart--;
            } else {
              let tile = MarkTile.of(mark, (_a2 = this.cache.find(MarkTile, (m) => m.mark.eq(mark))) === null || _a2 === void 0 ? void 0 : _a2.dom);
              parent.append(tile);
              parent = tile;
              openStart = 0;
            }
          }
          return parent;
        }
        endLine() {
          if (this.curLine) {
            this.flushBuffer();
            let last2 = this.curLine.lastChild;
            if (!last2 || !hasContent(this.curLine, false) || last2.dom.nodeName != "BR" && last2.isWidget() && !(browser.ios && hasContent(this.curLine, true)))
              this.curLine.append(this.cache.findWidget(
                BreakWidget,
                0,
                32
                /* TileFlag.After */
              ) || new WidgetTile(
                BreakWidget.toDOM(),
                0,
                BreakWidget,
                32
                /* TileFlag.After */
              ));
            this.curLine = this.afterWidget = null;
          }
        }
        updateBlockWrappers() {
          if (this.wrapperPos > this.pos + 1e4) {
            this.blockWrappers.goto(this.pos);
            this.wrappers.length = 0;
          }
          for (let i2 = this.wrappers.length - 1; i2 >= 0; i2--)
            if (this.wrappers[i2].to < this.pos)
              this.wrappers.splice(i2, 1);
          for (let cur = this.blockWrappers; cur.value && cur.from <= this.pos; cur.next())
            if (cur.to >= this.pos) {
              let rank = cur.rank * 102 + cur.value.rank;
              let wrap = new OpenWrapper(cur.from, cur.to, cur.value, rank), i2 = this.wrappers.length;
              while (i2 > 0 && (this.wrappers[i2 - 1].rank - wrap.rank || this.wrappers[i2 - 1].to - wrap.to) < 0)
                i2--;
              this.wrappers.splice(i2, 0, wrap);
            }
          this.wrapperPos = this.pos;
        }
        getBlockPos() {
          var _a2;
          this.updateBlockWrappers();
          let parent = this.root;
          for (let wrap of this.wrappers) {
            let last2 = parent.lastChild;
            if (wrap.from < this.pos && last2 instanceof BlockWrapperTile && last2.wrapper.eq(wrap.wrapper)) {
              parent = last2;
            } else {
              let tile = BlockWrapperTile.of(wrap.wrapper, (_a2 = this.cache.find(BlockWrapperTile, (t2) => t2.wrapper.eq(wrap.wrapper))) === null || _a2 === void 0 ? void 0 : _a2.dom);
              parent.append(tile);
              parent = tile;
            }
          }
          return parent;
        }
        blockPosCovered() {
          let last2 = this.lastBlock;
          return last2 != null && !last2.breakAfter && (!last2.isWidget() || (last2.flags & (32 | 128)) > 0);
        }
        getBuffer(side) {
          let flags = 2 | (side < 0 ? 16 : 32);
          let found = this.cache.find(
            WidgetBufferTile,
            void 0,
            1
            /* Reused.Full */
          );
          if (found)
            found.flags = flags;
          return found || new WidgetBufferTile(flags);
        }
        flushBuffer() {
          if (this.afterWidget && !(this.afterWidget.flags & 32)) {
            this.afterWidget.parent.append(this.getBuffer(-1));
            this.afterWidget = null;
          }
        }
      };
      TextStream = class {
        constructor(doc2) {
          this.skipCount = 0;
          this.text = "";
          this.textOff = 0;
          this.cursor = doc2.iter();
        }
        skip(len) {
          if (this.textOff + len <= this.text.length) {
            this.textOff += len;
          } else {
            this.skipCount += len - (this.text.length - this.textOff);
            this.text = "";
            this.textOff = 0;
          }
        }
        next(maxLen) {
          if (this.textOff == this.text.length) {
            let { value, lineBreak, done } = this.cursor.next(this.skipCount);
            this.skipCount = 0;
            if (done)
              throw new Error("Ran out of text content when drawing inline views");
            this.text = value;
            let len = this.textOff = Math.min(maxLen, value.length);
            return lineBreak ? null : value.slice(0, len);
          }
          let end = Math.min(this.text.length, this.textOff + maxLen);
          let chars = this.text.slice(this.textOff, end);
          this.textOff = end;
          return chars;
        }
      };
      buckets = [WidgetTile, LineTile, TextTile, MarkTile, WidgetBufferTile, BlockWrapperTile, DocTile];
      for (let i2 = 0; i2 < buckets.length; i2++)
        buckets[i2].bucket = i2;
      TileCache = class {
        constructor(view) {
          this.view = view;
          this.buckets = buckets.map(() => []);
          this.index = buckets.map(() => 0);
          this.reused = /* @__PURE__ */ new Map();
        }
        // Put a tile in the cache.
        add(tile) {
          let i2 = tile.constructor.bucket, bucket = this.buckets[i2];
          if (bucket.length < 6)
            bucket.push(tile);
          else
            bucket[
              this.index[i2] = (this.index[i2] + 1) % 6
              /* C.Bucket */
            ] = tile;
        }
        find(cls, test, type = 2) {
          let i2 = cls.bucket;
          let bucket = this.buckets[i2], off = this.index[i2];
          for (let j = 0; j < bucket.length; j++) {
            let index = (j + off) % bucket.length, tile = bucket[index];
            if ((!test || test(tile)) && !this.reused.has(tile)) {
              bucket.splice(index, 1);
              if (index < off)
                this.index[i2]--;
              this.reused.set(tile, type);
              return tile;
            }
          }
          return null;
        }
        findWidget(widget, length, flags) {
          let widgets = this.buckets[0];
          if (widgets.length)
            for (let i2 = 0, pass = 0; ; i2++) {
              if (i2 == widgets.length) {
                if (pass)
                  return null;
                pass = 1;
                i2 = 0;
              }
              let tile = widgets[i2];
              if (!this.reused.has(tile) && (pass == 0 ? tile.widget.compare(widget) : tile.widget.constructor == widget.constructor && widget.updateDOM(tile.dom, this.view, tile.widget))) {
                widgets.splice(i2, 1);
                if (i2 < this.index[0])
                  this.index[0]--;
                if (tile.widget == widget && tile.length == length && (tile.flags & (496 | 1)) == flags) {
                  this.reused.set(
                    tile,
                    1
                    /* Reused.Full */
                  );
                  return tile;
                } else {
                  this.reused.set(
                    tile,
                    2
                    /* Reused.DOM */
                  );
                  return new WidgetTile(tile.dom, length, widget, tile.flags & ~(496 | 1) | flags);
                }
              }
            }
        }
        reuse(tile) {
          this.reused.set(
            tile,
            1
            /* Reused.Full */
          );
          return tile;
        }
        maybeReuse(tile, type = 2) {
          if (this.reused.has(tile))
            return void 0;
          this.reused.set(tile, type);
          return tile.dom;
        }
        clear() {
          for (let i2 = 0; i2 < this.buckets.length; i2++)
            this.buckets[i2].length = this.index[i2] = 0;
        }
      };
      TileUpdate = class {
        constructor(view, old, blockWrappers2, decorations2, disallowBlockEffectsFor) {
          this.view = view;
          this.decorations = decorations2;
          this.disallowBlockEffectsFor = disallowBlockEffectsFor;
          this.openWidget = false;
          this.openMarks = 0;
          this.cache = new TileCache(view);
          this.text = new TextStream(view.state.doc);
          this.builder = new TileBuilder(this.cache, new DocTile(view, view.contentDOM), RangeSet.iter(blockWrappers2));
          this.cache.reused.set(
            old,
            2
            /* Reused.DOM */
          );
          this.old = new TilePointer(old);
          this.reuseWalker = {
            skip: (tile, from, to) => {
              this.cache.add(tile);
              if (tile.isComposite())
                return false;
            },
            enter: (tile) => this.cache.add(tile),
            leave: () => {
            },
            break: () => {
            }
          };
        }
        run(changes, composition) {
          let compositionContext = composition && this.getCompositionContext(composition.text);
          for (let posA = 0, posB = 0, i2 = 0; ; ) {
            let next = i2 < changes.length ? changes[i2++] : null;
            let skipA = next ? next.fromA : this.old.root.length;
            if (skipA > posA) {
              let len = skipA - posA;
              this.preserve(len, !i2, !next);
              posA = skipA;
              posB += len;
            }
            if (!next)
              break;
            if (composition && next.fromA <= composition.range.fromA && next.toA >= composition.range.toA) {
              this.forward(next.fromA, composition.range.fromA, composition.range.fromA < composition.range.toA ? 1 : -1);
              this.emit(posB, composition.range.fromB);
              this.builder.flushBuffer();
              this.cache.clear();
              this.builder.addComposition(composition, compositionContext);
              this.text.skip(composition.range.toB - composition.range.fromB);
              this.forward(composition.range.fromA, next.toA);
              this.emit(composition.range.toB, next.toB);
            } else {
              this.forward(next.fromA, next.toA);
              this.emit(posB, next.toB);
            }
            posB = next.toB;
            posA = next.toA;
          }
          if (this.builder.curLine)
            this.builder.endLine();
          return this.builder.root;
        }
        preserve(length, incStart, incEnd) {
          let activeMarks = getMarks(this.old), openMarks = this.openMarks;
          this.old.advance(length, incEnd ? 1 : -1, {
            skip: (tile, from, to) => {
              if (tile.isWidget()) {
                if (this.openWidget) {
                  this.builder.continueWidget(to - from);
                } else {
                  let widget = to > 0 || from < tile.length ? WidgetTile.of(tile.widget, this.view, to - from, tile.flags & 496, this.cache.maybeReuse(tile)) : this.cache.reuse(tile);
                  if (widget.flags & 256) {
                    widget.flags &= ~1;
                    this.builder.addBlockWidget(widget);
                  } else {
                    this.builder.ensureLine(null);
                    this.builder.addInlineWidget(widget, activeMarks, openMarks);
                    openMarks = activeMarks.length;
                  }
                }
              } else if (tile.isText()) {
                this.builder.ensureLine(null);
                if (!from && to == tile.length && !this.cache.reused.has(tile)) {
                  this.builder.addText(tile.text, activeMarks, openMarks, this.cache.reuse(tile));
                } else {
                  this.cache.add(tile);
                  this.builder.addText(tile.text.slice(from, to), activeMarks, openMarks);
                }
                openMarks = activeMarks.length;
              } else if (tile.isLine()) {
                tile.flags &= ~1;
                this.cache.reused.set(
                  tile,
                  1
                  /* Reused.Full */
                );
                this.builder.addLine(tile);
              } else if (tile instanceof WidgetBufferTile) {
                this.cache.add(tile);
              } else if (tile instanceof MarkTile) {
                this.builder.ensureLine(null);
                this.builder.addMark(tile, activeMarks, openMarks);
                this.cache.reused.set(
                  tile,
                  1
                  /* Reused.Full */
                );
                openMarks = activeMarks.length;
              } else {
                return false;
              }
              this.openWidget = false;
            },
            enter: (tile) => {
              if (tile.isLine()) {
                this.builder.addLineStart(tile.attrs, this.cache.maybeReuse(tile));
              } else {
                this.cache.add(tile);
                if (tile instanceof MarkTile)
                  activeMarks.unshift(tile.mark);
              }
              this.openWidget = false;
            },
            leave: (tile) => {
              if (tile.isLine()) {
                if (activeMarks.length)
                  activeMarks.length = openMarks = 0;
              } else if (tile instanceof MarkTile) {
                activeMarks.shift();
                openMarks = Math.min(openMarks, activeMarks.length);
              }
            },
            break: () => {
              this.builder.addBreak();
              this.openWidget = false;
            }
          });
          this.text.skip(length);
        }
        emit(from, to) {
          let pendingLineAttrs = null;
          let b = this.builder, markCount = -1;
          let openEnd = RangeSet.spans(this.decorations, from, to, {
            point: (from2, to2, deco, active, openStart, index) => {
              if (deco instanceof PointDecoration) {
                if (this.disallowBlockEffectsFor[index]) {
                  if (deco.block)
                    throw new RangeError("Block decorations may not be specified via plugins");
                  if (to2 > this.view.state.doc.lineAt(from2).to)
                    throw new RangeError("Decorations that replace line breaks may not be specified via plugins");
                }
                markCount = active.length;
                if (openStart > active.length) {
                  b.continueWidget(to2 - from2);
                } else {
                  let widget = deco.widget || (deco.block ? NullWidget.block : NullWidget.inline);
                  let flags = widgetFlags(deco);
                  let tile = this.cache.findWidget(widget, to2 - from2, flags) || WidgetTile.of(widget, this.view, to2 - from2, flags);
                  if (deco.block) {
                    if (deco.startSide > 0)
                      b.addLineStartIfNotCovered(pendingLineAttrs);
                    b.addBlockWidget(tile);
                  } else {
                    b.ensureLine(pendingLineAttrs);
                    b.addInlineWidget(tile, active, openStart);
                  }
                }
                pendingLineAttrs = null;
              } else {
                pendingLineAttrs = addLineDeco(pendingLineAttrs, deco);
              }
              if (to2 > from2)
                this.text.skip(to2 - from2);
            },
            span: (from2, to2, active, openStart) => {
              for (let pos = from2; pos < to2; ) {
                let chars = this.text.next(Math.min(512, to2 - pos));
                if (chars == null) {
                  b.addLineStartIfNotCovered(pendingLineAttrs);
                  b.addBreak();
                  pos++;
                } else {
                  b.ensureLine(pendingLineAttrs);
                  b.addText(chars, active, pos == from2 ? openStart : active.length);
                  pos += chars.length;
                }
                pendingLineAttrs = null;
              }
              markCount = active.length;
            }
          });
          if (markCount > -1)
            this.openWidget = openEnd > markCount;
          if (!this.openWidget)
            b.addLineStartIfNotCovered(pendingLineAttrs);
          this.openMarks = openEnd;
        }
        forward(from, to, side = 1) {
          if (to - from <= 10) {
            this.old.advance(to - from, side, this.reuseWalker);
          } else {
            this.old.advance(5, -1, this.reuseWalker);
            this.old.advance(to - from - 10, -1);
            this.old.advance(5, side, this.reuseWalker);
          }
        }
        getCompositionContext(text) {
          let marks2 = [], line = null;
          for (let parent = text.parentNode; ; parent = parent.parentNode) {
            let tile = Tile.get(parent);
            if (parent == this.view.contentDOM)
              break;
            if (tile instanceof MarkTile)
              marks2.push(tile);
            else if (tile === null || tile === void 0 ? void 0 : tile.isLine())
              line = tile;
            else if (tile instanceof BlockWrapperTile) ;
            else if (parent.nodeName == "DIV" && !line)
              line = new LineTile(parent, lineBaseAttrs);
            else if (!line)
              marks2.push(MarkTile.of(new MarkDecoration({ tagName: parent.nodeName.toLowerCase(), attributes: getAttrs(parent) }), parent));
          }
          if (!line)
            return null;
          return { line, marks: marks2 };
        }
      };
      lineBaseAttrs = { class: "cm-line" };
      NullWidget = class extends WidgetType {
        constructor(tag) {
          super();
          this.tag = tag;
        }
        eq(other) {
          return other.tag == this.tag;
        }
        toDOM() {
          return document.createElement(this.tag);
        }
        updateDOM(elt) {
          return elt.nodeName.toLowerCase() == this.tag;
        }
        get isHidden() {
          return true;
        }
      };
      NullWidget.inline = /* @__PURE__ */ new NullWidget("span");
      NullWidget.block = /* @__PURE__ */ new NullWidget("div");
      BreakWidget = /* @__PURE__ */ new class extends WidgetType {
        toDOM() {
          return document.createElement("br");
        }
        get isHidden() {
          return true;
        }
        get editable() {
          return true;
        }
      }();
      DocView = class {
        constructor(view) {
          this.view = view;
          this.decorations = [];
          this.blockWrappers = [];
          this.dynamicDecorationMap = [false];
          this.domChanged = null;
          this.hasComposition = null;
          this.editContextFormatting = Decoration.none;
          this.lastCompositionAfterCursor = false;
          this.minWidth = 0;
          this.minWidthFrom = 0;
          this.minWidthTo = 0;
          this.impreciseAnchor = null;
          this.impreciseHead = null;
          this.forceSelection = false;
          this.lastUpdate = Date.now();
          this.updateDeco();
          this.tile = new DocTile(view, view.contentDOM);
          this.updateInner([new ChangedRange(0, 0, 0, view.state.doc.length)], null);
        }
        // Update the document view to a given state.
        update(update) {
          var _a2;
          let changedRanges = update.changedRanges;
          if (this.minWidth > 0 && changedRanges.length) {
            if (!changedRanges.every(({ fromA, toA }) => toA < this.minWidthFrom || fromA > this.minWidthTo)) {
              this.minWidth = this.minWidthFrom = this.minWidthTo = 0;
            } else {
              this.minWidthFrom = update.changes.mapPos(this.minWidthFrom, 1);
              this.minWidthTo = update.changes.mapPos(this.minWidthTo, 1);
            }
          }
          this.updateEditContextFormatting(update);
          let readCompositionAt = -1;
          if (this.view.inputState.composing >= 0 && !this.view.observer.editContext) {
            if ((_a2 = this.domChanged) === null || _a2 === void 0 ? void 0 : _a2.newSel)
              readCompositionAt = this.domChanged.newSel.head;
            else if (!touchesComposition(update.changes, this.hasComposition) && !update.selectionSet)
              readCompositionAt = update.state.selection.main.head;
          }
          let composition = readCompositionAt > -1 ? findCompositionRange(this.view, update.changes, readCompositionAt) : null;
          this.domChanged = null;
          if (this.hasComposition) {
            let { from, to } = this.hasComposition;
            changedRanges = new ChangedRange(from, to, update.changes.mapPos(from, -1), update.changes.mapPos(to, 1)).addToSet(changedRanges.slice());
          }
          this.hasComposition = composition ? { from: composition.range.fromB, to: composition.range.toB } : null;
          if ((browser.ie || browser.chrome) && !composition && update && update.state.doc.lines != update.startState.doc.lines)
            this.forceSelection = true;
          let prevDeco = this.decorations, prevWrappers = this.blockWrappers;
          this.updateDeco();
          let decoDiff = findChangedDeco(prevDeco, this.decorations, update.changes);
          if (decoDiff.length)
            changedRanges = ChangedRange.extendWithRanges(changedRanges, decoDiff);
          let blockDiff = findChangedWrappers(prevWrappers, this.blockWrappers, update.changes);
          if (blockDiff.length)
            changedRanges = ChangedRange.extendWithRanges(changedRanges, blockDiff);
          if (composition && !changedRanges.some((r) => r.fromA <= composition.range.fromA && r.toA >= composition.range.toA))
            changedRanges = composition.range.addToSet(changedRanges.slice());
          if (this.tile.flags & 2 && changedRanges.length == 0) {
            return false;
          } else {
            this.updateInner(changedRanges, composition);
            if (update.transactions.length)
              this.lastUpdate = Date.now();
            return true;
          }
        }
        // Used by update and the constructor do perform the actual DOM
        // update
        updateInner(changes, composition) {
          this.view.viewState.mustMeasureContent = true;
          let { observer } = this.view;
          observer.ignore(() => {
            if (composition || changes.length) {
              let oldTile = this.tile;
              let builder = new TileUpdate(this.view, oldTile, this.blockWrappers, this.decorations, this.dynamicDecorationMap);
              if (composition && Tile.get(composition.text))
                builder.cache.reused.set(
                  Tile.get(composition.text),
                  2
                  /* Reused.DOM */
                );
              this.tile = builder.run(changes, composition);
              destroyDropped(oldTile, builder.cache.reused);
            }
            this.tile.dom.style.height = this.view.viewState.contentHeight / this.view.scaleY + "px";
            this.tile.dom.style.flexBasis = this.minWidth ? this.minWidth + "px" : "";
            let track = browser.chrome || browser.ios ? { node: observer.selectionRange.focusNode, written: false } : void 0;
            this.tile.sync(track);
            if (track && (track.written || observer.selectionRange.focusNode != track.node || !this.tile.dom.contains(track.node)))
              this.forceSelection = true;
            this.tile.dom.style.height = "";
          });
          let gaps = [];
          if (this.view.viewport.from || this.view.viewport.to < this.view.state.doc.length) {
            for (let child of this.tile.children)
              if (child.isWidget() && child.widget instanceof BlockGapWidget)
                gaps.push(child.dom);
          }
          observer.updateGaps(gaps);
        }
        updateEditContextFormatting(update) {
          this.editContextFormatting = this.editContextFormatting.map(update.changes);
          for (let tr of update.transactions)
            for (let effect of tr.effects)
              if (effect.is(setEditContextFormatting)) {
                this.editContextFormatting = effect.value;
              }
        }
        // Sync the DOM selection to this.state.selection
        updateSelection(mustRead = false, fromPointer = false) {
          if (mustRead || !this.view.observer.selectionRange.focusNode)
            this.view.observer.readSelectionRange();
          let { dom } = this.tile;
          let activeElt = this.view.root.activeElement, focused = activeElt == dom;
          let selectionNotFocus = !focused && !(this.view.state.facet(editable) || dom.tabIndex > -1) && hasSelection(dom, this.view.observer.selectionRange) && !(activeElt && dom.contains(activeElt));
          if (!(focused || fromPointer || selectionNotFocus))
            return;
          let force = this.forceSelection;
          this.forceSelection = false;
          let main = this.view.state.selection.main, anchor, head;
          if (main.empty) {
            head = anchor = this.inlineDOMNearPos(main.anchor, main.assoc || 1);
          } else {
            head = this.inlineDOMNearPos(main.head, main.head == main.from ? 1 : -1);
            anchor = this.inlineDOMNearPos(main.anchor, main.anchor == main.from ? 1 : -1);
          }
          if (browser.gecko && main.empty && !this.hasComposition && betweenUneditable(anchor)) {
            let dummy = document.createTextNode("");
            this.view.observer.ignore(() => anchor.node.insertBefore(dummy, anchor.node.childNodes[anchor.offset] || null));
            anchor = head = new DOMPos(dummy, 0);
            force = true;
          }
          let domSel = this.view.observer.selectionRange;
          if (force || !domSel.focusNode || (!isEquivalentPosition(anchor.node, anchor.offset, domSel.anchorNode, domSel.anchorOffset) || !isEquivalentPosition(head.node, head.offset, domSel.focusNode, domSel.focusOffset)) && !this.suppressWidgetCursorChange(domSel, main)) {
            this.view.observer.ignore(() => {
              if (browser.android && browser.chrome && dom.contains(domSel.focusNode) && inUneditable(domSel.focusNode, dom)) {
                dom.blur();
                dom.focus({ preventScroll: true });
              }
              let rawSel = getSelection(this.view.root);
              if (!rawSel) ;
              else if (main.empty) {
                if (browser.gecko) {
                  let nextTo = nextToUneditable(anchor.node, anchor.offset);
                  if (nextTo && nextTo != (1 | 2)) {
                    let text = (nextTo == 1 ? textNodeBefore : textNodeAfter)(anchor.node, anchor.offset);
                    if (text)
                      anchor = new DOMPos(text.node, text.offset);
                  }
                }
                rawSel.collapse(anchor.node, anchor.offset);
                if (main.bidiLevel != null && rawSel.caretBidiLevel !== void 0)
                  rawSel.caretBidiLevel = main.bidiLevel;
              } else if (rawSel.extend) {
                rawSel.collapse(anchor.node, anchor.offset);
                try {
                  rawSel.extend(head.node, head.offset);
                } catch (_) {
                }
              } else {
                let range = document.createRange();
                if (main.anchor > main.head)
                  [anchor, head] = [head, anchor];
                range.setEnd(head.node, head.offset);
                range.setStart(anchor.node, anchor.offset);
                rawSel.removeAllRanges();
                rawSel.addRange(range);
              }
              if (selectionNotFocus && this.view.root.activeElement == dom) {
                dom.blur();
                if (activeElt)
                  activeElt.focus();
              }
            });
            this.view.observer.setSelectionRange(anchor, head);
          }
          this.impreciseAnchor = anchor.precise ? null : new DOMPos(domSel.anchorNode, domSel.anchorOffset);
          this.impreciseHead = head.precise ? null : new DOMPos(domSel.focusNode, domSel.focusOffset);
        }
        // If a zero-length widget is inserted next to the cursor during
        // composition, avoid moving it across it and disrupting the
        // composition.
        suppressWidgetCursorChange(sel, cursor) {
          return this.hasComposition && cursor.empty && isEquivalentPosition(sel.focusNode, sel.focusOffset, sel.anchorNode, sel.anchorOffset) && this.posFromDOM(sel.focusNode, sel.focusOffset) == cursor.head;
        }
        enforceCursorAssoc() {
          if (this.hasComposition)
            return;
          let { view } = this, cursor = view.state.selection.main;
          let sel = getSelection(view.root);
          let { anchorNode, anchorOffset } = view.observer.selectionRange;
          if (!sel || !cursor.empty || !cursor.assoc || !sel.modify)
            return;
          let line = this.lineAt(cursor.head, cursor.assoc);
          if (!line)
            return;
          let lineStart = line.posAtStart;
          if (cursor.head == lineStart || cursor.head == lineStart + line.length)
            return;
          let before = this.coordsAt(cursor.head, -1), after = this.coordsAt(cursor.head, 1);
          if (!before || !after || before.bottom > after.top)
            return;
          let dom = this.domAtPos(cursor.head + cursor.assoc, cursor.assoc);
          sel.collapse(dom.node, dom.offset);
          sel.modify("move", cursor.assoc < 0 ? "forward" : "backward", "lineboundary");
          view.observer.readSelectionRange();
          let newRange = view.observer.selectionRange;
          if (view.docView.posFromDOM(newRange.anchorNode, newRange.anchorOffset) != cursor.from)
            sel.collapse(anchorNode, anchorOffset);
        }
        posFromDOM(node, offset) {
          let tile = this.tile.nearest(node);
          if (!tile)
            return this.tile.dom.compareDocumentPosition(node) & 2 ? 0 : this.view.state.doc.length;
          let start = tile.posAtStart;
          if (tile.isComposite()) {
            let after;
            if (node == tile.dom) {
              after = tile.dom.childNodes[offset];
            } else {
              let bias = maxOffset(node) == 0 ? 0 : offset == 0 ? -1 : 1;
              for (; ; ) {
                let parent = node.parentNode;
                if (parent == tile.dom)
                  break;
                if (bias == 0 && parent.firstChild != parent.lastChild) {
                  if (node == parent.firstChild)
                    bias = -1;
                  else
                    bias = 1;
                }
                node = parent;
              }
              if (bias < 0)
                after = node;
              else
                after = node.nextSibling;
            }
            if (after == tile.dom.firstChild)
              return start;
            while (after && !Tile.get(after))
              after = after.nextSibling;
            if (!after)
              return start + tile.length;
            for (let i2 = 0, pos = start; ; i2++) {
              let child = tile.children[i2];
              if (child.dom == after)
                return pos;
              pos += child.length + child.breakAfter;
            }
          } else if (tile.isText()) {
            return node == tile.dom ? start + offset : start + (offset ? tile.length : 0);
          } else {
            return start;
          }
        }
        domAtPos(pos, side) {
          let { tile, offset } = this.tile.resolveBlock(pos, side);
          if (tile.isWidget())
            return tile.domPosFor(offset, side);
          return tile.domIn(offset, side);
        }
        inlineDOMNearPos(pos, side) {
          let before, beforeOff = -1, beforeBad = false;
          let after, afterOff = -1, afterBad = false;
          this.tile.blockTiles((tile, off) => {
            if (tile.isWidget()) {
              if (tile.flags & 32 && off >= pos)
                return true;
              if (tile.flags & 16)
                beforeBad = true;
            } else {
              let end = off + tile.length;
              if (off <= pos) {
                before = tile;
                beforeOff = pos - off;
                beforeBad = end < pos;
              }
              if (end >= pos && !after) {
                after = tile;
                afterOff = pos - off;
                afterBad = off > pos;
              }
              if (off > pos && after)
                return true;
            }
          });
          if (!before && !after)
            return this.domAtPos(pos, side);
          if (beforeBad && after)
            before = null;
          else if (afterBad && before)
            after = null;
          return before && side < 0 || !after ? before.domIn(beforeOff, side) : after.domIn(afterOff, side);
        }
        // Get the coord of the element at the given side of the given
        // position. If rtl is given, flatten it using that text direction.
        coordsAt(pos, side, rtl) {
          let { tile, offset } = this.tile.resolveBlock(pos, side);
          if (tile.isWidget()) {
            if (tile.widget instanceof BlockGapWidget)
              return null;
            return tile.coordsInWidget(offset, side, true);
          }
          return tile.coordsIn(offset, side, rtl);
        }
        lineAt(pos, side) {
          let { tile } = this.tile.resolveBlock(pos, side);
          return tile.isLine() ? tile : null;
        }
        coordsForChar(pos) {
          let { tile, offset } = this.tile.resolveBlock(pos, 1);
          if (!tile.isLine())
            return null;
          function scan(tile2, offset2) {
            if (tile2.isComposite()) {
              for (let ch of tile2.children) {
                if (ch.length >= offset2) {
                  let found = scan(ch, offset2);
                  if (found)
                    return found;
                }
                offset2 -= ch.length;
                if (offset2 < 0)
                  break;
              }
            } else if (tile2.isText() && offset2 < tile2.length) {
              let end = findClusterBreak2(tile2.text, offset2);
              if (end == offset2)
                return null;
              let rects = textRange(tile2.dom, offset2, end).getClientRects();
              for (let i2 = 0; i2 < rects.length; i2++) {
                let rect = rects[i2];
                if (i2 == rects.length - 1 || rect.top < rect.bottom && rect.left < rect.right)
                  return rect;
              }
            }
            return null;
          }
          return scan(tile, offset);
        }
        measureVisibleLineHeights(viewport) {
          let result = [], { from, to } = viewport;
          let contentWidth = this.view.contentDOM.clientWidth;
          let isWider = contentWidth > Math.max(this.view.scrollDOM.clientWidth, this.minWidth) + 1;
          let widest = -1, ltr = this.view.textDirection == Direction.LTR;
          let spaceAbove = 0;
          let scan = (tile, pos, measureBounds) => {
            for (let i2 = 0; i2 < tile.children.length; i2++) {
              if (pos > to)
                break;
              let child = tile.children[i2], end = pos + child.length;
              let childRect = child.dom.getBoundingClientRect(), { height } = childRect;
              if (measureBounds && !i2)
                spaceAbove += childRect.top - measureBounds.top;
              if (child instanceof BlockWrapperTile) {
                if (end > from)
                  scan(child, pos, childRect);
              } else if (pos >= from) {
                if (spaceAbove > 0)
                  result.push(-spaceAbove);
                result.push(height + spaceAbove);
                spaceAbove = 0;
                if (isWider) {
                  let last2 = child.dom.lastChild;
                  let rects = last2 ? clientRectsFor(last2) : [];
                  if (rects.length) {
                    let rect = rects[rects.length - 1];
                    let width = ltr ? rect.right - childRect.left : childRect.right - rect.left;
                    if (width > widest) {
                      widest = width;
                      this.minWidth = contentWidth;
                      this.minWidthFrom = pos;
                      this.minWidthTo = end;
                    }
                  }
                }
              }
              if (measureBounds && i2 == tile.children.length - 1)
                spaceAbove += measureBounds.bottom - childRect.bottom;
              pos = end + child.breakAfter;
            }
          };
          scan(this.tile, 0, null);
          return result;
        }
        textDirectionAt(pos) {
          let { tile } = this.tile.resolveBlock(pos, 1);
          return getComputedStyle(tile.dom).direction == "rtl" ? Direction.RTL : Direction.LTR;
        }
        measureTextSize() {
          let lineMeasure = this.tile.blockTiles((tile) => {
            if (tile.isLine() && tile.children.length && tile.length <= 20) {
              let totalWidth = 0, textHeight2;
              for (let child of tile.children) {
                if (!child.isText() || /[^ -~]/.test(child.text))
                  return void 0;
                let rects = clientRectsFor(child.dom);
                if (rects.length != 1)
                  return void 0;
                totalWidth += rects[0].width;
                textHeight2 = rects[0].height;
              }
              if (totalWidth)
                return {
                  lineHeight: tile.dom.getBoundingClientRect().height,
                  charWidth: totalWidth / tile.length,
                  textHeight: textHeight2
                };
            }
          });
          if (lineMeasure)
            return lineMeasure;
          let dummy = document.createElement("div"), lineHeight, charWidth, textHeight;
          dummy.className = "cm-line";
          dummy.style.width = "99999px";
          dummy.style.position = "absolute";
          dummy.textContent = "abc def ghi jkl mno pqr stu";
          this.view.observer.ignore(() => {
            this.tile.dom.appendChild(dummy);
            let rect = clientRectsFor(dummy.firstChild)[0];
            lineHeight = dummy.getBoundingClientRect().height;
            charWidth = rect && rect.width ? rect.width / 27 : 7;
            textHeight = rect && rect.height ? rect.height : lineHeight;
            dummy.remove();
          });
          return { lineHeight, charWidth, textHeight };
        }
        computeBlockGapDeco() {
          let deco = [], vs = this.view.viewState;
          for (let pos = 0, i2 = 0; ; i2++) {
            let next = i2 == vs.viewports.length ? null : vs.viewports[i2];
            let end = next ? next.from - 1 : this.view.state.doc.length;
            if (end > pos) {
              let height = (vs.lineBlockAt(end).bottom - vs.lineBlockAt(pos).top) / this.view.scaleY;
              deco.push(Decoration.replace({
                widget: new BlockGapWidget(height),
                block: true,
                inclusive: true,
                isBlockGap: true
              }).range(pos, end));
            }
            if (!next)
              break;
            pos = next.to + 1;
          }
          return Decoration.set(deco);
        }
        updateDeco() {
          let i2 = 1;
          let allDeco = this.view.state.facet(decorations).map((d) => {
            let dynamic = this.dynamicDecorationMap[i2++] = typeof d == "function";
            return dynamic ? d(this.view) : d;
          });
          let dynamicOuter = false, outerDeco = this.view.state.facet(outerDecorations).map((d, i3) => {
            let dynamic = typeof d == "function";
            if (dynamic)
              dynamicOuter = true;
            return dynamic ? d(this.view) : d;
          });
          if (outerDeco.length) {
            this.dynamicDecorationMap[i2++] = dynamicOuter;
            allDeco.push(RangeSet.join(outerDeco));
          }
          this.decorations = [
            this.editContextFormatting,
            ...allDeco,
            this.computeBlockGapDeco(),
            this.view.viewState.lineGapDeco
          ];
          while (i2 < this.decorations.length)
            this.dynamicDecorationMap[i2++] = false;
          this.blockWrappers = this.view.state.facet(blockWrappers).map((v) => typeof v == "function" ? v(this.view) : v);
        }
        scrollIntoView(target) {
          if (target.isSnapshot) {
            let ref = this.view.viewState.lineBlockAt(target.range.head);
            this.view.scrollDOM.scrollTop = ref.top - target.yMargin;
            this.view.scrollDOM.scrollLeft = target.xMargin;
            return;
          }
          for (let handler of this.view.state.facet(scrollHandler)) {
            try {
              if (handler(this.view, target.range, target))
                return true;
            } catch (e) {
              logException(this.view.state, e, "scroll handler");
            }
          }
          let { range } = target;
          let rect = this.coordsAt(range.head, range.assoc || (range.head > range.anchor ? -1 : 1)), other;
          if (!rect)
            return;
          if (!range.empty && (other = this.coordsAt(range.anchor, range.anchor > range.head ? -1 : 1)))
            rect = {
              left: Math.min(rect.left, other.left),
              top: Math.min(rect.top, other.top),
              right: Math.max(rect.right, other.right),
              bottom: Math.max(rect.bottom, other.bottom)
            };
          let margins = getScrollMargins(this.view);
          let targetRect = {
            left: rect.left - margins.left,
            top: rect.top - margins.top,
            right: rect.right + margins.right,
            bottom: rect.bottom + margins.bottom
          };
          let { offsetWidth, offsetHeight } = this.view.scrollDOM;
          scrollRectIntoView(this.view.scrollDOM, targetRect, range.head < range.anchor ? -1 : 1, target.x, target.y, Math.max(Math.min(target.xMargin, offsetWidth), -offsetWidth), Math.max(Math.min(target.yMargin, offsetHeight), -offsetHeight), this.view.textDirection == Direction.LTR);
          if (window.visualViewport && window.innerHeight - window.visualViewport.height > 1 && (rect.top > window.visualViewport.offsetTop + window.visualViewport.height || rect.bottom < window.visualViewport.offsetTop)) {
            let line = this.view.docView.lineAt(range.head, 1);
            if (line) {
              let stack = getScrollStack(line.dom);
              line.dom.scrollIntoView({ block: "nearest" });
              restoreScrollStack(stack, false);
            }
          }
        }
        lineHasWidget(pos) {
          let scan = (child) => child.isWidget() || child.children.some(scan);
          return scan(this.tile.resolveBlock(pos, 1).tile);
        }
        destroy() {
          destroyDropped(this.tile);
        }
      };
      DecorationComparator$1 = class DecorationComparator {
        constructor() {
          this.changes = [];
        }
        compareRange(from, to) {
          addRange(from, to, this.changes);
        }
        comparePoint(from, to) {
          addRange(from, to, this.changes);
        }
        boundChange(pos) {
          addRange(pos, pos, this.changes);
        }
      };
      WrapperComparator = class {
        constructor() {
          this.changes = [];
        }
        compareRange(from, to) {
          addRange(from, to, this.changes);
        }
        comparePoint() {
        }
        boundChange(pos) {
          addRange(pos, pos, this.changes);
        }
      };
      BlockGapWidget = class extends WidgetType {
        constructor(height) {
          super();
          this.height = height;
        }
        toDOM() {
          let elt = document.createElement("div");
          elt.className = "cm-gap";
          this.updateDOM(elt);
          return elt;
        }
        eq(other) {
          return other.height == this.height;
        }
        updateDOM(elt) {
          elt.style.height = this.height + "px";
          return true;
        }
        get editable() {
          return true;
        }
        get estimatedHeight() {
          return this.height;
        }
        ignoreEvent() {
          return false;
        }
      };
      PosAssoc = class {
        constructor(pos, assoc) {
          this.pos = pos;
          this.assoc = assoc;
        }
      };
      InlineCoordsScan = class {
        constructor(view, x, y, baseDir) {
          this.view = view;
          this.x = x;
          this.y = y;
          this.baseDir = baseDir;
          this.line = null;
          this.spans = null;
        }
        bidiSpansAt(pos) {
          if (!this.line || this.line.from > pos || this.line.to < pos) {
            this.line = this.view.state.doc.lineAt(pos);
            this.spans = this.view.bidiSpans(this.line);
          }
          return this;
        }
        baseDirAt(pos, side) {
          let { line, spans } = this.bidiSpansAt(pos);
          let level = spans[BidiSpan.find(spans, pos - line.from, -1, side)].level;
          return level == this.baseDir;
        }
        dirAt(pos, side) {
          let { line, spans } = this.bidiSpansAt(pos);
          return spans[BidiSpan.find(spans, pos - line.from, -1, side)].dir;
        }
        // Used to short-circuit bidi tests for content with a uniform direction
        bidiIn(from, to) {
          let { spans, line } = this.bidiSpansAt(from);
          return spans.length > 1 || spans.length && (spans[0].level != this.baseDir || spans[0].to + line.from < to);
        }
        // Scan through the rectangles for the content of a tile with inline
        // content, looking for one that overlaps the queried position
        // vertically and is closest horizontally. The caller is responsible
        // for dividing its content into N pieces, and pass an array with
        // N+1 positions (including the position after the last piece). For
        // a text tile, these will be character clusters, for a composite
        // tile, these will be child tiles.
        scan(positions, getRects, recursed = false) {
          let lo = 0, hi = positions.length - 1, seen = /* @__PURE__ */ new Set();
          let bidi = this.bidiIn(positions[0], positions[hi]);
          let above, below;
          let closestI = -1, closestDx = 1e9, closestRect;
          search: while (lo < hi) {
            let dist2 = hi - lo, mid = lo + hi >> 1;
            adjust: if (seen.has(mid)) {
              for (let i2 = 1; i2 < dist2; i2++) {
                let scan = mid + i2;
                if (scan >= hi)
                  scan -= dist2;
                if (!seen.has(scan)) {
                  mid = scan;
                  break adjust;
                }
              }
              break search;
            }
            seen.add(mid);
            let rects = getRects(mid), side = 0;
            if (rects)
              for (let i2 = 0; i2 < rects.length; i2++) {
                let rect = rects[i2];
                if (rect.width == 0 && rects.length > 1)
                  continue;
                if (rect.bottom < this.y) {
                  if (!above || above.bottom < rect.bottom)
                    above = rect;
                  side = 1;
                } else if (rect.top > this.y) {
                  if (!below || below.top > rect.top)
                    below = rect;
                  side = -1;
                } else {
                  let off = rect.left > this.x ? this.x - rect.left : rect.right < this.x ? this.x - rect.right : 0;
                  let dx = Math.abs(off);
                  if (dx < closestDx) {
                    closestI = mid;
                    closestDx = dx;
                    closestRect = rect;
                  }
                  if (off)
                    side = off < 0 == (this.baseDir == Direction.LTR) ? -1 : 1;
                }
              }
            if (side == -1 && (!bidi || this.baseDirAt(positions[mid], 1)))
              hi = mid;
            else if (side == 1 && (!bidi || this.baseDirAt(positions[mid + 1], -1)))
              lo = mid + 1;
          }
          if (!closestRect) {
            if (!below && !above)
              return { i: 0, after: false };
            let side = above && (!below || this.y - above.bottom < below.top - this.y) ? above : below;
            this.y = (side.top + side.bottom) / 2;
            return this.scan(positions, getRects, true);
          }
          if (closestDx && !recursed) {
            let { top: top2, bottom } = closestRect;
            if (above && above.bottom > (top2 + top2 + bottom) / 3) {
              this.y = above.bottom - 1;
              return this.scan(positions, getRects, true);
            }
            if (below && below.top < (top2 + bottom + bottom) / 3) {
              this.y = below.top + 1;
              return this.scan(positions, getRects, true);
            }
          }
          let ltr = (bidi ? this.dirAt(positions[closestI], 1) : this.baseDir) == Direction.LTR;
          return {
            i: closestI,
            // Test whether x is closes to the start or end of this element
            after: this.x > (closestRect.left + closestRect.right) / 2 == ltr
          };
        }
        scanText(tile, offset) {
          let positions = [];
          for (let i2 = 0; i2 < tile.length; i2 = findClusterBreak2(tile.text, i2))
            positions.push(offset + i2);
          positions.push(offset + tile.length);
          let scan = this.scan(positions, (i2) => {
            let off = positions[i2] - offset, end = positions[i2 + 1] - offset;
            return textRange(tile.dom, off, end).getClientRects();
          });
          return scan.after ? new PosAssoc(positions[scan.i + 1], -1) : new PosAssoc(positions[scan.i], 1);
        }
        scanTile(tile, offset) {
          if (!tile.length)
            return new PosAssoc(offset, 1);
          if (tile.children.length == 1) {
            let child2 = tile.children[0];
            if (child2.isText())
              return this.scanText(child2, offset);
            else if (child2.isComposite())
              return this.scanTile(child2, offset);
          }
          let positions = [offset];
          for (let i2 = 0, pos2 = offset; i2 < tile.children.length; i2++)
            positions.push(pos2 += tile.children[i2].length);
          let scan = this.scan(positions, (i2) => {
            let child2 = tile.children[i2];
            if (child2.flags & 48)
              return null;
            return (child2.dom.nodeType == 1 ? child2.dom : textRange(child2.dom, 0, child2.length)).getClientRects();
          });
          let child = tile.children[scan.i], pos = positions[scan.i];
          if (child.isText())
            return this.scanText(child, pos);
          if (child.isComposite())
            return this.scanTile(child, pos);
          return scan.after ? new PosAssoc(positions[scan.i + 1], -1) : new PosAssoc(pos, 1);
        }
      };
      LineBreakPlaceholder = "\uFFFF";
      DOMReader = class {
        constructor(points, view) {
          this.points = points;
          this.view = view;
          this.text = "";
          this.lineSeparator = view.state.facet(EditorState.lineSeparator);
        }
        append(text) {
          this.text += text;
        }
        lineBreak() {
          this.text += LineBreakPlaceholder;
        }
        readRange(start, end) {
          if (!start)
            return this;
          let parent = start.parentNode;
          for (let cur = start; ; ) {
            this.findPointBefore(parent, cur);
            let oldLen = this.text.length;
            this.readNode(cur);
            let tile = Tile.get(cur), next = cur.nextSibling;
            if (next == end) {
              if ((tile === null || tile === void 0 ? void 0 : tile.breakAfter) && !next && parent != this.view.contentDOM)
                this.lineBreak();
              break;
            }
            let nextTile = Tile.get(next);
            if ((tile && nextTile ? tile.breakAfter : (tile ? tile.breakAfter : isBlockElement(cur)) || isBlockElement(next) && (cur.nodeName != "BR" || (tile === null || tile === void 0 ? void 0 : tile.isWidget())) && this.text.length > oldLen) && !isEmptyToEnd(next, end))
              this.lineBreak();
            cur = next;
          }
          this.findPointBefore(parent, end);
          return this;
        }
        readTextNode(node) {
          let text = node.nodeValue;
          for (let point of this.points)
            if (point.node == node)
              point.pos = this.text.length + Math.min(point.offset, text.length);
          for (let off = 0, re = this.lineSeparator ? null : /\r\n?|\n/g; ; ) {
            let nextBreak = -1, breakSize = 1, m;
            if (this.lineSeparator) {
              nextBreak = text.indexOf(this.lineSeparator, off);
              breakSize = this.lineSeparator.length;
            } else if (m = re.exec(text)) {
              nextBreak = m.index;
              breakSize = m[0].length;
            }
            this.append(text.slice(off, nextBreak < 0 ? text.length : nextBreak));
            if (nextBreak < 0)
              break;
            this.lineBreak();
            if (breakSize > 1) {
              for (let point of this.points)
                if (point.node == node && point.pos > this.text.length)
                  point.pos -= breakSize - 1;
            }
            off = nextBreak + breakSize;
          }
        }
        readNode(node) {
          let tile = Tile.get(node);
          let fromView = tile && tile.overrideDOMText;
          if (fromView != null) {
            this.findPointInside(node, fromView.length);
            for (let i2 = fromView.iter(); !i2.next().done; ) {
              if (i2.lineBreak)
                this.lineBreak();
              else
                this.append(i2.value);
            }
          } else if (node.nodeType == 3) {
            this.readTextNode(node);
          } else if (node.nodeName == "BR") {
            if (node.nextSibling)
              this.lineBreak();
          } else if (node.nodeType == 1) {
            this.readRange(node.firstChild, null);
          }
        }
        findPointBefore(node, next) {
          for (let point of this.points)
            if (point.node == node && node.childNodes[point.offset] == next)
              point.pos = this.text.length;
        }
        findPointInside(node, length) {
          for (let point of this.points)
            if (node.nodeType == 3 ? point.node == node : node.contains(point.node))
              point.pos = this.text.length + (isAtEnd(node, point.node, point.offset) ? length : 0);
        }
      };
      DOMPoint = class {
        constructor(node, offset) {
          this.node = node;
          this.offset = offset;
          this.pos = -1;
        }
      };
      DOMChange = class {
        constructor(view, start, end, typeOver) {
          this.typeOver = typeOver;
          this.bounds = null;
          this.text = "";
          this.domChanged = start > -1;
          let { impreciseHead: iHead, impreciseAnchor: iAnchor } = view.docView, curSel = view.state.selection;
          if (view.state.readOnly && start > -1) {
            this.newSel = null;
          } else if (start > -1 && (this.bounds = domBoundsAround(view.docView.tile, start, end, 0))) {
            let selPoints = iHead || iAnchor ? [] : selectionPoints(view);
            let reader = new DOMReader(selPoints, view);
            reader.readRange(this.bounds.startDOM, this.bounds.endDOM);
            this.text = reader.text;
            this.newSel = selectionFromPoints(selPoints, this.bounds.from);
          } else {
            let domSel = view.observer.selectionRange;
            let head = iHead && iHead.node == domSel.focusNode && iHead.offset == domSel.focusOffset || !contains(view.contentDOM, domSel.focusNode) ? curSel.main.head : view.docView.posFromDOM(domSel.focusNode, domSel.focusOffset);
            let anchor = iAnchor && iAnchor.node == domSel.anchorNode && iAnchor.offset == domSel.anchorOffset || !contains(view.contentDOM, domSel.anchorNode) ? curSel.main.anchor : view.docView.posFromDOM(domSel.anchorNode, domSel.anchorOffset);
            let vp = view.viewport;
            if ((browser.ios || browser.chrome) && head != anchor && Math.min(head, anchor) <= curSel.main.from && Math.max(head, anchor) >= curSel.main.to && (vp.from > 0 || vp.to < view.state.doc.length)) {
              let from = Math.min(head, anchor), to = Math.max(head, anchor);
              let offFrom = vp.from - from, offTo = vp.to - to;
              if ((offFrom == 0 || offFrom == 1 || from == 0) && (offTo == 0 || offTo == -1 || to == view.state.doc.length)) {
                head = 0;
                anchor = view.state.doc.length;
              }
            }
            if (view.inputState.composing > -1 && curSel.ranges.length > 1) {
              this.newSel = curSel.replaceRange(EditorSelection.range(anchor, head));
            } else if (view.lineWrapping && anchor == head && !(curSel.main.empty && curSel.main.head == head) && view.inputState.lastTouchTime > Date.now() - 100) {
              let before = view.coordsAtPos(head, -1), assoc = 0;
              if (before)
                assoc = view.inputState.lastTouchY <= before.bottom ? -1 : 1;
              this.newSel = EditorSelection.create([EditorSelection.cursor(head, assoc)]);
            } else {
              this.newSel = EditorSelection.single(anchor, head);
            }
          }
        }
      };
      InputState = class {
        setSelectionOrigin(origin) {
          this.lastSelectionOrigin = origin;
          this.lastSelectionTime = Date.now();
        }
        constructor(view) {
          this.view = view;
          this.lastKeyCode = 0;
          this.lastKeyTime = 0;
          this.touchActive = false;
          this.lastTouchTime = 0;
          this.lastTouchX = 0;
          this.lastTouchY = 0;
          this.lastFocusTime = 0;
          this.lastScrollTop = 0;
          this.lastScrollLeft = 0;
          this.lastWheelEvent = 0;
          this.pendingIOSKey = void 0;
          this.lastIOSMomentumScroll = 0;
          this.tabFocusMode = -1;
          this.lastSelectionOrigin = null;
          this.lastSelectionTime = 0;
          this.lastContextMenu = 0;
          this.scrollHandlers = [];
          this.handlers = /* @__PURE__ */ Object.create(null);
          this.composing = -1;
          this.compositionFirstChange = null;
          this.compositionEndedAt = 0;
          this.compositionPendingKey = false;
          this.compositionPendingChange = false;
          this.insertingText = "";
          this.insertingTextAt = 0;
          this.mouseSelection = null;
          this.draggedContent = null;
          this.handleEvent = this.handleEvent.bind(this);
          this.notifiedFocused = view.hasFocus;
          if (browser.safari)
            view.contentDOM.addEventListener("input", () => null);
          if (browser.gecko)
            firefoxCopyCutHack(view.contentDOM.ownerDocument);
        }
        handleEvent(event) {
          if (!eventBelongsToEditor(this.view, event) || this.ignoreDuringComposition(event))
            return;
          if (event.type == "keydown" && this.keydown(event))
            return;
          if (this.view.updateState != 0)
            Promise.resolve().then(() => this.runHandlers(event.type, event));
          else
            this.runHandlers(event.type, event);
        }
        runHandlers(type, event) {
          let handlers2 = this.handlers[type];
          if (handlers2) {
            for (let observer of handlers2.observers)
              observer(this.view, event);
            for (let handler of handlers2.handlers) {
              if (event.defaultPrevented)
                break;
              if (handler(this.view, event)) {
                event.preventDefault();
                break;
              }
            }
          }
        }
        ensureHandlers(plugins) {
          let handlers2 = computeHandlers(plugins), prev = this.handlers, dom = this.view.contentDOM;
          for (let type in handlers2)
            if (type != "scroll") {
              let passive = !handlers2[type].handlers.length;
              let exists = prev[type];
              if (exists && passive != !exists.handlers.length) {
                dom.removeEventListener(type, this.handleEvent);
                exists = null;
              }
              if (!exists)
                dom.addEventListener(type, this.handleEvent, { passive });
            }
          for (let type in prev)
            if (type != "scroll" && !handlers2[type])
              dom.removeEventListener(type, this.handleEvent);
          this.handlers = handlers2;
        }
        keydown(event) {
          this.lastKeyCode = event.keyCode;
          this.lastKeyTime = Date.now();
          if (event.keyCode == 9 && this.tabFocusMode > -1 && (!this.tabFocusMode || Date.now() <= this.tabFocusMode))
            return true;
          if (this.tabFocusMode > 0 && event.keyCode != 27 && modifierCodes.indexOf(event.keyCode) < 0)
            this.tabFocusMode = -1;
          if (browser.android && browser.chrome && !event.synthetic && (event.keyCode == 13 || event.keyCode == 8)) {
            this.view.observer.delayAndroidKey(event.key, event.keyCode);
            return true;
          }
          if (browser.ios && !event.synthetic && !event.altKey && !event.metaKey && (PendingKeys.some((key) => key.keyCode == event.keyCode) && !event.ctrlKey || EmacsyPendingKeys.indexOf(event.key) > -1 && event.ctrlKey)) {
            let mods = { ctrlKey: event.ctrlKey, altKey: event.altKey, metaKey: event.metaKey, shiftKey: event.shiftKey };
            if (mods.shiftKey && browser.ios && !/^(off|none)$/.test(this.view.contentDOM.autocapitalize) && iosVirtualKeyboardOpen(this.view.win))
              mods.shiftKey = false;
            let pending = this.pendingIOSKey = { key: event.key, keyCode: event.keyCode, mods };
            setTimeout(() => {
              if (this.pendingIOSKey == pending)
                this.flushIOSKey();
            }, 50);
            return true;
          }
          if (event.keyCode != 229)
            this.view.observer.forceFlush();
          return false;
        }
        flushIOSKey(change) {
          let key = this.pendingIOSKey;
          if (!key || this.view.observer.pendingRecords().length)
            return false;
          if (key.key == "Enter" && change && change.from < change.to && /^\S+$/.test(change.insert.toString()))
            return false;
          this.pendingIOSKey = void 0;
          return dispatchKey(this.view.contentDOM, key.key, key.keyCode, key.mods);
        }
        ignoreDuringComposition(event) {
          if (!/^key/.test(event.type) || event.synthetic)
            return false;
          if (this.composing > 0)
            return true;
          if (browser.safari && !browser.ios && this.compositionPendingKey && Date.now() - this.compositionEndedAt < 100) {
            this.compositionPendingKey = false;
            return true;
          }
          return false;
        }
        startMouseSelection(mouseSelection) {
          if (this.mouseSelection)
            this.mouseSelection.destroy();
          this.mouseSelection = mouseSelection;
        }
        update(update) {
          this.view.observer.update(update);
          if (this.mouseSelection)
            this.mouseSelection.update(update);
          if (this.draggedContent && update.docChanged)
            this.draggedContent = this.draggedContent.map(update.changes);
          if (update.transactions.length)
            this.lastKeyCode = this.lastSelectionTime = 0;
        }
        destroy() {
          if (this.mouseSelection)
            this.mouseSelection.destroy();
        }
      };
      PendingKeys = [
        { key: "Backspace", keyCode: 8, inputType: "deleteContentBackward" },
        { key: "Enter", keyCode: 13, inputType: "insertParagraph" },
        { key: "Enter", keyCode: 13, inputType: "insertLineBreak" },
        { key: "Delete", keyCode: 46, inputType: "deleteContentForward" }
      ];
      EmacsyPendingKeys = "dthko";
      modifierCodes = [16, 17, 18, 20, 91, 92, 224, 225];
      dragScrollMargin = 6;
      MouseSelection = class {
        constructor(view, startEvent, style, mustSelect) {
          this.view = view;
          this.startEvent = startEvent;
          this.style = style;
          this.mustSelect = mustSelect;
          this.scrollSpeed = { x: 0, y: 0 };
          this.scrolling = -1;
          this.lastEvent = startEvent;
          this.scrollParents = scrollableParents(view.contentDOM);
          this.atoms = view.state.facet(atomicRanges).map((f) => f(view));
          let doc2 = view.contentDOM.ownerDocument;
          doc2.addEventListener("mousemove", this.move = this.move.bind(this));
          doc2.addEventListener("mouseup", this.up = this.up.bind(this));
          this.extend = startEvent.shiftKey;
          this.multiple = view.state.facet(EditorState.allowMultipleSelections) && addsSelectionRange(view, startEvent);
          this.dragging = isInPrimarySelection(view, startEvent) && getClickType(startEvent) == 1 ? null : false;
        }
        start(event) {
          if (this.dragging === false)
            this.select(event);
        }
        move(event) {
          if (event.buttons == 0)
            return this.destroy();
          if (this.dragging || this.dragging == null && dist(this.startEvent, event) < 10)
            return;
          this.select(this.lastEvent = event);
          let sx = 0, sy = 0;
          let left = 0, top2 = 0, right = this.view.win.innerWidth, bottom = this.view.win.innerHeight;
          if (this.scrollParents.x)
            ({ left, right } = this.scrollParents.x.getBoundingClientRect());
          if (this.scrollParents.y)
            ({ top: top2, bottom } = this.scrollParents.y.getBoundingClientRect());
          let margins = getScrollMargins(this.view);
          if (event.clientX - margins.left <= left + dragScrollMargin)
            sx = -dragScrollSpeed(left - event.clientX);
          else if (event.clientX + margins.right >= right - dragScrollMargin)
            sx = dragScrollSpeed(event.clientX - right);
          if (event.clientY - margins.top <= top2 + dragScrollMargin)
            sy = -dragScrollSpeed(top2 - event.clientY);
          else if (event.clientY + margins.bottom >= bottom - dragScrollMargin)
            sy = dragScrollSpeed(event.clientY - bottom);
          this.setScrollSpeed(sx, sy);
        }
        up(event) {
          if (this.dragging == null)
            this.select(this.lastEvent);
          if (!this.dragging)
            event.preventDefault();
          this.destroy();
        }
        destroy() {
          this.setScrollSpeed(0, 0);
          let doc2 = this.view.contentDOM.ownerDocument;
          doc2.removeEventListener("mousemove", this.move);
          doc2.removeEventListener("mouseup", this.up);
          this.view.inputState.mouseSelection = this.view.inputState.draggedContent = null;
        }
        setScrollSpeed(sx, sy) {
          this.scrollSpeed = { x: sx, y: sy };
          if (sx || sy) {
            if (this.scrolling < 0)
              this.scrolling = setInterval(() => this.scroll(), 50);
          } else if (this.scrolling > -1) {
            clearInterval(this.scrolling);
            this.scrolling = -1;
          }
        }
        scroll() {
          let { x, y } = this.scrollSpeed;
          if (x && this.scrollParents.x) {
            this.scrollParents.x.scrollLeft += x;
            x = 0;
          }
          if (y && this.scrollParents.y) {
            this.scrollParents.y.scrollTop += y;
            y = 0;
          }
          if (x || y)
            this.view.win.scrollBy(x, y);
          if (this.dragging === false)
            this.select(this.lastEvent);
        }
        select(event) {
          let { view } = this, selection = skipAtomsForSelection(this.atoms, this.style.get(event, this.extend, this.multiple));
          if (this.mustSelect || !selection.eq(view.state.selection, this.dragging === false))
            this.view.dispatch({
              selection,
              userEvent: "select.pointer"
            });
          this.mustSelect = false;
        }
        update(update) {
          if (update.transactions.some((tr) => tr.isUserEvent("input.type")))
            this.destroy();
          else if (this.style.update(update))
            setTimeout(() => this.select(this.lastEvent), 20);
        }
      };
      handlers = /* @__PURE__ */ Object.create(null);
      observers = /* @__PURE__ */ Object.create(null);
      brokenClipboardAPI = browser.ie && browser.ie_version < 15 || browser.ios && browser.webkit_version < 604;
      observers.scroll = (view) => {
        let iState = view.inputState;
        iState.lastScrollTop = view.scrollDOM.scrollTop;
        iState.lastScrollLeft = view.scrollDOM.scrollLeft;
        if (browser.ios && !iState.touchActive)
          iState.lastIOSMomentumScroll = Date.now();
      };
      observers.wheel = observers.mousewheel = (view) => {
        view.inputState.lastWheelEvent = Date.now();
      };
      handlers.keydown = (view, event) => {
        view.inputState.setSelectionOrigin("select");
        if (event.keyCode == 27 && view.inputState.tabFocusMode != 0)
          view.inputState.tabFocusMode = Date.now() + 2e3;
        return false;
      };
      observers.touchstart = (view, e) => {
        let iState = view.inputState, touch = e.targetTouches[0];
        iState.touchActive = true;
        iState.lastTouchTime = Date.now();
        if (touch) {
          iState.lastTouchX = touch.clientX;
          iState.lastTouchY = touch.clientY;
        }
        iState.setSelectionOrigin("select.pointer");
      };
      observers.touchmove = (view) => {
        view.inputState.setSelectionOrigin("select.pointer");
      };
      observers.touchend = (view, e) => {
        view.inputState.touchActive = false;
      };
      handlers.mousedown = (view, event) => {
        view.observer.flush();
        if (view.inputState.lastTouchTime > Date.now() - 2e3)
          return false;
        let style = null;
        for (let makeStyle of view.state.facet(mouseSelectionStyle)) {
          style = makeStyle(view, event);
          if (style)
            break;
        }
        if (!style && event.button == 0)
          style = basicMouseSelection(view, event);
        if (style) {
          let mustFocus = !view.hasFocus;
          view.inputState.startMouseSelection(new MouseSelection(view, event, style, mustFocus));
          if (mustFocus)
            view.observer.ignore(() => {
              focusPreventScroll(view.contentDOM);
              let active = view.root.activeElement;
              if (active && !active.contains(view.contentDOM))
                active.blur();
            });
          let mouseSel = view.inputState.mouseSelection;
          if (mouseSel) {
            mouseSel.start(event);
            return mouseSel.dragging === false;
          }
        } else {
          view.inputState.setSelectionOrigin("select.pointer");
        }
        return false;
      };
      BadMouseDetail = browser.ie && browser.ie_version <= 11;
      lastMouseDown = null;
      lastMouseDownCount = 0;
      lastMouseDownTime = 0;
      handlers.dragstart = (view, event) => {
        let { selection: { main: range } } = view.state;
        if (event.target.draggable) {
          let tile = view.docView.tile.nearest(event.target);
          if (tile && tile.isWidget()) {
            let from = tile.posAtStart, to = from + tile.length;
            if (from >= range.to || to <= range.from)
              range = EditorSelection.undirectionalRange(from, to);
          }
        }
        let { inputState } = view;
        if (inputState.mouseSelection)
          inputState.mouseSelection.dragging = true;
        inputState.draggedContent = range;
        if (event.dataTransfer) {
          event.dataTransfer.setData("Text", textFilter(view.state, clipboardOutputFilter, view.state.sliceDoc(range.from, range.to)));
          event.dataTransfer.effectAllowed = "copyMove";
        }
        return false;
      };
      handlers.dragend = (view) => {
        view.inputState.draggedContent = null;
        return false;
      };
      handlers.drop = (view, event) => {
        if (!event.dataTransfer)
          return false;
        if (view.state.readOnly)
          return true;
        let files = event.dataTransfer.files;
        if (files && files.length) {
          let text = Array(files.length), read = 0;
          let finishFile = () => {
            if (++read == files.length)
              dropText(view, event, text.filter((s) => s != null).join(view.state.lineBreak), false);
          };
          for (let i2 = 0; i2 < files.length; i2++) {
            let reader = new FileReader();
            reader.onerror = finishFile;
            reader.onload = () => {
              if (!/[\x00-\x08\x0e-\x1f]{2}/.test(reader.result))
                text[i2] = reader.result;
              finishFile();
            };
            reader.readAsText(files[i2]);
          }
          return true;
        } else {
          let text = event.dataTransfer.getData("Text");
          if (text) {
            dropText(view, event, text, true);
            return true;
          }
        }
        return false;
      };
      handlers.paste = (view, event) => {
        if (view.state.readOnly)
          return true;
        view.observer.flush();
        let data = brokenClipboardAPI ? null : event.clipboardData;
        if (data) {
          doPaste(view, data.getData("text/plain") || data.getData("text/uri-list"));
          return true;
        } else {
          capturePaste(view);
          return false;
        }
      };
      lastLinewiseCopy = null;
      handlers.copy = handlers.cut = (view, event) => {
        if (!hasSelection(view.contentDOM, view.observer.selectionRange))
          return false;
        let { text, ranges, linewise } = copiedRange(view.state);
        if (!text && !linewise)
          return false;
        lastLinewiseCopy = linewise ? text : null;
        if (event.type == "cut" && !view.state.readOnly)
          view.dispatch({
            changes: ranges,
            scrollIntoView: true,
            userEvent: "delete.cut"
          });
        let data = brokenClipboardAPI ? null : event.clipboardData;
        if (data) {
          data.clearData();
          data.setData("text/plain", text);
          return true;
        } else {
          captureCopy(view, text);
          return false;
        }
      };
      isFocusChange = /* @__PURE__ */ Annotation.define();
      observers.focus = (view) => {
        view.inputState.lastFocusTime = Date.now();
        if (!view.scrollDOM.scrollTop && (view.inputState.lastScrollTop || view.inputState.lastScrollLeft)) {
          view.scrollDOM.scrollTop = view.inputState.lastScrollTop;
          view.scrollDOM.scrollLeft = view.inputState.lastScrollLeft;
        }
        updateForFocusChange(view);
      };
      observers.blur = (view) => {
        view.observer.clearSelectionRange();
        updateForFocusChange(view);
      };
      observers.compositionstart = observers.compositionupdate = (view) => {
        if (view.observer.editContext)
          return;
        if (view.inputState.compositionFirstChange == null)
          view.inputState.compositionFirstChange = true;
        if (view.inputState.composing < 0) {
          let { main } = view.state.selection;
          if (!main.empty && view.lineBlockAt(main.from).from != view.lineBlockAt(main.to).from) {
            view.dispatch({
              changes: view.state.selection.ranges.filter((r) => !r.empty).map((r) => ({ from: r.from, to: r.to })),
              userEvent: "input"
            });
          }
          view.inputState.composing = 0;
        }
      };
      observers.compositionend = (view) => {
        if (view.observer.editContext)
          return;
        view.inputState.composing = -1;
        view.inputState.compositionEndedAt = Date.now();
        view.inputState.compositionPendingKey = true;
        view.inputState.compositionPendingChange = view.observer.pendingRecords().length > 0;
        view.inputState.compositionFirstChange = null;
        if (browser.chrome && browser.android) {
          view.observer.flushSoon();
        } else if (view.inputState.compositionPendingChange) {
          Promise.resolve().then(() => view.observer.flush());
        } else {
          setTimeout(() => {
            if (view.inputState.composing < 0 && view.docView.hasComposition)
              view.update([]);
          }, 50);
        }
      };
      observers.contextmenu = (view) => {
        view.inputState.lastContextMenu = Date.now();
      };
      handlers.beforeinput = (view, event) => {
        var _a2, _b;
        if (event.inputType == "insertText" || event.inputType == "insertCompositionText") {
          view.inputState.insertingText = event.data;
          view.inputState.insertingTextAt = Date.now();
        }
        if (event.inputType == "insertReplacementText" && view.observer.editContext) {
          let text = (_a2 = event.dataTransfer) === null || _a2 === void 0 ? void 0 : _a2.getData("text/plain"), ranges = event.getTargetRanges();
          if (text && ranges.length) {
            let r = ranges[0];
            let from = view.posAtDOM(r.startContainer, r.startOffset), to = view.posAtDOM(r.endContainer, r.endOffset);
            applyDOMChangeInner(view, { from, to, insert: view.state.toText(text) }, null);
            return true;
          }
        }
        let pending;
        if (browser.chrome && browser.android && (pending = PendingKeys.find((key) => key.inputType == event.inputType))) {
          view.observer.delayAndroidKey(pending.key, pending.keyCode);
          if (pending.key == "Backspace" || pending.key == "Delete") {
            let startViewHeight = ((_b = window.visualViewport) === null || _b === void 0 ? void 0 : _b.height) || 0;
            setTimeout(() => {
              var _a3;
              if ((((_a3 = window.visualViewport) === null || _a3 === void 0 ? void 0 : _a3.height) || 0) > startViewHeight + 10 && view.hasFocus) {
                view.contentDOM.blur();
                view.focus();
              }
            }, 100);
          }
        }
        if (browser.ios && event.inputType == "deleteContentForward") {
          view.observer.flushSoon();
        }
        if (browser.safari && event.inputType == "insertText" && view.inputState.composing >= 0) {
          setTimeout(() => observers.compositionend(view, event), 20);
        }
        return false;
      };
      appliedFirefoxHack = /* @__PURE__ */ new Set();
      wrappingWhiteSpace = ["pre-wrap", "normal", "pre-line", "break-spaces"];
      heightChangeFlag = false;
      HeightOracle = class {
        constructor(lineWrapping) {
          this.lineWrapping = lineWrapping;
          this.doc = Text.empty;
          this.heightSamples = {};
          this.lineHeight = 14;
          this.charWidth = 7;
          this.textHeight = 14;
          this.lineLength = 30;
        }
        heightForGap(from, to) {
          let lines = this.doc.lineAt(to).number - this.doc.lineAt(from).number + 1;
          if (this.lineWrapping)
            lines += Math.max(0, Math.ceil((to - from - lines * this.lineLength * 0.5) / this.lineLength));
          return this.lineHeight * lines;
        }
        heightForLine(length) {
          if (!this.lineWrapping)
            return this.lineHeight;
          let lines = 1 + Math.max(0, Math.ceil((length - this.lineLength) / Math.max(1, this.lineLength - 5)));
          return lines * this.lineHeight;
        }
        setDoc(doc2) {
          this.doc = doc2;
          return this;
        }
        mustRefreshForWrapping(whiteSpace) {
          return wrappingWhiteSpace.indexOf(whiteSpace) > -1 != this.lineWrapping;
        }
        mustRefreshForHeights(lineHeights) {
          let newHeight = false;
          for (let i2 = 0; i2 < lineHeights.length; i2++) {
            let h = lineHeights[i2];
            if (h < 0) {
              i2++;
            } else if (!this.heightSamples[Math.floor(h * 10)]) {
              newHeight = true;
              this.heightSamples[Math.floor(h * 10)] = true;
            }
          }
          return newHeight;
        }
        refresh(whiteSpace, lineHeight, charWidth, textHeight, lineLength, knownHeights) {
          let lineWrapping = wrappingWhiteSpace.indexOf(whiteSpace) > -1;
          let changed = Math.abs(lineHeight - this.lineHeight) > 0.3 || this.lineWrapping != lineWrapping;
          this.lineWrapping = lineWrapping;
          this.lineHeight = lineHeight;
          this.charWidth = charWidth;
          this.textHeight = textHeight;
          this.lineLength = lineLength;
          if (changed) {
            this.heightSamples = {};
            for (let i2 = 0; i2 < knownHeights.length; i2++) {
              let h = knownHeights[i2];
              if (h < 0)
                i2++;
              else
                this.heightSamples[Math.floor(h * 10)] = true;
            }
          }
          return changed;
        }
      };
      MeasuredHeights = class {
        constructor(from, heights) {
          this.from = from;
          this.heights = heights;
          this.index = 0;
        }
        get more() {
          return this.index < this.heights.length;
        }
      };
      BlockInfo = class _BlockInfo {
        /**
        @internal
        */
        constructor(from, length, top2, height, _content) {
          this.from = from;
          this.length = length;
          this.top = top2;
          this.height = height;
          this._content = _content;
        }
        /**
        The type of element this is. When querying lines, this may be
        an array of all the blocks that make up the line.
        */
        get type() {
          return typeof this._content == "number" ? BlockType.Text : Array.isArray(this._content) ? this._content : this._content.type;
        }
        /**
        The end of the element as a document position.
        */
        get to() {
          return this.from + this.length;
        }
        /**
        The bottom position of the element.
        */
        get bottom() {
          return this.top + this.height;
        }
        /**
        If this is a widget block, this will return the widget
        associated with it.
        */
        get widget() {
          return this._content instanceof PointDecoration ? this._content.widget : null;
        }
        /**
        If this is a textblock, this holds the number of line breaks
        that appear in widgets inside the block.
        */
        get widgetLineBreaks() {
          return typeof this._content == "number" ? this._content : 0;
        }
        /**
        @internal
        */
        join(other) {
          let content2 = (Array.isArray(this._content) ? this._content : [this]).concat(Array.isArray(other._content) ? other._content : [other]);
          return new _BlockInfo(this.from, this.length + other.length, this.top, this.height + other.height, content2);
        }
      };
      QueryType = /* @__PURE__ */ (function(QueryType2) {
        QueryType2[QueryType2["ByPos"] = 0] = "ByPos";
        QueryType2[QueryType2["ByHeight"] = 1] = "ByHeight";
        QueryType2[QueryType2["ByPosNoHeight"] = 2] = "ByPosNoHeight";
        return QueryType2;
      })(QueryType || (QueryType = {}));
      Epsilon = 1e-3;
      HeightMap = class _HeightMap {
        constructor(length, height, flags = 2) {
          this.length = length;
          this.height = height;
          this.flags = flags;
        }
        get outdated() {
          return (this.flags & 2) > 0;
        }
        set outdated(value) {
          this.flags = (value ? 2 : 0) | this.flags & ~2;
        }
        setHeight(height) {
          if (this.height != height) {
            if (Math.abs(this.height - height) > Epsilon)
              heightChangeFlag = true;
            this.height = height;
          }
        }
        // Base case is to replace a leaf node, which simply builds a tree
        // from the new nodes and returns that (HeightMapBranch and
        // HeightMapGap override this to actually use from/to)
        replace(_from, _to, nodes) {
          return _HeightMap.of(nodes);
        }
        // Again, these are base cases, and are overridden for branch and gap nodes.
        decomposeLeft(_to, result) {
          result.push(this);
        }
        decomposeRight(_from, result) {
          result.push(this);
        }
        applyChanges(decorations2, oldDoc, oracle, changes) {
          let me = this, doc2 = oracle.doc;
          for (let i2 = changes.length - 1; i2 >= 0; i2--) {
            let { fromA, toA, fromB, toB } = changes[i2];
            let start = me.lineAt(fromA, QueryType.ByPosNoHeight, oracle.setDoc(oldDoc), 0, 0);
            let end = start.to >= toA ? start : me.lineAt(toA, QueryType.ByPosNoHeight, oracle, 0, 0);
            toB += end.to - toA;
            toA = end.to;
            while (i2 > 0 && start.from <= changes[i2 - 1].toA) {
              fromA = changes[i2 - 1].fromA;
              fromB = changes[i2 - 1].fromB;
              i2--;
              if (fromA < start.from)
                start = me.lineAt(fromA, QueryType.ByPosNoHeight, oracle, 0, 0);
            }
            fromB += start.from - fromA;
            fromA = start.from;
            let nodes = NodeBuilder.build(oracle.setDoc(doc2), decorations2, fromB, toB);
            me = replace(me, me.replace(fromA, toA, nodes));
          }
          return me.updateHeight(oracle, 0);
        }
        static empty() {
          return new HeightMapText(0, 0, 0);
        }
        // nodes uses null values to indicate the position of line breaks.
        // There are never line breaks at the start or end of the array, or
        // two line breaks next to each other, and the array isn't allowed
        // to be empty (same restrictions as return value from the builder).
        static of(nodes) {
          if (nodes.length == 1)
            return nodes[0];
          let i2 = 0, j = nodes.length, before = 0, after = 0;
          for (; ; ) {
            if (i2 == j) {
              if (before > after * 2) {
                let split = nodes[i2 - 1];
                if (split.break)
                  nodes.splice(--i2, 1, split.left, null, split.right);
                else
                  nodes.splice(--i2, 1, split.left, split.right);
                j += 1 + split.break;
                before -= split.size;
              } else if (after > before * 2) {
                let split = nodes[j];
                if (split.break)
                  nodes.splice(j, 1, split.left, null, split.right);
                else
                  nodes.splice(j, 1, split.left, split.right);
                j += 2 + split.break;
                after -= split.size;
              } else {
                break;
              }
            } else if (before < after) {
              let next = nodes[i2++];
              if (next)
                before += next.size;
            } else {
              let next = nodes[--j];
              if (next)
                after += next.size;
            }
          }
          let brk = false;
          if (nodes[i2 - 1] == null) {
            brk = true;
            i2--;
          } else if (nodes[i2] == null) {
            brk = true;
            j++;
          }
          return new HeightMapBranch(_HeightMap.of(nodes.slice(0, i2)), brk, _HeightMap.of(nodes.slice(j)));
        }
      };
      HeightMap.prototype.size = 1;
      SpaceDeco = /* @__PURE__ */ Decoration.replace({});
      HeightMapBlock = class extends HeightMap {
        constructor(length, height, deco) {
          super(length, height);
          this.deco = deco;
          this.spaceAbove = 0;
        }
        mainBlock(top2, offset) {
          return new BlockInfo(offset, this.length, top2 + this.spaceAbove, this.height - this.spaceAbove, this.deco || 0);
        }
        blockAt(height, _oracle, top2, offset) {
          return this.spaceAbove && height < top2 + this.spaceAbove ? new BlockInfo(offset, 0, top2, this.spaceAbove, SpaceDeco) : this.mainBlock(top2, offset);
        }
        lineAt(_value, _type, oracle, top2, offset) {
          let main = this.mainBlock(top2, offset);
          return this.spaceAbove ? this.blockAt(0, oracle, top2, offset).join(main) : main;
        }
        forEachLine(from, to, oracle, top2, offset, f) {
          if (from <= offset + this.length && to >= offset)
            f(this.lineAt(0, QueryType.ByPos, oracle, top2, offset));
        }
        setMeasuredHeight(measured) {
          let next = measured.heights[measured.index++];
          if (next < 0) {
            this.spaceAbove = -next;
            next = measured.heights[measured.index++];
          } else {
            this.spaceAbove = 0;
          }
          this.setHeight(next);
        }
        updateHeight(oracle, offset = 0, _force = false, measured) {
          if (measured && measured.from <= offset && measured.more)
            this.setMeasuredHeight(measured);
          this.outdated = false;
          return this;
        }
        toString() {
          return `block(${this.length})`;
        }
      };
      HeightMapText = class _HeightMapText extends HeightMapBlock {
        constructor(length, height, above) {
          super(length, height, null);
          this.collapsed = 0;
          this.widgetHeight = 0;
          this.breaks = 0;
          this.spaceAbove = above;
        }
        mainBlock(top2, offset) {
          return new BlockInfo(offset, this.length, top2 + this.spaceAbove, this.height - this.spaceAbove, this.breaks);
        }
        replace(_from, _to, nodes) {
          let node = nodes[0];
          if (nodes.length == 1 && (node instanceof _HeightMapText || node instanceof HeightMapGap && node.flags & 4) && Math.abs(this.length - node.length) < 10) {
            if (node instanceof HeightMapGap)
              node = new _HeightMapText(node.length, this.height, this.spaceAbove);
            else
              node.height = this.height;
            if (!this.outdated)
              node.outdated = false;
            return node;
          } else {
            return HeightMap.of(nodes);
          }
        }
        updateHeight(oracle, offset = 0, force = false, measured) {
          if (measured && measured.from <= offset && measured.more) {
            this.setMeasuredHeight(measured);
          } else if (force || this.outdated) {
            this.spaceAbove = 0;
            this.setHeight(Math.max(this.widgetHeight, oracle.heightForLine(this.length - this.collapsed)) + this.breaks * oracle.lineHeight);
          }
          this.outdated = false;
          return this;
        }
        toString() {
          return `line(${this.length}${this.collapsed ? -this.collapsed : ""}${this.widgetHeight ? ":" + this.widgetHeight : ""})`;
        }
      };
      HeightMapGap = class _HeightMapGap extends HeightMap {
        constructor(length) {
          super(length, 0);
        }
        heightMetrics(oracle, offset) {
          let firstLine = oracle.doc.lineAt(offset).number, lastLine = oracle.doc.lineAt(offset + this.length).number;
          let lines = lastLine - firstLine + 1;
          let perLine, perChar = 0;
          if (oracle.lineWrapping) {
            let totalPerLine = Math.min(this.height, oracle.lineHeight * lines);
            perLine = totalPerLine / lines;
            if (this.length > lines + 1)
              perChar = (this.height - totalPerLine) / (this.length - lines - 1);
          } else {
            perLine = this.height / lines;
          }
          return { firstLine, lastLine, perLine, perChar };
        }
        blockAt(height, oracle, top2, offset) {
          let { firstLine, lastLine, perLine, perChar } = this.heightMetrics(oracle, offset);
          if (oracle.lineWrapping) {
            let guess = offset + (height < oracle.lineHeight ? 0 : Math.round(Math.max(0, Math.min(1, (height - top2) / this.height)) * this.length));
            let line = oracle.doc.lineAt(guess), lineHeight = perLine + line.length * perChar;
            let lineTop = Math.max(top2, height - lineHeight / 2);
            return new BlockInfo(line.from, line.length, lineTop, lineHeight, 0);
          } else {
            let line = Math.max(0, Math.min(lastLine - firstLine, Math.floor((height - top2) / perLine)));
            let { from, length } = oracle.doc.line(firstLine + line);
            return new BlockInfo(from, length, top2 + perLine * line, perLine, 0);
          }
        }
        lineAt(value, type, oracle, top2, offset) {
          if (type == QueryType.ByHeight)
            return this.blockAt(value, oracle, top2, offset);
          if (type == QueryType.ByPosNoHeight) {
            let { from, to } = oracle.doc.lineAt(value);
            return new BlockInfo(from, to - from, 0, 0, 0);
          }
          let { firstLine, perLine, perChar } = this.heightMetrics(oracle, offset);
          let line = oracle.doc.lineAt(value), lineHeight = perLine + line.length * perChar;
          let linesAbove = line.number - firstLine;
          let lineTop = top2 + perLine * linesAbove + perChar * (line.from - offset - linesAbove);
          return new BlockInfo(line.from, line.length, Math.max(top2, Math.min(lineTop, top2 + this.height - lineHeight)), lineHeight, 0);
        }
        forEachLine(from, to, oracle, top2, offset, f) {
          from = Math.max(from, offset);
          to = Math.min(to, offset + this.length);
          let { firstLine, perLine, perChar } = this.heightMetrics(oracle, offset);
          for (let pos = from, lineTop = top2; pos <= to; ) {
            let line = oracle.doc.lineAt(pos);
            if (pos == from) {
              let linesAbove = line.number - firstLine;
              lineTop += perLine * linesAbove + perChar * (from - offset - linesAbove);
            }
            let lineHeight = perLine + perChar * line.length;
            f(new BlockInfo(line.from, line.length, lineTop, lineHeight, 0));
            lineTop += lineHeight;
            pos = line.to + 1;
          }
        }
        replace(from, to, nodes) {
          let after = this.length - to;
          if (after > 0) {
            let last2 = nodes[nodes.length - 1];
            if (last2 instanceof _HeightMapGap)
              nodes[nodes.length - 1] = new _HeightMapGap(last2.length + after);
            else
              nodes.push(null, new _HeightMapGap(after - 1));
          }
          if (from > 0) {
            let first = nodes[0];
            if (first instanceof _HeightMapGap)
              nodes[0] = new _HeightMapGap(from + first.length);
            else
              nodes.unshift(new _HeightMapGap(from - 1), null);
          }
          return HeightMap.of(nodes);
        }
        decomposeLeft(to, result) {
          result.push(new _HeightMapGap(to - 1), null);
        }
        decomposeRight(from, result) {
          result.push(null, new _HeightMapGap(this.length - from - 1));
        }
        updateHeight(oracle, offset = 0, force = false, measured) {
          let end = offset + this.length;
          if (measured && measured.from <= offset + this.length && measured.more) {
            let nodes = [], pos = Math.max(offset, measured.from), singleHeight = -1;
            if (measured.from > offset)
              nodes.push(new _HeightMapGap(measured.from - offset - 1).updateHeight(oracle, offset));
            while (pos <= end && measured.more) {
              let len = oracle.doc.lineAt(pos).length;
              if (nodes.length)
                nodes.push(null);
              let height = measured.heights[measured.index++], above = 0;
              if (height < 0) {
                above = -height;
                height = measured.heights[measured.index++];
              }
              if (singleHeight == -1)
                singleHeight = height;
              else if (Math.abs(height - singleHeight) >= Epsilon)
                singleHeight = -2;
              let line = new HeightMapText(len, height, above);
              line.outdated = false;
              nodes.push(line);
              pos += len + 1;
            }
            if (pos <= end)
              nodes.push(null, new _HeightMapGap(end - pos).updateHeight(oracle, pos));
            let result = HeightMap.of(nodes);
            if (singleHeight < 0 || Math.abs(result.height - this.height) >= Epsilon || Math.abs(singleHeight - this.heightMetrics(oracle, offset).perLine) >= Epsilon)
              heightChangeFlag = true;
            return replace(this, result);
          } else if (force || this.outdated) {
            this.setHeight(oracle.heightForGap(offset, offset + this.length));
            this.outdated = false;
          }
          return this;
        }
        toString() {
          return `gap(${this.length})`;
        }
      };
      HeightMapBranch = class extends HeightMap {
        constructor(left, brk, right) {
          super(left.length + (brk ? 1 : 0) + right.length, left.height + right.height, (brk ? 1 : 0) | (left.outdated || right.outdated ? 2 : 0));
          this.left = left;
          this.right = right;
          this.size = left.size + right.size;
        }
        // Returns 1 if there is a line break between this.left and
        // this.right, 0 otherwise.
        get break() {
          return this.flags & 1;
        }
        blockAt(height, oracle, top2, offset) {
          let mid = top2 + this.left.height;
          return height < mid ? this.left.blockAt(height, oracle, top2, offset) : this.right.blockAt(height, oracle, mid, offset + this.left.length + this.break);
        }
        lineAt(value, type, oracle, top2, offset) {
          let rightTop = top2 + this.left.height, rightOffset = offset + this.left.length + this.break;
          let left = type == QueryType.ByHeight ? value < rightTop : value < rightOffset;
          let base2 = left ? this.left.lineAt(value, type, oracle, top2, offset) : this.right.lineAt(value, type, oracle, rightTop, rightOffset);
          if (this.break || (left ? base2.to < rightOffset : base2.from > rightOffset))
            return base2;
          let subQuery = type == QueryType.ByPosNoHeight ? QueryType.ByPosNoHeight : QueryType.ByPos;
          if (left)
            return base2.join(this.right.lineAt(rightOffset, subQuery, oracle, rightTop, rightOffset));
          else
            return this.left.lineAt(rightOffset, subQuery, oracle, top2, offset).join(base2);
        }
        forEachLine(from, to, oracle, top2, offset, f) {
          let rightTop = top2 + this.left.height, rightOffset = offset + this.left.length + this.break;
          if (this.break) {
            if (from < rightOffset)
              this.left.forEachLine(from, to, oracle, top2, offset, f);
            if (to >= rightOffset)
              this.right.forEachLine(from, to, oracle, rightTop, rightOffset, f);
          } else {
            let mid = this.lineAt(rightOffset, QueryType.ByPos, oracle, top2, offset);
            if (from < mid.from)
              this.left.forEachLine(from, Math.min(to, mid.from - 1), oracle, top2, offset, f);
            if (mid.to >= from && mid.from <= to)
              f(mid);
            if (to > mid.to)
              this.right.forEachLine(Math.max(from, mid.to + 1), to, oracle, rightTop, rightOffset, f);
          }
        }
        replace(from, to, nodes) {
          let rightStart = this.left.length + this.break;
          if (to < rightStart)
            return this.balanced(this.left.replace(from, to, nodes), this.right);
          if (from > this.left.length)
            return this.balanced(this.left, this.right.replace(from - rightStart, to - rightStart, nodes));
          let result = [];
          if (from > 0)
            this.decomposeLeft(from, result);
          let left = result.length;
          for (let node of nodes)
            result.push(node);
          if (from > 0)
            mergeGaps(result, left - 1);
          if (to < this.length) {
            let right = result.length;
            this.decomposeRight(to, result);
            mergeGaps(result, right);
          }
          return HeightMap.of(result);
        }
        decomposeLeft(to, result) {
          let left = this.left.length;
          if (to <= left)
            return this.left.decomposeLeft(to, result);
          result.push(this.left);
          if (this.break) {
            left++;
            if (to >= left)
              result.push(null);
          }
          if (to > left)
            this.right.decomposeLeft(to - left, result);
        }
        decomposeRight(from, result) {
          let left = this.left.length, right = left + this.break;
          if (from >= right)
            return this.right.decomposeRight(from - right, result);
          if (from < left)
            this.left.decomposeRight(from, result);
          if (this.break && from < right)
            result.push(null);
          result.push(this.right);
        }
        balanced(left, right) {
          if (left.size > 2 * right.size || right.size > 2 * left.size)
            return HeightMap.of(this.break ? [left, null, right] : [left, right]);
          this.left = replace(this.left, left);
          this.right = replace(this.right, right);
          this.setHeight(left.height + right.height);
          this.outdated = left.outdated || right.outdated;
          this.size = left.size + right.size;
          this.length = left.length + this.break + right.length;
          return this;
        }
        updateHeight(oracle, offset = 0, force = false, measured) {
          let { left, right } = this, rightStart = offset + left.length + this.break, rebalance = null;
          if (measured && measured.from <= offset + left.length && measured.more)
            rebalance = left = left.updateHeight(oracle, offset, force, measured);
          else
            left.updateHeight(oracle, offset, force);
          if (measured && measured.from <= rightStart + right.length && measured.more)
            rebalance = right = right.updateHeight(oracle, rightStart, force, measured);
          else
            right.updateHeight(oracle, rightStart, force);
          if (rebalance)
            return this.balanced(left, right);
          this.height = this.left.height + this.right.height;
          this.outdated = false;
          return this;
        }
        toString() {
          return this.left + (this.break ? " " : "-") + this.right;
        }
      };
      relevantWidgetHeight = 5;
      NodeBuilder = class _NodeBuilder {
        constructor(pos, oracle) {
          this.pos = pos;
          this.oracle = oracle;
          this.nodes = [];
          this.lineStart = -1;
          this.lineEnd = -1;
          this.covering = null;
          this.writtenTo = pos;
        }
        get isCovered() {
          return this.covering && this.nodes[this.nodes.length - 1] == this.covering;
        }
        span(_from, to) {
          if (this.lineStart > -1) {
            let end = Math.min(to, this.lineEnd), last2 = this.nodes[this.nodes.length - 1];
            if (last2 instanceof HeightMapText)
              last2.length += end - this.pos;
            else if (end > this.pos || !this.isCovered)
              this.nodes.push(new HeightMapText(end - this.pos, -1, 0));
            this.writtenTo = end;
            if (to > end) {
              this.nodes.push(null);
              this.writtenTo++;
              this.lineStart = -1;
            }
          }
          this.pos = to;
        }
        point(from, to, deco) {
          if (from < to || deco.heightRelevant) {
            let height = deco.widget ? deco.widget.estimatedHeight : 0;
            let breaks = deco.widget ? deco.widget.lineBreaks : 0;
            if (height < 0)
              height = this.oracle.lineHeight;
            let len = to - from;
            if (deco.block) {
              this.addBlock(new HeightMapBlock(len, height, deco));
            } else if (len || breaks || height >= relevantWidgetHeight) {
              this.addLineDeco(height, breaks, len);
            }
          } else if (to > from) {
            this.span(from, to);
          }
          if (this.lineEnd > -1 && this.lineEnd < this.pos)
            this.lineEnd = this.oracle.doc.lineAt(this.pos).to;
        }
        enterLine() {
          if (this.lineStart > -1)
            return;
          let { from, to } = this.oracle.doc.lineAt(this.pos);
          this.lineStart = from;
          this.lineEnd = to;
          if (this.writtenTo < from) {
            if (this.writtenTo < from - 1 || this.nodes[this.nodes.length - 1] == null)
              this.nodes.push(this.blankContent(this.writtenTo, from - 1));
            this.nodes.push(null);
          }
          if (this.pos > from)
            this.nodes.push(new HeightMapText(this.pos - from, -1, 0));
          this.writtenTo = this.pos;
        }
        blankContent(from, to) {
          let gap = new HeightMapGap(to - from);
          if (this.oracle.doc.lineAt(from).to == to)
            gap.flags |= 4;
          return gap;
        }
        ensureLine() {
          this.enterLine();
          let last2 = this.nodes.length ? this.nodes[this.nodes.length - 1] : null;
          if (last2 instanceof HeightMapText)
            return last2;
          let line = new HeightMapText(0, -1, 0);
          this.nodes.push(line);
          return line;
        }
        addBlock(block) {
          this.enterLine();
          let deco = block.deco;
          if (deco && deco.startSide > 0 && !this.isCovered)
            this.ensureLine();
          this.nodes.push(block);
          this.writtenTo = this.pos = this.pos + block.length;
          if (deco && deco.endSide > 0)
            this.covering = block;
        }
        addLineDeco(height, breaks, length) {
          let line = this.ensureLine();
          line.length += length;
          line.collapsed += length;
          line.widgetHeight = Math.max(line.widgetHeight, height);
          line.breaks += breaks;
          this.writtenTo = this.pos = this.pos + length;
        }
        finish(from) {
          let last2 = this.nodes.length == 0 ? null : this.nodes[this.nodes.length - 1];
          if (this.lineStart > -1 && !(last2 instanceof HeightMapText) && !this.isCovered)
            this.nodes.push(new HeightMapText(0, -1, 0));
          else if (this.writtenTo < this.pos || last2 == null)
            this.nodes.push(this.blankContent(this.writtenTo, this.pos));
          let pos = from;
          for (let node of this.nodes) {
            if (node instanceof HeightMapText)
              node.updateHeight(this.oracle, pos);
            pos += node ? node.length : 1;
          }
          return this.nodes;
        }
        // Always called with a region that on both sides either stretches
        // to a line break or the end of the document.
        // The returned array uses null to indicate line breaks, but never
        // starts or ends in a line break, or has multiple line breaks next
        // to each other.
        static build(oracle, decorations2, from, to) {
          let builder = new _NodeBuilder(from, oracle);
          RangeSet.spans(decorations2, from, to, builder, 0);
          return builder.finish(from);
        }
      };
      DecorationComparator2 = class {
        constructor() {
          this.changes = [];
        }
        compareRange() {
        }
        comparePoint(from, to, a2, b) {
          if (from < to || a2 && a2.heightRelevant || b && b.heightRelevant)
            addRange(from, to, this.changes, 5);
        }
      };
      LineGap = class {
        constructor(from, to, size, displaySize) {
          this.from = from;
          this.to = to;
          this.size = size;
          this.displaySize = displaySize;
        }
        static same(a2, b) {
          if (a2.length != b.length)
            return false;
          for (let i2 = 0; i2 < a2.length; i2++) {
            let gA = a2[i2], gB = b[i2];
            if (gA.from != gB.from || gA.to != gB.to || gA.size != gB.size)
              return false;
          }
          return true;
        }
        draw(viewState, wrapping) {
          return Decoration.replace({
            widget: new LineGapWidget(this.displaySize * (wrapping ? viewState.scaleY : viewState.scaleX), wrapping)
          }).range(this.from, this.to);
        }
      };
      LineGapWidget = class extends WidgetType {
        constructor(size, vertical) {
          super();
          this.size = size;
          this.vertical = vertical;
        }
        eq(other) {
          return other.size == this.size && other.vertical == this.vertical;
        }
        toDOM() {
          let elt = document.createElement("div");
          if (this.vertical) {
            elt.style.height = this.size + "px";
          } else {
            elt.style.width = this.size + "px";
            elt.style.height = "2px";
            elt.style.display = "inline-block";
          }
          return elt;
        }
        get estimatedHeight() {
          return this.vertical ? this.size : -1;
        }
      };
      ViewState = class {
        constructor(view, state) {
          this.view = view;
          this.state = state;
          this.pixelViewport = { left: 0, right: window.innerWidth, top: 0, bottom: 0 };
          this.inView = true;
          this.paddingTop = 0;
          this.paddingBottom = 0;
          this.contentDOMWidth = 0;
          this.contentDOMHeight = 0;
          this.editorHeight = 0;
          this.editorWidth = 0;
          this.scaleX = 1;
          this.scaleY = 1;
          this.scrollOffset = 0;
          this.scrolledToBottom = false;
          this.scrollAnchorPos = 0;
          this.scrollAnchorHeight = -1;
          this.scaler = IdScaler;
          this.scrollTarget = null;
          this.printing = false;
          this.mustMeasureContent = true;
          this.defaultTextDirection = Direction.LTR;
          this.visibleRanges = [];
          this.mustEnforceCursorAssoc = false;
          let guessWrapping = state.facet(contentAttributes).some((v) => typeof v != "function" && v.class == "cm-lineWrapping");
          this.heightOracle = new HeightOracle(guessWrapping);
          this.stateDeco = staticDeco(state);
          this.heightMap = HeightMap.empty().applyChanges(this.stateDeco, Text.empty, this.heightOracle.setDoc(state.doc), [new ChangedRange(0, 0, 0, state.doc.length)]);
          for (let i2 = 0; i2 < 2; i2++) {
            this.viewport = this.getViewport(0, null);
            if (!this.updateForViewport())
              break;
          }
          this.updateViewportLines();
          this.lineGaps = this.ensureLineGaps([]);
          this.lineGapDeco = Decoration.set(this.lineGaps.map((gap) => gap.draw(this, false)));
          this.scrollParent = view.scrollDOM;
          this.computeVisibleRanges();
        }
        updateForViewport() {
          let viewports = [this.viewport], { main } = this.state.selection;
          for (let i2 = 0; i2 <= 1; i2++) {
            let pos = i2 ? main.head : main.anchor;
            if (!viewports.some(({ from, to }) => pos >= from && pos <= to)) {
              let { from, to } = this.lineBlockAt(pos);
              viewports.push(new Viewport(from, to));
            }
          }
          this.viewports = viewports.sort((a2, b) => a2.from - b.from);
          return this.updateScaler();
        }
        updateScaler() {
          let scaler = this.scaler;
          this.scaler = this.heightMap.height <= 7e6 ? IdScaler : new BigScaler(this.heightOracle, this.heightMap, this.viewports);
          return scaler.eq(this.scaler) ? 0 : 2;
        }
        updateViewportLines() {
          this.viewportLines = [];
          this.heightMap.forEachLine(this.viewport.from, this.viewport.to, this.heightOracle.setDoc(this.state.doc), 0, 0, (block) => {
            this.viewportLines.push(scaleBlock(block, this.scaler));
          });
        }
        update(update, scrollTarget = null) {
          this.state = update.state;
          let prevDeco = this.stateDeco;
          this.stateDeco = staticDeco(this.state);
          let contentChanges = update.changedRanges;
          let heightChanges = ChangedRange.extendWithRanges(contentChanges, heightRelevantDecoChanges(prevDeco, this.stateDeco, update ? update.changes : ChangeSet.empty(this.state.doc.length)));
          let prevHeight = this.heightMap.height;
          let scrollAnchor = this.scrolledToBottom ? null : this.scrollAnchorAt(this.scrollOffset);
          clearHeightChangeFlag();
          this.heightMap = this.heightMap.applyChanges(this.stateDeco, update.startState.doc, this.heightOracle.setDoc(this.state.doc), heightChanges);
          if (this.heightMap.height != prevHeight || heightChangeFlag)
            update.flags |= 2;
          if (scrollAnchor) {
            this.scrollAnchorPos = update.changes.mapPos(scrollAnchor.from, -1);
            this.scrollAnchorHeight = scrollAnchor.top;
          } else {
            this.scrollAnchorPos = -1;
            this.scrollAnchorHeight = prevHeight;
          }
          let viewport = heightChanges.length ? this.mapViewport(this.viewport, update.changes) : this.viewport;
          if (scrollTarget && (scrollTarget.range.head < viewport.from || scrollTarget.range.head > viewport.to) || !this.viewportIsAppropriate(viewport))
            viewport = this.getViewport(0, scrollTarget);
          let viewportChange = viewport.from != this.viewport.from || viewport.to != this.viewport.to;
          this.viewport = viewport;
          update.flags |= this.updateForViewport();
          if (viewportChange || !update.changes.empty || update.flags & 2)
            this.updateViewportLines();
          if (this.lineGaps.length || this.viewport.to - this.viewport.from > 2e3 << 1)
            this.updateLineGaps(this.ensureLineGaps(this.mapLineGaps(this.lineGaps, update.changes)));
          update.flags |= this.computeVisibleRanges(update.changes);
          if (scrollTarget)
            this.scrollTarget = scrollTarget;
          if (!this.mustEnforceCursorAssoc && (update.selectionSet || update.focusChanged) && update.view.lineWrapping && update.state.selection.main.empty && update.state.selection.main.assoc && !update.state.facet(nativeSelectionHidden))
            this.mustEnforceCursorAssoc = true;
        }
        measure() {
          let { view } = this, dom = view.contentDOM, style = window.getComputedStyle(dom);
          let oracle = this.heightOracle;
          let whiteSpace = style.whiteSpace;
          this.defaultTextDirection = style.direction == "rtl" ? Direction.RTL : Direction.LTR;
          let refresh = this.heightOracle.mustRefreshForWrapping(whiteSpace) || this.mustMeasureContent === "refresh";
          let domRect = dom.getBoundingClientRect();
          let measureContent = refresh || this.mustMeasureContent || this.contentDOMHeight != domRect.height;
          this.contentDOMHeight = domRect.height;
          this.mustMeasureContent = false;
          let result = 0, bias = 0;
          if (domRect.width && domRect.height) {
            let { scaleX, scaleY } = getScale(dom, domRect);
            if (scaleX > 5e-3 && Math.abs(this.scaleX - scaleX) > 5e-3 || scaleY > 5e-3 && Math.abs(this.scaleY - scaleY) > 5e-3) {
              this.scaleX = scaleX;
              this.scaleY = scaleY;
              result |= 16;
              refresh = measureContent = true;
            }
          }
          let paddingTop = (parseInt(style.paddingTop) || 0) * this.scaleY;
          let paddingBottom = (parseInt(style.paddingBottom) || 0) * this.scaleY;
          if (this.paddingTop != paddingTop || this.paddingBottom != paddingBottom) {
            this.paddingTop = paddingTop;
            this.paddingBottom = paddingBottom;
            result |= 16 | 2;
          }
          if (this.editorWidth != view.scrollDOM.clientWidth) {
            if (oracle.lineWrapping)
              measureContent = true;
            this.editorWidth = view.scrollDOM.clientWidth;
            result |= 16;
          }
          let scrollParent = scrollableParents(this.view.contentDOM, false).y;
          if (scrollParent != this.scrollParent) {
            this.scrollParent = scrollParent;
            this.scrollAnchorHeight = -1;
            this.scrollOffset = 0;
          }
          let scrollOffset = this.getScrollOffset();
          if (this.scrollOffset != scrollOffset) {
            this.scrollAnchorHeight = -1;
            this.scrollOffset = scrollOffset;
          }
          this.scrolledToBottom = isScrolledToBottom(this.scrollParent || view.win);
          let pixelViewport = (this.printing ? fullPixelRange : visiblePixelRange)(dom, this.paddingTop);
          let dTop = pixelViewport.top - this.pixelViewport.top, dBottom = pixelViewport.bottom - this.pixelViewport.bottom;
          this.pixelViewport = pixelViewport;
          let inView = this.pixelViewport.bottom > this.pixelViewport.top && this.pixelViewport.right > this.pixelViewport.left;
          if (inView != this.inView) {
            this.inView = inView;
            if (inView)
              measureContent = true;
          }
          if (!this.inView && !this.scrollTarget && !inWindow(view.dom))
            return 0;
          let contentWidth = domRect.width;
          if (this.contentDOMWidth != contentWidth || this.editorHeight != view.scrollDOM.clientHeight) {
            this.contentDOMWidth = domRect.width;
            this.editorHeight = view.scrollDOM.clientHeight;
            result |= 16;
          }
          if (measureContent) {
            let lineHeights = view.docView.measureVisibleLineHeights(this.viewport);
            if (oracle.mustRefreshForHeights(lineHeights))
              refresh = true;
            if (refresh || oracle.lineWrapping && Math.abs(contentWidth - this.contentDOMWidth) > oracle.charWidth) {
              let { lineHeight, charWidth, textHeight } = view.docView.measureTextSize();
              refresh = lineHeight > 0 && oracle.refresh(whiteSpace, lineHeight, charWidth, textHeight, Math.max(5, contentWidth / charWidth), lineHeights);
              if (refresh) {
                view.docView.minWidth = 0;
                result |= 16;
              }
            }
            if (dTop > 0 && dBottom > 0)
              bias = Math.max(dTop, dBottom);
            else if (dTop < 0 && dBottom < 0)
              bias = Math.min(dTop, dBottom);
            clearHeightChangeFlag();
            for (let vp of this.viewports) {
              let heights = vp.from == this.viewport.from ? lineHeights : view.docView.measureVisibleLineHeights(vp);
              this.heightMap = (refresh ? HeightMap.empty().applyChanges(this.stateDeco, Text.empty, this.heightOracle, [new ChangedRange(0, 0, 0, view.state.doc.length)]) : this.heightMap).updateHeight(oracle, 0, refresh, new MeasuredHeights(vp.from, heights));
            }
            if (heightChangeFlag)
              result |= 2;
          }
          let viewportChange = !this.viewportIsAppropriate(this.viewport, bias) || this.scrollTarget && (this.scrollTarget.range.head < this.viewport.from || this.scrollTarget.range.head > this.viewport.to);
          if (viewportChange) {
            if (result & 2)
              result |= this.updateScaler();
            this.viewport = this.getViewport(bias, this.scrollTarget);
            result |= this.updateForViewport();
          }
          if (result & 2 || viewportChange)
            this.updateViewportLines();
          if (this.lineGaps.length || this.viewport.to - this.viewport.from > 2e3 << 1)
            this.updateLineGaps(this.ensureLineGaps(refresh ? [] : this.lineGaps, view));
          result |= this.computeVisibleRanges();
          if (this.mustEnforceCursorAssoc) {
            this.mustEnforceCursorAssoc = false;
            view.docView.enforceCursorAssoc();
          }
          return result;
        }
        get visibleTop() {
          return this.scaler.fromDOM(this.pixelViewport.top);
        }
        get visibleBottom() {
          return this.scaler.fromDOM(this.pixelViewport.bottom);
        }
        getViewport(bias, scrollTarget) {
          let marginTop = 0.5 - Math.max(-0.5, Math.min(0.5, bias / 1e3 / 2));
          let map = this.heightMap, oracle = this.heightOracle;
          let { visibleTop, visibleBottom } = this;
          let viewport = new Viewport(map.lineAt(visibleTop - marginTop * 1e3, QueryType.ByHeight, oracle, 0, 0).from, map.lineAt(visibleBottom + (1 - marginTop) * 1e3, QueryType.ByHeight, oracle, 0, 0).to);
          if (scrollTarget) {
            let { head } = scrollTarget.range;
            if (head < viewport.from || head > viewport.to) {
              let viewHeight = Math.min(this.editorHeight, this.pixelViewport.bottom - this.pixelViewport.top);
              let block = map.lineAt(head, QueryType.ByPos, oracle, 0, 0), topPos;
              if (scrollTarget.y == "center")
                topPos = (block.top + block.bottom) / 2 - viewHeight / 2;
              else if (scrollTarget.y == "start" || scrollTarget.y == "nearest" && head < viewport.from)
                topPos = block.top;
              else
                topPos = block.bottom - viewHeight;
              viewport = new Viewport(map.lineAt(topPos - 1e3 / 2, QueryType.ByHeight, oracle, 0, 0).from, map.lineAt(topPos + viewHeight + 1e3 / 2, QueryType.ByHeight, oracle, 0, 0).to);
            }
          }
          return viewport;
        }
        mapViewport(viewport, changes) {
          let from = changes.mapPos(viewport.from, -1), to = changes.mapPos(viewport.to, 1);
          return new Viewport(this.heightMap.lineAt(from, QueryType.ByPos, this.heightOracle, 0, 0).from, this.heightMap.lineAt(to, QueryType.ByPos, this.heightOracle, 0, 0).to);
        }
        // Checks if a given viewport covers the visible part of the
        // document and not too much beyond that.
        viewportIsAppropriate({ from, to }, bias = 0) {
          if (!this.inView)
            return true;
          let { top: top2 } = this.heightMap.lineAt(from, QueryType.ByPos, this.heightOracle, 0, 0);
          let { bottom } = this.heightMap.lineAt(to, QueryType.ByPos, this.heightOracle, 0, 0);
          let { visibleTop, visibleBottom } = this;
          return (from == 0 || top2 <= visibleTop - Math.max(10, Math.min(
            -bias,
            250
            /* VP.MaxCoverMargin */
          ))) && (to == this.state.doc.length || bottom >= visibleBottom + Math.max(10, Math.min(
            bias,
            250
            /* VP.MaxCoverMargin */
          ))) && (top2 > visibleTop - 2 * 1e3 && bottom < visibleBottom + 2 * 1e3);
        }
        mapLineGaps(gaps, changes) {
          if (!gaps.length || changes.empty)
            return gaps;
          let mapped = [];
          for (let gap of gaps)
            if (!changes.touchesRange(gap.from, gap.to))
              mapped.push(new LineGap(changes.mapPos(gap.from), changes.mapPos(gap.to), gap.size, gap.displaySize));
          return mapped;
        }
        // Computes positions in the viewport where the start or end of a
        // line should be hidden, trying to reuse existing line gaps when
        // appropriate to avoid unneccesary redraws.
        // Uses crude character-counting for the positioning and sizing,
        // since actual DOM coordinates aren't always available and
        // predictable. Relies on generous margins (see LG.Margin) to hide
        // the artifacts this might produce from the user.
        ensureLineGaps(current, mayMeasure) {
          let wrapping = this.heightOracle.lineWrapping;
          let margin = wrapping ? 1e4 : 2e3, halfMargin = margin >> 1, doubleMargin = margin << 1;
          if (this.defaultTextDirection != Direction.LTR && !wrapping)
            return [];
          let gaps = [];
          let addGap = (from, to, line, structure) => {
            if (to - from < halfMargin)
              return;
            let sel = this.state.selection.main, avoid = [sel.from];
            if (!sel.empty)
              avoid.push(sel.to);
            for (let pos of avoid) {
              if (pos > from && pos < to) {
                addGap(from, pos - 10, line, structure);
                addGap(pos + 10, to, line, structure);
                return;
              }
            }
            let gap = find(current, (gap2) => gap2.from >= line.from && gap2.to <= line.to && Math.abs(gap2.from - from) < halfMargin && Math.abs(gap2.to - to) < halfMargin && !avoid.some((pos) => gap2.from < pos && gap2.to > pos));
            if (!gap) {
              if (to < line.to && mayMeasure && wrapping && mayMeasure.visibleRanges.some((r) => r.from <= to && r.to >= to)) {
                let lineStart = mayMeasure.moveToLineBoundary(EditorSelection.cursor(to), false, true).head;
                if (lineStart > from)
                  to = lineStart;
              }
              let size = this.gapSize(line, from, to, structure);
              let displaySize = wrapping || size < 2e6 ? size : 2e6;
              gap = new LineGap(from, to, size, displaySize);
            }
            gaps.push(gap);
          };
          let checkLine = (line) => {
            if (line.length < doubleMargin || line.type != BlockType.Text)
              return;
            let structure = lineStructure(line.from, line.to, this.stateDeco);
            if (structure.total < doubleMargin)
              return;
            let target = this.scrollTarget ? this.scrollTarget.range.head : null;
            let viewFrom, viewTo;
            if (wrapping) {
              let marginHeight = margin / this.heightOracle.lineLength * this.heightOracle.lineHeight;
              let top2, bot;
              if (target != null) {
                let targetFrac = findFraction(structure, target);
                let spaceFrac = ((this.visibleBottom - this.visibleTop) / 2 + marginHeight) / line.height;
                top2 = targetFrac - spaceFrac;
                bot = targetFrac + spaceFrac;
              } else {
                top2 = (this.visibleTop - line.top - marginHeight) / line.height;
                bot = (this.visibleBottom - line.top + marginHeight) / line.height;
              }
              viewFrom = findPosition(structure, top2);
              viewTo = findPosition(structure, bot);
            } else {
              let totalWidth = structure.total * this.heightOracle.charWidth;
              let marginWidth = margin * this.heightOracle.charWidth;
              let horizOffset = 0;
              if (totalWidth > 2e6)
                for (let old of current) {
                  if (old.from >= line.from && old.from < line.to && old.size != old.displaySize && old.from * this.heightOracle.charWidth + horizOffset < this.pixelViewport.left)
                    horizOffset = old.size - old.displaySize;
                }
              let pxLeft = this.pixelViewport.left + horizOffset, pxRight = this.pixelViewport.right + horizOffset;
              let left, right;
              if (target != null) {
                let targetFrac = findFraction(structure, target);
                let spaceFrac = ((pxRight - pxLeft) / 2 + marginWidth) / totalWidth;
                left = targetFrac - spaceFrac;
                right = targetFrac + spaceFrac;
              } else {
                left = (pxLeft - marginWidth) / totalWidth;
                right = (pxRight + marginWidth) / totalWidth;
              }
              viewFrom = findPosition(structure, left);
              viewTo = findPosition(structure, right);
            }
            if (viewFrom > line.from)
              addGap(line.from, viewFrom, line, structure);
            if (viewTo < line.to)
              addGap(viewTo, line.to, line, structure);
          };
          for (let line of this.viewportLines) {
            if (Array.isArray(line.type))
              line.type.forEach(checkLine);
            else
              checkLine(line);
          }
          return gaps;
        }
        gapSize(line, from, to, structure) {
          let fraction = findFraction(structure, to) - findFraction(structure, from);
          if (this.heightOracle.lineWrapping) {
            return line.height * fraction;
          } else {
            return structure.total * this.heightOracle.charWidth * fraction;
          }
        }
        updateLineGaps(gaps) {
          if (!LineGap.same(gaps, this.lineGaps)) {
            this.lineGaps = gaps;
            this.lineGapDeco = Decoration.set(gaps.map((gap) => gap.draw(this, this.heightOracle.lineWrapping)));
          }
        }
        computeVisibleRanges(changes) {
          let deco = this.stateDeco;
          if (this.lineGaps.length)
            deco = deco.concat(this.lineGapDeco);
          let ranges = [];
          RangeSet.spans(deco, this.viewport.from, this.viewport.to, {
            span(from, to) {
              ranges.push({ from, to });
            },
            point() {
            }
          }, 20);
          let changed = 0;
          if (ranges.length != this.visibleRanges.length) {
            changed = 8 | 4;
          } else {
            for (let i2 = 0; i2 < ranges.length && !(changed & 8); i2++) {
              let old = this.visibleRanges[i2], nw = ranges[i2];
              if (old.from != nw.from || old.to != nw.to) {
                changed |= 4;
                if (!(changes && changes.mapPos(old.from, -1) == nw.from && changes.mapPos(old.to, 1) == nw.to))
                  changed |= 8;
              }
            }
          }
          this.visibleRanges = ranges;
          return changed;
        }
        lineBlockAt(pos) {
          return pos >= this.viewport.from && pos <= this.viewport.to && this.viewportLines.find((b) => b.from <= pos && b.to >= pos) || scaleBlock(this.heightMap.lineAt(pos, QueryType.ByPos, this.heightOracle, 0, 0), this.scaler);
        }
        lineBlockAtHeight(height) {
          return height >= this.viewportLines[0].top && height <= this.viewportLines[this.viewportLines.length - 1].bottom && this.viewportLines.find((l) => l.top <= height && l.bottom >= height) || scaleBlock(this.heightMap.lineAt(this.scaler.fromDOM(height), QueryType.ByHeight, this.heightOracle, 0, 0), this.scaler);
        }
        getScrollOffset() {
          return this.scrollParent == this.view.scrollDOM ? this.scrollParent.scrollTop * this.scaleY : (this.scrollParent ? this.scrollParent.getBoundingClientRect().top : 0) - this.view.contentDOM.getBoundingClientRect().top;
        }
        scrollAnchorAt(scrollOffset) {
          let block = this.lineBlockAtHeight(scrollOffset + 8);
          return block.from >= this.viewport.from || this.viewportLines[0].top - scrollOffset > 200 ? block : this.viewportLines[0];
        }
        elementAtHeight(height) {
          return scaleBlock(this.heightMap.blockAt(this.scaler.fromDOM(height), this.heightOracle, 0, 0), this.scaler);
        }
        get docHeight() {
          return this.scaler.toDOM(this.heightMap.height);
        }
        get contentHeight() {
          return this.docHeight + this.paddingTop + this.paddingBottom;
        }
      };
      Viewport = class {
        constructor(from, to) {
          this.from = from;
          this.to = to;
        }
      };
      IdScaler = {
        toDOM(n) {
          return n;
        },
        fromDOM(n) {
          return n;
        },
        scale: 1,
        eq(other) {
          return other == this;
        }
      };
      BigScaler = class _BigScaler {
        constructor(oracle, heightMap, viewports) {
          let vpHeight = 0, base2 = 0, domBase = 0;
          this.viewports = viewports.map(({ from, to }) => {
            let top2 = heightMap.lineAt(from, QueryType.ByPos, oracle, 0, 0).top;
            let bottom = heightMap.lineAt(to, QueryType.ByPos, oracle, 0, 0).bottom;
            vpHeight += bottom - top2;
            return { from, to, top: top2, bottom, domTop: 0, domBottom: 0 };
          });
          this.scale = (7e6 - vpHeight) / (heightMap.height - vpHeight);
          for (let obj of this.viewports) {
            obj.domTop = domBase + (obj.top - base2) * this.scale;
            domBase = obj.domBottom = obj.domTop + (obj.bottom - obj.top);
            base2 = obj.bottom;
          }
        }
        toDOM(n) {
          for (let i2 = 0, base2 = 0, domBase = 0; ; i2++) {
            let vp = i2 < this.viewports.length ? this.viewports[i2] : null;
            if (!vp || n < vp.top)
              return domBase + (n - base2) * this.scale;
            if (n <= vp.bottom)
              return vp.domTop + (n - vp.top);
            base2 = vp.bottom;
            domBase = vp.domBottom;
          }
        }
        fromDOM(n) {
          for (let i2 = 0, base2 = 0, domBase = 0; ; i2++) {
            let vp = i2 < this.viewports.length ? this.viewports[i2] : null;
            if (!vp || n < vp.domTop)
              return base2 + (n - domBase) / this.scale;
            if (n <= vp.domBottom)
              return vp.top + (n - vp.domTop);
            base2 = vp.bottom;
            domBase = vp.domBottom;
          }
        }
        eq(other) {
          if (!(other instanceof _BigScaler))
            return false;
          return this.scale == other.scale && this.viewports.length == other.viewports.length && this.viewports.every((vp, i2) => vp.from == other.viewports[i2].from && vp.to == other.viewports[i2].to);
        }
      };
      theme = /* @__PURE__ */ Facet.define({ combine: (strs) => strs.join(" ") });
      darkTheme = /* @__PURE__ */ Facet.define({ combine: (values) => values.indexOf(true) > -1 });
      baseThemeID = /* @__PURE__ */ StyleModule.newName();
      baseLightID = /* @__PURE__ */ StyleModule.newName();
      baseDarkID = /* @__PURE__ */ StyleModule.newName();
      lightDarkIDs = { "&light": "." + baseLightID, "&dark": "." + baseDarkID };
      baseTheme$1 = /* @__PURE__ */ buildTheme("." + baseThemeID, {
        "&": {
          position: "relative !important",
          boxSizing: "border-box",
          "&.cm-focused": {
            // Provide a simple default outline to make sure a focused
            // editor is visually distinct. Can't leave the default behavior
            // because that will apply to the content element, which is
            // inside the scrollable container and doesn't include the
            // gutters. We also can't use an 'auto' outline, since those
            // are, for some reason, drawn behind the element content, which
            // will cause things like the active line background to cover
            // the outline (#297).
            outline: "1px dotted #212121"
          },
          display: "flex !important",
          flexDirection: "column"
        },
        ".cm-scroller": {
          display: "flex !important",
          alignItems: "flex-start !important",
          fontFamily: "monospace",
          lineHeight: 1.4,
          height: "100%",
          overflowX: "auto",
          position: "relative",
          zIndex: 0,
          overflowAnchor: "none"
        },
        ".cm-content": {
          margin: 0,
          flexGrow: 2,
          flexShrink: 0,
          display: "block",
          whiteSpace: "pre",
          wordWrap: "normal",
          // Issue #456
          boxSizing: "border-box",
          minHeight: "100%",
          padding: "4px 0",
          outline: "none",
          "&[contenteditable=true]": {
            WebkitUserModify: "read-write-plaintext-only"
          }
        },
        ".cm-lineWrapping": {
          whiteSpace_fallback: "pre-wrap",
          // For IE
          whiteSpace: "break-spaces",
          wordBreak: "break-word",
          // For Safari, which doesn't support overflow-wrap: anywhere
          overflowWrap: "anywhere",
          flexShrink: 1
        },
        "&light .cm-content": { caretColor: "black" },
        "&dark .cm-content": { caretColor: "white" },
        ".cm-line": {
          display: "block",
          padding: "0 2px 0 6px"
        },
        ".cm-layer": {
          userSelect: "none",
          // #1708
          position: "absolute",
          left: 0,
          top: 0,
          contain: "size style",
          "& > *": {
            position: "absolute"
          }
        },
        "&light .cm-selectionBackground": {
          background: "#d9d9d9"
        },
        "&dark .cm-selectionBackground": {
          background: "#222"
        },
        "&light.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground": {
          background: "#d7d4f0"
        },
        "&dark.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground": {
          background: "#233"
        },
        ".cm-cursorLayer": {
          pointerEvents: "none"
        },
        "&.cm-focused > .cm-scroller > .cm-cursorLayer": {
          animation: "steps(1) cm-blink 1.2s infinite"
        },
        // Two animations defined so that we can switch between them to
        // restart the animation without forcing another style
        // recomputation.
        "@keyframes cm-blink": { "0%": {}, "50%": { opacity: 0 }, "100%": {} },
        "@keyframes cm-blink2": { "0%": {}, "50%": { opacity: 0 }, "100%": {} },
        ".cm-cursor, .cm-dropCursor": {
          borderLeft: "1.2px solid black",
          marginLeft: "-0.6px",
          pointerEvents: "none"
        },
        ".cm-cursor": {
          display: "none"
        },
        "&dark .cm-cursor": {
          borderLeftColor: "#ddd"
        },
        ".cm-selectionHandle": {
          backgroundColor: "currentColor",
          width: "1.5px"
        },
        ".cm-selectionHandle-start::before, .cm-selectionHandle-end::before": {
          content: '""',
          backgroundColor: "inherit",
          borderRadius: "50%",
          width: "8px",
          height: "8px",
          position: "absolute",
          left: "-3.25px"
        },
        ".cm-selectionHandle-start::before": { top: "-8px" },
        ".cm-selectionHandle-end::before": { bottom: "-8px" },
        ".cm-dropCursor": {
          position: "absolute"
        },
        "&.cm-focused > .cm-scroller > .cm-cursorLayer .cm-cursor": {
          display: "block"
        },
        ".cm-iso": {
          unicodeBidi: "isolate"
        },
        ".cm-announced": {
          position: "fixed",
          top: "-10000px"
        },
        "@media print": {
          ".cm-announced": { display: "none" }
        },
        "&light .cm-activeLine": { backgroundColor: "#cceeff44" },
        "&dark .cm-activeLine": { backgroundColor: "#99eeff33" },
        "&light .cm-specialChar": { color: "red" },
        "&dark .cm-specialChar": { color: "#f78" },
        ".cm-gutters": {
          flexShrink: 0,
          display: "flex",
          height: "100%",
          boxSizing: "border-box",
          zIndex: 200
        },
        ".cm-gutters-before": { insetInlineStart: 0 },
        ".cm-gutters-after": { insetInlineEnd: 0 },
        "&light .cm-gutters": {
          backgroundColor: "#f5f5f5",
          color: "#6c6c6c",
          border: "0px solid #ddd",
          "&.cm-gutters-before": { borderRightWidth: "1px" },
          "&.cm-gutters-after": { borderLeftWidth: "1px" }
        },
        "&dark .cm-gutters": {
          backgroundColor: "#333338",
          color: "#ccc"
        },
        ".cm-gutter": {
          display: "flex !important",
          // Necessary -- prevents margin collapsing
          flexDirection: "column",
          flexShrink: 0,
          boxSizing: "border-box",
          minHeight: "100%",
          overflow: "hidden"
        },
        ".cm-gutterElement": {
          boxSizing: "border-box"
        },
        ".cm-lineNumbers .cm-gutterElement": {
          padding: "0 3px 0 5px",
          minWidth: "20px",
          textAlign: "right",
          whiteSpace: "nowrap"
        },
        "&light .cm-activeLineGutter": {
          backgroundColor: "#e2f2ff"
        },
        "&dark .cm-activeLineGutter": {
          backgroundColor: "#222227"
        },
        ".cm-panels": {
          boxSizing: "border-box",
          position: "sticky",
          left: 0,
          right: 0,
          zIndex: 300
        },
        "&light .cm-panels": {
          backgroundColor: "#f5f5f5",
          color: "black"
        },
        ".cm-panels-top": { top: "0" },
        ".cm-panels-bottom": { bottom: "0" },
        "&light .cm-panels-top": {
          borderBottom: "1px solid #ddd"
        },
        "&light .cm-panels-bottom": {
          borderTop: "1px solid #ddd"
        },
        "&dark .cm-panels": {
          backgroundColor: "#333338",
          color: "white"
        },
        ".cm-dialog": {
          padding: "2px 19px 4px 6px",
          position: "relative",
          "& label": { fontSize: "80%" }
        },
        ".cm-dialog-close": {
          position: "absolute",
          top: "3px",
          right: "4px",
          backgroundColor: "inherit",
          border: "none",
          font: "inherit",
          fontSize: "14px",
          padding: "0"
        },
        ".cm-tab": {
          display: "inline-block",
          overflow: "hidden",
          verticalAlign: "bottom"
        },
        ".cm-widgetBuffer": {
          verticalAlign: "text-top",
          height: "1em",
          width: 0,
          display: "inline"
        },
        ".cm-placeholder": {
          color: "#888",
          display: "inline-block",
          verticalAlign: "top",
          userSelect: "none"
        },
        ".cm-highlightSpace": {
          background: "radial-gradient(circle at 50% 55%, #aaa 20%, transparent 0) no-repeat",
          backgroundSize: ".4em",
          backgroundPosition: "calc(min(50%, 0px)) center"
        },
        ".cm-highlightTab": {
          backgroundImage: `url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="20"><path stroke="%23888" stroke-width="1" fill="none" d="M1 10H196L190 5M190 15L196 10M197 4L197 16"/></svg>')`,
          backgroundSize: "auto 100%",
          backgroundPosition: "right 90%",
          backgroundRepeat: "no-repeat"
        },
        ".cm-trailingSpace": {
          backgroundColor: "#ff332255"
        },
        ".cm-button": {
          verticalAlign: "middle",
          color: "inherit",
          fontSize: "70%",
          padding: ".2em 1em",
          borderRadius: "1px"
        },
        "&light .cm-button": {
          backgroundImage: "linear-gradient(#eff1f5, #d9d9df)",
          border: "1px solid #888",
          "&:active": {
            backgroundImage: "linear-gradient(#b4b4b4, #d0d3d6)"
          }
        },
        "&dark .cm-button": {
          backgroundImage: "linear-gradient(#393939, #111)",
          border: "1px solid #888",
          "&:active": {
            backgroundImage: "linear-gradient(#111, #333)"
          }
        },
        ".cm-textfield": {
          verticalAlign: "middle",
          color: "inherit",
          fontSize: "70%",
          border: "1px solid silver",
          padding: ".2em .5em"
        },
        "&light .cm-textfield": {
          backgroundColor: "white"
        },
        "&dark .cm-textfield": {
          border: "1px solid #555",
          backgroundColor: "inherit"
        }
      }, lightDarkIDs);
      observeOptions = {
        childList: true,
        characterData: true,
        subtree: true,
        attributes: true,
        characterDataOldValue: true
      };
      useCharData = browser.ie && browser.ie_version <= 11;
      DOMObserver = class {
        constructor(view) {
          this.view = view;
          this.active = false;
          this.editContext = null;
          this.selectionRange = new DOMSelectionState();
          this.selectionChanged = false;
          this.delayedFlush = -1;
          this.resizeTimeout = -1;
          this.queue = [];
          this.delayedAndroidKey = null;
          this.flushingAndroidKey = -1;
          this.lastChange = 0;
          this.scrollTargets = [];
          this.intersection = null;
          this.resizeScroll = null;
          this.intersecting = false;
          this.gapIntersection = null;
          this.gaps = [];
          this.printQuery = null;
          this.parentCheck = -1;
          this.dom = view.contentDOM;
          this.observer = new MutationObserver((mutations) => {
            for (let mut of mutations)
              this.queue.push(mut);
            if ((browser.ie && browser.ie_version <= 11 || browser.ios && view.composing) && mutations.some((m) => m.type == "childList" && m.removedNodes.length || m.type == "characterData" && m.oldValue.length > m.target.nodeValue.length))
              this.flushSoon();
            else
              this.flush();
          });
          if (window.EditContext && browser.android && view.constructor.EDIT_CONTEXT !== false && // Chrome <126 doesn't support inverted selections in edit context (#1392)
          !(browser.chrome && browser.chrome_version < 126)) {
            this.editContext = new EditContextManager(view);
            if (view.state.facet(editable))
              view.contentDOM.editContext = this.editContext.editContext;
          }
          if (useCharData)
            this.onCharData = (event) => {
              this.queue.push({
                target: event.target,
                type: "characterData",
                oldValue: event.prevValue
              });
              this.flushSoon();
            };
          this.onSelectionChange = this.onSelectionChange.bind(this);
          this.onResize = this.onResize.bind(this);
          this.onPrint = this.onPrint.bind(this);
          this.onScroll = this.onScroll.bind(this);
          if (window.matchMedia)
            this.printQuery = window.matchMedia("print");
          if (typeof ResizeObserver == "function") {
            this.resizeScroll = new ResizeObserver(() => {
              var _a2;
              if (((_a2 = this.view.docView) === null || _a2 === void 0 ? void 0 : _a2.lastUpdate) < Date.now() - 75)
                this.onResize();
            });
            this.resizeScroll.observe(view.scrollDOM);
          }
          this.addWindowListeners(this.win = view.win);
          this.start();
          if (typeof IntersectionObserver == "function") {
            this.intersection = new IntersectionObserver((entries) => {
              if (this.parentCheck < 0)
                this.parentCheck = setTimeout(this.listenForScroll.bind(this), 1e3);
              if (entries.length > 0 && entries[entries.length - 1].intersectionRatio > 0 != this.intersecting) {
                this.intersecting = !this.intersecting;
                if (this.intersecting != this.view.inView)
                  this.onScrollChanged(document.createEvent("Event"));
              }
            }, { threshold: [0, 1e-3] });
            this.intersection.observe(this.dom);
            this.gapIntersection = new IntersectionObserver((entries) => {
              if (entries.length > 0 && entries[entries.length - 1].intersectionRatio > 0)
                this.onScrollChanged(document.createEvent("Event"));
            }, {});
          }
          this.listenForScroll();
          this.readSelectionRange();
        }
        onScrollChanged(e) {
          this.view.inputState.runHandlers("scroll", e);
          if (this.intersecting)
            this.view.measure();
        }
        onScroll(e) {
          if (this.intersecting)
            this.flush(false);
          if (this.editContext)
            this.view.requestMeasure(this.editContext.measureReq);
          this.onScrollChanged(e);
        }
        onResize() {
          if (this.resizeTimeout < 0)
            this.resizeTimeout = setTimeout(() => {
              this.resizeTimeout = -1;
              this.view.requestMeasure();
            }, 50);
        }
        onPrint(event) {
          if ((event.type == "change" || !event.type) && !event.matches)
            return;
          this.view.viewState.printing = true;
          this.view.measure();
          setTimeout(() => {
            this.view.viewState.printing = false;
            this.view.requestMeasure();
          }, 500);
        }
        updateGaps(gaps) {
          if (this.gapIntersection && (gaps.length != this.gaps.length || this.gaps.some((g, i2) => g != gaps[i2]))) {
            this.gapIntersection.disconnect();
            for (let gap of gaps)
              this.gapIntersection.observe(gap);
            this.gaps = gaps;
          }
        }
        onSelectionChange(event) {
          let wasChanged = this.selectionChanged;
          if (!this.readSelectionRange() || this.delayedAndroidKey)
            return;
          let { view } = this, sel = this.selectionRange;
          if (view.state.facet(editable) ? view.root.activeElement != this.dom : !hasSelection(this.dom, sel))
            return;
          let context = sel.anchorNode && view.docView.tile.nearest(sel.anchorNode);
          if (context && context.isWidget() && context.widget.ignoreEvent(event)) {
            if (!wasChanged)
              this.selectionChanged = false;
            return;
          }
          if ((browser.ie && browser.ie_version <= 11 || browser.android && browser.chrome) && !view.state.selection.main.empty && // (Selection.isCollapsed isn't reliable on IE)
          sel.focusNode && isEquivalentPosition(sel.focusNode, sel.focusOffset, sel.anchorNode, sel.anchorOffset))
            this.flushSoon();
          else
            this.flush(false);
        }
        readSelectionRange() {
          let { view } = this;
          let selection = getSelection(view.root);
          if (!selection)
            return false;
          let range = browser.safari && view.root.nodeType == 11 && view.root.activeElement == this.dom && safariSelectionRangeHack(this.view, selection) || selection;
          if (!range || this.selectionRange.eq(range))
            return false;
          let local = hasSelection(this.dom, range);
          if (local && !this.selectionChanged && view.inputState.lastFocusTime > Date.now() - 200 && view.inputState.lastTouchTime < Date.now() - 300 && atElementStart(this.dom, range)) {
            this.view.inputState.lastFocusTime = 0;
            view.docView.updateSelection();
            return false;
          }
          this.selectionRange.setRange(range);
          if (local)
            this.selectionChanged = true;
          return true;
        }
        setSelectionRange(anchor, head) {
          this.selectionRange.set(anchor.node, anchor.offset, head.node, head.offset);
          this.selectionChanged = false;
        }
        clearSelectionRange() {
          this.selectionRange.set(null, 0, null, 0);
        }
        listenForScroll() {
          this.parentCheck = -1;
          let i2 = 0, changed = null;
          for (let dom = this.dom; dom; ) {
            if (dom.nodeType == 1) {
              if (!changed && i2 < this.scrollTargets.length && this.scrollTargets[i2] == dom)
                i2++;
              else if (!changed)
                changed = this.scrollTargets.slice(0, i2);
              if (changed)
                changed.push(dom);
              dom = dom.assignedSlot || dom.parentNode;
            } else if (dom.nodeType == 11) {
              dom = dom.host;
            } else {
              break;
            }
          }
          if (i2 < this.scrollTargets.length && !changed)
            changed = this.scrollTargets.slice(0, i2);
          if (changed) {
            for (let dom of this.scrollTargets)
              dom.removeEventListener("scroll", this.onScroll);
            for (let dom of this.scrollTargets = changed)
              dom.addEventListener("scroll", this.onScroll);
          }
        }
        ignore(f) {
          if (!this.active)
            return f();
          try {
            this.stop();
            return f();
          } finally {
            this.start();
            this.clear();
          }
        }
        start() {
          if (this.active)
            return;
          this.observer.observe(this.dom, observeOptions);
          if (useCharData)
            this.dom.addEventListener("DOMCharacterDataModified", this.onCharData);
          this.active = true;
        }
        stop() {
          if (!this.active)
            return;
          this.active = false;
          this.observer.disconnect();
          if (useCharData)
            this.dom.removeEventListener("DOMCharacterDataModified", this.onCharData);
        }
        // Throw away any pending changes
        clear() {
          this.processRecords();
          this.queue.length = 0;
          this.selectionChanged = false;
        }
        // Chrome Android, especially in combination with GBoard, not only
        // doesn't reliably fire regular key events, but also often
        // surrounds the effect of enter or backspace with a bunch of
        // composition events that, when interrupted, cause text duplication
        // or other kinds of corruption. This hack makes the editor back off
        // from handling DOM changes for a moment when such a key is
        // detected (via beforeinput or keydown), and then tries to flush
        // them or, if that has no effect, dispatches the given key.
        delayAndroidKey(key, keyCode) {
          var _a2;
          if (!this.delayedAndroidKey) {
            let flush = () => {
              let key2 = this.delayedAndroidKey;
              if (key2) {
                this.clearDelayedAndroidKey();
                this.view.inputState.lastKeyCode = key2.keyCode;
                this.view.inputState.lastKeyTime = Date.now();
                let flushed = this.flush();
                if (!flushed && key2.force)
                  dispatchKey(this.dom, key2.key, key2.keyCode);
              }
            };
            this.flushingAndroidKey = this.view.win.requestAnimationFrame(flush);
          }
          if (!this.delayedAndroidKey || key == "Enter")
            this.delayedAndroidKey = {
              key,
              keyCode,
              // Only run the key handler when no changes are detected if
              // this isn't coming right after another change, in which case
              // it is probably part of a weird chain of updates, and should
              // be ignored if it returns the DOM to its previous state.
              force: this.lastChange < Date.now() - 50 || !!((_a2 = this.delayedAndroidKey) === null || _a2 === void 0 ? void 0 : _a2.force)
            };
        }
        clearDelayedAndroidKey() {
          this.win.cancelAnimationFrame(this.flushingAndroidKey);
          this.delayedAndroidKey = null;
          this.flushingAndroidKey = -1;
        }
        flushSoon() {
          if (this.delayedFlush < 0)
            this.delayedFlush = this.view.win.requestAnimationFrame(() => {
              this.delayedFlush = -1;
              this.flush();
            });
        }
        forceFlush() {
          if (this.delayedFlush >= 0) {
            this.view.win.cancelAnimationFrame(this.delayedFlush);
            this.delayedFlush = -1;
          }
          this.flush();
        }
        pendingRecords() {
          for (let mut of this.observer.takeRecords())
            this.queue.push(mut);
          return this.queue;
        }
        processRecords() {
          let records = this.pendingRecords();
          if (records.length)
            this.queue = [];
          let from = -1, to = -1, typeOver = false;
          for (let record of records) {
            let range = this.readMutation(record);
            if (!range)
              continue;
            if (range.typeOver)
              typeOver = true;
            if (from == -1) {
              ({ from, to } = range);
            } else {
              from = Math.min(range.from, from);
              to = Math.max(range.to, to);
            }
          }
          return { from, to, typeOver };
        }
        readChange() {
          let { from, to, typeOver } = this.processRecords();
          let newSel = this.selectionChanged && hasSelection(this.dom, this.selectionRange);
          if (from < 0 && !newSel)
            return null;
          if (from > -1)
            this.lastChange = Date.now();
          this.view.inputState.lastFocusTime = 0;
          this.selectionChanged = false;
          let change = new DOMChange(this.view, from, to, typeOver);
          this.view.docView.domChanged = { newSel: change.newSel ? change.newSel.main : null };
          return change;
        }
        // Apply pending changes, if any
        flush(readSelection = true) {
          if (this.delayedFlush >= 0 || this.delayedAndroidKey)
            return false;
          if (readSelection)
            this.readSelectionRange();
          let domChange = this.readChange();
          if (!domChange) {
            this.view.requestMeasure();
            return false;
          }
          let startState = this.view.state;
          let handled = applyDOMChange(this.view, domChange);
          if (this.view.state == startState && (domChange.domChanged || domChange.newSel && !sameSelPos(this.view.state.selection, domChange.newSel.main)))
            this.view.update([]);
          return handled;
        }
        readMutation(rec) {
          let tile = this.view.docView.tile.nearest(rec.target);
          if (!tile || tile.isWidget())
            return null;
          tile.markDirty(rec.type == "attributes");
          if (rec.type == "childList") {
            let childBefore = findChild(tile, rec.previousSibling || rec.target.previousSibling, -1);
            let childAfter = findChild(tile, rec.nextSibling || rec.target.nextSibling, 1);
            return {
              from: childBefore ? tile.posAfter(childBefore) : tile.posAtStart,
              to: childAfter ? tile.posBefore(childAfter) : tile.posAtEnd,
              typeOver: false
            };
          } else if (rec.type == "characterData") {
            return { from: tile.posAtStart, to: tile.posAtEnd, typeOver: rec.target.nodeValue == rec.oldValue };
          } else {
            return null;
          }
        }
        setWindow(win) {
          if (win != this.win) {
            this.removeWindowListeners(this.win);
            this.win = win;
            this.addWindowListeners(this.win);
          }
        }
        addWindowListeners(win) {
          win.addEventListener("resize", this.onResize);
          if (this.printQuery) {
            if (this.printQuery.addEventListener)
              this.printQuery.addEventListener("change", this.onPrint);
            else
              this.printQuery.addListener(this.onPrint);
          } else
            win.addEventListener("beforeprint", this.onPrint);
          win.addEventListener("scroll", this.onScroll);
          win.document.addEventListener("selectionchange", this.onSelectionChange);
        }
        removeWindowListeners(win) {
          win.removeEventListener("scroll", this.onScroll);
          win.removeEventListener("resize", this.onResize);
          if (this.printQuery) {
            if (this.printQuery.removeEventListener)
              this.printQuery.removeEventListener("change", this.onPrint);
            else
              this.printQuery.removeListener(this.onPrint);
          } else
            win.removeEventListener("beforeprint", this.onPrint);
          win.document.removeEventListener("selectionchange", this.onSelectionChange);
        }
        update(update) {
          if (this.editContext) {
            this.editContext.update(update);
            if (update.startState.facet(editable) != update.state.facet(editable))
              update.view.contentDOM.editContext = update.state.facet(editable) ? this.editContext.editContext : null;
          }
        }
        destroy() {
          var _a2, _b, _c;
          this.stop();
          (_a2 = this.intersection) === null || _a2 === void 0 ? void 0 : _a2.disconnect();
          (_b = this.gapIntersection) === null || _b === void 0 ? void 0 : _b.disconnect();
          (_c = this.resizeScroll) === null || _c === void 0 ? void 0 : _c.disconnect();
          for (let dom of this.scrollTargets)
            dom.removeEventListener("scroll", this.onScroll);
          this.removeWindowListeners(this.win);
          clearTimeout(this.parentCheck);
          clearTimeout(this.resizeTimeout);
          this.win.cancelAnimationFrame(this.delayedFlush);
          this.win.cancelAnimationFrame(this.flushingAndroidKey);
          if (this.editContext) {
            this.view.contentDOM.editContext = null;
            this.editContext.destroy();
          }
        }
      };
      EditContextManager = class {
        constructor(view) {
          this.from = 0;
          this.to = 0;
          this.pendingContextChange = null;
          this.handlers = /* @__PURE__ */ Object.create(null);
          this.composing = null;
          this.resetRange(view.state);
          let context = this.editContext = new window.EditContext({
            text: view.state.doc.sliceString(this.from, this.to),
            selectionStart: this.toContextPos(Math.max(this.from, Math.min(this.to, view.state.selection.main.anchor))),
            selectionEnd: this.toContextPos(view.state.selection.main.head)
          });
          this.handlers.textupdate = (e) => {
            let main = view.state.selection.main, { anchor, head } = main;
            let from = this.toEditorPos(e.updateRangeStart), to = this.toEditorPos(e.updateRangeEnd);
            if (view.inputState.composing >= 0 && !this.composing)
              this.composing = { contextBase: e.updateRangeStart, editorBase: from, drifted: false };
            let deletes = to - from > e.text.length;
            if (from == this.from && anchor < this.from)
              from = anchor;
            else if (to == this.to && anchor > this.to)
              to = anchor;
            let diff = findDiff(view.state.sliceDoc(from, to), e.text, (deletes ? main.from : main.to) - from, deletes ? "end" : null);
            if (!diff) {
              let newSel = EditorSelection.single(this.toEditorPos(e.selectionStart), this.toEditorPos(e.selectionEnd));
              if (!sameSelPos(newSel, main))
                view.dispatch({ selection: newSel, userEvent: "select" });
              return;
            }
            let change = {
              from: diff.from + from,
              to: diff.toA + from,
              insert: Text.of(e.text.slice(diff.from, diff.toB).split("\n"))
            };
            if ((browser.mac || browser.android) && change.from == head - 1 && /^\. ?$/.test(e.text) && view.contentDOM.getAttribute("autocorrect") == "off")
              change = { from, to, insert: Text.of([e.text.replace(".", " ")]) };
            this.pendingContextChange = change;
            if (!view.state.readOnly) {
              let newLen = this.to - this.from + (change.to - change.from + change.insert.length);
              applyDOMChangeInner(view, change, EditorSelection.single(this.toEditorPos(e.selectionStart, newLen), this.toEditorPos(e.selectionEnd, newLen)));
            }
            if (this.pendingContextChange) {
              this.revertPending(view.state);
              this.setSelection(view.state);
            }
            if (change.from < change.to && !change.insert.length && view.inputState.composing >= 0 && !/[\\p{Alphabetic}\\p{Number}_]/.test(context.text.slice(Math.max(0, e.updateRangeStart - 1), Math.min(context.text.length, e.updateRangeStart + 1))))
              this.handlers.compositionend(e);
          };
          this.handlers.characterboundsupdate = (e) => {
            let rects = [], prev = null;
            for (let i2 = this.toEditorPos(e.rangeStart), end = this.toEditorPos(e.rangeEnd); i2 < end; i2++) {
              let rect = view.coordsForChar(i2);
              prev = rect && new DOMRect(rect.left, rect.top, rect.right - rect.left, rect.bottom - rect.top) || prev || new DOMRect();
              rects.push(prev);
            }
            context.updateCharacterBounds(e.rangeStart, rects);
          };
          this.handlers.textformatupdate = (e) => {
            let deco = [];
            for (let format of e.getTextFormats()) {
              let lineStyle = format.underlineStyle, thickness = format.underlineThickness;
              if (!/none/i.test(lineStyle) && !/none/i.test(thickness)) {
                let from = this.toEditorPos(format.rangeStart), to = this.toEditorPos(format.rangeEnd);
                if (from < to) {
                  let style = `text-decoration: underline ${/^[a-z]/.test(lineStyle) ? lineStyle + " " : lineStyle == "Dashed" ? "dashed " : lineStyle == "Squiggle" ? "wavy " : ""}${/thin/i.test(thickness) ? 1 : 2}px`;
                  deco.push(Decoration.mark({ attributes: { style } }).range(from, to));
                }
              }
            }
            view.dispatch({ effects: setEditContextFormatting.of(Decoration.set(deco)) });
          };
          this.handlers.compositionstart = () => {
            if (view.inputState.composing < 0) {
              view.inputState.composing = 0;
              view.inputState.compositionFirstChange = true;
            }
          };
          this.handlers.compositionend = () => {
            view.inputState.composing = -1;
            view.inputState.compositionFirstChange = null;
            if (this.composing) {
              let { drifted } = this.composing;
              this.composing = null;
              if (drifted)
                this.reset(view.state);
            }
          };
          for (let event in this.handlers)
            context.addEventListener(event, this.handlers[event]);
          this.measureReq = { read: (view2) => {
            let sel = getSelection(view2.root);
            if (sel && sel.rangeCount)
              this.editContext.updateSelectionBounds(sel.getRangeAt(0).getBoundingClientRect());
          } };
        }
        applyEdits(update) {
          let off = 0, abort = false, pending = this.pendingContextChange;
          update.changes.iterChanges((fromA, toA, _fromB, _toB, insert2) => {
            if (abort)
              return;
            let dLen = insert2.length - (toA - fromA);
            if (pending && toA >= pending.to) {
              if (pending.from == fromA && pending.to == toA && pending.insert.eq(insert2)) {
                pending = this.pendingContextChange = null;
                off += dLen;
                this.to += dLen;
                return;
              } else {
                pending = null;
                this.revertPending(update.state);
              }
            }
            fromA += off;
            toA += off;
            if (toA <= this.from) {
              this.from += dLen;
              this.to += dLen;
            } else if (fromA < this.to) {
              if (fromA < this.from || toA > this.to || this.to - this.from + insert2.length > 3e4) {
                abort = true;
                return;
              }
              this.editContext.updateText(this.toContextPos(fromA), this.toContextPos(toA), insert2.toString());
              this.to += dLen;
            }
            off += dLen;
          });
          if (pending && !abort)
            this.revertPending(update.state);
          return !abort;
        }
        update(update) {
          let reverted = this.pendingContextChange, startSel = update.startState.selection.main;
          if (this.composing && (this.composing.drifted || !update.changes.touchesRange(startSel.from, startSel.to) && update.transactions.some((tr) => !tr.isUserEvent("input.type") && tr.changes.touchesRange(this.from, this.to)))) {
            this.composing.drifted = true;
            this.composing.editorBase = update.changes.mapPos(this.composing.editorBase);
          } else if (!this.applyEdits(update) || !this.rangeIsValid(update.state)) {
            this.pendingContextChange = null;
            this.reset(update.state);
          } else if (update.docChanged || update.selectionSet || reverted) {
            this.setSelection(update.state);
          }
          if (update.geometryChanged || update.docChanged || update.selectionSet)
            update.view.requestMeasure(this.measureReq);
        }
        resetRange(state) {
          let { head } = state.selection.main;
          this.from = Math.max(
            0,
            head - 1e4
            /* CxVp.Margin */
          );
          this.to = Math.min(
            state.doc.length,
            head + 1e4
            /* CxVp.Margin */
          );
        }
        reset(state) {
          this.resetRange(state);
          this.editContext.updateText(0, this.editContext.text.length, state.doc.sliceString(this.from, this.to));
          this.setSelection(state);
        }
        revertPending(state) {
          let pending = this.pendingContextChange;
          this.pendingContextChange = null;
          this.editContext.updateText(this.toContextPos(pending.from), this.toContextPos(pending.from + pending.insert.length), state.doc.sliceString(pending.from, pending.to));
        }
        setSelection(state) {
          let { main } = state.selection;
          let start = this.toContextPos(Math.max(this.from, Math.min(this.to, main.anchor)));
          let end = this.toContextPos(main.head);
          if (this.editContext.selectionStart != start || this.editContext.selectionEnd != end)
            this.editContext.updateSelection(start, end);
        }
        rangeIsValid(state) {
          let { head } = state.selection.main;
          return !(this.from > 0 && head - this.from < 500 || this.to < state.doc.length && this.to - head < 500 || this.to - this.from > 1e4 * 3);
        }
        toEditorPos(contextPos, clipLen = this.to - this.from) {
          contextPos = Math.min(contextPos, clipLen);
          let c = this.composing;
          return c && c.drifted ? c.editorBase + (contextPos - c.contextBase) : contextPos + this.from;
        }
        toContextPos(editorPos) {
          let c = this.composing;
          return c && c.drifted ? c.contextBase + (editorPos - c.editorBase) : editorPos - this.from;
        }
        destroy() {
          for (let event in this.handlers)
            this.editContext.removeEventListener(event, this.handlers[event]);
        }
      };
      EditorView = class _EditorView {
        /**
        The current editor state.
        */
        get state() {
          return this.viewState.state;
        }
        /**
        To be able to display large documents without consuming too much
        memory or overloading the browser, CodeMirror only draws the
        code that is visible (plus a margin around it) to the DOM. This
        property tells you the extent of the current drawn viewport, in
        document positions.
        */
        get viewport() {
          return this.viewState.viewport;
        }
        /**
        When there are, for example, large collapsed ranges in the
        viewport, its size can be a lot bigger than the actual visible
        content. Thus, if you are doing something like styling the
        content in the viewport, it is preferable to only do so for
        these ranges, which are the subset of the viewport that is
        actually drawn.
        */
        get visibleRanges() {
          return this.viewState.visibleRanges;
        }
        /**
        Returns false when the editor is entirely scrolled out of view
        or otherwise hidden.
        */
        get inView() {
          return this.viewState.inView;
        }
        /**
        Indicates whether the user is currently composing text via
        [IME](https://en.wikipedia.org/wiki/Input_method), and at least
        one change has been made in the current composition.
        */
        get composing() {
          return !!this.inputState && this.inputState.composing > 0;
        }
        /**
        Indicates whether the user is currently in composing state. Note
        that on some platforms, like Android, this will be the case a
        lot, since just putting the cursor on a word starts a
        composition there.
        */
        get compositionStarted() {
          return !!this.inputState && this.inputState.composing >= 0;
        }
        /**
        The document or shadow root that the view lives in.
        */
        get root() {
          return this._root;
        }
        /**
        @internal
        */
        get win() {
          return this.dom.ownerDocument.defaultView || window;
        }
        /**
        Construct a new view. You'll want to either provide a `parent`
        option, or put `view.dom` into your document after creating a
        view, so that the user can see the editor.
        */
        constructor(config = {}) {
          var _a2;
          this.plugins = [];
          this.pluginMap = /* @__PURE__ */ new Map();
          this.editorAttrs = {};
          this.contentAttrs = {};
          this.bidiCache = [];
          this.destroyed = false;
          this.updateState = 2;
          this.measureScheduled = -1;
          this.measureRequests = [];
          this.clearAnnouncement = -1;
          this.contentDOM = document.createElement("div");
          this.scrollDOM = document.createElement("div");
          this.scrollDOM.tabIndex = -1;
          this.scrollDOM.className = "cm-scroller";
          this.scrollDOM.appendChild(this.contentDOM);
          this.announceDOM = document.createElement("div");
          this.announceDOM.className = "cm-announced";
          this.announceDOM.setAttribute("aria-live", "polite");
          this.dom = document.createElement("div");
          this.dom.appendChild(this.announceDOM);
          this.dom.appendChild(this.scrollDOM);
          if (config.parent)
            config.parent.appendChild(this.dom);
          let { dispatch } = config;
          this.dispatchTransactions = config.dispatchTransactions || dispatch && ((trs) => trs.forEach((tr) => dispatch(tr, this))) || ((trs) => this.update(trs));
          this.dispatch = this.dispatch.bind(this);
          this._root = config.root || getRoot(config.parent) || document;
          this.viewState = new ViewState(this, config.state || EditorState.create(config));
          if (config.scrollTo && config.scrollTo.is(scrollIntoView))
            this.viewState.scrollTarget = config.scrollTo.value.clip(this.viewState.state);
          this.plugins = this.state.facet(viewPlugin).map((spec) => new PluginInstance(spec));
          for (let plugin of this.plugins)
            plugin.update(this);
          this.observer = new DOMObserver(this);
          this.inputState = new InputState(this);
          this.inputState.ensureHandlers(this.plugins);
          this.docView = new DocView(this);
          this.mountStyles();
          this.updateAttrs();
          this.updateState = 0;
          this.requestMeasure();
          if ((_a2 = document.fonts) === null || _a2 === void 0 ? void 0 : _a2.ready)
            document.fonts.ready.then(() => {
              this.viewState.mustMeasureContent = "refresh";
              this.requestMeasure();
            });
        }
        dispatch(...input) {
          let trs = input.length == 1 && input[0] instanceof Transaction ? input : input.length == 1 && Array.isArray(input[0]) ? input[0] : [this.state.update(...input)];
          this.dispatchTransactions(trs, this);
        }
        /**
        Update the view for the given array of transactions. This will
        update the visible document and selection to match the state
        produced by the transactions, and notify view plugins of the
        change. You should usually call
        [`dispatch`](https://codemirror.net/6/docs/ref/#view.EditorView.dispatch) instead, which uses this
        as a primitive.
        */
        update(transactions) {
          if (this.updateState != 0)
            throw new Error("Calls to EditorView.update are not allowed while an update is in progress");
          let redrawn = false, attrsChanged = false, update;
          let state = this.state;
          for (let tr of transactions) {
            if (tr.startState != state)
              throw new RangeError("Trying to update state with a transaction that doesn't start from the previous state.");
            state = tr.state;
          }
          if (this.destroyed) {
            this.viewState.state = state;
            return;
          }
          let focus = this.hasFocus, focusFlag = 0, dispatchFocus = null;
          if (transactions.some((tr) => tr.annotation(isFocusChange))) {
            this.inputState.notifiedFocused = focus;
            focusFlag = 1;
          } else if (focus != this.inputState.notifiedFocused) {
            this.inputState.notifiedFocused = focus;
            dispatchFocus = focusChangeTransaction(state, focus);
            if (!dispatchFocus)
              focusFlag = 1;
          }
          let pendingKey = this.observer.delayedAndroidKey, domChange = null;
          if (pendingKey) {
            this.observer.clearDelayedAndroidKey();
            domChange = this.observer.readChange();
            if (domChange && !this.state.doc.eq(state.doc) || !this.state.selection.eq(state.selection))
              domChange = null;
          } else {
            this.observer.clear();
          }
          if (state.facet(EditorState.phrases) != this.state.facet(EditorState.phrases))
            return this.setState(state);
          update = ViewUpdate.create(this, state, transactions);
          update.flags |= focusFlag;
          let scrollTarget = this.viewState.scrollTarget;
          try {
            this.updateState = 2;
            for (let tr of transactions) {
              if (scrollTarget)
                scrollTarget = scrollTarget.map(tr.changes);
              if (tr.scrollIntoView) {
                let { main } = tr.state.selection;
                let { x, y } = this.state.facet(_EditorView.cursorScrollMargin);
                scrollTarget = new ScrollTarget(main.empty ? main : EditorSelection.cursor(main.head, main.head > main.anchor ? -1 : 1), "nearest", "nearest", y, x);
              }
              for (let e of tr.effects)
                if (e.is(scrollIntoView))
                  scrollTarget = e.value.clip(this.state);
            }
            this.viewState.update(update, scrollTarget);
            this.bidiCache = CachedOrder.update(this.bidiCache, update.changes);
            if (!update.empty) {
              this.updatePlugins(update);
              this.inputState.update(update);
            }
            redrawn = this.docView.update(update);
            if (this.state.facet(styleModule) != this.styleModules)
              this.mountStyles();
            attrsChanged = this.updateAttrs();
            this.showAnnouncements(transactions);
            this.docView.updateSelection(redrawn, transactions.some((tr) => tr.isUserEvent("select.pointer")));
          } finally {
            this.updateState = 0;
          }
          if (update.startState.facet(theme) != update.state.facet(theme))
            this.viewState.mustMeasureContent = true;
          if (redrawn || attrsChanged || scrollTarget || this.viewState.mustEnforceCursorAssoc || this.viewState.mustMeasureContent)
            this.requestMeasure();
          if (redrawn)
            this.docViewUpdate();
          if (!update.empty)
            for (let listener of this.state.facet(updateListener)) {
              try {
                listener(update);
              } catch (e) {
                logException(this.state, e, "update listener");
              }
            }
          if (dispatchFocus || domChange)
            Promise.resolve().then(() => {
              if (dispatchFocus && this.state == dispatchFocus.startState)
                this.dispatch(dispatchFocus);
              if (domChange) {
                if (!applyDOMChange(this, domChange) && pendingKey.force)
                  dispatchKey(this.contentDOM, pendingKey.key, pendingKey.keyCode);
              }
            });
        }
        /**
        Reset the view to the given state. (This will cause the entire
        document to be redrawn and all view plugins to be reinitialized,
        so you should probably only use it when the new state isn't
        derived from the old state. Otherwise, use
        [`dispatch`](https://codemirror.net/6/docs/ref/#view.EditorView.dispatch) instead.)
        */
        setState(newState) {
          if (this.updateState != 0)
            throw new Error("Calls to EditorView.setState are not allowed while an update is in progress");
          if (this.destroyed) {
            this.viewState.state = newState;
            return;
          }
          this.updateState = 2;
          let hadFocus = this.hasFocus;
          try {
            for (let plugin of this.plugins)
              plugin.destroy(this);
            this.viewState = new ViewState(this, newState);
            this.plugins = newState.facet(viewPlugin).map((spec) => new PluginInstance(spec));
            this.pluginMap.clear();
            for (let plugin of this.plugins)
              plugin.update(this);
            this.docView.destroy();
            this.docView = new DocView(this);
            this.inputState.ensureHandlers(this.plugins);
            this.mountStyles();
            this.updateAttrs();
            this.bidiCache = [];
          } finally {
            this.updateState = 0;
          }
          if (hadFocus)
            this.focus();
          this.requestMeasure();
        }
        updatePlugins(update) {
          let prevSpecs = update.startState.facet(viewPlugin), specs = update.state.facet(viewPlugin);
          if (prevSpecs != specs) {
            let newPlugins = [];
            for (let spec of specs) {
              let found = prevSpecs.indexOf(spec);
              if (found < 0) {
                newPlugins.push(new PluginInstance(spec));
              } else {
                let plugin = this.plugins[found];
                plugin.mustUpdate = update;
                newPlugins.push(plugin);
              }
            }
            for (let plugin of this.plugins)
              if (plugin.mustUpdate != update)
                plugin.destroy(this);
            this.plugins = newPlugins;
            this.pluginMap.clear();
          } else {
            for (let p of this.plugins)
              p.mustUpdate = update;
          }
          for (let i2 = 0; i2 < this.plugins.length; i2++)
            this.plugins[i2].update(this);
          if (prevSpecs != specs)
            this.inputState.ensureHandlers(this.plugins);
        }
        docViewUpdate() {
          for (let plugin of this.plugins) {
            let val = plugin.value;
            if (val && val.docViewUpdate) {
              try {
                val.docViewUpdate(this);
              } catch (e) {
                logException(this.state, e, "doc view update listener");
              }
            }
          }
        }
        /**
        @internal
        */
        measure(flush = true) {
          if (this.destroyed)
            return;
          if (this.measureScheduled > -1)
            this.win.cancelAnimationFrame(this.measureScheduled);
          if (this.observer.delayedAndroidKey) {
            this.measureScheduled = -1;
            this.requestMeasure();
            return;
          }
          this.measureScheduled = 0;
          if (flush)
            this.observer.forceFlush();
          let updated = null;
          let scroll = this.viewState.scrollParent, scrollOffset = this.viewState.getScrollOffset();
          let { scrollAnchorPos, scrollAnchorHeight, scaleY: scrollScale } = this.viewState;
          if (Math.abs(scrollOffset - this.viewState.scrollOffset) > 1)
            scrollAnchorHeight = -1;
          this.viewState.scrollAnchorHeight = -1;
          try {
            for (let i2 = 0; ; i2++) {
              if (scrollAnchorHeight < 0) {
                if (isScrolledToBottom(scroll || this.win)) {
                  scrollAnchorPos = -1;
                  scrollAnchorHeight = this.viewState.heightMap.height / this.viewState.scaleY;
                } else {
                  let block = this.viewState.scrollAnchorAt(scrollOffset);
                  scrollAnchorPos = block.from;
                  scrollAnchorHeight = block.top;
                }
                scrollScale = this.viewState.scaleY;
              }
              this.updateState = 1;
              let changed = this.viewState.measure();
              if (!changed && !this.measureRequests.length && this.viewState.scrollTarget == null)
                break;
              if (i2 > 5) {
                console.warn(this.measureRequests.length ? "Measure loop restarted more than 5 times" : "Viewport failed to stabilize");
                break;
              }
              let measuring = [];
              if (!(changed & 4))
                [this.measureRequests, measuring] = [measuring, this.measureRequests];
              let measured = measuring.map((m) => {
                try {
                  return m.read(this);
                } catch (e) {
                  logException(this.state, e);
                  return BadMeasure;
                }
              });
              let update = ViewUpdate.create(this, this.state, []), redrawn = false;
              update.flags |= changed;
              if (!updated)
                updated = update;
              else
                updated.flags |= changed;
              this.updateState = 2;
              if (!update.empty) {
                this.updatePlugins(update);
                this.inputState.update(update);
                this.updateAttrs();
                redrawn = this.docView.update(update);
                if (redrawn)
                  this.docViewUpdate();
              }
              for (let i3 = 0; i3 < measuring.length; i3++)
                if (measured[i3] != BadMeasure) {
                  try {
                    let m = measuring[i3];
                    if (m.write)
                      m.write(measured[i3], this);
                  } catch (e) {
                    logException(this.state, e);
                  }
                }
              if (redrawn)
                this.docView.updateSelection(true);
              if (!update.viewportChanged && this.measureRequests.length == 0) {
                if (this.viewState.editorHeight) {
                  if (this.viewState.scrollTarget) {
                    this.docView.scrollIntoView(this.viewState.scrollTarget);
                    this.viewState.scrollTarget = null;
                    scrollAnchorHeight = -1;
                    continue;
                  } else {
                    let newAnchorHeight = scrollAnchorPos < 0 ? this.viewState.heightMap.height : this.viewState.lineBlockAt(scrollAnchorPos).top;
                    let diff = newAnchorHeight / this.viewState.scaleY - scrollAnchorHeight / scrollScale;
                    if ((diff > 1 || diff < -1) && !(browser.ios && this.inputState.lastIOSMomentumScroll > Date.now() - 100) && (scroll == this.scrollDOM || this.hasFocus || Math.max(this.inputState.lastWheelEvent, this.inputState.lastTouchTime) > Date.now() - 100)) {
                      scrollOffset = scrollOffset + diff;
                      if (!scroll)
                        this.win.scrollBy(0, diff);
                      else if (scrollAnchorPos < 0)
                        scroll.scrollTop = scroll.scrollHeight;
                      else
                        scroll.scrollTop += diff;
                      scrollAnchorHeight = -1;
                      continue;
                    }
                  }
                }
                break;
              }
            }
          } finally {
            this.updateState = 0;
            this.measureScheduled = -1;
          }
          if (updated && !updated.empty)
            for (let listener of this.state.facet(updateListener))
              listener(updated);
        }
        /**
        Get the CSS classes for the currently active editor themes.
        */
        get themeClasses() {
          return baseThemeID + " " + (this.state.facet(darkTheme) ? baseDarkID : baseLightID) + " " + this.state.facet(theme);
        }
        updateAttrs() {
          let editorAttrs = attrsFromFacet(this, editorAttributes, {
            class: "cm-editor" + (this.hasFocus ? " cm-focused " : " ") + this.themeClasses
          });
          let contentAttrs = {
            spellcheck: "false",
            autocorrect: "off",
            autocapitalize: "off",
            writingsuggestions: "false",
            translate: "no",
            contenteditable: !this.state.facet(editable) ? "false" : "true",
            class: "cm-content",
            style: `${browser.tabSize}: ${this.state.tabSize}`,
            role: "textbox",
            "aria-multiline": "true"
          };
          if (this.state.readOnly)
            contentAttrs["aria-readonly"] = "true";
          attrsFromFacet(this, contentAttributes, contentAttrs);
          let changed = this.observer.ignore(() => {
            let changedContent = updateAttrs(this.contentDOM, this.contentAttrs, contentAttrs);
            let changedEditor = updateAttrs(this.dom, this.editorAttrs, editorAttrs);
            return changedContent || changedEditor;
          });
          this.editorAttrs = editorAttrs;
          this.contentAttrs = contentAttrs;
          return changed;
        }
        showAnnouncements(trs) {
          let first = true;
          for (let tr of trs)
            for (let effect of tr.effects)
              if (effect.is(_EditorView.announce)) {
                if (first) {
                  this.announceDOM.textContent = "";
                  this.win.clearTimeout(this.clearAnnouncement);
                  this.clearAnnouncement = this.win.setTimeout(() => {
                    this.announceDOM.textContent = "\xA0";
                  }, 200);
                  first = false;
                }
                let div = this.announceDOM.appendChild(document.createElement("div"));
                div.textContent = effect.value;
              }
        }
        mountStyles() {
          this.styleModules = this.state.facet(styleModule);
          let nonce = this.state.facet(_EditorView.cspNonce);
          StyleModule.mount(this.root, this.styleModules.concat(baseTheme$1).reverse(), nonce ? { nonce } : void 0);
        }
        readMeasured() {
          if (this.updateState == 2)
            throw new Error("Reading the editor layout isn't allowed during an update");
          if (this.updateState == 0 && this.measureScheduled > -1)
            this.measure(false);
        }
        /**
        Schedule a layout measurement, optionally providing callbacks to
        do custom DOM measuring followed by a DOM write phase. Using
        this is preferable reading DOM layout directly from, for
        example, an event handler, because it'll make sure measuring and
        drawing done by other components is synchronized, avoiding
        unnecessary DOM layout computations.
        */
        requestMeasure(request) {
          if (this.measureScheduled < 0)
            this.measureScheduled = this.win.requestAnimationFrame(() => this.measure());
          if (request) {
            if (this.measureRequests.indexOf(request) > -1)
              return;
            if (request.key != null)
              for (let i2 = 0; i2 < this.measureRequests.length; i2++) {
                if (this.measureRequests[i2].key === request.key) {
                  this.measureRequests[i2] = request;
                  return;
                }
              }
            this.measureRequests.push(request);
          }
        }
        /**
        Get the value of a specific plugin, if present. Note that
        plugins that crash can be dropped from a view, so even when you
        know you registered a given plugin, it is recommended to check
        the return value of this method.
        */
        plugin(plugin) {
          let known = this.pluginMap.get(plugin);
          if (known === void 0 || known && known.plugin != plugin)
            this.pluginMap.set(plugin, known = this.plugins.find((p) => p.plugin == plugin) || null);
          return known && known.update(this).value;
        }
        /**
        The top position of the document, in screen coordinates. This
        may be negative when the editor is scrolled down. Points
        directly to the top of the first line, not above the padding.
        */
        get documentTop() {
          return this.contentDOM.getBoundingClientRect().top + this.viewState.paddingTop;
        }
        /**
        Reports the padding above and below the document.
        */
        get documentPadding() {
          return { top: this.viewState.paddingTop, bottom: this.viewState.paddingBottom };
        }
        /**
        If the editor is transformed with CSS, this provides the scale
        along the X axis. Otherwise, it will just be 1. Note that
        transforms other than translation and scaling are not supported.
        */
        get scaleX() {
          return this.viewState.scaleX;
        }
        /**
        Provide the CSS transformed scale along the Y axis.
        */
        get scaleY() {
          return this.viewState.scaleY;
        }
        /**
        Find the text line or block widget at the given vertical
        position (which is interpreted as relative to the [top of the
        document](https://codemirror.net/6/docs/ref/#view.EditorView.documentTop)).
        */
        elementAtHeight(height) {
          this.readMeasured();
          return this.viewState.elementAtHeight(height);
        }
        /**
        Find the line block (see
        [`lineBlockAt`](https://codemirror.net/6/docs/ref/#view.EditorView.lineBlockAt)) at the given
        height, again interpreted relative to the [top of the
        document](https://codemirror.net/6/docs/ref/#view.EditorView.documentTop).
        */
        lineBlockAtHeight(height) {
          this.readMeasured();
          return this.viewState.lineBlockAtHeight(height);
        }
        /**
        Get the extent and vertical position of all [line
        blocks](https://codemirror.net/6/docs/ref/#view.EditorView.lineBlockAt) in the viewport. Positions
        are relative to the [top of the
        document](https://codemirror.net/6/docs/ref/#view.EditorView.documentTop);
        */
        get viewportLineBlocks() {
          return this.viewState.viewportLines;
        }
        /**
        Find the line block around the given document position. A line
        block is a range delimited on both sides by either a
        non-[hidden](https://codemirror.net/6/docs/ref/#view.Decoration^replace) line break, or the
        start/end of the document. It will usually just hold a line of
        text, but may be broken into multiple textblocks by block
        widgets.
        */
        lineBlockAt(pos) {
          return this.viewState.lineBlockAt(pos);
        }
        /**
        The editor's total content height.
        */
        get contentHeight() {
          return this.viewState.contentHeight;
        }
        /**
        Move a cursor position by [grapheme
        cluster](https://codemirror.net/6/docs/ref/#state.findClusterBreak). `forward` determines whether
        the motion is away from the line start, or towards it. In
        bidirectional text, the line is traversed in visual order, using
        the editor's [text direction](https://codemirror.net/6/docs/ref/#view.EditorView.textDirection).
        When the start position was the last one on the line, the
        returned position will be across the line break. If there is no
        further line, the original position is returned.
        
        By default, this method moves over a single cluster. The
        optional `by` argument can be used to move across more. It will
        be called with the first cluster as argument, and should return
        a predicate that determines, for each subsequent cluster,
        whether it should also be moved over.
        */
        moveByChar(start, forward, by) {
          return skipAtoms(this, start, moveByChar(this, start, forward, by));
        }
        /**
        Move a cursor position across the next group of either
        [letters](https://codemirror.net/6/docs/ref/#state.EditorState.charCategorizer) or non-letter
        non-whitespace characters.
        */
        moveByGroup(start, forward) {
          return skipAtoms(this, start, moveByChar(this, start, forward, (initial) => byGroup(this, start.head, initial)));
        }
        /**
        **\[DEPRECATED]** Get the cursor position visually at the start
        or end of a line.
        */
        visualLineSide(line, end) {
          return end ? EditorSelection.cursor(line.to, 1) : EditorSelection.cursor(line.from, -1);
        }
        /**
        Move to the next line boundary in the given direction. If
        `includeWrap` is true, line wrapping is on, and there is a
        further wrap point on the current line, the wrap point will be
        returned. Otherwise this function will return the start or end
        of the line.
        */
        moveToLineBoundary(start, forward, includeWrap = true) {
          return moveToLineBoundary(this, start, forward, includeWrap);
        }
        /**
        Move a cursor position vertically. When `distance` isn't given,
        it defaults to moving to the next line (including wrapped
        lines). Otherwise, `distance` should provide a positive distance
        in pixels.
        
        When `start` has a
        [`goalColumn`](https://codemirror.net/6/docs/ref/#state.SelectionRange.goalColumn), the vertical
        motion will use that as a target horizontal position. Otherwise,
        the cursor's own horizontal position is used. The returned
        cursor will have its goal column set to whichever column was
        used.
        */
        moveVertically(start, forward, distance) {
          return skipAtoms(this, start, moveVertically(this, start, forward, distance));
        }
        /**
        Find the DOM parent node and offset (child offset if `node` is
        an element, character offset when it is a text node) at the
        given document position.
        
        Note that for positions that aren't currently in
        `visibleRanges`, the resulting DOM position isn't necessarily
        meaningful (it may just point before or after a placeholder
        element).
        */
        domAtPos(pos, side = 1) {
          return this.docView.domAtPos(pos, side);
        }
        /**
        Find the document position at the given DOM node. Can be useful
        for associating positions with DOM events. Will raise an error
        when `node` isn't part of the editor content.
        */
        posAtDOM(node, offset = 0) {
          return this.docView.posFromDOM(node, offset);
        }
        posAtCoords(coords, precise = true) {
          this.readMeasured();
          let found = posAtCoords(this, coords, precise);
          return found && found.pos;
        }
        posAndSideAtCoords(coords, precise = true) {
          this.readMeasured();
          return posAtCoords(this, coords, precise);
        }
        /**
        Get the screen coordinates at the given document position.
        `side` determines whether the coordinates are based on the
        element before (-1) or after (1) the position (if no element is
        available on the given side, the method will transparently use
        another strategy to get reasonable coordinates).
        */
        coordsAtPos(pos, side = 1) {
          this.readMeasured();
          let line = this.state.doc.lineAt(pos), order = this.bidiSpans(line);
          let span = order[BidiSpan.find(order, pos - line.from, -1, side)];
          if (line.length && (pos == line.from && side < 0 || pos == line.to && side > 0) && span.dir != this.textDirectionAt(line.from)) {
            if (pos == line.to) {
              pos = line.from + span.from;
              side = 1;
            } else {
              pos = line.from + span.to;
              side = -1;
            }
          }
          return this.docView.coordsAt(pos, side, span.dir == Direction.RTL);
        }
        /**
        Return the rectangle around a given character. If `pos` does not
        point in front of a character that is in the viewport and
        rendered (i.e. not replaced, not a line break), this will return
        null. For space characters that are a line wrap point, this will
        return the position before the line break.
        */
        coordsForChar(pos) {
          this.readMeasured();
          return this.docView.coordsForChar(pos);
        }
        /**
        The default width of a character in the editor. May not
        accurately reflect the width of all characters (given variable
        width fonts or styling of invididual ranges).
        */
        get defaultCharacterWidth() {
          return this.viewState.heightOracle.charWidth;
        }
        /**
        The default height of a line in the editor. May not be accurate
        for all lines.
        */
        get defaultLineHeight() {
          return this.viewState.heightOracle.lineHeight;
        }
        /**
        The text direction
        ([`direction`](https://developer.mozilla.org/en-US/docs/Web/CSS/direction)
        CSS property) of the editor's content element.
        */
        get textDirection() {
          return this.viewState.defaultTextDirection;
        }
        /**
        Find the text direction of the block at the given position, as
        assigned by CSS. If
        [`perLineTextDirection`](https://codemirror.net/6/docs/ref/#view.EditorView^perLineTextDirection)
        isn't enabled, or the given position is outside of the viewport,
        this will always return the same as
        [`textDirection`](https://codemirror.net/6/docs/ref/#view.EditorView.textDirection). Note that
        this may trigger a DOM layout.
        */
        textDirectionAt(pos) {
          let perLine = this.state.facet(perLineTextDirection);
          if (!perLine || pos < this.viewport.from || pos > this.viewport.to)
            return this.textDirection;
          this.readMeasured();
          return this.docView.textDirectionAt(pos);
        }
        /**
        Whether this editor [wraps lines](https://codemirror.net/6/docs/ref/#view.EditorView.lineWrapping)
        (as determined by the
        [`white-space`](https://developer.mozilla.org/en-US/docs/Web/CSS/white-space)
        CSS property of its content element).
        */
        get lineWrapping() {
          return this.viewState.heightOracle.lineWrapping;
        }
        /**
        Returns the bidirectional text structure of the given line
        (which should be in the current document) as an array of span
        objects. The order of these spans matches the [text
        direction](https://codemirror.net/6/docs/ref/#view.EditorView.textDirection)—if that is
        left-to-right, the leftmost spans come first, otherwise the
        rightmost spans come first.
        */
        bidiSpans(line) {
          if (line.length > MaxBidiLine)
            return trivialOrder(line.length);
          let dir = this.textDirectionAt(line.from), isolates;
          for (let entry of this.bidiCache) {
            if (entry.from == line.from && entry.dir == dir && (entry.fresh || isolatesEq(entry.isolates, isolates = getIsolatedRanges(this, line))))
              return entry.order;
          }
          if (!isolates)
            isolates = getIsolatedRanges(this, line);
          let order = computeOrder(line.text, dir, isolates);
          this.bidiCache.push(new CachedOrder(line.from, line.to, dir, isolates, true, order));
          return order;
        }
        /**
        Check whether the editor has focus.
        */
        get hasFocus() {
          var _a2;
          return (this.dom.ownerDocument.hasFocus() || browser.safari && ((_a2 = this.inputState) === null || _a2 === void 0 ? void 0 : _a2.lastContextMenu) > Date.now() - 3e4) && this.root.activeElement == this.contentDOM;
        }
        /**
        Put focus on the editor.
        */
        focus() {
          this.observer.ignore(() => {
            focusPreventScroll(this.contentDOM);
            this.docView.updateSelection();
          });
        }
        /**
        Update the [root](https://codemirror.net/6/docs/ref/##view.EditorViewConfig.root) in which the editor lives. This is only
        necessary when moving the editor's existing DOM to a new window or shadow root.
        */
        setRoot(root) {
          if (this._root != root) {
            this._root = root;
            this.observer.setWindow((root.nodeType == 9 ? root : root.ownerDocument).defaultView || window);
            this.mountStyles();
          }
        }
        /**
        Clean up this editor view, removing its element from the
        document, unregistering event handlers, and notifying
        plugins. The view instance can no longer be used after
        calling this.
        */
        destroy() {
          if (this.root.activeElement == this.contentDOM)
            this.contentDOM.blur();
          for (let plugin of this.plugins)
            plugin.destroy(this);
          this.plugins = [];
          this.inputState.destroy();
          this.docView.destroy();
          this.dom.remove();
          this.observer.destroy();
          this.win.clearTimeout(this.clearAnnouncement);
          if (this.measureScheduled > -1)
            this.win.cancelAnimationFrame(this.measureScheduled);
          this.destroyed = true;
        }
        /**
        Returns an effect that can be
        [added](https://codemirror.net/6/docs/ref/#state.TransactionSpec.effects) to a transaction to
        cause it to scroll the given position or range into view.
        */
        static scrollIntoView(pos, options = {}) {
          var _a2, _b, _c, _d;
          return scrollIntoView.of(new ScrollTarget(typeof pos == "number" ? EditorSelection.cursor(pos) : pos, (_a2 = options.y) !== null && _a2 !== void 0 ? _a2 : "nearest", (_b = options.x) !== null && _b !== void 0 ? _b : "nearest", (_c = options.yMargin) !== null && _c !== void 0 ? _c : 5, (_d = options.xMargin) !== null && _d !== void 0 ? _d : 5));
        }
        /**
        Return an effect that resets the editor to its current (at the
        time this method was called) scroll position. Note that this
        only affects the editor's own scrollable element, not parents.
        See also
        [`EditorViewConfig.scrollTo`](https://codemirror.net/6/docs/ref/#view.EditorViewConfig.scrollTo).
        
        The effect should be used with a document identical to the one
        it was created for. Failing to do so is not an error, but may
        not scroll to the expected position. You can
        [map](https://codemirror.net/6/docs/ref/#state.StateEffect.map) the effect to account for changes.
        */
        scrollSnapshot() {
          let { scrollTop, scrollLeft } = this.scrollDOM;
          let ref = this.viewState.scrollAnchorAt(scrollTop);
          return scrollIntoView.of(new ScrollTarget(EditorSelection.cursor(ref.from), "start", "start", ref.top - scrollTop, scrollLeft, true));
        }
        /**
        Enable or disable tab-focus mode, which disables key bindings
        for Tab and Shift-Tab, letting the browser's default
        focus-changing behavior go through instead. This is useful to
        prevent trapping keyboard users in your editor.
        
        Without argument, this toggles the mode. With a boolean, it
        enables (true) or disables it (false). Given a number, it
        temporarily enables the mode until that number of milliseconds
        have passed or another non-Tab key is pressed.
        */
        setTabFocusMode(to) {
          if (to == null)
            this.inputState.tabFocusMode = this.inputState.tabFocusMode < 0 ? 0 : -1;
          else if (typeof to == "boolean")
            this.inputState.tabFocusMode = to ? 0 : -1;
          else if (this.inputState.tabFocusMode != 0)
            this.inputState.tabFocusMode = Date.now() + to;
        }
        /**
        Returns an extension that can be used to add DOM event handlers.
        The value should be an object mapping event names to handler
        functions. For any given event, such functions are ordered by
        extension precedence, and the first handler to return true will
        be assumed to have handled that event, and no other handlers or
        built-in behavior will be activated for it. These are registered
        on the [content element](https://codemirror.net/6/docs/ref/#view.EditorView.contentDOM), except
        for `scroll` handlers, which will be called any time the
        editor's [scroll element](https://codemirror.net/6/docs/ref/#view.EditorView.scrollDOM) or one of
        its parent nodes is scrolled.
        */
        static domEventHandlers(handlers2) {
          return ViewPlugin.define(() => ({}), { eventHandlers: handlers2 });
        }
        /**
        Create an extension that registers DOM event observers. Contrary
        to event [handlers](https://codemirror.net/6/docs/ref/#view.EditorView^domEventHandlers),
        observers can't be prevented from running by a higher-precedence
        handler returning true. They also don't prevent other handlers
        and observers from running when they return true, and should not
        call `preventDefault`.
        */
        static domEventObservers(observers2) {
          return ViewPlugin.define(() => ({}), { eventObservers: observers2 });
        }
        /**
        Create a theme extension. The first argument can be a
        [`style-mod`](https://code.haverbeke.berlin/marijn/style-mod#documentation)
        style spec providing the styles for the theme. These will be
        prefixed with a generated class for the style.
        
        Because the selectors will be prefixed with a scope class, rule
        that directly match the editor's [wrapper
        element](https://codemirror.net/6/docs/ref/#view.EditorView.dom)—to which the scope class will be
        added—need to be explicitly differentiated by adding an `&` to
        the selector for that element—for example
        `&.cm-focused`.
        
        When `dark` is set to true, the theme will be marked as dark,
        which will cause the `&dark` rules from [base
        themes](https://codemirror.net/6/docs/ref/#view.EditorView^baseTheme) to be used (as opposed to
        `&light` when a light theme is active).
        */
        static theme(spec, options) {
          let prefix = StyleModule.newName();
          let result = [theme.of(prefix), styleModule.of(buildTheme(`.${prefix}`, spec))];
          if (options && options.dark)
            result.push(darkTheme.of(true));
          return result;
        }
        /**
        Create an extension that adds styles to the base theme. Like
        with [`theme`](https://codemirror.net/6/docs/ref/#view.EditorView^theme), use `&` to indicate the
        place of the editor wrapper element when directly targeting
        that. You can also use `&dark` or `&light` instead to only
        target editors with a dark or light theme.
        */
        static baseTheme(spec) {
          return Prec.lowest(styleModule.of(buildTheme("." + baseThemeID, spec, lightDarkIDs)));
        }
        /**
        Retrieve an editor view instance from the view's DOM
        representation.
        */
        static findFromDOM(dom) {
          var _a2;
          let content2 = dom.querySelector(".cm-content");
          let tile = content2 && Tile.get(content2) || Tile.get(dom);
          return ((_a2 = tile === null || tile === void 0 ? void 0 : tile.root) === null || _a2 === void 0 ? void 0 : _a2.view) || null;
        }
      };
      EditorView.styleModule = styleModule;
      EditorView.inputHandler = inputHandler;
      EditorView.clipboardInputFilter = clipboardInputFilter;
      EditorView.clipboardOutputFilter = clipboardOutputFilter;
      EditorView.scrollHandler = scrollHandler;
      EditorView.focusChangeEffect = focusChangeEffect;
      EditorView.perLineTextDirection = perLineTextDirection;
      EditorView.exceptionSink = exceptionSink;
      EditorView.updateListener = updateListener;
      EditorView.editable = editable;
      EditorView.mouseSelectionStyle = mouseSelectionStyle;
      EditorView.dragMovesSelection = dragMovesSelection$1;
      EditorView.clickAddsSelectionRange = clickAddsSelectionRange;
      EditorView.decorations = decorations;
      EditorView.blockWrappers = blockWrappers;
      EditorView.outerDecorations = outerDecorations;
      EditorView.atomicRanges = atomicRanges;
      EditorView.bidiIsolatedRanges = bidiIsolatedRanges;
      EditorView.cursorScrollMargin = /* @__PURE__ */ Facet.define({
        combine: (inputs) => {
          let x = 5, y = 5;
          for (let i2 of inputs) {
            if (typeof i2 == "number")
              x = y = i2;
            else
              ({ x, y } = i2);
          }
          return { x, y };
        }
      });
      EditorView.scrollMargins = scrollMargins;
      EditorView.darkTheme = darkTheme;
      EditorView.cspNonce = /* @__PURE__ */ Facet.define({ combine: (values) => values.length ? values[0] : "" });
      EditorView.contentAttributes = contentAttributes;
      EditorView.editorAttributes = editorAttributes;
      EditorView.lineWrapping = /* @__PURE__ */ EditorView.contentAttributes.of({ "class": "cm-lineWrapping" });
      EditorView.announce = /* @__PURE__ */ StateEffect.define();
      MaxBidiLine = 4096;
      BadMeasure = {};
      CachedOrder = class _CachedOrder {
        constructor(from, to, dir, isolates, fresh, order) {
          this.from = from;
          this.to = to;
          this.dir = dir;
          this.isolates = isolates;
          this.fresh = fresh;
          this.order = order;
        }
        static update(cache2, changes) {
          if (changes.empty && !cache2.some((c) => c.fresh))
            return cache2;
          let result = [], lastDir = cache2.length ? cache2[cache2.length - 1].dir : Direction.LTR;
          for (let i2 = Math.max(0, cache2.length - 10); i2 < cache2.length; i2++) {
            let entry = cache2[i2];
            if (entry.dir == lastDir && !changes.touchesRange(entry.from, entry.to))
              result.push(new _CachedOrder(changes.mapPos(entry.from, 1), changes.mapPos(entry.to, -1), entry.dir, entry.isolates, false, entry.order));
          }
          return result;
        }
      };
      currentPlatform = browser.mac ? "mac" : browser.windows ? "win" : browser.linux ? "linux" : "key";
      handleKeyEvents = /* @__PURE__ */ Prec.default(/* @__PURE__ */ EditorView.domEventHandlers({
        keydown(event, view) {
          return runHandlers(getKeymap(view.state), event, view, "editor");
        }
      }));
      keymap = /* @__PURE__ */ Facet.define({ enables: handleKeyEvents });
      Keymaps = /* @__PURE__ */ new WeakMap();
      storedPrefix = null;
      PrefixTimeout = 4e3;
      currentKeyEvent = null;
      RectangleMarker = class _RectangleMarker {
        /**
        Create a marker with the given class and dimensions. If `width`
        is null, the DOM element will get no width style.
        */
        constructor(className, left, top2, width, height) {
          this.className = className;
          this.left = left;
          this.top = top2;
          this.width = width;
          this.height = height;
        }
        draw() {
          let elt = document.createElement("div");
          elt.className = this.className;
          this.adjust(elt);
          return elt;
        }
        update(elt, prev) {
          if (prev.className != this.className)
            return false;
          this.adjust(elt);
          return true;
        }
        adjust(elt) {
          elt.style.left = this.left + "px";
          elt.style.top = this.top + "px";
          if (this.width != null)
            elt.style.width = this.width + "px";
          elt.style.height = this.height + "px";
        }
        eq(p) {
          return this.left == p.left && this.top == p.top && this.width == p.width && this.height == p.height && this.className == p.className;
        }
        /**
        Create a set of rectangles for the given selection range,
        assigning them theclass`className`. Will create a single
        rectangle for empty ranges, and a set of selection-style
        rectangles covering the range's content (in a bidi-aware
        way) for non-empty ones.
        */
        static forRange(view, className, range) {
          if (range.empty) {
            let pos = view.coordsAtPos(range.head, range.assoc || 1);
            if (!pos)
              return [];
            let base2 = getBase(view);
            return [new _RectangleMarker(className, pos.left - base2.left, pos.top - base2.top, null, pos.bottom - pos.top)];
          } else {
            return rectanglesForRange(view, className, range);
          }
        }
      };
      LayerView = class {
        constructor(view, layer2) {
          this.view = view;
          this.layer = layer2;
          this.drawn = [];
          this.scaleX = 1;
          this.scaleY = 1;
          this.measureReq = { read: this.measure.bind(this), write: this.draw.bind(this) };
          this.dom = view.scrollDOM.appendChild(document.createElement("div"));
          this.dom.classList.add("cm-layer");
          if (layer2.above)
            this.dom.classList.add("cm-layer-above");
          if (layer2.class)
            this.dom.classList.add(layer2.class);
          this.scale();
          this.dom.setAttribute("aria-hidden", "true");
          this.setOrder(view.state);
          view.requestMeasure(this.measureReq);
          if (layer2.mount)
            layer2.mount(this.dom, view);
        }
        update(update) {
          if (update.startState.facet(layerOrder) != update.state.facet(layerOrder))
            this.setOrder(update.state);
          if (this.layer.update(update, this.dom) || update.geometryChanged) {
            this.scale();
            update.view.requestMeasure(this.measureReq);
          }
        }
        docViewUpdate(view) {
          if (this.layer.updateOnDocViewUpdate !== false)
            view.requestMeasure(this.measureReq);
        }
        setOrder(state) {
          let pos = 0, order = state.facet(layerOrder);
          while (pos < order.length && order[pos] != this.layer)
            pos++;
          this.dom.style.zIndex = String((this.layer.above ? 150 : -1) - pos);
        }
        measure() {
          return this.layer.markers(this.view);
        }
        scale() {
          let { scaleX, scaleY } = this.view;
          if (scaleX != this.scaleX || scaleY != this.scaleY) {
            this.scaleX = scaleX;
            this.scaleY = scaleY;
            this.dom.style.transform = `scale(${1 / scaleX}, ${1 / scaleY})`;
          }
        }
        draw(markers) {
          if (markers.length != this.drawn.length || markers.some((p, i2) => !sameMarker(p, this.drawn[i2]))) {
            let old = this.dom.firstChild, oldI = 0;
            for (let marker of markers) {
              if (marker.update && old && marker.constructor && this.drawn[oldI].constructor && marker.update(old, this.drawn[oldI])) {
                old = old.nextSibling;
                oldI++;
              } else {
                this.dom.insertBefore(marker.draw(), old);
              }
            }
            while (old) {
              let next = old.nextSibling;
              old.remove();
              old = next;
            }
            this.drawn = markers;
            if (browser.webkit)
              this.dom.style.display = this.dom.firstChild ? "" : "none";
          }
        }
        destroy() {
          if (this.layer.destroy)
            this.layer.destroy(this.dom, this.view);
          this.dom.remove();
        }
      };
      layerOrder = /* @__PURE__ */ Facet.define();
      selectionConfig = /* @__PURE__ */ Facet.define({
        combine(configs) {
          return combineConfig(configs, {
            cursorBlinkRate: 1200,
            drawRangeCursor: true,
            iosSelectionHandles: true
          }, {
            cursorBlinkRate: (a2, b) => Math.min(a2, b),
            drawRangeCursor: (a2, b) => a2 || b
          });
        }
      });
      cursorLayer = /* @__PURE__ */ layer({
        above: true,
        markers(view) {
          let { state } = view, conf = state.facet(selectionConfig);
          let cursors = [];
          for (let r of state.selection.ranges) {
            let prim = r == state.selection.main;
            if (r.empty || conf.drawRangeCursor && !(prim && browser.ios && conf.iosSelectionHandles)) {
              let className = prim ? "cm-cursor cm-cursor-primary" : "cm-cursor cm-cursor-secondary";
              let cursor = r.empty ? r : EditorSelection.cursor(r.head, r.assoc);
              for (let piece of RectangleMarker.forRange(view, className, cursor))
                cursors.push(piece);
            }
          }
          return cursors;
        },
        update(update, dom) {
          if (update.transactions.some((tr) => tr.selection))
            dom.style.animationName = dom.style.animationName == "cm-blink" ? "cm-blink2" : "cm-blink";
          let confChange = configChanged(update);
          if (confChange)
            setBlinkRate(update.state, dom);
          return update.docChanged || update.selectionSet || confChange;
        },
        mount(dom, view) {
          setBlinkRate(view.state, dom);
        },
        class: "cm-cursorLayer"
      });
      selectionLayer = /* @__PURE__ */ layer({
        above: false,
        markers(view) {
          let markers = [], { main, ranges } = view.state.selection;
          for (let r of ranges)
            if (!r.empty) {
              for (let marker of RectangleMarker.forRange(view, "cm-selectionBackground", r))
                markers.push(marker);
            }
          if (browser.ios && !main.empty && view.state.facet(selectionConfig).iosSelectionHandles) {
            for (let piece of RectangleMarker.forRange(view, "cm-selectionHandle cm-selectionHandle-start", EditorSelection.cursor(main.from, 1)))
              markers.push(piece);
            for (let piece of RectangleMarker.forRange(view, "cm-selectionHandle cm-selectionHandle-end", EditorSelection.cursor(main.to, 1)))
              markers.push(piece);
          }
          return markers;
        },
        update(update, dom) {
          return update.docChanged || update.selectionSet || update.viewportChanged || configChanged(update);
        },
        class: "cm-selectionLayer"
      });
      selectionBg = browser.gecko && browser.gecko_version == 153 ? "#ffffff01" : "transparent";
      hideNativeSelection = /* @__PURE__ */ Prec.highest(/* @__PURE__ */ EditorView.theme({
        ".cm-line": {
          "& ::selection, &::selection": { backgroundColor: `${selectionBg} !important` },
          caretColor: "transparent !important"
        },
        ".cm-content": {
          caretColor: "transparent !important",
          "& :focus": {
            caretColor: "initial !important",
            "&::selection, & ::selection": {
              backgroundColor: "Highlight !important"
            }
          }
        }
      }));
      MatchDecorator = class {
        /**
        Create a decorator.
        */
        constructor(config) {
          const { regexp, decoration, decorate, boundary, maxLength = 1e3 } = config;
          if (!regexp.global)
            throw new RangeError("The regular expression given to MatchDecorator should have its 'g' flag set");
          this.regexp = regexp;
          if (decorate) {
            this.addMatch = (match, view, from, add) => decorate(add, from, from + match[0].length, match, view);
          } else if (typeof decoration == "function") {
            this.addMatch = (match, view, from, add) => {
              let deco = decoration(match, view, from);
              if (deco)
                add(from, from + match[0].length, deco);
            };
          } else if (decoration) {
            this.addMatch = (match, _view, from, add) => add(from, from + match[0].length, decoration);
          } else {
            throw new RangeError("Either 'decorate' or 'decoration' should be provided to MatchDecorator");
          }
          this.boundary = boundary;
          this.maxLength = maxLength;
        }
        /**
        Compute the full set of decorations for matches in the given
        view's viewport. You'll want to call this when initializing your
        plugin.
        */
        createDeco(view) {
          let build = new RangeSetBuilder(), add = build.add.bind(build);
          for (let { from, to } of matchRanges(view, this.maxLength))
            iterMatches(view.state.doc, this.regexp, from, to, (from2, m) => this.addMatch(m, view, from2, add));
          return build.finish();
        }
        /**
        Update a set of decorations for a view update. `deco` _must_ be
        the set of decorations produced by _this_ `MatchDecorator` for
        the view state before the update.
        */
        updateDeco(update, deco) {
          let changeFrom = 1e9, changeTo = -1;
          if (update.docChanged)
            update.changes.iterChanges((_f, _t, from, to) => {
              if (to >= update.view.viewport.from && from <= update.view.viewport.to) {
                changeFrom = Math.min(from, changeFrom);
                changeTo = Math.max(to, changeTo);
              }
            });
          if (update.viewportMoved || changeTo - changeFrom > 1e3)
            return this.createDeco(update.view);
          if (changeTo > -1)
            return this.updateRange(update.view, deco.map(update.changes), changeFrom, changeTo);
          return deco;
        }
        updateRange(view, deco, updateFrom, updateTo) {
          for (let r of view.visibleRanges) {
            let from = Math.max(r.from, updateFrom), to = Math.min(r.to, updateTo);
            if (to >= from) {
              let fromLine = view.state.doc.lineAt(from), toLine = fromLine.to < to ? view.state.doc.lineAt(to) : fromLine;
              let start = Math.max(r.from, fromLine.from), end = Math.min(r.to, toLine.to);
              if (this.boundary) {
                for (; from > fromLine.from; from--)
                  if (this.boundary.test(fromLine.text[from - 1 - fromLine.from])) {
                    start = from;
                    break;
                  }
                for (; to < toLine.to; to++)
                  if (this.boundary.test(toLine.text[to - toLine.from])) {
                    end = to;
                    break;
                  }
              }
              let ranges = [], m;
              let add = (from2, to2, deco2) => ranges.push(deco2.range(from2, to2));
              if (fromLine == toLine) {
                this.regexp.lastIndex = start - fromLine.from;
                while ((m = this.regexp.exec(fromLine.text)) && m.index < end - fromLine.from)
                  this.addMatch(m, view, m.index + fromLine.from, add);
              } else {
                iterMatches(view.state.doc, this.regexp, start, end, (from2, m2) => this.addMatch(m2, view, from2, add));
              }
              deco = deco.update({ filterFrom: start, filterTo: end, filter: (from2, to2) => from2 < start || to2 > end, add: ranges });
            }
          }
          return deco;
        }
      };
      UnicodeRegexpSupport = /x/.unicode != null ? "gu" : "g";
      Specials = /* @__PURE__ */ new RegExp("[\0-\b\n-\x7F-\x9F\xAD\u061C\u200B\u200E\u200F\u2028\u2029\u202D\u202E\u2066\u2067\u2069\uFEFF\uFFF9-\uFFFC]", UnicodeRegexpSupport);
      Names = {
        0: "null",
        7: "bell",
        8: "backspace",
        10: "newline",
        11: "vertical tab",
        13: "carriage return",
        27: "escape",
        8203: "zero width space",
        8204: "zero width non-joiner",
        8205: "zero width joiner",
        8206: "left-to-right mark",
        8207: "right-to-left mark",
        8232: "line separator",
        8237: "left-to-right override",
        8238: "right-to-left override",
        8294: "left-to-right isolate",
        8295: "right-to-left isolate",
        8297: "pop directional isolate",
        8233: "paragraph separator",
        65279: "zero width no-break space",
        65532: "object replacement"
      };
      _supportsTabSize = null;
      specialCharConfig = /* @__PURE__ */ Facet.define({
        combine(configs) {
          let config = combineConfig(configs, {
            render: null,
            specialChars: Specials,
            addSpecialChars: null
          });
          if (config.replaceTabs = !supportsTabSize())
            config.specialChars = new RegExp("	|" + config.specialChars.source, UnicodeRegexpSupport);
          if (config.addSpecialChars)
            config.specialChars = new RegExp(config.specialChars.source + "|" + config.addSpecialChars.source, UnicodeRegexpSupport);
          return config;
        }
      });
      _plugin = null;
      DefaultPlaceholder = "\u2022";
      SpecialCharWidget = class extends WidgetType {
        constructor(options, code2) {
          super();
          this.options = options;
          this.code = code2;
        }
        eq(other) {
          return other.code == this.code;
        }
        toDOM(view) {
          let ph = placeholder$1(this.code);
          let desc = view.state.phrase("Control character") + " " + (Names[this.code] || "0x" + this.code.toString(16));
          let custom = this.options.render && this.options.render(this.code, desc, ph);
          if (custom)
            return custom;
          let span = document.createElement("span");
          span.textContent = ph;
          span.title = desc;
          span.setAttribute("aria-label", desc);
          span.className = "cm-specialChar";
          return span;
        }
        ignoreEvent() {
          return false;
        }
      };
      TabWidget = class extends WidgetType {
        constructor(width) {
          super();
          this.width = width;
        }
        eq(other) {
          return other.width == this.width;
        }
        toDOM() {
          let span = document.createElement("span");
          span.textContent = "	";
          span.className = "cm-tab";
          span.style.width = this.width + "px";
          return span;
        }
        ignoreEvent() {
          return false;
        }
      };
      lineDeco = /* @__PURE__ */ Decoration.line({ class: "cm-activeLine" });
      activeLineHighlighter = /* @__PURE__ */ ViewPlugin.fromClass(class {
        constructor(view) {
          this.decorations = this.getDeco(view);
        }
        update(update) {
          if (update.docChanged || update.selectionSet)
            this.decorations = this.getDeco(update.view);
        }
        getDeco(view) {
          let lastLineStart = -1, deco = [];
          for (let r of view.state.selection.ranges) {
            let line = view.lineBlockAt(r.head);
            if (line.from > lastLineStart) {
              deco.push(lineDeco.range(line.from));
              lastLineStart = line.from;
            }
          }
          return Decoration.set(deco);
        }
      }, {
        decorations: (v) => v.decorations
      });
      MaxOff = 2e3;
      baseTheme = /* @__PURE__ */ EditorView.baseTheme({
        ".cm-tooltip": {
          zIndex: 500,
          boxSizing: "border-box"
        },
        "&light .cm-tooltip": {
          border: "1px solid #bbb",
          backgroundColor: "#f5f5f5"
        },
        "&light .cm-tooltip-section:not(:first-child)": {
          borderTop: "1px solid #bbb"
        },
        "&dark .cm-tooltip": {
          backgroundColor: "#333338",
          color: "white"
        },
        ".cm-tooltip-arrow": {
          height: `${7}px`,
          width: `${7 * 2}px`,
          position: "absolute",
          zIndex: -1,
          overflow: "hidden",
          "&:before, &:after": {
            content: "''",
            position: "absolute",
            width: 0,
            height: 0,
            borderLeft: `${7}px solid transparent`,
            borderRight: `${7}px solid transparent`
          },
          ".cm-tooltip-above &": {
            bottom: `-${7}px`,
            "&:before": {
              borderTop: `${7}px solid #bbb`
            },
            "&:after": {
              borderTop: `${7}px solid #f5f5f5`,
              bottom: "1px"
            }
          },
          ".cm-tooltip-below &": {
            top: `-${7}px`,
            "&:before": {
              borderBottom: `${7}px solid #bbb`
            },
            "&:after": {
              borderBottom: `${7}px solid #f5f5f5`,
              top: "1px"
            }
          }
        },
        "&dark .cm-tooltip .cm-tooltip-arrow": {
          "&:before": {
            borderTopColor: "#333338",
            borderBottomColor: "#333338"
          },
          "&:after": {
            borderTopColor: "transparent",
            borderBottomColor: "transparent"
          }
        }
      });
      GutterMarker = class extends RangeValue {
        /**
        @internal
        */
        compare(other) {
          return this == other || this.constructor == other.constructor && this.eq(other);
        }
        /**
        Compare this marker to another marker of the same type.
        */
        eq(other) {
          return false;
        }
        /**
        Called if the marker has a `toDOM` method and its representation
        was removed from a gutter.
        */
        destroy(dom) {
        }
      };
      GutterMarker.prototype.elementClass = "";
      GutterMarker.prototype.toDOM = void 0;
      GutterMarker.prototype.mapMode = MapMode.TrackBefore;
      GutterMarker.prototype.startSide = GutterMarker.prototype.endSide = -1;
      GutterMarker.prototype.point = true;
      gutterLineClass = /* @__PURE__ */ Facet.define();
      gutterWidgetClass = /* @__PURE__ */ Facet.define();
      activeGutters = /* @__PURE__ */ Facet.define();
      unfixGutters = /* @__PURE__ */ Facet.define({
        combine: (values) => values.some((x) => x)
      });
      gutterView = /* @__PURE__ */ ViewPlugin.fromClass(class {
        constructor(view) {
          this.view = view;
          this.domAfter = null;
          this.prevViewport = view.viewport;
          this.dom = document.createElement("div");
          this.dom.className = "cm-gutters cm-gutters-before";
          this.dom.setAttribute("aria-hidden", "true");
          this.dom.style.minHeight = this.view.contentHeight / this.view.scaleY + "px";
          this.gutters = view.state.facet(activeGutters).map((conf) => new SingleGutterView(view, conf));
          this.fixed = !view.state.facet(unfixGutters);
          for (let gutter2 of this.gutters) {
            if (gutter2.config.side == "after")
              this.getDOMAfter().appendChild(gutter2.dom);
            else
              this.dom.appendChild(gutter2.dom);
          }
          if (this.fixed) {
            this.dom.style.position = "sticky";
          }
          this.syncGutters(false);
          view.scrollDOM.insertBefore(this.dom, view.contentDOM);
        }
        getDOMAfter() {
          if (!this.domAfter) {
            this.domAfter = document.createElement("div");
            this.domAfter.className = "cm-gutters cm-gutters-after";
            this.domAfter.setAttribute("aria-hidden", "true");
            this.domAfter.style.minHeight = this.view.contentHeight / this.view.scaleY + "px";
            this.domAfter.style.position = this.fixed ? "sticky" : "";
            this.view.scrollDOM.appendChild(this.domAfter);
          }
          return this.domAfter;
        }
        update(update) {
          if (this.updateGutters(update)) {
            let vpA = this.prevViewport, vpB = update.view.viewport;
            let vpOverlap = Math.min(vpA.to, vpB.to) - Math.max(vpA.from, vpB.from);
            this.syncGutters(vpOverlap < (vpB.to - vpB.from) * 0.8);
          }
          if (update.geometryChanged) {
            let min = this.view.contentHeight / this.view.scaleY + "px";
            this.dom.style.minHeight = min;
            if (this.domAfter)
              this.domAfter.style.minHeight = min;
          }
          if (this.view.state.facet(unfixGutters) != !this.fixed) {
            this.fixed = !this.fixed;
            this.dom.style.position = this.fixed ? "sticky" : "";
            if (this.domAfter)
              this.domAfter.style.position = this.fixed ? "sticky" : "";
          }
          this.prevViewport = update.view.viewport;
        }
        syncGutters(detach) {
          let after = this.dom.nextSibling;
          if (detach) {
            this.dom.remove();
            if (this.domAfter)
              this.domAfter.remove();
          }
          let lineClasses = RangeSet.iter(this.view.state.facet(gutterLineClass), this.view.viewport.from);
          let classSet = [];
          let contexts = this.gutters.map((gutter2) => new UpdateContext(gutter2, this.view.viewport, -this.view.documentPadding.top));
          for (let line of this.view.viewportLineBlocks) {
            if (classSet.length)
              classSet = [];
            if (Array.isArray(line.type)) {
              let first = true;
              for (let b of line.type) {
                if (b.type == BlockType.Text && first) {
                  advanceCursor(lineClasses, classSet, b.from);
                  for (let cx of contexts)
                    cx.line(this.view, b, classSet);
                  first = false;
                } else if (b.widget) {
                  for (let cx of contexts)
                    cx.widget(this.view, b);
                }
              }
            } else if (line.type == BlockType.Text) {
              advanceCursor(lineClasses, classSet, line.from);
              for (let cx of contexts)
                cx.line(this.view, line, classSet);
            } else if (line.widget) {
              for (let cx of contexts)
                cx.widget(this.view, line);
            }
          }
          for (let cx of contexts)
            cx.finish();
          if (detach) {
            this.view.scrollDOM.insertBefore(this.dom, after);
            if (this.domAfter)
              this.view.scrollDOM.appendChild(this.domAfter);
          }
        }
        updateGutters(update) {
          let prev = update.startState.facet(activeGutters), cur = update.state.facet(activeGutters);
          let change = update.docChanged || update.heightChanged || update.viewportChanged || !RangeSet.eq(update.startState.facet(gutterLineClass), update.state.facet(gutterLineClass), update.view.viewport.from, update.view.viewport.to);
          if (prev == cur) {
            for (let gutter2 of this.gutters)
              if (gutter2.update(update))
                change = true;
          } else {
            change = true;
            let gutters2 = [];
            for (let conf of cur) {
              let known = prev.indexOf(conf);
              if (known < 0) {
                gutters2.push(new SingleGutterView(this.view, conf));
              } else {
                this.gutters[known].update(update);
                gutters2.push(this.gutters[known]);
              }
            }
            for (let g of this.gutters) {
              g.dom.remove();
              if (gutters2.indexOf(g) < 0)
                g.destroy();
            }
            for (let g of gutters2) {
              if (g.config.side == "after")
                this.getDOMAfter().appendChild(g.dom);
              else
                this.dom.appendChild(g.dom);
            }
            this.gutters = gutters2;
          }
          return change;
        }
        destroy() {
          for (let view of this.gutters)
            view.destroy();
          this.dom.remove();
          if (this.domAfter)
            this.domAfter.remove();
        }
      }, {
        provide: (plugin) => EditorView.scrollMargins.of((view) => {
          let value = view.plugin(plugin);
          if (!value || value.gutters.length == 0 || !value.fixed)
            return null;
          let before = value.dom.offsetWidth * view.scaleX, after = value.domAfter ? value.domAfter.offsetWidth * view.scaleX : 0;
          return view.textDirection == Direction.LTR ? { left: before, right: after } : { right: before, left: after };
        })
      });
      UpdateContext = class {
        constructor(gutter2, viewport, height) {
          this.gutter = gutter2;
          this.height = height;
          this.i = 0;
          this.cursor = RangeSet.iter(gutter2.markers, viewport.from);
        }
        addElement(view, block, markers) {
          let { gutter: gutter2 } = this, above = (block.top - this.height) / view.scaleY, height = block.height / view.scaleY;
          if (this.i == gutter2.elements.length) {
            let newElt = new GutterElement(view, height, above, markers);
            gutter2.elements.push(newElt);
            gutter2.dom.appendChild(newElt.dom);
          } else {
            gutter2.elements[this.i].update(view, height, above, markers);
          }
          this.height = block.bottom;
          this.i++;
        }
        line(view, line, extraMarkers) {
          let localMarkers = [];
          advanceCursor(this.cursor, localMarkers, line.from);
          if (extraMarkers.length)
            localMarkers = localMarkers.concat(extraMarkers);
          let forLine = this.gutter.config.lineMarker(view, line, localMarkers);
          if (forLine)
            localMarkers.unshift(forLine);
          let gutter2 = this.gutter;
          if (localMarkers.length == 0 && !gutter2.config.renderEmptyElements)
            return;
          this.addElement(view, line, localMarkers);
        }
        widget(view, block) {
          let marker = this.gutter.config.widgetMarker(view, block.widget, block), markers = marker ? [marker] : null;
          for (let cls of view.state.facet(gutterWidgetClass)) {
            let marker2 = cls(view, block.widget, block);
            if (marker2)
              (markers || (markers = [])).push(marker2);
          }
          if (markers)
            this.addElement(view, block, markers);
        }
        finish() {
          let gutter2 = this.gutter;
          while (gutter2.elements.length > this.i) {
            let last2 = gutter2.elements.pop();
            gutter2.dom.removeChild(last2.dom);
            last2.destroy();
          }
        }
      };
      SingleGutterView = class {
        constructor(view, config) {
          this.view = view;
          this.config = config;
          this.elements = [];
          this.spacer = null;
          this.dom = document.createElement("div");
          this.dom.className = "cm-gutter" + (this.config.class ? " " + this.config.class : "");
          for (let prop in config.domEventHandlers) {
            this.dom.addEventListener(prop, (event) => {
              let target = event.target, y;
              if (target != this.dom && this.dom.contains(target)) {
                while (target.parentNode != this.dom)
                  target = target.parentNode;
                let rect = target.getBoundingClientRect();
                y = (rect.top + rect.bottom) / 2;
              } else {
                y = event.clientY;
              }
              let line = view.lineBlockAtHeight(y - view.documentTop);
              if (config.domEventHandlers[prop](view, line, event))
                event.preventDefault();
            });
          }
          this.markers = asArray2(config.markers(view));
          if (config.initialSpacer) {
            this.spacer = new GutterElement(view, 0, 0, [config.initialSpacer(view)]);
            this.dom.appendChild(this.spacer.dom);
            this.spacer.dom.style.cssText += "visibility: hidden; pointer-events: none";
          }
        }
        update(update) {
          let prevMarkers = this.markers;
          this.markers = asArray2(this.config.markers(update.view));
          if (this.spacer && this.config.updateSpacer) {
            let updated = this.config.updateSpacer(this.spacer.markers[0], update);
            if (updated != this.spacer.markers[0])
              this.spacer.update(update.view, 0, 0, [updated]);
          }
          let vp = update.view.viewport;
          return !RangeSet.eq(this.markers, prevMarkers, vp.from, vp.to) || (this.config.lineMarkerChange ? this.config.lineMarkerChange(update) : false);
        }
        destroy() {
          for (let elt of this.elements)
            elt.destroy();
        }
      };
      GutterElement = class {
        constructor(view, height, above, markers) {
          this.height = -1;
          this.above = 0;
          this.markers = [];
          this.dom = document.createElement("div");
          this.dom.className = "cm-gutterElement";
          this.update(view, height, above, markers);
        }
        update(view, height, above, markers) {
          if (this.height != height) {
            this.height = height;
            this.dom.style.height = height + "px";
          }
          if (this.above != above)
            this.dom.style.marginTop = (this.above = above) ? above + "px" : "";
          if (!sameMarkers(this.markers, markers))
            this.setMarkers(view, markers);
        }
        setMarkers(view, markers) {
          let cls = "cm-gutterElement", domPos = this.dom.firstChild;
          for (let iNew = 0, iOld = 0; ; ) {
            let skipTo = iOld, marker = iNew < markers.length ? markers[iNew++] : null, matched = false;
            if (marker) {
              let c = marker.elementClass;
              if (c)
                cls += " " + c;
              for (let i2 = iOld; i2 < this.markers.length; i2++)
                if (this.markers[i2].compare(marker)) {
                  skipTo = i2;
                  matched = true;
                  break;
                }
            } else {
              skipTo = this.markers.length;
            }
            while (iOld < skipTo) {
              let next = this.markers[iOld++];
              if (next.toDOM) {
                next.destroy(domPos);
                let after = domPos.nextSibling;
                domPos.remove();
                domPos = after;
              }
            }
            if (!marker)
              break;
            if (marker.toDOM) {
              if (matched)
                domPos = domPos.nextSibling;
              else
                this.dom.insertBefore(marker.toDOM(view), domPos);
            }
            if (matched)
              iOld++;
          }
          this.dom.className = cls;
          this.markers = markers;
        }
        destroy() {
          this.setMarkers(null, []);
        }
      };
      lineNumberMarkers = /* @__PURE__ */ Facet.define();
      lineNumberWidgetMarker = /* @__PURE__ */ Facet.define();
      lineNumberConfig = /* @__PURE__ */ Facet.define({
        combine(values) {
          return combineConfig(values, { formatNumber: String, domEventHandlers: {} }, {
            domEventHandlers(a2, b) {
              let result = Object.assign({}, a2);
              for (let event in b) {
                let exists = result[event], add = b[event];
                result[event] = exists ? (view, line, event2) => exists(view, line, event2) || add(view, line, event2) : add;
              }
              return result;
            }
          });
        }
      });
      NumberMarker = class extends GutterMarker {
        constructor(number2) {
          super();
          this.number = number2;
        }
        eq(other) {
          return this.number == other.number;
        }
        toDOM() {
          return document.createTextNode(this.number);
        }
      };
      lineNumberGutter = /* @__PURE__ */ activeGutters.compute([lineNumberConfig], (state) => ({
        class: "cm-lineNumbers",
        renderEmptyElements: false,
        markers(view) {
          return view.state.facet(lineNumberMarkers);
        },
        lineMarker(view, line, others) {
          if (others.some((m) => m.toDOM))
            return null;
          return new NumberMarker(formatNumber(view, view.state.doc.lineAt(line.from).number));
        },
        widgetMarker: (view, widget, block) => {
          for (let m of view.state.facet(lineNumberWidgetMarker)) {
            let result = m(view, widget, block);
            if (result)
              return result;
          }
          return null;
        },
        lineMarkerChange: (update) => update.startState.facet(lineNumberConfig) != update.state.facet(lineNumberConfig),
        initialSpacer(view) {
          return new NumberMarker(formatNumber(view, maxLineNumber(view.state.doc.lines)));
        },
        updateSpacer(spacer, update) {
          let max = formatNumber(update.view, maxLineNumber(update.view.state.doc.lines));
          return max == spacer.number ? spacer : new NumberMarker(max);
        },
        domEventHandlers: state.facet(lineNumberConfig).domEventHandlers,
        side: "before"
      }));
      activeLineGutterMarker = /* @__PURE__ */ new class extends GutterMarker {
        constructor() {
          super(...arguments);
          this.elementClass = "cm-activeLineGutter";
        }
      }();
      activeLineGutterHighlighter = /* @__PURE__ */ gutterLineClass.compute(["selection"], (state) => {
        let marks2 = [], last2 = -1;
        for (let range of state.selection.ranges) {
          let linePos = state.doc.lineAt(range.head).from;
          if (linePos > last2) {
            last2 = linePos;
            marks2.push(activeLineGutterMarker.range(linePos));
          }
        }
        return RangeSet.of(marks2);
      });
    }
  });

  // node_modules/@lezer/common/dist/index.js
  function checkSide(side, pos, from, to) {
    switch (side) {
      case -2:
        return from < pos;
      case -1:
        return to >= pos && from < pos;
      case 0:
        return from < pos && to > pos;
      case 1:
        return from <= pos && to > pos;
      case 2:
        return to > pos;
      case 4:
        return true;
    }
  }
  function resolveNode(node, pos, side, overlays) {
    var _a2;
    while (node.from == node.to || (side < 1 ? node.from >= pos : node.from > pos) || (side > -1 ? node.to <= pos : node.to < pos)) {
      let parent = !overlays && node instanceof TreeNode && node.index < 0 ? null : node.parent;
      if (!parent)
        return node;
      node = parent;
    }
    let mode = overlays ? 0 : IterMode.IgnoreOverlays;
    if (overlays)
      for (let scan = node, parent = scan.parent; parent; scan = parent, parent = scan.parent) {
        if (scan instanceof TreeNode && scan.index < 0 && ((_a2 = parent.enter(pos, side, mode)) === null || _a2 === void 0 ? void 0 : _a2.from) != scan.from)
          node = parent;
      }
    for (; ; ) {
      let inner = node.enter(pos, side, mode);
      if (!inner)
        return node;
      node = inner;
    }
  }
  function getChildren(node, type, before, after) {
    let cur = node.cursor(), result = [];
    if (!cur.firstChild())
      return result;
    if (before != null)
      for (let found = false; !found; ) {
        found = cur.type.is(before);
        if (!cur.nextSibling())
          return result;
      }
    for (; ; ) {
      if (after != null && cur.type.is(after))
        return result;
      if (cur.type.is(type))
        result.push(cur.node);
      if (!cur.nextSibling())
        return after == null ? result : [];
    }
  }
  function matchNodeContext(node, context, i2 = context.length - 1) {
    for (let p = node; i2 >= 0; p = p.parent) {
      if (!p)
        return false;
      if (!p.type.isAnonymous) {
        if (context[i2] && context[i2] != p.name)
          return false;
        i2--;
      }
    }
    return true;
  }
  function iterStack(heads) {
    if (!heads.length)
      return null;
    let pick = 0, picked = heads[0];
    for (let i2 = 1; i2 < heads.length; i2++) {
      let node = heads[i2];
      if (node.from > picked.from || node.to < picked.to) {
        picked = node;
        pick = i2;
      }
    }
    let next = picked instanceof TreeNode && picked.index < 0 ? null : picked.parent;
    let newHeads = heads.slice();
    if (next)
      newHeads[pick] = next;
    else
      newHeads.splice(pick, 1);
    return new StackIterator(newHeads, picked);
  }
  function stackIterator(tree, pos, side) {
    let inner = tree.resolveInner(pos, side), layers = null;
    for (let scan = inner instanceof TreeNode ? inner : inner.context.parent; scan; scan = scan.parent) {
      if (scan.index < 0) {
        let parent = scan.parent;
        (layers || (layers = [inner])).push(parent.resolve(pos, side));
        scan = parent;
      } else {
        let mount = MountedTree.get(scan.tree);
        if (mount && mount.overlay && mount.overlay[0].from <= pos && mount.overlay[mount.overlay.length - 1].to >= pos) {
          let root = new TreeNode(mount.tree, mount.overlay[0].from + scan.from, -1, scan);
          (layers || (layers = [inner])).push(resolveNode(root, pos, side, false));
        }
      }
    }
    return layers ? iterStack(layers) : inner;
  }
  function hasChild(tree) {
    return tree.children.some((ch) => ch instanceof TreeBuffer || !ch.type.isAnonymous || hasChild(ch));
  }
  function buildTree(data) {
    var _a2;
    let { buffer, nodeSet, maxBufferLength = DefaultBufferLength, reused = [], minRepeatType = nodeSet.types.length } = data;
    let cursor = Array.isArray(buffer) ? new FlatBufferCursor(buffer, buffer.length) : buffer;
    let types2 = nodeSet.types;
    let contextHash = 0, lookAhead = 0;
    function takeNode(parentStart, minPos, children2, positions2, inRepeat, depth) {
      let { id: id2, start, end, size } = cursor;
      let lookAheadAtStart = lookAhead, contextAtStart = contextHash;
      if (size < 0) {
        cursor.next();
        if (size == -1) {
          let node2 = reused[id2];
          children2.push(node2);
          positions2.push(start - parentStart);
          return;
        } else if (size == -3) {
          contextHash = id2;
          return;
        } else if (size == -4) {
          lookAhead = id2;
          return;
        } else {
          throw new RangeError(`Unrecognized record size: ${size}`);
        }
      }
      let type = types2[id2], node, buffer2;
      let startPos = start - parentStart;
      if (end - start <= maxBufferLength && (buffer2 = findBufferSize(cursor.pos - minPos, inRepeat))) {
        let data2 = new Uint16Array(buffer2.size - buffer2.skip);
        let endPos = cursor.pos - buffer2.size, index = data2.length;
        while (cursor.pos > endPos)
          index = copyToBuffer(buffer2.start, data2, index);
        node = new TreeBuffer(data2, end - buffer2.start, nodeSet);
        startPos = buffer2.start - parentStart;
      } else {
        let endPos = cursor.pos - size;
        cursor.next();
        let localChildren = [], localPositions = [];
        let localInRepeat = id2 >= minRepeatType ? id2 : -1;
        let lastGroup = 0, lastEnd = end;
        while (cursor.pos > endPos) {
          if (localInRepeat >= 0 && cursor.id == localInRepeat && cursor.size >= 0) {
            if (cursor.end <= lastEnd - maxBufferLength) {
              makeRepeatLeaf(localChildren, localPositions, start, lastGroup, cursor.end, lastEnd, localInRepeat, lookAheadAtStart, contextAtStart);
              lastGroup = localChildren.length;
              lastEnd = cursor.end;
            }
            cursor.next();
          } else if (depth > 2500) {
            takeFlatNode(start, endPos, localChildren, localPositions);
          } else {
            takeNode(start, endPos, localChildren, localPositions, localInRepeat, depth + 1);
          }
        }
        if (localInRepeat >= 0 && lastGroup > 0 && lastGroup < localChildren.length)
          makeRepeatLeaf(localChildren, localPositions, start, lastGroup, start, lastEnd, localInRepeat, lookAheadAtStart, contextAtStart);
        localChildren.reverse();
        localPositions.reverse();
        if (localInRepeat > -1 && lastGroup > 0) {
          let make = makeBalanced(type, contextAtStart);
          node = balanceRange(type, localChildren, localPositions, 0, localChildren.length, 0, end - start, make, make);
        } else {
          node = makeTree(type, localChildren, localPositions, end - start, lookAheadAtStart - end, contextAtStart);
        }
      }
      children2.push(node);
      positions2.push(startPos);
    }
    function takeFlatNode(parentStart, minPos, children2, positions2) {
      let nodes = [];
      let nodeCount = 0, stopAt = -1;
      while (cursor.pos > minPos) {
        let { id: id2, start, end, size } = cursor;
        if (size > 4) {
          cursor.next();
        } else if (stopAt > -1 && start < stopAt) {
          break;
        } else {
          if (stopAt < 0)
            stopAt = end - maxBufferLength;
          nodes.push(id2, start, end);
          nodeCount++;
          cursor.next();
        }
      }
      if (nodeCount) {
        let buffer2 = new Uint16Array(nodeCount * 4);
        let start = nodes[nodes.length - 2];
        for (let i2 = nodes.length - 3, j = 0; i2 >= 0; i2 -= 3) {
          buffer2[j++] = nodes[i2];
          buffer2[j++] = nodes[i2 + 1] - start;
          buffer2[j++] = nodes[i2 + 2] - start;
          buffer2[j++] = j;
        }
        children2.push(new TreeBuffer(buffer2, nodes[2] - start, nodeSet));
        positions2.push(start - parentStart);
      }
    }
    function makeBalanced(type, contextHash2) {
      return (children2, positions2, length2) => {
        let lookAhead2 = 0, lastI = children2.length - 1, last2, lookAheadProp;
        if (lastI >= 0 && (last2 = children2[lastI]) instanceof Tree) {
          if (!lastI && last2.type == type && last2.length == length2)
            return last2;
          if (lookAheadProp = last2.prop(NodeProp.lookAhead))
            lookAhead2 = positions2[lastI] + last2.length + lookAheadProp;
        }
        return makeTree(type, children2, positions2, length2, lookAhead2, contextHash2);
      };
    }
    function makeRepeatLeaf(children2, positions2, base2, i2, from, to, type, lookAhead2, contextHash2) {
      let localChildren = [], localPositions = [];
      while (children2.length > i2) {
        localChildren.push(children2.pop());
        localPositions.push(positions2.pop() + base2 - from);
      }
      children2.push(makeTree(nodeSet.types[type], localChildren, localPositions, to - from, lookAhead2 - to, contextHash2));
      positions2.push(from - base2);
    }
    function makeTree(type, children2, positions2, length2, lookAhead2, contextHash2, props) {
      if (contextHash2) {
        let pair2 = [NodeProp.contextHash, contextHash2];
        props = props ? [pair2].concat(props) : [pair2];
      }
      if (lookAhead2 > 25) {
        let pair2 = [NodeProp.lookAhead, lookAhead2];
        props = props ? [pair2].concat(props) : [pair2];
      }
      return new Tree(type, children2, positions2, length2, props);
    }
    function findBufferSize(maxSize, inRepeat) {
      let fork = cursor.fork();
      let size = 0, start = 0, skip = 0, minStart = fork.end - maxBufferLength;
      let result = { size: 0, start: 0, skip: 0 };
      scan: for (let minPos = fork.pos - maxSize; fork.pos > minPos; ) {
        let nodeSize2 = fork.size;
        if (fork.id == inRepeat && nodeSize2 >= 0) {
          result.size = size;
          result.start = start;
          result.skip = skip;
          skip += 4;
          size += 4;
          fork.next();
          continue;
        }
        let startPos = fork.pos - nodeSize2;
        if (nodeSize2 < 0 || startPos < minPos || fork.start < minStart)
          break;
        let localSkipped = fork.id >= minRepeatType ? 4 : 0;
        let nodeStart = fork.start;
        fork.next();
        while (fork.pos > startPos) {
          if (fork.size < 0) {
            if (fork.size == -3 || fork.size == -4)
              localSkipped += 4;
            else
              break scan;
          } else if (fork.id >= minRepeatType) {
            localSkipped += 4;
          }
          fork.next();
        }
        start = nodeStart;
        size += nodeSize2;
        skip += localSkipped;
      }
      if (inRepeat < 0 || size == maxSize) {
        result.size = size;
        result.start = start;
        result.skip = skip;
      }
      return result.size > 4 ? result : void 0;
    }
    function copyToBuffer(bufferStart, buffer2, index) {
      let { id: id2, start, end, size } = cursor;
      cursor.next();
      if (size >= 0 && id2 < minRepeatType) {
        let startIndex = index;
        if (size > 4) {
          let endPos = cursor.pos - (size - 4);
          while (cursor.pos > endPos)
            index = copyToBuffer(bufferStart, buffer2, index);
        }
        buffer2[--index] = startIndex;
        buffer2[--index] = end - bufferStart;
        buffer2[--index] = start - bufferStart;
        buffer2[--index] = id2;
      } else if (size == -3) {
        contextHash = id2;
      } else if (size == -4) {
        lookAhead = id2;
      }
      return index;
    }
    let children = [], positions = [];
    while (cursor.pos > 0)
      takeNode(data.start || 0, data.bufferStart || 0, children, positions, -1, 0);
    let length = (_a2 = data.length) !== null && _a2 !== void 0 ? _a2 : children.length ? positions[0] + children[0].length : 0;
    return new Tree(types2[data.topID], children.reverse(), positions.reverse(), length);
  }
  function nodeSize(balanceType, node) {
    if (!balanceType.isAnonymous || node instanceof TreeBuffer || node.type != balanceType)
      return 1;
    let size = nodeSizeCache.get(node);
    if (size == null) {
      size = 1;
      for (let child of node.children) {
        if (child.type != balanceType || !(child instanceof Tree)) {
          size = 1;
          break;
        }
        size += nodeSize(balanceType, child);
      }
      nodeSizeCache.set(node, size);
    }
    return size;
  }
  function balanceRange(balanceType, children, positions, from, to, start, length, mkTop, mkTree) {
    let total = 0;
    for (let i2 = from; i2 < to; i2++)
      total += nodeSize(balanceType, children[i2]);
    let maxChild = Math.ceil(
      total * 1.5 / 8
      /* Balance.BranchFactor */
    );
    let localChildren = [], localPositions = [];
    function divide(children2, positions2, from2, to2, offset) {
      for (let i2 = from2; i2 < to2; ) {
        let groupFrom = i2, groupStart = positions2[i2], groupSize = nodeSize(balanceType, children2[i2]);
        i2++;
        for (; i2 < to2; i2++) {
          let nextSize = nodeSize(balanceType, children2[i2]);
          if (groupSize + nextSize >= maxChild)
            break;
          groupSize += nextSize;
        }
        if (i2 == groupFrom + 1) {
          if (groupSize > maxChild) {
            let only = children2[groupFrom];
            divide(only.children, only.positions, 0, only.children.length, positions2[groupFrom] + offset);
            continue;
          }
          localChildren.push(children2[groupFrom]);
        } else {
          let length2 = positions2[i2 - 1] + children2[i2 - 1].length - groupStart;
          localChildren.push(balanceRange(balanceType, children2, positions2, groupFrom, i2, groupStart, length2, null, mkTree));
        }
        localPositions.push(groupStart + offset - start);
      }
    }
    divide(children, positions, from, to, 0);
    return (mkTop || mkTree)(localChildren, localPositions, length);
  }
  var DefaultBufferLength, nextPropID, Range2, NodeProp, MountedTree, noProps, NodeType, NodeSet, CachedNode, CachedInnerNode, IterMode, Tree, FlatBufferCursor, TreeBuffer, BaseNode, TreeNode, BufferContext, BufferNode, StackIterator, TreeCursor, nodeSizeCache, NodeWeakMap, TreeFragment, Parser, StringInput, stoppedInner;
  var init_dist3 = __esm({
    "node_modules/@lezer/common/dist/index.js"() {
      DefaultBufferLength = 1024;
      nextPropID = 0;
      Range2 = class {
        constructor(from, to) {
          this.from = from;
          this.to = to;
        }
      };
      NodeProp = class {
        /**
        Create a new node prop type.
        */
        constructor(config = {}) {
          this.id = nextPropID++;
          this.perNode = !!config.perNode;
          this.deserialize = config.deserialize || (() => {
            throw new Error("This node type doesn't define a deserialize function");
          });
          this.combine = config.combine || null;
        }
        /**
        This is meant to be used with
        [`NodeSet.extend`](#common.NodeSet.extend) or
        [`LRParser.configure`](#lr.ParserConfig.props) to compute
        prop values for each node type in the set. Takes a [match
        object](#common.NodeType^match) or function that returns undefined
        if the node type doesn't get this prop, and the prop's value if
        it does.
        */
        add(match) {
          if (this.perNode)
            throw new RangeError("Can't add per-node props to node types");
          if (typeof match != "function")
            match = NodeType.match(match);
          return (type) => {
            let result = match(type);
            return result === void 0 ? null : [this, result];
          };
        }
      };
      NodeProp.closedBy = new NodeProp({ deserialize: (str) => str.split(" ") });
      NodeProp.openedBy = new NodeProp({ deserialize: (str) => str.split(" ") });
      NodeProp.group = new NodeProp({ deserialize: (str) => str.split(" ") });
      NodeProp.isolate = new NodeProp({ deserialize: (value) => {
        if (value && value != "rtl" && value != "ltr" && value != "auto")
          throw new RangeError("Invalid value for isolate: " + value);
        return value || "auto";
      } });
      NodeProp.contextHash = new NodeProp({ perNode: true });
      NodeProp.lookAhead = new NodeProp({ perNode: true });
      NodeProp.mounted = new NodeProp({ perNode: true });
      MountedTree = class {
        constructor(tree, overlay, parser4, bracketed2 = false) {
          this.tree = tree;
          this.overlay = overlay;
          this.parser = parser4;
          this.bracketed = bracketed2;
        }
        /**
        @internal
        */
        static get(tree) {
          return tree && tree.props && tree.props[NodeProp.mounted.id];
        }
      };
      noProps = /* @__PURE__ */ Object.create(null);
      NodeType = class _NodeType {
        /**
        @internal
        */
        constructor(name2, props, id2, flags = 0) {
          this.name = name2;
          this.props = props;
          this.id = id2;
          this.flags = flags;
        }
        /**
        Define a node type.
        */
        static define(spec) {
          let props = spec.props && spec.props.length ? /* @__PURE__ */ Object.create(null) : noProps;
          let flags = (spec.top ? 1 : 0) | (spec.skipped ? 2 : 0) | (spec.error ? 4 : 0) | (spec.name == null ? 8 : 0);
          let type = new _NodeType(spec.name || "", props, spec.id, flags);
          if (spec.props)
            for (let src of spec.props) {
              if (!Array.isArray(src))
                src = src(type);
              if (src) {
                if (src[0].perNode)
                  throw new RangeError("Can't store a per-node prop on a node type");
                props[src[0].id] = src[1];
              }
            }
          return type;
        }
        /**
        Retrieves a node prop for this type. Will return `undefined` if
        the prop isn't present on this node.
        */
        prop(prop) {
          return this.props[prop.id];
        }
        /**
        True when this is the top node of a grammar.
        */
        get isTop() {
          return (this.flags & 1) > 0;
        }
        /**
        True when this node is produced by a skip rule.
        */
        get isSkipped() {
          return (this.flags & 2) > 0;
        }
        /**
        Indicates whether this is an error node.
        */
        get isError() {
          return (this.flags & 4) > 0;
        }
        /**
        When true, this node type doesn't correspond to a user-declared
        named node, for example because it is used to cache repetition.
        */
        get isAnonymous() {
          return (this.flags & 8) > 0;
        }
        /**
        Returns true when this node's name or one of its
        [groups](#common.NodeProp^group) matches the given string.
        */
        is(name2) {
          if (typeof name2 == "string") {
            if (this.name == name2)
              return true;
            let group = this.prop(NodeProp.group);
            return group ? group.indexOf(name2) > -1 : false;
          }
          return this.id == name2;
        }
        /**
        Create a function from node types to arbitrary values by
        specifying an object whose property names are node or
        [group](#common.NodeProp^group) names. Often useful with
        [`NodeProp.add`](#common.NodeProp.add). You can put multiple
        names, separated by spaces, in a single property name to map
        multiple node names to a single value.
        */
        static match(map) {
          let direct = /* @__PURE__ */ Object.create(null);
          for (let prop in map)
            for (let name2 of prop.split(" "))
              direct[name2] = map[prop];
          return (node) => {
            for (let groups = node.prop(NodeProp.group), i2 = -1; i2 < (groups ? groups.length : 0); i2++) {
              let found = direct[i2 < 0 ? node.name : groups[i2]];
              if (found)
                return found;
            }
          };
        }
      };
      NodeType.none = new NodeType(
        "",
        /* @__PURE__ */ Object.create(null),
        0,
        8
        /* NodeFlag.Anonymous */
      );
      NodeSet = class _NodeSet {
        /**
        Create a set with the given types. The `id` property of each
        type should correspond to its position within the array.
        */
        constructor(types2) {
          this.types = types2;
          for (let i2 = 0; i2 < types2.length; i2++)
            if (types2[i2].id != i2)
              throw new RangeError("Node type ids should correspond to array positions when creating a node set");
        }
        /**
        Create a copy of this set with some node properties added. The
        arguments to this method can be created with
        [`NodeProp.add`](#common.NodeProp.add).
        */
        extend(...props) {
          let newTypes = [];
          for (let type of this.types) {
            let newProps = null;
            for (let source of props) {
              let add = source(type);
              if (add) {
                if (!newProps)
                  newProps = Object.assign({}, type.props);
                let value = add[1], prop = add[0];
                if (prop.combine && prop.id in newProps)
                  value = prop.combine(newProps[prop.id], value);
                newProps[prop.id] = value;
              }
            }
            newTypes.push(newProps ? new NodeType(type.name, newProps, type.id, type.flags) : type);
          }
          return new _NodeSet(newTypes);
        }
      };
      CachedNode = /* @__PURE__ */ new WeakMap();
      CachedInnerNode = /* @__PURE__ */ new WeakMap();
      (function(IterMode2) {
        IterMode2[IterMode2["ExcludeBuffers"] = 1] = "ExcludeBuffers";
        IterMode2[IterMode2["IncludeAnonymous"] = 2] = "IncludeAnonymous";
        IterMode2[IterMode2["IgnoreMounts"] = 4] = "IgnoreMounts";
        IterMode2[IterMode2["IgnoreOverlays"] = 8] = "IgnoreOverlays";
        IterMode2[IterMode2["EnterBracketed"] = 16] = "EnterBracketed";
      })(IterMode || (IterMode = {}));
      Tree = class _Tree {
        /**
        Construct a new tree. See also [`Tree.build`](#common.Tree^build).
        */
        constructor(type, children, positions, length, props) {
          this.type = type;
          this.children = children;
          this.positions = positions;
          this.length = length;
          this.props = null;
          if (props && props.length) {
            this.props = /* @__PURE__ */ Object.create(null);
            for (let [prop, value] of props)
              this.props[typeof prop == "number" ? prop : prop.id] = value;
          }
        }
        /**
        @internal
        */
        toString() {
          let mounted = MountedTree.get(this);
          if (mounted && !mounted.overlay)
            return mounted.tree.toString();
          let children = "";
          for (let ch of this.children) {
            let str = ch.toString();
            if (str) {
              if (children)
                children += ",";
              children += str;
            }
          }
          return !this.type.name ? children : (/\W/.test(this.type.name) && !this.type.isError ? JSON.stringify(this.type.name) : this.type.name) + (children.length ? "(" + children + ")" : "");
        }
        /**
        Get a [tree cursor](#common.TreeCursor) positioned at the top of
        the tree. Mode can be used to [control](#common.IterMode) which
        nodes the cursor visits.
        */
        cursor(mode = 0) {
          return new TreeCursor(this.topNode, mode);
        }
        /**
        Get a [tree cursor](#common.TreeCursor) pointing into this tree
        at the given position and side (see
        [`moveTo`](#common.TreeCursor.moveTo).
        */
        cursorAt(pos, side = 0, mode = 0) {
          let scope = CachedNode.get(this) || this.topNode;
          let cursor = new TreeCursor(scope);
          cursor.moveTo(pos, side);
          CachedNode.set(this, cursor._tree);
          return cursor;
        }
        /**
        Get a [syntax node](#common.SyntaxNode) object for the top of the
        tree.
        */
        get topNode() {
          return new TreeNode(this, 0, 0, null);
        }
        /**
        Get the [syntax node](#common.SyntaxNode) at the given position.
        If `side` is -1, this will move into nodes that end at the
        position. If 1, it'll move into nodes that start at the
        position. With 0, it'll only enter nodes that cover the position
        from both sides.
        
        Note that this will not enter
        [overlays](#common.MountedTree.overlay), and you often want
        [`resolveInner`](#common.Tree.resolveInner) instead.
        */
        resolve(pos, side = 0) {
          let node = resolveNode(CachedNode.get(this) || this.topNode, pos, side, false);
          CachedNode.set(this, node);
          return node;
        }
        /**
        Like [`resolve`](#common.Tree.resolve), but will enter
        [overlaid](#common.MountedTree.overlay) nodes, producing a syntax node
        pointing into the innermost overlaid tree at the given position
        (with parent links going through all parent structure, including
        the host trees).
        */
        resolveInner(pos, side = 0) {
          let node = resolveNode(CachedInnerNode.get(this) || this.topNode, pos, side, true);
          CachedInnerNode.set(this, node);
          return node;
        }
        /**
        In some situations, it can be useful to iterate through all
        nodes around a position, including those in overlays that don't
        directly cover the position. This method gives you an iterator
        that will produce all nodes, from small to big, around the given
        position.
        */
        resolveStack(pos, side = 0) {
          return stackIterator(this, pos, side);
        }
        /**
        Iterate over the tree and its children, calling `enter` for any
        node that touches the `from`/`to` region (if given) before
        running over such a node's children, and `leave` (if given) when
        leaving the node. When `enter` returns `false`, that node will
        not have its children iterated over (or `leave` called).
        */
        iterate(spec) {
          let { enter, leave, from = 0, to = this.length } = spec;
          let mode = spec.mode || 0, anon = (mode & IterMode.IncludeAnonymous) > 0;
          for (let c = this.cursor(mode | IterMode.IncludeAnonymous); ; ) {
            let entered = false;
            if (c.from <= to && c.to >= from && (!anon && c.type.isAnonymous || enter(c) !== false)) {
              if (c.firstChild())
                continue;
              entered = true;
            }
            for (; ; ) {
              if (entered && leave && (anon || !c.type.isAnonymous))
                leave(c);
              if (c.nextSibling())
                break;
              if (!c.parent())
                return;
              entered = true;
            }
          }
        }
        /**
        Get the value of the given [node prop](#common.NodeProp) for this
        node. Works with both per-node and per-type props.
        */
        prop(prop) {
          return !prop.perNode ? this.type.prop(prop) : this.props ? this.props[prop.id] : void 0;
        }
        /**
        Returns the node's [per-node props](#common.NodeProp.perNode) in a
        format that can be passed to the [`Tree`](#common.Tree)
        constructor.
        */
        get propValues() {
          let result = [];
          if (this.props)
            for (let id2 in this.props)
              result.push([+id2, this.props[id2]]);
          return result;
        }
        /**
        Balance the direct children of this tree, producing a copy of
        which may have children grouped into subtrees with type
        [`NodeType.none`](#common.NodeType^none).
        */
        balance(config = {}) {
          return this.children.length <= 8 ? this : balanceRange(NodeType.none, this.children, this.positions, 0, this.children.length, 0, this.length, (children, positions, length) => new _Tree(this.type, children, positions, length, this.propValues), config.makeTree || ((children, positions, length) => new _Tree(NodeType.none, children, positions, length)));
        }
        /**
        Build a tree from a postfix-ordered buffer of node information,
        or a cursor over such a buffer.
        */
        static build(data) {
          return buildTree(data);
        }
      };
      Tree.empty = new Tree(NodeType.none, [], [], 0);
      FlatBufferCursor = class _FlatBufferCursor {
        constructor(buffer, index) {
          this.buffer = buffer;
          this.index = index;
        }
        get id() {
          return this.buffer[this.index - 4];
        }
        get start() {
          return this.buffer[this.index - 3];
        }
        get end() {
          return this.buffer[this.index - 2];
        }
        get size() {
          return this.buffer[this.index - 1];
        }
        get pos() {
          return this.index;
        }
        next() {
          this.index -= 4;
        }
        fork() {
          return new _FlatBufferCursor(this.buffer, this.index);
        }
      };
      TreeBuffer = class _TreeBuffer {
        /**
        Create a tree buffer.
        */
        constructor(buffer, length, set) {
          this.buffer = buffer;
          this.length = length;
          this.set = set;
        }
        /**
        @internal
        */
        get type() {
          return NodeType.none;
        }
        /**
        @internal
        */
        toString() {
          let result = [];
          for (let index = 0; index < this.buffer.length; ) {
            result.push(this.childString(index));
            index = this.buffer[index + 3];
          }
          return result.join(",");
        }
        /**
        @internal
        */
        childString(index) {
          let id2 = this.buffer[index], endIndex = this.buffer[index + 3];
          let type = this.set.types[id2], result = type.name;
          if (/\W/.test(result) && !type.isError)
            result = JSON.stringify(result);
          index += 4;
          if (endIndex == index)
            return result;
          let children = [];
          while (index < endIndex) {
            children.push(this.childString(index));
            index = this.buffer[index + 3];
          }
          return result + "(" + children.join(",") + ")";
        }
        /**
        @internal
        */
        findChild(startIndex, endIndex, dir, pos, side) {
          let { buffer } = this, pick = -1;
          for (let i2 = startIndex; i2 != endIndex; i2 = buffer[i2 + 3]) {
            if (checkSide(side, pos, buffer[i2 + 1], buffer[i2 + 2])) {
              pick = i2;
              if (dir > 0)
                break;
            }
          }
          return pick;
        }
        /**
        @internal
        */
        slice(startI, endI, from) {
          let b = this.buffer;
          let copy = new Uint16Array(endI - startI), len = 0;
          for (let i2 = startI, j = 0; i2 < endI; ) {
            copy[j++] = b[i2++];
            copy[j++] = b[i2++] - from;
            let to = copy[j++] = b[i2++] - from;
            copy[j++] = b[i2++] - startI;
            len = Math.max(len, to);
          }
          return new _TreeBuffer(copy, len, this.set);
        }
      };
      BaseNode = class {
        cursor(mode = 0) {
          return new TreeCursor(this, mode);
        }
        getChild(type, before = null, after = null) {
          let r = getChildren(this, type, before, after);
          return r.length ? r[0] : null;
        }
        getChildren(type, before = null, after = null) {
          return getChildren(this, type, before, after);
        }
        resolve(pos, side = 0) {
          return resolveNode(this, pos, side, false);
        }
        resolveInner(pos, side = 0) {
          return resolveNode(this, pos, side, true);
        }
        matchContext(context) {
          return matchNodeContext(this.parent, context);
        }
        enterUnfinishedNodesBefore(pos) {
          let scan = this.childBefore(pos), node = this;
          while (scan) {
            let last2 = scan.lastChild;
            if (!last2 || last2.to != scan.to)
              break;
            if (last2.type.isError && last2.from == last2.to) {
              node = scan;
              scan = last2.prevSibling;
            } else {
              scan = last2;
            }
          }
          return node;
        }
        get node() {
          return this;
        }
        get next() {
          return this.parent;
        }
      };
      TreeNode = class _TreeNode extends BaseNode {
        constructor(_tree, from, index, _parent) {
          super();
          this._tree = _tree;
          this.from = from;
          this.index = index;
          this._parent = _parent;
        }
        get type() {
          return this._tree.type;
        }
        get name() {
          return this._tree.type.name;
        }
        get to() {
          return this.from + this._tree.length;
        }
        nextChild(i2, dir, pos, side, mode = 0) {
          for (let parent = this; ; ) {
            for (let { children, positions } = parent._tree, e = dir > 0 ? children.length : -1; i2 != e; i2 += dir) {
              let next = children[i2], start = positions[i2] + parent.from, mounted;
              if (!(mode & IterMode.EnterBracketed && next instanceof Tree && (mounted = MountedTree.get(next)) && !mounted.overlay && mounted.bracketed && pos >= start && pos <= start + next.length) && !checkSide(side, pos, start, start + next.length))
                continue;
              if (next instanceof TreeBuffer) {
                if (mode & IterMode.ExcludeBuffers)
                  continue;
                let index = next.findChild(0, next.buffer.length, dir, pos - start, side);
                if (index > -1)
                  return new BufferNode(new BufferContext(parent, next, i2, start), null, index);
              } else if (mode & IterMode.IncludeAnonymous || (!next.type.isAnonymous || hasChild(next))) {
                let mounted2;
                if (!(mode & IterMode.IgnoreMounts) && (mounted2 = MountedTree.get(next)) && !mounted2.overlay)
                  return new _TreeNode(mounted2.tree, start, i2, parent);
                let inner = new _TreeNode(next, start, i2, parent);
                return mode & IterMode.IncludeAnonymous || !inner.type.isAnonymous ? inner : inner.nextChild(dir < 0 ? next.children.length - 1 : 0, dir, pos, side, mode);
              }
            }
            if (mode & IterMode.IncludeAnonymous || !parent.type.isAnonymous)
              return null;
            if (parent.index >= 0)
              i2 = parent.index + dir;
            else
              i2 = dir < 0 ? -1 : parent._parent._tree.children.length;
            parent = parent._parent;
            if (!parent)
              return null;
          }
        }
        get firstChild() {
          return this.nextChild(
            0,
            1,
            0,
            4
            /* Side.DontCare */
          );
        }
        get lastChild() {
          return this.nextChild(
            this._tree.children.length - 1,
            -1,
            0,
            4
            /* Side.DontCare */
          );
        }
        childAfter(pos) {
          return this.nextChild(
            0,
            1,
            pos,
            2
            /* Side.After */
          );
        }
        childBefore(pos) {
          return this.nextChild(
            this._tree.children.length - 1,
            -1,
            pos,
            -2
            /* Side.Before */
          );
        }
        prop(prop) {
          return this._tree.prop(prop);
        }
        enter(pos, side, mode = 0) {
          let mounted;
          if (!(mode & IterMode.IgnoreOverlays) && (mounted = MountedTree.get(this._tree)) && mounted.overlay) {
            let rPos = pos - this.from, enterBracketed = mode & IterMode.EnterBracketed && mounted.bracketed;
            for (let { from, to } of mounted.overlay) {
              if ((side > 0 || enterBracketed ? from <= rPos : from < rPos) && (side < 0 || enterBracketed ? to >= rPos : to > rPos))
                return new _TreeNode(mounted.tree, mounted.overlay[0].from + this.from, -1, this);
            }
          }
          return this.nextChild(0, 1, pos, side, mode);
        }
        nextSignificantParent() {
          let val = this;
          while (val.type.isAnonymous && val._parent)
            val = val._parent;
          return val;
        }
        get parent() {
          return this._parent ? this._parent.nextSignificantParent() : null;
        }
        get nextSibling() {
          return this._parent && this.index >= 0 ? this._parent.nextChild(
            this.index + 1,
            1,
            0,
            4
            /* Side.DontCare */
          ) : null;
        }
        get prevSibling() {
          return this._parent && this.index >= 0 ? this._parent.nextChild(
            this.index - 1,
            -1,
            0,
            4
            /* Side.DontCare */
          ) : null;
        }
        get tree() {
          return this._tree;
        }
        toTree() {
          return this._tree;
        }
        /**
        @internal
        */
        toString() {
          return this._tree.toString();
        }
      };
      BufferContext = class {
        constructor(parent, buffer, index, start) {
          this.parent = parent;
          this.buffer = buffer;
          this.index = index;
          this.start = start;
        }
      };
      BufferNode = class _BufferNode extends BaseNode {
        get name() {
          return this.type.name;
        }
        get from() {
          return this.context.start + this.context.buffer.buffer[this.index + 1];
        }
        get to() {
          return this.context.start + this.context.buffer.buffer[this.index + 2];
        }
        constructor(context, _parent, index) {
          super();
          this.context = context;
          this._parent = _parent;
          this.index = index;
          this.type = context.buffer.set.types[context.buffer.buffer[index]];
        }
        child(dir, pos, side) {
          let { buffer } = this.context;
          let index = buffer.findChild(this.index + 4, buffer.buffer[this.index + 3], dir, pos - this.context.start, side);
          return index < 0 ? null : new _BufferNode(this.context, this, index);
        }
        get firstChild() {
          return this.child(
            1,
            0,
            4
            /* Side.DontCare */
          );
        }
        get lastChild() {
          return this.child(
            -1,
            0,
            4
            /* Side.DontCare */
          );
        }
        childAfter(pos) {
          return this.child(
            1,
            pos,
            2
            /* Side.After */
          );
        }
        childBefore(pos) {
          return this.child(
            -1,
            pos,
            -2
            /* Side.Before */
          );
        }
        prop(prop) {
          return this.type.prop(prop);
        }
        enter(pos, side, mode = 0) {
          if (mode & IterMode.ExcludeBuffers)
            return null;
          let { buffer } = this.context;
          let index = buffer.findChild(this.index + 4, buffer.buffer[this.index + 3], side > 0 ? 1 : -1, pos - this.context.start, side);
          return index < 0 ? null : new _BufferNode(this.context, this, index);
        }
        get parent() {
          return this._parent || this.context.parent.nextSignificantParent();
        }
        externalSibling(dir) {
          return this._parent ? null : this.context.parent.nextChild(
            this.context.index + dir,
            dir,
            0,
            4
            /* Side.DontCare */
          );
        }
        get nextSibling() {
          let { buffer } = this.context;
          let after = buffer.buffer[this.index + 3];
          if (after < (this._parent ? buffer.buffer[this._parent.index + 3] : buffer.buffer.length))
            return new _BufferNode(this.context, this._parent, after);
          return this.externalSibling(1);
        }
        get prevSibling() {
          let { buffer } = this.context;
          let parentStart = this._parent ? this._parent.index + 4 : 0;
          if (this.index == parentStart)
            return this.externalSibling(-1);
          return new _BufferNode(this.context, this._parent, buffer.findChild(
            parentStart,
            this.index,
            -1,
            0,
            4
            /* Side.DontCare */
          ));
        }
        get tree() {
          return null;
        }
        toTree() {
          let children = [], positions = [];
          let { buffer } = this.context;
          let startI = this.index + 4, endI = buffer.buffer[this.index + 3];
          if (endI > startI) {
            let from = buffer.buffer[this.index + 1];
            children.push(buffer.slice(startI, endI, from));
            positions.push(0);
          }
          return new Tree(this.type, children, positions, this.to - this.from);
        }
        /**
        @internal
        */
        toString() {
          return this.context.buffer.childString(this.index);
        }
      };
      StackIterator = class {
        constructor(heads, node) {
          this.heads = heads;
          this.node = node;
        }
        get next() {
          return iterStack(this.heads);
        }
      };
      TreeCursor = class {
        /**
        Shorthand for `.type.name`.
        */
        get name() {
          return this.type.name;
        }
        /**
        @internal
        */
        constructor(node, mode = 0) {
          this.buffer = null;
          this.stack = [];
          this.index = 0;
          this.bufferNode = null;
          this.mode = mode & ~IterMode.EnterBracketed;
          if (node instanceof TreeNode) {
            this.yieldNode(node);
          } else {
            this._tree = node.context.parent;
            this.buffer = node.context;
            for (let n = node._parent; n; n = n._parent)
              this.stack.unshift(n.index);
            this.bufferNode = node;
            this.yieldBuf(node.index);
          }
        }
        yieldNode(node) {
          if (!node)
            return false;
          this._tree = node;
          this.type = node.type;
          this.from = node.from;
          this.to = node.to;
          return true;
        }
        yieldBuf(index, type) {
          this.index = index;
          let { start, buffer } = this.buffer;
          this.type = type || buffer.set.types[buffer.buffer[index]];
          this.from = start + buffer.buffer[index + 1];
          this.to = start + buffer.buffer[index + 2];
          return true;
        }
        /**
        @internal
        */
        yield(node) {
          if (!node)
            return false;
          if (node instanceof TreeNode) {
            this.buffer = null;
            return this.yieldNode(node);
          }
          this.buffer = node.context;
          return this.yieldBuf(node.index, node.type);
        }
        /**
        @internal
        */
        toString() {
          return this.buffer ? this.buffer.buffer.childString(this.index) : this._tree.toString();
        }
        /**
        @internal
        */
        enterChild(dir, pos, side) {
          if (!this.buffer)
            return this.yield(this._tree.nextChild(dir < 0 ? this._tree._tree.children.length - 1 : 0, dir, pos, side, this.mode));
          let { buffer } = this.buffer;
          let index = buffer.findChild(this.index + 4, buffer.buffer[this.index + 3], dir, pos - this.buffer.start, side);
          if (index < 0)
            return false;
          this.stack.push(this.index);
          return this.yieldBuf(index);
        }
        /**
        Move the cursor to this node's first child. When this returns
        false, the node has no child, and the cursor has not been moved.
        */
        firstChild() {
          return this.enterChild(
            1,
            0,
            4
            /* Side.DontCare */
          );
        }
        /**
        Move the cursor to this node's last child.
        */
        lastChild() {
          return this.enterChild(
            -1,
            0,
            4
            /* Side.DontCare */
          );
        }
        /**
        Move the cursor to the first child that ends after `pos`.
        */
        childAfter(pos) {
          return this.enterChild(
            1,
            pos,
            2
            /* Side.After */
          );
        }
        /**
        Move to the last child that starts before `pos`.
        */
        childBefore(pos) {
          return this.enterChild(
            -1,
            pos,
            -2
            /* Side.Before */
          );
        }
        /**
        Move the cursor to the child around `pos`. If side is -1 the
        child may end at that position, when 1 it may start there. This
        will also enter [overlaid](#common.MountedTree.overlay)
        [mounted](#common.NodeProp^mounted) trees unless `overlays` is
        set to false.
        */
        enter(pos, side, mode = this.mode) {
          if (!this.buffer)
            return this.yield(this._tree.enter(pos, side, mode));
          return mode & IterMode.ExcludeBuffers ? false : this.enterChild(1, pos, side);
        }
        /**
        Move to the node's parent node, if this isn't the top node.
        */
        parent() {
          if (!this.buffer)
            return this.yieldNode(this.mode & IterMode.IncludeAnonymous ? this._tree._parent : this._tree.parent);
          if (this.stack.length)
            return this.yieldBuf(this.stack.pop());
          let parent = this.mode & IterMode.IncludeAnonymous ? this.buffer.parent : this.buffer.parent.nextSignificantParent();
          this.buffer = null;
          return this.yieldNode(parent);
        }
        /**
        @internal
        */
        sibling(dir) {
          if (!this.buffer)
            return !this._tree._parent ? false : this.yield(this._tree.index < 0 ? null : this._tree._parent.nextChild(this._tree.index + dir, dir, 0, 4, this.mode));
          let { buffer } = this.buffer, d = this.stack.length - 1;
          if (dir < 0) {
            let parentStart = d < 0 ? 0 : this.stack[d] + 4;
            if (this.index != parentStart)
              return this.yieldBuf(buffer.findChild(
                parentStart,
                this.index,
                -1,
                0,
                4
                /* Side.DontCare */
              ));
          } else {
            let after = buffer.buffer[this.index + 3];
            if (after < (d < 0 ? buffer.buffer.length : buffer.buffer[this.stack[d] + 3]))
              return this.yieldBuf(after);
          }
          return d < 0 ? this.yield(this.buffer.parent.nextChild(this.buffer.index + dir, dir, 0, 4, this.mode)) : false;
        }
        /**
        Move to this node's next sibling, if any.
        */
        nextSibling() {
          return this.sibling(1);
        }
        /**
        Move to this node's previous sibling, if any.
        */
        prevSibling() {
          return this.sibling(-1);
        }
        atLastNode(dir) {
          let index, parent, { buffer } = this;
          if (buffer) {
            if (dir > 0) {
              if (this.index < buffer.buffer.buffer.length)
                return false;
            } else {
              for (let i2 = 0; i2 < this.index; i2++)
                if (buffer.buffer.buffer[i2 + 3] < this.index)
                  return false;
            }
            ({ index, parent } = buffer);
          } else {
            ({ index, _parent: parent } = this._tree);
          }
          for (; parent; { index, _parent: parent } = parent) {
            if (index > -1)
              for (let i2 = index + dir, e = dir < 0 ? -1 : parent._tree.children.length; i2 != e; i2 += dir) {
                let child = parent._tree.children[i2];
                if (this.mode & IterMode.IncludeAnonymous || child instanceof TreeBuffer || !child.type.isAnonymous || hasChild(child))
                  return false;
              }
          }
          return true;
        }
        move(dir, enter) {
          if (enter && this.enterChild(
            dir,
            0,
            4
            /* Side.DontCare */
          ))
            return true;
          for (; ; ) {
            if (this.sibling(dir))
              return true;
            if (this.atLastNode(dir) || !this.parent())
              return false;
          }
        }
        /**
        Move to the next node in a
        [pre-order](https://en.wikipedia.org/wiki/Tree_traversal#Pre-order,_NLR)
        traversal, going from a node to its first child or, if the
        current node is empty or `enter` is false, its next sibling or
        the next sibling of the first parent node that has one.
        */
        next(enter = true) {
          return this.move(1, enter);
        }
        /**
        Move to the next node in a last-to-first pre-order traversal. A
        node is followed by its last child or, if it has none, its
        previous sibling or the previous sibling of the first parent
        node that has one.
        */
        prev(enter = true) {
          return this.move(-1, enter);
        }
        /**
        Move the cursor to the innermost node that covers `pos`. If
        `side` is -1, it will enter nodes that end at `pos`. If it is 1,
        it will enter nodes that start at `pos`.
        */
        moveTo(pos, side = 0) {
          while (this.from == this.to || (side < 1 ? this.from >= pos : this.from > pos) || (side > -1 ? this.to <= pos : this.to < pos))
            if (!this.parent())
              break;
          while (this.enterChild(1, pos, side)) {
          }
          return this;
        }
        /**
        Get a [syntax node](#common.SyntaxNode) at the cursor's current
        position.
        */
        get node() {
          if (!this.buffer)
            return this._tree;
          let cache2 = this.bufferNode, result = null, depth = 0;
          if (cache2 && cache2.context == this.buffer) {
            scan: for (let index = this.index, d = this.stack.length; d >= 0; ) {
              for (let c = cache2; c; c = c._parent)
                if (c.index == index) {
                  if (index == this.index)
                    return c;
                  result = c;
                  depth = d + 1;
                  break scan;
                }
              index = this.stack[--d];
            }
          }
          for (let i2 = depth; i2 < this.stack.length; i2++)
            result = new BufferNode(this.buffer, result, this.stack[i2]);
          return this.bufferNode = new BufferNode(this.buffer, result, this.index);
        }
        /**
        Get the [tree](#common.Tree) that represents the current node, if
        any. Will return null when the node is in a [tree
        buffer](#common.TreeBuffer).
        */
        get tree() {
          return this.buffer ? null : this._tree._tree;
        }
        /**
        Iterate over the current node and all its descendants, calling
        `enter` when entering a node and `leave`, if given, when leaving
        one. When `enter` returns `false`, any children of that node are
        skipped, and `leave` isn't called for it.
        */
        iterate(enter, leave) {
          for (let depth = 0; ; ) {
            let mustLeave = false;
            if (this.type.isAnonymous || enter(this) !== false) {
              if (this.firstChild()) {
                depth++;
                continue;
              }
              if (!this.type.isAnonymous)
                mustLeave = true;
            }
            for (; ; ) {
              if (mustLeave && leave)
                leave(this);
              mustLeave = this.type.isAnonymous;
              if (!depth)
                return;
              if (this.nextSibling())
                break;
              this.parent();
              depth--;
              mustLeave = true;
            }
          }
        }
        /**
        Test whether the current node matches a given context—a sequence
        of direct parent node names. Empty strings in the context array
        are treated as wildcards.
        */
        matchContext(context) {
          if (!this.buffer)
            return matchNodeContext(this.node.parent, context);
          let { buffer } = this.buffer, { types: types2 } = buffer.set;
          for (let i2 = context.length - 1, d = this.stack.length - 1; i2 >= 0; d--) {
            if (d < 0)
              return matchNodeContext(this._tree, context, i2);
            let type = types2[buffer.buffer[this.stack[d]]];
            if (!type.isAnonymous) {
              if (context[i2] && context[i2] != type.name)
                return false;
              i2--;
            }
          }
          return true;
        }
      };
      nodeSizeCache = /* @__PURE__ */ new WeakMap();
      NodeWeakMap = class {
        constructor() {
          this.map = /* @__PURE__ */ new WeakMap();
        }
        setBuffer(buffer, index, value) {
          let inner = this.map.get(buffer);
          if (!inner)
            this.map.set(buffer, inner = /* @__PURE__ */ new Map());
          inner.set(index, value);
        }
        getBuffer(buffer, index) {
          let inner = this.map.get(buffer);
          return inner && inner.get(index);
        }
        /**
        Set the value for this syntax node.
        */
        set(node, value) {
          if (node instanceof BufferNode)
            this.setBuffer(node.context.buffer, node.index, value);
          else if (node instanceof TreeNode)
            this.map.set(node.tree, value);
        }
        /**
        Retrieve value for this syntax node, if it exists in the map.
        */
        get(node) {
          return node instanceof BufferNode ? this.getBuffer(node.context.buffer, node.index) : node instanceof TreeNode ? this.map.get(node.tree) : void 0;
        }
        /**
        Set the value for the node that a cursor currently points to.
        */
        cursorSet(cursor, value) {
          if (cursor.buffer)
            this.setBuffer(cursor.buffer.buffer, cursor.index, value);
          else
            this.map.set(cursor.tree, value);
        }
        /**
        Retrieve the value for the node that a cursor currently points
        to.
        */
        cursorGet(cursor) {
          return cursor.buffer ? this.getBuffer(cursor.buffer.buffer, cursor.index) : this.map.get(cursor.tree);
        }
      };
      TreeFragment = class _TreeFragment {
        /**
        Construct a tree fragment. You'll usually want to use
        [`addTree`](#common.TreeFragment^addTree) and
        [`applyChanges`](#common.TreeFragment^applyChanges) instead of
        calling this directly.
        */
        constructor(from, to, tree, offset, openStart = false, openEnd = false) {
          this.from = from;
          this.to = to;
          this.tree = tree;
          this.offset = offset;
          this.open = (openStart ? 1 : 0) | (openEnd ? 2 : 0);
        }
        /**
        Whether the start of the fragment represents the start of a
        parse, or the end of a change. (In the second case, it may not
        be safe to reuse some nodes at the start, depending on the
        parsing algorithm.)
        */
        get openStart() {
          return (this.open & 1) > 0;
        }
        /**
        Whether the end of the fragment represents the end of a
        full-document parse, or the start of a change.
        */
        get openEnd() {
          return (this.open & 2) > 0;
        }
        /**
        Create a set of fragments from a freshly parsed tree, or update
        an existing set of fragments by replacing the ones that overlap
        with a tree with content from the new tree. When `partial` is
        true, the parse is treated as incomplete, and the resulting
        fragment has [`openEnd`](#common.TreeFragment.openEnd) set to
        true.
        */
        static addTree(tree, fragments = [], partial = false) {
          let result = [new _TreeFragment(0, tree.length, tree, 0, false, partial)];
          for (let f of fragments)
            if (f.to > tree.length)
              result.push(f);
          return result;
        }
        /**
        Apply a set of edits to an array of fragments, removing or
        splitting fragments as necessary to remove edited ranges, and
        adjusting offsets for fragments that moved.
        */
        static applyChanges(fragments, changes, minGap = 128) {
          if (!changes.length)
            return fragments;
          let result = [];
          let fI = 1, nextF = fragments.length ? fragments[0] : null;
          for (let cI = 0, pos = 0, off = 0; ; cI++) {
            let nextC = cI < changes.length ? changes[cI] : null;
            let nextPos = nextC ? nextC.fromA : 1e9;
            if (nextPos - pos >= minGap)
              while (nextF && nextF.from < nextPos) {
                let cut = nextF;
                if (pos >= cut.from || nextPos <= cut.to || off) {
                  let fFrom = Math.max(cut.from, pos) - off, fTo = Math.min(cut.to, nextPos) - off;
                  cut = fFrom >= fTo ? null : new _TreeFragment(fFrom, fTo, cut.tree, cut.offset + off, cI > 0, !!nextC);
                }
                if (cut)
                  result.push(cut);
                if (nextF.to > nextPos)
                  break;
                nextF = fI < fragments.length ? fragments[fI++] : null;
              }
            if (!nextC)
              break;
            pos = nextC.toA;
            off = nextC.toA - nextC.toB;
          }
          return result;
        }
      };
      Parser = class {
        /**
        Start a parse, returning a [partial parse](#common.PartialParse)
        object. [`fragments`](#common.TreeFragment) can be passed in to
        make the parse incremental.
        
        By default, the entire input is parsed. You can pass `ranges`,
        which should be a sorted array of non-empty, non-overlapping
        ranges, to parse only those ranges. The tree returned in that
        case will start at `ranges[0].from`.
        */
        startParse(input, fragments, ranges) {
          if (typeof input == "string")
            input = new StringInput(input);
          ranges = !ranges ? [new Range2(0, input.length)] : ranges.length ? ranges.map((r) => new Range2(r.from, r.to)) : [new Range2(0, 0)];
          return this.createParse(input, fragments || [], ranges);
        }
        /**
        Run a full parse, returning the resulting tree.
        */
        parse(input, fragments, ranges) {
          let parse = this.startParse(input, fragments, ranges);
          for (; ; ) {
            let done = parse.advance();
            if (done)
              return done;
          }
        }
      };
      StringInput = class {
        constructor(string2) {
          this.string = string2;
        }
        get length() {
          return this.string.length;
        }
        chunk(from) {
          return this.string.slice(from);
        }
        get lineChunks() {
          return false;
        }
        read(from, to) {
          return this.string.slice(from, to);
        }
      };
      stoppedInner = new NodeProp({ perNode: true });
    }
  });

  // node_modules/@lezer/highlight/dist/index.js
  function sameArray2(a2, b) {
    return a2.length == b.length && a2.every((x, i2) => x == b[i2]);
  }
  function powerSet(array) {
    let sets = [[]];
    for (let i2 = 0; i2 < array.length; i2++) {
      for (let j = 0, e = sets.length; j < e; j++) {
        sets.push(sets[j].concat(array[i2]));
      }
    }
    return sets.sort((a2, b) => b.length - a2.length);
  }
  function styleTags(spec) {
    let byName = /* @__PURE__ */ Object.create(null);
    for (let prop in spec) {
      let tags2 = spec[prop];
      if (!Array.isArray(tags2))
        tags2 = [tags2];
      for (let part of prop.split(" "))
        if (part) {
          let pieces = [], mode = 2, rest = part;
          for (let pos = 0; ; ) {
            if (rest == "..." && pos > 0 && pos + 3 == part.length) {
              mode = 1;
              break;
            }
            let m = /^"(?:[^"\\]|\\.)*?"|[^\/!]+/.exec(rest);
            if (!m)
              throw new RangeError("Invalid path: " + part);
            pieces.push(m[0] == "*" ? "" : m[0][0] == '"' ? JSON.parse(m[0]) : m[0]);
            pos += m[0].length;
            if (pos == part.length)
              break;
            let next = part[pos++];
            if (pos == part.length && next == "!") {
              mode = 0;
              break;
            }
            if (next != "/")
              throw new RangeError("Invalid path: " + part);
            rest = part.slice(pos);
          }
          let last2 = pieces.length - 1, inner = pieces[last2];
          if (!inner)
            throw new RangeError("Invalid path: " + part);
          let rule = new Rule(tags2, mode, last2 > 0 ? pieces.slice(0, last2) : null);
          byName[inner] = rule.sort(byName[inner]);
        }
    }
    return ruleNodeProp.add(byName);
  }
  function tagHighlighter(tags2, options) {
    let map = /* @__PURE__ */ Object.create(null);
    for (let style of tags2) {
      if (!Array.isArray(style.tag))
        map[style.tag.id] = style.class;
      else
        for (let tag of style.tag)
          map[tag.id] = style.class;
    }
    let { scope, all = null } = options || {};
    return {
      style: (tags3) => {
        let cls = all;
        for (let tag of tags3) {
          for (let sub of tag.set) {
            let tagClass = map[sub.id];
            if (tagClass) {
              cls = cls ? cls + " " + tagClass : tagClass;
              break;
            }
          }
        }
        return cls;
      },
      scope
    };
  }
  function highlightTags(highlighters, tags2) {
    let result = null;
    for (let highlighter of highlighters) {
      let value = highlighter.style(tags2);
      if (value)
        result = result ? result + " " + value : value;
    }
    return result;
  }
  function highlightTree(tree, highlighter, putStyle, from = 0, to = tree.length) {
    let builder = new HighlightBuilder(from, Array.isArray(highlighter) ? highlighter : [highlighter], putStyle);
    builder.highlightRange(tree.cursor(), from, to, "", builder.highlighters);
    builder.flush(to);
  }
  function getStyleTags(node) {
    let rule = node.type.prop(ruleNodeProp);
    while (rule && rule.context && !node.matchContext(rule.context))
      rule = rule.next;
    return rule || null;
  }
  var nextTagID, Tag, nextModifierID, Modifier, ruleNodeProp, Rule, HighlightBuilder, t, comment, name, typeName, propertyName, literal, string, number, content, heading, keyword, operator, punctuation, bracket, meta, tags, classHighlighter;
  var init_dist4 = __esm({
    "node_modules/@lezer/highlight/dist/index.js"() {
      init_dist3();
      nextTagID = 0;
      Tag = class _Tag {
        /**
        @internal
        */
        constructor(name2, set, base2, modified) {
          this.name = name2;
          this.set = set;
          this.base = base2;
          this.modified = modified;
          this.id = nextTagID++;
        }
        toString() {
          let { name: name2 } = this;
          for (let mod of this.modified)
            if (mod.name)
              name2 = `${mod.name}(${name2})`;
          return name2;
        }
        static define(nameOrParent, parent) {
          let name2 = typeof nameOrParent == "string" ? nameOrParent : "?";
          if (nameOrParent instanceof _Tag)
            parent = nameOrParent;
          if (parent === null || parent === void 0 ? void 0 : parent.base)
            throw new Error("Can not derive from a modified tag");
          let tag = new _Tag(name2, [], null, []);
          tag.set.push(tag);
          if (parent)
            for (let t2 of parent.set)
              tag.set.push(t2);
          return tag;
        }
        /**
        Define a tag _modifier_, which is a function that, given a tag,
        will return a tag that is a subtag of the original. Applying the
        same modifier to a twice tag will return the same value (`m1(t1)
        == m1(t1)`) and applying multiple modifiers will, regardless or
        order, produce the same tag (`m1(m2(t1)) == m2(m1(t1))`).
        
        When multiple modifiers are applied to a given base tag, each
        smaller set of modifiers is registered as a parent, so that for
        example `m1(m2(m3(t1)))` is a subtype of `m1(m2(t1))`,
        `m1(m3(t1)`, and so on.
        */
        static defineModifier(name2) {
          let mod = new Modifier(name2);
          return (tag) => {
            if (tag.modified.indexOf(mod) > -1)
              return tag;
            return Modifier.get(tag.base || tag, tag.modified.concat(mod).sort((a2, b) => a2.id - b.id));
          };
        }
      };
      nextModifierID = 0;
      Modifier = class _Modifier {
        constructor(name2) {
          this.name = name2;
          this.instances = [];
          this.id = nextModifierID++;
        }
        static get(base2, mods) {
          if (!mods.length)
            return base2;
          let exists = mods[0].instances.find((t2) => t2.base == base2 && sameArray2(mods, t2.modified));
          if (exists)
            return exists;
          let set = [], tag = new Tag(base2.name, set, base2, mods);
          for (let m of mods)
            m.instances.push(tag);
          let configs = powerSet(mods);
          for (let parent of base2.set)
            if (!parent.modified.length)
              for (let config of configs)
                set.push(_Modifier.get(parent, config));
          return tag;
        }
      };
      ruleNodeProp = new NodeProp({
        combine(a2, b) {
          let cur, root, take;
          while (a2 || b) {
            if (!a2 || b && a2.depth < b.depth) {
              take = b;
              b = b.next;
            } else {
              take = a2;
              a2 = a2.next;
            }
            if (cur && cur.mode == take.mode && !take.context && !cur.context)
              continue;
            let copy = new Rule(take.tags, take.mode, take.context);
            if (cur)
              cur.next = copy;
            else
              root = copy;
            cur = copy;
          }
          return root;
        }
      });
      Rule = class {
        constructor(tags2, mode, context, next) {
          this.tags = tags2;
          this.mode = mode;
          this.context = context;
          this.next = next;
        }
        get opaque() {
          return this.mode == 0;
        }
        get inherit() {
          return this.mode == 1;
        }
        sort(other) {
          if (!other || other.depth < this.depth) {
            this.next = other;
            return this;
          }
          other.next = this.sort(other.next);
          return other;
        }
        get depth() {
          return this.context ? this.context.length : 0;
        }
      };
      Rule.empty = new Rule([], 2, null);
      HighlightBuilder = class {
        constructor(at, highlighters, span) {
          this.at = at;
          this.highlighters = highlighters;
          this.span = span;
          this.class = "";
        }
        startSpan(at, cls) {
          if (cls != this.class) {
            this.flush(at);
            if (at > this.at)
              this.at = at;
            this.class = cls;
          }
        }
        flush(to) {
          if (to > this.at && this.class)
            this.span(this.at, to, this.class);
        }
        highlightRange(cursor, from, to, inheritedClass, highlighters) {
          let { type, from: start, to: end } = cursor;
          if (start >= to || end <= from)
            return;
          if (type.isTop)
            highlighters = this.highlighters.filter((h) => !h.scope || h.scope(type));
          let cls = inheritedClass;
          let rule = getStyleTags(cursor) || Rule.empty;
          let tagCls = highlightTags(highlighters, rule.tags);
          if (tagCls) {
            if (cls)
              cls += " ";
            cls += tagCls;
            if (rule.mode == 1)
              inheritedClass += (inheritedClass ? " " : "") + tagCls;
          }
          this.startSpan(Math.max(from, start), cls);
          if (rule.opaque)
            return;
          let mounted = cursor.tree && cursor.tree.prop(NodeProp.mounted);
          if (mounted && mounted.overlay) {
            let inner = cursor.node.enter(mounted.overlay[0].from + start, 1);
            let innerHighlighters = this.highlighters.filter((h) => !h.scope || h.scope(mounted.tree.type));
            let hasChild2 = cursor.firstChild();
            for (let i2 = 0, pos = start; ; i2++) {
              let next = i2 < mounted.overlay.length ? mounted.overlay[i2] : null;
              let nextPos = next ? next.from + start : end;
              let rangeFrom2 = Math.max(from, pos), rangeTo2 = Math.min(to, nextPos);
              if (rangeFrom2 < rangeTo2 && hasChild2) {
                while (cursor.from < rangeTo2) {
                  this.highlightRange(cursor, rangeFrom2, rangeTo2, inheritedClass, highlighters);
                  this.startSpan(Math.min(rangeTo2, cursor.to), cls);
                  if (cursor.to >= nextPos || !cursor.nextSibling())
                    break;
                }
              }
              if (!next || nextPos > to)
                break;
              pos = next.to + start;
              if (pos > from) {
                this.highlightRange(inner.cursor(), Math.max(from, next.from + start), Math.min(to, pos), "", innerHighlighters);
                this.startSpan(Math.min(to, pos), cls);
              }
            }
            if (hasChild2)
              cursor.parent();
          } else if (cursor.firstChild()) {
            if (mounted)
              inheritedClass = "";
            do {
              if (cursor.to <= from)
                continue;
              if (cursor.from >= to)
                break;
              this.highlightRange(cursor, from, to, inheritedClass, highlighters);
              this.startSpan(Math.min(to, cursor.to), cls);
            } while (cursor.nextSibling());
            cursor.parent();
          }
        }
      };
      t = Tag.define;
      comment = t();
      name = t();
      typeName = t(name);
      propertyName = t(name);
      literal = t();
      string = t(literal);
      number = t(literal);
      content = t();
      heading = t(content);
      keyword = t();
      operator = t();
      punctuation = t();
      bracket = t(punctuation);
      meta = t();
      tags = {
        /**
        A comment.
        */
        comment,
        /**
        A line [comment](#highlight.tags.comment).
        */
        lineComment: t(comment),
        /**
        A block [comment](#highlight.tags.comment).
        */
        blockComment: t(comment),
        /**
        A documentation [comment](#highlight.tags.comment).
        */
        docComment: t(comment),
        /**
        Any kind of identifier.
        */
        name,
        /**
        The [name](#highlight.tags.name) of a variable.
        */
        variableName: t(name),
        /**
        A type [name](#highlight.tags.name).
        */
        typeName,
        /**
        A tag name (subtag of [`typeName`](#highlight.tags.typeName)).
        */
        tagName: t(typeName),
        /**
        A property or field [name](#highlight.tags.name).
        */
        propertyName,
        /**
        An attribute name (subtag of [`propertyName`](#highlight.tags.propertyName)).
        */
        attributeName: t(propertyName),
        /**
        The [name](#highlight.tags.name) of a class.
        */
        className: t(name),
        /**
        A label [name](#highlight.tags.name).
        */
        labelName: t(name),
        /**
        A namespace [name](#highlight.tags.name).
        */
        namespace: t(name),
        /**
        The [name](#highlight.tags.name) of a macro.
        */
        macroName: t(name),
        /**
        A literal value.
        */
        literal,
        /**
        A string [literal](#highlight.tags.literal).
        */
        string,
        /**
        A documentation [string](#highlight.tags.string).
        */
        docString: t(string),
        /**
        A character literal (subtag of [string](#highlight.tags.string)).
        */
        character: t(string),
        /**
        An attribute value (subtag of [string](#highlight.tags.string)).
        */
        attributeValue: t(string),
        /**
        A number [literal](#highlight.tags.literal).
        */
        number,
        /**
        An integer [number](#highlight.tags.number) literal.
        */
        integer: t(number),
        /**
        A floating-point [number](#highlight.tags.number) literal.
        */
        float: t(number),
        /**
        A boolean [literal](#highlight.tags.literal).
        */
        bool: t(literal),
        /**
        Regular expression [literal](#highlight.tags.literal).
        */
        regexp: t(literal),
        /**
        An escape [literal](#highlight.tags.literal), for example a
        backslash escape in a string.
        */
        escape: t(literal),
        /**
        A color [literal](#highlight.tags.literal).
        */
        color: t(literal),
        /**
        A URL [literal](#highlight.tags.literal).
        */
        url: t(literal),
        /**
        A language keyword.
        */
        keyword,
        /**
        The [keyword](#highlight.tags.keyword) for the self or this
        object.
        */
        self: t(keyword),
        /**
        The [keyword](#highlight.tags.keyword) for null.
        */
        null: t(keyword),
        /**
        A [keyword](#highlight.tags.keyword) denoting some atomic value.
        */
        atom: t(keyword),
        /**
        A [keyword](#highlight.tags.keyword) that represents a unit.
        */
        unit: t(keyword),
        /**
        A modifier [keyword](#highlight.tags.keyword).
        */
        modifier: t(keyword),
        /**
        A [keyword](#highlight.tags.keyword) that acts as an operator.
        */
        operatorKeyword: t(keyword),
        /**
        A control-flow related [keyword](#highlight.tags.keyword).
        */
        controlKeyword: t(keyword),
        /**
        A [keyword](#highlight.tags.keyword) that defines something.
        */
        definitionKeyword: t(keyword),
        /**
        A [keyword](#highlight.tags.keyword) related to defining or
        interfacing with modules.
        */
        moduleKeyword: t(keyword),
        /**
        An operator.
        */
        operator,
        /**
        An [operator](#highlight.tags.operator) that dereferences something.
        */
        derefOperator: t(operator),
        /**
        Arithmetic-related [operator](#highlight.tags.operator).
        */
        arithmeticOperator: t(operator),
        /**
        Logical [operator](#highlight.tags.operator).
        */
        logicOperator: t(operator),
        /**
        Bit [operator](#highlight.tags.operator).
        */
        bitwiseOperator: t(operator),
        /**
        Comparison [operator](#highlight.tags.operator).
        */
        compareOperator: t(operator),
        /**
        [Operator](#highlight.tags.operator) that updates its operand.
        */
        updateOperator: t(operator),
        /**
        [Operator](#highlight.tags.operator) that defines something.
        */
        definitionOperator: t(operator),
        /**
        Type-related [operator](#highlight.tags.operator).
        */
        typeOperator: t(operator),
        /**
        Control-flow [operator](#highlight.tags.operator).
        */
        controlOperator: t(operator),
        /**
        Program or markup punctuation.
        */
        punctuation,
        /**
        [Punctuation](#highlight.tags.punctuation) that separates
        things.
        */
        separator: t(punctuation),
        /**
        Bracket-style [punctuation](#highlight.tags.punctuation).
        */
        bracket,
        /**
        Angle [brackets](#highlight.tags.bracket) (usually `<` and `>`
        tokens).
        */
        angleBracket: t(bracket),
        /**
        Square [brackets](#highlight.tags.bracket) (usually `[` and `]`
        tokens).
        */
        squareBracket: t(bracket),
        /**
        Parentheses (usually `(` and `)` tokens). Subtag of
        [bracket](#highlight.tags.bracket).
        */
        paren: t(bracket),
        /**
        Braces (usually `{` and `}` tokens). Subtag of
        [bracket](#highlight.tags.bracket).
        */
        brace: t(bracket),
        /**
        Content, for example plain text in XML or markup documents.
        */
        content,
        /**
        [Content](#highlight.tags.content) that represents a heading.
        */
        heading,
        /**
        A level 1 [heading](#highlight.tags.heading).
        */
        heading1: t(heading),
        /**
        A level 2 [heading](#highlight.tags.heading).
        */
        heading2: t(heading),
        /**
        A level 3 [heading](#highlight.tags.heading).
        */
        heading3: t(heading),
        /**
        A level 4 [heading](#highlight.tags.heading).
        */
        heading4: t(heading),
        /**
        A level 5 [heading](#highlight.tags.heading).
        */
        heading5: t(heading),
        /**
        A level 6 [heading](#highlight.tags.heading).
        */
        heading6: t(heading),
        /**
        A prose [content](#highlight.tags.content) separator (such as a horizontal rule).
        */
        contentSeparator: t(content),
        /**
        [Content](#highlight.tags.content) that represents a list.
        */
        list: t(content),
        /**
        [Content](#highlight.tags.content) that represents a quote.
        */
        quote: t(content),
        /**
        [Content](#highlight.tags.content) that is emphasized.
        */
        emphasis: t(content),
        /**
        [Content](#highlight.tags.content) that is styled strong.
        */
        strong: t(content),
        /**
        [Content](#highlight.tags.content) that is part of a link.
        */
        link: t(content),
        /**
        [Content](#highlight.tags.content) that is styled as code or
        monospace.
        */
        monospace: t(content),
        /**
        [Content](#highlight.tags.content) that has a strike-through
        style.
        */
        strikethrough: t(content),
        /**
        Inserted text in a change-tracking format.
        */
        inserted: t(),
        /**
        Deleted text.
        */
        deleted: t(),
        /**
        Changed text.
        */
        changed: t(),
        /**
        An invalid or unsyntactic element.
        */
        invalid: t(),
        /**
        Metadata or meta-instruction.
        */
        meta,
        /**
        [Metadata](#highlight.tags.meta) that applies to the entire
        document.
        */
        documentMeta: t(meta),
        /**
        [Metadata](#highlight.tags.meta) that annotates or adds
        attributes to a given syntactic element.
        */
        annotation: t(meta),
        /**
        Processing instruction or preprocessor directive. Subtag of
        [meta](#highlight.tags.meta).
        */
        processingInstruction: t(meta),
        /**
        [Modifier](#highlight.Tag^defineModifier) that indicates that a
        given element is being defined. Expected to be used with the
        various [name](#highlight.tags.name) tags.
        */
        definition: Tag.defineModifier("definition"),
        /**
        [Modifier](#highlight.Tag^defineModifier) that indicates that
        something is constant. Mostly expected to be used with
        [variable names](#highlight.tags.variableName).
        */
        constant: Tag.defineModifier("constant"),
        /**
        [Modifier](#highlight.Tag^defineModifier) used to indicate that
        a [variable](#highlight.tags.variableName) or [property
        name](#highlight.tags.propertyName) is being called or defined
        as a function.
        */
        function: Tag.defineModifier("function"),
        /**
        [Modifier](#highlight.Tag^defineModifier) that can be applied to
        [names](#highlight.tags.name) to indicate that they belong to
        the language's standard environment.
        */
        standard: Tag.defineModifier("standard"),
        /**
        [Modifier](#highlight.Tag^defineModifier) that indicates a given
        [names](#highlight.tags.name) is local to some scope.
        */
        local: Tag.defineModifier("local"),
        /**
        A generic variant [modifier](#highlight.Tag^defineModifier) that
        can be used to tag language-specific alternative variants of
        some common tag. It is recommended for themes to define special
        forms of at least the [string](#highlight.tags.string) and
        [variable name](#highlight.tags.variableName) tags, since those
        come up a lot.
        */
        special: Tag.defineModifier("special")
      };
      for (let name2 in tags) {
        let val = tags[name2];
        if (val instanceof Tag)
          val.name = name2;
      }
      classHighlighter = tagHighlighter([
        { tag: tags.link, class: "tok-link" },
        { tag: tags.heading, class: "tok-heading" },
        { tag: tags.emphasis, class: "tok-emphasis" },
        { tag: tags.strong, class: "tok-strong" },
        { tag: tags.keyword, class: "tok-keyword" },
        { tag: tags.atom, class: "tok-atom" },
        { tag: tags.bool, class: "tok-bool" },
        { tag: tags.url, class: "tok-url" },
        { tag: tags.labelName, class: "tok-labelName" },
        { tag: tags.inserted, class: "tok-inserted" },
        { tag: tags.deleted, class: "tok-deleted" },
        { tag: tags.literal, class: "tok-literal" },
        { tag: tags.string, class: "tok-string" },
        { tag: tags.number, class: "tok-number" },
        { tag: [tags.regexp, tags.escape, tags.special(tags.string)], class: "tok-string2" },
        { tag: tags.variableName, class: "tok-variableName" },
        { tag: tags.local(tags.variableName), class: "tok-variableName tok-local" },
        { tag: tags.definition(tags.variableName), class: "tok-variableName tok-definition" },
        { tag: tags.special(tags.variableName), class: "tok-variableName2" },
        { tag: tags.definition(tags.propertyName), class: "tok-propertyName tok-definition" },
        { tag: tags.typeName, class: "tok-typeName" },
        { tag: tags.namespace, class: "tok-namespace" },
        { tag: tags.className, class: "tok-className" },
        { tag: tags.macroName, class: "tok-macroName" },
        { tag: tags.propertyName, class: "tok-propertyName" },
        { tag: tags.operator, class: "tok-operator" },
        { tag: tags.comment, class: "tok-comment" },
        { tag: tags.meta, class: "tok-meta" },
        { tag: tags.invalid, class: "tok-invalid" },
        { tag: tags.punctuation, class: "tok-punctuation" }
      ]);
    }
  });

  // node_modules/@codemirror/language/dist/index.js
  function defineLanguageFacet(baseData) {
    return Facet.define({
      combine: baseData ? (values) => values.concat(baseData) : void 0
    });
  }
  function topNodeAt(state, pos, side) {
    let topLang = state.facet(language), tree = syntaxTree(state).topNode;
    if (!topLang || topLang.allowsNesting) {
      for (let node = tree; node; node = node.enter(pos, side, IterMode.ExcludeBuffers | IterMode.EnterBracketed))
        if (node.type.isTop)
          tree = node;
    }
    return tree;
  }
  function syntaxTree(state) {
    let field = state.field(Language.state, false);
    return field ? field.tree : Tree.empty;
  }
  function cutFragments(fragments, from, to) {
    return TreeFragment.applyChanges(fragments, [{ fromA: from, toA: to, fromB: from, toB: to }]);
  }
  function bracketedAligned(context) {
    let tree = context.node;
    let openToken = tree.childAfter(tree.from), last2 = tree.lastChild;
    if (!openToken)
      return null;
    let sim = context.options.simulateBreak;
    let openLine = context.state.doc.lineAt(openToken.from);
    let lineEnd = sim == null || sim <= openLine.from ? openLine.to : Math.min(openLine.to, sim);
    for (let pos = openToken.to; ; ) {
      let next = tree.childAfter(pos);
      if (!next || next == last2)
        return null;
      if (!next.type.isSkipped) {
        if (next.from >= lineEnd)
          return null;
        let space2 = /^ */.exec(openLine.text.slice(openToken.to - openLine.from))[0].length;
        return { from: openToken.from, to: openToken.to + space2 };
      }
      pos = next.to;
    }
  }
  function delimitedIndent({ closing, align = true, units = 1 }) {
    return (context) => delimitedStrategy(context, align, units, closing);
  }
  function delimitedStrategy(context, align, units, closing, closedAt) {
    let after = context.textAfter, space2 = after.match(/^\s*/)[0].length;
    let closed = closing && after.slice(space2, space2 + closing.length) == closing || closedAt == context.pos + space2;
    let aligned = align ? bracketedAligned(context) : null;
    if (aligned)
      return closed ? context.column(aligned.from) : context.column(aligned.to);
    return context.baseIndent + (closed ? 0 : context.unit * units);
  }
  function continuedIndent({ except, units = 1 } = {}) {
    return (context) => {
      let matchExcept = except && except.test(context.textAfter);
      return context.baseIndent + (matchExcept ? 0 : units * context.unit);
    };
  }
  function foldInside(node) {
    let first = node.firstChild, last2 = node.lastChild;
    return first && first.to < last2.from ? { from: first.to, to: last2.type.isError ? node.to : last2.from } : null;
  }
  function getHighlighters(state) {
    let main = state.facet(highlighterFacet);
    return main.length ? main : state.facet(fallbackHighlighter);
  }
  function syntaxHighlighting(highlighter, options) {
    let ext = [treeHighlighter], themeType;
    if (highlighter instanceof HighlightStyle) {
      if (highlighter.module)
        ext.push(EditorView.styleModule.of(highlighter.module));
      themeType = highlighter.themeType;
    }
    if (options === null || options === void 0 ? void 0 : options.fallback)
      ext.push(fallbackHighlighter.of(highlighter));
    else if (themeType)
      ext.push(highlighterFacet.computeN([EditorView.darkTheme], (state) => {
        return state.facet(EditorView.darkTheme) == (themeType == "dark") ? [highlighter] : [];
      }));
    else
      ext.push(highlighterFacet.of(highlighter));
    return ext;
  }
  function warnForPart(part, msg) {
    if (warned.indexOf(part) > -1)
      return;
    warned.push(part);
    console.warn(msg);
  }
  function createTokenType(extra, tagStr) {
    let tags$1 = [];
    for (let name3 of tagStr.split(" ")) {
      let found = [];
      for (let part of name3.split(".")) {
        let value = extra[part] || tags[part];
        if (!value) {
          warnForPart(part, `Unknown highlighting tag ${part}`);
        } else if (typeof value == "function") {
          if (!found.length)
            warnForPart(part, `Modifier ${part} used at start of tag`);
          else
            found = found.map(value);
        } else {
          if (found.length)
            warnForPart(part, `Tag ${part} used as modifier`);
          else
            found = Array.isArray(value) ? value : [value];
        }
      }
      for (let tag of found)
        tags$1.push(tag);
    }
    if (!tags$1.length)
      return 0;
    let name2 = tagStr.replace(/ /g, "_"), key = name2 + " " + tags$1.map((t2) => t2.id);
    let known = byTag[key];
    if (known)
      return known.id;
    let type = byTag[key] = NodeType.define({
      id: typeArray.length,
      name: name2,
      props: [styleTags({ [name2]: tags$1 })]
    });
    typeArray.push(type);
    return type.id;
  }
  var _a, languageDataProp, sublanguageProp, Language, LRLanguage, DocInput, currentContext, ParseContext, LanguageState, requestIdle, isInputPending, parseWorker, language, LanguageSupport, indentUnit, indentNodeProp, flatIndent, foldNodeProp, HighlightStyle, highlighterFacet, fallbackHighlighter, TreeHighlighter, treeHighlighter, defaultHighlightStyle, noTokens, typeArray, warned, byTag, defaultTable, marks;
  var init_dist5 = __esm({
    "node_modules/@codemirror/language/dist/index.js"() {
      init_dist3();
      init_dist();
      init_dist2();
      init_dist4();
      init_style_mod();
      languageDataProp = /* @__PURE__ */ new NodeProp();
      sublanguageProp = /* @__PURE__ */ new NodeProp();
      Language = class {
        /**
        Construct a language object. If you need to invoke this
        directly, first define a data facet with
        [`defineLanguageFacet`](https://codemirror.net/6/docs/ref/#language.defineLanguageFacet), and then
        configure your parser to [attach](https://codemirror.net/6/docs/ref/#language.languageDataProp) it
        to the language's outer syntax node.
        */
        constructor(data, parser4, extraExtensions = [], name2 = "") {
          this.data = data;
          this.name = name2;
          if (!EditorState.prototype.hasOwnProperty("tree"))
            Object.defineProperty(EditorState.prototype, "tree", { get() {
              return syntaxTree(this);
            } });
          this.parser = parser4;
          this.extension = [
            language.of(this),
            EditorState.languageData.of((state, pos, side) => {
              let top2 = topNodeAt(state, pos, side), data2 = top2.type.prop(languageDataProp);
              if (!data2)
                return [];
              let base2 = state.facet(data2), sub = top2.type.prop(sublanguageProp);
              if (sub) {
                let innerNode = top2.resolve(pos - top2.from, side);
                for (let sublang of sub)
                  if (sublang.test(innerNode, state)) {
                    let data3 = state.facet(sublang.facet);
                    return sublang.type == "replace" ? data3 : data3.concat(base2);
                  }
              }
              return base2;
            })
          ].concat(extraExtensions);
        }
        /**
        Query whether this language is active at the given position.
        */
        isActiveAt(state, pos, side = -1) {
          return topNodeAt(state, pos, side).type.prop(languageDataProp) == this.data;
        }
        /**
        Find the document regions that were parsed using this language.
        The returned regions will _include_ any nested languages rooted
        in this language, when those exist.
        */
        findRegions(state) {
          let lang = state.facet(language);
          if ((lang === null || lang === void 0 ? void 0 : lang.data) == this.data)
            return [{ from: 0, to: state.doc.length }];
          if (!lang || !lang.allowsNesting)
            return [];
          let result = [];
          let explore = (tree, from) => {
            if (tree.prop(languageDataProp) == this.data) {
              result.push({ from, to: from + tree.length });
              return;
            }
            let mount = tree.prop(NodeProp.mounted);
            if (mount) {
              if (mount.tree.prop(languageDataProp) == this.data) {
                if (mount.overlay)
                  for (let r of mount.overlay)
                    result.push({ from: r.from + from, to: r.to + from });
                else
                  result.push({ from, to: from + tree.length });
                return;
              } else if (mount.overlay) {
                let size = result.length;
                explore(mount.tree, mount.overlay[0].from + from);
                if (result.length > size)
                  return;
              }
            }
            for (let i2 = 0; i2 < tree.children.length; i2++) {
              let ch = tree.children[i2];
              if (ch instanceof Tree)
                explore(ch, tree.positions[i2] + from);
            }
          };
          explore(syntaxTree(state), 0);
          return result;
        }
        /**
        Indicates whether this language allows nested languages. The
        default implementation returns true.
        */
        get allowsNesting() {
          return true;
        }
      };
      Language.setState = /* @__PURE__ */ StateEffect.define();
      LRLanguage = class _LRLanguage extends Language {
        constructor(data, parser4, name2) {
          super(data, parser4, [], name2);
          this.parser = parser4;
        }
        /**
        Define a language from a parser.
        */
        static define(spec) {
          let data = defineLanguageFacet(spec.languageData);
          return new _LRLanguage(data, spec.parser.configure({
            props: [languageDataProp.add((type) => type.isTop ? data : void 0)]
          }), spec.name);
        }
        /**
        Create a new instance of this language with a reconfigured
        version of its parser and optionally a new name.
        */
        configure(options, name2) {
          return new _LRLanguage(this.data, this.parser.configure(options), name2 || this.name);
        }
        get allowsNesting() {
          return this.parser.hasWrappers();
        }
      };
      DocInput = class {
        /**
        Create an input object for the given document.
        */
        constructor(doc2) {
          this.doc = doc2;
          this.cursorPos = 0;
          this.string = "";
          this.cursor = doc2.iter();
        }
        get length() {
          return this.doc.length;
        }
        syncTo(pos) {
          this.string = this.cursor.next(pos - this.cursorPos).value;
          this.cursorPos = pos + this.string.length;
          return this.cursorPos - this.string.length;
        }
        chunk(pos) {
          this.syncTo(pos);
          return this.string;
        }
        get lineChunks() {
          return true;
        }
        read(from, to) {
          let stringStart2 = this.cursorPos - this.string.length;
          if (from < stringStart2 || to >= this.cursorPos)
            return this.doc.sliceString(from, to);
          else
            return this.string.slice(from - stringStart2, to - stringStart2);
        }
      };
      currentContext = null;
      ParseContext = class _ParseContext {
        constructor(parser4, state, fragments = [], tree, treeLen, viewport, skipped, scheduleOn) {
          this.parser = parser4;
          this.state = state;
          this.fragments = fragments;
          this.tree = tree;
          this.treeLen = treeLen;
          this.viewport = viewport;
          this.skipped = skipped;
          this.scheduleOn = scheduleOn;
          this.parse = null;
          this.tempSkipped = [];
        }
        /**
        @internal
        */
        static create(parser4, state, viewport) {
          return new _ParseContext(parser4, state, [], Tree.empty, 0, viewport, [], null);
        }
        startParse() {
          return this.parser.startParse(new DocInput(this.state.doc), this.fragments);
        }
        /**
        @internal
        */
        work(until, upto) {
          if (upto != null && upto >= this.state.doc.length)
            upto = void 0;
          if (this.tree != Tree.empty && this.isDone(upto !== null && upto !== void 0 ? upto : this.state.doc.length)) {
            this.takeTree();
            return true;
          }
          return this.withContext(() => {
            var _a2;
            if (typeof until == "number") {
              let endTime = Date.now() + until;
              until = () => Date.now() > endTime;
            }
            if (!this.parse)
              this.parse = this.startParse();
            if (upto != null && (this.parse.stoppedAt == null || this.parse.stoppedAt > upto) && upto < this.state.doc.length)
              this.parse.stopAt(upto);
            for (; ; ) {
              let done = this.parse.advance();
              if (done) {
                this.fragments = this.withoutTempSkipped(TreeFragment.addTree(done, this.fragments, this.parse.stoppedAt != null));
                this.treeLen = (_a2 = this.parse.stoppedAt) !== null && _a2 !== void 0 ? _a2 : this.state.doc.length;
                this.tree = done;
                this.parse = null;
                if (this.treeLen < (upto !== null && upto !== void 0 ? upto : this.state.doc.length))
                  this.parse = this.startParse();
                else
                  return true;
              }
              if (until())
                return false;
            }
          });
        }
        /**
        @internal
        */
        takeTree() {
          let pos, tree;
          if (this.parse && (pos = this.parse.parsedPos) >= this.treeLen) {
            if (this.parse.stoppedAt == null || this.parse.stoppedAt > pos)
              this.parse.stopAt(pos);
            this.withContext(() => {
              while (!(tree = this.parse.advance())) {
              }
            });
            this.treeLen = pos;
            this.tree = tree;
            this.fragments = this.withoutTempSkipped(TreeFragment.addTree(this.tree, this.fragments, true));
            this.parse = null;
          }
        }
        withContext(f) {
          let prev = currentContext;
          currentContext = this;
          try {
            return f();
          } finally {
            currentContext = prev;
          }
        }
        withoutTempSkipped(fragments) {
          for (let r; r = this.tempSkipped.pop(); )
            fragments = cutFragments(fragments, r.from, r.to);
          return fragments;
        }
        /**
        @internal
        */
        changes(changes, newState) {
          let { fragments, tree, treeLen, viewport, skipped } = this;
          this.takeTree();
          if (!changes.empty) {
            let ranges = [];
            changes.iterChangedRanges((fromA, toA, fromB, toB) => ranges.push({ fromA, toA, fromB, toB }));
            fragments = TreeFragment.applyChanges(fragments, ranges);
            tree = Tree.empty;
            treeLen = 0;
            viewport = { from: changes.mapPos(viewport.from, -1), to: changes.mapPos(viewport.to, 1) };
            if (this.skipped.length) {
              skipped = [];
              for (let r of this.skipped) {
                let from = changes.mapPos(r.from, 1), to = changes.mapPos(r.to, -1);
                if (from < to)
                  skipped.push({ from, to });
              }
            }
          }
          return new _ParseContext(this.parser, newState, fragments, tree, treeLen, viewport, skipped, this.scheduleOn);
        }
        /**
        @internal
        */
        updateViewport(viewport) {
          if (this.viewport.from == viewport.from && this.viewport.to == viewport.to)
            return false;
          this.viewport = viewport;
          let startLen = this.skipped.length;
          for (let i2 = 0; i2 < this.skipped.length; i2++) {
            let { from, to } = this.skipped[i2];
            if (from < viewport.to && to > viewport.from) {
              this.fragments = cutFragments(this.fragments, from, to);
              this.skipped.splice(i2--, 1);
            }
          }
          if (this.skipped.length >= startLen)
            return false;
          this.reset();
          return true;
        }
        /**
        @internal
        */
        reset() {
          if (this.parse) {
            this.takeTree();
            this.parse = null;
          }
        }
        /**
        Notify the parse scheduler that the given region was skipped
        because it wasn't in view, and the parse should be restarted
        when it comes into view.
        */
        skipUntilInView(from, to) {
          this.skipped.push({ from, to });
        }
        /**
        Returns a parser intended to be used as placeholder when
        asynchronously loading a nested parser. It'll skip its input and
        mark it as not-really-parsed, so that the next update will parse
        it again.
        
        When `until` is given, a reparse will be scheduled when that
        promise resolves.
        */
        static getSkippingParser(until) {
          return new class extends Parser {
            createParse(input, fragments, ranges) {
              let from = ranges[0].from, to = ranges[ranges.length - 1].to;
              let parser4 = {
                parsedPos: from,
                advance() {
                  let cx = currentContext;
                  if (cx) {
                    for (let r of ranges)
                      cx.tempSkipped.push(r);
                    if (until)
                      cx.scheduleOn = cx.scheduleOn ? Promise.all([cx.scheduleOn, until]) : until;
                  }
                  this.parsedPos = to;
                  return new Tree(NodeType.none, [], [], to - from);
                },
                stoppedAt: null,
                stopAt() {
                }
              };
              return parser4;
            }
          }();
        }
        /**
        @internal
        */
        isDone(upto) {
          upto = Math.min(upto, this.state.doc.length);
          let frags = this.fragments;
          return this.treeLen >= upto && frags.length && frags[0].from == 0 && frags[0].to >= upto;
        }
        /**
        Get the context for the current parse, or `null` if no editor
        parse is in progress.
        */
        static get() {
          return currentContext;
        }
      };
      LanguageState = class _LanguageState {
        constructor(context) {
          this.context = context;
          this.tree = context.tree;
        }
        apply(tr) {
          if (!tr.docChanged && this.tree == this.context.tree)
            return this;
          let newCx = this.context.changes(tr.changes, tr.state);
          let upto = this.context.treeLen == tr.startState.doc.length ? void 0 : Math.max(tr.changes.mapPos(this.context.treeLen), newCx.viewport.to);
          if (!newCx.work(20, upto))
            newCx.takeTree();
          return new _LanguageState(newCx);
        }
        static init(state) {
          let vpTo = Math.min(3e3, state.doc.length);
          let parseState = ParseContext.create(state.facet(language).parser, state, { from: 0, to: vpTo });
          if (!parseState.work(20, vpTo))
            parseState.takeTree();
          return new _LanguageState(parseState);
        }
      };
      Language.state = /* @__PURE__ */ StateField.define({
        create: LanguageState.init,
        update(value, tr) {
          for (let e of tr.effects)
            if (e.is(Language.setState))
              return e.value;
          if (tr.startState.facet(language) != tr.state.facet(language))
            return LanguageState.init(tr.state);
          return value.apply(tr);
        }
      });
      requestIdle = (callback) => {
        let timeout = setTimeout(
          () => callback(),
          500
          /* Work.MaxPause */
        );
        return () => clearTimeout(timeout);
      };
      if (typeof requestIdleCallback != "undefined")
        requestIdle = (callback) => {
          let idle = -1, timeout = setTimeout(
            () => {
              idle = requestIdleCallback(callback, {
                timeout: 500 - 100
                /* Work.MinPause */
              });
            },
            100
            /* Work.MinPause */
          );
          return () => idle < 0 ? clearTimeout(timeout) : cancelIdleCallback(idle);
        };
      isInputPending = typeof navigator != "undefined" && ((_a = navigator.scheduling) === null || _a === void 0 ? void 0 : _a.isInputPending) ? () => navigator.scheduling.isInputPending() : null;
      parseWorker = /* @__PURE__ */ ViewPlugin.fromClass(class ParseWorker {
        constructor(view) {
          this.view = view;
          this.working = null;
          this.workScheduled = 0;
          this.chunkEnd = -1;
          this.chunkBudget = -1;
          this.work = this.work.bind(this);
          this.scheduleWork();
        }
        update(update) {
          let cx = this.view.state.field(Language.state).context;
          if (cx.updateViewport(update.view.viewport) || this.view.viewport.to > cx.treeLen)
            this.scheduleWork();
          if (update.docChanged || update.selectionSet) {
            if (this.view.hasFocus)
              this.chunkBudget += 50;
            this.scheduleWork();
          }
          this.checkAsyncSchedule(cx);
        }
        scheduleWork() {
          if (this.working)
            return;
          let { state } = this.view, field = state.field(Language.state);
          if (field.tree != field.context.tree || !field.context.isDone(state.doc.length))
            this.working = requestIdle(this.work);
        }
        work(deadline) {
          this.working = null;
          let now = Date.now();
          if (this.chunkEnd < now && (this.chunkEnd < 0 || this.view.hasFocus)) {
            this.chunkEnd = now + 3e4;
            this.chunkBudget = 3e3;
          }
          if (this.chunkBudget <= 0)
            return;
          let { state, viewport: { to: vpTo } } = this.view, field = state.field(Language.state);
          if (field.tree == field.context.tree && field.context.isDone(
            vpTo + 1e5
            /* Work.MaxParseAhead */
          ))
            return;
          let endTime = Date.now() + Math.min(this.chunkBudget, 100, deadline && !isInputPending ? Math.max(25, deadline.timeRemaining() - 5) : 1e9);
          let viewportFirst = field.context.treeLen < vpTo && state.doc.length > vpTo + 1e3;
          let done = field.context.work(() => {
            return isInputPending && isInputPending() || Date.now() > endTime;
          }, vpTo + (viewportFirst ? 0 : 1e5));
          this.chunkBudget -= Date.now() - now;
          if (done || this.chunkBudget <= 0) {
            field.context.takeTree();
            this.view.dispatch({ effects: Language.setState.of(new LanguageState(field.context)) });
          }
          if (this.chunkBudget > 0 && !(done && !viewportFirst))
            this.scheduleWork();
          this.checkAsyncSchedule(field.context);
        }
        checkAsyncSchedule(cx) {
          if (cx.scheduleOn) {
            this.workScheduled++;
            cx.scheduleOn.then(() => this.scheduleWork()).catch((err) => logException(this.view.state, err)).then(() => this.workScheduled--);
            cx.scheduleOn = null;
          }
        }
        destroy() {
          if (this.working)
            this.working();
        }
        isWorking() {
          return !!(this.working || this.workScheduled > 0);
        }
      }, {
        eventHandlers: { focus() {
          this.scheduleWork();
        } }
      });
      language = /* @__PURE__ */ Facet.define({
        combine(languages) {
          return languages.length ? languages[0] : null;
        },
        enables: (language2) => [
          Language.state,
          parseWorker,
          EditorView.contentAttributes.compute([language2], (state) => {
            let lang = state.facet(language2);
            return lang && lang.name ? { "data-language": lang.name } : {};
          })
        ]
      });
      LanguageSupport = class {
        /**
        Create a language support object.
        */
        constructor(language2, support = []) {
          this.language = language2;
          this.support = support;
          this.extension = [language2, support];
        }
      };
      indentUnit = /* @__PURE__ */ Facet.define({
        combine: (values) => {
          if (!values.length)
            return "  ";
          let unit = values[0];
          if (!unit || /\S/.test(unit) || Array.from(unit).some((e) => e != unit[0]))
            throw new Error("Invalid indent unit: " + JSON.stringify(values[0]));
          return unit;
        }
      });
      indentNodeProp = /* @__PURE__ */ new NodeProp();
      flatIndent = (context) => context.baseIndent;
      foldNodeProp = /* @__PURE__ */ new NodeProp();
      HighlightStyle = class _HighlightStyle {
        constructor(specs, options) {
          this.specs = specs;
          let modSpec;
          function def(spec) {
            let cls = StyleModule.newName();
            (modSpec || (modSpec = /* @__PURE__ */ Object.create(null)))["." + cls] = spec;
            return cls;
          }
          const all = typeof options.all == "string" ? options.all : options.all ? def(options.all) : void 0;
          const scopeOpt = options.scope;
          this.scope = scopeOpt instanceof Language ? (type) => type.prop(languageDataProp) == scopeOpt.data : scopeOpt ? (type) => type == scopeOpt : void 0;
          this.style = tagHighlighter(specs.map((style) => ({
            tag: style.tag,
            class: style.class || def(Object.assign({}, style, { tag: null }))
          })), {
            all
          }).style;
          this.module = modSpec ? new StyleModule(modSpec) : null;
          this.themeType = options.themeType;
        }
        /**
        Create a highlighter style that associates the given styles to
        the given tags. The specs must be objects that hold a style tag
        or array of tags in their `tag` property, and either a single
        `class` property providing a static CSS class (for highlighter
        that rely on external styling), or a
        [`style-mod`](https://code.haverbeke.berlin/marijn/style-mod#documentation)-style
        set of CSS properties (which define the styling for those tags).
        
        The CSS rules created for a highlighter will be emitted in the
        order of the spec's properties. That means that for elements that
        have multiple tags associated with them, styles defined further
        down in the list will have a higher CSS precedence than styles
        defined earlier.
        */
        static define(specs, options) {
          return new _HighlightStyle(specs, options || {});
        }
      };
      highlighterFacet = /* @__PURE__ */ Facet.define();
      fallbackHighlighter = /* @__PURE__ */ Facet.define({
        combine(values) {
          return values.length ? [values[0]] : null;
        }
      });
      TreeHighlighter = class {
        constructor(view) {
          this.markCache = /* @__PURE__ */ Object.create(null);
          this.tree = syntaxTree(view.state);
          this.decorations = this.buildDeco(view, getHighlighters(view.state));
          this.decoratedTo = view.viewport.to;
        }
        update(update) {
          let tree = syntaxTree(update.state), highlighters = getHighlighters(update.state);
          let styleChange = highlighters != getHighlighters(update.startState);
          let { viewport } = update.view, decoratedToMapped = update.changes.mapPos(this.decoratedTo, 1);
          if (tree.length < viewport.to && !styleChange && tree.type == this.tree.type && decoratedToMapped >= viewport.to) {
            this.decorations = this.decorations.map(update.changes);
            this.decoratedTo = decoratedToMapped;
          } else if (tree != this.tree || update.viewportChanged || styleChange) {
            this.tree = tree;
            this.decorations = this.buildDeco(update.view, highlighters);
            this.decoratedTo = viewport.to;
          }
        }
        buildDeco(view, highlighters) {
          if (!highlighters || !this.tree.length)
            return Decoration.none;
          let builder = new RangeSetBuilder();
          for (let { from, to } of view.visibleRanges) {
            highlightTree(this.tree, highlighters, (from2, to2, style) => {
              builder.add(from2, to2, this.markCache[style] || (this.markCache[style] = Decoration.mark({ class: style })));
            }, from, to);
          }
          return builder.finish();
        }
      };
      treeHighlighter = /* @__PURE__ */ Prec.high(/* @__PURE__ */ ViewPlugin.fromClass(TreeHighlighter, {
        decorations: (v) => v.decorations
      }));
      defaultHighlightStyle = /* @__PURE__ */ HighlightStyle.define([
        {
          tag: tags.meta,
          color: "#404740"
        },
        {
          tag: tags.link,
          textDecoration: "underline"
        },
        {
          tag: tags.heading,
          textDecoration: "underline",
          fontWeight: "bold"
        },
        {
          tag: tags.emphasis,
          fontStyle: "italic"
        },
        {
          tag: tags.strong,
          fontWeight: "bold"
        },
        {
          tag: tags.strikethrough,
          textDecoration: "line-through"
        },
        {
          tag: tags.keyword,
          color: "#708"
        },
        {
          tag: [tags.atom, tags.bool, tags.url, tags.contentSeparator, tags.labelName],
          color: "#219"
        },
        {
          tag: [tags.literal, tags.inserted],
          color: "#164"
        },
        {
          tag: [tags.string, tags.deleted],
          color: "#a11"
        },
        {
          tag: [tags.regexp, tags.escape, /* @__PURE__ */ tags.special(tags.string)],
          color: "#e40"
        },
        {
          tag: /* @__PURE__ */ tags.definition(tags.variableName),
          color: "#00f"
        },
        {
          tag: /* @__PURE__ */ tags.local(tags.variableName),
          color: "#30a"
        },
        {
          tag: [tags.typeName, tags.namespace],
          color: "#085"
        },
        {
          tag: tags.className,
          color: "#167"
        },
        {
          tag: [/* @__PURE__ */ tags.special(tags.variableName), tags.macroName],
          color: "#256"
        },
        {
          tag: /* @__PURE__ */ tags.definition(tags.propertyName),
          color: "#00c"
        },
        {
          tag: tags.comment,
          color: "#940"
        },
        {
          tag: tags.invalid,
          color: "#f00"
        }
      ]);
      noTokens = /* @__PURE__ */ Object.create(null);
      typeArray = [NodeType.none];
      warned = [];
      byTag = /* @__PURE__ */ Object.create(null);
      defaultTable = /* @__PURE__ */ Object.create(null);
      for (let [legacyName, name2] of [
        ["variable", "variableName"],
        ["variable-2", "variableName.special"],
        ["string-2", "string.special"],
        ["def", "variableName.definition"],
        ["tag", "tagName"],
        ["attribute", "attributeName"],
        ["type", "typeName"],
        ["builtin", "variableName.standard"],
        ["qualifier", "modifier"],
        ["error", "invalid"],
        ["header", "heading"],
        ["property", "propertyName"]
      ])
        defaultTable[legacyName] = /* @__PURE__ */ createTokenType(noTokens, name2);
      marks = {
        rtl: /* @__PURE__ */ Decoration.mark({ class: "cm-iso", inclusive: true, attributes: { dir: "rtl" }, bidiIsolate: Direction.RTL }),
        ltr: /* @__PURE__ */ Decoration.mark({ class: "cm-iso", inclusive: true, attributes: { dir: "ltr" }, bidiIsolate: Direction.LTR }),
        auto: /* @__PURE__ */ Decoration.mark({ class: "cm-iso", inclusive: true, attributes: { dir: "auto" }, bidiIsolate: null })
      };
    }
  });

  // node_modules/@lezer/lr/dist/index.js
  function decodeArray(input, Type = Uint16Array) {
    if (typeof input != "string")
      return input;
    let array = null;
    for (let pos = 0, out = 0; pos < input.length; ) {
      let value = 0;
      for (; ; ) {
        let next = input.charCodeAt(pos++), stop = false;
        if (next == 126) {
          value = 65535;
          break;
        }
        if (next >= 92)
          next--;
        if (next >= 34)
          next--;
        let digit = next - 32;
        if (digit >= 46) {
          digit -= 46;
          stop = true;
        }
        value += digit;
        if (stop)
          break;
        value *= 46;
      }
      if (array)
        array[out++] = value;
      else
        array = new Type(value);
    }
    return array;
  }
  function readToken(data, input, stack, group, precTable, precOffset) {
    let state = 0, groupMask = 1 << group, { dialect } = stack.p.parser;
    scan: for (; ; ) {
      if ((groupMask & data[state]) == 0)
        break;
      let accEnd = data[state + 1];
      for (let i2 = state + 3; i2 < accEnd; i2 += 2)
        if ((data[i2 + 1] & groupMask) > 0) {
          let term = data[i2];
          if (dialect.allows(term) && (input.token.value == -1 || input.token.value == term || overrides(term, input.token.value, precTable, precOffset))) {
            input.acceptToken(term);
            break;
          }
        }
      let next = input.next, low = 0, high = data[state + 2];
      if (input.next < 0 && high > low && data[accEnd + high * 3 - 3] == 65535) {
        state = data[accEnd + high * 3 - 1];
        continue scan;
      }
      for (; low < high; ) {
        let mid = low + high >> 1;
        let index = accEnd + mid + (mid << 1);
        let from = data[index], to = data[index + 1] || 65536;
        if (next < from)
          high = mid;
        else if (next >= to)
          low = mid + 1;
        else {
          state = data[index + 2];
          input.advance();
          continue scan;
        }
      }
      break;
    }
  }
  function findOffset(data, start, term) {
    for (let i2 = start, next; (next = data[i2]) != 65535; i2++)
      if (next == term)
        return i2 - start;
    return -1;
  }
  function overrides(token, prev, tableData, tableOffset) {
    let iPrev = findOffset(tableData, tableOffset, prev);
    return iPrev < 0 || findOffset(tableData, tableOffset, token) < iPrev;
  }
  function cutAt(tree, pos, side) {
    let cursor = tree.cursor(IterMode.IncludeAnonymous);
    cursor.moveTo(pos);
    for (; ; ) {
      if (!(side < 0 ? cursor.childBefore(pos) : cursor.childAfter(pos)))
        for (; ; ) {
          if ((side < 0 ? cursor.to < pos : cursor.from > pos) && !cursor.type.isError)
            return side < 0 ? Math.max(0, Math.min(
              cursor.to - 1,
              pos - 25
              /* Lookahead.Margin */
            )) : Math.min(tree.length, Math.max(
              cursor.from + 1,
              pos + 25
              /* Lookahead.Margin */
            ));
          if (side < 0 ? cursor.prevSibling() : cursor.nextSibling())
            break;
          if (!cursor.parent())
            return side < 0 ? 0 : tree.length;
        }
    }
  }
  function pushStackDedup(stack, newStacks) {
    for (let i2 = 0; i2 < newStacks.length; i2++) {
      let other = newStacks[i2];
      if (other.pos == stack.pos && other.sameState(stack)) {
        if (newStacks[i2].score < stack.score)
          newStacks[i2] = stack;
        return;
      }
    }
    newStacks.push(stack);
  }
  function pair(data, off) {
    return data[off] | data[off + 1] << 16;
  }
  function findFinished(stacks) {
    let best = null;
    for (let stack of stacks) {
      let stopped = stack.p.stoppedAt;
      if ((stack.pos == stack.p.stream.end || stopped != null && stack.pos > stopped) && stack.p.parser.stateFlag(
        stack.state,
        2
        /* StateFlag.Accepting */
      ) && (!best || best.score < stack.score))
        best = stack;
    }
    return best;
  }
  function getSpecializer(spec) {
    if (spec.external) {
      let mask = spec.extend ? 1 : 0;
      return (value, stack) => spec.external(value, stack) << 1 | mask;
    }
    return spec.get;
  }
  var Stack, StackContext, SimulatedStack, StackBufferCursor, CachedToken, nullToken, InputStream, TokenGroup, LocalTokenGroup, ExternalTokenizer, verbose, stackIDs, FragmentCursor, TokenCache, Parse, Dialect, id, ContextTracker, LRParser;
  var init_dist6 = __esm({
    "node_modules/@lezer/lr/dist/index.js"() {
      init_dist3();
      Stack = class _Stack {
        /**
        @internal
        */
        constructor(p, stack, state, reducePos, pos, score, buffer, bufferBase, curContext, lookAhead = 0, parent) {
          this.p = p;
          this.stack = stack;
          this.state = state;
          this.reducePos = reducePos;
          this.pos = pos;
          this.score = score;
          this.buffer = buffer;
          this.bufferBase = bufferBase;
          this.curContext = curContext;
          this.lookAhead = lookAhead;
          this.parent = parent;
        }
        /**
        @internal
        */
        toString() {
          return `[${this.stack.filter((_, i2) => i2 % 3 == 0).concat(this.state)}]@${this.pos}${this.score ? "!" + this.score : ""}`;
        }
        // Start an empty stack
        /**
        @internal
        */
        static start(p, state, pos = 0) {
          let cx = p.parser.context;
          return new _Stack(p, [], state, pos, pos, 0, [], 0, cx ? new StackContext(cx, cx.start) : null, 0, null);
        }
        /**
        The stack's current [context](#lr.ContextTracker) value, if
        any. Its type will depend on the context tracker's type
        parameter, or it will be `null` if there is no context
        tracker.
        */
        get context() {
          return this.curContext ? this.curContext.context : null;
        }
        // Push a state onto the stack, tracking its start position as well
        // as the buffer base at that point.
        /**
        @internal
        */
        pushState(state, start) {
          this.stack.push(this.state, start, this.bufferBase + this.buffer.length);
          this.state = state;
        }
        // Apply a reduce action
        /**
        @internal
        */
        reduce(action) {
          var _a2;
          let depth = action >> 19, type = action & 65535;
          let { parser: parser4 } = this.p;
          let lookaheadRecord = this.reducePos < this.pos - 25 && this.setLookAhead(this.pos);
          let dPrec = parser4.dynamicPrecedence(type);
          if (dPrec)
            this.score += dPrec;
          if (depth == 0) {
            if (type < parser4.minRepeatTerm && this.reducePos < this.pos)
              this.reducePos = this.pos;
            this.pushState(parser4.getGoto(this.state, type, true), this.reducePos);
            if (type < parser4.minRepeatTerm)
              this.storeNode(type, this.reducePos, this.reducePos, lookaheadRecord ? 8 : 4, true);
            this.reduceContext(type, this.reducePos);
            return;
          }
          let base2 = this.stack.length - (depth - 1) * 3 - (action & 262144 ? 6 : 0);
          let start = base2 ? this.stack[base2 - 2] : this.p.ranges[0].from;
          if (type < parser4.minRepeatTerm && start == this.reducePos && this.reducePos < this.pos)
            this.reducePos = this.pos;
          let size = this.reducePos - start;
          if (size >= 2e3 && !((_a2 = this.p.parser.nodeSet.types[type]) === null || _a2 === void 0 ? void 0 : _a2.isAnonymous)) {
            if (start == this.p.lastBigReductionStart) {
              this.p.bigReductionCount++;
              this.p.lastBigReductionSize = size;
            } else if (this.p.lastBigReductionSize < size) {
              this.p.bigReductionCount = 1;
              this.p.lastBigReductionStart = start;
              this.p.lastBigReductionSize = size;
            }
          }
          let bufferBase = base2 ? this.stack[base2 - 1] : 0, count = this.bufferBase + this.buffer.length - bufferBase;
          if (type < parser4.minRepeatTerm || action & 131072) {
            let pos = parser4.stateFlag(
              this.state,
              1
              /* StateFlag.Skipped */
            ) ? this.pos : this.reducePos;
            this.storeNode(type, start, pos, count + 4, true);
          }
          if (action & 262144) {
            this.state = this.stack[base2];
          } else {
            let baseStateID = this.stack[base2 - 3];
            this.state = parser4.getGoto(baseStateID, type, true);
          }
          while (this.stack.length > base2)
            this.stack.pop();
          this.reduceContext(type, start);
        }
        // Shift a value into the buffer
        /**
        @internal
        */
        storeNode(term, start, end, size = 4, mustSink = false) {
          if (term == 0 && (!this.stack.length || this.stack[this.stack.length - 1] < this.buffer.length + this.bufferBase)) {
            let top2 = this.buffer.length;
            if (top2 > 0 && this.buffer[top2 - 4] == 0 && this.buffer[top2 - 1] > -1) {
              if (start == end)
                return;
              if (this.buffer[top2 - 2] >= start) {
                this.buffer[top2 - 2] = end;
                return;
              }
            }
          }
          if (!mustSink || this.pos == end) {
            this.buffer.push(term, start, end, size);
          } else {
            let index = this.buffer.length;
            if (index > 0 && (this.buffer[index - 4] != 0 || this.buffer[index - 1] < 0)) {
              let mustMove = false;
              for (let scan = index; scan > 0 && this.buffer[scan - 2] > end; scan -= 4) {
                if (this.buffer[scan - 1] >= 0) {
                  mustMove = true;
                  break;
                }
              }
              if (mustMove)
                while (index > 0 && this.buffer[index - 2] > end) {
                  this.buffer[index] = this.buffer[index - 4];
                  this.buffer[index + 1] = this.buffer[index - 3];
                  this.buffer[index + 2] = this.buffer[index - 2];
                  this.buffer[index + 3] = this.buffer[index - 1];
                  index -= 4;
                  if (size > 4)
                    size -= 4;
                }
            }
            this.buffer[index] = term;
            this.buffer[index + 1] = start;
            this.buffer[index + 2] = end;
            this.buffer[index + 3] = size;
          }
        }
        // Apply a shift action
        /**
        @internal
        */
        shift(action, type, start, end) {
          if (action & 131072) {
            this.pushState(action & 65535, this.pos);
          } else if ((action & 262144) == 0) {
            let nextState = action, { parser: parser4 } = this.p;
            this.pos = end;
            let skipped = parser4.stateFlag(
              nextState,
              1
              /* StateFlag.Skipped */
            );
            if (!skipped && (end > start || type <= parser4.maxNode))
              this.reducePos = end;
            this.pushState(nextState, skipped ? start : Math.min(start, this.reducePos));
            this.shiftContext(type, start);
            if (type <= parser4.maxNode)
              this.buffer.push(type, start, end, 4);
          } else {
            this.pos = end;
            this.shiftContext(type, start);
            if (type <= this.p.parser.maxNode)
              this.buffer.push(type, start, end, 4);
          }
        }
        // Apply an action
        /**
        @internal
        */
        apply(action, next, nextStart, nextEnd) {
          if (action & 65536)
            this.reduce(action);
          else
            this.shift(action, next, nextStart, nextEnd);
        }
        // Add a prebuilt (reused) node into the buffer.
        /**
        @internal
        */
        useNode(value, next) {
          let index = this.p.reused.length - 1;
          if (index < 0 || this.p.reused[index] != value) {
            this.p.reused.push(value);
            index++;
          }
          let start = this.pos;
          this.reducePos = this.pos = start + value.length;
          this.pushState(next, start);
          this.buffer.push(
            index,
            start,
            this.reducePos,
            -1
            /* size == -1 means this is a reused value */
          );
          if (this.curContext)
            this.updateContext(this.curContext.tracker.reuse(this.curContext.context, value, this, this.p.stream.reset(this.pos - value.length)));
        }
        // Split the stack. Due to the buffer sharing and the fact
        // that `this.stack` tends to stay quite shallow, this isn't very
        // expensive.
        /**
        @internal
        */
        split() {
          let parent = this;
          let off = parent.buffer.length;
          if (off && parent.buffer[off - 4] == 0)
            off -= 4;
          while (off > 0 && parent.buffer[off - 2] > parent.reducePos)
            off -= 4;
          let buffer = parent.buffer.slice(off), base2 = parent.bufferBase + off;
          while (parent && base2 == parent.bufferBase)
            parent = parent.parent;
          return new _Stack(this.p, this.stack.slice(), this.state, this.reducePos, this.pos, this.score, buffer, base2, this.curContext, this.lookAhead, parent);
        }
        // Try to recover from an error by 'deleting' (ignoring) one token.
        /**
        @internal
        */
        recoverByDelete(next, nextEnd) {
          let isNode = next <= this.p.parser.maxNode;
          if (isNode)
            this.storeNode(next, this.pos, nextEnd, 4);
          this.storeNode(0, this.pos, nextEnd, isNode ? 8 : 4);
          this.pos = this.reducePos = nextEnd;
          this.score -= 190;
        }
        /**
        Check if the given term would be able to be shifted (optionally
        after some reductions) on this stack. This can be useful for
        external tokenizers that want to make sure they only provide a
        given token when it applies.
        */
        canShift(term) {
          for (let sim = new SimulatedStack(this); ; ) {
            let action = this.p.parser.stateSlot(
              sim.state,
              4
              /* ParseState.DefaultReduce */
            ) || this.p.parser.hasAction(sim.state, term);
            if (action == 0)
              return false;
            if ((action & 65536) == 0)
              return true;
            sim.reduce(action);
          }
        }
        // Apply up to Recover.MaxNext recovery actions that conceptually
        // inserts some missing token or rule.
        /**
        @internal
        */
        recoverByInsert(next) {
          if (this.stack.length >= 300)
            return [];
          let nextStates = this.p.parser.nextStates(this.state);
          if (nextStates.length > 4 << 1 || this.stack.length >= 120) {
            let best = [];
            for (let i2 = 0, s; i2 < nextStates.length; i2 += 2) {
              if ((s = nextStates[i2 + 1]) != this.state && this.p.parser.hasAction(s, next))
                best.push(nextStates[i2], s);
            }
            if (this.stack.length < 120)
              for (let i2 = 0; best.length < 4 << 1 && i2 < nextStates.length; i2 += 2) {
                let s = nextStates[i2 + 1];
                if (!best.some((v, i3) => i3 & 1 && v == s))
                  best.push(nextStates[i2], s);
              }
            nextStates = best;
          }
          let result = [];
          for (let i2 = 0; i2 < nextStates.length && result.length < 4; i2 += 2) {
            let s = nextStates[i2 + 1];
            if (s == this.state)
              continue;
            let stack = this.split();
            stack.pushState(s, this.pos);
            stack.storeNode(0, stack.pos, stack.pos, 4, true);
            stack.shiftContext(nextStates[i2], this.pos);
            stack.reducePos = this.pos;
            stack.score -= 200;
            result.push(stack);
          }
          return result;
        }
        // Force a reduce, if possible. Return false if that can't
        // be done.
        /**
        @internal
        */
        forceReduce() {
          let { parser: parser4 } = this.p;
          let reduce = parser4.stateSlot(
            this.state,
            5
            /* ParseState.ForcedReduce */
          );
          if ((reduce & 65536) == 0)
            return false;
          if (!parser4.validAction(this.state, reduce)) {
            let depth = reduce >> 19, term = reduce & 65535;
            let target = this.stack.length - depth * 3;
            if (target < 0 || parser4.getGoto(this.stack[target], term, false) < 0) {
              let backup = this.findForcedReduction();
              if (backup == null)
                return false;
              reduce = backup;
            }
            this.storeNode(0, this.pos, this.pos, 4, true);
            this.score -= 100;
          }
          this.reducePos = this.pos;
          this.reduce(reduce);
          return true;
        }
        /**
        Try to scan through the automaton to find some kind of reduction
        that can be applied. Used when the regular ForcedReduce field
        isn't a valid action. @internal
        */
        findForcedReduction() {
          let { parser: parser4 } = this.p, seen = [];
          let explore = (state, depth) => {
            if (seen.includes(state))
              return;
            seen.push(state);
            return parser4.allActions(state, (action) => {
              if (action & (262144 | 131072)) ;
              else if (action & 65536) {
                let rDepth = (action >> 19) - depth;
                if (rDepth > 1) {
                  let term = action & 65535, target = this.stack.length - rDepth * 3;
                  if (target >= 0 && parser4.getGoto(this.stack[target], term, false) >= 0)
                    return rDepth << 19 | 65536 | term;
                }
              } else {
                let found = explore(action, depth + 1);
                if (found != null)
                  return found;
              }
            });
          };
          return explore(this.state, 0);
        }
        /**
        @internal
        */
        forceAll() {
          while (!this.p.parser.stateFlag(
            this.state,
            2
            /* StateFlag.Accepting */
          )) {
            if (!this.forceReduce()) {
              this.storeNode(0, this.pos, this.pos, 4, true);
              break;
            }
          }
          return this;
        }
        /**
        Check whether this state has no further actions (assumed to be a direct descendant of the
        top state, since any other states must be able to continue
        somehow). @internal
        */
        get deadEnd() {
          if (this.stack.length != 3)
            return false;
          let { parser: parser4 } = this.p;
          return parser4.data[parser4.stateSlot(
            this.state,
            1
            /* ParseState.Actions */
          )] == 65535 && !parser4.stateSlot(
            this.state,
            4
            /* ParseState.DefaultReduce */
          );
        }
        /**
        Restart the stack (put it back in its start state). Only safe
        when this.stack.length == 3 (state is directly below the top
        state). @internal
        */
        restart() {
          this.storeNode(0, this.pos, this.pos, 4, true);
          this.state = this.stack[0];
          this.stack.length = 0;
        }
        /**
        @internal
        */
        sameState(other) {
          if (this.state != other.state || this.stack.length != other.stack.length)
            return false;
          for (let i2 = 0; i2 < this.stack.length; i2 += 3)
            if (this.stack[i2] != other.stack[i2])
              return false;
          return true;
        }
        /**
        Get the parser used by this stack.
        */
        get parser() {
          return this.p.parser;
        }
        /**
        Test whether a given dialect (by numeric ID, as exported from
        the terms file) is enabled.
        */
        dialectEnabled(dialectID) {
          return this.p.parser.dialect.flags[dialectID];
        }
        shiftContext(term, start) {
          if (this.curContext)
            this.updateContext(this.curContext.tracker.shift(this.curContext.context, term, this, this.p.stream.reset(start)));
        }
        reduceContext(term, start) {
          if (this.curContext)
            this.updateContext(this.curContext.tracker.reduce(this.curContext.context, term, this, this.p.stream.reset(start)));
        }
        /**
        @internal
        */
        emitContext() {
          let last2 = this.buffer.length - 1;
          if (last2 < 0 || this.buffer[last2] != -3)
            this.buffer.push(this.curContext.hash, this.pos, this.pos, -3);
        }
        /**
        @internal
        */
        emitLookAhead() {
          let last2 = this.buffer.length - 1;
          if (last2 < 0 || this.buffer[last2] != -4)
            this.buffer.push(this.lookAhead, this.pos, this.pos, -4);
        }
        updateContext(context) {
          if (context != this.curContext.context) {
            let newCx = new StackContext(this.curContext.tracker, context);
            if (newCx.hash != this.curContext.hash)
              this.emitContext();
            this.curContext = newCx;
          }
        }
        /**
        @internal
        */
        setLookAhead(lookAhead) {
          if (lookAhead <= this.lookAhead)
            return false;
          this.emitLookAhead();
          this.lookAhead = lookAhead;
          return true;
        }
        /**
        @internal
        */
        close() {
          if (this.curContext && this.curContext.tracker.strict)
            this.emitContext();
          if (this.lookAhead > 0)
            this.emitLookAhead();
        }
      };
      StackContext = class {
        constructor(tracker, context) {
          this.tracker = tracker;
          this.context = context;
          this.hash = tracker.strict ? tracker.hash(context) : 0;
        }
      };
      SimulatedStack = class {
        constructor(start) {
          this.start = start;
          this.state = start.state;
          this.stack = start.stack;
          this.base = this.stack.length;
        }
        reduce(action) {
          let term = action & 65535, depth = action >> 19;
          if (depth == 0) {
            if (this.stack == this.start.stack)
              this.stack = this.stack.slice();
            this.stack.push(this.state, 0, 0);
            this.base += 3;
          } else {
            this.base -= (depth - 1) * 3;
          }
          let goto = this.start.p.parser.getGoto(this.stack[this.base - 3], term, true);
          this.state = goto;
        }
      };
      StackBufferCursor = class _StackBufferCursor {
        constructor(stack, pos, index) {
          this.stack = stack;
          this.pos = pos;
          this.index = index;
          this.buffer = stack.buffer;
          if (this.index == 0)
            this.maybeNext();
        }
        static create(stack, pos = stack.bufferBase + stack.buffer.length) {
          return new _StackBufferCursor(stack, pos, pos - stack.bufferBase);
        }
        maybeNext() {
          let next = this.stack.parent;
          if (next != null) {
            this.index = this.stack.bufferBase - next.bufferBase;
            this.stack = next;
            this.buffer = next.buffer;
          }
        }
        get id() {
          return this.buffer[this.index - 4];
        }
        get start() {
          return this.buffer[this.index - 3];
        }
        get end() {
          return this.buffer[this.index - 2];
        }
        get size() {
          return this.buffer[this.index - 1];
        }
        next() {
          this.index -= 4;
          this.pos -= 4;
          if (this.index == 0)
            this.maybeNext();
        }
        fork() {
          return new _StackBufferCursor(this.stack, this.pos, this.index);
        }
      };
      CachedToken = class {
        constructor() {
          this.start = -1;
          this.value = -1;
          this.end = -1;
          this.extended = -1;
          this.lookAhead = 0;
          this.mask = 0;
          this.context = 0;
        }
      };
      nullToken = new CachedToken();
      InputStream = class {
        /**
        @internal
        */
        constructor(input, ranges) {
          this.input = input;
          this.ranges = ranges;
          this.chunk = "";
          this.chunkOff = 0;
          this.chunk2 = "";
          this.chunk2Pos = 0;
          this.next = -1;
          this.token = nullToken;
          this.rangeIndex = 0;
          this.pos = this.chunkPos = ranges[0].from;
          this.range = ranges[0];
          this.end = ranges[ranges.length - 1].to;
          this.readNext();
        }
        /**
        @internal
        */
        resolveOffset(offset, assoc) {
          let range = this.range, index = this.rangeIndex;
          let pos = this.pos + offset;
          while (pos < range.from) {
            if (!index)
              return null;
            let next = this.ranges[--index];
            pos -= range.from - next.to;
            range = next;
          }
          while (assoc < 0 ? pos > range.to : pos >= range.to) {
            if (index == this.ranges.length - 1)
              return null;
            let next = this.ranges[++index];
            pos += next.from - range.to;
            range = next;
          }
          return pos;
        }
        /**
        @internal
        */
        clipPos(pos) {
          if (pos >= this.range.from && pos < this.range.to)
            return pos;
          for (let range of this.ranges)
            if (range.to > pos)
              return Math.max(pos, range.from);
          return this.end;
        }
        /**
        Look at a code unit near the stream position. `.peek(0)` equals
        `.next`, `.peek(-1)` gives you the previous character, and so
        on.
        
        Note that looking around during tokenizing creates dependencies
        on potentially far-away content, which may reduce the
        effectiveness incremental parsing—when looking forward—or even
        cause invalid reparses when looking backward more than 25 code
        units, since the library does not track lookbehind.
        */
        peek(offset) {
          let idx = this.chunkOff + offset, pos, result;
          if (idx >= 0 && idx < this.chunk.length) {
            pos = this.pos + offset;
            result = this.chunk.charCodeAt(idx);
          } else {
            let resolved = this.resolveOffset(offset, 1);
            if (resolved == null)
              return -1;
            pos = resolved;
            if (pos >= this.chunk2Pos && pos < this.chunk2Pos + this.chunk2.length) {
              result = this.chunk2.charCodeAt(pos - this.chunk2Pos);
            } else {
              let i2 = this.rangeIndex, range = this.range;
              while (range.to <= pos)
                range = this.ranges[++i2];
              this.chunk2 = this.input.chunk(this.chunk2Pos = pos);
              if (pos + this.chunk2.length > range.to)
                this.chunk2 = this.chunk2.slice(0, range.to - pos);
              result = this.chunk2.charCodeAt(0);
            }
          }
          if (pos >= this.token.lookAhead)
            this.token.lookAhead = pos + 1;
          return result;
        }
        /**
        Accept a token. By default, the end of the token is set to the
        current stream position, but you can pass an offset (relative to
        the stream position) to change that.
        */
        acceptToken(token, endOffset = 0) {
          let end = endOffset ? this.resolveOffset(endOffset, -1) : this.pos;
          if (end == null || end < this.token.start)
            throw new RangeError("Token end out of bounds");
          this.token.value = token;
          this.token.end = end;
        }
        /**
        Accept a token ending at a specific given position.
        */
        acceptTokenTo(token, endPos) {
          this.token.value = token;
          this.token.end = endPos;
        }
        getChunk() {
          if (this.pos >= this.chunk2Pos && this.pos < this.chunk2Pos + this.chunk2.length) {
            let { chunk, chunkPos } = this;
            this.chunk = this.chunk2;
            this.chunkPos = this.chunk2Pos;
            this.chunk2 = chunk;
            this.chunk2Pos = chunkPos;
            this.chunkOff = this.pos - this.chunkPos;
          } else {
            this.chunk2 = this.chunk;
            this.chunk2Pos = this.chunkPos;
            let nextChunk = this.input.chunk(this.pos);
            let end = this.pos + nextChunk.length;
            this.chunk = end > this.range.to ? nextChunk.slice(0, this.range.to - this.pos) : nextChunk;
            this.chunkPos = this.pos;
            this.chunkOff = 0;
          }
        }
        readNext() {
          if (this.chunkOff >= this.chunk.length) {
            this.getChunk();
            if (this.chunkOff == this.chunk.length)
              return this.next = -1;
          }
          return this.next = this.chunk.charCodeAt(this.chunkOff);
        }
        /**
        Move the stream forward N (defaults to 1) code units. Returns
        the new value of [`next`](#lr.InputStream.next).
        */
        advance(n = 1) {
          this.chunkOff += n;
          while (this.pos + n >= this.range.to) {
            if (this.rangeIndex == this.ranges.length - 1)
              return this.setDone();
            n -= this.range.to - this.pos;
            this.range = this.ranges[++this.rangeIndex];
            this.pos = this.range.from;
          }
          this.pos += n;
          if (this.pos >= this.token.lookAhead)
            this.token.lookAhead = this.pos + 1;
          return this.readNext();
        }
        setDone() {
          this.pos = this.chunkPos = this.end;
          this.range = this.ranges[this.rangeIndex = this.ranges.length - 1];
          this.chunk = "";
          return this.next = -1;
        }
        /**
        @internal
        */
        reset(pos, token) {
          if (token) {
            this.token = token;
            token.start = pos;
            token.lookAhead = pos + 1;
            token.value = token.extended = -1;
          } else {
            this.token = nullToken;
          }
          if (this.pos != pos) {
            this.pos = pos;
            if (pos == this.end) {
              this.setDone();
              return this;
            }
            while (pos < this.range.from)
              this.range = this.ranges[--this.rangeIndex];
            while (pos >= this.range.to)
              this.range = this.ranges[++this.rangeIndex];
            if (pos >= this.chunkPos && pos < this.chunkPos + this.chunk.length) {
              this.chunkOff = pos - this.chunkPos;
            } else {
              this.chunk = "";
              this.chunkOff = 0;
            }
            this.readNext();
          }
          return this;
        }
        /**
        @internal
        */
        read(from, to) {
          if (from >= this.chunkPos && to <= this.chunkPos + this.chunk.length)
            return this.chunk.slice(from - this.chunkPos, to - this.chunkPos);
          if (from >= this.chunk2Pos && to <= this.chunk2Pos + this.chunk2.length)
            return this.chunk2.slice(from - this.chunk2Pos, to - this.chunk2Pos);
          if (from >= this.range.from && to <= this.range.to)
            return this.input.read(from, to);
          let result = "";
          for (let r of this.ranges) {
            if (r.from >= to)
              break;
            if (r.to > from)
              result += this.input.read(Math.max(r.from, from), Math.min(r.to, to));
          }
          return result;
        }
      };
      TokenGroup = class {
        constructor(data, id2) {
          this.data = data;
          this.id = id2;
        }
        token(input, stack) {
          let { parser: parser4 } = stack.p;
          readToken(this.data, input, stack, this.id, parser4.data, parser4.tokenPrecTable);
        }
      };
      TokenGroup.prototype.contextual = TokenGroup.prototype.fallback = TokenGroup.prototype.extend = false;
      LocalTokenGroup = class {
        constructor(data, precTable, elseToken) {
          this.precTable = precTable;
          this.elseToken = elseToken;
          this.data = typeof data == "string" ? decodeArray(data) : data;
        }
        token(input, stack) {
          let start = input.pos, skipped = 0;
          for (; ; ) {
            let atEof = input.next < 0, nextPos = input.resolveOffset(1, 1);
            readToken(this.data, input, stack, 0, this.data, this.precTable);
            if (input.token.value > -1)
              break;
            if (this.elseToken == null)
              return;
            if (!atEof)
              skipped++;
            if (nextPos == null)
              break;
            input.reset(nextPos, input.token);
          }
          if (skipped) {
            input.reset(start, input.token);
            input.acceptToken(this.elseToken, skipped);
          }
        }
      };
      LocalTokenGroup.prototype.contextual = TokenGroup.prototype.fallback = TokenGroup.prototype.extend = false;
      ExternalTokenizer = class {
        /**
        Create a tokenizer. The first argument is the function that,
        given an input stream, scans for the types of tokens it
        recognizes at the stream's position, and calls
        [`acceptToken`](#lr.InputStream.acceptToken) when it finds
        one.
        */
        constructor(token, options = {}) {
          this.token = token;
          this.contextual = !!options.contextual;
          this.fallback = !!options.fallback;
          this.extend = !!options.extend;
        }
      };
      verbose = typeof process != "undefined" && process.env && /\bparse\b/.test(process.env.LOG);
      stackIDs = null;
      FragmentCursor = class {
        constructor(fragments, nodeSet) {
          this.fragments = fragments;
          this.nodeSet = nodeSet;
          this.i = 0;
          this.fragment = null;
          this.safeFrom = -1;
          this.safeTo = -1;
          this.trees = [];
          this.start = [];
          this.index = [];
          this.nextFragment();
        }
        nextFragment() {
          let fr = this.fragment = this.i == this.fragments.length ? null : this.fragments[this.i++];
          if (fr) {
            this.safeFrom = fr.openStart ? cutAt(fr.tree, fr.from + fr.offset, 1) - fr.offset : fr.from;
            this.safeTo = fr.openEnd ? cutAt(fr.tree, fr.to + fr.offset, -1) - fr.offset : fr.to;
            while (this.trees.length) {
              this.trees.pop();
              this.start.pop();
              this.index.pop();
            }
            this.trees.push(fr.tree);
            this.start.push(-fr.offset);
            this.index.push(0);
            this.nextStart = this.safeFrom;
          } else {
            this.nextStart = 1e9;
          }
        }
        // `pos` must be >= any previously given `pos` for this cursor
        nodeAt(pos) {
          if (pos < this.nextStart)
            return null;
          while (this.fragment && this.safeTo <= pos)
            this.nextFragment();
          if (!this.fragment)
            return null;
          for (; ; ) {
            let last2 = this.trees.length - 1;
            if (last2 < 0) {
              this.nextFragment();
              return null;
            }
            let top2 = this.trees[last2], index = this.index[last2];
            if (index == top2.children.length) {
              this.trees.pop();
              this.start.pop();
              this.index.pop();
              continue;
            }
            let next = top2.children[index];
            let start = this.start[last2] + top2.positions[index];
            if (start > pos) {
              this.nextStart = start;
              return null;
            }
            if (next instanceof Tree) {
              if (start == pos) {
                if (start < this.safeFrom)
                  return null;
                let end = start + next.length;
                if (end <= this.safeTo) {
                  let lookAhead = next.prop(NodeProp.lookAhead);
                  if (!lookAhead || end + lookAhead < this.fragment.to)
                    return next;
                }
              }
              this.index[last2]++;
              if (start + next.length >= Math.max(this.safeFrom, pos)) {
                this.trees.push(next);
                this.start.push(start);
                this.index.push(0);
              }
            } else {
              this.index[last2]++;
              this.nextStart = start + next.length;
            }
          }
        }
      };
      TokenCache = class {
        constructor(parser4, stream) {
          this.stream = stream;
          this.tokens = [];
          this.mainToken = null;
          this.actions = [];
          this.tokens = parser4.tokenizers.map((_) => new CachedToken());
        }
        getActions(stack) {
          let actionIndex = 0;
          let main = null;
          let { parser: parser4 } = stack.p, { tokenizers } = parser4;
          let mask = parser4.stateSlot(
            stack.state,
            3
            /* ParseState.TokenizerMask */
          );
          let context = stack.curContext ? stack.curContext.hash : 0;
          let lookAhead = 0;
          for (let i2 = 0; i2 < tokenizers.length; i2++) {
            if ((1 << i2 & mask) == 0)
              continue;
            let tokenizer = tokenizers[i2], token = this.tokens[i2];
            if (main && !tokenizer.fallback)
              continue;
            if (tokenizer.contextual || token.start != stack.pos || token.mask != mask || token.context != context) {
              this.updateCachedToken(token, tokenizer, stack);
              token.mask = mask;
              token.context = context;
            }
            if (token.lookAhead > token.end + 25)
              lookAhead = Math.max(token.lookAhead, lookAhead);
            if (token.value != 0) {
              let startIndex = actionIndex;
              if (token.extended > -1)
                actionIndex = this.addActions(stack, token.extended, token.end, actionIndex);
              actionIndex = this.addActions(stack, token.value, token.end, actionIndex);
              if (!tokenizer.extend) {
                main = token;
                if (actionIndex > startIndex)
                  break;
              }
            }
          }
          while (this.actions.length > actionIndex)
            this.actions.pop();
          if (lookAhead)
            stack.setLookAhead(lookAhead);
          if (!main && stack.pos == this.stream.end) {
            main = new CachedToken();
            main.value = stack.p.parser.eofTerm;
            main.start = main.end = stack.pos;
            actionIndex = this.addActions(stack, main.value, main.end, actionIndex);
          }
          this.mainToken = main;
          return this.actions;
        }
        getMainToken(stack) {
          if (this.mainToken)
            return this.mainToken;
          let main = new CachedToken(), { pos, p } = stack;
          main.start = pos;
          main.end = Math.min(pos + 1, p.stream.end);
          main.value = pos == p.stream.end ? p.parser.eofTerm : 0;
          return main;
        }
        updateCachedToken(token, tokenizer, stack) {
          let start = this.stream.clipPos(stack.pos);
          tokenizer.token(this.stream.reset(start, token), stack);
          if (token.value > -1) {
            let { parser: parser4 } = stack.p;
            for (let i2 = 0; i2 < parser4.specialized.length; i2++)
              if (parser4.specialized[i2] == token.value) {
                let result = parser4.specializers[i2](this.stream.read(token.start, token.end), stack);
                if (result >= 0 && stack.p.parser.dialect.allows(result >> 1)) {
                  if ((result & 1) == 0)
                    token.value = result >> 1;
                  else
                    token.extended = result >> 1;
                  break;
                }
              }
          } else {
            token.value = 0;
            token.end = this.stream.clipPos(start + 1);
          }
        }
        putAction(action, token, end, index) {
          for (let i2 = 0; i2 < index; i2 += 3)
            if (this.actions[i2] == action)
              return index;
          this.actions[index++] = action;
          this.actions[index++] = token;
          this.actions[index++] = end;
          return index;
        }
        addActions(stack, token, end, index) {
          let { state } = stack, { parser: parser4 } = stack.p, { data } = parser4;
          for (let set = 0; set < 2; set++) {
            for (let i2 = parser4.stateSlot(
              state,
              set ? 2 : 1
              /* ParseState.Actions */
            ); ; i2 += 3) {
              if (data[i2] == 65535) {
                if (data[i2 + 1] == 1) {
                  i2 = pair(data, i2 + 2);
                } else {
                  if (index == 0 && data[i2 + 1] == 2)
                    index = this.putAction(pair(data, i2 + 2), token, end, index);
                  break;
                }
              }
              if (data[i2] == token)
                index = this.putAction(pair(data, i2 + 1), token, end, index);
            }
          }
          return index;
        }
      };
      Parse = class {
        constructor(parser4, input, fragments, ranges) {
          this.parser = parser4;
          this.input = input;
          this.ranges = ranges;
          this.recovering = 0;
          this.nextStackID = 9812;
          this.minStackPos = 0;
          this.reused = [];
          this.stoppedAt = null;
          this.lastBigReductionStart = -1;
          this.lastBigReductionSize = 0;
          this.bigReductionCount = 0;
          this.stream = new InputStream(input, ranges);
          this.tokens = new TokenCache(parser4, this.stream);
          this.topTerm = parser4.top[1];
          let { from } = ranges[0];
          this.stacks = [Stack.start(this, parser4.top[0], from)];
          this.fragments = fragments.length && this.stream.end - from > parser4.bufferLength * 4 ? new FragmentCursor(fragments, parser4.nodeSet) : null;
        }
        get parsedPos() {
          return this.minStackPos;
        }
        // Move the parser forward. This will process all parse stacks at
        // `this.pos` and try to advance them to a further position. If no
        // stack for such a position is found, it'll start error-recovery.
        //
        // When the parse is finished, this will return a syntax tree. When
        // not, it returns `null`.
        advance() {
          let stacks = this.stacks, pos = this.minStackPos;
          let newStacks = this.stacks = [];
          let stopped, stoppedTokens;
          if (this.bigReductionCount > 300 && stacks.length == 1) {
            let [s] = stacks;
            while (s.forceReduce() && s.stack.length && s.stack[s.stack.length - 2] >= this.lastBigReductionStart) {
            }
            this.bigReductionCount = this.lastBigReductionSize = 0;
          }
          for (let i2 = 0; i2 < stacks.length; i2++) {
            let stack = stacks[i2];
            for (; ; ) {
              this.tokens.mainToken = null;
              if (stack.pos > pos) {
                newStacks.push(stack);
              } else if (this.advanceStack(stack, newStacks, stacks)) {
                continue;
              } else {
                if (!stopped) {
                  stopped = [];
                  stoppedTokens = [];
                }
                stopped.push(stack);
                let tok = this.tokens.getMainToken(stack);
                stoppedTokens.push(tok.value, tok.end);
              }
              break;
            }
          }
          if (!newStacks.length) {
            let finished = stopped && findFinished(stopped);
            if (finished) {
              if (verbose)
                console.log("Finish with " + this.stackID(finished));
              return this.stackToTree(finished);
            }
            if (this.parser.strict) {
              if (verbose && stopped)
                console.log("Stuck with token " + (this.tokens.mainToken ? this.parser.getName(this.tokens.mainToken.value) : "none"));
              throw new SyntaxError("No parse at " + pos);
            }
            if (!this.recovering)
              this.recovering = 5;
          }
          if (this.recovering && stopped) {
            let finished = this.stoppedAt != null && stopped[0].pos > this.stoppedAt ? stopped[0] : this.runRecovery(stopped, stoppedTokens, newStacks);
            if (finished) {
              if (verbose)
                console.log("Force-finish " + this.stackID(finished));
              return this.stackToTree(finished.forceAll());
            }
          }
          if (this.recovering) {
            let maxRemaining = this.recovering == 1 ? 1 : this.recovering * 3;
            if (newStacks.length > maxRemaining) {
              newStacks.sort((a2, b) => b.score - a2.score);
              while (newStacks.length > maxRemaining)
                newStacks.pop();
            }
            if (newStacks.some((s) => s.reducePos > pos))
              this.recovering--;
          } else if (newStacks.length > 1) {
            outer: for (let i2 = 0; i2 < newStacks.length - 1; i2++) {
              let stack = newStacks[i2];
              for (let j = i2 + 1; j < newStacks.length; j++) {
                let other = newStacks[j];
                if (stack.sameState(other) || stack.buffer.length > 500 && other.buffer.length > 500) {
                  if ((stack.score - other.score || stack.buffer.length - other.buffer.length) > 0) {
                    newStacks.splice(j--, 1);
                  } else {
                    newStacks.splice(i2--, 1);
                    continue outer;
                  }
                }
              }
            }
            if (newStacks.length > 12) {
              newStacks.sort((a2, b) => b.score - a2.score);
              newStacks.splice(
                12,
                newStacks.length - 12
                /* Rec.MaxStackCount */
              );
            }
          }
          this.minStackPos = newStacks[0].pos;
          for (let i2 = 1; i2 < newStacks.length; i2++)
            if (newStacks[i2].pos < this.minStackPos)
              this.minStackPos = newStacks[i2].pos;
          return null;
        }
        stopAt(pos) {
          if (this.stoppedAt != null && this.stoppedAt < pos)
            throw new RangeError("Can't move stoppedAt forward");
          this.stoppedAt = pos;
        }
        // Returns an updated version of the given stack, or null if the
        // stack can't advance normally. When `split` and `stacks` are
        // given, stacks split off by ambiguous operations will be pushed to
        // `split`, or added to `stacks` if they move `pos` forward.
        advanceStack(stack, stacks, split) {
          let start = stack.pos, { parser: parser4 } = this;
          let base2 = verbose ? this.stackID(stack) + " -> " : "";
          if (this.stoppedAt != null && start > this.stoppedAt)
            return stack.forceReduce() ? stack : null;
          if (this.fragments) {
            let strictCx = stack.curContext && stack.curContext.tracker.strict, cxHash = strictCx ? stack.curContext.hash : 0;
            for (let cached = this.fragments.nodeAt(start); cached; ) {
              let match = this.parser.nodeSet.types[cached.type.id] == cached.type ? parser4.getGoto(stack.state, cached.type.id) : -1;
              if (match > -1 && cached.length && (!strictCx || (cached.prop(NodeProp.contextHash) || 0) == cxHash)) {
                stack.useNode(cached, match);
                if (verbose)
                  console.log(base2 + this.stackID(stack) + ` (via reuse of ${parser4.getName(cached.type.id)})`);
                return true;
              }
              if (!(cached instanceof Tree) || cached.children.length == 0 || cached.positions[0] > 0)
                break;
              let inner = cached.children[0];
              if (inner instanceof Tree && cached.positions[0] == 0)
                cached = inner;
              else
                break;
            }
          }
          let defaultReduce = parser4.stateSlot(
            stack.state,
            4
            /* ParseState.DefaultReduce */
          );
          if (defaultReduce > 0) {
            stack.reduce(defaultReduce);
            if (verbose)
              console.log(base2 + this.stackID(stack) + ` (via always-reduce ${parser4.getName(
                defaultReduce & 65535
                /* Action.ValueMask */
              )})`);
            return true;
          }
          if (stack.stack.length >= 8400) {
            while (stack.stack.length > 6e3 && stack.forceReduce()) {
            }
          }
          let actions = this.tokens.getActions(stack);
          for (let i2 = 0; i2 < actions.length; ) {
            let action = actions[i2++], term = actions[i2++], end = actions[i2++];
            let last2 = i2 == actions.length || !split;
            let localStack = last2 ? stack : stack.split();
            let main = this.tokens.mainToken;
            localStack.apply(action, term, main ? main.start : localStack.pos, end);
            if (verbose)
              console.log(base2 + this.stackID(localStack) + ` (via ${(action & 65536) == 0 ? "shift" : `reduce of ${parser4.getName(
                action & 65535
                /* Action.ValueMask */
              )}`} for ${parser4.getName(term)} @ ${start}${localStack == stack ? "" : ", split"})`);
            if (last2)
              return true;
            else if (localStack.pos > start)
              stacks.push(localStack);
            else
              split.push(localStack);
          }
          return false;
        }
        // Advance a given stack forward as far as it will go. Returns the
        // (possibly updated) stack if it got stuck, or null if it moved
        // forward and was given to `pushStackDedup`.
        advanceFully(stack, newStacks) {
          let pos = stack.pos;
          for (; ; ) {
            if (!this.advanceStack(stack, null, null))
              return false;
            if (stack.pos > pos) {
              pushStackDedup(stack, newStacks);
              return true;
            }
          }
        }
        runRecovery(stacks, tokens, newStacks) {
          let finished = null, restarted = false;
          for (let i2 = 0; i2 < stacks.length; i2++) {
            let stack = stacks[i2], token = tokens[i2 << 1], tokenEnd = tokens[(i2 << 1) + 1];
            let base2 = verbose ? this.stackID(stack) + " -> " : "";
            if (stack.deadEnd) {
              if (restarted)
                continue;
              restarted = true;
              stack.restart();
              if (verbose)
                console.log(base2 + this.stackID(stack) + " (restarted)");
              let done = this.advanceFully(stack, newStacks);
              if (done)
                continue;
            }
            let force = stack.split(), forceBase = base2;
            for (let j = 0; j < 10 && force.forceReduce(); j++) {
              if (verbose)
                console.log(forceBase + this.stackID(force) + " (via force-reduce)");
              let done = this.advanceFully(force, newStacks);
              if (done)
                break;
              if (verbose)
                forceBase = this.stackID(force) + " -> ";
            }
            for (let insert2 of stack.recoverByInsert(token)) {
              if (verbose)
                console.log(base2 + this.stackID(insert2) + " (via recover-insert)");
              this.advanceFully(insert2, newStacks);
            }
            if (this.stream.end > stack.pos) {
              if (tokenEnd == stack.pos) {
                tokenEnd++;
                token = 0;
              }
              stack.recoverByDelete(token, tokenEnd);
              if (verbose)
                console.log(base2 + this.stackID(stack) + ` (via recover-delete ${this.parser.getName(token)})`);
              pushStackDedup(stack, newStacks);
            } else if (!finished || finished.score < force.score) {
              finished = force;
            }
          }
          return finished;
        }
        // Convert the stack's buffer to a syntax tree.
        stackToTree(stack) {
          stack.close();
          return Tree.build({
            buffer: StackBufferCursor.create(stack),
            nodeSet: this.parser.nodeSet,
            topID: this.topTerm,
            maxBufferLength: this.parser.bufferLength,
            reused: this.reused,
            start: this.ranges[0].from,
            length: stack.pos - this.ranges[0].from,
            minRepeatType: this.parser.minRepeatTerm
          });
        }
        stackID(stack) {
          let id2 = (stackIDs || (stackIDs = /* @__PURE__ */ new WeakMap())).get(stack);
          if (!id2)
            stackIDs.set(stack, id2 = String.fromCodePoint(this.nextStackID++));
          return id2 + stack;
        }
      };
      Dialect = class {
        constructor(source, flags, disabled) {
          this.source = source;
          this.flags = flags;
          this.disabled = disabled;
        }
        allows(term) {
          return !this.disabled || this.disabled[term] == 0;
        }
      };
      id = (x) => x;
      ContextTracker = class {
        /**
        Define a context tracker.
        */
        constructor(spec) {
          this.start = spec.start;
          this.shift = spec.shift || id;
          this.reduce = spec.reduce || id;
          this.reuse = spec.reuse || id;
          this.hash = spec.hash || (() => 0);
          this.strict = spec.strict !== false;
        }
      };
      LRParser = class _LRParser extends Parser {
        /**
        @internal
        */
        constructor(spec) {
          super();
          this.wrappers = [];
          if (spec.version != 14)
            throw new RangeError(`Parser version (${spec.version}) doesn't match runtime version (${14})`);
          let nodeNames = spec.nodeNames.split(" ");
          this.minRepeatTerm = nodeNames.length;
          for (let i2 = 0; i2 < spec.repeatNodeCount; i2++)
            nodeNames.push("");
          let topTerms = Object.keys(spec.topRules).map((r) => spec.topRules[r][1]);
          let nodeProps = [];
          for (let i2 = 0; i2 < nodeNames.length; i2++)
            nodeProps.push([]);
          function setProp(nodeID, prop, value) {
            nodeProps[nodeID].push([prop, prop.deserialize(String(value))]);
          }
          if (spec.nodeProps)
            for (let propSpec of spec.nodeProps) {
              let prop = propSpec[0];
              if (typeof prop == "string")
                prop = NodeProp[prop];
              for (let i2 = 1; i2 < propSpec.length; ) {
                let next = propSpec[i2++];
                if (next >= 0) {
                  setProp(next, prop, propSpec[i2++]);
                } else {
                  let value = propSpec[i2 + -next];
                  for (let j = -next; j > 0; j--)
                    setProp(propSpec[i2++], prop, value);
                  i2++;
                }
              }
            }
          this.nodeSet = new NodeSet(nodeNames.map((name2, i2) => NodeType.define({
            name: i2 >= this.minRepeatTerm ? void 0 : name2,
            id: i2,
            props: nodeProps[i2],
            top: topTerms.indexOf(i2) > -1,
            error: i2 == 0,
            skipped: spec.skippedNodes && spec.skippedNodes.indexOf(i2) > -1
          })));
          if (spec.propSources)
            this.nodeSet = this.nodeSet.extend(...spec.propSources);
          this.strict = false;
          this.bufferLength = DefaultBufferLength;
          let tokenArray = decodeArray(spec.tokenData);
          this.context = spec.context;
          this.specializerSpecs = spec.specialized || [];
          this.specialized = new Uint16Array(this.specializerSpecs.length);
          for (let i2 = 0; i2 < this.specializerSpecs.length; i2++)
            this.specialized[i2] = this.specializerSpecs[i2].term;
          this.specializers = this.specializerSpecs.map(getSpecializer);
          this.states = decodeArray(spec.states, Uint32Array);
          this.data = decodeArray(spec.stateData);
          this.goto = decodeArray(spec.goto);
          this.maxTerm = spec.maxTerm;
          this.tokenizers = spec.tokenizers.map((value) => typeof value == "number" ? new TokenGroup(tokenArray, value) : value);
          this.topRules = spec.topRules;
          this.dialects = spec.dialects || {};
          this.dynamicPrecedences = spec.dynamicPrecedences || null;
          this.tokenPrecTable = spec.tokenPrec;
          this.termNames = spec.termNames || null;
          this.maxNode = this.nodeSet.types.length - 1;
          this.dialect = this.parseDialect();
          this.top = this.topRules[Object.keys(this.topRules)[0]];
        }
        createParse(input, fragments, ranges) {
          let parse = new Parse(this, input, fragments, ranges);
          for (let w of this.wrappers)
            parse = w(parse, input, fragments, ranges);
          return parse;
        }
        /**
        Get a goto table entry @internal
        */
        getGoto(state, term, loose = false) {
          let table = this.goto;
          if (term >= table[0])
            return -1;
          for (let pos = table[term + 1]; ; ) {
            let groupTag = table[pos++], last2 = groupTag & 1;
            let target = table[pos++];
            if (last2 && loose)
              return target;
            for (let end = pos + (groupTag >> 1); pos < end; pos++)
              if (table[pos] == state)
                return target;
            if (last2)
              return -1;
          }
        }
        /**
        Check if this state has an action for a given terminal @internal
        */
        hasAction(state, terminal) {
          let data = this.data;
          for (let set = 0; set < 2; set++) {
            for (let i2 = this.stateSlot(
              state,
              set ? 2 : 1
              /* ParseState.Actions */
            ), next; ; i2 += 3) {
              if ((next = data[i2]) == 65535) {
                if (data[i2 + 1] == 1)
                  next = data[i2 = pair(data, i2 + 2)];
                else if (data[i2 + 1] == 2)
                  return pair(data, i2 + 2);
                else
                  break;
              }
              if (next == terminal || next == 0)
                return pair(data, i2 + 1);
            }
          }
          return 0;
        }
        /**
        @internal
        */
        stateSlot(state, slot) {
          return this.states[state * 6 + slot];
        }
        /**
        @internal
        */
        stateFlag(state, flag) {
          return (this.stateSlot(
            state,
            0
            /* ParseState.Flags */
          ) & flag) > 0;
        }
        /**
        @internal
        */
        validAction(state, action) {
          return !!this.allActions(state, (a2) => a2 == action ? true : null);
        }
        /**
        @internal
        */
        allActions(state, action) {
          let deflt = this.stateSlot(
            state,
            4
            /* ParseState.DefaultReduce */
          );
          let result = deflt ? action(deflt) : void 0;
          for (let i2 = this.stateSlot(
            state,
            1
            /* ParseState.Actions */
          ); result == null; i2 += 3) {
            if (this.data[i2] == 65535) {
              if (this.data[i2 + 1] == 1)
                i2 = pair(this.data, i2 + 2);
              else
                break;
            }
            result = action(pair(this.data, i2 + 1));
          }
          return result;
        }
        /**
        Get the states that can follow this one through shift actions or
        goto jumps. @internal
        */
        nextStates(state) {
          let result = [];
          for (let i2 = this.stateSlot(
            state,
            1
            /* ParseState.Actions */
          ); ; i2 += 3) {
            if (this.data[i2] == 65535) {
              if (this.data[i2 + 1] == 1)
                i2 = pair(this.data, i2 + 2);
              else
                break;
            }
            if ((this.data[i2 + 2] & 65536 >> 16) == 0) {
              let value = this.data[i2 + 1];
              if (!result.some((v, i3) => i3 & 1 && v == value))
                result.push(this.data[i2], value);
            }
          }
          return result;
        }
        /**
        Configure the parser. Returns a new parser instance that has the
        given settings modified. Settings not provided in `config` are
        kept from the original parser.
        */
        configure(config) {
          let copy = Object.assign(Object.create(_LRParser.prototype), this);
          if (config.props)
            copy.nodeSet = this.nodeSet.extend(...config.props);
          if (config.top) {
            let info = this.topRules[config.top];
            if (!info)
              throw new RangeError(`Invalid top rule name ${config.top}`);
            copy.top = info;
          }
          if (config.tokenizers)
            copy.tokenizers = this.tokenizers.map((t2) => {
              let found = config.tokenizers.find((r) => r.from == t2);
              return found ? found.to : t2;
            });
          if (config.specializers) {
            copy.specializers = this.specializers.slice();
            copy.specializerSpecs = this.specializerSpecs.map((s, i2) => {
              let found = config.specializers.find((r) => r.from == s.external);
              if (!found)
                return s;
              let spec = Object.assign(Object.assign({}, s), { external: found.to });
              copy.specializers[i2] = getSpecializer(spec);
              return spec;
            });
          }
          if (config.contextTracker)
            copy.context = config.contextTracker;
          if (config.dialect)
            copy.dialect = this.parseDialect(config.dialect);
          if (config.strict != null)
            copy.strict = config.strict;
          if (config.wrap)
            copy.wrappers = copy.wrappers.concat(config.wrap);
          if (config.bufferLength != null)
            copy.bufferLength = config.bufferLength;
          return copy;
        }
        /**
        Tells you whether any [parse wrappers](#lr.ParserConfig.wrap)
        are registered for this parser.
        */
        hasWrappers() {
          return this.wrappers.length > 0;
        }
        /**
        Returns the name associated with a given term. This will only
        work for all terms when the parser was generated with the
        `--names` option. By default, only the names of tagged terms are
        stored.
        */
        getName(term) {
          return this.termNames ? this.termNames[term] : String(term <= this.maxNode && this.nodeSet.types[term].name || term);
        }
        /**
        The eof term id is always allocated directly after the node
        types. @internal
        */
        get eofTerm() {
          return this.maxNode + 1;
        }
        /**
        The type of top node produced by the parser.
        */
        get topNode() {
          return this.nodeSet.types[this.top[1]];
        }
        /**
        @internal
        */
        dynamicPrecedence(term) {
          let prec2 = this.dynamicPrecedences;
          return prec2 == null ? 0 : prec2[term] || 0;
        }
        /**
        @internal
        */
        parseDialect(dialect) {
          let values = Object.keys(this.dialects), flags = values.map(() => false);
          if (dialect)
            for (let part of dialect.split(" ")) {
              let id2 = values.indexOf(part);
              if (id2 >= 0)
                flags[id2] = true;
            }
          let disabled = null;
          for (let i2 = 0; i2 < values.length; i2++)
            if (!flags[i2]) {
              for (let j = this.dialects[values[i2]], id2; (id2 = this.data[j++]) != 65535; )
                (disabled || (disabled = new Uint8Array(this.maxTerm + 1)))[id2] = 1;
            }
          return new Dialect(dialect, flags, disabled);
        }
        /**
        Used by the output of the parser generator. Not available to
        user code. @hide
        */
        static deserialize(spec) {
          return new _LRParser(spec);
        }
      };
    }
  });

  // node_modules/@lezer/cpp/dist/index.js
  var RawString, templateArgsEndFallback, MacroName, R, L, u, U, a, z, A, Z, Underscore, Zero, Quote, ParenL, ParenR, Space, GreaterThan, rawString, fallback, cppHighlighting, spec_identifier, spec_, spec_templateArgsEnd, spec_scopedIdentifier, parser;
  var init_dist7 = __esm({
    "node_modules/@lezer/cpp/dist/index.js"() {
      init_dist6();
      init_dist4();
      RawString = 1;
      templateArgsEndFallback = 2;
      MacroName = 3;
      R = 82;
      L = 76;
      u = 117;
      U = 85;
      a = 97;
      z = 122;
      A = 65;
      Z = 90;
      Underscore = 95;
      Zero = 48;
      Quote = 34;
      ParenL = 40;
      ParenR = 41;
      Space = 32;
      GreaterThan = 62;
      rawString = new ExternalTokenizer((input) => {
        if (input.next == L || input.next == U) {
          input.advance();
        } else if (input.next == u) {
          input.advance();
          if (input.next == Zero + 8) input.advance();
        }
        if (input.next != R) return;
        input.advance();
        if (input.next != Quote) return;
        input.advance();
        let marker = "";
        while (input.next != ParenL) {
          if (input.next == Space || input.next <= 13 || input.next == ParenR) return;
          marker += String.fromCharCode(input.next);
          input.advance();
        }
        input.advance();
        for (; ; ) {
          if (input.next < 0)
            return input.acceptToken(RawString);
          if (input.next == ParenR) {
            let match = true;
            for (let i2 = 0; match && i2 < marker.length; i2++)
              if (input.peek(i2 + 1) != marker.charCodeAt(i2)) match = false;
            if (match && input.peek(marker.length + 1) == Quote)
              return input.acceptToken(RawString, 2 + marker.length);
          }
          input.advance();
        }
      });
      fallback = new ExternalTokenizer((input) => {
        if (input.next == GreaterThan) {
          if (input.peek(1) == GreaterThan)
            input.acceptToken(templateArgsEndFallback, 1);
        } else {
          let sawLetter = false, i2 = 0;
          for (; ; i2++) {
            if (input.next >= A && input.next <= Z) sawLetter = true;
            else if (input.next >= a && input.next <= z) return;
            else if (input.next != Underscore && !(input.next >= Zero && input.next <= Zero + 9)) break;
            input.advance();
          }
          if (sawLetter && i2 > 1) input.acceptToken(MacroName);
        }
      }, { extend: true });
      cppHighlighting = styleTags({
        "typedef struct union enum class typename decltype auto template operator friend noexcept namespace using requires concept import export module __attribute__ __declspec __based": tags.definitionKeyword,
        "extern MsCallModifier MsPointerModifier extern static register thread_local inline const volatile restrict _Atomic mutable constexpr constinit consteval virtual explicit VirtualSpecifier Access": tags.modifier,
        "if else switch for while do case default return break continue goto throw try catch": tags.controlKeyword,
        "co_return co_yield co_await": tags.controlKeyword,
        "new sizeof delete static_assert": tags.operatorKeyword,
        "NULL nullptr": tags.null,
        this: tags.self,
        "True False": tags.bool,
        "TypeSize PrimitiveType": tags.standard(tags.typeName),
        TypeIdentifier: tags.typeName,
        FieldIdentifier: tags.propertyName,
        "CallExpression/FieldExpression/FieldIdentifier": tags.function(tags.propertyName),
        "ModuleName/Identifier": tags.namespace,
        "PartitionName": tags.labelName,
        StatementIdentifier: tags.labelName,
        "Identifier DestructorName": tags.variableName,
        "CallExpression/Identifier": tags.function(tags.variableName),
        "CallExpression/ScopedIdentifier/Identifier": tags.function(tags.variableName),
        "FunctionDeclarator/Identifier FunctionDeclarator/DestructorName": tags.function(tags.definition(tags.variableName)),
        NamespaceIdentifier: tags.namespace,
        OperatorName: tags.operator,
        ArithOp: tags.arithmeticOperator,
        LogicOp: tags.logicOperator,
        BitOp: tags.bitwiseOperator,
        CompareOp: tags.compareOperator,
        AssignOp: tags.definitionOperator,
        UpdateOp: tags.updateOperator,
        LineComment: tags.lineComment,
        BlockComment: tags.blockComment,
        Number: tags.number,
        String: tags.string,
        "RawString SystemLibString": tags.special(tags.string),
        CharLiteral: tags.character,
        EscapeSequence: tags.escape,
        "UserDefinedLiteral/Identifier": tags.literal,
        PreprocArg: tags.meta,
        "PreprocDirectiveName #include #ifdef #ifndef #if #define #else #endif #elif": tags.processingInstruction,
        MacroName: tags.special(tags.name),
        "( )": tags.paren,
        "[ ]": tags.squareBracket,
        "{ }": tags.brace,
        "< >": tags.angleBracket,
        ". ->": tags.derefOperator,
        ", ;": tags.separator
      });
      spec_identifier = { __proto__: null, bool: 36, char: 36, int: 36, float: 36, double: 36, void: 36, size_t: 36, ssize_t: 36, intptr_t: 36, uintptr_t: 36, charptr_t: 36, int8_t: 36, int16_t: 36, int32_t: 36, int64_t: 36, uint8_t: 36, uint16_t: 36, uint32_t: 36, uint64_t: 36, char8_t: 36, char16_t: 36, char32_t: 36, char64_t: 36, const: 70, volatile: 72, restrict: 74, _Atomic: 76, mutable: 78, constexpr: 80, constinit: 82, consteval: 84, struct: 88, __declspec: 92, final: 148, override: 148, public: 152, private: 152, protected: 152, virtual: 154, extern: 160, static: 162, register: 164, inline: 166, thread_local: 168, __attribute__: 172, __based: 178, __restrict: 180, __uptr: 180, __sptr: 180, _unaligned: 180, __unaligned: 180, noexcept: 194, requires: 198, TRUE: 798, true: 798, FALSE: 800, false: 800, typename: 218, class: 220, template: 234, throw: 248, __cdecl: 256, __clrcall: 256, __stdcall: 256, __fastcall: 256, __thiscall: 256, __vectorcall: 256, try: 260, catch: 264, export: 282, import: 286, case: 296, default: 298, if: 308, else: 314, switch: 318, do: 322, while: 324, for: 330, return: 334, break: 338, continue: 342, goto: 346, co_return: 350, co_yield: 354, using: 362, typedef: 366, namespace: 380, new: 398, delete: 400, co_await: 402, concept: 406, enum: 410, static_assert: 414, friend: 422, union: 424, explicit: 430, operator: 444, module: 456, signed: 518, unsigned: 518, long: 518, short: 518, decltype: 528, auto: 530, sizeof: 566, NULL: 572, nullptr: 586, this: 588 };
      spec_ = { __proto__: null, "<": 767 };
      spec_templateArgsEnd = { __proto__: null, ">": 135 };
      spec_scopedIdentifier = { __proto__: null, operator: 388, new: 576, delete: 582 };
      parser = LRParser.deserialize({
        version: 14,
        states: "$<[Q!QQVOOP'gOUOOO([OWO'#CdO,UQUO'#CgO,`QUO'#FjO-vQbO'#CxO.XQUO'#CxO0WQUO'#KaO0_QUO'#CwO0jOpO'#DvO0rQ!dO'#D]OOQR'#JP'#JPO5[QVO'#GUO5iQUO'#JWOOQQ'#JW'#JWO8}QUO'#KtO<hQUO'#KtO?OQVO'#E^O?`QUO'#E^OOQQ'#Ed'#EdOOQQ'#Ee'#EeO?eQVO'#EfO@[QVO'#EiOBXQUO'#FPOByQUO'#FhOOQR'#Fj'#FjOCOQUO'#FjOOQR'#LX'#LXOOQR'#LW'#LWOEWQVO'#KWOF{QUO'#L_OGYQUO'#KxOGnQUO'#L_OH`QUO'#LaOOQR'#HU'#HUOOQR'#HV'#HVOOQR'#HW'#HWOOQR'#LT'#LTOOQR'#J`'#J`Q!QQVOOOHnQVO'#FOOIZQUO'#EhOIbQUOOOK^QVO'#HgOKnQUO'#HgONYQUO'#KxONdQUO'#KxOOQQ'#Kx'#KxO!!bQUO'#KxOOQQ'#Js'#JsO!!oQUO'#HxOOQQ'#Ka'#KaO!&aQUO'#KaO!&}QUO'#KWO!(}QVO'#I]O!(}QVO'#I`OCTQUO'#KWOOQQ'#Ip'#IpOOQQ'#KW'#KWO!-QQUO'#KaOOQR'#K`'#K`O!-XQUO'#DZO!/pQUO'#KuOOQQ'#Ku'#KuO!/wQUO'#KuO!0OQUO'#ETO!0TQUO'#EWO!0YQUO'#FRO8}QUO'#FPO!QQVO'#F^O!0_Q#vO'#F`O!0jQUO'#FkO!0rQUO'#FpO!0wQVO'#FrO!0rQUO'#FuO!3vQUO'#FvO!3{QVO'#FxO!4VQUO'#FzO!4[QUO'#F|O!4aQUO'#GOO!4fQVO'#GQO!(}QVO'#GSO!4mQUO'#GpO!4{QUO'#GYO!(}QVO'#FeO!6YQUO'#FeO!6_QVO'#G`O!6fQUO'#GaO!6qQUO'#GnO!6vQUO'#GrO!6{QUO'#GzO!7mQ&lO'#HiO!:pQUO'#GuO!;QQUO'#HXO!;]QUO'#HZO!;eQUO'#DXO!;eQUO'#HuO!;eQUO'#HvO!;|QUO'#HwO!<_QUO'#H|O!=SQUO'#H}O!>xQVO'#IbO!(}QVO'#IdO!?SQUO'#IgO!?ZQVO'#IjP!AQO!LQO'#CaP!A]{,UO'#CbP!6q{,UO'#CbP!Ah{7[O'#CbP!6q{,UO'#CbP!Am{,UO'#CbP!AxOSO'#IzPOOO)CEp)CEpOOOO'#I}'#I}O!BSOWO,59OOOQR,59O,59OO!(}QVO,59VOOQQ,59X,59XOOQR'#Do'#DoO!(}QVO,5;ROOQR,5<U,5<UO!B_QUO,59ZO!(}QVO,5>qOOQR'#IX'#IXOOQR'#IY'#IYOOQR'#IZ'#IZOOQR'#I['#I[O!(}QVO,5>rO!(}QVO,5>rO!(}QVO,5>rO!(}QVO,5>rO!(}QVO,5>rO!(}QVO,5>rO!(}QVO,5>rO!(}QVO,5>rO!(}QVO,5>rO!(}QVO,5>rO!D^QVO,5>zOOQQ,5?W,5?WO!FPQVO'#CjO!IxQUO'#CzOOQQ,59d,59dOOQQ,59c,59cOOQQ,5<},5<}O!JVQ&lO,5=mO!?SQUO,5?RO!LyQVO,5?UO!MQQbO,59dO!M]QVO'#FYOOQQ,5?P,5?PO!MmQVO,59WO!MtO`O,5:bO!MyQbO'#D^O!N[QbO'#KeO!NjQbO,59wO!NrQbO'#CxO# TQUO'#CxO# YQUO'#KaO# dQUO'#CwOOQR-E<}-E<}O# oQUO,5AvO# vQVO'#EfO@[QVO'#EiOBXQUO,5;kOOQR,5<p,5<pO#$oQUO'#KWO#$vQUO'#KWO!(}QVO'#IUO8}QUO,5;kO#%ZQ&lO'#HiO#(bQUO'#CtO#+VQbO'#CxO#+[QUO'#CwO#.xQUO'#KaOOQQ-E=U-E=UO#1]QUO,5A`O#1gQUO'#KaO#1qQUO,5A`OOQR,5Av,5AvOOQQ,5>l,5>lO#3uQUO'#CgO#4kQUO,5>pO#6^QUO'#IeOOQR'#JO'#JOO#6fQUO,5:xO#7SQUO,5:xO#7sQUO,5:xO#8hQUO'#CuO!0TQUO'#CmOOQQ'#JX'#JXO#7SQUO,5:xO#8pQUO,5;QO!4{QUO'#DOO#9yQUO,5;QO#:OQUO,5>QO#;[QUO'#DOO#;rQUO,5>{O#;wQUO'#LOO#=QQUO,5;TO#=YQVO,5;TO#=dQUO,5;TOOQQ,5;T,5;TO#?]QUO'#LdO#?dQUO,5>UO#?iQbO'#CxO#?tQUO'#GcO#?yQUO'#E^O#@jQUO,5;kO#ARQUO'#LUO#AZQUO,5;rOKnQUO'#HfOBXQUO'#HgO#A`QUO'#KxO!6qQUO'#HjO#BWQUO'#CuO!0wQVO,5<SOOQQ'#Cg'#CgOOQR'#Jj'#JjO#B]QVO,5=`OOQQ,5?Z,5?ZO#DfQbO'#CxO#DqQUO'#GcOOQQ'#Jk'#JkOOQQ-E=i-E=iOGYQUO,5AyOGnQUO,5AyO#DvQUO,5A{O#ERQUO'#G|OOQR,5Ay,5AyO#DvQUO,5AyO#E^QUO'#HOO#EfQUO,5A{OOQR,5A{,5A{OOQR,5A|,5A|O#EtQVO,5A|OOQR-E=^-E=^O#GnQVO,5;jOOQR,5;j,5;jO#IoQUO'#EjO#JtQUO'#EwO#KkQVO'#ExO#M}QUO'#EvO#NVQUO'#EyO$ UQUO'#EzOOQQ'#LR'#LRO$ {QUO,5;SO$#RQUO'#EvOOQQ,5;S,5;SO$$OQUO,5;SO$%qQUO,5:yO$([QVO,5>PO$(fQUO'#E[O$(sQUO,5>ROOQQ,5>S,5>SO$,aQVO'#C|OOQQ-E=q-E=qOOQQ,5>d,5>dOOQQ,59a,59aO$,kQUO,5>wO$.kQUO,5>zO!6qQUO,59uO$/OQUO,5;qO$/]QUO,5<{O!0TQUO,5:oOOQQ,5:r,5:rO$/hQUO,5;mO$/mQUO'#KtOBXQUO,5;kOOQR,5;x,5;xO$0^QUO'#FbO$0lQUO'#FbO$0qQUO,5;zO$4[QVO'#FmO!0wQVO,5<VO!0rQUO,5<VO!0YQUO,5<[O$4cQVO'#GUO$7_QUO,5<^O!0wQVO,5<aO$:uQVO,5<bO$;SQUO,5<dOOQR,5<d,5<dO$<]QUO,5<dOOQR,5<f,5<fOOQR,5<h,5<hOOQQ'#Fi'#FiO$<bQUO,5<jO$<gQUO,5<lOOQR,5<l,5<lO$=mQUO,5<nO$>sQUO'#L^O$>{QUO,5<rO$?WQUO,5=[O$?]QUO,5=[O!4{QUO,5<tO$?eQUO,5<tO$?yQUO,5<PO$APQVO,5<PO$CbQUO,5<zOOQR,5<z,5<zOOQR,5<{,5<{O$?]QUO,5<{O$DhQUO,5<{O$DsQUO,5=YO!(}QVO,5=^O!(}QVO,5=fO#NsQUO,5=mOOQQ,5>T,5>TO$FxQUO,5>TO$GSQUO,5>TO$GXQUO,5>TO$G^QUO,5>TO!6qQUO,5>TO$I[QUO'#KaO$IcQUO,5=oO$InQUO,5=aOKnQUO,5=oO$JhQUO,5=sOOQR,5=s,5=sO$JpQUO,5=sO$L{QVO'#H[OOQQ,5=u,5=uO!;`QUO,5=uO%#vQUO'#KqO%#}QUO'#KbO%$cQUO'#KqO%$mQUO'#DyO%%OQUO'#D|O%'{QUO'#KbOOQQ'#Kb'#KbO%)nQUO'#KbO%#}QUO'#KbO%)sQUO'#KbOOQQ,59s,59sOOQQ,5>a,5>aOOQQ,5>b,5>bO%){QUO'#HzO%*TQUO,5>cOOQQ,5>c,5>cO%-oQUO,5>cO%-zQUO,5>hO%1fQVO,5>iO%1mQUO,5>|O# vQVO'#EfO%4sQUO,5>|OOQQ,5>|,5>|O%5dQUO,5?OO%7hQUO,5?RO!<_QUO,5?RO%9dQUO,5?UO%=PQVO,5?UPOOO'#I|'#I|P%=WO!LQO,58{POOO,58{,58{P!Am{,UO,58|P%=c{,UO,58|P%=q{7[O,58|PO{O'#Jw'#JwP%>S{,UO'#LkPOOO'#Lk'#LkP%>Y{,UO'#LkPOOO,58|,58|POOO,5?f,5?fP%>_OSO,5?fOOOO-E<{-E<{OOQR1G.j1G.jO%>fQUO1G.qO%?lQUO1G0mOOQQ1G0m1G0mO%@xQUO'#CpO%CXQbO'#CxO%CdQUO'#CsO%CiQUO'#CsO%CnQUO1G.uO#BWQUO'#CrOOQQ1G.u1G.uO%EqQUO1G4]O%FwQUO1G4^O%HjQUO1G4^O%J]QUO1G4^O%LOQUO1G4^O%MqQUO1G4^O& dQUO1G4^O&#VQUO1G4^O&$xQUO1G4^O&&kQUO1G4^O&(^QUO1G4^O&*PQUO1G4^O&+rQUO'#KVO&,{QUO'#KVO&-TQUO,59UOOQQ,5=P,5=PO&/]QUO,5=PO&/gQUO,5=PO&/lQUO,5=PO&/qQUO,5=PO!6qQUO,5=PO#NsQUO1G3XO&/{QUO1G4mO!<_QUO1G4mO&1wQUO1G4pO&3jQVO1G4pOOQQ1G/O1G/OOOQQ1G.}1G.}OOQQ1G2i1G2iO!JVQ&lO1G3XO&3qQUO'#LVO@[QVO'#EiO&4zQUO'#F]OOQQ'#Jb'#JbO&5PQUO'#FZO&5[QUO'#LVO&5dQUO,5;tO&5iQUO1G.rOOQQ1G.r1G.rOOQR1G/|1G/|O&7[Q!dO'#JQO&7aQbO,59xO&9rQ!eO'#D`O&9yQ!dO'#JSO&:OQbO,5APO&:OQbO,5APOOQR1G/c1G/cO&:ZQbO1G/cO&:`Q&lO'#GeO&;^QbO,59dOOQR1G7b1G7bO#@jQUO1G1VO&;iQUO1G1^OBXQUO1G1VO&=zQUO'#CzO#+VQbO,59dO&AmQUO1G6zOOQR-E<|-E<|O&CPQUO1G0dO#6fQUO1G0dOOQQ-E=V-E=VO#7SQUO1G0dOOQQ1G0l1G0lO&CtQUO,59jOOQQ1G3l1G3lO&D[QUO,59jO&DrQUO,59jO!MmQVO1G4gO!(}QVO'#JZO&E^QUO,5AjOOQQ1G0o1G0oO!(}QVO1G0oO!6qQUO'#JpO&EfQUO,5BOOOQQ1G3p1G3pOOQR1G1V1G1VO&IcQVO'#FOO!MmQVO,5;sOOQQ,5;s,5;sOBXQUO'#JdO&K_QUO,5ApO&KgQVO'#E[OOQR1G1^1G1^O&NUQUO'#LdOOQR1G1n1G1nOOQR-E=h-E=hOOQR1G7e1G7eO#DvQUO1G7eOGYQUO1G7eO#DvQUO1G7gOOQR1G7g1G7gO&N^QUO'#G}O&NfQUO'#L`OOQQ,5=h,5=hO&NtQUO,5=jO&NyQUO,5=kOOQR1G7h1G7hO#EtQVO1G7hO' OQUO1G7hO'!UQVO,5=kOOQR1G1U1G1UO$/UQUO'#E]O'!zQUO'#E]OOQQ'#LQ'#LQO'#eQUO'#LPO'#pQUO,5;UO'#xQUO'#ElO'$]QUO'#ElO'$pQUO'#EtOOQQ'#J]'#J]O'$uQUO,5;cO'%lQUO,5;cO'&gQUO,5;dO''mQVO,5;dOOQQ,5;d,5;dO''wQVO,5;dO''mQVO,5;dO'(OQUO,5;bO'({QUO,5;eO')WQUO'#KwO')`QUO,5:vO')eQUO,5;fOOQQ1G0n1G0nOOQQ'#J^'#J^O'(OQUO,5;bO!4{QUO'#E}OOQQ,5;b,5;bO'*`QUO'#E`O',YQUO'#E{OHuQUO1G0nO',_QUO'#EbOOQQ'#JY'#JYO'-wQUO'#KyOOQQ'#Ky'#KyO'.qQUO1G0eO'/iQUO1G3kO'0oQVO1G3kOOQQ1G3k1G3kO'0yQVO1G3kO'1QQUO'#LgO'2^QUO'#K_O'2lQUO'#K^O'2wQUO,59hO'3PQUO1G/aO'3UQUO'#FPOOQR1G1]1G1]OOQR1G2g1G2gO$?]QUO1G2gO'3`QUO1G2gO'3kQUO1G0ZOOQR'#Ja'#JaO'3pQVO1G1XO'9iQUO'#FTO'9nQUO1G1VO!6qQUO'#JeO'9|QUO,5;|O$0lQUO,5;|OOQQ'#Fc'#FcOOQQ,5;|,5;|O':[QUO1G1fOOQR1G1f1G1fO':dQUO,5<XO$/UQUO'#FWOBXQUO'#FWO':kQUO,5<XO!(}QVO,5<XO':sQUO,5<XO':xQVO1G1qO!0wQVO1G1qOOQR1G1v1G1vO'@hQUO1G1xOOQR1G1{1G1{O'@mQUO1G1|OBXQUO1G2]O'AvQVO1G1|O'D[QUO1G1|O'DaQUO'#GWO8}QUO1G2]OOQR1G2O1G2OOOQR1G2U1G2UOOQR1G2W1G2WOOQR1G2Y1G2YO$?]QUO'#JiO'DfQUO,5AxO'DnQUO1G2^O!4{QUO1G2^OOQR1G2v1G2vO'DvQUO1G2vO$?eQUO1G2`OOQQ'#Cv'#CvO'D{QUO'#G[O'EvQUO'#G[O'E{QUO'#LYO'FZQUO'#G_OOQQ'#LZ'#LZO'FiQUO1G2`O'FnQVO1G1kO'IPQVO'#GUOBXQUO'#FWOOQR'#Jf'#JfO'FnQVO1G1kO'IZQUO'#FvOOQR1G2f1G2fO'I`QUO1G2gO'IeQUO'#JhO'3`QUO1G2gO!(}QVO1G2tO'ImQUO1G2xO'JvQUO1G3QO'K|QUO1G3XOOQQ1G3o1G3oO'LbQUO1G3oOOQR1G3Z1G3ZO'LgQUO'#KaO'3UQUO'#L[OGnQUO'#L_OOQR'#Gy'#GyO#DvQUO'#LaOOQR'#HQ'#HQO'LqQUO'#GvO'$pQUO'#GuOOQR1G2{1G2{O'MnQUO1G2{O'NeQUO1G3ZO'NpQUO1G3_O'NuQUO1G3_OOQR1G3_1G3_O'N}QUO'#H]OOQR'#H]'#H]O(!WQUO'#H]O!(}QVO'#H`O!(}QVO'#H_OOQR'#Lc'#LcO(!]QUO'#LcOOQR'#Jm'#JmO(!bQVO,5=vOOQQ,5=v,5=vO(!iQUO'#H^O(!qQUO'#HZOOQQ1G3a1G3aO(!{QUO,5@|OOQQ,5@|,5@|O%)nQUO,5@|O%)sQUO,5@|O%$mQUO,5:eO(&jQUO'#KrO(&xQUO'#KrOOQQ,5:e,5:eOOQQ'#JT'#JTO('TQUO'#D}O('_QUO'#KxOGnQUO'#L_O((ZQUO'#D}OOQQ'#Hp'#HpOOQQ'#Hr'#HrOOQQ'#Hs'#HsOOQQ'#Ks'#KsOOQQ'#JV'#JVO((eQUO,5:hOOQQ,5:h,5:hO()bQUO'#L_O()oQUO'#HtO(*VQUO,5@|O(*^QUO'#H{O(*iQUO'#LfO(*qQUO,5>fO(*vQUO'#LeOOQQ1G3}1G3}O(.mQUO1G3}O(.tQUO1G3}O(.{QUO1G4TO(0RQUO1G4TO(0WQUO,5BUO!6qQUO1G4hO!(}QVO'#IiOOQQ1G4m1G4mO(0]QUO1G4mO(2`QVO1G4pPOOO-E<z-E<zPOOO1G.g1G.gPOOO1G.h1G.hP!Am{,UO1G.hP(4`QUO'#LmP(4k{7[O1G.hPO{O-E=u-E=uPOOO,5BV,5BVP(4y{,UO,5BVPOOO1G5Q1G5QO!(}QVO7+$]O(5OQUO'#CzOOQQ,59_,59_O(5ZQbO,59dO(5fQbO,59_OOQQ,59^,59^OOQQ7+)w7+)wO!MmQVO'#JvO(5qQUO,5@qOOQQ1G.p1G.pOOQQ1G2k1G2kO(5yQUO1G2kO(6OQUO7+(sOOQQ7+*X7+*XO(8dQUO7+*XO(8kQUO7+*XO(2`QVO7+*[O#NsQUO7+(sO(8xQVO'#JcO(9]QUO,5AqO(9eQUO,5;vOOQQ'#Cp'#CpOOQQ,5;w,5;wO!(}QVO'#F[OOQQ-E=`-E=`O!MmQVO,5;uOOQQ1G1`1G1`OOQQ,5?l,5?lOOQQ-E=O-E=OOOQR'#Dg'#DgOOQR'#Di'#DiOOQR'#Dl'#DlO(:nQ!eO'#KfO(:uQMkO'#KfO(:|Q!eO'#KfOOQR'#Kf'#KfOOQR'#JR'#JRO(;TQ!eO,59zOOQQ,59z,59zO(;[QbO,5?nOOQQ-E=Q-E=QO(;jQbO1G6kOOQR7+$}7+$}OOQR7+&q7+&qOOQR7+&x7+&xO'9nQUO7+&qO(;uQUO7+&OO#6fQUO7+&OO(<jQUO1G/UO(=QQUO1G/UO(=lQUO7+*ROOQQ7+*V7+*VO(?_QUO,5?uOOQQ-E=X-E=XO(@hQUO7+&ZOOQQ,5@[,5@[OOQQ-E=n-E=nO(@mQUO'#LVO@[QVO'#EiO(AyQUO1G1_OOQQ1G1_1G1_O(CSQUO,5@OOOQQ,5@O,5@OOOQQ-E=b-E=bO(ChQUO'#KwOOQR7+-P7+-PO#DvQUO7+-POOQR7+-R7+-RO(CuQUO,5=iO#ERQUO'#JlO(DWQUO,5AzOOQR1G3U1G3UOOQR1G3V1G3VO(DfQUO7+-SOOQR7+-S7+-SO(F^QUO,5:wO(G{QUO'#EwO!(}QVO,5;VO(HnQUO,5:wO(HxQUO'#EpO(IZQUO'#EzOOQQ,5;Z,5;ZO#KkQVO'#ExO(IqQUO,5:wO(IxQUO'#EyO#GuQUO'#J[O(KbQUO,5AkOOQQ1G0p1G0pO(KmQUO,5;WO!<_QUO,5;^O(LWQUO,5;_O(LfQUO,5;WO(NxQUO,5;`OOQQ-E=Z-E=ZO) QQUO1G0}OOQQ1G1O1G1OO) {QUO1G1OO)#RQVO1G1OO)#YQVO1G1OO)#dQUO1G0|OOQQ1G0|1G0|OOQQ1G1P1G1PO)$aQUO'#JqO)$kQUO,5AcOOQQ1G0b1G0bOOQQ-E=[-E=[O)$sQUO,5;iO!<_QUO,5;iO)%pQVO,5:zO)%wQUO,5;gO$ {QUO7+&YOOQQ7+&Y7+&YO!(}QVO'#EfO)&OQUO,5:|OOQQ'#Kz'#KzOOQQ-E=W-E=WOOQQ,5Ae,5AeOOQQ'#Jn'#JnO))sQUO7+&PPOQQ7+&P7+&POOQQ7+)V7+)VO)*kQUO7+)VO)+qQVO7+)VOOQQ,5>m,5>mO$)hQVO'#JuO)+xQUO,5@xOOQQ1G/S1G/SOOQQ7+${7+${O),TQUO7+(RO),YQUO7+(ROOQR7+(R7+(RO$?]QUO7+(ROOQQ7+%u7+%uOOQR-E=_-E=_O!0YQUO,5;oOOQQ,5@P,5@POOQQ-E=c-E=cO$0lQUO1G1hOOQQ1G1h1G1hOOQR7+'Q7+'QOOQR1G1s1G1sOBXQUO,5;rO),vQUO,5<YO),}QUO1G1sO).WQUO1G1sO!0wQVO7+']O).]QVO7+']O)3{QUO7+'dO)4QQVO7+'hO)6fQUO7+'wO)6pQUO7+'hO)7vQVO7+'hOKnQUO7+'wO$?OQUO,5<rOOQQ,5@T,5@TOOQQ-E=g-E=gO!4{QUO7+'xO)7}QUO7+'xOOQR7+(b7+(bO)8SQUO7+'zO)8XQUO,5<vO'D{QUO,5<vO)9PQUO,5<vO'D{QUO,5<vOOQQ,5<w,5<wO)9bQVO,5<xO'FZQUO'#JgO)9lQUO,5AtO)9tQUO,5<yOOQR7+'z7+'zO):PQVO7+'VO)6iQUO'#LUOOQR-E=d-E=dO)<bQVO,5<bOOQQ,5@S,5@SO!6qQUO,5@SOOQQ-E=f-E=fO)>yQUO7+(`O)@PQUO7+(dO)@UQVO7+(dOOQQ7+(l7+(lOOQQ7+)Z7+)ZO)@^QUO'#KqO)@hQUO'#KqOOQR,5=b,5=bO)@uQUO,5=bO!;eQUO,5=bO!;eQUO,5=bO!;eQUO,5=bOOQR7+(g7+(gOOQR7+(u7+(uOOQR7+(y7+(yOOQR,5=w,5=wO)@zQUO,5=zO)BQQUO,5=yOOQR,5A},5A}OOQR-E=k-E=kOOQQ1G3b1G3bO)CWQUO,5=xO)C]QVO'#EfOOQQ1G6h1G6hO%)nQUO1G6hO%)sQUO1G6hOOQQ1G0P1G0POOQQ-E=R-E=RO)EtQUO,5A^O(&jQUO'#JUO)FPQUO,5A^O)FPQUO,5A^O)FXQUO,5:iO8}QUO,5:iOOQQ,5>],5>]O)FcQUO,5AyO)FjQUO'#EVO)GtQUO'#EVO)H_QUO,5:iO)HiQUO'#HlO)HiQUO'#HmOOQQ'#Kv'#KvO)IWQUO'#KvO!(}QVO'#HnOOQQ,5:i,5:iO)IxQUO,5:iO!MmQVO,5:iOOQQ-E=T-E=TOOQQ1G0S1G0SOOQQ,5>`,5>`O)I}QUO1G6hO!(}QVO,5>gO)MlQUO'#JtO)MwQUO,5BQOOQQ1G4Q1G4QO)NPQUO,5BPOOQQ,5BP,5BPOOQQ7+)i7+)iO*#nQUO7+)iOOQQ7+)o7+)oO*(mQVO1G7pO**oQUO7+*SO**tQUO,5?TO*+zQUO7+*[POOO7+$S7+$SP*-mQUO'#LnP*-uQUO,5BXP!Am{,UO7+$SPOOO1G7q1G7qO*-zQUO<<GwOOQQ1G.y1G.yOOQQ'#IT'#ITO*/mQUO,5@bOOQQ,5@b,5@bOOQQ-E=t-E=tOOQQ7+(V7+(VOOQQ<<Ms<<MsO*0vQUO<<MsO*2yQUO<<MvO*4lQUO<<L_O*5QQUO,5?}OOQQ,5?},5?}OOQQ-E=a-E=aOOQQ1G1b1G1bO*6ZQUO,5;vO*7aQUO1G1aOOQQ1G1a1G1aOOQR,5AQ,5AQO*8jQ!eO,5AQO*8qQMkO,5AQO*8xQ!eO,5AQOOQR-E=P-E=POOQQ1G/f1G/fO*9PQ!eO'#DwOOQQ1G5Y1G5YOOQR<<J]<<J]O*9WQUO<<IjO*9{QUO7+$pOOQQ<<Iu<<IuO(8xQVO,5;ROOQR<=!k<=!kOOQQ1G3T1G3TOOQQ,5@W,5@WOOQQ-E=j-E=jOOQR<=!n<=!nO*:xQUO1G0cO*;PQUO'#EzO*;aQUO1G0cO*;hQUO'#JOO*=OQUO1G0qO!(}QVO1G0qOOQQ,5;[,5;[OOQQ,5;],5;]OOQQ,5?v,5?vOOQQ-E=Y-E=YO!<_QUO1G0xO*>_QUO1G0xOOQQ1G0y1G0yO*>pQUO'#ElOOQQ1G0z1G0zOOQQ7+&j7+&jO*?UQUO7+&jO*@[QVO7+&jOOQQ7+&h7+&hOOQQ,5@],5@]OOQQ-E=o-E=oO*AWQUO1G1TO*AbQUO1G1TO*A{QUO1G0fOOQQ1G0f1G0fO*CRQUO'#LSO*CZQUO1G1ROOQQ<<It<<ItOOQQ'#Hb'#HbO',_QUO,5={OOQQ'#Hd'#HdO',_QUO,5=}OOQQ-E=l-E=lPOQQ<<Ik<<IkPOQQ-E=m-E=mOOQQ<<Lq<<LqO*C`QUO'#LiO*DlQUO'#LhOOQQ,5@a,5@aOOQQ-E=s-E=sOOQR<<Km<<KmO$?]QUO<<KmO*DzQUO<<KmOOQR1G1Z1G1ZOOQQ7+'S7+'SO!MmQVO1G1tO*EPQUO1G1tOOQR7+'_7+'_OOQR<<Jw<<JwO!0wQVO<<JwOOQR<<KO<<KOO*E[QUO<<KSO*FbQVO<<KSOKnQUO<<KcO!MmQVO<<KcO*FiQUO<<KSO!0wQVO<<KSO*GrQUO<<KSO*GwQUO<<KcO*HSQUO<<KdOOQR<<Kd<<KdOOQR<<Kf<<KfO*HXQUO1G2bO)8XQUO1G2bO'D{QUO1G2bO*HjQUO1G2dO*IpQVO1G2dOOQQ1G2d1G2dO*IzQVO1G2dO*JRQUO,5@ROOQQ-E=e-E=eOOQQ1G2e1G2eO*JaQUO1G1|O*KjQVO1G1|O*KqQUO1G1|OOQQ1G5n1G5nOOQR<<Kz<<KzOOQR<<LO<<LOO*KvQVO<<LOO*LRQUO<<LOOOQR1G2|1G2|O*LWQUO1G2|O*L_QUO1G3eOOQR1G3d1G3dOOQQ7+,S7+,SO%)nQUO7+,SO*LjQUO1G6xO*LjQUO1G6xO(&jQUO,5?pO*LrQUO,5?pOOQQ-E=S-E=SO*L}QUO1G0TOOQQ1G0T1G0TO*MXQUO1G0TO!MmQVO1G0TO*M^QUO1G0TOOQQ1G3w1G3wO*MhQUO,5:qO)FjQUO,5:qO*NUQUO,5:qO)FjQUO,5:qO$$TQUO,5:uO*NsQVO,5>VO)HiQUO'#JrO*N}QUO1G0TO+ `QVO1G0TOOQQ1G3u1G3uO+ gQUO,5>WO+ rQUO,5>XO+!aQUO,5>YO+#gQUO1G0TO%)sQUO7+,SO+$mQUO1G4ROOQQ,5@`,5@`OOQQ-E=r-E=rOOQQ<<MT<<MTOOQQ<<Mn<<MnO+%vQUO1G4oP+'yQUO'#JxP+(RQUO,5BYPO{O1G7s1G7sPOOO<<Gn<<GnOOQQANC_ANC_OOQR1G6l1G6lO+(ZQ!eO,5:cOOQQ,5:c,5:cO+(bQUO1G0mO+)nQUO7+&]O+*}QUO7+&dO++`QUO,5;WOOQQ<<JU<<JUO++nQUO7+&oOOQQ7+&Q7+&QO!4{QUO'#J_O+,iQUO,5AnOOQQ7+&m7+&mOOQQ1G3g1G3gO+,qQUO1G3iOOQQ,5>n,5>nO+0fQUOANAXOOQRANAXANAXO+0kQUO7+'`OOQRAN@cAN@cO+1wQVOAN@nO+2OQUOAN@nO!0wQVOAN@nO+3XQUOAN@nO+3^QUOAN@}O+3iQUOAN@}O+4oQUOAN@}OOQRAN@nAN@nO!MmQVOAN@}OOQRANAOANAOO+4tQUO7+'|O)8XQUO7+'|OOQQ7+(O7+(OO+5VQUO7+(OO+6]QVO7+(OO+6dQVO7+'hO+6kQUOANAjOOQR7+(h7+(hOOQR7+)P7+)PO+6pQUO7+)PO+6uQUO7+)POOQQ<= n<= nO+6}QUO7+,dO+7VQUO1G5[OOQQ1G5[1G5[O+7bQUO7+%oOOQQ7+%o7+%oO+7sQUO7+%oO+ `QVO7+%oOOQQ7+)a7+)aO+7xQUO7+%oO+9OQUO7+%oO!MmQVO7+%oO+9YQUO1G0]O*MhQUO1G0]O)FjQUO1G0]OOQQ1G0a1G0aO+9wQUO1G3qO+:}QVO1G3qOOQQ1G3q1G3qO+;XQVO1G3qO+;`QUO,5@^OOQQ-E=p-E=pOOQQ1G3r1G3rO%)nQUO<= nOOQQ7+*Z7+*ZPOQQ,5@d,5@dPOQQ-E=v-E=vOOQQ1G/}1G/}OOQQ,5?y,5?yOOQQ-E=]-E=]OOQRG26sG26sO+;wQUOG26YO!0wQVOG26YO+=QQUOG26YOOQRG26YG26YO!MmQVOG26iO!0wQVOG26iO+=VQUOG26iO+>]QUOG26iO+>bQUO<<KhOOQQ<<Kj<<KjOOQRG27UG27UOOQR<<Lk<<LkO+>sQUO<<LkOOQQ7+*v7+*vOOQQ<<IZ<<IZO+>xQUO<<IZO!MmQVO<<IZO+>}QUO<<IZO+@TQUO<<IZO+ `QVO<<IZOOQQ<<L{<<L{O+@fQUO7+%wO*MhQUO7+%wOOQQ7+)]7+)]O+ATQUO7+)]O+BZQVO7+)]OOQQANEYANEYO!0wQVOLD+tOOQRLD+tLD+tO+BbQUOLD,TO+ChQUOLD,TOOQRLD,TLD,TO!0wQVOLD,TOOQRANBVANBVOOQQAN>uAN>uO+CmQUOAN>uO+DsQUOAN>uO!MmQVOAN>uO+DxQUO<<IcOOQQ<<Lw<<LwOOQR!$( `!$( `O!0wQVO!$( oOOQR!$( o!$( oOOQQG24aG24aO+EgQUOG24aO+FmQUOG24aOOQR!)9EZ!)9EZOOQQLD){LD){O+FrQUO'#CgO(gQUO'#CgO+JoQUO'#CzO+M`QUO'#CzO!FZQUO'#CzO+NXQUO'#CzO+NlQUO'#CzO,$_QUO'#CzO,$oQUO'#CzO,$}QUO'#CzO,%[QbO,59dO,%gQbO,59dO,%rQbO,59dO,%}QbO'#CxO,&`QbO'#CxO,&qQbO'#CxO,'SQUO'#CgO,)gQUO'#CgO,)tQUO'#CgO,,lQUO'#CgO,/oQUO'#CgO,0PQUO'#CgO,1uQUO'#CgO,4uQUO'#CgO,5SQUO'#CgO,5^QUO,5:xO#?yQUO,5:xO#?yQUO,5:xO#=iQUO'#LdO,5zQbO'#CxO,6VQbO'#CxO,6bQbO'#CxO,6mQbO'#CxO#7SQUO'#E^O,6xQUO'#E^O,8VQUO'#HgO,8wQbO'#CxO,9SQbO'#CxO,9_QUO'#CwO,9dQUO'#CwO,9iQUO'#CpO,9wQbO,59dO,:SQbO,59dO,:_QbO,59dO,:jQbO,59dO,:uQbO,59dO,;QQbO,59dO,;]QbO,59dO,5^QUO1G0dO,;hQUO1G0dO#?yQUO1G0dO,6xQUO1G0dO,=uQUO'#KaO,>VQUO'#CzO,>eQbO,59dO,5^QUO7+&OO,;hQUO7+&OO,>pQUO'#EwO,?cQUO'#EzO,@SQUO'#E^O,@XQUO'#GcO,@^QUO'#CwO,@cQUO'#CxO,@hQUO'#CxO,@mQUO'#GcO,@rQUO'#CwO,@wQUO'#KaO,AeQUO'#KaO,AoQUO'#CwO,AzQUO'#CwO,BVQUO'#CwO,;hQUO,5:xO,6xQUO,5:xO,6xQUO,5:xO,BbQUO'#KaO,BuQbO'#CxO,CQQUO'#CsO,CVQUO'#E^",
        stateData: ",C{~O(pOSSOSRPQVPQ'ePQ'gPQ'hPQ'iPQ'jPQ'kPQ'lPQ'mPQ(qPQ~O*cOS~OPmO]eOb!]Oe!POmTOs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O|#RO!O!_O!TxO!VfO!X!XO!Y!WO!i!YO!opO!r!`O!s!aO!t!aO!u!bO!v!aO!x!cO!{!dO#V#QO#a#VO#b#TO#i#OO#p!xO#t!fO#v!eO$R!gO$T!hO$Y!vO$Z!wO$`!iO$e!jO$g!kO$h!lO$k!mO$m!nO$o!oO$q!pO$s!qO$u!rO$w!sO${!tO$}!uO%U!yO%_#ZO%`#[O%a#YO%c!zO%e#UO%g!{O%l#SO%o!|O%v!}O%|#PO&m!RO&r#WO&s!TO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(xRO)WYO)ZaO)]|O)^{O)`iO)a!ZO)cXO)ocO)pdO~OR#cOV#^O'e#_O'g#`O'h#aO'i#aO'j#bO'k#bO'l#`O'm#`O(q#]O~OX#eO(u#gO(w#eO~O]ZX]jXejXmhXqZXqjXsjXtjXujXvjXwjXxjXyjXzjX!OjX!TjX!VZX!VjX!XZX!YZX![ZX!^ZX!_ZX!aZX!bZX!eZX!fZX!gZX!hZX!rjX!sjX!tjX!ujX!vjX!xjX!{jX%vjX&rjX&sjX(xjX({ZX(|$]X(}ZX)OZX)ZZX)ZjX)[ZX)]ZX)]jX)^ZX)^jX)_ZX)`ZX)aZX)qZX~O)`jX!UZX~P(gO]$PO!V#nO!X#}O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O!h#kO({#hO(}#mO)O#mO)Z#oO)[#qO)]#pO)^#rO)_#jO)`#lO)a$OO~Oe$TO%Y$UO'[$VO'_$WO)P$QO~Om$XO~O!T$YO])TXe)TXs)TXt)TXu)TXv)TXw)TXx)TXy)TXz)TX!O)TX!V)TX!r)TX!s)TX!t)TX!u)TX!v)TX!x)TX!{)TX%v)TX&r)TX&s)TX(x)TX)Z)TX)])TX)^)TX)`)TX~Om$XO~P.^Om$XO!g$[O)q$[O~OX$]O)d$]O~O!R$^O)V)XP)a)XP~OPmO]$gOb!]Os!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O|#RO!O!_O!TxO!V$hO!X!XO!Y!WO!i!YO!r!aO!s!aO!t!aO!u!aO!v!aO!x!cO#V#QO#a#VO#b#TO#v!eO$Y!vO$Z!wO$`!iO$e!jO$g!kO$h!lO$k!mO$m!nO$o!oO$q!pO$s!qO$u!rO$w!sO%_#ZO%`#[O%a#YO%e#UO%l#SO%v$oO&m!RO&r#WO&s!TO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO)WYO)Z$mO)^$mO)`iO)a!ZO)cXO)ocO)pdO~Om$aO#t$nO(xRO~P0}O](_Xb'zXe(_Xm'zXm(_Xs'zXs(_Xt'zXt(_Xu'zXu(_Xv'zXv(_Xw'zXw(_Xx'zXx(_Xy'zXy(_Xz'zXz(_X|'zX!O'zX!V(_X!o(_X!r'zX!r(_X!s'zX!s(_X!t'zX!t(_X!u'zX!u(_X!v'zX!v(_X!x'zX!x(_X!{(_X#a'zX#b'zX%e'zX%l'zX%o(_X%v(_X&m'zX&r'zX&s'zX(x'zX(x(_X)Z(_X)](_X)^(_X~Ob!TOm$qOs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O|#RO!O!_O!r!aO!s!aO!t!aO!u!aO!v!aO!x!cO#a#VO#b#TO%e#UO%l#SO&m!RO&r#WO&s!TO(x$pO~Os!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O!O!_O!r!aO!s!aO!t!aO!u!aO!v!aO!x!cO&r#WO&s$yO])hXe)hXm)hX!V)hX!{)hX%v)hX(x)hX)Z)hX)])hX)^)hX~O)`$xO~P:qOPmO]eOe!POs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O!VfO!X!XO!Y!WO!i!YO!{!dO#V#QO%_#ZO%`#[O%a#YO%v$oO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO)ZaO)]|O)^{O)a!ZO)cXO)ocO)pdO~Ob%SOm;UO!|%TO(x$zO~P<oO)Z%UO~Ob!]Om$aO|#RO#a#VO#b#TO%e#UO%l#SO&m!RO&r#WO&s!TO(x;XO~P<oOPmO]$gOb%SOm;UO!V$hO!W%aO!X!XO!Y!WO!i!YO#V#QO%_#ZO%`#[O%a#YO%v$oO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(x$zO)Z$mO)^%_O)a!ZO)cXO)ocO)pdO)q%^O~O]%jOe!POm%dO!V%mO!{!dO%v$oO(x;YO)Z%fO)]%kO)^%kO~O(|%oO~O)`#lO~O(x%pO](zX!V(zX!X(zX!Y(zX![(zX!^(zX!_(zX!a(zX!b(zX!e(zX!f(zX!h(zX({(zX(}(zX)O(zX)Z(zX)[(zX)](zX)^(zX)_(zX)`(zX)a(zX!g(zX)q(zX[(zX!W(zX(|(zX!U(zXQ(zX!d(zX~OP%qO(vQO~PCTO]%jOe!POs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O!V%mO!r!aO!s!aO!t!aO!u!aO!v!aO!x!cO!{!dO%o!|O%v!}O)Z;jO)]|O)^|O~Om%tO!o%yO(x$zO~PEbO!TxO#v!eO(|%{O)q&OO])lX!V)lX~O]%jOe!POm%tO!V%mO!{!dO%v!}O(x$zO)Z;jO)]|O)^|O~O!TxO#v!eO)`&RO)q&SO~O!U&VO~P!QO]&[O!TxO!V&YO)Z&XO)]&]O)^&]O~Oq&WO~PHuO]&eO!V&dO~OPmO]eOe!PO!VfO!X!XO!Y!WO!i!YO!{!dO#V#QO%_#ZO%`#[O%a#YO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO)ZaO)]|O)^{O)a!ZO)cXO)ocO)pdO~Ob%SOm;UO%v$oO(x$zO~PIjO]%jOe!POm;fO!V%mO!{!dO%v$oO(x$zO)Z;jO)]|O)^|O~Oq&hO](zX])lX!V(zX!V)lX!X(zX!Y(zX![(zX!^(zX!_(zX!a(zX!b(zX!e(zX!f(zX!h(zX({(zX(}(zX)O(zX)Z(zX)[(zX)](zX)^(zX)_(zX)`(zX)a(zX[(zX[)lX!U(zX~O!g$[O)q$[O~PL`O!g(zX)q(zX~PL`O](zX!V(zX!X(zX!Y(zX![(zX!^(zX!_(zX!a(zX!b(zX!e(zX!f(zX!h(zX({(zX(}(zX)O(zX)Z(zX)[(zX)](zX)^(zX)_(zX)`(zX)a(zX!g(zX)q(zX[(zX!U(zX~O])lX!V)lX[)lX~PNnOb&jO&m!RO]&lXe&lXm&lXs&lXt&lXu&lXv&lXw&lXx&lXy&lXz&lX!O&lX!V&lX!r&lX!s&lX!t&lX!u&lX!v&lX!x&lX!{&lX%v&lX&r&lX&s&lX(x&lX)Z&lX)]&lX)^&lX)`&lX[&lX!T&lX!X&lX!Y&lX![&lX!^&lX!_&lX!a&lX!b&lX!e&lX!f&lX!h&lX({&lX(}&lX)O&lX)[&lX)_&lX)a&lX!g&lX)q&lX!W&lXQ&lX!d&lX(|&lX!U&lX#v&lX~Oq&hOm)TX[)TXQ)TX!d)TX!h)TX)a)TX)q)TX~P.^O!g$[O)q$[O](zX!V(zX!X(zX!Y(zX![(zX!^(zX!_(zX!a(zX!b(zX!e(zX!f(zX!h(zX({(zX(}(zX)O(zX)Z(zX)[(zX)](zX)^(zX)_(zX)`(zX)a(zX[(zX!W(zX(|(zX!U(zXQ(zX!d(zX~OPmO]$gOb%SOm;UO!V$hO!X!XO!Y!WO!i!YO#V#QO%_#ZO%`#[O%a#YO%v$oO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(x$zO)Z$mO)^$mO)a!ZO)cXO)ocO)pdO~O])TXe)TXm)TXs)TXt)TXu)TXv)TXw)TXx)TXy)TXz)TX!O)TX!V)TX!r)TX!s)TX!t)TX!u)TX!v)TX!x)TX!{)TX%v)TX&r)TX&s)TX(x)TX)Z)TX)])TX)^)TX)`)TX[)TXQ)TX!d)TX!h)TX)a)TX)q)TX~O]$PO~P!*tO]&nO~O])iXb)iXe)iXm)iXs)iXt)iXu)iXv)iXw)iXx)iXy)iXz)iX|)iX!O)iX!V)iX!o)iX!r)iX!s)iX!t)iX!u)iX!v)iX!x)iX!{)iX#a)iX#b)iX%e)iX%l)iX%o)iX%v)iX&m)iX&r)iX&s)iX(x)iX)Z)iX)])iX)^)iX~O(vQO~P!-^O%U&pO~P!-^O]&qO~O]$PO~O!TxO~O$W&yO(x%pO(|&xO~O]&zOx&|O~O]&zO~OPmO]$gOb%SOm;UO!TxO!V$hO!X!XO!Y!WO!i!YO#V#QO#p!xO#v!eO$Y!vO$Z!wO$`!iO$e!jO$g!kO$h!lO$k!mO$m!nO$o!oO$q!pO$s!qO$u!rO$w!sO%_#ZO%`#[O%a#YO%v$oO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(x:wO)WYO)Z$mO)^$mO)`iO)a!ZO)cXO)ocO)pdO~O]'RO~O!T$YO)`'TO~P!(}O)`'VO~O)`'WO~O(x'XO~O)`'[O~P!(}Om;hO%U'aO%e'aO(x;ZO~Ob!TOm$qOs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O|#RO#a#VO#b#TO%e#UO%l#SO&m!RO&r#WO&s!TO(x$pO~O(|'eO~O)`'gO~P!(}O!TxO(x%pO)q'iO~O(x%pO~O]'lO~O]'mOe%nXm%nX!V%nX!{%nX%v%nX(x%nX)Z%nX)]%nX)^%nX~O]'qO!V'rO!X'oO!g'oO%Z'oO%['oO%]'oO%^'oO%_'sO%`'sO%a'oO)O'pO)q'oO*P'tO~P8}O]%jOb!TOe!POs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O|#RO!O!_O!V%mO!r!aO!s!aO!t!aO!u!aO!v!aO!x!cO!{!dO#a#VO#b#TO%e#UO%l#SO&m!RO&r#WO&s!TO)Z;jO)]|O)^|O~Om;iOq&WO%v$oO(x;[O~P!8mO(x%pO(|'yO)`'zO~O]&eO!T'|O~Om$qO!O!_O!T(TO!l(YO(x$pO(|(SO)WYO~Om$qO|(aO!T(^O#b(aO(x$pO~Ob!TOm$qO|#RO#a#VO#b#TO%e#UO%l#SO&m!RO&r#WO&s!TO(x$pO~O](cO~OPmOb%SOm;UO!V$hO!X!XO!Y!WO!i!YO#V#QO%_#ZO%`#[O%a#YO%v$oO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(x$zO)Z$mO)^$mO)cXO)ocO)pdO~O](eO)a(fO~P!=XO]$PO~P!<_OPmO]$gOb%SOm;UO!V(lO!X!XO!Y!WO!i!YO#V#QO%_#ZO%`#[O%a#YO%v$oO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(x$zO)Z$mO)^$mO)a!ZO)cXO)ocO)pdO~O(r(mO(s(mO(t(oO~OY(pO(vQO(x%pO~O'f(pO~OS(vO(q#]O*`(uO~O]$PO(p(yO~Q'nXX#eO(u({O(w#eO~Oe)VOm)QO&r#WO(x)PO~O!Y'Sa!['Sa!^'Sa!_'Sa!a'Sa!b'Sa!e'Sa!f'Sa!h'Sa({'Sa)Z'Sa)['Sa)]'Sa)^'Sa)_'Sa)`'Sa)a'Sa!g'Sa)q'Sa['Sa!W'Sa(|'Sa!U'SaQ'Sa!d'Sa~OPmOb%SOm;UO!i!YO#V#QO%_#ZO%`#[O%a#YO%v$oO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(x$zO)cXO)ocO)pdO]'Sa!V'Sa!X'Sa(}'Sa)O'Sa~P!BmO!T$YO[(yP~P!(}O]oX]%WXeoXmnXqoXq%WXsoXtoXuoXvoXwoXxoXyoXzoX!OoX!ToX!VoX!V%WX!X%WX!Y%WX![%WX!^%WX!_%WX!a%WX!b%WX!e%WX!f%WX!gnX!h%WX!roX!soX!toX!uoX!voX!xoX!{oX%voX&roX&soX(xoX({%WX(}%WX)O%WX)ZoX)Z%WX)[%WX)]oX)]%WX)^oX)^%WX)_%WX)`%WX)a%WX)qnX[%WX~O)`oX[oX!U%WX~P!FZO])iO!V)jO!X)gO!g)gO%Z)gO%[)gO%])gO%^)gO%_)kO%`)kO%a)gO)O)hO)q)gO*P)lO~P8}OPmO]$gOb%SOm;UO!X!XO!Y!WO!i!YO#V#QO%_#ZO%`#[O%a#YO%v$oO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(x$zO)Z$mO)^$mO)a!ZO)cXO)ocO)pdO~O!V)qO~P!KVOe)tO%Y)uO)P$QO~O!T$YO!V)wO(})xO!U)yP~P!KVO!T$YO~P!(}O)b*PO~Om*QO]!QX!h!QX)V!QX)a!QX~O]*SO!h*TO)V)XX)a)XX~O)V*WO)a*XO~Oe$TO%Y*YO'[$VO'_$WO)P$QO~Om*ZO~Om*ZO[)TX~P.^Om*ZO!g$[O)q$[O~O)`*[O~P:qOPmO]$gOb!]Om$aOs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O|#RO!V$hO!X!XO!Y!WO!i!YO#V#QO#a#VO#b#TO%_#ZO%`#[O%a#YO%e#UO%l#SO%v$oO&m!RO&r#WO&s!TO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(x;XO)Z$mO)^$mO)a!ZO)cXO)ocO)pdO~Oq&hO~P!&}Oq&hO!W(zX(|(zXQ(zX!d(zX~PNnO]'qO!V'rO!X'oO!g'oO%Z'oO%['oO%]'oO%^'oO%_'sO%`'sO%a'oO)O'pO)q'oO*P'tO~O]jXejXmhXqjXsjXtjXujXvjXwjXxjXyjXzjX!OjX!VjX!rjX!sjX!tjX!ujX!vjX!xjX!{jX%vjX&rjX&sjX(xjX)ZjX)]jX)^jX!TjX!hjX)ajX)qjX[jX~O!ljX(|jX)`jX!XjX!YjX![jX!^jX!_jX!ajX!bjX!ejX!fjX({jX(}jX)OjX)[jX)_jX!gjX!WjXQjX!djX!UjX#vjX#TjX#VjX#pjXbjX|jX!ojX#ajX#bjX#ijX#tjX${jX%cjX%ejX%kjX%ljX%ojX&mjX)WjX~P#&XO)P*`O~Om*aO~O])TXe)TXs)TXt)TXu)TXv)TXw)TXx)TXy)TXz)TX!O)TX!V)TX!r)TX!s)TX!t)TX!u)TX!v)TX!x)TX!{)TX%v)TX&r)TX&s)TX(x)TX)Z)TX)])TX)^)TX)`)TX!T)TX!X)TX!Y)TX![)TX!^)TX!_)TX!a)TX!b)TX!e)TX!f)TX!h)TX({)TX(})TX)O)TX)[)TX)_)TX)a)TX!g)TX)q)TX[)TX!W)TXQ)TX!d)TX(|)TX!U)TX#v)TX~Om*aO~P#+aOs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O!O!_O!r!aO!s!aO!t!aO!u!aO!v!aO!x!cO])hae)ham)ha!V)ha!{)ha%v)ha(x)ha)Z)ha)])ha)^)haQ)ha!d)ha!h)ha)a)ha)q)ha[)ha!T)ha(|)ha)`)ha~O&r#WO&s$yO~P#/POq&hOm)TX~P#+aO&r)ha~P#/PO]ZXmhXqZXqjX!TjX!VZX!XZX!YZX![ZX!^ZX!_ZX!aZX!bZX!eZX!fZX!gZX!hZX({ZX(}ZX)OZX)ZZX)[ZX)]ZX)^ZX)_ZX)`ZX)aZX)qZX[ZX~O!WZX(|ZX!UZXQZX!dZX~P#1xO]$PO!V#nO!X#}O(}#mO)O#mO~O!Y&xa![&xa!^&xa!_&xa!a&xa!b&xa!e&xa!f&xa!g&xa!h&xa({&xa)Z&xa)[&xa)]&xa)^&xa)_&xa)`&xa)a&xa)q&xa[&xa!W&xa(|&xa!U&xaQ&xa!d&xa~P#4YOm;rO!T$YO~Os!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O~PKnOs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O!|%TO~PKnO]&eO!V&dO[#Qa!T#Qa!h#Qa#v#Qa)`#Qa)q#QaQ#Qa!d#Qa(|#Qa~Oq&hO!T$YO~O[*hO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O!h#kO({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO[*hO~O[*jO]&eO!V&dO~O]&[Os!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O!V&YO&r#WO&s$yO)Z&XO)]&]O)^&]O~O[rXQrX!drX!hrX)arX)`rX~P#:ZO[*mO~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O!h*nO({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO!W)rX~P#4YO!W*pO!h*qO~O!W*pO!h*qO~P!(}O!W*pO~Oq&hO!g$[O!h*rO)q$[O](zX!V(zX!W(zX!W*WX!X(zX!Y(zX![(zX!^(zX!_(zX!a(zX!b(zX!e(zX!f(zX({(zX(}(zX)O(zX)Z(zX)[(zX)](zX)^(zX)_(zX)a(zX~O!h(zX~P#=iO!W*tO~Oe$TO%Y*YO)P:|O~Om;uO~Os!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O!|%TO~PBXO]*{O!T*vO!V&dO!h*yO#v!eO)q*wO)`)xX~O!h*yO)`)xX~O)`*|O~Oq&hO])lX!T)lX!V)lX!h)lX#v)lX)`)lX)q)lX[)lXQ)lX!d)lX(|)lX~Oq&hO~OP%qO(vQO]%ha!V%ha!X%ha!Y%ha![%ha!^%ha!_%ha!a%ha!b%ha!e%ha!f%ha!h%ha(x%ha({%ha(}%ha)O%ha)Z%ha)[%ha)]%ha)^%ha)_%ha)`%ha)a%ha!g%ha)q%ha[%ha!W%ha(|%ha!U%haQ%ha!d%ha~Oe$TO%Y$UO)P:yO~Om;RO~O!TxO#v!eO)q&OO~Om<fO&r#WO(x;qO~O$Z+YO%`+ZO~O!TxO#v!eO)`+[O)q+]O~OPmO]$gOb%SOm;UO!V$hO!X!XO!Y!WO!i!YO#V#QO$Z+YO%_#ZO%`+_O%a#YO%v$oO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(x$zO)Z$mO)^$mO)a!ZO)cXO)ocO)pdO~O!U+`O~P!QOb!TOm$qOs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O|#RO!O!_O!r!aO!s!aO!t!aO!u!aO!v!aO!x!cO#a+fO#b+gO#i+hO%e#UO%l#SO&m!RO&r#WO&s!TO(x$pO)WYO~OQ)sP!d)sP~P#GuO]&[Os!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O!V&YO)Z&XO)]&]O)^&]O~O[#kX!T#kX#v#kX)`#kX)q#kXQ#kX!d#kX!h#kX)a#kX!x#kX(|#kX~P#IyOPmO]$gOb%SOm;UOs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O!V$hO!W+nO!X!XO!Y!WO!i!YO#V#QO%_#ZO%`#[O%a#YO%v$oO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(x$zO)Z+oO)^$mO)a!ZO)cXO)ocO)pdO~O]&eO!V+pO~O]&[O!V&YO)WYO)Z&XO)]&]O)^&]O)a+sO[)kP~P8}O]&[O!V&YO)Z&XO)]&]O)^&]O~O[#nX!T#nX#v#nX)`#nX)q#nXQ#nX!d#nX!h#nX)a#nX!x#nX(|#nX~P#NsO!TxO])uX!V)uX~Os!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O#T+{O#p+|O)O+yO)]+wO)^+wO~O]#jX!T#jX!V#jX[#jX#v#jX)`#jX)q#jXQ#jX!d#jX!h#jX)a#jX!x#jX(|#jX~P$!WO#V,OO~Os!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O!l,PO#T+{O#V,OO#p+|O)O+yO)],PO)^,PO])mP!T)mP!V)mP#v)mP(|)mP)q)mP[)mP!h)mP)`)mP~O!x)mPQ)mP!d)mP~P$$TOPmO]$gOb%SOm;UOs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O!V$hO!X!XO!Y!WO!i!YO#V#QO%_#ZO%`#[O%a#YO%v$oO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(x$zO)^$mO)a!ZO)cXO)ocO)pdO~O!W,VO)Z,WO~P$&OO)WYO)a+sO[)kP~P8}O]&eO!V&dO[&Za!T&Za!h&Za#v&Za)`&Za)q&ZaQ&Za!d&Za(|&Za~OPmO]$gOb!]Om;WOs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O|#RO!V$hO!X!XO!Y!WO!i!YO#V#QO#a#VO#b#TO%_#ZO%`#[O%a#YO%e#UO%l#SO%v$oO&m!RO&r#WO&s!TO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(x;]O)Z$mO)^$mO)a!ZO)cXO)ocO)pdO~OQ)QP!d)QP~P$)hO]$PO!V#nO(}#mO)O#mO!X'Pa!Y'Pa!['Pa!^'Pa!_'Pa!a'Pa!b'Pa!e'Pa!f'Pa!h'Pa({'Pa)Z'Pa)['Pa)]'Pa)^'Pa)_'Pa)`'Pa)a'Pa!g'Pa)q'Pa['Pa!W'Pa(|'Pa!U'PaQ'Pa!d'Pa~O]$PO!V#nO!X#}O(}#mO)O#mO~P!BmO!TxO#t!fO)WYO~P8}O!TxO(x%pO)q,aO~O#x,fO~OQ)hX!d)hX!h)hX)a)hX)q)hX[)hX!T)hX(|)hX)`)hX~P:qO(|,jO(},hO)W$UX)`$UX~O(x,kO~O)WYO)`,nO~OPmO]$gOb!]Om;VOs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O|#RO!O!_O!V$hO!X!XO!Y!WO!i!YO!r!aO!s!aO!t!aO!u!aO!v!aO!x!cO#V#QO#a#VO#b#TO%_#ZO%`#[O%a#YO%e#UO%l#SO%v$oO&m!RO&r#WO&s!TO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO)WYO)Z$mO)^$mO)`iO)a!ZO)cXO)ocO)pdO~O(x;^O~P$0yOPmO]$gOb%SOm;UO!TxO!V$hO!X!XO!Y!WO!i!YO#V#QO#v!eO$Y!vO$Z!wO$`!iO$e!jO$g!kO$h!lO$k!mO$m!nO$o!oO$q!pO$s!qO$u!rO$w!sO%_#ZO%`#[O%a#YO%v$oO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(x:wO)WYO)Z$mO)^$mO)`iO)a!ZO)cXO)ocO)pdO~O$h,xO~OPmO]$gOb!]Om;VOs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O|#RO!O!_O!V$hO!X!XO!Y!WO!i!YO!r!aO!s!aO!t!aO!u!aO!v!aO!x!cO#V#QO#a#VO#b#TO$}!uO%_#ZO%`#[O%a#YO%e#UO%l#SO%v$oO&m!RO&r#WO&s!TO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO)WYO)Z$mO)^$mO)a!ZO)cXO)ocO)pdO~O${-OO(x;XO)`,|O~P$7dO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O!h#kO({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)`-QO)a$OO~P#4YO)`-QO~O)`-RO~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)`-SO)a$OO~P#4YO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)`-TO)a$OO~P#4YO!h-UO)`*QX~Oq&hO)WYO)q-XO~O)`-YO~Om;hO(x;ZO~O]-aO!{!dO&r#WO&s$yO(x-]O)Z-^O~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO(|-dO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO!TxO$`!iO$e!jO$g!kO$h!lO$k-iO$m!nO$o!oO$q!pO$s!qO$u!rO$w!sO$}!uO(x:xOe$Xa!o$Xa!{$Xa#i$Xa#p$Xa#t$Xa#v$Xa$R$Xa$T$Xa$Y$Xa$Z$Xa${$Xa%U$Xa%c$Xa%g$Xa%o$Xa%|$Xa(m$Xa)]$Xa!U$Xa$c$Xa~P$0yO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)`-jO)a$OO~P#4YOm-lO!TxO)q,aO~O)q-nO~O]&]a!X&]a!Y&]a![&]a!^&]a!_&]a!a&]a!b&]a!e&]a!f&]a!h&]a({&]a(}&]a)O&]a)[&]a)]&]a)^&]a)_&]a)`&]a)a&]a!g&]a)q&]a[&]a!W&]a!T&]a#v&]a(|&]a!U&]aQ&]a!d&]a~O)Z-rO!V&]a~P$DxO[-rO~O!W-rO~O!V-sO)Z&]a~P$DxO])TXe)TXs)TXt)TXu)TXv)TXw)TXx)TXy)TXz)TX!O)TX!V)TX!r)TX!s)TX!t)TX!u)TX!v)TX!x)TX!{)TX%v)TX&r)TX&s)TX(x)TX)Z)TX)])TX)^)TX~Om;xO~P$GhO]&eO!V&dO)`-tO~Om;mO!o-wO#V,OO#i-|O#t!fO${-OO%c!zO%k-{O%o!|O%v!}O(x;aO)WYO~P!8mO!n.QO(x,kO~O)WYO)`.SO~OPmO]$gOb%SOm;UO!T.XO!V$hO!X!XO!Y!WO!i!YO#V.`O#a._O%_#ZO%`#[O%a#YO%v$oO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(x$zO)O.WO)Z$mO)^$mO)`.UO)a!ZO)cXO)ocO)pdO~O!U.^O~P$JxO])eXe)eXs)eXt)eXu)eXv)eXw)eXx)eXy)eXz)eX!O)eX!T)eX!V)eX!l)eX!r)eX!s)eX!t)eX!u)eX!v)eX!x)eX!{)eX%v)eX&r)eX&s)eX(x)eX(|)eX)Z)eX)])eX)^)eX)`)eX[)eX!h)eX)a)eX!X)eX!Y)eX![)eX!^)eX!_)eX!a)eX!b)eX!e)eX!f)eX({)eX(})eX)O)eX)[)eX)_)eX!g)eX)q)eX!W)eXQ)eX!d)eX#T)eX#V)eX#p)eX#v)eXb)eX|)eX!o)eX#a)eX#b)eX#i)eX#t)eX${)eX%c)eX%e)eX%k)eX%l)eX%o)eX&m)eX)W)eX!U)eX~Om*aO~P$MSOm$qO!T(TO!l.eO(x$pO(|(SO)WYO~Oq&hOm)eX~P$MSOm$qO!n.jO!o.jO(x$pO)WYO~Om;nO!U.uO!n.wO!o.vO#i-|O${!tO$}!uO%g!{O%k-{O%o!|O%v!}O(x;`O)WYO~P!8mO!T(TO!l.eO(|(SO])UXe)UXm)UXs)UXt)UXu)UXv)UXw)UXx)UXy)UXz)UX!O)UX!V)UX!r)UX!s)UX!t)UX!u)UX!v)UX!x)UX!{)UX%v)UX&r)UX&s)UX(x)UX)Z)UX)])UX)^)UX~O)`)UX[)UX!X)UX!Y)UX![)UX!^)UX!_)UX!a)UX!b)UX!e)UX!f)UX!h)UX({)UX(})UX)O)UX)[)UX)_)UX)a)UX!g)UX)q)UX!W)UXQ)UX!d)UX!U)UX#v)UX~P%%{O!T(TO~O!T(TO(|(SO~O(x%pO!U*YP~O!T(^O(|.|O]&kae&kam&kas&kat&kau&kav&kaw&kax&kay&kaz&ka!O&ka!V&ka!r&ka!s&ka!t&ka!u&ka!v&ka!x&ka!{&ka%v&ka&r&ka&s&ka(x&ka)Z&ka)]&ka)^&ka)`&ka[&ka!X&ka!Y&ka![&ka!^&ka!_&ka!a&ka!b&ka!e&ka!f&ka!h&ka({&ka(}&ka)O&ka)[&ka)_&ka)a&ka!g&ka)q&ka!W&kaQ&ka!d&ka!U&ka#v&ka~Om$qO!T(^O(x$pO~O&r#WO&s$yO]&pae&pam&pas&pat&pau&pav&paw&pax&pay&paz&pa!O&pa!V&pa!r&pa!s&pa!t&pa!u&pa!v&pa!x&pa!{&pa%v&pa(x&pa)Z&pa)]&pa)^&pa)`&pa[&pa!T&pa!X&pa!Y&pa![&pa!^&pa!_&pa!a&pa!b&pa!e&pa!f&pa!h&pa({&pa(}&pa)O&pa)[&pa)_&pa)a&pa!g&pa)q&pa!W&paQ&pa!d&pa(|&pa!U&pa#v&pa~O&s/RO~P!(}O!Y#sO![#tO!f#|O)Z#oO!^'Ua!_'Ua!a'Ua!b'Ua!e'Ua!h'Ua({'Ua)['Ua)]'Ua)^'Ua)_'Ua)`'Ua)a'Ua!g'Ua)q'Ua['Ua!W'Ua(|'Ua!U'UaQ'Ua!d'Ua~P#4YO!V'dX!X'dX!Y'dX!['dX!^'dX!_'dX!a'dX!b'dX!e'dX!f'dX!h'dX({'dX(}'dX)O'dX)Z'dX)['dX)]'dX)^'dX)_'dX)a'dX['dX~O]/TO)`'dX!g'dX)q'dX!W'dX(|'dX!U'dXQ'dX!d'dX~P%3`O!Y#sO![#tO!f#|O)Z#oO!^'Wa!_'Wa!a'Wa!b'Wa!e'Wa!h'Wa({'Wa)['Wa)]'Wa)^'Wa)_'Wa)`'Wa)a'Wa!g'Wa)q'Wa['Wa!W'Wa(|'Wa!U'WaQ'Wa!d'Wa~P#4YO]$PO!T$YO!V/UO&r#WO&s$yO~O!X'Za!Y'Za!['Za!^'Za!_'Za!a'Za!b'Za!e'Za!f'Za!h'Za({'Za(}'Za)O'Za)Z'Za)['Za)]'Za)^'Za)_'Za)`'Za)a'Za!g'Za)q'Za['Za!W'Za(|'Za!U'ZaQ'Za!d'Za~P%7VO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO!h'^a)`'^a!g'^a)q'^a['^a!W'^a(|'^a!U'^aQ'^a!d'^a~P#4YOPmO]$gOb%SOm;UO!V$hO!X!XO!Y!WO!i!YO#V#QO%_#ZO%`#[O%a#YO%v$oO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(x$zO)Z$mO)^%_O)a!ZO)cXO)ocO)pdO)q%^O~O!W/XO~P%;VO(r(mO(s(mO(t/ZO~OS(vO]$PO(q#]O*`(uO~OS(vO]/^O'f/]O(q#]O*`(uO~OS/bO(q#]O*`/aO~O]$PO~Q'na!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO(|/dO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O!h#kO({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO)`#Zi[#Zi~P#4YO]dXmhXqdXqjX!VdX!XdX!YdX![dX!^dX!_dX!adX!bdX!edX!fdX!gdX!hdX({dX(}dX)OdX)ZdX)[dX)]dX)^dX)_dX)`dX)adX)qdX[dX!WdX(|dX!TdX#vdX!UdXQdX!ddX~Oe/fO%Y*YO)P/eO~Om/gO~Om/hO~Oq&hO]ci!Vci!Xci!Yci![ci!^ci!_ci!aci!bci!eci!fci!gci!hci({ci(}ci)Oci)Zci)[ci)]ci)^ci)_ci)`ci)aci)qci[ci!Wci(|ci!UciQci!dci~O!W/jO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO![#tO)Z#oO!Y&zi!^&zi!_&zi!a&zi!b&zi!e&zi!f&zi!h&zi({&zi)[&zi)]&zi)^&zi)_&zi)`&zi)a&zi!g&zi)q&zi[&zi!W&zi(|&zi!U&ziQ&zi!d&zi~P#4YO!Y&zi![&zi!^&zi!_&zi!a&zi!b&zi!e&zi!f&zi!h&zi({&zi)Z&zi)[&zi)]&zi)^&zi)_&zi)`&zi)a&zi!g&zi)q&zi[&zi!W&zi(|&zi!U&ziQ&zi!d&zi~P#4YO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O)Z#oO)^#rO)_#jO!h&zi({&zi)[&zi)]&zi)`&zi)a&zi!g&zi)q&zi[&zi!W&zi(|&zi!U&ziQ&zi!d&zi~P#4YO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O)Z#oO)]#pO)^#rO)_#jO!h&zi({&zi)[&zi)`&zi)a&zi!g&zi)q&zi[&zi!W&zi(|&zi!U&ziQ&zi!d&zi~P#4YO!Y#sO![#tO!_#xO!a#zO!b#{O!e#{O!f#|O)Z#oO)^#rO)_#jO!^&zi!h&zi({&zi)[&zi)]&zi)`&zi)a&zi!g&zi)q&zi[&zi!W&zi(|&zi!U&ziQ&zi!d&zi~P#4YO!Y#sO![#tO!a#zO!b#{O!e#{O!f#|O)Z#oO)^#rO)_#jO!^&zi!_&zi!h&zi({&zi)[&zi)]&zi)`&zi)a&zi!g&zi)q&zi[&zi!W&zi(|&zi!U&ziQ&zi!d&zi~P#4YO!Y#sO![#tO!a#zO!b#{O!e#{O!f#|O)Z#oO)_#jO!^&zi!_&zi!h&zi({&zi)[&zi)]&zi)^&zi)`&zi)a&zi!g&zi)q&zi[&zi!W&zi(|&zi!U&ziQ&zi!d&zi~P#4YO!Y#sO![#tO!b#{O!e#{O!f#|O)Z#oO)_#jO!^&zi!_&zi!a&zi!h&zi({&zi)[&zi)]&zi)^&zi)`&zi)a&zi!g&zi)q&zi[&zi!W&zi(|&zi!U&ziQ&zi!d&zi~P#4YO!Y#sO![#tO!f#|O)Z#oO!^&zi!_&zi!a&zi!b&zi!e&zi!h&zi({&zi)[&zi)]&zi)^&zi)_&zi)`&zi)a&zi!g&zi)q&zi[&zi!W&zi(|&zi!U&ziQ&zi!d&zi~P#4YO!Y#sO![#tO)Z#oO!^&zi!_&zi!a&zi!b&zi!e&zi!f&zi!h&zi({&zi)[&zi)]&zi)^&zi)_&zi)`&zi)a&zi!g&zi)q&zi[&zi!W&zi(|&zi!U&ziQ&zi!d&zi~P#4YO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O)Z#oO)[#qO)]#pO)^#rO)_#jO!h&zi({&zi)`&zi)a&zi!g&zi)q&zi[&zi!W&zi(|&zi!U&ziQ&zi!d&zi~P#4YO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O!h/kO({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO[(yX~P#4YO!h/kO[(yX~O[/mO~O]%Xaq%Xa!X%Xa!Y%Xa![%Xa!^%Xa!_%Xa!a%Xa!b%Xa!e%Xa!f%Xa!h%Xa({%Xa(}%Xa)O%Xa)[%Xa)]%Xa)^%Xa)_%Xa)`%Xa)a%Xa!g%Xa)q%Xa[%Xa!W%Xa!T%Xa#v%Xa(|%Xa!U%XaQ%Xa!d%Xa~O)Z/nO!V%Xa~P&-YO[/nO~O!W/nO~O!V/oO)Z%Xa~P&-YO!X'Zi!Y'Zi!['Zi!^'Zi!_'Zi!a'Zi!b'Zi!e'Zi!f'Zi!h'Zi({'Zi(}'Zi)O'Zi)Z'Zi)['Zi)]'Zi)^'Zi)_'Zi)`'Zi)a'Zi!g'Zi)q'Zi['Zi!W'Zi(|'Zi!U'ZiQ'Zi!d'Zi~P%7VO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO!h'^i)`'^i!g'^i)q'^i['^i!W'^i(|'^i!U'^iQ'^i!d'^i~P#4YO!W/tO~P%;VO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O!h/vO({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO!U)yX~P#4YO(x/yO~O!V/{O(})xO)q/}O~O!h/vO!U)yX~O!U0OO~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO!h`i({`i)``i!g`i)q`i[`i!W`i(|`i!U`iQ`i!d`i~P#4YO!R0PO~Om*QO]!Qa!h!Qa)V!Qa)a!Qa~OP0XO]0WOm0XO!R0XO!T0UO!V0VO!X0XO!Y0XO![0XO!^0XO!_0XO!a0XO!b0XO!e0XO!f0XO!g0XO!h0XO!i0XO(vQO(|0XO(}0XO)O0XO)Z0RO)[0SO)]0SO)^0TO)_#jO)`0XO)a0XO)cXO~O[0[O~P&7rO!R$^O~O!h*TO)V)Xa)a)Xa~O)V0`O~O])iO!V)jO!X)gO!g)gO%Z)gO%[)gO%])gO%^)gO%_)kO%`)kO%a)gO)O)hO)q)gO*P)lO~Oe)tO%Y*YO)P$QO~O)`0bO~O]oXeoXmnXqoXsoXtoXuoXvoXwoXxoXyoXzoX!OoX!VoX!roX!soX!toX!uoX!voX!xoX!{oX%voX&roX&soX(xoX)ZoX)]oX)^oX!ToX!hoX)aoX[oXQoX!doX~O!loX(|oX)`oX!XoX!YoX![oX!^oX!_oX!aoX!boX!eoX!foX({oX(}oX)OoX)[oX)_oX!goX)qoX!WoX!UoX#voX#ToX#VoX#poXboX|oX!ooX#aoX#boX#ioX#toX${oX%coX%eoX%koX%loX%ooX&moX)WoX~P&;nOs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O!O!_O!r!aO!s!aO!t!aO!u!aO!v!aO!x!cO~O])hie)him)hi!V)hi!{)hi%v)hi(x)hi)Z)hi)])hi)^)hiQ)hi!d)hi!h)hi)a)hi)q)hi[)hi!T)hi&r)hi(|)hi)`)hi~P&@lO]&eO!V&dO[#Qi!T#Qi!h#Qi#v#Qi)`#Qi)q#QiQ#Qi!d#Qi(|#Qi~O[raQra!dra!hra)ara)`ra~P#:ZO[raQra!dra!hra)ara)`ra~P#IyO]&eO!V+pO[raQra!dra!hra)ara)`ra~O!h*nO!W)ra~O!h*rO!W*Wa~OPmOb!]Os!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O|#RO!O!_O!X!XO!Y!WO!i!YO!s!aO!t!aO!v!aO!x!cO#V#QO#a#VO#b#TO#v!eO$Y!vO$Z!wO$`!iO$e!jO$g!kO$h!lO$k!mO$m!nO$o!oO$q!pO$s!qO$u!rO$w!sO%_#ZO%`#[O%a#YO%e#UO%l#SO&m!RO&r#WO&s!TO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO)WYO)`iO)a!ZO)cXO)ocO)pdO~O]eOe!POmTO!T*vO!U&VO!V0pO!opO!r!`O!u!bO!{!dO#i#OO#p!xO#t!fO$R!gO$T!hO${!tO$}!uO%U!yO%c!zO%g!{O%o!|O%v!}O%|#PO(xRO(})xO)ZaO)]|O)^{O~P&EnO!h*yO)`)xa~OPmO]$gOb!]Om;WO|#RO!T$YO!V$hO!X!XO!Y!WO!i!YO#V#QO#a#VO#b#TO%_#ZO%`#[O%a#YO%e#UO%l#SO%v$oO&m!RO&r#WO&s!TO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(x;_O)WYO)Z$mO)^$mO)a0vO)cXO)ocO)pdO[(yP[)kP~P&@lO!h*rO!W*WX~O]$PO!T$YO~O!h0{O!T*SX#v*SX)q*SX~O)`0}O~O)`1OO~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)`1QO)a$OO~P#4YO)`1OO~P!?ZO]1[Oe!POm%dO!V1YO!{!dO%v$oO(x$zO)Z1SO)a1VO~O)]1WO)^1WO)q1TOQ#PX!d#PX!h#PX[#PX~P'!]O!h1]OQ)sX!d)sX~OQ1_O!d1_O~O)a1bO)q1aOQ#`X!d#`X!h#`X~P!<_O)a1bO)q1aOQ#`X!d#`X!h#`X~P!;eOq&WO~O[#ka!T#ka#v#ka)`#ka)q#kaQ#ka!d#ka!h#ka)a#ka!x#ka(|#ka~P#IyO]&eO!V+pO[#ka!T#ka#v#ka)`#ka)q#kaQ#ka!d#ka!h#ka)a#ka!x#ka(|#ka~O!W1gO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO!W1gO)Z1iO~P$&OO!W1gO~P!(}O]#ja!T#ja!V#ja[#ja#v#ja)`#ja)q#jaQ#ja!d#ja!h#ja)a#ja!x#ja(|#ja~P$!WO[1mO]&eO!V+pO~O!h1nO[)kX~O[1pO~O]&eO!V+pO[#na!T#na#v#na)`#na)q#naQ#na!d#na!h#na)a#na!x#na(|#na~O]1tOs#SXt#SXu#SXv#SXw#SXx#SXy#SXz#SX!T#SX!V#SX#T#SX#p#SX)O#SX)]#SX)^#SX!l#SX!x#SX#V#SX#v#SX(|#SX)q#SX[#SX!h#SX)`#SXQ#SX!d#SX)a#SX~O]1uO~O]1xOm$qO!V$hO#V#QO(x$pO)ocO)pdO~Os!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O!l,PO#T+{O#V,OO#p+|O)O+yO)],PO)^,PO~O])mX!T)mX!V)mX!x)mX#v)mX(|)mX)q)mX[)mX!h)mX)`)mXQ)mX!d)mX~P',vO!x!cO]#Ri!T#Ri!V#Ri#v#Ri(|#Ri)q#Ri[#Ri!h#Ri)`#RiQ#Ri!d#Ri~O!W2QO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO!W2QO)Z2SO~P$&OO!W2QO~P!(}O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OOQ*ZX!d*ZX!h*ZX~P#4YO)a2TOQ)RX!d)RX!h)RX~O!h2UOQ)QX!d)QX~OQ2WO!d2WO~O[2XO~O#t$nO)WYO~P8}Om-lO!TxO)q2]O~O[2^O~O#x,fOP#ui]#uib#uie#uim#uis#uit#uiu#uiv#uiw#uix#uiy#uiz#ui|#ui!O#ui!T#ui!V#ui!X#ui!Y#ui!i#ui!o#ui!r#ui!s#ui!t#ui!u#ui!v#ui!x#ui!{#ui#V#ui#a#ui#b#ui#i#ui#p#ui#t#ui#v#ui$R#ui$T#ui$Y#ui$Z#ui$`#ui$e#ui$g#ui$h#ui$k#ui$m#ui$o#ui$q#ui$s#ui$u#ui$w#ui${#ui$}#ui%U#ui%_#ui%`#ui%a#ui%c#ui%e#ui%g#ui%l#ui%o#ui%v#ui%|#ui&m#ui&r#ui&s#ui'Q#ui'R#ui'V#ui'Y#ui'a#ui'b#ui(m#ui(v#ui(x#ui)W#ui)Z#ui)]#ui)^#ui)`#ui)a#ui)c#ui)o#ui)p#ui!U#ui$c#ui!n#ui%k#ui~O]&eO~O]&eO!TxO!V&dO#v!eO~O(|2cO(},hO)W$Ua)`$Ua~O)WYO)`2eO~O[2fO~P,`O[2fO)`#lO~O[2fO~O$c2kOP$_i]$_ib$_ie$_im$_is$_it$_iu$_iv$_iw$_ix$_iy$_iz$_i|$_i!O$_i!T$_i!V$_i!X$_i!Y$_i!i$_i!o$_i!r$_i!s$_i!t$_i!u$_i!v$_i!x$_i!{$_i#V$_i#a$_i#b$_i#i$_i#p$_i#t$_i#v$_i$R$_i$T$_i$Y$_i$Z$_i$`$_i$e$_i$g$_i$h$_i$k$_i$m$_i$o$_i$q$_i$s$_i$u$_i$w$_i${$_i$}$_i%U$_i%_$_i%`$_i%a$_i%c$_i%e$_i%g$_i%l$_i%o$_i%v$_i%|$_i&m$_i&r$_i&s$_i'Q$_i'R$_i'V$_i'Y$_i'a$_i'b$_i(m$_i(v$_i(x$_i)W$_i)Z$_i)]$_i)^$_i)`$_i)a$_i)c$_i)o$_i)p$_i!U$_i~O]1xO~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O!h#kO({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)`2nO)a$OO~P#4YOPmO]$gOb!]Om;VO|#RO!V$hO!X!XO!Y!WO!i!YO#V#QO#a#VO#b#TO%_#ZO%`#[O%a#YO%e#UO%l#SO%v$oO&m!RO&r#WO&s!TO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(x;XO)Z$mO)^$mO)`2qO)a!ZO)cXO)ocO)pdO~P&@lO)`2nO~O(x-]O~O!h-UO)`*Qa~O)WYO)q2vO~O)`2xO~O]-aOs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O!{!dO!|%TO(x-]O)Z-^O~O)Z2}O~O]&eO!V3PO!h3QO)`)|X~O]-aO!{!dO(x-]O)Z-^O~O)`3TO~O!TxO$`!iO$e!jO$g!kO$h!lO$k-iO$m!nO$o!oO$q!pO$s!qO$u!rO$w!sO$}!uO(x:xOe$Xi!o$Xi!{$Xi#i$Xi#p$Xi#t$Xi#v$Xi$R$Xi$T$Xi$Y$Xi$Z$Xi${$Xi%U$Xi%c$Xi%g$Xi%o$Xi%|$Xi(m$Xi)]$Xi!U$Xi$c$Xi~P$0yOm;VO(x:xO~P0}O]3XO~O)`2[O~O!u3ZO(x%pO~O[3^O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O!h3_O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO[3`O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO]&eO!V+pO!T%ui#v%ui)`%ui)q%ui~O!W3aO~Om;TO)`)TX~P$GhOb!TOm$qO|3gO#a#VO#b3fO#t!fO%e#UO%l3hO&m!RO&r#WO&s!TO(x$pO)WYO~P&@lOm;mO!o-wO#i-|O#t!fO${-OO%c!zO%k-{O%o!|O%v!}O(x;aO)WYO~P!8mO]&eO!V&dO)`3jO~O)`3kO~O)WYO)`3kO~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O!h#kO({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)`3lO)a$OO~P#4YO)`3lO~O)`3oO~O!U3qO~P$JxOm$qO(x$pO~O]3sO!T'|O~P',bO!T(TO!l3vO(|(SO])Uae)Uam)Uas)Uat)Uau)Uav)Uaw)Uax)Uay)Uaz)Ua!O)Ua!V)Ua!r)Ua!s)Ua!t)Ua!u)Ua!v)Ua!x)Ua!{)Ua%v)Ua&r)Ua&s)Ua(x)Ua)Z)Ua)])Ua)^)Ua)`)Ua[)Ua!X)Ua!Y)Ua![)Ua!^)Ua!_)Ua!a)Ua!b)Ua!e)Ua!f)Ua!h)Ua({)Ua(})Ua)O)Ua)[)Ua)_)Ua)a)Ua!g)Ua)q)Ua!W)UaQ)Ua!d)Ua!U)Ua#v)Ua~Om$qO!n.jO!o.jO(x$pO~O!h3zO)a3|O!T)fX~O!o4OO)WYO~P8}O)`4PO~PGYO]4UOm)QO!T$YO!{!dO%v$oO&r#WO(x)PO(|4YO)Z4RO)]4VO)^4VO~O)`4ZO)q4]O~P('fOm;nO!U4_O!n.wO!o.vO#i-|O${!tO$}!uO%g!{O%k-{O%o!|O%v!}O(x;`O)WYO~P!8mOm;nO%v!}O(x;`O~P!8mO(|4`O~Om$qO!T(TO(x$pO(|(SO)WYO~O!l3vO~P()tO)q4bO!U&oX!h&oX~O!h4cO!U*YX~O!U4eO~Ob4gOm$qO&m!RO(x$pO~O!T(^O]&kie&kim&kis&kit&kiu&kiv&kiw&kix&kiy&kiz&ki!O&ki!V&ki!r&ki!s&ki!t&ki!u&ki!v&ki!x&ki!{&ki%v&ki&r&ki&s&ki(x&ki)Z&ki)]&ki)^&ki)`&ki[&ki!X&ki!Y&ki![&ki!^&ki!_&ki!a&ki!b&ki!e&ki!f&ki!h&ki({&ki(}&ki)O&ki)[&ki)_&ki)a&ki!g&ki)q&ki!W&kiQ&ki!d&ki!U&ki#v&ki~O(|&ki~P(+UO(|.|O~P(+UO[4jO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO[4jO~O[4kO~O]$PO!T$YO!V'Zi!X'Zi!Y'Zi!['Zi!^'Zi!_'Zi!a'Zi!b'Zi!e'Zi!f'Zi!h'Zi({'Zi(}'Zi)O'Zi)Z'Zi)['Zi)]'Zi)^'Zi)_'Zi)`'Zi)a'Zi!g'Zi)q'Zi['Zi!W'Zi(|'Zi!U'ZiQ'Zi!d'Zi~OPmOb%SOm;UO!X!XO!Y!WO!i!YO#V#QO%_#ZO%`#[O%a#YO%v$oO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(x$zO)a!ZO)cXO)ocO)pdO]#]aq#]a!T#]a!V#]a)Z#]a)]#]a)^#]a~O(x%pO)a4pO[*bP~OS(vO'f4rO(q#]O*`(uO~O*`4sO~OmnXqoXq&wX~Oe4uO%Y*YO)P/eO~Oe4uO%Y*YO)P4vO~O!h/kO[(ya~O!W4zO~O]&eO!V+pO!T%uq#v%uq)`%uq)q%uq~O]$PO!T$YO!X'Zq!Y'Zq!['Zq!^'Zq!_'Zq!a'Zq!b'Zq!e'Zq!f'Zq!h'Zq({'Zq(}'Zq)O'Zq)Z'Zq)['Zq)]'Zq)^'Zq)_'Zq)`'Zq)a'Zq!g'Zq)q'Zq['Zq!W'Zq(|'Zq!U'ZqQ'Zq!d'Zq~O!V'Zq~P(6dO!V/UO&r#WO&s$yO~P(6dO!T$YO!V)wO(})xO!U(VX!h(VX~P!KVO!h/vO!U)ya~O!W5SO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O!h*nO({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO!U5WO~P&7rO!W5WO~P&7rO[5WO~P&7rO[5]O~P&7rO]5^O!h'va)V'va)a'va~O!h*TO)V)Xi)a)Xi~O]&eO!V&dO[#Qq!T#Qq!h#Qq#v#Qq)`#Qq)q#QqQ#Qq!d#Qq(|#Qq~O[riQri!dri!hri)ari)`ri~P#IyO]&eO!V+pO[riQri!dri!hri)ari)`ri~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO!h'Tq)`'Tq!g'Tq)q'Tq['Tq!W'Tq(|'Tq!U'TqQ'Tq!d'Tq~P#4YO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO!W'}a!h'}a~P#4YO!W5cO~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O!h5dO({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)`#lO)a$OO!U)yX~P#4YO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO!h#{i)`#{i~P#4YO]*{O!T$YO!V&dO)q*wO!h(Wa)`(Wa~O!h1nO[)kX]'dX~P%3`O)a5fO!T%qa!h%qa#v%qa)q%qa~O!h0{O!T*Sa#v*Sa)q*Sa~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)`5iO)a$OO~P#4YO]1[Oe!POm;fO!V1YO!{!dO%v$oO(x$zO)Z<SO)]5kO)^5kO~OQ#Pa!d#Pa!h#Pa[#Pa~P(ElO]1[Oe!POs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O!V1YO!{!dO!|%TO%v$oO(x$zOQ#kX!d#kX!h#kX[#kX~Om%dO)Z1SO)]<TO)^<TO~P(FnO]&eOQ#Pa!d#Pa!h#Pa[#Pa~O!V&dO)q5oO~P(H]O(x%pOQ#dX!d#dX!h#dX[#dX~O)]<TO)^<TOQ#nX!d#nX!h#nX[#nX~P'!]O!V+pO~P(H]O]1[Ob!TOe!POm;gO|#RO!V1YO!{!dO#a#VO#b#TO%e#UO%l#SO%v$oO&m!RO&r#WO&s!TO(x;[O)WYO)Z<SO)]5kO)^5kO)a+sO[)kP~P&@lO!h1]OQ)sa!d)sa~Oq&hO)q5tOQ#`am)TX!d#`a!h#`a)a)TX~P$GhO(x-]OQ#ga!d#ga!h#ga~Oq&hO)q5tOQ#`a])eXe)eXm)eXs)eXt)eXu)eXv)eXw)eXx)eXy)eXz)eX!O)eX!T)eX!V)eX!d#`a!h#`a!l)eX!r)eX!s)eX!t)eX!u)eX!v)eX!x)eX!{)eX%v)eX&r)eX&s)eX(x)eX(|)eX)Z)eX)])eX)^)eX)a)eX~O#a5wO#b5wO~O]&eO!V+pO[#ki!T#ki#v#ki)`#ki)q#kiQ#ki!d#ki!h#ki)a#ki!x#ki(|#ki~O!W5yO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO!W5yO~P!(}O!W5yO)Z5{O~P$&OO]#ji!T#ji!V#ji[#ji#v#ji)`#ji)q#jiQ#ji!d#ji!h#ji)a#ji!x#ji(|#ji~P$!WO)WYO)a5}O~P8}O!h1nO[)ka~O&r#WO&s$yO!T#qa!x#qa#v#qa(|#qa)q#qa[#qa!h#qa)`#qaQ#qa!d#qa)a#qa~P#NsO[6SO~P!(}O[)vP~P!4{O)[6YO)]6WO]#Ua!T#Ua!V#Ua)Z#Ua)^#Uas#Uat#Uau#Uav#Uaw#Uax#Uay#Uaz#Ua!l#Ua!x#Ua#T#Ua#V#Ua#p#Ua#v#Ua(|#Ua)O#Ua)q#Uab#Uae#Uam#Ua|#Ua!O#Ua!o#Ua!r#Ua!s#Ua!t#Ua!u#Ua!v#Ua!{#Ua#a#Ua#b#Ua#i#Ua#t#Ua${#Ua%c#Ua%e#Ua%k#Ua%l#Ua%o#Ua%v#Ua&m#Ua&r#Ua&s#Ua(x#Ua)W#Ua)`#Ua[#Ua!h#UaQ#Ua!d#Ua~O!x!cO]#Rq!T#Rq!V#Rq#v#Rq(|#Rq)q#Rq[#Rq!h#Rq)`#RqQ#Rq!d#Rq~O!W6_O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO!W6_O~P!(}O!h2UOQ)Qa!d)Qa~O)`6dO~Om-lO!TxO)q6eO~O]*{O!T$YO!V&dO!h*yO)`)xX~O)q6iO~P),eO[6kO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O!h#kO({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO[6kO~O$c6mOP$_q]$_qb$_qe$_qm$_qs$_qt$_qu$_qv$_qw$_qx$_qy$_qz$_q|$_q!O$_q!T$_q!V$_q!X$_q!Y$_q!i$_q!o$_q!r$_q!s$_q!t$_q!u$_q!v$_q!x$_q!{$_q#V$_q#a$_q#b$_q#i$_q#p$_q#t$_q#v$_q$R$_q$T$_q$Y$_q$Z$_q$`$_q$e$_q$g$_q$h$_q$k$_q$m$_q$o$_q$q$_q$s$_q$u$_q$w$_q${$_q$}$_q%U$_q%_$_q%`$_q%a$_q%c$_q%e$_q%g$_q%l$_q%o$_q%v$_q%|$_q&m$_q&r$_q&s$_q'Q$_q'R$_q'V$_q'Y$_q'a$_q'b$_q(m$_q(v$_q(x$_q)W$_q)Z$_q)]$_q)^$_q)`$_q)a$_q)c$_q)o$_q)p$_q!U$_q~O)`6nO~OPmO]$gOb!]Om;VO|#RO!V$hO!X!XO!Y!WO!i!YO#V#QO#a#VO#b#TO%_#ZO%`#[O%a#YO%e#UO%l#SO%v$oO&m!RO&r#WO&s!TO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(x;XO)Z$mO)^$mO)`6pO)a!ZO)cXO)ocO)pdO~P&@lO(|6rO)q*wO~P),eO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)`6pO)a$OO~P#4YO[6tO~P!(}O)`6xO~O)`6yO~O]-aOs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O!{!dO(x-]O)Z-^O~O]&eO!V3PO!h%Oa)`%Oa[%Oa~O!W7PO)Z7QO~P$&OO!h3QO)`)|a~O[7TO]&eO!V3PO~O!TxO$`!iO$e!jO$g!kO$h!lO$k-iO$m!nO$o!oO$q!pO$s!qO$u!rO$w!sO$}!uO(x:xOe$Xq!o$Xq!{$Xq#i$Xq#p$Xq#t$Xq#v$Xq$R$Xq$T$Xq$Y$Xq$Z$Xq${$Xq%U$Xq%c$Xq%g$Xq%o$Xq%|$Xq(m$Xq)]$Xq!U$Xq$c$Xq~P$0yOPmO]$gOb!]Om;VO|#RO!V$hO!X!XO!Y!WO!i!YO#V#QO#a#VO#b#TO%_#ZO%`#[O%a#YO%e#UO%l#SO%v$oO&m!RO&r#WO&s!TO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(x;XO)WYO)Z$mO)^$mO)`7VO)a!ZO)cXO)ocO)pdO~P&@lO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)`7YO)a$OO~P#4YO)`7ZO~OP7[O(vQO~Om*aO)`)eX~P$GhOq&hOm)TX)`)eX~P$GhO)`7^O~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO)`&Sa~P#4YO!U7`O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO)`7aO~OPmO]$gOb!]Om;WO|#RO!V$hO!X!XO!Y!WO!i!YO#V#QO#a#VO#b#TO%_#ZO%`#[O%a#YO%e#UO%l#SO%v$oO&m!RO&r#WO&s!TO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(x;_O)WYO)Z$mO)^$mO)a0vO)cXO)ocO)pdO[)kP~P&@lO!h3zO)a7eO!T)fa~O!h3zO!T)fa~O)`7jO)q7lO~P('fO)`7nO~PGYO]4UOm)QOs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O!{!dO!|%TO%v$oO&r#WO(x)PO)Z4RO)]4VO)^4VO~O)Z7rO~O]&eO!T*vO!V7tO!h7uO#v!eO(|4YO~O)`7jO)q7wO~P)GyO]4UOm)QO!{!dO%v$oO&r#WO(x)PO)Z4RO)]4VO)^4VO~Oq&hO])jX!T)jX!V)jX!h)jX#v)jX(|)jX)`)jX)q)jX[)jX~O)`7jO~O!T(TO!l7}O(|(SO])Uie)Uim)Uis)Uit)Uiu)Uiv)Uiw)Uix)Uiy)Uiz)Ui!O)Ui!V)Ui!r)Ui!s)Ui!t)Ui!u)Ui!v)Ui!x)Ui!{)Ui%v)Ui&r)Ui&s)Ui(x)Ui)Z)Ui)])Ui)^)Ui)`)Ui[)Ui!X)Ui!Y)Ui![)Ui!^)Ui!_)Ui!a)Ui!b)Ui!e)Ui!f)Ui!h)Ui({)Ui(})Ui)O)Ui)[)Ui)_)Ui)a)Ui!g)Ui)q)Ui!W)UiQ)Ui!d)Ui!U)Ui#v)Ui~O(x%pO!U(hX!h(hX~O!h4cO!U*Ya~Oq&hO]*Xae*Xam*Xas*Xat*Xau*Xav*Xaw*Xax*Xay*Xaz*Xa!O*Xa!T*Xa!V*Xa!r*Xa!s*Xa!t*Xa!u*Xa!v*Xa!x*Xa!{*Xa%v*Xa&r*Xa&s*Xa(x*Xa)Z*Xa)]*Xa)^*Xa)`*Xa[*Xa!X*Xa!Y*Xa![*Xa!^*Xa!_*Xa!a*Xa!b*Xa!e*Xa!f*Xa!h*Xa({*Xa(}*Xa)O*Xa)[*Xa)_*Xa)a*Xa!g*Xa)q*Xa!W*XaQ*Xa!d*Xa(|*Xa!U*Xa#v*Xa~O!T(^O]&kqe&kqm&kqs&kqt&kqu&kqv&kqw&kqx&kqy&kqz&kq!O&kq!V&kq!r&kq!s&kq!t&kq!u&kq!v&kq!x&kq!{&kq%v&kq&r&kq&s&kq(x&kq)Z&kq)]&kq)^&kq)`&kq[&kq!X&kq!Y&kq![&kq!^&kq!_&kq!a&kq!b&kq!e&kq!f&kq!h&kq({&kq(}&kq)O&kq)[&kq)_&kq)a&kq!g&kq)q&kq!W&kqQ&kq!d&kq(|&kq!U&kq#v&kq~OPmOb%SOm;UO!T$YO!i!YO#V#QO%_#ZO%`#[O%a#YO%v$oO'Q!WO'R!WO'V#XO'Y![O'a![O'b![O(vQO(x$zO)cXO)ocO)pdO~O]*^i!V*^i!X*^i!Y*^i![*^i!^*^i!_*^i!a*^i!b*^i!e*^i!f*^i!h*^i({*^i(}*^i)O*^i)Z*^i)[*^i)]*^i)^*^i)_*^i)`*^i)a*^i!g*^i)q*^i[*^i!W*^i(|*^i!U*^iQ*^i!d*^i~P*'YO[8SO~O!W8TO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO!h'^q)`'^q!g'^q)q'^q['^q!W'^q(|'^q!U'^qQ'^q!d'^q~P#4YO!h8UO[*bX~O[8WO~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO!h_y)`_y!g_y)q_y[_y!W_y(|_y!U_yQ_y!d_y~P#4YO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO[(ja!h(ja~P#4YO]$PO!T$YO!V'Zy!X'Zy!Y'Zy!['Zy!^'Zy!_'Zy!a'Zy!b'Zy!e'Zy!f'Zy!h'Zy({'Zy(}'Zy)O'Zy)Z'Zy)['Zy)]'Zy)^'Zy)_'Zy)`'Zy)a'Zy!g'Zy)q'Zy['Zy!W'Zy(|'Zy!U'ZyQ'Zy!d'Zy~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO!h'^y)`'^y!g'^y)q'^y['^y!W'^y(|'^y!U'^yQ'^y!d'^y~P#4YO]&eO!V+pO!T%uy#v%uy)`%uy)q%uy~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO!U(Va!h(Va~P#4YO!W5SO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO!U#}i!h#}i~P#4YO!U8ZO~P&7rO!W8ZO~P&7rO[8ZO~P&7rO[8]O~P&7rO]&eO!V&dO[#Qy!T#Qy!h#Qy#v#Qy)`#Qy)q#QyQ#Qy!d#Qy(|#Qy~O]&eO!V+pO[rqQrq!drq!hrq)arq)`rq~O]&eOQ#Pi!d#Pi!h#Pi[#Pi~O!V+pO~P*:gOQ#nX!d#nX!h#nX[#nX~P(ElO!V&dO~P*:gOQ(PX](PXe'rXm'rXs(PXt(PXu(PXv(PXw(PXx(PXy(PXz(PX!V(PX!d(PX!h(PX!{'rX%v'rX(x'rX)Z(PX)](PX)^(PX[(PX~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OOQ#_i!d#_i!h#_i[#_i~P#4YO&r#WO&s$yOQ#fi!d#fi!h#fi~O(x-]O)a1bO)q1aOQ#`X!d#`X!h#`X~O!W8bO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO!W8bO~P!(}O!T#qi!x#qi#v#qi(|#qi)q#qi[#qi!h#qi)`#qiQ#qi!d#qi)a#qi~O]&eO!V+pO~P*@cO]&[O!V&YO&r#WO&s$yO)Z&XO)]&]O)^&]O~P*@cO[8dO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO!h8eO[)vX~O[8gO~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OOQ*]X!d*]X!h*]X~P#4YO)a8jOQ*[X!d*[X!h*[X~O)`8lO~O[$bi!h#{a)`#{a~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)`8oO)a$OO~P#4YO[8qO~P!(}O[8qO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O!h#kO({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO[8qO~O]&eO!V&dO(|8wO~O)`8xO~O]&eO!V3PO!h%Oi)`%Oi[%Oi~O!W8{O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO!W8{O)Z8}O~P$&OO!W8{O~P!(}O]&eO!V3PO!h(Za)`(Za~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O!h#kO({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)`9OO)a$OO~P#4YO)`2qO~P!(}O)`9OO~OP%qO[9PO(vQO~O[9PO~O)`9QO~P%%{O#T9TO)O.WO)`9RO~O!h3zO!T)fi~O)a9XO!T'xa!h'xa~O)`9ZO)q9]O~P)GyO)`9ZO~O)`9ZO)q9aO~P('fOs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O~P)HiO]&eO!V7tO!T!ya!h!ya#v!ya(|!ya)`!ya)q!ya[!ya~O!W9hO)Z9iO~P$&OO!T$YO!h7uO(|4YO)`9ZO)q9aO~O!T$YO~P#EtO[9lO]&eO!V7tO~O]&eO!V7tO!T&aa!h&aa#v&aa(|&aa)`&aa)q&aa[&aa~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO)`&ba~P#4YO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)`9ZO)a$OO~P#4YO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO!U&oi!h&oi~P#4YO!V/UO]']i!T']i!X']i!Y']i![']i!^']i!_']i!a']i!b']i!e']i!f']i!h']i({']i(}']i)O']i)Z']i)[']i)]']i)^']i)_']i)`']i)a']i!g']i)q']i[']i!W']i(|']i!U']iQ']i!d']i~O(x%pO)a9oO~O!h8UO[*ba~O[9qO~P&7rO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O!h#kO({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO!U(Va)`#Zi~P#4YO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OOQ#_q!d#_q!h#_q[#_q~P#4YO&r#WO&s$yOQ#fq!d#fq!h#fq~O)q5tOQ#`a!d#`a!h#`a~O]&eO!V+pO!T#qq!x#qq#v#qq(|#qq)q#qq[#qq!h#qq)`#qqQ#qq!d#qq)a#qq~O!h8eO[)va~O)]6WO]&Vi!T&Vi!V&Vi)Z&Vi)[&Vi)^&Vis&Vit&Viu&Viv&Viw&Vix&Viy&Viz&Vi!l&Vi!x&Vi#T&Vi#V&Vi#p&Vi#v&Vi(|&Vi)O&Vi)q&Vib&Vie&Vim&Vi|&Vi!O&Vi!o&Vi!r&Vi!s&Vi!t&Vi!u&Vi!v&Vi!{&Vi#a&Vi#b&Vi#i&Vi#t&Vi${&Vi%c&Vi%e&Vi%k&Vi%l&Vi%o&Vi%v&Vi&m&Vi&r&Vi&s&Vi(x&Vi)W&Vi)`&Vi[&Vi!h&ViQ&Vi!d&Vi~O)`9tO~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO[$bq!h#{i)`#{i~P#4YO[9vO~P!(}O[9vO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O!h#kO({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO[9vO~O]&eO!V&dO(|9yO~O[9zO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO[9zO~O]&eO!V3PO!h%Oq)`%Oq[%Oq~O!W:OO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO!W:OO~P!(}O)`6pO~P!(}O)`:PO~O)`:QO~O)O.WO)`:QO~O!h3zO!T)fq~O)a:SO!T'xi!h'xi~O!T$YO!h7uO(|4YO)`:TO)q:VO~O)`:TO~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)`:TO)a$OO~P#4YO)`:TO)q:YO~P)GyO]&eO!V7tO!T!yi!h!yi#v!yi(|!yi)`!yi)q!yi[!yi~O!W:^O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO!W:^O)Z:`O~P$&OO!W:^O~P!(}O]&eO!V7tO!T(fa!h(fa(|(fa)`(fa)q(fa~O[:bO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O!h#kO({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO[:bO~O[:gO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO[:gO~O]&eO!V3PO!h%Oy)`%Oy[%Oy~O)`:hO~O)`:iO~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)`:iO)a$OO~P#4YO!T$YO!h7uO(|4YO)`:iO)q:lO~O]&eO!V7tO!T!yq!h!yq#v!yq(|!yq)`!yq)q!yq[!yq~O!W:nO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO!W:nO~P!(}O[:pO!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)a$OO~P#4YO[:pO~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)`:rO)a$OO~P#4YO)`:rO~O]&eO!V7tO!T!yy!h!yy#v!yy(|!yy)`!yy)q!yy[!yy~O!Y#sO![#tO!^#wO!_#xO!a#zO!b#{O!e#{O!f#|O({#hO)Z#oO)[#qO)]#pO)^#rO)_#jO)`:vO)a$OO~P#4YO)`:vO~O]ZXmhXqZXqjX!TjX!VZX!XZX!YZX![ZX!^ZX!_ZX!aZX!bZX!eZX!fZX!gZX!hZX({ZX(|$]X(}ZX)OZX)ZZX)[ZX)]ZX)^ZX)_ZX)`ZX)aZX)qZX~O]%WXmnXqoXq%WX!ToX!V%WX!X%WX!Y%WX![%WX!^%WX!_%WX!a%WX!b%WX!e%WX!f%WX!gnX!h%WX({%WX(}%WX)O%WX)Z%WX)[%WX)]%WX)^%WX)_%WX)a%WX)qnX[%WXQ%WX!d%WX~O)`%WX!W%WX(|%WX!U%WX~P+HoO]oX]%WXeoXmnXqoXq%WXsoXtoXuoXvoXwoXxoXyoXzoX!OoX!VoX!V%WX!roX!soX!toX!uoX!voX!xoX!{oX%voX&roX&soX(xoX)ZoX)]oX)^oX[oX[%WX!hoX)aoX~O)`oX)qoX~P+KPO]%WXmnXqoXq%WX!V%WX!h%WXQ%WX!d%WX[%WX~O!T%WX#v%WX)`%WX)q%WX(|%WX~P+MjOQoXQ%WX!ToX!X%WX!Y%WX![%WX!^%WX!_%WX!a%WX!b%WX!doX!d%WX!e%WX!f%WX!gnX!h%WX({%WX(}%WX)O%WX)Z%WX)[%WX)]%WX)^%WX)_%WX)a%WX)qnX~P+KPO]oX]%WXmnXqoXq%WXsoXtoXuoXvoXwoXxoXyoXzoX!OoX!V%WX!roX!soX!toX!uoX!voX!xoX!{oX%voX&roX&soX(xoX)ZoX)]oX)^oX~O!ToX(|oX)`oX)qoX~P,!bOmnXqoX!h%WX)`%WX~OeoX!VoX)`%WX~P,!bOe)tO%Y)uO)P:yO~Oe)tO%Y)uO)P;OO~Oe)tO%Y)uO)P:zO~Oe$TO%Y*YO'[$VO'_$WO)P:yO~Oe$TO%Y*YO'[$VO'_$WO)P:{O~Oe$TO%Y*YO'[$VO'_$WO)P:}O~O[jX]jXsjXtjXujXvjXwjXxjXyjXzjX!VjX&rjX&sjX)ZjX)]jX)^jXejX!OjX!rjX!sjX!tjX!ujX!vjX!xjX!{jX%vjX(xjX~P#1xO]ZXmhXqZXqjX!VZX!hZX)`ZX)qZX~O!TZX#vZX(|ZX~P,({OmhXqjX!hZX)WjX)`ZX)qjX~O]ZX]jXejXmhXqZXqjXsjXtjXujXvjXwjXxjXyjXzjX!OjX!VZX!VjX!rjX!sjX!tjX!ujX!vjX!xjX!{jX%vjX&rjX&sjX(xjX)ZjX)]jX)^jX[ZX[jX!hjX)ajX)qjX~O)`ZX~P,*YO]ZX]jXmhXqZXqjXsjXtjXujXvjXwjXxjXyjXzjX!TjX!VZX!VjX!XZX!YZX![ZX!^ZX!_ZX!aZX!bZX!eZX!fZX!gZX!hZX!hjX&rjX&sjX({ZX(}ZX)OZX)ZZX)ZjX)[ZX)]ZX)]jX)^ZX)^jX)_ZX)aZX)ajX)qZX~OQZXQjX!dZX!djX~P,,sO]jXejXsjXtjXujXvjXwjXxjXyjXzjX!OjX!VjX!rjX!sjX!tjX!ujX!vjX!xjX!{jX%vjX&rjX&sjX(xjX)ZjX)]jX)^jX~P#1xO[ZX[jXejX!OjX!rjX!sjX!tjX!ujX!vjX!xjX!{jX%vjX(xjX)qjX~P,,sO]ZX]jXmhXqZXqjXsjXtjXujXvjXwjXxjXyjXzjX!OjX!VZX!rjX!sjX!tjX!ujX!vjX!xjX!{jX%vjX&rjX&sjX(xjX)ZjX)]jX)^jX)`jX~O!TjX(|jX)qjX~P,2uOejX!VjX~P,2uOs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O~PBXOe$TO%Y*YO)P:yO~Oe$TO%Y*YO)P:zO~Oe$TO%Y*YO)P;PO~Oe$TO%Y*YO)P;QO~O]%jOe!POm%dOs!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O!V%mO!{!dO!|%TO%v$oO(x$zO)Z;kO)];lO)^;lO~O]%jOe!POm%dO!V%mO!{!dO%v$oO(x$zO)Z;kO)];lO)^;lO~Oe$TO%Y$UO)P:zO~Oe$TO%Y$UO)P;OO~Om;TO~Om;SO~O]dXmhXqjX!TdX~Oe)tO%Y*YO)P:yO~Oe)tO%Y*YO)P:zO~Oe)tO%Y*YO)P:{O~Oe)tO%Y*YO)P:|O~Oe)tO%Y*YO)P:}O~Oe)tO%Y*YO)P;PO~Oe)tO%Y*YO)P;QO~Os!^Ot!^Ou!^Ov!^Ow!^Ox!^Oy!^Oz!^O~P,8VO])TXs)TXt)TXu)TXv)TXw)TXx)TXy)TXz)TX!O)TX!r)TX!s)TX!t)TX!u)TX!v)TX!x)TX!{)TX%v)TX&r)TX&s)TX(x)TX)Z)TX)])TX)^)TX)q)TX~Om;SO!T)TX(|)TX)`)TX~P,<UO]&wXmnXqoX!T&wX~Oe4uO%Y*YO)P<OO~Om;fO)Z<SO)]5kO)^5kO~P(FnOe!POm%dO!{!dO%v$oO(x$zO~O]1[O!V1YO)Z1SO)]<TO)^<TOQ#nX!d#nX!h#nX[#nX~P,?QO)Z;dO~Om;rO~Om;sO~Om;tO~Om;vO~Om;wO~Om;xO~Om;vO!T$YOQ)TX!d)TX!h)TX)a)TX[)TX)q)TX~P$GhOm;tO!T$YO~P$GhOm;rO!g$[O)q$[O~Om;tO!g$[O)q$[O~Om;vO!g$[O)q$[O~Om;sO[)TX!h)TX)a)TX)q)TX~P$GhOe/fO%Y*YO)P<OO~Om<PO~O)Z<dO~OV'e'h'i'g(v)c!R(xS(q%Z!Y!['je%[!i'R!f]'f*c'k(}!^!_'l'm'l~",
        goto: "%8g*cPPPPP*d*qP*tPP.jPP5P8Q8Q;[P;[>fP?P?c?wFpMq!&v!-_P!4Y!4}!5rP!6^PPPPPPPP!6wP!8aP!9r!;[P!;bPPPPPP!;eP!;ePP!;ePP!;qPPPPPP!=s!AZP!A^PP!Az!BoPPPPP!BsP?S!DUPP?S!F]!H^!Hl!JR!KrP!K}P!L^!L^# n#$}#&e#)q#,{!H^#-VPP!H^#-^#-d#-V#-V#-gP#-k#.Y#.Y#.Y#.Y!KrP#.s#/U#1kP#2PP#3lP#3p#3x#4m#4x#7W#7`#7`#3pP#3pP#7g#7mP#7wPP#8d#9R#9s#8dP#:e#:qP#8dP#8dPP#8d#8dP#8dP#8dP#8dP#8dP#8dP#8dP#:t#7w#;bP#;wP#<^#<^#<^#<^#<k#3pP#=R#BO#BmPPPPPPPP#CeP#CsP#CsP#DP#G^#;mPP#Cm#GpP#HT#H`#Hf#Hf#Cm#I[P#3p#3p#3p#3p#3pP!L^#Iv#I}#I}#I}#JR# h#J]# h#Ja!Hl!Hl!Hl#Jd#N|!Hl?S?S?S$%u!Bo!Bo!Bo!Bo!Bo!Bo!6w!6w!6w$&YP$'u$(T!6w$(ZPP!6w$*i$*l#C[$*o;[8Q$-u$/p$1a$3P8QPP8Q$4s8QP8Q8QP8QP$7y8QP8QPP8Q$8VPPPPPPPPP*qP$;_$;e$;k$>S$@Y$@`$@v$AQ$A]$Al$Ar$CQ$DP$DW$D_$De$Dm$Dw$D}$EY$E`$Ei$Eq$E|$FS$F^$Fd$Fn$Ft$F{$G[$Gb$GhP$Gn$Gv$G}$H]$Iy$JP$JV$J^$JjPPPPPPPPPPPP$Jp$JtPPPPP%#v$*i%#y%'R%)ZPP%)h%)kPPPPPPPPPP%)w%*z%+Q%+U%,{%.Y%.{%/S%1c%1iPPP%1s%2O%2R%2X%3`%3c%3m%3w%3{%5P%5r%5x#CeP%6c%6i%6y%6|%7^%7j%7n%7t%7z$*i$*l$*l%7}%8QP%8a%8dQ#dPa(s#b(p(q(r(t/]/_4rR#dP'`mO[aefwx{!W!X!g!k!n!r!s!v!x#X#Y#[#h#k#n#s#t#u#v#w#x#y#z#{#|#}$P$W$Y$[$g$h$m%_%o&S&U&Y&d&h&z&{'O'Q'R'e'l'm'|(c(e(l)q)w*m*n*q*v*w*{+]+_+m+o+p,U,W,s,v,|-d-e-h-n.W.X.]/U/X/d/k/t/v/{/}0p1T1Y1i1j1t1x2S2U2k2n2q3P3U3X3s4Y4]4b4k5d5o5{6i6m6p6r6t7O7Q7V7l7t7w8o8q8w8}9O9]9a9g9i9v9y9z:V:Y:`:b:g:l:pU%qm%r7[Q&o!`Q(p#^d0X*S0U0V0W0Z5X5Y5Z5^8[R7[3_b}Oaewx{!g&U*v&v$k[!W!X!k!n!r!s!v!x#X#Y#[#h#k#n#s#t#u#v#w#x#y#z#{#|#}$P$W$Y$[$g$h$m%_%o&S&Y&d&h&z&{'O'Q'R'e'l'm'|(c(e(l)q)w*m*n*q*w*{+]+_+m+o+p,U,W,s,v,|-d-e-h-n.W.X.]/U/X/d/k/t/v/{/}1T1i1j1t1x2S2U2k2n2q3P3U3X3s4Y4]4b4k5d5o5{6i6m6p6r6t7O7Q7V7l7t7w8o8q8w8}9O9]9a9g9i9v9y9z:V:Y:`:b:g:l:pS%bf0p#d%lgnp|#O$i%O%P%U%f%j%k%y&u'w'x(T*_*e*g*y+b,q,{-f-w.O.m.t.v0e1R1S1W1[2g2r5k6q;b;c;d;j;k;l;y;z;{;|<Q<R<S<T<b<c<dS%sm!YS&w!h#PS'^!t'aQ'j!yQ'k!zQ(p#aQ(q#^Q(r#_Q*}%mQ,]&nQ,b&pQ-k'iQ-r'tS.y(^4cQ/n)lQ0m*rQ2Y,aQ2a,hQ2t-UQ3Y-lQ4l/TQ4p/^Q5p1VQ6f2]Q7X3ZQ8k6eQ9o8UR;e1Y$|#iS!]${%S%V%]&l&m'S'Z']'d'f(d(h(k(|(})W)X)Y)Z)[)])^)_)`)a)b)c)d)p)v)}+^+l,T,X,o,z-o-p.T/Q/x0h0j0o0q1P1h2R2i2p3]3m3n4m4n4t4w4}5P5T5U5n5z6R6`6o6s6}7U7{7|8O8^8_8m8p8t8|9_9f9u9{:W:_:d:j:sQ&r!dQ(j#ZQ(x#cQ)o$V[*x%g*]0s2h2o3VQ,c&qQ/V(iQ/](qQ/c(yS/q)n/WQ0z+VS4{/r/sR8Y4|'a![O[aefwx{!W!X!g!k!n!r!s!v!x#X#Y#[#h#k#n#s#t#u#v#w#x#y#z#{#|#}$P$W$Y$[$g$h$m%_%o&S&U&Y&d&h&z&{'O'Q'R'e'l'm'|(c(e(l)q)w*m*n*q*v*w*{+]+_+m+o+p,U,W,s,v,|-d-e-h-n.W.X.]/U/X/d/k/t/v/{/}0p1T1Y1i1j1t1x2S2U2k2n2q3P3U3X3s4Y4]4b4k5d5o5{6i6m6p6r6t7O7Q7V7l7t7w8o8q8w8}9O9]9a9g9i9v9y9z:V:Y:`:b:g:l:p'a!VO[aefwx{!W!X!g!k!n!r!s!v!x#X#Y#[#h#k#n#s#t#u#v#w#x#y#z#{#|#}$P$W$Y$[$g$h$m%_%o&S&U&Y&d&h&z&{'O'Q'R'e'l'm'|(c(e(l)q)w*m*n*q*v*w*{+]+_+m+o+p,U,W,s,v,|-d-e-h-n.W.X.]/U/X/d/k/t/v/{/}0p1T1Y1i1j1t1x2S2U2k2n2q3P3U3X3s4Y4]4b4k5d5o5{6i6m6p6r6t7O7Q7V7l7t7w8o8q8w8}9O9]9a9g9i9v9y9z:V:Y:`:b:g:l:pQ)T#mS+V%{0{Q/z)xk4X.n3}4R4U4V7m7o7p7r7u9c9d:]Q)V#mk4W.n3}4R4U4V7m7o7p7r7u9c9d:]l)U#m.n3}4R4U4V7m7o7p7r7u9c9d:]T+V%{0{[UOwx!g&U*vW$b[e$g(e#l$r_!f!u!}#R#S#T#U#V#Z$U$V$n%W&W&[&e&o'b(Q(S(X(a(j)o)u+a+f+g+y,O,^,p-P-X-v-{._.`.f.g.k.x.|1]1a1n1s1u2v3f3g3h3z4O5t6X6Z7f8e![%eg$i%f%k&u*_*y+b,q,{-f1S1W2g;b;c;d;k;l;y;z;{;|<Q<R<T<b<c<dY%unp%y-w.ml)R#m.n3}4R4U4V7m7o7p7r7u9c9d:]S;o'w.OU;p(T.t.v&|<Vaf{|!W!X!k!n!r!s!v!x#X#Y#[#h#k#n#s#t#u#v#w#x#y#z#{#|#}$P$W$Y$[$h$m%O%P%U%_%j%o&S&Y&d&{'O'Q'l'm'x'|(c(l)q)w*e*g*m*n*q*w+]+_+m+o+p,U,W,s,v-n.W.X.]/U/X/d/k/t/v/{/}0e0p1R1T1Y1i1j1t1x2S2k2q2r3P4Y4]4b4k5d5k5o5{6i6m6p6q6r6t7O7Q7V7l7t7w8o8q8w8}9O9]9a9g9i9v9y9z:V:Y:`:b:g:l:p;j<SQ<W1[d<X&z'R'e,|-d-e-h2n3U3XW<Y&h*{2U3s^<Z!t'a'i,a-U2]6eQ<[#OT<g%{0{[VOwx!g&U*vW$c[e$g(eQ$r.|!j$s_!f!u!}#V#Z$U$V$n%W&W&[&e&o'b(j)o)u+a+f+y,^,p-P-X-v.k1]1a1n1s1u2v4O5t8e&^$|af{!W!X!k!n!r!s!v!x#X#Y#[#h#k#n#s#t#u#v#w#x#y#z#{#|#}$P$W$Y$[$h$m%_%o&S&Y&d&{'O'Q'l'm'|(c(l)q)w*m*n*q*w+]+_+m+o+p,U,W,s,v-n.W.X.]/U/X/d/k/t/v/{/}0p1T1Y1i1j1t1x2S2k2q3P4Y4]4b4k5d5o5{6i6m6p6r6t7O7Q7V7l7t7w8o8q8w8}9O9]9a9g9i9v9y9z:V:Y:`:b:g:l:p![%eg$i%f%k&u*_*y+b,q,{-f1S1W2g;b;c;d;k;l;y;z;{;|<Q<R<T<b<c<dY%unp%y-w.mQ'u#O|(P#R#S#T#U(Q(S(X(a+g,O._.`.f.g.x3f3g3h3z6X6Z7fl)R#m.n3}4R4U4V7m7o7p7r7u9c9d:]S-u'w.OQ3b-{U;}(T.t.vn<V|%O%P%U%j'x*e*g0e1R2r5k6q;j<S^<Z!t'a'i,a-U2]6eW<]&h*{2U3sd<^&z'R'e,|-d-e-h2n3U3XQ<e1[T<g%{0{!Q!UO[ewx!g$g&U&h&z'R'e(e*v*{,|-d-e-h2U2n3U3X3s!v$v_!f!u!}#O#V#Z$U$V$n%W&W&[&e&o'b'w(T(j)o)u+a+y,^,p-P-X-v.O.k.t.v1[1]1a1n1s1u2v4O5t8e&^%Raf{!W!X!k!n!r!s!v!x#X#Y#[#h#k#n#s#t#u#v#w#x#y#z#{#|#}$P$W$Y$[$h$m%_%o&S&Y&d&{'O'Q'l'm'|(c(l)q)w*m*n*q*w+]+_+m+o+p,U,W,s,v-n.W.X.]/U/X/d/k/t/v/{/}0p1T1Y1i1j1t1x2S2k2q3P4Y4]4b4k5d5o5{6i6m6p6r6t7O7Q7V7l7t7w8o8q8w8}9O9]9a9g9i9v9y9z:V:Y:`:b:g:l:p$S%ngnp|#m$i%O%P%U%f%j%k%y%{&u'a'i'x*_*e*g*y+b,a,q,{-U-f-w.m.n0e0{1R1S1W2]2g2r3}4R4U4V5k6e6q7m7o7p7r7u9c9d:];b;c;d;j;k;l;y;z;{;|<Q<R<S<T<b<c<dQ'_!tz(R#R#S#T#U(Q(S(X(a,O._.`.f.g.x3f3g3h3z6X6Z7ff-b'c-[-^-a2z2{2}3Q6{6|8zQ1`+fQ1c+gQ2s-OQ3c-{Q4f.|Q5v1bR8a5w!Q!UO[ewx!g$g&U&h&z'R'e(e*v*{,|-d-e-h2U2n3U3X3s!x$v_!f!u!}#O#V#Z$U$V$n%W&W&[&e&o'b'w(T(j)o)u+a+f+y,^,p-P-X-v.O.k.t.v1[1]1a1n1s1u2v4O5t8e&^%Raf{!W!X!k!n!r!s!v!x#X#Y#[#h#k#n#s#t#u#v#w#x#y#z#{#|#}$P$W$Y$[$h$m%_%o&S&Y&d&{'O'Q'l'm'|(c(l)q)w*m*n*q*w+]+_+m+o+p,U,W,s,v-n.W.X.]/U/X/d/k/t/v/{/}0p1T1Y1i1j1t1x2S2k2q3P4Y4]4b4k5d5o5{6i6m6p6r6t7O7Q7V7l7t7w8o8q8w8}9O9]9a9g9i9v9y9z:V:Y:`:b:g:l:p$U%ngnp|!t#m$i%O%P%U%f%j%k%y%{&u'a'i'x*_*e*g*y+b,a,q,{-U-f-w.m.n0e0{1R1S1W2]2g2r3}4R4U4V5k6e6q7m7o7p7r7u9c9d:];b;c;d;j;k;l;y;z;{;|<Q<R<S<T<b<c<d|(R#R#S#T#U(Q(S(X(a+g,O._.`.f.g.x3f3g3h3z6X6Z7fQ3c-{R4f.|[WOwx!g&U*vW$d[e$g(e#l$r_!f!u!}#R#S#T#U#V#Z$U$V$n%W&W&[&e&o'b(Q(S(X(a(j)o)u+a+f+g+y,O,^,p-P-X-v-{._.`.f.g.k.x.|1]1a1n1s1u2v3f3g3h3z4O5t6X6Z7f8e![%eg$i%f%k&u*_*y+b,q,{-f1S1W2g;b;c;d;k;l;y;z;{;|<Q<R<T<b<c<dY%unp%y-w.ml)R#m.n3}4R4U4V7m7o7p7r7u9c9d:]S;o'w.OU;p(T.t.vn<V|%O%P%U%j'x*e*g0e1R2r5k6q;j<SQ<W1[^<Z!t'a'i,a-U2]6eQ<[#O&^<_af{!W!X!k!n!r!s!v!x#X#Y#[#h#k#n#s#t#u#v#w#x#y#z#{#|#}$P$W$Y$[$h$m%_%o&S&Y&d&{'O'Q'l'm'|(c(l)q)w*m*n*q*w+]+_+m+o+p,U,W,s,v-n.W.X.]/U/X/d/k/t/v/{/}0p1T1Y1i1j1t1x2S2k2q3P4Y4]4b4k5d5o5{6i6m6p6r6t7O7Q7V7l7t7w8o8q8w8}9O9]9a9g9i9v9y9z:V:Y:`:b:g:l:pd<`&z'R'e,|-d-e-h2n3U3XW<a&h*{2U3sT<g%{0{p$RT$a$q%d%t)Q;U;V;W;f;g;h;i;m;n<fo)r$X*Z*a/g;R;S;T;r;s;t;u;v;w;x<Pp$ST$a$q%d%t)Q;U;V;W;f;g;h;i;m;n<fo)s$X*Z*a/g;R;S;T;r;s;t;u;v;w;x<P^&g}!O$k$l%b%l;ed&k!U$v%R%n'_(R1`1c3c4fV/i)T)U4XS%[e$gQ,Y&hQ/S(eQ2w-XQ6T1uQ6a2UQ6w2vR9r8e#}!TO[_ewx!f!g!u!}#O#V#Z$U$V$g$n%W&U&W&[&e&h&o&z'R'b'e'w(T(e(j)o)u*v*{+a+f+y,^,p,|-P-X-d-e-h-v-{.O.k.t.v1[1]1a1n1s1u2U2n2v3U3X3s4O5t8e#[^O[_`wx!f!g!}#O$U$f$n$u$w&U&W&[&e&o&t&z'R'e'w(T)u*b*v*{+a,^,p,|-P-d-e-h-v-{.O.k.t.v1[1]1n2n3U3X3s4O_(X#R#S#T+g3f3g3h#}ZO[wx!g!k#R#S#T%o&U&W&[&e&o&y&z&{'O'Q'R'_'e'w'{(Q(S(T(X*v*{+a+g,^,m,p,v-W-d-e-h-v-{.O.R.f.k.t.x1[1]1n2k2s3U3X3f3g3h3s6m6t8q9v9z:b:g:pQ$_YR0]*TR*V$_e0X*S0U0V0W0Z5X5Y5Z5^8[$f#{S%V%]'S'Z']'d'f(k(|(})W)Z)[)])^)_)`)c)d)p)v)}+^+l,T,X,o,z-o-p.T/Q/x0h0j0o0q1P1h2R2i2p3]3m3n4m4n4t4w4}5P5T5U5n5z6R6`6o6s6}7U7{7|8O8^8_8m8p8t8|9_9f9u9{:W:_:d:j:se0X*S0U0V0W0Z5X5Y5Z5^8['`!YO[aefwx{!W!X!g!k!n!r!s!v!x#X#Y#[#h#k#n#s#t#u#v#w#x#y#z#{#|#}$P$W$Y$[$g$h$m%_%o&S&U&Y&d&h&z&{'O'Q'R'e'l'm'|(c(e(l)q)w*m*n*q*v*w*{+]+_+m+o+p,U,W,s,v,|-d-e-h-n.W.X.]/U/X/d/k/t/v/{/}0p1T1Y1i1j1t1x2S2U2k2n2q3P3U3X3s4Y4]4b4k5d5o5{6i6m6p6r6t7O7Q7V7l7t7w8o8q8w8}9O9]9a9g9i9v9y9z:V:Y:`:b:g:l:pe0X*S0U0V0W0Z5X5Y5Z5^8[R5_0]^(W#R#S#T+g3f3g3hY.d(Q(U(X(Y7_U3u.b.e.xS7c3v4aR9m7}^(V#R#S#T+g3f3g3h[.c(Q(U(W(X(Y7_W3t.b.d.e.xU7b3u3v4aS9U7c7}R:a9mT.r(T.td]Owx!g&U'w(T*v.O.t!v^[_`!f!}#O$U$f$n$u$w&W&[&e&o&t&z'R'e)u*b*{+a,^,p,|-P-d-e-h-v-{.k.v1[1]1n2n3U3X3s4OQ%vnT1},S2O!jbOaenpwx{|!g#O%O%P%U%j%y&U'w'x(T*e*g*v-w.O.m.t.v0e1R1[2r5k6q;j<Sf-_'c-[-^-a2z2{2}3Q6{6|8zj4S.n3}4R4U4V7m7o7p7r7u9c9d:]r<Ug$i%f%k&u*_*y,q,{-f2g;b;c;d;y;{<Qi<h+b1S1W;k;l;z;|<R<T<b<c<d!O&`y%Z&X&[&]'n)m*i*k+b+j+}/u0f1R1S1W1[1r5k6Q<S<Tz&cz%Q%Y%g&f'v*]*d,g.P0c0d0s1U2h2o3V5a5l6v8sS(O#Q.`n+q&Z*l+k+r+u-q/p0g1Z1f5O5b5j6P8cQ2`,f^3O-`2|3S6z7R8y9}e7s4T7i7q7y7z9`9b9j:[:mS+c&W1]Y+s&[&e*{1[3sR5}1n#w!POaegnpwx{|!g#O$i%O%P%U%f%j%k%y&U&u'w'x(T*_*e*g*v*y+b,q,{-f-w.O.m.t.v0e1R1S1W1[2g2r5k6q;b;c;d;j;k;l;y;z;{;|<Q<R<S<T<b<c<d`oOwx!g&U'w*v.O#U!Paeg{|#O$i%O%P%U%f%j%k&u'x*_*e*g*y+b,q,{-f0e1R1S1W1[2g2r5k6q;b;c;d;j;k;l;y;z;{;|<Q<R<S<T<b<c<dU%xnp-wQ+S%yS.l(T.tT4Q.m.vW+w&`+q+x1kV,P&c,Q7sQ+}&bU,P&c,Q7sQ.O'wT.Z'|.]'`![O[aefwx{!W!X!g!k!n!r!s!v!x#X#Y#[#h#k#n#s#t#u#v#w#x#y#z#{#|#}$P$W$Y$[$g$h$m%_%o&S&U&Y&d&h&z&{'O'Q'R'e'l'm'|(c(e(l)q)w*m*n*q*v*w*{+]+_+m+o+p,U,W,s,v,|-d-e-h-n.W.X.]/U/X/d/k/t/v/{/}0p1T1Y1i1j1t1x2S2U2k2n2q3P3U3X3s4Y4]4b4k5d5o5{6i6m6p6r6t7O7Q7V7l7t7w8o8q8w8}9O9]9a9g9i9v9y9z:V:Y:`:b:g:l:pX1z,O.`6X6Z'W!VO[aefwx{!W!X!g!k!n!r!s!v!x#X#Y#[#h#k#n#s#t#u#v#w#x#y#z#{#|$P$W$Y$[$g$h$m%_%o&S&U&Y&d&h&z&{'O'Q'R'e'l'm'|(c(e(l)q)w*m*n*q*v*w*{+]+_+m+o+p,U,W,s,v,|-d-e-h-n.W.X.]/U/d/k/v/{/}0p1T1Y1i1j1t1x2S2U2k2n2q3P3U3X3s4Y4]4b5d5o5{6i6m6p6r6t7O7Q7V7l7t7w8o8q8w8}9O9]9a9g9i9v9y9z:V:Y:`:b:g:l:pW1z,O.`6X6ZR2m,x!WjO[wx!g!k%o&U&{'O'Q'e*v,v-d-e-h2k3U6m6t8q9v9z:b:g:pY%Xe$g(e1x3sQ'U!nS)O#k5dQ,r&zQ,}'RS.V'|.]Q2j,sQ6u2qQ7W3XQ8r6pR9w8o'W![O[aefwx{!W!X!g!k!n!r!s!v!x#X#Y#[#h#k#n#s#t#u#v#w#x#y#z#{#|$P$W$Y$[$g$h$m%_%o&S&U&Y&d&h&z&{'O'Q'R'e'l'm'|(c(e(l)q)w*m*n*q*v*w*{+]+_+m+o+p,U,W,s,v,|-d-e-h-n.W.X.]/U/d/k/v/{/}0p1T1Y1i1j1t1x2S2U2k2n2q3P3U3X3s4Y4]4b5d5o5{6i6m6p6r6t7O7Q7V7l7t7w8o8q8w8}9O9]9a9g9i9v9y9z:V:Y:`:b:g:l:pX1z,O.`6X6Z'ayO[aefwx{!W!X!g!k!n!r!s!v!x#X#Y#[#h#k#n#s#t#u#v#w#x#y#z#{#|$P$W$Y$[$g$h$m%_%o&S&U&Y&d&h&z&{'O'Q'R'e'l'm'|(c(e(l)q)w*m*n*q*v*w*{+]+_+m+o+p,O,U,W,s,v,|-d-e-h-n.W.X.].`/U/d/k/v/{/}0p1T1Y1i1j1t1x2S2U2k2n2q3P3U3X3s4Y4]4b5d5o5{6X6Z6i6m6p6r6t7O7Q7V7l7t7w8o8q8w8}9O9]9a9g9i9v9y9z:V:Y:`:b:g:l:pQ&byS'w#O-|R1d+hS+c&W1]R5x1dQ1X+bR5q1WR1X+bT+c&W1]z&^%Z&X&[&]'n)m*i*k+b+j/u0f1R1S1W1[1r5k6Q<S<TQ&_yR1v+}!P&^y%Z&X&[&]'n)m*i*k+b+j+}/u0f1R1S1W1[1r5k6Q<S<TQ+z&`S,R&c7sS1l+q+xQ1|,QR5|1k!WkO[wx!g!k%o&U&{'O'Q'e*v,v-d-e-h2k3U6m6t8q9v9z:b:g:pS%|o.lS&Qq-yQ&ayQ&s!eQ'h!yQ*u%gU+Q%x%}4QS+U%z&PQ+v&_Q,_&oS,`&p'jQ,w&}S0a*],gS0w+R+SQ0y+TQ1w+}S2[,b-mQ5`0cQ5e0xQ6V1vQ6d2ZQ6g2`Q7x4TQ9^7iR:Z9`[uOwx!g&U*vQ,_&oQ-}'wQ3d-{R3i.OxlOwx!g!k%o&U&{'Q*v,v2k6m6t8q9v9z:b:g:pU$j['O-eS%|o.lS&Qq-yQ*u%gU+Q%x%}4QS+U%z&PS0a*],gS0w+R+SQ0y+TQ5`0cQ5e0xQ7x4TQ9^7iR:Z9`T,d&s,e]uOwx!g&U*v[uOwx!g&U*vQ,_&oQ,s&zQ,|'RW-g'e-d-h3UQ-}'wQ3d-{Q3i.OR7V3X[%hg$i,q,{-f2gR0t*y^$ZV!U$c$|%R<]<^Q'U!nS)e$P*{S){$Y*vQ*O$[Y*x%g*]0s2o3VQ/V(iS/q)n/WS0i*m4kS0r*w6iQ0z+VQ4[.nQ4x/kS4{/r/sS5Q/v5dQ5V/}Q6j2hU7k3}4T4]Q8Y4|Q8u6rY9[7i7l7m7v7wQ9|8wW:U9Y9]9`9aQ:e9yU:k:V:X:YR:t:lS){$Y*vT5Q/v5dZ)y$Y)z*v/v5dQ&y!hR'{#PS,l&x'yQ2d,jR6h2cxlOwx!g!k%o&U&{'Q*v,v2k6m6t8q9v9z:b:g:pV$j['O-e!XkO[wx!g!k%o&U&{'O'Q'e*v,v-d-e-h2k3U6m6t8q9v9z:b:g:p!WhO[wx!g!k%o&U&{'O'Q'e*v,v-d-e-h2k3U6m6t8q9v9z:b:g:pR'Y!q!WkO[wx!g!k%o&U&{'O'Q'e*v,v-d-e-h2k3U6m6t8q9v9z:b:g:pR,s&zQ&{!iQ&}!jQ'Q!lR,v&|R,t&zxlOwx!g!k%o&U&{'Q*v,v2k6m6t8q9v9z:b:g:pX-g'e-d-h3U[uOwx!g&U*vQ-P'RQ-}'wS.r(T.tR3i.O[uOwx!g&U*vQ-P'RW-g'e-d-h3UT.r(T.tg-b'c-[-^-a2z2{2}3Q6{6|8zylOwx!g!k%o&U&{'Q*v,v2k6m6t8q9v9z:b:g:pb!OOaewx{!g&U*v&|$l[f!W!X!k!n!r!s!v!x#X#Y#[#h#k#n#s#t#u#v#w#x#y#z#{#|#}$P$W$Y$[$g$h$m%_%o&S&Y&d&h&z&{'O'Q'R'e'l'm'|(c(e(l)q)w*m*n*q*w*{+]+_+m+o+p,U,W,s,v,|-d-e-h-n.W.X.]/U/X/d/k/t/v/{/}0p1T1Y1i1j1t1x2S2U2k2n2q3P3U3X3s4Y4]4b4k5d5o5{6i6m6p6r6t7O7Q7V7l7t7w8o8q8w8}9O9]9a9g9i9v9y9z:V:Y:`:b:g:l:p#d%lgnp|#O$i%O%P%U%f%j%k%y&u'w'x(T*_*e*g*y+b,q,{-f-w.O.m.t.v0e1R1S1W1[2g2r5k6q;b;c;d;j;k;l;y;z;{;|<Q<R<S<T<b<c<dS'^!t'aQ-k'iQ2Y,aQ2t-UQ6f2]R8k6ej$TT$a%d%t;U;V;W;f;g;h;i;m;ni)t$X*Z;R;S;T;r;s;t;u;v;w;xj$TT$a%d%t;U;V;W;f;g;h;i;m;nh)t$X*Z;R;S;T;r;s;t;u;v;w;xS/f)Q<fV4u/g/h<P[uOwx!g&U*vQ-}'wR3i.O[uOwx!g&U*vT.r(T.t'`!YO[aefwx{!W!X!g!k!n!r!s!v!x#X#Y#[#h#k#n#s#t#u#v#w#x#y#z#{#|#}$P$W$Y$[$g$h$m%_%o&S&U&Y&d&h&z&{'O'Q'R'e'l'm'|(c(e(l)q)w*m*n*q*v*w*{+]+_+m+o+p,U,W,s,v,|-d-e-h-n.W.X.]/U/X/d/k/t/v/{/}0p1T1Y1i1j1t1x2S2U2k2n2q3P3U3X3s4Y4]4b4k5d5o5{6i6m6p6r6t7O7Q7V7l7t7w8o8q8w8}9O9]9a9g9i9v9y9z:V:Y:`:b:g:l:pR7]3_[uOwx!g&U*vQ-}'wS.r(T.tR3i.O[pOwx!g&U*vQ%ynS-w'w.OT.m(T.tS%}o.lS+R%x4QR0x+SQ+W%{R5g0{S%|o.lS&Qq-yU+Q%x%}4QS+U%z&PS0w+R+SQ0y+TQ5e0xQ7x4TQ9^7iR:Z9``qOwx!g&U(T*v.tS%zn-wU&Pp.m.vQ+T%yT-y'w.OS'}#Q.`R.a(OT.Y'|.]S.Z'|.]Q9S7`R:R9TT6X1y8iR6Z1y#d!Pgnp|#O$i%O%P%U%f%j%k%y&u'w'x(T*_*e*g*y+b,q,{-f-w.O.m.t.v0e1R1S1W1[2g2r5k6q;b;c;d;j;k;l;y;z;{;|<Q<R<S<T<b<c<db!QOaewx{!g&U*v&}![[f!W!X!k!n!r!s!v!x#X#Y#[#h#k#n#s#t#u#v#w#x#y#z#{#|#}$P$W$Y$[$g$h$m%_%o&S&Y&d&h&z&{'O'Q'R'e'l'm'|(c(e(l)q)w*m*n*q*w*{+]+_+m+o+p,U,W,s,v,|-d-e-h-n.W.X.]/U/X/d/k/t/v/{/}0p1T1Y1i1j1t1x2S2U2k2n2q3P3U3X3s4Y4]4b4k5d5o5{6i6m6p6r6t7O7Q7V7l7t7w8o8q8w8}9O9]9a9g9i9v9y9z:V:Y:`:b:g:l:p#d!Pgnp|#O$i%O%P%U%f%j%k%y&u'w'x(T*_*e*g*y+b,q,{-f-w.O.m.t.v0e1R1S1W1[2g2r5k6q;b;c;d;j;k;l;y;z;{;|<Q<R<S<T<b<c<db!QOaewx{!g&U*v&|![[f!W!X!k!n!r!s!v!x#X#Y#[#h#k#n#s#t#u#v#w#x#y#z#{#|#}$P$W$Y$[$g$h$m%_%o&S&Y&d&h&z&{'O'Q'R'e'l'm'|(c(e(l)q)w*m*n*q*w*{+]+_+m+o+p,U,W,s,v,|-d-e-h-n.W.X.]/U/X/d/k/t/v/{/}0p1T1Y1i1j1t1x2S2U2k2n2q3P3U3X3s4Y4]4b4k5d5o5{6i6m6p6r6t7O7Q7V7l7t7w8o8q8w8}9O9]9a9g9i9v9y9z:V:Y:`:b:g:l:pk4W.n3}4R4U4V7m7o7p7r7u9c9d:]Q4[.nS7k3}4TU9[7i7m7vS:U9Y9`R:k:X#|!TO[_ewx!f!g!u!}#O#V#Z$U$V$g$n%W&U&W&[&e&h&o&z'R'b'e'w(T(e(j)o)u*v*{+a+f+y,^,p,|-P-X-d-e-h-v-{.O.k.t.v1[1]1a1n1s1u2U2n2v3U3X3s4O5t8eR4g.|Q(`#US.}(_(aS4h/O/PR8R4iQ.z(^R8P4c#|!TO[_ewx!f!g!u!}#O#V#Z$U$V$g$n%W&U&W&[&e&h&o&z'R'b'e'w(T(e(j)o)u*v*{+a+f+y,^,p,|-P-X-d-e-h-v-{.O.k.t.v1[1]1a1n1s1u2U2n2v3U3X3s4O5t8ep$y`$f$u%Z&t'c(b(i)n*i-[/s1r5u6Q8`q)S#m%{.n0{3}4R4U4V7m7o7p7r7u9c9d:]R,Z&hR6b2U'X!VO[aefwx{!W!X!g!k!n!r!s!v!x#X#Y#[#h#k#n#s#t#u#v#w#x#y#z#{#|$P$W$Y$[$g$h$m%_%o&S&U&Y&d&h&z&{'O'Q'R'e'l'm'|(c(e(l)q)w*m*n*q*v*w*{+]+_+m+o+p,U,W,s,v,|-d-e-h-n.W.X.]/U/d/k/v/{/}0p1T1Y1i1j1t1x2S2U2k2n2q3P3U3X3s4Y4]4b5d5o5{6i6m6p6r6t7O7Q7V7l7t7w8o8q8w8}9O9]9a9g9i9v9y9z:V:Y:`:b:g:l:p$q#tS%V%]'S'Z']'d'f(d(h(k(|(})W)X)Z)[)])^)_)`)a)b)c)d)p)v)}+^+l,T,X,o,z-o-p.T/Q/x0h0j0o0q1P1h2R2i2p3]3m3n4m4n4t4w4}5P5T5U5n5z6R6`6o6s6}7U7{7|8O8^8_8m8p8t8|9_9f9u9{:W:_:d:j:s$]#uS%V%]'S'Z']'d'f(k(|(})W)[)c)d)p)v)}+^+l,T,X,o,z-o-p.T/Q/x0h0j0o0q1P1h2R2i2p3]3m3n4m4n4t4w4}5P5T5U5n5z6R6`6o6s6}7U7{7|8O8^8_8m8p8t8|9_9f9u9{:W:_:d:j:s$Z#vS%V%]'S'Z']'d'f(k(|(})W)c)d)p)v)}+^+l,T,X,o,z-o-p.T/Q/x0h0j0o0q1P1h2R2i2p3]3m3n4m4n4t4w4}5P5T5U5n5z6R6`6o6s6}7U7{7|8O8^8_8m8p8t8|9_9f9u9{:W:_:d:j:s$c#yS%V%]'S'Z']'d'f(k(|(})W)Z)[)])^)c)d)p)v)}+^+l,T,X,o,z-o-p.T/Q/x0h0j0o0q1P1h2R2i2p3]3m3n4m4n4t4w4}5P5T5U5n5z6R6`6o6s6}7U7{7|8O8^8_8m8p8t8|9_9f9u9{:W:_:d:j:s'X![O[aefwx{!W!X!g!k!n!r!s!v!x#X#Y#[#h#k#n#s#t#u#v#w#x#y#z#{#|$P$W$Y$[$g$h$m%_%o&S&U&Y&d&h&z&{'O'Q'R'e'l'm'|(c(e(l)q)w*m*n*q*v*w*{+]+_+m+o+p,U,W,s,v,|-d-e-h-n.W.X.]/U/d/k/v/{/}0p1T1Y1i1j1t1x2S2U2k2n2q3P3U3X3s4Y4]4b5d5o5{6i6m6p6r6t7O7Q7V7l7t7w8o8q8w8}9O9]9a9g9i9v9y9z:V:Y:`:b:g:l:pQ/W(iQ/r)nQ4|/sR9n8T']![O[aefwx{!W!X!g!k!n!r!s!v!x#X#Y#[#h#k#n#s#t#u#v#w#x#y#z#{#|$P$W$Y$[$g$h$m%_%o&S&U&Y&d&h&z&{'O'Q'R'e'l'm'|(c(e(l)q)w*m*n*q*v*w*{+]+_+m+o+p,U,W,s,v,|-d-e-h-n.W.X.]/U/X/d/k/t/v/{/}0p1T1Y1i1j1t1x2S2U2k2n2q3P3U3X3s4Y4]4b5d5o5{6i6m6p6r6t7O7Q7V7l7t7w8o8q8w8}9O9]9a9g9i9v9y9z:V:Y:`:b:g:l:pQ(n#]R/Y(nQ#fQR(z#fU%Oa;j<Sb%We$g&h(e-X1u2U2v8eQ'b!u!Q*c%O%W'b*e*k+m,U0e0f1j2z6{7O7o8z9c9g:];b;y;z<Q<R<bS*e%P%UQ*k%ZS+m&Y1YQ,U&dQ0e*gQ0f*iQ1j+pQ2z-^S6{2{2}Q7O3PQ7o4RQ8z6|S9c7p7rQ9g7tQ:]9dQ;b%fS;y;c;dS;z<c<dQ<Q;{Q<R;|T<b1S;k[[Owx!g&U*vl$e['O(Q+a,^,m,p-W-e-v.R.f.k.xl'O!k%o&{'Q,v2k6m6t8q9v9z:b:g:p^(Q#R#S#T+g3f3g3h`+a&W&[&e*{1[1]1n3sS,^&o-{Q,m&yU,p&z'R3XS-W'_2sW-e'e-d-h3US-v'w.OQ.R'{Q.f(SS.k(T.tR.x(XQ*R$^R0Q*RQ0Z*SQ5X0UQ5Y0VQ5Z0WY5[0Z5X5Y5Z8[R8[5^Q*U$_S0^*U0_R0_*VS.g(S.fS3x.g7fR7f3zQ3{.hS7d3y3|U7h3{7d9VR9V7eQ.t(TR4^.t!|_O[wx!f!g!}#O$U$n&U&W&[&e&o&z'R'e'w(T)u*v*{+a,^,p,|-P-d-e-h-v-{.O.k.t.v1[1]1n2n3U3X3s4OU$t_$w*bU$w`$f&tR*b$uU%Pa;j<Sd*f%P*g2{6|7p9d;c;{;|<cQ*g%UQ2{-^Q6|2}Q7p4RQ9d7rQ;c%fQ;{;dQ;|<dT<c1S;kS,Q&c7sR1{,QS*o%]/xR0k*oQ1^+dR5s1^U+j&X1S<SR1e+jQ+x&`Q1k+qT1q+x1kQ8f6TR9s8fQwOS&Tw&UT&Ux*vQ,e&sR2_,eW)z$Y*v/v5dR/|)zU/w)v){0oR5R/w[*z%g%h*]2h2o3VR0u*zQ,i&wR2b,iQ-h'eQ3U-dT3W-h3UQ3R-`R7S3RQ-m'jQ2Z,bT3[-m2ZQ-V'^R2u-VS%rm7[R+P%rdnOwx!g&U'w(T*v.O.tR%wnQ0|+WR5h0|Q.]'|R3p.]Q2O,SR6[2OU*s%b*};eR0n*sS1o+s0vR6O1oQ7v4TQ9Y7iU9k7v9Y:XR:X9`$O!SO[_ewx!f!g!u!}#O#V#Z$U$V$g$n%W&U&W&[&e&h&o&z'R'b'e'w(T(e(j)o)u*v*{+a+f+y,^,p,|-P-X-d-e-h-v-{.O.k.t.v.|1[1]1a1n1s1u2U2n2v3U3X3s4O5t8eR&i!SQ4d.zR8Q4dQ2V,ZR6c2VS/l)d)eR4y/l^(t#b(p(q(r/]/_4rR/`(tQ8V4pR9p8VT)f$P*{!USO[wx!g!k%o&U&{'O'Q'e,v-d-e-h2k3U6m6t8q9v9z:b:g:pj${a{$m%_+o,W1i2S5{7Q8}9i:`Y%Ve$g(e1x3sY%]f$h(l)q*qQ&l!WQ&m!XQ'S!nQ'Z!rQ']!sQ'd!vQ'f!xQ(d#XQ(h#YS(k#[+_Q(|#hQ(}#kQ)W#nQ)X#sQ)Y#tQ)Z#uQ)[#vQ)]#wQ)^#xQ)_#yQ)`#zQ)a#{Q)b#|Q)c#}S)d$P*{Q)p$WQ)v$YQ)}$[Q+^&SS+l&Y1YQ,T&dQ,X&hQ,o&zQ,z'RQ-o'lQ-p'mS.T'|.]Q/Q(cS/x)w0pS0h*m4kQ0j*nQ0o*vQ0q*wQ1P+]S1h+m+pQ2R,UQ2i,sS2p,|7VQ3]-nQ3m.WQ3n.XQ4m/UQ4n/XQ4t/dQ4w/kQ4}/tQ5P/vQ5T/{Q5U/}Q5n1TQ5z1jQ6R1tQ6`2US6o2n9OQ6s2qQ6}3PQ7U3XQ7{4YQ7|4]Q8O4bQ8^5dQ8_5oQ8m6iQ8p6pQ8t6rQ8|7OS9_7l7wQ9f7tQ9u8oQ9{8wS:W9]9aQ:_9gQ:d9yS:j:V:YR:s:lR,[&hd]Owx!g&U'w(T*v.O.t!v^[_`!f!}#O$U$f$n$u$w&W&[&e&o&t&z'R'e)u*b*{+a,^,p,|-P-d-e-h-v-{.k.v1[1]1n2n3U3X3s4O#r$}ae!u$g%O%P%U%W%Z%f&Y&d&h'b(e*e*g*i*k+m+p,U-X-^0e0f1Y1j1u2U2v2z2{2}3P4R6{6|7O7o7p7r7t8e8z9c9d9g:];b;c;d;j;k;y;z;{;|<Q<R<b<c<dQ%vnS+i&X+jW+w&`+q+x1kU,P&c,Q7sQ1s+yT5m1S<S``Owx!g&U'w*v.OS$f[-vQ$u_b%Ze$g&h(e-X1u2U2v8e!h&t!f!}#O$U$n&W&[&e&o&z'R'e(T)u*{+a,^,p,|-P-d-e-h-{.k.t.v1[1]1n2n3U3X3s4OQ'c!uS(b#V+fQ(i#ZS)n$V(jQ*i%WQ-['bQ/s)oQ1r+yQ5u1aQ6Q1sR8`5tS(Z#R3gS([#S3hV(]#T+g3fR$`Ye0Y*S0U0V0W0Z5X5Y5Z5^8[W(U#R#S#T+gQ(_#US.b(Q(XS.h(S.fQ/P(aW1z,O.`6X6ZQ3e-{Q3r._Q3y.gQ4a.xU7_3f3g3hQ7g3zR9W7fQ.i(SR3w.fT.s(T.tdgOwx!g&U&o'w*v-{.OU$i[,^-vQ&u!fQ'n!}Q'x#OQ)m$UQ*_$n`+b&W&[&e*{1[1]1n3sQ,q&zQ,{'RY-f'e-d-h3U3XS.n(T.tQ/u)uQ1R+aS2g,p-eS2r,|-PS3}.k.vQ6q2nR7m4Od]Owx!g&U'w(T*v.O.t!v^[_`!f!}#O$U$f$n$u$w&W&[&e&o&t&z'R'e)u*b*{+a,^,p,|-P-d-e-h-v-{.k.v1[1]1n2n3U3X3s4OR%vnQ4T.nQ7i3}Q7q4RQ7y4UQ7z4VQ9`7mU9b7o7p7rQ9j7uS:[9c9dR:m:]Z+t&[&e*{1[3spzOnpwx!g%y&U'w(T*v-w.O.m.t.v[%Qa%f1S;j;k<SU%Ye%j1[Q%gg^&f{|%k1W5k;l<TQ'v#OQ*]$ib*d%O%P%U;b;c;d<b<c<dQ,g&uQ.P'xQ0c*_[0d*e*g;y;z;{;|Q0s*yQ1U+bQ2h,qQ2o,{S3V-f2gU5a0e<Q<RQ5l1RQ6v2rR8s6qQ,S&cR9e7sS1y,O.`Q8h6XR8i6Z[%`f$h(l)q)w0pR0l*qR+e&WQ+d&WR5r1]S&Zy+}Q*l%ZU+k&X1S<SS+r&[1[W+u&]1W5k<TQ-q'nQ/p)mS0g*i*kQ1Z+bQ1f+jQ5O/uQ5b0fQ5j1RQ6P1rR8c6QR6U1uYvOwx&U*vR&v!gW%ig,q,{-fT*^$i2gT)|$Y*v[uOwx!g&U*vQ'P!kQ+O%oQ,u&{Q,y'QQ2l,vQ6l2kQ8n6mQ8v6tQ9x8qQ:c9vQ:f9zQ:o:bQ:q:gR:u:pxlOwx!g!k%o&U&{'Q*v,v2k6m6t8q9v9z:b:g:pU$j['O-eX-g'e-d-h3UQ-c'cR2y-[S-`'c-[Q2|-^Q3S-aU6z2z2{2}Q7R3QS8y6{6|R9}8zQ'`!tR-Z'a[rOwx!g&U*vS-x'w.OT.o(T.tR+X%{[sOwx!g&U*vS-z'w.OT.p(T.t[tOwx!g&U*vT.q(T.tT.['|.]X%cf%m0p1YQ/O(_R4i/PR.{(^R(g#XQ(w#bU/[(p(q(rS4o/]/_R8X4rR/_(rR4q/^",
        nodeNames: "\u26A0 RawString > MacroName LineComment BlockComment PreprocDirective #include String EscapeSequence SystemLibString Identifier ) ( ArgumentList ConditionalExpression AssignmentExpression CallExpression PrimitiveType FieldExpression FieldIdentifier DestructorName TemplateMethod ScopedFieldIdentifier NamespaceIdentifier TemplateType TypeIdentifier ScopedTypeIdentifier ScopedNamespaceIdentifier :: NamespaceIdentifier TypeIdentifier TemplateArgumentList < TypeDescriptor const volatile restrict _Atomic mutable constexpr constinit consteval StructSpecifier struct MsDeclspecModifier __declspec Attribute AttributeName Identifier AttributeArgs { } [ ] UpdateOp ArithOp ArithOp ArithOp LogicOp BitOp BitOp BitOp CompareOp CompareOp CompareOp > CompareOp BitOp UpdateOp , Number CharLiteral AttributeArgs VirtualSpecifier BaseClassClause Access virtual FieldDeclarationList FieldDeclaration extern static register inline thread_local AttributeSpecifier __attribute__ PointerDeclarator MsBasedModifier __based MsPointerModifier FunctionDeclarator ParameterList ParameterDeclaration PointerDeclarator FunctionDeclarator Noexcept noexcept RequiresClause requires True False ParenthesizedExpression CommaExpression LambdaExpression LambdaCaptureSpecifier TemplateParameterList OptionalParameterDeclaration TypeParameterDeclaration typename class VariadicParameterDeclaration VariadicDeclarator ReferenceDeclarator OptionalTypeParameterDeclaration VariadicTypeParameterDeclaration TemplateTemplateParameterDeclaration template AbstractFunctionDeclarator AbstractPointerDeclarator AbstractArrayDeclarator AbstractParenthesizedDeclarator AbstractReferenceDeclarator ThrowSpecifier throw TrailingReturnType CompoundStatement FunctionDefinition MsCallModifier TryStatement try CatchClause catch LinkageSpecification Declaration InitDeclarator InitializerList InitializerPair SubscriptDesignator FieldDesignator ExportDeclaration export ImportDeclaration import ModuleName PartitionName HeaderName CaseStatement case default LabeledStatement StatementIdentifier ExpressionStatement IfStatement if ConditionClause Declaration else SwitchStatement switch DoStatement do while WhileStatement ForStatement for ReturnStatement return BreakStatement break ContinueStatement continue GotoStatement goto CoReturnStatement co_return CoYieldStatement co_yield AttributeStatement ForRangeLoop AliasDeclaration using TypeDefinition typedef PointerDeclarator FunctionDeclarator ArrayDeclarator ParenthesizedDeclarator ThrowStatement NamespaceDefinition namespace ScopedIdentifier Identifier OperatorName operator ArithOp BitOp CompareOp LogicOp new delete co_await ConceptDefinition concept UsingDeclaration enum StaticAssertDeclaration static_assert ConcatenatedString TemplateDeclaration FriendDeclaration friend union FunctionDefinition ExplicitFunctionSpecifier explicit FieldInitializerList FieldInitializer DefaultMethodClause DeleteMethodClause FunctionDefinition OperatorCast operator TemplateInstantiation FunctionDefinition FunctionDefinition Declaration ModuleDeclaration module RequiresExpression RequirementList SimpleRequirement TypeRequirement CompoundRequirement ReturnTypeRequirement ConstraintConjuction LogicOp ConstraintDisjunction LogicOp ArrayDeclarator ParenthesizedDeclarator ReferenceDeclarator TemplateFunction OperatorName StructuredBindingDeclarator ArrayDeclarator ParenthesizedDeclarator ReferenceDeclarator BitfieldClause FunctionDefinition FunctionDefinition Declaration FunctionDefinition Declaration AccessSpecifier UnionSpecifier ClassSpecifier EnumSpecifier SizedTypeSpecifier TypeSize EnumeratorList Enumerator DependentType Decltype decltype auto PlaceholderTypeSpecifier ParameterPackExpansion ParameterPackExpansion FieldIdentifier PointerExpression SubscriptExpression BinaryExpression ArithOp LogicOp LogicOp BitOp UnaryExpression LogicOp BitOp UpdateExpression CastExpression SizeofExpression sizeof CoAwaitExpression CompoundLiteralExpression NULL NewExpression new NewDeclarator DeleteExpression delete ParameterPackExpansion nullptr this UserDefinedLiteral ParamPack #define PreprocArg #if #ifdef #ifndef #else #endif #elif PreprocDirectiveName Macro Program",
        maxTerm: 433,
        nodeProps: [
          ["group", -35, 1, 8, 11, 15, 16, 17, 19, 71, 72, 100, 101, 102, 104, 191, 208, 229, 242, 243, 270, 271, 272, 277, 280, 281, 282, 284, 285, 286, 287, 290, 292, 293, 294, 295, 296, "Expression", -13, 18, 25, 26, 27, 43, 255, 256, 257, 258, 262, 263, 265, 266, "Type", -19, 126, 129, 147, 150, 152, 153, 158, 160, 163, 164, 166, 168, 170, 172, 174, 176, 178, 179, 188, "Statement"],
          ["isolate", -4, 4, 5, 8, 10, ""],
          ["openedBy", 12, "(", 52, "{", 54, "["],
          ["closedBy", 13, ")", 51, "}", 53, "]"]
        ],
        propSources: [cppHighlighting],
        skippedNodes: [0, 3, 4, 5, 6, 7, 10, 297, 298, 299, 300, 301, 302, 303, 304, 305, 306, 308, 349, 350],
        repeatNodeCount: 43,
        tokenData: "&AbMfR!UOX$eXY/]YZ5gZ]$e]^1g^p$epq/]qr5}rs8Zst:Ttu$euv!AWvw!Cbwx!Eqxy!Flyz!Gmz{!Hn{|!Iw|}!LX}!O!MY!O!P# m!P!Q#8a!Q!R#@T!R![$'k![!]$@f!]!^$Bn!^!_$Co!_!`%C`!`!a%Dg!a!b%HP!b!c$e!c!n%IQ!n!o%Jl!o!w%IQ!w!x%Jl!x!}%IQ!}#O%Mx#O#P& }#P#Q&3[#Q#R&5a#R#S%IQ#S#T$e#T#i%IQ#i#j&6j#j#o%IQ#o#p&8[#p#q&9]#q#r&;o#r#s&<p#s;'S$e;'S;=`/V<%lO$e,j$n[)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$e,f%kY)d`'f,UOY%dZw%dwx&Zx!P%d!P!Q(z!Q#O%d#O#P'b#P;'S%d;'S;=`*g<%lO%d,U&`W'f,UOY&ZZ!P&Z!P!Q&x!Q#O&Z#O#P'b#P;'S&Z;'S;=`'[<%lO&Z,U&{TOz&Z{!P&Z!Q;'S&Z;'S;=`'[<%lO&Z,U'_P;=`<%l&Z,U'gZ'f,UOY&ZYZ&ZZ]&Z]^(Y^!P&Z!P!Q&x!Q#O&Z#O#P'b#P;'S&Z;'S;=`'[<%lO&Z,U(_X'f,UOY&ZYZ&ZZ!P&Z!P!Q&x!Q#O&Z#O#P'b#P;'S&Z;'S;=`'[<%lO&Z,f)P])d`OY%dYZ&ZZw%dwx&Zxz%dz{)x{!P%d!P!Q)x!Q#O%d#O#P&Z#P;'S%d;'S;=`*g<%lO%d`)}U)d`OY)xZw)xx#O)x#P;'S)x;'S;=`*a<%lO)x`*dP;=`<%l)x,f*jP;=`<%l%d,Y*tY(wS'f,UOY*mZr*mrs&Zs!P*m!P!Q+d!Q#O*m#O#P'b#P;'S*m;'S;=`-P<%lO*m,Y+i](wSOY*mYZ&ZZr*mrs&Zsz*mz{,b{!P*m!P!Q,b!Q#O*m#O#P&Z#P;'S*m;'S;=`-P<%lO*mS,gU(wSOY,bZr,bs#O,b#P;'S,b;'S;=`,y<%lO,bS,|P;=`<%l,b,Y-SP;=`<%l*m,j-^_)d`(wSOY$eYZ&ZZr$ers%dsw$ewx*mxz$ez{.]{!P$e!P!Q.]!Q#O$e#O#P&Z#P;'S$e;'S;=`/V<%lO$ed.dX)d`(wSOY.]Zr.]rs)xsw.]wx,bx#O.]#P;'S.];'S;=`/P<%lO.]d/SP;=`<%l.],j/YP;=`<%l$eMf/jb)d`(wS(p<`'f,U*c1pOX$eXY/]YZ0rZ]$e]^1g^p$epq/]qr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P2z#P;'S$e;'S;=`/V<%lO$e<`0wT(p<`XY0rYZ0r]^0rpq0r#O#P1W<`1ZQYZ0r]^1a<`1dPYZ0rGz1rb)d`(wS(p<`'f,UOX$eXY1gYZ0rZ]$e]^1g^p$epq1gqr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P2z#P;'S$e;'S;=`/V<%lO$eGf3PZ'f,UOY&ZYZ3rZ]&Z]^4u^!P&Z!P!Q&x!Q#O&Z#O#P'b#P;'S&Z;'S;=`'[<%lO&ZGf3y^(p<`'f,UOX&ZXY3rYZ0rZ]&Z]^3r^p&Zpq3rq!P&Z!P!Q&x!Q#O&Z#O#P2z#P;'S&Z;'S;=`'[<%lO&ZGf4zX'f,UOY&ZYZ3rZ!P&Z!P!Q&x!Q#O&Z#O#P'b#P;'S&Z;'S;=`'[<%lO&ZMQ5nT*`1p(p<`XY0rYZ0r]^0rpq0r#O#P1WF`6[^%^#t'QQ)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q!_$e!_!`7W!`#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eF`7e[%]#t!a8O)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eKz8f[)d`(uS(v=j'f,UOY%dZr%drs9[sw%dwx&Zx!P%d!P!Q(z!Q#O%d#O#P'b#P;'S%d;'S;=`*g<%lO%d/[9eY*P#t)d`'f,UOY%dZw%dwx&Zx!P%d!P!Q(z!Q#O%d#O#P'b#P;'S%d;'S;=`*g<%lO%dGz:^h)d`(wS'f,UOX$eXY:TZp$epq:Tqr$ers%dsw$ewx*mx!P$e!P!Q-V!Q!c$e!c!};x!}#O$e#O#P'b#P#T$e#T#W;x#W#X=`#X#YFz#Y#];x#]#^!)O#^#o;x#o;'S$e;'S;=`/V<%lO$eGz<Tc)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#o;x#o;'S$e;'S;=`/V<%lO$eGz=ke)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#X;x#X#Y>|#Y#o;x#o;'S$e;'S;=`/V<%lO$eGz?Xe)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#Y;x#Y#Z@j#Z#o;x#o;'S$e;'S;=`/V<%lO$eGz@ue)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#];x#]#^BW#^#o;x#o;'S$e;'S;=`/V<%lO$eGzBce)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#b;x#b#cCt#c#o;x#o;'S$e;'S;=`/V<%lO$eGzDPe)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#X;x#X#YEb#Y#o;x#o;'S$e;'S;=`/V<%lO$eGzEoc)d`(wS'e<`'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#o;x#o;'S$e;'S;=`/V<%lO$eGzGVg)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#`;x#`#aHn#a#b;x#b#c!!n#c#o;x#o;'S$e;'S;=`/V<%lO$eGzHyg)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#];x#]#^Jb#^#g;x#g#hMh#h#o;x#o;'S$e;'S;=`/V<%lO$eGzJme)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#Y;x#Y#ZLO#Z#o;x#o;'S$e;'S;=`/V<%lO$eGzL]c)d`(wS'f,U'l<`'m<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#o;x#o;'S$e;'S;=`/V<%lO$eGzMse)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#X;x#X#Y! U#Y#o;x#o;'S$e;'S;=`/V<%lO$eGz! cc)d`(wS'j<`'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#o;x#o;'S$e;'S;=`/V<%lO$eGz!!ye)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#W;x#W#X!$[#X#o;x#o;'S$e;'S;=`/V<%lO$eGz!$ge)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#];x#]#^!%x#^#o;x#o;'S$e;'S;=`/V<%lO$eGz!&Te)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#Y;x#Y#Z!'f#Z#o;x#o;'S$e;'S;=`/V<%lO$eGz!'sc)d`(wS'f,U'k<`'m<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#o;x#o;'S$e;'S;=`/V<%lO$eGz!)Zg)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#Y;x#Y#Z!*r#Z#b;x#b#c!7l#c#o;x#o;'S$e;'S;=`/V<%lO$eGz!+Pg)d`(wS'g<`'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#W;x#W#X!,h#X#b;x#b#c!1[#c#o;x#o;'S$e;'S;=`/V<%lO$eGz!,se)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#X;x#X#Y!.U#Y#o;x#o;'S$e;'S;=`/V<%lO$eGz!.ae)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#Y;x#Y#Z!/r#Z#o;x#o;'S$e;'S;=`/V<%lO$eGz!0Pc)d`(wS'h<`'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#o;x#o;'S$e;'S;=`/V<%lO$eGz!1ge)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#W;x#W#X!2x#X#o;x#o;'S$e;'S;=`/V<%lO$eGz!3Te)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#X;x#X#Y!4f#Y#o;x#o;'S$e;'S;=`/V<%lO$eGz!4qe)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#Y;x#Y#Z!6S#Z#o;x#o;'S$e;'S;=`/V<%lO$eGz!6ac)d`(wS'i<`'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#o;x#o;'S$e;'S;=`/V<%lO$eGz!7we)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#V;x#V#W!9Y#W#o;x#o;'S$e;'S;=`/V<%lO$eGz!9ee)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#`;x#`#a!:v#a#o;x#o;'S$e;'S;=`/V<%lO$eGz!;Re)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#i;x#i#j!<d#j#o;x#o;'S$e;'S;=`/V<%lO$eGz!<oe)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#W;x#W#X!>Q#X#o;x#o;'S$e;'S;=`/V<%lO$eGz!>]e)d`(wS'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#X;x#X#Y!?n#Y#o;x#o;'S$e;'S;=`/V<%lO$eGz!?{c)d`(wSV<`'f,U'm<`OY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![;x![!c$e!c!};x!}#O$e#O#P'b#P#R$e#R#S;x#S#T$e#T#o;x#o;'S$e;'S;=`/V<%lO$eF`!Ae^)d`(wS%Z#t![8O'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q!_$e!_!`!Ba!`#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eF`!Bl[!g:t)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eF`!Co_)^8O)d`(wS%[#t'f,UOY$eZr$ers%dsv$evw!Dnwx*mx!P$e!P!Q-V!Q!_$e!_!`!Ba!`#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eF`!D{[)]8O%^#t)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eCb!E|Y)bW(wS)c8O'f,UOY*mZr*mrs&Zs!P*m!P!Q+d!Q#O*m#O#P'b#P;'S*m;'S;=`-P<%lO*mLS!Fw[)d`(wS]Kn'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$e-^!Gx[[r)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eF`!H{^)Z8O)d`(wS%Z#t'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q!_$e!_!`!Ba!`#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eF`!JU`)d`(wS%Z#t!Y8O'f,UOY$eZr$ers%dsw$ewx*mx{$e{|!KW|!P$e!P!Q-V!Q!_$e!_!`!Ba!`#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eF`!Kc[)d`!X:t(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eCr!Ld[!h8W)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eF`!Mga)d`(wS%Z#t!Y8O'f,UOY$eZr$ers%dsw$ewx*mx}$e}!O!KW!O!P$e!P!Q-V!Q!_$e!_!`!Ba!`!a!Nl!a#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eF`!Nw[)O:t)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eCr# x^)d`(wS'f,U(}8OOY$eZr$ers%dsw$ewx*mx!O$e!O!P#!t!P!Q-V!Q![#$w![#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eCr#!}])d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!O$e!O!P##v!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eCr#$R[)a8W)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eCj#%So)d`(wS!i8O'f,UOY$eZr$ers%dsw$ewx#'Tx!P$e!P!Q-V!Q![#$w![!g$e!g!h#1O!h!i#6j!i!n$e!n!o#6j!o!r$e!r!s#1O!s!w$e!w!x#6j!x#O$e#O#P'b#P#X$e#X#Y#1O#Y#Z#6j#Z#`$e#`#a#6j#a#d$e#d#e#1O#e#i$e#i#j#6j#j;'S$e;'S;=`/V<%lO$eCY#'[Z(wS'f,UOY*mZr*mrs&Zs!P*m!P!Q+d!Q![#'}![#O*m#O#P'b#P;'S*m;'S;=`-P<%lO*mCY#(Wo(wS!i8O'f,UOY*mZr*mrs&Zsw*mwx#'Tx!P*m!P!Q+d!Q![#'}![!g*m!g!h#*X!h!i#/a!i!n*m!n!o#/a!o!r*m!r!s#*X!s!w*m!w!x#/a!x#O*m#O#P'b#P#X*m#X#Y#*X#Y#Z#/a#Z#`*m#`#a#/a#a#d*m#d#e#*X#e#i*m#i#j#/a#j;'S*m;'S;=`-P<%lO*mCY#*bm(wS!i8O'f,UOY*mZr*mrs&Zs{*m{|#,]|}*m}!O#,]!O!P*m!P!Q+d!Q![#-c![!c*m!c!h#-c!h!i#-c!i!n*m!n!o#/a!o!w*m!w!x#/a!x#O*m#O#P'b#P#T*m#T#Y#-c#Y#Z#-c#Z#`*m#`#a#/a#a#i*m#i#j#/a#j;'S*m;'S;=`-P<%lO*mCY#,d_(wS'f,UOY*mZr*mrs&Zs!P*m!P!Q+d!Q![#-c![!c*m!c!i#-c!i#O*m#O#P'b#P#T*m#T#Z#-c#Z;'S*m;'S;=`-P<%lO*mCY#-lk(wS!i8O'f,UOY*mZr*mrs&Zsw*mwx#,]x!P*m!P!Q+d!Q![#-c![!c*m!c!h#-c!h!i#-c!i!n*m!n!o#/a!o!w*m!w!x#/a!x#O*m#O#P'b#P#T*m#T#Y#-c#Y#Z#-c#Z#`*m#`#a#/a#a#i*m#i#j#/a#j;'S*m;'S;=`-P<%lO*mCY#/jf(wS!i8O'f,UOY*mZr*mrs&Zs!P*m!P!Q+d!Q!h*m!h!i#/a!i!n*m!n!o#/a!o!w*m!w!x#/a!x#O*m#O#P'b#P#Y*m#Y#Z#/a#Z#`*m#`#a#/a#a#i*m#i#j#/a#j;'S*m;'S;=`-P<%lO*mCj#1Zo)d`(wS!i8O'f,UOY$eZr$ers%dsw$ewx*mx{$e{|#3[|}$e}!O#3[!O!P$e!P!Q-V!Q![#4j![!c$e!c!h#4j!h!i#4j!i!n$e!n!o#6j!o!w$e!w!x#6j!x#O$e#O#P'b#P#T$e#T#Y#4j#Y#Z#4j#Z#`$e#`#a#6j#a#i$e#i#j#6j#j;'S$e;'S;=`/V<%lO$eCj#3ea)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![#4j![!c$e!c!i#4j!i#O$e#O#P'b#P#T$e#T#Z#4j#Z;'S$e;'S;=`/V<%lO$eCj#4uk)d`(wS!i8O'f,UOY$eZr$ers%dsw$ewx#,]x!P$e!P!Q-V!Q![#4j![!c$e!c!h#4j!h!i#4j!i!n$e!n!o#6j!o!w$e!w!x#6j!x#O$e#O#P'b#P#T$e#T#Y#4j#Y#Z#4j#Z#`$e#`#a#6j#a#i$e#i#j#6j#j;'S$e;'S;=`/V<%lO$eCj#6uh)d`(wS!i8O'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q!h$e!h!i#6j!i!n$e!n!o#6j!o!w$e!w!x#6j!x#O$e#O#P'b#P#Y$e#Y#Z#6j#Z#`$e#`#a#6j#a#i$e#i#j#6j#j;'S$e;'S;=`/V<%lO$eMf#8la)d`(wS%Z#t![8OOY$eYZ&ZZr$ers%dsw$ewx*mxz$ez{#9q{!P$e!P!Q#:g!Q!_$e!_!`!Ba!`#O$e#O#P&Z#P;'S$e;'S;=`/V<%lO$eMf#9zX)d`(wS(qMQOY.]Zr.]rs)xsw.]wx,bx#O.]#P;'S.];'S;=`/P<%lO.]Mf#:pY)d`(wSSMQOY#:gZr#:grs#;`sw#:gwx#?Wx#O#:g#O#P#<h#P;'S#:g;'S;=`#?}<%lO#:gMb#;gW)d`SMQOY#;`Zw#;`wx#<Px#O#;`#O#P#<h#P;'S#;`;'S;=`#?Q<%lO#;`MQ#<UUSMQOY#<PZ#O#<P#O#P#<h#P;'S#<P;'S;=`#>z<%lO#<PMQ#<mUSMQOY#<PZ#O#<P#O#P#=P#P;'S#<P;'S;=`#>z<%lO#<PMQ#=UYSMQOY#<PZ#O#<P#O#P#=P#P#b#<P#b#c#<P#c#f#<P#f#g#=t#g;'S#<P;'S;=`#>z<%lO#<PMQ#=yUSMQOY#<PZ#O#<P#O#P#>]#P;'S#<P;'S;=`#>z<%lO#<PMQ#>bWSMQOY#<PZ#O#<P#O#P#=P#P#b#<P#b#c#<P#c;'S#<P;'S;=`#>z<%lO#<PMQ#>}P;=`<%l#<PMb#?TP;=`<%l#;`MU#?_W(wSSMQOY#?WZr#?Wrs#<Ps#O#?W#O#P#<h#P;'S#?W;'S;=`#?w<%lO#?WMU#?zP;=`<%l#?WMf#@QP;=`<%l#:gCj#@`t)d`(wS!i8O'f,UOY$eZr$ers%dsw$ewx#Bpx!O$e!O!P#NV!P!Q-V!Q![$'k![!g$e!g!h#1O!h!i#6j!i!n$e!n!o#6j!o!r$e!r!s#1O!s!w$e!w!x#6j!x#O$e#O#P'b#P#U$e#U#V$)z#V#X$e#X#Y#1O#Y#Z#6j#Z#`$e#`#a#6j#a#d$e#d#e#1O#e#i$e#i#j#6j#j#l$e#l#m$<_#m;'S$e;'S;=`/V<%lO$eCY#BwZ(wS'f,UOY*mZr*mrs&Zs!P*m!P!Q+d!Q![#Cj![#O*m#O#P'b#P;'S*m;'S;=`-P<%lO*mCY#Csp(wS!i8O'f,UOY*mZr*mrs&Zsw*mwx#Bpx!O*m!O!P#Ew!P!Q+d!Q![#Cj![!g*m!g!h#*X!h!i#/a!i!n*m!n!o#/a!o!r*m!r!s#*X!s!w*m!w!x#/a!x#O*m#O#P'b#P#X*m#X#Y#*X#Y#Z#/a#Z#`*m#`#a#/a#a#d*m#d#e#*X#e#i*m#i#j#/a#j;'S*m;'S;=`-P<%lO*mCY#FQo(wS!i8O'f,UOY*mZr*mrs&Zs!P*m!P!Q+d!Q![#HR![!c*m!c!g#HR!g!h#Ki!h!i#HR!i!n*m!n!o#/a!o!r*m!r!s#*X!s!w*m!w!x#/a!x#O*m#O#P'b#P#T*m#T#X#HR#X#Y#Ki#Y#Z#HR#Z#`*m#`#a#/a#a#d*m#d#e#*X#e#i*m#i#j#/a#j;'S*m;'S;=`-P<%lO*mCY#H[q(wS!i8O'f,UOY*mZr*mrs&Zsw*mwx#Jcx!P*m!P!Q+d!Q![#HR![!c*m!c!g#HR!g!h#Ki!h!i#HR!i!n*m!n!o#/a!o!r*m!r!s#*X!s!w*m!w!x#/a!x#O*m#O#P'b#P#T*m#T#X#HR#X#Y#Ki#Y#Z#HR#Z#`*m#`#a#/a#a#d*m#d#e#*X#e#i*m#i#j#/a#j;'S*m;'S;=`-P<%lO*mCY#Jj_(wS'f,UOY*mZr*mrs&Zs!P*m!P!Q+d!Q![#HR![!c*m!c!i#HR!i#O*m#O#P'b#P#T*m#T#Z#HR#Z;'S*m;'S;=`-P<%lO*mCY#Kru(wS!i8O'f,UOY*mZr*mrs&Zsw*mwx#Jcx{*m{|#,]|}*m}!O#,]!O!P*m!P!Q+d!Q![#HR![!c*m!c!g#HR!g!h#Ki!h!i#HR!i!n*m!n!o#/a!o!r*m!r!s#*X!s!w*m!w!x#/a!x#O*m#O#P'b#P#T*m#T#X#HR#X#Y#Ki#Y#Z#HR#Z#`*m#`#a#/a#a#d*m#d#e#*X#e#i*m#i#j#/a#j;'S*m;'S;=`-P<%lO*mCj#Nbq)d`(wS!i8O'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![$!i![!c$e!c!g$!i!g!h$${!h!i$!i!i!n$e!n!o#6j!o!r$e!r!s#1O!s!w$e!w!x#6j!x#O$e#O#P'b#P#T$e#T#X$!i#X#Y$${#Y#Z$!i#Z#`$e#`#a#6j#a#d$e#d#e#1O#e#i$e#i#j#6j#j;'S$e;'S;=`/V<%lO$eCj$!tq)d`(wS!i8O'f,UOY$eZr$ers%dsw$ewx#Jcx!P$e!P!Q-V!Q![$!i![!c$e!c!g$!i!g!h$${!h!i$!i!i!n$e!n!o#6j!o!r$e!r!s#1O!s!w$e!w!x#6j!x#O$e#O#P'b#P#T$e#T#X$!i#X#Y$${#Y#Z$!i#Z#`$e#`#a#6j#a#d$e#d#e#1O#e#i$e#i#j#6j#j;'S$e;'S;=`/V<%lO$eCj$%Wu)d`(wS!i8O'f,UOY$eZr$ers%dsw$ewx#Jcx{$e{|#3[|}$e}!O#3[!O!P$e!P!Q-V!Q![$!i![!c$e!c!g$!i!g!h$${!h!i$!i!i!n$e!n!o#6j!o!r$e!r!s#1O!s!w$e!w!x#6j!x#O$e#O#P'b#P#T$e#T#X$!i#X#Y$${#Y#Z$!i#Z#`$e#`#a#6j#a#d$e#d#e#1O#e#i$e#i#j#6j#j;'S$e;'S;=`/V<%lO$eCj$'vp)d`(wS!i8O'f,UOY$eZr$ers%dsw$ewx#Bpx!O$e!O!P#NV!P!Q-V!Q![$'k![!g$e!g!h#1O!h!i#6j!i!n$e!n!o#6j!o!r$e!r!s#1O!s!w$e!w!x#6j!x#O$e#O#P'b#P#X$e#X#Y#1O#Y#Z#6j#Z#`$e#`#a#6j#a#d$e#d#e#1O#e#i$e#i#j#6j#j;'S$e;'S;=`/V<%lO$eCj$*T_)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!O$e!O!P$+S!P!Q-V!Q!R$,U!R![$'k![#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eCj$+]])d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![#$w![#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eCj$,at)d`(wS!i8O'f,UOY$eZr$ers%dsw$ewx#Bpx!O$e!O!P#NV!P!Q-V!Q![$'k![!g$e!g!h#1O!h!i#6j!i!n$e!n!o#6j!o!r$e!r!s#1O!s!w$e!w!x#6j!x#O$e#O#P'b#P#U$e#U#V$.q#V#X$e#X#Y#1O#Y#Z#6j#Z#`$e#`#a#6j#a#d$e#d#e#1O#e#i$e#i#j#6j#j#l$e#l#m$/s#m;'S$e;'S;=`/V<%lO$eCj$.z])d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![$'k![#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eCj$/|a)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![$1R![!c$e!c!i$1R!i#O$e#O#P'b#P#T$e#T#Z$1R#Z;'S$e;'S;=`/V<%lO$eCj$1^r)d`(wS!i8O'f,UOY$eZr$ers%dsw$ewx$3hx!O$e!O!P#NV!P!Q-V!Q![$1R![!c$e!c!g$1R!g!h$9o!h!i$1R!i!n$e!n!o#6j!o!r$e!r!s#1O!s!w$e!w!x#6j!x#O$e#O#P'b#P#T$e#T#X$1R#X#Y$9o#Y#Z$1R#Z#`$e#`#a#6j#a#d$e#d#e#1O#e#i$e#i#j#6j#j;'S$e;'S;=`/V<%lO$eCY$3o_(wS'f,UOY*mZr*mrs&Zs!P*m!P!Q+d!Q![$4n![!c*m!c!i$4n!i#O*m#O#P'b#P#T*m#T#Z$4n#Z;'S*m;'S;=`-P<%lO*mCY$4wr(wS!i8O'f,UOY*mZr*mrs&Zsw*mwx$3hx!O*m!O!P#Ew!P!Q+d!Q![$4n![!c*m!c!g$4n!g!h$7R!h!i$4n!i!n*m!n!o#/a!o!r*m!r!s#*X!s!w*m!w!x#/a!x#O*m#O#P'b#P#T*m#T#X$4n#X#Y$7R#Y#Z$4n#Z#`*m#`#a#/a#a#d*m#d#e#*X#e#i*m#i#j#/a#j;'S*m;'S;=`-P<%lO*mCY$7[u(wS!i8O'f,UOY*mZr*mrs&Zsw*mwx$3hx{*m{|#,]|}*m}!O#,]!O!P#Ew!P!Q+d!Q![$4n![!c*m!c!g$4n!g!h$7R!h!i$4n!i!n*m!n!o#/a!o!r*m!r!s#*X!s!w*m!w!x#/a!x#O*m#O#P'b#P#T*m#T#X$4n#X#Y$7R#Y#Z$4n#Z#`*m#`#a#/a#a#d*m#d#e#*X#e#i*m#i#j#/a#j;'S*m;'S;=`-P<%lO*mCj$9zu)d`(wS!i8O'f,UOY$eZr$ers%dsw$ewx$3hx{$e{|#3[|}$e}!O#3[!O!P#NV!P!Q-V!Q![$1R![!c$e!c!g$1R!g!h$9o!h!i$1R!i!n$e!n!o#6j!o!r$e!r!s#1O!s!w$e!w!x#6j!x#O$e#O#P'b#P#T$e#T#X$1R#X#Y$9o#Y#Z$1R#Z#`$e#`#a#6j#a#d$e#d#e#1O#e#i$e#i#j#6j#j;'S$e;'S;=`/V<%lO$eCj$<hc)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!O$e!O!P$+S!P!Q-V!Q!R$=s!R![$1R![!c$e!c!i$1R!i#O$e#O#P'b#P#T$e#T#Z$1R#Z;'S$e;'S;=`/V<%lO$eCj$>Ov)d`(wS!i8O'f,UOY$eZr$ers%dsw$ewx$3hx!O$e!O!P#NV!P!Q-V!Q![$1R![!c$e!c!g$1R!g!h$9o!h!i$1R!i!n$e!n!o#6j!o!r$e!r!s#1O!s!w$e!w!x#6j!x#O$e#O#P'b#P#T$e#T#U$1R#U#V$1R#V#X$1R#X#Y$9o#Y#Z$1R#Z#`$e#`#a#6j#a#d$e#d#e#1O#e#i$e#i#j#6j#j#l$e#l#m$/s#m;'S$e;'S;=`/V<%lO$eGz$@q^(|9b)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![$e![!]$Am!]#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eFh$Ax[m:|)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eCj$By[)`8O)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eM^$C|aq8O%]#t)d`(wS'f,UOY$ERYZ$FZZr$ERrs$Fxsw$ERwx%4^x!P$ER!P!Q%8|!Q!^$ER!^!_%=a!_!`%?z!`!a%B_!a#O$ER#O#P%.w#P;'S$ER;'S;=`%=Z<%lO$ER3h$E[_)d`(wS'f,UOY$ERYZ$FZZr$ERrs$Fxsw$ERwx%4^x!P$ER!P!Q%8|!Q!`$ER!`!a%<W!a#O$ER#O#P%.w#P;'S$ER;'S;=`%=Z<%lO$ER!b$F^TO!`$FZ!`!a$Fm!a;'S$FZ;'S;=`$Fr<%lO$FZ!b$FrO$W!b!b$FuP;=`<%l$FZ3d$GP])d`'f,UOY$FxYZ$FZZw$Fxwx$Gxx!P$Fx!P!Q%0n!Q!`$Fx!`!a%3]!a#O$Fx#O#P%.w#P;'S$Fx;'S;=`%4W<%lO$Fx3S$G}Z'f,UOY$GxYZ$FZZ!P$Gx!P!Q$Hp!Q!`$Gx!`!a%$S!a#O$Gx#O#P%.w#P;'S$Gx;'S;=`%0h<%lO$Gx3S$Hs]OY$GxYZ$IlZz$Gxz{$Mo{!P$Gx!P!Q$Mo!Q!`$Gx!`!a%$S!a#O$Gx#O#P%$u#P;'S$Gx;'S;=`%0h<%lO$Gx-h$IqZ'f,UOY$IlYZ$FZZ!P$Il!P!Q$Jd!Q!`$Il!`!a$KS!a#O$Il#O#P$Ky#P;'S$Il;'S;=`$Ks<%lO$Il-h$JgXOz$Ilz{$FZ{!P$Il!P!Q$FZ!Q!`$Il!`!a$KS!a;'S$Il;'S;=`$Ks<%lO$Il-h$KZW$W!b'f,UOY&ZZ!P&Z!P!Q&x!Q#O&Z#O#P'b#P;'S&Z;'S;=`'[<%lO&Z-h$KvP;=`<%l$Il-h$LO]'f,UOY$IlYZ$IlZ]$Il]^$Lw^!P$Il!P!Q$Jd!Q!`$Il!`!a$KS!a#O$Il#O#P$Ky#P;'S$Il;'S;=`$Ks<%lO$Il-h$L|Z'f,UOY$IlYZ$IlZ!P$Il!P!Q$Jd!Q!`$Il!`!a$KS!a#O$Il#O#P$Ky#P;'S$Il;'S;=`$Ks<%lO$Il'|$MrXOY$MoYZ$FZZ!`$Mo!`!a$N_!a#O$Mo#O#P$Nf#P;'S$Mo;'S;=`%#|<%lO$Mo'|$NfO$W!bY&j'|$NiUO!`$Mo!`!a$N{!a;'S$Mo;'S;=`%#^;=`<%l% j<%lO$Mo'|% QW$W!bOY% jZ!`% j!`!a%!V!a#O% j#O#P%![#P;'S% j;'S;=`%#W<%lO% j&j% mWOY% jZ!`% j!`!a%!V!a#O% j#O#P%![#P;'S% j;'S;=`%#W<%lO% j&j%![OY&j&j%!_RO;'S% j;'S;=`%!h;=`O% j&j%!kXOY% jZ!`% j!`!a%!V!a#O% j#O#P%![#P;'S% j;'S;=`%#W;=`<%l% j<%lO% j&j%#ZP;=`<%l% j'|%#aXOY% jZ!`% j!`!a%!V!a#O% j#O#P%![#P;'S% j;'S;=`%#W;=`<%l$Mo<%lO% j'|%$PP;=`<%l$Mo3S%$]W$W!bY&j'f,UOY&ZZ!P&Z!P!Q&x!Q#O&Z#O#P'b#P;'S&Z;'S;=`'[<%lO&Z3S%$z['f,UOY$GxYZ$MoZ!P$Gx!P!Q$Hp!Q!`$Gx!`!a%%p!a#O$Gx#O#P%-R#P;'S$Gx;'S;=`%/x;=`<%l% j<%lO$Gx3S%%wY$W!b'f,UOY%&gZ!P%&g!P!Q%'[!Q!`%&g!`!a%(W!a#O%&g#O#P%+b#P;'S%&g;'S;=`%,{<%lO%&g1p%&lY'f,UOY%&gZ!P%&g!P!Q%'[!Q!`%&g!`!a%(W!a#O%&g#O#P%+b#P;'S%&g;'S;=`%,{<%lO%&g1p%'_]OY%&gYZ&ZZz%&gz{% j{!P%&g!P!Q% j!Q!`%&g!`!a%(W!a#O%&g#O#P%(w#P;'S%&g;'S;=`%,{<%lO%&g1p%(_WY&j'f,UOY&ZZ!P&Z!P!Q&x!Q#O&Z#O#P'b#P;'S&Z;'S;=`'[<%lO&Z1p%(|Y'f,UOY%&gYZ% jZ!P%&g!P!Q%'[!Q#O%&g#O#P%)l#P;'S%&g;'S;=`%,];=`<%l% j<%lO%&g1p%)q]'f,UOY%&gYZ&ZZ]%&g]^%*j^!P%&g!P!Q%'[!Q!`%&g!`!a%(W!a#O%&g#O#P%+b#P;'S%&g;'S;=`%,{<%lO%&g1p%*oZ'f,UOY%&gYZ&ZZ!P%&g!P!Q%'[!Q!`%&g!`!a%(W!a#O%&g#O#P%+b#P;'S%&g;'S;=`%,{<%lO%&g1p%+g['f,UOY%&gYZ%&gZ]%&g]^%*j^!P%&g!P!Q%'[!Q#O%&g#O#P%)l#P;'S%&g;'S;=`%,];=`<%l% j<%lO%&g1p%,`XOY% jZ!`% j!`!a%!V!a#O% j#O#P%![#P;'S% j;'S;=`%#W;=`<%l%&g<%lO% j1p%-OP;=`<%l%&g3S%-W]'f,UOY$GxYZ$IlZ]$Gx]^%.P^!P$Gx!P!Q$Hp!Q!`$Gx!`!a%$S!a#O$Gx#O#P%.w#P;'S$Gx;'S;=`%0h<%lO$Gx3S%.UZ'f,UOY$GxYZ$IlZ!P$Gx!P!Q$Hp!Q!`$Gx!`!a%$S!a#O$Gx#O#P%.w#P;'S$Gx;'S;=`%0h<%lO$Gx3S%.|^'f,UOY$GxYZ$GxZ]$Gx]^%.P^!P$Gx!P!Q$Hp!Q!`$Gx!`!a%%p!a#O$Gx#O#P%-R#P;'S$Gx;'S;=`%/x;=`<%l% j<%lO$Gx3S%/{XOY% jZ!`% j!`!a%!V!a#O% j#O#P%![#P;'S% j;'S;=`%#W;=`<%l$Gx<%lO% j3S%0kP;=`<%l$Gx3d%0s_)d`OY$FxYZ$IlZw$Fxwx$Gxxz$Fxz{%1r{!P$Fx!P!Q%1r!Q!`$Fx!`!a%3]!a#O$Fx#O#P%$u#P;'S$Fx;'S;=`%4W<%lO$Fx(^%1wZ)d`OY%1rYZ$FZZw%1rwx$Mox!`%1r!`!a%2j!a#O%1r#O#P$Nf#P;'S%1r;'S;=`%3V<%lO%1r(^%2sU$W!bY&j)d`OY)xZw)xx#O)x#P;'S)x;'S;=`*a<%lO)x(^%3YP;=`<%l%1r3d%3hY$W!bY&j)d`'f,UOY%dZw%dwx&Zx!P%d!P!Q(z!Q#O%d#O#P'b#P;'S%d;'S;=`*g<%lO%d3d%4ZP;=`<%l$Fx3W%4e](wS'f,UOY%4^YZ$FZZr%4^rs$Gxs!P%4^!P!Q%5^!Q!`%4^!`!a%7{!a#O%4^#O#P%.w#P;'S%4^;'S;=`%8v<%lO%4^3W%5c_(wSOY%4^YZ$IlZr%4^rs$Gxsz%4^z{%6b{!P%4^!P!Q%6b!Q!`%4^!`!a%7{!a#O%4^#O#P%$u#P;'S%4^;'S;=`%8v<%lO%4^(Q%6gZ(wSOY%6bYZ$FZZr%6brs$Mos!`%6b!`!a%7Y!a#O%6b#O#P$Nf#P;'S%6b;'S;=`%7u<%lO%6b(Q%7cU$W!bY&j(wSOY,bZr,bs#O,b#P;'S,b;'S;=`,y<%lO,b(Q%7xP;=`<%l%6b3W%8WY$W!bY&j(wS'f,UOY*mZr*mrs&Zs!P*m!P!Q+d!Q#O*m#O#P'b#P;'S*m;'S;=`-P<%lO*m3W%8yP;=`<%l%4^3h%9Ta)d`(wSOY$ERYZ$IlZr$ERrs$Fxsw$ERwx%4^xz$ERz{%:Y{!P$ER!P!Q%:Y!Q!`$ER!`!a%<W!a#O$ER#O#P%$u#P;'S$ER;'S;=`%=Z<%lO$ER(b%:a])d`(wSOY%:YYZ$FZZr%:Yrs%1rsw%:Ywx%6bx!`%:Y!`!a%;Y!a#O%:Y#O#P$Nf#P;'S%:Y;'S;=`%<Q<%lO%:Y(b%;eX$W!bY&j)d`(wSOY.]Zr.]rs)xsw.]wx,bx#O.]#P;'S.];'S;=`/P<%lO.](b%<TP;=`<%l%:Y3h%<e[$W!bY&j)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$e3h%=^P;=`<%l$ERM^%=n`)d`(wS%[#t!f8O'f,UOY$ERYZ$FZZr$ERrs$Fxsw$ERwx%4^x!P$ER!P!Q%8|!Q!_$ER!_!`%>p!`!a%<W!a#O$ER#O#P%.w#P;'S$ER;'S;=`%=Z<%lO$ERM^%>{_!g:t)d`(wS'f,UOY$ERYZ$FZZr$ERrs$Fxsw$ERwx%4^x!P$ER!P!Q%8|!Q!`$ER!`!a%<W!a#O$ER#O#P%.w#P;'S$ER;'S;=`%=Z<%lO$ERM^%@X_%]#t!b8O)d`(wS'f,UOY$ERYZ$FZZr$ERrs$Fxsw$ERwx%4^x!P$ER!P!Q%8|!Q!`$ER!`!a%AW!a#O$ER#O#P%.w#P;'S$ER;'S;=`%=Z<%lO$ERM^%Ai[%]#t!b8O$W!bY&j)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$e2U%Bj[Y&j)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eF`%Ck^)q#v)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q!_$e!_!`7W!`#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eF`%Dt_%]#t)d`(wS!d8O'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q!_$e!_!`%Es!`!a%Fv!a#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eF`%FQ[%]#t!b8O)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eF`%GT^)d`(wS%[#t!f8O'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q!_$e!_!`!Ba!`#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$e,l%H[[({Q)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eMf%Iac)d`)PW(wS!R7|(x*t'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![%IQ![!c$e!c!}%IQ!}#O$e#O#P'b#P#R$e#R#S%IQ#S#T$e#T#o%IQ#o;'S$e;'S;=`/V<%lO$eMf%J{c)d`)PW(wS!R7|(x*t'f,UOY$eZr$ers%LWsw$ewx%MPx!P$e!P!Q-V!Q![%IQ![!c$e!c!}%IQ!}#O$e#O#P'b#P#R$e#R#S%IQ#S#T$e#T#o%IQ#o;'S$e;'S;=`/V<%lO$eIQ%LaY)d`(v=j'f,UOY%dZw%dwx&Zx!P%d!P!Q(z!Q#O%d#O#P'b#P;'S%d;'S;=`*g<%lO%dCY%MYY(wS)c8O'f,UOY*mZr*mrs&Zs!P*m!P!Q+d!Q#O*m#O#P'b#P;'S*m;'S;=`-P<%lO*mF`%NT]!V:t)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q!}$e!}#O%N|#O#P'b#P;'S$e;'S;=`/V<%lO$e,l& X[)WQ)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eGz&!Sb'f,UOY&#[YZ&#{Z]&#[]^&%Q^!P&#[!P!Q&%t!Q![&&Y![!w&#[!w!x&'p!x#O&#[#O#P&/`#P#i&#[#i#j&+h#j#l&#[#l#m&0Y#m;'S&#[;'S;=`&3U<%lO&#[,j&#cWXd'f,UOY&ZZ!P&Z!P!Q&x!Q#O&Z#O#P'b#P;'S&Z;'S;=`'[<%lO&ZGz&$U^Xd(p<`'f,UOX&ZXY3rYZ0rZ]&Z]^3r^p&Zpq3rq!P&Z!P!Q&x!Q#O&Z#O#P2z#P;'S&Z;'S;=`'[<%lO&ZGz&%XXXd'f,UOY&ZYZ3rZ!P&Z!P!Q&x!Q#O&Z#O#P'b#P;'S&Z;'S;=`'[<%lO&Z,j&%yTXdOz&Z{!P&Z!Q;'S&Z;'S;=`'[<%lO&Z,j&&aXXd'f,UOY&ZZ!P&Z!P!Q&x!Q![&&|![#O&Z#O#P'b#P;'S&Z;'S;=`'[<%lO&Z,j&'TXXd'f,UOY&ZZ!P&Z!P!Q&x!Q![&#[![#O&Z#O#P'b#P;'S&Z;'S;=`'[<%lO&Z,j&'u]'f,UOY&ZZ!P&Z!P!Q&x!Q![&(n![!c&Z!c!i&(n!i#O&Z#O#P'b#P#T&Z#T#Z&(n#Z;'S&Z;'S;=`'[<%lO&Z,j&(s]'f,UOY&ZZ!P&Z!P!Q&x!Q![&)l![!c&Z!c!i&)l!i#O&Z#O#P'b#P#T&Z#T#Z&)l#Z;'S&Z;'S;=`'[<%lO&Z,j&)q]'f,UOY&ZZ!P&Z!P!Q&x!Q![&*j![!c&Z!c!i&*j!i#O&Z#O#P'b#P#T&Z#T#Z&*j#Z;'S&Z;'S;=`'[<%lO&Z,j&*o]'f,UOY&ZZ!P&Z!P!Q&x!Q![&+h![!c&Z!c!i&+h!i#O&Z#O#P'b#P#T&Z#T#Z&+h#Z;'S&Z;'S;=`'[<%lO&Z,j&+m]'f,UOY&ZZ!P&Z!P!Q&x!Q![&,f![!c&Z!c!i&,f!i#O&Z#O#P'b#P#T&Z#T#Z&,f#Z;'S&Z;'S;=`'[<%lO&Z,j&,k]'f,UOY&ZZ!P&Z!P!Q&x!Q![&-d![!c&Z!c!i&-d!i#O&Z#O#P'b#P#T&Z#T#Z&-d#Z;'S&Z;'S;=`'[<%lO&Z,j&-i]'f,UOY&ZZ!P&Z!P!Q&x!Q![&.b![!c&Z!c!i&.b!i#O&Z#O#P'b#P#T&Z#T#Z&.b#Z;'S&Z;'S;=`'[<%lO&Z,j&.g]'f,UOY&ZZ!P&Z!P!Q&x!Q![&#[![!c&Z!c!i&#[!i#O&Z#O#P'b#P#T&Z#T#Z&#[#Z;'S&Z;'S;=`'[<%lO&Z,j&/gZXd'f,UOY&ZYZ&ZZ]&Z]^(Y^!P&Z!P!Q&x!Q#O&Z#O#P'b#P;'S&Z;'S;=`'[<%lO&Z,j&0_]'f,UOY&ZZ!P&Z!P!Q&x!Q![&1W![!c&Z!c!i&1W!i#O&Z#O#P'b#P#T&Z#T#Z&1W#Z;'S&Z;'S;=`'[<%lO&Z,j&1]]'f,UOY&ZZ!P&Z!P!Q&x!Q![&2U![!c&Z!c!i&2U!i#O&Z#O#P'b#P#T&Z#T#Z&2U#Z;'S&Z;'S;=`'[<%lO&Z,j&2]]Xd'f,UOY&ZZ!P&Z!P!Q&x!Q![&2U![!c&Z!c!i&2U!i#O&Z#O#P'b#P#T&Z#T#Z&2U#Z;'S&Z;'S;=`'[<%lO&Z,j&3XP;=`<%l&#[Cr&3g]!W7^)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P#Q&4`#Q;'S$e;'S;=`/V<%lO$e-d&4k[)Vx)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eF`&5n^)d`(wS%[#t'f,U!_8OOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q!_$e!_!`!Ba!`#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eMf&6ye)d`)PW(wS!R7|(x*t'f,UOY$eZr$ers%LWsw$ewx%MPx!P$e!P!Q-V!Q!Y%IQ!Y!Z%Jl!Z![%IQ![!c$e!c!}%IQ!}#O$e#O#P'b#P#R$e#R#S%IQ#S#T$e#T#o%IQ#o;'S$e;'S;=`/V<%lO$eCj&8g[!T8O)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$eF`&9j`)d`(wS%[#t'f,U!^8OOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q!_$e!_!`!Ba!`#O$e#O#P'b#P#p$e#p#q&:l#q;'S$e;'S;=`/V<%lO$eF`&:y[)[8O%^#t)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$e-^&;z[!Ur)d`(wS'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q#O$e#O#P'b#P;'S$e;'S;=`/V<%lO$e/j&<}e)d`(wS%[#t'RQ'f,UOX$eXY&>`Zp$epq&>`qr$ers%dsw$ewx*mx!P$e!P!Q-V!Q!c$e!c!}&?z!}#O$e#O#P'b#P#R$e#R#S&?z#S#T$e#T#o&?z#o;'S$e;'S;=`/V<%lO$e,t&>ie)d`(wS'f,UOX$eXY&>`Zp$epq&>`qr$ers%dsw$ewx*mx!P$e!P!Q-V!Q!c$e!c!}&?z!}#O$e#O#P'b#P#R$e#R#S&?z#S#T$e#T#o&?z#o;'S$e;'S;=`/V<%lO$e,t&@Vc)d`(wSeY'f,UOY$eZr$ers%dsw$ewx*mx!P$e!P!Q-V!Q![&?z![!c$e!c!}&?z!}#O$e#O#P'b#P#R$e#R#S&?z#S#T$e#T#o&?z#o;'S$e;'S;=`/V<%lO$e",
        tokenizers: [rawString, fallback, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, new LocalTokenGroup("j~RQYZXz{^~^O(s~~aP!P!Qd~iO(t~~", 25, 356)],
        topRules: { "Program": [0, 307] },
        dynamicPrecedences: { "17": 1, "65": 1, "87": 1, "94": 1, "119": 1, "184": 1, "187": -10, "240": -10, "241": 1, "244": -1, "246": -10, "247": 1, "262": -1, "267": 2, "268": 2, "306": -10, "371": 3, "425": 1, "426": 3, "427": 1, "428": 1 },
        specialized: [{ term: 362, get: (value) => spec_identifier[value] || -1 }, { term: 33, get: (value) => spec_[value] || -1 }, { term: 66, get: (value) => spec_templateArgsEnd[value] || -1 }, { term: 369, get: (value) => spec_scopedIdentifier[value] || -1 }],
        tokenPrec: 24852
      });
    }
  });

  // node_modules/@codemirror/lang-cpp/dist/index.js
  function cpp() {
    return new LanguageSupport(cppLanguage);
  }
  var cppLanguage;
  var init_dist8 = __esm({
    "node_modules/@codemirror/lang-cpp/dist/index.js"() {
      init_dist7();
      init_dist5();
      cppLanguage = /* @__PURE__ */ LRLanguage.define({
        name: "cpp",
        parser: /* @__PURE__ */ parser.configure({
          props: [
            /* @__PURE__ */ indentNodeProp.add({
              IfStatement: /* @__PURE__ */ continuedIndent({ except: /^\s*({|else\b)/ }),
              TryStatement: /* @__PURE__ */ continuedIndent({ except: /^\s*({|catch)\b/ }),
              LabeledStatement: flatIndent,
              CaseStatement: (context) => context.baseIndent + context.unit,
              BlockComment: () => null,
              CompoundStatement: /* @__PURE__ */ delimitedIndent({ closing: "}" }),
              Statement: /* @__PURE__ */ continuedIndent({ except: /^{/ })
            }),
            /* @__PURE__ */ foldNodeProp.add({
              "DeclarationList CompoundStatement EnumeratorList FieldDeclarationList InitializerList": foldInside,
              BlockComment(tree) {
                return { from: tree.from + 2, to: tree.to - 2 };
              }
            })
          ]
        }),
        languageData: {
          commentTokens: { line: "//", block: { open: "/*", close: "*/" } },
          indentOnInput: /^\s*(?:case |default:|\{|\})$/,
          closeBrackets: { stringPrefixes: ["L", "u", "U", "u8", "LR", "UR", "uR", "u8R", "R"] }
        }
      });
    }
  });

  // node_modules/@lezer/python/dist/index.js
  function isLineBreak(ch) {
    return ch == newline || ch == carriageReturn;
  }
  function isHex(ch) {
    return ch >= 48 && ch <= 57 || ch >= 65 && ch <= 70 || ch >= 97 && ch <= 102;
  }
  function Context(parent, indent2, flags) {
    this.parent = parent;
    this.indent = indent2;
    this.flags = flags;
    this.hash = (parent ? parent.hash + parent.hash << 8 : 0) + indent2 + (indent2 << 4) + flags + (flags << 6);
  }
  function countIndent(space2) {
    let depth = 0;
    for (let i2 = 0; i2 < space2.length; i2++)
      depth += space2.charCodeAt(i2) == tab ? 8 - depth % 8 : 1;
    return depth;
  }
  function skipEscape(input, ch) {
    if (ch == letter_o) {
      for (let i2 = 0; i2 < 2 && input.next >= 48 && input.next <= 55; i2++) input.advance();
    } else if (ch == letter_x) {
      for (let i2 = 0; i2 < 2 && isHex(input.next); i2++) input.advance();
    } else if (ch == letter_u) {
      for (let i2 = 0; i2 < 4 && isHex(input.next); i2++) input.advance();
    } else if (ch == letter_U) {
      for (let i2 = 0; i2 < 8 && isHex(input.next); i2++) input.advance();
    } else if (ch == letter_N) {
      if (input.next == braceOpen) {
        input.advance();
        while (input.next >= 0 && input.next != braceClose && input.next != singleQuote && input.next != doubleQuote && input.next != newline) input.advance();
        if (input.next == braceClose) input.advance();
      }
    }
  }
  var printKeyword, indent, dedent, newline$1, blankLineStart, newlineBracketed, eof, stringContent, Escape, replacementStart, stringEnd, ParenL2, ParenthesizedExpression, TupleExpression, ComprehensionExpression, BracketL, ArrayExpression, ArrayComprehensionExpression, BraceL, DictionaryExpression, DictionaryComprehensionExpression, SetExpression, SetComprehensionExpression, ArgList, subscript, String$1, stringStart, stringStartD, stringStartL, stringStartLD, stringStartR, stringStartRD, stringStartRL, stringStartRLD, FormatString, stringStartF, stringStartFD, stringStartFL, stringStartFLD, stringStartFR, stringStartFRD, stringStartFRL, stringStartFRLD, FormatReplacement, nestedFormatReplacement, importList, TypeParamList, ParamList, SequencePattern, MappingPattern, PatternArgList, newline, carriageReturn, space, tab, hash, parenOpen, dot, braceOpen, braceClose, singleQuote, doubleQuote, backslash, letter_o, letter_x, letter_N, letter_u, letter_U, bracketed, newlines, indentation, cx_Bracketed, cx_String, cx_DoubleQuote, cx_Long, cx_Raw, cx_Format, topIndent, stringFlags, trackIndent, legacyPrint, strings, pythonHighlighting, spec_identifier2, parser2;
  var init_dist9 = __esm({
    "node_modules/@lezer/python/dist/index.js"() {
      init_dist6();
      init_dist4();
      printKeyword = 1;
      indent = 194;
      dedent = 195;
      newline$1 = 196;
      blankLineStart = 197;
      newlineBracketed = 198;
      eof = 199;
      stringContent = 200;
      Escape = 2;
      replacementStart = 3;
      stringEnd = 201;
      ParenL2 = 24;
      ParenthesizedExpression = 25;
      TupleExpression = 49;
      ComprehensionExpression = 50;
      BracketL = 55;
      ArrayExpression = 56;
      ArrayComprehensionExpression = 57;
      BraceL = 59;
      DictionaryExpression = 60;
      DictionaryComprehensionExpression = 61;
      SetExpression = 62;
      SetComprehensionExpression = 63;
      ArgList = 65;
      subscript = 238;
      String$1 = 71;
      stringStart = 241;
      stringStartD = 242;
      stringStartL = 243;
      stringStartLD = 244;
      stringStartR = 245;
      stringStartRD = 246;
      stringStartRL = 247;
      stringStartRLD = 248;
      FormatString = 72;
      stringStartF = 249;
      stringStartFD = 250;
      stringStartFL = 251;
      stringStartFLD = 252;
      stringStartFR = 253;
      stringStartFRD = 254;
      stringStartFRL = 255;
      stringStartFRLD = 256;
      FormatReplacement = 73;
      nestedFormatReplacement = 77;
      importList = 263;
      TypeParamList = 112;
      ParamList = 130;
      SequencePattern = 151;
      MappingPattern = 152;
      PatternArgList = 155;
      newline = 10;
      carriageReturn = 13;
      space = 32;
      tab = 9;
      hash = 35;
      parenOpen = 40;
      dot = 46;
      braceOpen = 123;
      braceClose = 125;
      singleQuote = 39;
      doubleQuote = 34;
      backslash = 92;
      letter_o = 111;
      letter_x = 120;
      letter_N = 78;
      letter_u = 117;
      letter_U = 85;
      bracketed = /* @__PURE__ */ new Set([
        ParenthesizedExpression,
        TupleExpression,
        ComprehensionExpression,
        importList,
        ArgList,
        ParamList,
        ArrayExpression,
        ArrayComprehensionExpression,
        subscript,
        SetExpression,
        SetComprehensionExpression,
        FormatString,
        FormatReplacement,
        nestedFormatReplacement,
        DictionaryExpression,
        DictionaryComprehensionExpression,
        SequencePattern,
        MappingPattern,
        PatternArgList,
        TypeParamList
      ]);
      newlines = new ExternalTokenizer((input, stack) => {
        let prev;
        if (input.next < 0) {
          input.acceptToken(eof);
        } else if (stack.context.flags & cx_Bracketed) {
          if (isLineBreak(input.next)) input.acceptToken(newlineBracketed, 1);
        } else if (((prev = input.peek(-1)) < 0 || isLineBreak(prev)) && stack.canShift(blankLineStart)) {
          let spaces = 0;
          while (input.next == space || input.next == tab) {
            input.advance();
            spaces++;
          }
          if (input.next == newline || input.next == carriageReturn || input.next == hash)
            input.acceptToken(blankLineStart, -spaces);
        } else if (isLineBreak(input.next)) {
          input.acceptToken(newline$1, 1);
        }
      }, { contextual: true });
      indentation = new ExternalTokenizer((input, stack) => {
        let context = stack.context;
        if (context.flags) return;
        let prev = input.peek(-1);
        if (prev == newline || prev == carriageReturn) {
          let depth = 0, chars = 0;
          for (; ; ) {
            if (input.next == space) depth++;
            else if (input.next == tab) depth += 8 - depth % 8;
            else break;
            input.advance();
            chars++;
          }
          if (depth != context.indent && input.next != newline && input.next != carriageReturn && input.next != hash) {
            if (depth < context.indent) input.acceptToken(dedent, -chars);
            else input.acceptToken(indent);
          }
        }
      });
      cx_Bracketed = 1;
      cx_String = 2;
      cx_DoubleQuote = 4;
      cx_Long = 8;
      cx_Raw = 16;
      cx_Format = 32;
      topIndent = new Context(null, 0, 0);
      stringFlags = new Map([
        [stringStart, 0],
        [stringStartD, cx_DoubleQuote],
        [stringStartL, cx_Long],
        [stringStartLD, cx_Long | cx_DoubleQuote],
        [stringStartR, cx_Raw],
        [stringStartRD, cx_Raw | cx_DoubleQuote],
        [stringStartRL, cx_Raw | cx_Long],
        [stringStartRLD, cx_Raw | cx_Long | cx_DoubleQuote],
        [stringStartF, cx_Format],
        [stringStartFD, cx_Format | cx_DoubleQuote],
        [stringStartFL, cx_Format | cx_Long],
        [stringStartFLD, cx_Format | cx_Long | cx_DoubleQuote],
        [stringStartFR, cx_Format | cx_Raw],
        [stringStartFRD, cx_Format | cx_Raw | cx_DoubleQuote],
        [stringStartFRL, cx_Format | cx_Raw | cx_Long],
        [stringStartFRLD, cx_Format | cx_Raw | cx_Long | cx_DoubleQuote]
      ].map(([term, flags]) => [term, flags | cx_String]));
      trackIndent = new ContextTracker({
        start: topIndent,
        reduce(context, term, _, input) {
          if (context.flags & cx_Bracketed && bracketed.has(term) || (term == String$1 || term == FormatString) && context.flags & cx_String)
            return context.parent;
          return context;
        },
        shift(context, term, stack, input) {
          if (term == indent)
            return new Context(context, countIndent(input.read(input.pos, stack.pos)), 0);
          if (term == dedent)
            return context.parent;
          if (term == ParenL2 || term == BracketL || term == BraceL || term == replacementStart)
            return new Context(context, 0, cx_Bracketed);
          if (stringFlags.has(term))
            return new Context(context, 0, stringFlags.get(term) | context.flags & cx_Bracketed);
          return context;
        },
        hash(context) {
          return context.hash;
        }
      });
      legacyPrint = new ExternalTokenizer((input) => {
        for (let i2 = 0; i2 < 5; i2++) {
          if (input.next != "print".charCodeAt(i2)) return;
          input.advance();
        }
        if (/\w/.test(String.fromCharCode(input.next))) return;
        for (let off = 0; ; off++) {
          let next = input.peek(off);
          if (next == space || next == tab) continue;
          if (next != parenOpen && next != dot && next != newline && next != carriageReturn && next != hash)
            input.acceptToken(printKeyword);
          return;
        }
      });
      strings = new ExternalTokenizer((input, stack) => {
        let { flags } = stack.context;
        let quote = flags & cx_DoubleQuote ? doubleQuote : singleQuote;
        let long = (flags & cx_Long) > 0;
        let escapes = !(flags & cx_Raw);
        let format = (flags & cx_Format) > 0;
        let start = input.pos;
        for (; ; ) {
          if (input.next < 0) {
            break;
          } else if (format && input.next == braceOpen) {
            if (input.peek(1) == braceOpen) {
              input.advance(2);
            } else {
              if (input.pos == start) {
                input.acceptToken(replacementStart, 1);
                return;
              }
              break;
            }
          } else if (escapes && input.next == backslash) {
            if (input.pos == start) {
              input.advance();
              let escaped = input.next;
              if (escaped >= 0) {
                input.advance();
                skipEscape(input, escaped);
              }
              input.acceptToken(Escape);
              return;
            }
            break;
          } else if (input.next == backslash && !escapes && input.peek(1) > -1) {
            input.advance(2);
          } else if (input.next == quote && (!long || input.peek(1) == quote && input.peek(2) == quote)) {
            if (input.pos == start) {
              input.acceptToken(stringEnd, long ? 3 : 1);
              return;
            }
            break;
          } else if (input.next == newline) {
            if (long) {
              input.advance();
            } else if (input.pos == start) {
              input.acceptToken(stringEnd);
              return;
            }
            break;
          } else {
            input.advance();
          }
        }
        if (input.pos > start) input.acceptToken(stringContent);
      });
      pythonHighlighting = styleTags({
        'async "*" "**" FormatConversion FormatSpec': tags.modifier,
        "for while if elif else try except finally return raise break continue with pass assert await yield match case": tags.controlKeyword,
        "in not and or is del": tags.operatorKeyword,
        "from def class global nonlocal lambda": tags.definitionKeyword,
        import: tags.moduleKeyword,
        "with as print": tags.keyword,
        Boolean: tags.bool,
        None: tags.null,
        VariableName: tags.variableName,
        "CallExpression/VariableName": tags.function(tags.variableName),
        "FunctionDefinition/VariableName": tags.function(tags.definition(tags.variableName)),
        "ClassDefinition/VariableName": tags.definition(tags.className),
        PropertyName: tags.propertyName,
        "CallExpression/MemberExpression/PropertyName": tags.function(tags.propertyName),
        Comment: tags.lineComment,
        Number: tags.number,
        String: tags.string,
        FormatString: tags.special(tags.string),
        Escape: tags.escape,
        UpdateOp: tags.updateOperator,
        "ArithOp!": tags.arithmeticOperator,
        BitOp: tags.bitwiseOperator,
        CompareOp: tags.compareOperator,
        AssignOp: tags.definitionOperator,
        Ellipsis: tags.punctuation,
        At: tags.meta,
        "( )": tags.paren,
        "[ ]": tags.squareBracket,
        "{ }": tags.brace,
        ".": tags.derefOperator,
        ", ;": tags.separator
      });
      spec_identifier2 = { __proto__: null, await: 44, or: 54, and: 56, in: 60, not: 62, is: 64, if: 70, else: 72, lambda: 76, yield: 94, from: 96, async: 102, for: 104, None: 162, True: 164, False: 164, del: 178, pass: 182, break: 186, continue: 190, return: 194, raise: 202, import: 206, as: 208, global: 212, nonlocal: 214, assert: 218, type: 223, elif: 236, while: 240, try: 246, except: 248, finally: 250, with: 254, def: 258, class: 268, match: 279, case: 285 };
      parser2 = LRParser.deserialize({
        version: 14,
        states: "##jQ`QeOOP$}OSOOO&WQtO'#HUOOQS'#Co'#CoOOQS'#Cp'#CpO'vQdO'#CnO*UQtO'#HTOOQS'#HU'#HUOOQS'#DU'#DUOOQS'#HT'#HTO*rQdO'#D_O+VQdO'#DfO+gQdO'#DjO+zOWO'#DuO,VOWO'#DvO.[QtO'#GuOOQS'#Gu'#GuO'vQdO'#GtO0ZQtO'#GtOOQS'#Eb'#EbO0rQdO'#EcOOQS'#Gs'#GsO0|QdO'#GrOOQV'#Gr'#GrO1XQdO'#FYOOQS'#G^'#G^O1^QdO'#FXOOQV'#IS'#ISOOQV'#Gq'#GqOOQV'#Fq'#FqQ`QeOOO'vQdO'#CqO1lQdO'#C}O1sQdO'#DRO2RQdO'#HYO2cQtO'#EVO'vQdO'#EWOOQS'#EY'#EYOOQS'#E['#E[OOQS'#E^'#E^O2wQdO'#E`O3_QdO'#EdO3rQdO'#EfO3zQtO'#EfO1XQdO'#EiO0rQdO'#ElO1XQdO'#EnO0rQdO'#EtO0rQdO'#EwO4VQdO'#EyO4^QdO'#FOO4iQdO'#EzO0rQdO'#FOO1XQdO'#FQO1XQdO'#FVO4nQdO'#F[P4uOdO'#GpPOOO)CBd)CBdOOQS'#Ce'#CeOOQS'#Cf'#CfOOQS'#Cg'#CgOOQS'#Ch'#ChOOQS'#Ci'#CiOOQS'#Cj'#CjOOQS'#Cl'#ClO'vQdO,59OO'vQdO,59OO'vQdO,59OO'vQdO,59OO'vQdO,59OO'vQdO,59OO5TQdO'#DoOOQS,5:Y,5:YO5hQdO'#HdOOQS,5:],5:]O5uQ!fO,5:]O5zQtO,59YO1lQdO,59bO1lQdO,59bO1lQdO,59bO8jQdO,59bO8oQdO,59bO8vQdO,59jO8}QdO'#HTO:TQdO'#HSOOQS'#HS'#HSOOQS'#D['#D[O:lQdO,59aO'vQdO,59aO:zQdO,59aOOQS,59y,59yO;PQdO,5:RO'vQdO,5:ROOQS,5:Q,5:QO;_QdO,5:QO;dQdO,5:XO'vQdO,5:XO'vQdO,5:VOOQS,5:U,5:UO;uQdO,5:UO;zQdO,5:WOOOW'#Fy'#FyO<POWO,5:aOOQS,5:a,5:aO<[QdO'#HwOOOW'#Dw'#DwOOOW'#Fz'#FzO<lOWO,5:bOOQS,5:b,5:bOOQS'#F}'#F}O<zQtO,5:iO?lQtO,5=`O@VQ#xO,5=`O@vQtO,5=`OOQS,5:},5:}OA_QeO'#GWOBqQdO,5;^OOQV,5=^,5=^OB|QtO'#IPOCkQdO,5;tOOQS-E:[-E:[OOQV,5;s,5;sO4dQdO'#FQOOQV-E9o-E9oOCsQtO,59]OEzQtO,59iOFeQdO'#HVOFpQdO'#HVO1XQdO'#HVOF{QdO'#DTOGTQdO,59mOGYQdO'#HZO'vQdO'#HZO0rQdO,5=tOOQS,5=t,5=tO0rQdO'#EROOQS'#ES'#ESOGwQdO'#GPOHXQdO,58|OHXQdO,58|O*xQdO,5:oOHgQtO'#H]OOQS,5:r,5:rOOQS,5:z,5:zOHzQdO,5;OOI]QdO'#IOO1XQdO'#H}OOQS,5;Q,5;QOOQS'#GT'#GTOIqQtO,5;QOJPQdO,5;QOJUQdO'#IQOOQS,5;T,5;TOJdQdO'#H|OOQS,5;W,5;WOJuQdO,5;YO4iQdO,5;`O4iQdO,5;cOJ}QtO'#ITO'vQdO'#ITOKXQdO,5;eO4VQdO,5;eO0rQdO,5;jO1XQdO,5;lOK^QeO'#EuOLjQgO,5;fO!!kQdO'#IUO4iQdO,5;jO!!vQdO,5;lO!#OQdO,5;qO!#ZQtO,5;vO'vQdO,5;vPOOO,5=[,5=[P!#bOSO,5=[P!#jOdO,5=[O!&bQtO1G.jO!&iQtO1G.jO!)YQtO1G.jO!)dQtO1G.jO!+}QtO1G.jO!,bQtO1G.jO!,uQdO'#HcO!-TQtO'#GuO0rQdO'#HcO!-_QdO'#HbOOQS,5:Z,5:ZO!-gQdO,5:ZO!-lQdO'#HeO!-wQdO'#HeO!.[QdO,5>OOOQS'#Ds'#DsOOQS1G/w1G/wOOQS1G.|1G.|O!/[QtO1G.|O!/cQtO1G.|O1lQdO1G.|O!0OQdO1G/UOOQS'#DZ'#DZO0rQdO,59tOOQS1G.{1G.{O!0VQdO1G/eO!0gQdO1G/eO!0oQdO1G/fO'vQdO'#H[O!0tQdO'#H[O!0yQtO1G.{O!1ZQdO,59iO!2aQdO,5=zO!2qQdO,5=zO!2yQdO1G/mO!3OQtO1G/mOOQS1G/l1G/lO!3`QdO,5=uO!4VQdO,5=uO0rQdO1G/qO!4tQdO1G/sO!4yQtO1G/sO!5ZQtO1G/qOOQS1G/p1G/pOOQS1G/r1G/rOOOW-E9w-E9wOOQS1G/{1G/{O!5kQdO'#HxO0rQdO'#HxO!5|QdO,5>cOOOW-E9x-E9xOOQS1G/|1G/|OOQS-E9{-E9{O!6[Q#xO1G2zO!6{QtO1G2zO'vQdO,5<jOOQS,5<j,5<jOOQS-E9|-E9|OOQS,5<r,5<rOOQS-E:U-E:UOOQV1G0x1G0xO1XQdO'#GRO!7dQtO,5>kOOQS1G1`1G1`O!8RQdO1G1`OOQS'#DV'#DVO0rQdO,5=qOOQS,5=q,5=qO!8WQdO'#FrO!8cQdO,59oO!8kQdO1G/XO!8uQtO,5=uOOQS1G3`1G3`OOQS,5:m,5:mO!9fQdO'#GtOOQS,5<k,5<kOOQS-E9}-E9}O!9wQdO1G.hOOQS1G0Z1G0ZO!:VQdO,5=wO!:gQdO,5=wO0rQdO1G0jO0rQdO1G0jO!:xQdO,5>jO!;ZQdO,5>jO1XQdO,5>jO!;lQdO,5>iOOQS-E:R-E:RO!;qQdO1G0lO!;|QdO1G0lO!<RQdO,5>lO!<aQdO,5>lO!<oQdO,5>hO!=VQdO,5>hO!=hQdO'#EpO0rQdO1G0tO!=sQdO1G0tO!=xQgO1G0zO!AvQgO1G0}O!EqQdO,5>oO!E{QdO,5>oO!FTQtO,5>oO0rQdO1G1PO!F_QdO1G1PO4iQdO1G1UO!!vQdO1G1WOOQV,5;a,5;aO!FdQfO,5;aO!FiQgO1G1QO!JjQdO'#GZO4iQdO1G1QO4iQdO1G1QO!JzQdO,5>pO!KXQdO,5>pO1XQdO,5>pOOQV1G1U1G1UO!KaQdO'#FSO!KrQ!fO1G1WO!KzQdO1G1WOOQV1G1]1G1]O4iQdO1G1]O!LPQdO1G1]O!LXQdO'#F^OOQV1G1b1G1bO!#ZQtO1G1bPOOO1G2v1G2vP!L^OSO1G2vOOQS,5=},5=}OOQS'#Dp'#DpO0rQdO,5=}O!LfQdO,5=|O!LyQdO,5=|OOQS1G/u1G/uO!MRQdO,5>PO!McQdO,5>PO!MkQdO,5>PO!NOQdO,5>PO!N`QdO,5>POOQS1G3j1G3jOOQS7+$h7+$hO!8kQdO7+$pO#!RQdO1G.|O#!YQdO1G.|OOQS1G/`1G/`OOQS,5<`,5<`O'vQdO,5<`OOQS7+%P7+%PO#!aQdO7+%POOQS-E9r-E9rOOQS7+%Q7+%QO#!qQdO,5=vO'vQdO,5=vOOQS7+$g7+$gO#!vQdO7+%PO##OQdO7+%QO##TQdO1G3fOOQS7+%X7+%XO##eQdO1G3fO##mQdO7+%XOOQS,5<_,5<_O'vQdO,5<_O##rQdO1G3aOOQS-E9q-E9qO#$iQdO7+%]OOQS7+%_7+%_O#$wQdO1G3aO#%fQdO7+%_O#%kQdO1G3gO#%{QdO1G3gO#&TQdO7+%]O#&YQdO,5>dO#&sQdO,5>dO#&sQdO,5>dOOQS'#Dx'#DxO#'UO&jO'#DzO#'aO`O'#HyOOOW1G3}1G3}O#'fQdO1G3}O#'nQdO1G3}O#'yQ#xO7+(fO#(jQtO1G2UP#)TQdO'#GOOOQS,5<m,5<mOOQS-E:P-E:POOQS7+&z7+&zOOQS1G3]1G3]OOQS,5<^,5<^OOQS-E9p-E9pOOQS7+$s7+$sO#)bQdO,5=`O#){QdO,5=`O#*^QtO,5<aO#*qQdO1G3cOOQS-E9s-E9sOOQS7+&U7+&UO#+RQdO7+&UO#+aQdO,5<nO#+uQdO1G4UOOQS-E:Q-E:QO#,WQdO1G4UOOQS1G4T1G4TOOQS7+&W7+&WO#,iQdO7+&WOOQS,5<p,5<pO#,tQdO1G4WOOQS-E:S-E:SOOQS,5<l,5<lO#-SQdO1G4SOOQS-E:O-E:OO1XQdO'#EqO#-jQdO'#EqO#-uQdO'#IRO#-}QdO,5;[OOQS7+&`7+&`O0rQdO7+&`O#.SQgO7+&fO!JmQdO'#GXO4iQdO7+&fO4iQdO7+&iO#2QQtO,5<tO'vQdO,5<tO#2[QdO1G4ZOOQS-E:W-E:WO#2fQdO1G4ZO4iQdO7+&kO0rQdO7+&kOOQV7+&p7+&pO!KrQ!fO7+&rO!KzQdO7+&rO`QeO1G0{OOQV-E:X-E:XO4iQdO7+&lO4iQdO7+&lOOQV,5<u,5<uO#2nQdO,5<uO!JmQdO,5<uOOQV7+&l7+&lO#2yQgO7+&lO#6tQdO,5<vO#7PQdO1G4[OOQS-E:Y-E:YO#7^QdO1G4[O#7fQdO'#IWO#7tQdO'#IWO1XQdO'#IWOOQS'#IW'#IWO#8PQdO'#IVOOQS,5;n,5;nO#8XQdO,5;nO0rQdO'#FUOOQV7+&r7+&rO4iQdO7+&rOOQV7+&w7+&wO4iQdO7+&wO#8^QfO,5;xOOQV7+&|7+&|POOO7+(b7+(bO#8cQdO1G3iOOQS,5<c,5<cO#8qQdO1G3hOOQS-E9u-E9uO#9UQdO,5<dO#9aQdO,5<dO#9tQdO1G3kOOQS-E9v-E9vO#:UQdO1G3kO#:^QdO1G3kO#:nQdO1G3kO#:UQdO1G3kOOQS<<H[<<H[O#:yQtO1G1zOOQS<<Hk<<HkP#;WQdO'#FtO8vQdO1G3bO#;eQdO1G3bO#;jQdO<<HkOOQS<<Hl<<HlO#;zQdO7+)QOOQS<<Hs<<HsO#<[QtO1G1yP#<{QdO'#FsO#=YQdO7+)RO#=jQdO7+)RO#=rQdO<<HwO#=wQdO7+({OOQS<<Hy<<HyO#>nQdO,5<bO'vQdO,5<bOOQS-E9t-E9tOOQS<<Hw<<HwOOQS,5<g,5<gO0rQdO,5<gO#>sQdO1G4OOOQS-E9y-E9yO#?^QdO1G4OO<[QdO'#H{OOOO'#D{'#D{OOOO'#F|'#F|O#?oO&jO,5:fOOOW,5>e,5>eOOOW7+)i7+)iO#?zQdO7+)iO#@SQdO1G2zO#@mQdO1G2zP'vQdO'#FuO0rQdO<<IpO1XQdO1G2YP1XQdO'#GSO#AOQdO7+)pO#AaQdO7+)pOOQS<<Ir<<IrP1XQdO'#GUP0rQdO'#GQOOQS,5;],5;]O#ArQdO,5>mO#BQQdO,5>mOOQS1G0v1G0vOOQS<<Iz<<IzOOQV-E:V-E:VO4iQdO<<JQOOQV,5<s,5<sO4iQdO,5<sOOQV<<JQ<<JQOOQV<<JT<<JTO#BYQtO1G2`P#BdQdO'#GYO#BkQdO7+)uO#BuQgO<<JVO4iQdO<<JVOOQV<<J^<<J^O4iQdO<<J^O!KrQ!fO<<J^O#FpQgO7+&gOOQV<<JW<<JWO#FzQgO<<JWOOQV1G2a1G2aO1XQdO1G2aO#JuQdO1G2aO4iQdO<<JWO1XQdO1G2bP0rQdO'#G[O#KQQdO7+)vO#K_QdO7+)vOOQS'#FT'#FTO0rQdO,5>rO#KgQdO,5>rO#KrQdO,5>rO#K}QdO,5>qO#L`QdO,5>qOOQS1G1Y1G1YOOQS,5;p,5;pOOQV<<Jc<<JcO#LhQdO1G1dOOQS7+)T7+)TP#LmQdO'#FwO#L}QdO1G2OO#MbQdO1G2OO#MrQdO1G2OP#M}QdO'#FxO#N[QdO7+)VO#NlQdO7+)VO#NlQdO7+)VO#NtQdO7+)VO$ UQdO7+(|O8vQdO7+(|OOQSAN>VAN>VO$ oQdO<<LmOOQSAN>cAN>cO0rQdO1G1|O$!PQtO1G1|P$!ZQdO'#FvOOQS1G2R1G2RP$!hQdO'#F{O$!uQdO7+)jO$#`QdO,5>gOOOO-E9z-E9zOOOW<<MT<<MTO$#nQdO7+(fOOQSAN?[AN?[OOQS7+'t7+'tO$$XQdO<<M[OOQS,5<q,5<qO$$jQdO1G4XOOQS-E:T-E:TOOQVAN?lAN?lOOQV1G2_1G2_O4iQdOAN?qO$$xQgOAN?qOOQVAN?xAN?xO4iQdOAN?xOOQV<<JR<<JRO4iQdOAN?rO4iQdO7+'{OOQV7+'{7+'{O1XQdO7+'{OOQVAN?rAN?rOOQS7+'|7+'|O$(sQdO<<MbOOQS1G4^1G4^O0rQdO1G4^OOQS,5<w,5<wO$)QQdO1G4]OOQS-E:Z-E:ZOOQU'#G_'#G_O$)cQfO7+'OO$)nQdO'#F_O$*uQdO7+'jO$+VQdO7+'jOOQS7+'j7+'jO$+bQdO<<LqO$+rQdO<<LqO$+rQdO<<LqO$+zQdO'#H^OOQS<<Lh<<LhO$,UQdO<<LhOOQS7+'h7+'hOOQS'#D|'#D|OOOO1G4R1G4RO$,oQdO1G4RO$,wQdO1G4RP!=hQdO'#GVOOQVG25]G25]O4iQdOG25]OOQVG25dG25dOOQVG25^G25^OOQV<<Kg<<KgO4iQdO<<KgOOQS7+)x7+)xP$-SQdO'#G]OOQU-E:]-E:]OOQV<<Jj<<JjO$-vQtO'#FaOOQS'#Fc'#FcO$.WQdO'#FbO$.xQdO'#FbOOQS'#Fb'#FbO$.}QdO'#IYO$)nQdO'#FiO$)nQdO'#FiO$/fQdO'#FjO$)nQdO'#FkO$/mQdO'#IZOOQS'#IZ'#IZO$0[QdO,5;yOOQS<<KU<<KUO$0dQdO<<KUO$0tQdOANB]O$1UQdOANB]O$1^QdO'#H_OOQS'#H_'#H_O1sQdO'#DcO$1wQdO,5=xOOQSANBSANBSOOOO7+)m7+)mO$2`QdO7+)mOOQVLD*wLD*wOOQVANARANARO5uQ!fO'#GaO$2hQtO,5<SO$)nQdO'#FmOOQS,5<W,5<WOOQS'#Fd'#FdO$3YQdO,5;|O$3_QdO,5;|OOQS'#Fg'#FgO$)nQdO'#G`O$4PQdO,5<QO$4kQdO,5>tO$4{QdO,5>tO1XQdO,5<PO$5^QdO,5<TO$5cQdO,5<TO$)nQdO'#I[O$5hQdO'#I[O$5mQdO,5<UOOQS,5<V,5<VO0rQdO'#FpOOQU1G1e1G1eO4iQdO1G1eOOQSAN@pAN@pO$5rQdOG27wO$6SQdO,59}OOQS1G3d1G3dOOOO<<MX<<MXOOQS,5<{,5<{OOQS-E:_-E:_O$6XQtO'#FaO$6`QdO'#I]O$6nQdO'#I]O$6vQdO,5<XOOQS1G1h1G1hO$6{QdO1G1hO$7QQdO,5<zOOQS-E:^-E:^O$7lQdO,5=OO$8TQdO1G4`OOQS-E:b-E:bOOQS1G1k1G1kOOQS1G1o1G1oO$8eQdO,5>vO$)nQdO,5>vOOQS1G1p1G1pOOQS,5<[,5<[OOQU7+'P7+'PO$+zQdO1G/iO$)nQdO,5<YO$8sQdO,5>wO$8zQdO,5>wOOQS1G1s1G1sOOQS7+'S7+'SP$)nQdO'#GdO$9SQdO1G4bO$9^QdO1G4bO$9fQdO1G4bOOQS7+%T7+%TO$9tQdO1G1tO$:SQtO'#FaO$:ZQdO,5<}OOQS,5<},5<}O$:iQdO1G4cOOQS-E:a-E:aO$)nQdO,5<|O$:pQdO,5<|O$:uQdO7+)|OOQS-E:`-E:`O$;PQdO7+)|O$)nQdO,5<ZP$)nQdO'#GcO$;XQdO1G2hO$)nQdO1G2hP$;gQdO'#GbO$;nQdO<<MhO$;xQdO1G1uO$<WQdO7+(SO8vQdO'#C}O8vQdO,59bO8vQdO,59bO8vQdO,59bO$<fQtO,5=`O8vQdO1G.|O0rQdO1G/XO0rQdO7+$pP$<yQdO'#GOO'vQdO'#GtO$=WQdO,59bO$=]QdO,59bO$=dQdO,59mO$=iQdO1G/UO1sQdO'#DRO8vQdO,59j",
        stateData: "$>S~O%cOS%^OSSOS%]PQ~OPdOVaOfoOhYOopOs!POvqO!PrO!Q{O!T!SO!U!RO!XZO!][O!h`O!r`O!s`O!t`O!{tO!}uO#PvO#RwO#TxO#XyO#ZzO#^|O#_|O#a}O#c!OO#l!QO#o!TO#s!UO#u!VO#z!WO#}hO$P!XO%oRO%pRO%tSO%uWO&Z]O&[]O&]]O&^]O&_]O&`]O&a]O&b]O&c^O&d^O&e^O&f^O&g^O&h^O&i^O&j^O~O%]!YO~OV!aO_!aOa!bOh!iO!X!kO!f!mO%j![O%k!]O%l!^O%m!_O%n!_O%o!`O%p!`O%q!aO%r!aO%s!aO~Ok%xXl%xXm%xXn%xXo%xXp%xXs%xXz%xX{%xX!x%xX#g%xX%[%xX%_%xX%z%xXg%xX!T%xX!U%xX%{%xX!W%xX![%xX!Q%xX#[%xXt%xX!m%xX~P%SOfoOhYO!XZO!][O!h`O!r`O!s`O!t`O%oRO%pRO%tSO%uWO&Z]O&[]O&]]O&^]O&_]O&`]O&a]O&b]O&c^O&d^O&e^O&f^O&g^O&h^O&i^O&j^O~Oz%wX{%wX#g%wX%[%wX%_%wX%z%wX~Ok!pOl!qOm!oOn!oOo!rOp!sOs!tO!x%wX~P)pOV!zOg!|Oo0cOv0qO!PrO~P'vOV#OOo0cOv0qO!W#PO~P'vOV#SOa#TOo0cOv0qO![#UO~P'vOQ#XO%`#XO%a#ZO~OQ#^OR#[O%`#^O%a#`O~OV%iX_%iXa%iXh%iXk%iXl%iXm%iXn%iXo%iXp%iXs%iXz%iX!X%iX!f%iX%j%iX%k%iX%l%iX%m%iX%n%iX%o%iX%p%iX%q%iX%r%iX%s%iXg%iX!T%iX!U%iX~O&Z]O&[]O&]]O&^]O&_]O&`]O&a]O&b]O&c^O&d^O&e^O&f^O&g^O&h^O&i^O&j^O{%iX!x%iX#g%iX%[%iX%_%iX%z%iX%{%iX!W%iX![%iX!Q%iX#[%iXt%iX!m%iX~P,eOz#dO{%hX!x%hX#g%hX%[%hX%_%hX%z%hX~Oo0cOv0qO~P'vO#g#gO%[#iO%_#iO~O%uWO~O!T#nO#u!VO#z!WO#}hO~OopO~P'vOV#sOa#tO%uWO{wP~OV#xOo0cOv0qO!Q#yO~P'vO{#{O!x$QO%z#|O#g!yX%[!yX%_!yX~OV#xOo0cOv0qO#g#SX%[#SX%_#SX~P'vOo0cOv0qO#g#WX%[#WX%_#WX~P'vOh$WO%uWO~O!f$YO!r$YO%uWO~OV$eO~P'vO!U$gO#s$hO#u$iO~O{$jO~OV$qO~P'vOS$sO%[$rO%_$rO%c$tO~OV$}Oa$}Og%POo0cOv0qO~P'vOo0cOv0qO{%SO~P'vO&Y%UO~Oa!bOh!iO!X!kO!f!mOVba_bakbalbambanbaobapbasbazba{ba!xba#gba%[ba%_ba%jba%kba%lba%mba%nba%oba%pba%qba%rba%sba%zbagba!Tba!Uba%{ba!Wba![ba!Qba#[batba!mba~On%ZO~Oo%ZO~P'vOo0cO~P'vOk0eOl0fOm0dOn0dOo0mOp0nOs0rOg%wX!T%wX!U%wX%{%wX!W%wX![%wX!Q%wX#[%wX!m%wX~P)pO%{%]Og%vXz%vX!T%vX!U%vX!W%vX{%vX~Og%_Oz%`O!T%dO!U%cO~Og%_O~Oz%gO!T%dO!U%cO!W&SX~O!W%kO~Oz%lO{%nO!T%dO!U%cO![%}X~O![%rO~O![%sO~OQ#XO%`#XO%a%uO~OV%wOo0cOv0qO!PrO~P'vOQ#^OR#[O%`#^O%a%zO~OV!qa_!qaa!qah!qak!qal!qam!qan!qao!qap!qas!qaz!qa{!qa!X!qa!f!qa!x!qa#g!qa%[!qa%_!qa%j!qa%k!qa%l!qa%m!qa%n!qa%o!qa%p!qa%q!qa%r!qa%s!qa%z!qag!qa!T!qa!U!qa%{!qa!W!qa![!qa!Q!qa#[!qat!qa!m!qa~P#yOz%|O{%ha!x%ha#g%ha%[%ha%_%ha%z%ha~P%SOV&OOopOvqO{%ha!x%ha#g%ha%[%ha%_%ha%z%ha~P'vOz%|O{%ha!x%ha#g%ha%[%ha%_%ha%z%ha~OPdOVaOopOvqO!PrO!Q{O!{tO!}uO#PvO#RwO#TxO#XyO#ZzO#^|O#_|O#a}O#c!OO#g$zX%[$zX%_$zX~P'vO#g#gO%[&TO%_&TO~O!f&UOh&sX%[&sXz&sX#[&sX#g&sX%_&sX#Z&sXg&sX~Oh!iO%[&WO~Okealeameaneaoeapeaseazea{ea!xea#gea%[ea%_ea%zeagea!Tea!Uea%{ea!Wea![ea!Qea#[eatea!mea~P%SOsqazqa{qa#gqa%[qa%_qa%zqa~Ok!pOl!qOm!oOn!oOo!rOp!sO!xqa~PEcO%z&YOz%yX{%yX~O%uWOz%yX{%yX~Oz&]O{wX~O{&_O~Oz%lO#g%}X%[%}X%_%}Xg%}X{%}X![%}X!m%}X%z%}X~OV0lOo0cOv0qO!PrO~P'vO%z#|O#gUa%[Ua%_Ua~Oz&hO#g&PX%[&PX%_&PXn&PX~P%SOz&kO!Q&jO#g#Wa%[#Wa%_#Wa~Oz&lO#[&nO#g&rX%[&rX%_&rXg&rX~O!f$YO!r$YO#Z&qO%uWO~O#Z&qO~Oz&sO#g&tX%[&tX%_&tX~Oz&uO#g&pX%[&pX%_&pX{&pX~O!X&wO%z&xO~Oz&|On&wX~P%SOn'PO~OPdOVaOopOvqO!PrO!Q{O!{tO!}uO#PvO#RwO#TxO#XyO#ZzO#^|O#_|O#a}O#c!OO%['UO~P'vOt'YO#p'WO#q'XOP#naV#naf#nah#nao#nas#nav#na!P#na!Q#na!T#na!U#na!X#na!]#na!h#na!r#na!s#na!t#na!{#na!}#na#P#na#R#na#T#na#X#na#Z#na#^#na#_#na#a#na#c#na#l#na#o#na#s#na#u#na#z#na#}#na$P#na%X#na%o#na%p#na%t#na%u#na&Z#na&[#na&]#na&^#na&_#na&`#na&a#na&b#na&c#na&d#na&e#na&f#na&g#na&h#na&i#na&j#na%Z#na%_#na~Oz'ZO#[']O{&xX~Oh'_O!X&wO~Oh!iO{$jO!X&wO~O{'eO~P%SO%['hO%_'hO~OS'iO%['hO%_'hO~OV!aO_!aOa!bOh!iO!X!kO!f!mO%l!^O%m!_O%n!_O%o!`O%p!`O%q!aO%r!aO%s!aOkWilWimWinWioWipWisWizWi{Wi!xWi#gWi%[Wi%_Wi%jWi%zWigWi!TWi!UWi%{Wi!WWi![Wi!QWi#[WitWi!mWi~O%k!]O~P!#uO%kWi~P!#uOV!aO_!aOa!bOh!iO!X!kO!f!mO%o!`O%p!`O%q!aO%r!aO%s!aOkWilWimWinWioWipWisWizWi{Wi!xWi#gWi%[Wi%_Wi%jWi%kWi%lWi%zWigWi!TWi!UWi%{Wi!WWi![Wi!QWi#[WitWi!mWi~O%m!_O%n!_O~P!&pO%mWi%nWi~P!&pOa!bOh!iO!X!kO!f!mOkWilWimWinWioWipWisWizWi{Wi!xWi#gWi%[Wi%_Wi%jWi%kWi%lWi%mWi%nWi%oWi%pWi%zWigWi!TWi!UWi%{Wi!WWi![Wi!QWi#[WitWi!mWi~OV!aO_!aO%q!aO%r!aO%s!aO~P!)nOVWi_Wi%qWi%rWi%sWi~P!)nO!T%dO!U%cOg&VXz&VX~O%z'kO%{'kO~P,eOz'mOg&UX~Og'oO~Oz'pO{'rO!W&XX~Oo0cOv0qOz'pO{'sO!W&XX~P'vO!W'uO~Om!oOn!oOo!rOp!sOkjisjizji{ji!xji#gji%[ji%_ji%zji~Ol!qO~P!.aOlji~P!.aOk0eOl0fOm0dOn0dOo0mOp0nO~Ot'wO~P!/jOV'|Og'}Oo0cOv0qO~P'vOg'}Oz(OO~Og(QO~O!U(SO~Og(TOz(OO!T%dO!U%cO~P%SOk0eOl0fOm0dOn0dOo0mOp0nOgqa!Tqa!Uqa%{qa!Wqa![qa!Qqa#[qatqa!mqa~PEcOV'|Oo0cOv0qO!W&Sa~P'vOz(WO!W&Sa~O!W(XO~Oz(WO!T%dO!U%cO!W&Sa~P%SOV(]Oo0cOv0qO![%}a#g%}a%[%}a%_%}ag%}a{%}a!m%}a%z%}a~P'vOz(^O![%}a#g%}a%[%}a%_%}ag%}a{%}a!m%}a%z%}a~O![(aO~Oz(^O!T%dO!U%cO![%}a~P%SOz(dO!T%dO!U%cO![&Ta~P%SOz(gO{&lX![&lX!m&lX%z&lX~O{(kO![(mO!m(nO%z(jO~OV&OOopOvqO{%hi!x%hi#g%hi%[%hi%_%hi%z%hi~P'vOz(pO{%hi!x%hi#g%hi%[%hi%_%hi%z%hi~O!f&UOh&sa%[&saz&sa#[&sa#g&sa%_&sa#Z&sag&sa~O%[(uO~OV#sOa#tO%uWO~Oz&]O{wa~OopOvqO~P'vOz(^O#g%}a%[%}a%_%}ag%}a{%}a![%}a!m%}a%z%}a~P%SOz(zO#g%hX%[%hX%_%hX%z%hX~O%z#|O#gUi%[Ui%_Ui~O#g&Pa%[&Pa%_&Pan&Pa~P'vOz(}O#g&Pa%[&Pa%_&Pan&Pa~O%uWO#g&ra%[&ra%_&rag&ra~Oz)SO#g&ra%[&ra%_&rag&ra~Og)VO~OV)WOh$WO%uWO~O#Z)XO~O%uWO#g&ta%[&ta%_&ta~Oz)ZO#g&ta%[&ta%_&ta~Oo0cOv0qO#g&pa%[&pa%_&pa{&pa~P'vOz)^O#g&pa%[&pa%_&pa{&pa~OV)`Oa)`O%uWO~O%z)eO~Ot)hO#j)gOP#hiV#hif#hih#hio#his#hiv#hi!P#hi!Q#hi!T#hi!U#hi!X#hi!]#hi!h#hi!r#hi!s#hi!t#hi!{#hi!}#hi#P#hi#R#hi#T#hi#X#hi#Z#hi#^#hi#_#hi#a#hi#c#hi#l#hi#o#hi#s#hi#u#hi#z#hi#}#hi$P#hi%X#hi%o#hi%p#hi%t#hi%u#hi&Z#hi&[#hi&]#hi&^#hi&_#hi&`#hi&a#hi&b#hi&c#hi&d#hi&e#hi&f#hi&g#hi&h#hi&i#hi&j#hi%Z#hi%_#hi~Ot)iOP#kiV#kif#kih#kio#kis#kiv#ki!P#ki!Q#ki!T#ki!U#ki!X#ki!]#ki!h#ki!r#ki!s#ki!t#ki!{#ki!}#ki#P#ki#R#ki#T#ki#X#ki#Z#ki#^#ki#_#ki#a#ki#c#ki#l#ki#o#ki#s#ki#u#ki#z#ki#}#ki$P#ki%X#ki%o#ki%p#ki%t#ki%u#ki&Z#ki&[#ki&]#ki&^#ki&_#ki&`#ki&a#ki&b#ki&c#ki&d#ki&e#ki&f#ki&g#ki&h#ki&i#ki&j#ki%Z#ki%_#ki~OV)kOn&wa~P'vOz)lOn&wa~Oz)lOn&wa~P%SOn)pO~O%Y)tO~Ot)wO#p'WO#q)vOP#niV#nif#nih#nio#nis#niv#ni!P#ni!Q#ni!T#ni!U#ni!X#ni!]#ni!h#ni!r#ni!s#ni!t#ni!{#ni!}#ni#P#ni#R#ni#T#ni#X#ni#Z#ni#^#ni#_#ni#a#ni#c#ni#l#ni#o#ni#s#ni#u#ni#z#ni#}#ni$P#ni%X#ni%o#ni%p#ni%t#ni%u#ni&Z#ni&[#ni&]#ni&^#ni&_#ni&`#ni&a#ni&b#ni&c#ni&d#ni&e#ni&f#ni&g#ni&h#ni&i#ni&j#ni%Z#ni%_#ni~OV)zOo0cOv0qO{$jO~P'vOo0cOv0qO{&xa~P'vOz*OO{&xa~OV*SOa*TOg*WO%q*UO%uWO~O{$jO&{*YO~Oh'_O~Oh!iO{$jO~O%[*_O~O%[*aO%_*aO~OV$}Oa$}Oo0cOv0qOg&Ua~P'vOz*dOg&Ua~Oo0cOv0qO{*gO!W&Xa~P'vOz*hO!W&Xa~Oo0cOv0qOz*hO{*kO!W&Xa~P'vOo0cOv0qOz*hO!W&Xa~P'vOz*hO{*kO!W&Xa~Om0dOn0dOo0mOp0nOgjikjisjizji!Tji!Uji%{ji!Wji{ji![ji#gji%[ji%_ji!Qji#[jitji!mji%zji~Ol0fO~P!NkOlji~P!NkOV'|Og*pOo0cOv0qO~P'vOn*rO~Og*pOz*tO~Og*uO~OV'|Oo0cOv0qO!W&Si~P'vOz*vO!W&Si~O!W*wO~OV(]Oo0cOv0qO![%}i#g%}i%[%}i%_%}ig%}i{%}i!m%}i%z%}i~P'vOz*zO!T%dO!U%cO![&Ti~Oz*}O![%}i#g%}i%[%}i%_%}ig%}i{%}i!m%}i%z%}i~O![+OO~Oa+QOo0cOv0qO![&Ti~P'vOz*zO![&Ti~O![+SO~OV+UOo0cOv0qO{&la![&la!m&la%z&la~P'vOz+VO{&la![&la!m&la%z&la~O!]+YO&n+[O![!nX~O![+^O~O{(kO![+_O~O{(kO![+_O!m+`O~OV&OOopOvqO{%hq!x%hq#g%hq%[%hq%_%hq%z%hq~P'vOz$ri{$ri!x$ri#g$ri%[$ri%_$ri%z$ri~P%SOV&OOopOvqO~P'vOV&OOo0cOv0qO#g%ha%[%ha%_%ha%z%ha~P'vOz+aO#g%ha%[%ha%_%ha%z%ha~Oz$ia#g$ia%[$ia%_$ian$ia~P%SO#g&Pi%[&Pi%_&Pin&Pi~P'vOz+dO#g#Wq%[#Wq%_#Wq~O#[+eOz$va#g$va%[$va%_$vag$va~O%uWO#g&ri%[&ri%_&rig&ri~Oz+gO#g&ri%[&ri%_&rig&ri~OV+iOh$WO%uWO~O%uWO#g&ti%[&ti%_&ti~Oo0cOv0qO#g&pi%[&pi%_&pi{&pi~P'vO{#{Oz#eX!W#eX~Oz+mO!W&uX~O!W+oO~Ot+rO#j)gOP#hqV#hqf#hqh#hqo#hqs#hqv#hq!P#hq!Q#hq!T#hq!U#hq!X#hq!]#hq!h#hq!r#hq!s#hq!t#hq!{#hq!}#hq#P#hq#R#hq#T#hq#X#hq#Z#hq#^#hq#_#hq#a#hq#c#hq#l#hq#o#hq#s#hq#u#hq#z#hq#}#hq$P#hq%X#hq%o#hq%p#hq%t#hq%u#hq&Z#hq&[#hq&]#hq&^#hq&_#hq&`#hq&a#hq&b#hq&c#hq&d#hq&e#hq&f#hq&g#hq&h#hq&i#hq&j#hq%Z#hq%_#hq~On$|az$|a~P%SOV)kOn&wi~P'vOz+yOn&wi~Oz,TO{$jO#[,TO~O#q,VOP#nqV#nqf#nqh#nqo#nqs#nqv#nq!P#nq!Q#nq!T#nq!U#nq!X#nq!]#nq!h#nq!r#nq!s#nq!t#nq!{#nq!}#nq#P#nq#R#nq#T#nq#X#nq#Z#nq#^#nq#_#nq#a#nq#c#nq#l#nq#o#nq#s#nq#u#nq#z#nq#}#nq$P#nq%X#nq%o#nq%p#nq%t#nq%u#nq&Z#nq&[#nq&]#nq&^#nq&_#nq&`#nq&a#nq&b#nq&c#nq&d#nq&e#nq&f#nq&g#nq&h#nq&i#nq&j#nq%Z#nq%_#nq~O#[,WOz%Oa{%Oa~Oo0cOv0qO{&xi~P'vOz,YO{&xi~O{#{O%z,[Og&zXz&zX~O%uWOg&zXz&zX~Oz,`Og&yX~Og,bO~O%Y,eO~O!T%dO!U%cOg&Viz&Vi~OV$}Oa$}Oo0cOv0qOg&Ui~P'vO{,hOz$la!W$la~Oo0cOv0qO{,iOz$la!W$la~P'vOo0cOv0qO{*gO!W&Xi~P'vOz,lO!W&Xi~Oo0cOv0qOz,lO!W&Xi~P'vOz,lO{,oO!W&Xi~Og$hiz$hi!W$hi~P%SOV'|Oo0cOv0qO~P'vOn,qO~OV'|Og,rOo0cOv0qO~P'vOV'|Oo0cOv0qO!W&Sq~P'vOz$gi![$gi#g$gi%[$gi%_$gig$gi{$gi!m$gi%z$gi~P%SOV(]Oo0cOv0qO~P'vOa+QOo0cOv0qO![&Tq~P'vOz,sO![&Tq~O![,tO~OV(]Oo0cOv0qO![%}q#g%}q%[%}q%_%}qg%}q{%}q!m%}q%z%}q~P'vO{,uO~OV+UOo0cOv0qO{&li![&li!m&li%z&li~P'vOz,zO{&li![&li!m&li%z&li~O!]+YO&n+[O![!na~O{(kO![,}O~OV&OOo0cOv0qO#g%hi%[%hi%_%hi%z%hi~P'vOz-OO#g%hi%[%hi%_%hi%z%hi~O%uWO#g&rq%[&rq%_&rqg&rq~Oz-RO#g&rq%[&rq%_&rqg&rq~OV)`Oa)`O%uWO!W&ua~Oz-TO!W&ua~On$|iz$|i~P%SOV)kO~P'vOV)kOn&wq~P'vOt-XOP#myV#myf#myh#myo#mys#myv#my!P#my!Q#my!T#my!U#my!X#my!]#my!h#my!r#my!s#my!t#my!{#my!}#my#P#my#R#my#T#my#X#my#Z#my#^#my#_#my#a#my#c#my#l#my#o#my#s#my#u#my#z#my#}#my$P#my%X#my%o#my%p#my%t#my%u#my&Z#my&[#my&]#my&^#my&_#my&`#my&a#my&b#my&c#my&d#my&e#my&f#my&g#my&h#my&i#my&j#my%Z#my%_#my~O%Z-]O%_-]O~P`O#q-^OP#nyV#nyf#nyh#nyo#nys#nyv#ny!P#ny!Q#ny!T#ny!U#ny!X#ny!]#ny!h#ny!r#ny!s#ny!t#ny!{#ny!}#ny#P#ny#R#ny#T#ny#X#ny#Z#ny#^#ny#_#ny#a#ny#c#ny#l#ny#o#ny#s#ny#u#ny#z#ny#}#ny$P#ny%X#ny%o#ny%p#ny%t#ny%u#ny&Z#ny&[#ny&]#ny&^#ny&_#ny&`#ny&a#ny&b#ny&c#ny&d#ny&e#ny&f#ny&g#ny&h#ny&i#ny&j#ny%Z#ny%_#ny~Oz-aO{$jO#[-aO~Oo0cOv0qO{&xq~P'vOz-dO{&xq~O%z,[Og&zaz&za~O{#{Og&zaz&za~OV*SOa*TO%q*UO%uWOg&ya~Oz-hOg&ya~O$S-lO~OV$}Oa$}Oo0cOv0qO~P'vOo0cOv0qO{-mOz$li!W$li~P'vOo0cOv0qOz$li!W$li~P'vO{-mOz$li!W$li~Oo0cOv0qO{*gO~P'vOo0cOv0qO{*gO!W&Xq~P'vOz-pO!W&Xq~Oo0cOv0qOz-pO!W&Xq~P'vOs-sO!T%dO!U%cOg&Oq!W&Oq![&Oqz&Oq~P!/jOa+QOo0cOv0qO![&Ty~P'vOz$ji![$ji~P%SOa+QOo0cOv0qO~P'vOV+UOo0cOv0qO~P'vOV+UOo0cOv0qO{&lq![&lq!m&lq%z&lq~P'vO{(kO![-xO!m-yO%z-wO~OV&OOo0cOv0qO#g%hq%[%hq%_%hq%z%hq~P'vO%uWO#g&ry%[&ry%_&ryg&ry~OV)`Oa)`O%uWO!W&ui~Ot-}OP#m!RV#m!Rf#m!Rh#m!Ro#m!Rs#m!Rv#m!R!P#m!R!Q#m!R!T#m!R!U#m!R!X#m!R!]#m!R!h#m!R!r#m!R!s#m!R!t#m!R!{#m!R!}#m!R#P#m!R#R#m!R#T#m!R#X#m!R#Z#m!R#^#m!R#_#m!R#a#m!R#c#m!R#l#m!R#o#m!R#s#m!R#u#m!R#z#m!R#}#m!R$P#m!R%X#m!R%o#m!R%p#m!R%t#m!R%u#m!R&Z#m!R&[#m!R&]#m!R&^#m!R&_#m!R&`#m!R&a#m!R&b#m!R&c#m!R&d#m!R&e#m!R&f#m!R&g#m!R&h#m!R&i#m!R&j#m!R%Z#m!R%_#m!R~Oo0cOv0qO{&xy~P'vOV*SOa*TO%q*UO%uWOg&yi~O$S-lO%Z.VO%_.VO~OV.aOh._O!X.^O!].`O!h.YO!s.[O!t.[O%p.XO%uWO&Z]O&[]O&]]O&^]O&_]O&`]O&a]O&b]O~Oo0cOv0qOz$lq!W$lq~P'vO{.fOz$lq!W$lq~Oo0cOv0qO{*gO!W&Xy~P'vOz.gO!W&Xy~Oo0cOv.kO~P'vOs-sO!T%dO!U%cOg&Oy!W&Oy![&Oyz&Oy~P!/jO{(kO![.nO~O{(kO![.nO!m.oO~OV*SOa*TO%q*UO%uWO~Oh.tO!f.rOz$TX#[$TX%j$TXg$TX~Os$TX{$TX!W$TX![$TX~P$-bO%o.vO%p.vOs$UXz$UX{$UX#[$UX%j$UX!W$UXg$UX![$UX~O!h.xO~Oz.|O#[/OO%j.yOs&|X{&|X!W&|Xg&|X~Oa/RO~P$)zOh.tOs&}Xz&}X{&}X#[&}X%j&}X!W&}Xg&}X![&}X~Os/VO{$jO~Oo0cOv0qOz$ly!W$ly~P'vOo0cOv0qO{*gO!W&X!R~P'vOz/ZO!W&X!R~Og&RXs&RX!T&RX!U&RX!W&RX![&RXz&RX~P!/jOs-sO!T%dO!U%cOg&Qa!W&Qa![&Qaz&Qa~O{(kO![/^O~O!f.rOh$[as$[az$[a{$[a#[$[a%j$[a!W$[ag$[a![$[a~O!h/eO~O%o.vO%p.vOs$Uaz$Ua{$Ua#[$Ua%j$Ua!W$Uag$Ua![$Ua~O%j.yOs$Yaz$Ya{$Ya#[$Ya!W$Yag$Ya![$Ya~Os&|a{&|a!W&|ag&|a~P$)nOz/jOs&|a{&|a!W&|ag&|a~O!W/mO~Og/mO~O{/oO~O![/pO~Oo0cOv0qO{*gO!W&X!Z~P'vO{/sO~O%z/tO~P$-bOz/uO#[/OO%j.yOg'PX~Oz/uOg'PX~Og/wO~O!h/xO~O#[/OOs%Saz%Sa{%Sa%j%Sa!W%Sag%Sa![%Sa~O#[/OO%j.yOs%Waz%Wa{%Wa!W%Wag%Wa~Os&|i{&|i!W&|ig&|i~P$)nOz/zO#[/OO%j.yO!['Oa~Og'Pa~P$)nOz0SOg'Pa~Oa0UO!['Oi~P$)zOz0WO!['Oi~Oz0WO#[/OO%j.yO!['Oi~O#[/OO%j.yOg$biz$bi~O%z0ZO~P$-bO#[/OO%j.yOg%Vaz%Va~Og'Pi~P$)nO{0^O~Oa0UO!['Oq~P$)zOz0`O!['Oq~O#[/OO%j.yOz%Ui![%Ui~Oa0UO~P$)zOa0UO!['Oy~P$)zO#[/OO%j.yOg$ciz$ci~O#[/OO%j.yOz%Uq![%Uq~Oz+aO#g%ha%[%ha%_%ha%z%ha~P%SOV&OOo0cOv0qO~P'vOn0hO~Oo0hO~P'vO{0iO~Ot0jO~P!/jO&]&Z&j&h&i&g&f&d&e&c&b&`&a&_&^&[%u~",
        goto: "!=j'QPPPPPP'RP'Z*s+[+t,_,y-fP.SP'Z.r.r'ZPPP'Z2[PPPPPP2[5PPP5PP7b7k=sPP=v>h>kPP'Z'ZPP>zPP'Z'ZPP'Z'Z'Z'Z'Z?O?w'ZP?zP@QDXGuGyPG|HWH['ZPPPH_Hk'RP'R'RP'RP'RP'RP'RP'R'R'RP'RPP'RPP'RP'RPHqH}IVPI^IdPI^PI^I^PPPI^PKrPK{LVL]KrPI^LfPI^PLmLsPLwM]MzNeLwLwNkNxLwLwLwLw! ^! d! g! l! o! y!!P!!]!!o!!u!#P!#V!#s!#y!$P!$Z!$a!$g!$y!%T!%Z!%a!%k!%q!%w!%}!&T!&Z!&e!&k!&u!&{!'U!'[!'k!'s!'}!(UPPPPPPPPPPP!([!(_!(e!(n!(x!)TPPPPPPPPPPPP!-u!/Z!3^!6oPP!6w!7W!7a!8Y!8P!8c!8i!8l!8o!8r!8z!9jPPPPPPPPPPPPPPPPP!9m!9q!9wP!:]!:a!:m!:v!;S!;j!;m!;p!;v!;|!<S!<VP!<_!<h!=d!=g]eOn#g$j)t,P'}`OTYZ[adnoprtxy}!P!Q!R!U!X!c!d!e!f!g!h!i!k!o!p!q!s!t!z#O#S#T#[#d#g#x#y#{#}$Q$e$g$h$j$q$}%S%Z%^%`%c%g%l%n%w%|&O&Z&_&h&j&k&u&x&|'P'W'Z'l'm'p'r's'w'|(O(S(W(](^(d(g(p(r(z(})^)e)g)k)l)p)t)z*O*Y*d*g*h*k*q*r*t*v*y*z*}+Q+U+V+Y+a+c+d+k+x+y,P,X,Y,],g,h,i,k,l,o,q,s,u,w,y,z-O-d-f-m-p-s.f.g/V/Z/s0c0d0e0f0h0i0j0k0l0n0r{!cQ#c#p$R$d$p%e%j%p%q&`'O'g(q(|)j*o*x+w,v0g}!dQ#c#p$R$d$p$u%e%j%p%q&`'O'g(q(|)j*o*x+w,v0g!P!eQ#c#p$R$d$p$u$v%e%j%p%q&`'O'g(q(|)j*o*x+w,v0g!R!fQ#c#p$R$d$p$u$v$w%e%j%p%q&`'O'g(q(|)j*o*x+w,v0g!T!gQ#c#p$R$d$p$u$v$w$x%e%j%p%q&`'O'g(q(|)j*o*x+w,v0g!V!hQ#c#p$R$d$p$u$v$w$x$y%e%j%p%q&`'O'g(q(|)j*o*x+w,v0g!Z!hQ!n#c#p$R$d$p$u$v$w$x$y$z%e%j%p%q&`'O'g(q(|)j*o*x+w,v0g'}TOTYZ[adnoprtxy}!P!Q!R!U!X!c!d!e!f!g!h!i!k!o!p!q!s!t!z#O#S#T#[#d#g#x#y#{#}$Q$e$g$h$j$q$}%S%Z%^%`%c%g%l%n%w%|&O&Z&_&h&j&k&u&x&|'P'W'Z'l'm'p'r's'w'|(O(S(W(](^(d(g(p(r(z(})^)e)g)k)l)p)t)z*O*Y*d*g*h*k*q*r*t*v*y*z*}+Q+U+V+Y+a+c+d+k+x+y,P,X,Y,],g,h,i,k,l,o,q,s,u,w,y,z-O-d-f-m-p-s.f.g/V/Z/s0c0d0e0f0h0i0j0k0l0n0r&eVOYZ[dnprxy}!P!Q!U!i!k!o!p!q!s!t#[#d#g#y#{#}$Q$h$j$}%S%Z%^%`%g%l%n%w%|&Z&_&j&k&u&x'P'W'Z'l'm'p'r's'w(O(W(^(d(g(p(r(z)^)e)g)p)t)z*O*Y*d*g*h*k*q*r*t*v*y*z*}+U+V+Y+a+d+k,P,X,Y,],g,h,i,k,l,o,q,s,u,w,y,z-O-d-f-m-p-s.f.g/V/Z/s0c0d0e0f0h0i0j0k0n0r%oXOYZ[dnrxy}!P!Q!U!i!k#[#d#g#y#{#}$Q$h$j$}%S%^%`%g%l%n%w%|&Z&_&j&k&u&x'P'W'Z'l'm'p'r's'w(O(W(^(d(g(p(r(z)^)e)g)p)t)z*O*Y*d*g*h*k*q*t*v*y*z*}+U+V+Y+a+d+k,P,X,Y,],g,h,i,k,l,o,s,u,w,y,z-O-d-f-m-p.f.g/V/Z0i0j0kQ#vqQ/[.kR0o0q't`OTYZ[adnoprtxy}!P!Q!R!U!X!c!d!e!f!g!h!k!o!p!q!s!t!z#O#S#T#[#d#g#x#y#{#}$Q$e$g$h$j$q$}%S%Z%^%`%c%g%l%n%w%|&O&Z&_&h&j&k&u&x&|'P'W'Z'l'p'r's'w'|(O(S(W(](^(d(g(p(r(z(})^)e)g)k)l)p)t)z*O*Y*g*h*k*q*r*t*v*y*z*}+Q+U+V+Y+a+c+d+k+x+y,P,X,Y,],h,i,k,l,o,q,s,u,w,y,z-O-d-f-m-p-s.f.g/V/Z/s0c0d0e0f0h0i0j0k0l0n0rh#jhz{$W$Z&l&q)S)X+f+g-RW#rq&].k0qQ$]|Q$a!OQ$n!VQ$o!WW$|!i'm*d,gS&[#s#tQ'S$iQ(s&UQ)U&nU)Y&s)Z+jW)a&w+m-T-{Q*Q']W*R'_,`-h.TQ+l)`S,_*S*TQ-Q+eQ-_,TQ-c,WQ.R-al.W-l.^._.a.z.|/R/j/o/t/y0U0Z0^Q/S.`Q/a.tQ/l/OU0P/u0S0[X0V/z0W0_0`R&Z#r!_!wYZ!P!Q!k%S%`%g'p'r's(O(W)g*g*h*k*q*t*v,h,i,k,l,o-m-p.f.g/ZR%^!vQ!{YQ%x#[Q&d#}Q&g$QR,{+YT.j-s/s!Y!jQ!n#c#p$R$d$p$u$v$w$x$y$z%e%j%p%q&`'O'g(q(|)j*o*x+w,v0gQ&X#kQ'c$oR*^'dR'l$|Q%V!mR/_.r'|_OTYZ[adnoprtxy}!P!Q!R!U!X!c!d!e!f!g!h!i!k!o!p!q!s!t!z#O#S#T#[#d#g#x#y#{#}$Q$e$g$h$j$q$}%S%Z%^%`%c%g%l%n%w%|&O&Z&_&h&j&k&u&x&|'P'W'Z'l'm'p'r's'w'|(O(S(W(](^(d(g(p(r(z(})^)e)g)k)l)p)t)z*O*Y*d*g*h*k*q*r*t*v*y*z*}+Q+U+V+Y+a+c+d+k+x+y,P,X,Y,],g,h,i,k,l,o,q,s,u,w,y,z-O-d-f-m-p-s.f.g/V/Z/s0c0d0e0f0h0i0j0k0l0n0rS#a_#b!P.[-l.^._.`.a.t.z.|/R/j/o/t/u/y/z0S0U0W0Z0[0^0_0`'|_OTYZ[adnoprtxy}!P!Q!R!U!X!c!d!e!f!g!h!i!k!o!p!q!s!t!z#O#S#T#[#d#g#x#y#{#}$Q$e$g$h$j$q$}%S%Z%^%`%c%g%l%n%w%|&O&Z&_&h&j&k&u&x&|'P'W'Z'l'm'p'r's'w'|(O(S(W(](^(d(g(p(r(z(})^)e)g)k)l)p)t)z*O*Y*d*g*h*k*q*r*t*v*y*z*}+Q+U+V+Y+a+c+d+k+x+y,P,X,Y,],g,h,i,k,l,o,q,s,u,w,y,z-O-d-f-m-p-s.f.g/V/Z/s0c0d0e0f0h0i0j0k0l0n0rT#a_#bT#^^#_R(o%xa(l%x(n(o+`,{-y-z.oT+[(k+]R-z,{Q$PsQ+l)aQ,^*RR-e,_X#}s$O$P&fQ&y$aQ'a$nQ'd$oR)s'SQ)b&wV-S+m-T-{ZgOn$j)t,PXkOn)t,PQ$k!TQ&z$bQ&{$cQ'^$mQ'b$oQ)q'RQ)x'WQ){'XQ)|'YQ*Z'`S*]'c'dQ+s)gQ+u)hQ+v)iQ+z)oS+|)r*[Q,Q)vQ,R)wS,S)y)zQ,d*^Q-V+rQ-W+tQ-Y+{S-Z+},OQ-`,UQ-b,VQ-|-XQ.O-[Q.P-^Q.Q-_Q.p-}Q.q.RQ/W.dR/r/XWkOn)t,PR#mjQ'`$nS)r'S'aR,O)sQ,]*RR-f,^Q*['`Q+})rR-[,OZiOjn)t,PQ'f$pR*`'gT-j,e-ku.c-l.^._.a.t.z.|/R/j/o/t/u/y0S0U0Z0[0^t.c-l.^._.a.t.z.|/R/j/o/t/u/y0S0U0Z0[0^Q/S.`X0V/z0W0_0`!P.Z-l.^._.`.a.t.z.|/R/j/o/t/u/y/z0S0U0W0Z0[0^0_0`Q.w.YR/f.xg.z.].{/b/i/n/|0O0Q0]0a0bu.b-l.^._.a.t.z.|/R/j/o/t/u/y0S0U0Z0[0^X.u.W.b/a0PR/c.tV0R/u0S0[R/X.dQnOS#on,PR,P)tQ&^#uR(x&^S%m#R#wS(_%m(bT(b%p&`Q%a!yQ%h!}W(P%a%h(U(YQ(U%eR(Y%jQ&i$RR)O&iQ(e%qQ*{(`T+R(e*{Q'n%OR*e'nS'q%R%SY*i'q*j,m-q.hU*j'r's'tU,m*k*l*mS-q,n,oR.h-rQ#Y]R%t#YQ#_^R%y#_Q(h%vS+W(h+XR+X(iQ+](kR,|+]Q#b_R%{#bQ#ebQ%}#cW&Q#e%}({+bQ({&cR+b0gQ$OsS&e$O&fR&f$PQ&v$_R)_&vQ&V#jR(t&VQ&m$VS)T&m+hR+h)UQ$Z{R&p$ZQ&t$]R)[&tQ+n)bR-U+nQ#hfR&S#hQ)f&zR+q)fQ&}$dS)m&})nR)n'OQ'V$kR)u'VQ'[$lS*P'[,ZR,Z*QQ,a*VR-i,aWjOn)t,PR#ljQ-k,eR.U-kd.{.]/b/i/n/|0O0Q0]0a0bR/h.{U.s.W/a0PR/`.sQ/{/nS0X/{0YR0Y/|S/v/b/cR0T/vQ.}.]R/k.}R!ZPXmOn)t,PWlOn)t,PR'T$jYfOn$j)t,PR&R#g[sOn#g$j)t,PR&d#}&dQOYZ[dnprxy}!P!Q!U!i!k!o!p!q!s!t#[#d#g#y#{#}$Q$h$j$}%S%Z%^%`%g%l%n%w%|&Z&_&j&k&u&x'P'W'Z'l'm'p'r's'w(O(W(^(d(g(p(r(z)^)e)g)p)t)z*O*Y*d*g*h*k*q*r*t*v*y*z*}+U+V+Y+a+d+k,P,X,Y,],g,h,i,k,l,o,q,s,u,w,y,z-O-d-f-m-p-s.f.g/V/Z/s0c0d0e0f0h0i0j0k0n0rQ!nTQ#caQ#poU$Rt%c(SS$d!R$gQ$p!XQ$u!cQ$v!dQ$w!eQ$x!fQ$y!gQ$z!hQ%e!zQ%j#OQ%p#SQ%q#TQ&`#xQ'O$eQ'g$qQ(q&OU(|&h(}+cW)j&|)l+x+yQ*o'|Q*x(]Q+w)kQ,v+QR0g0lQ!yYQ!}ZQ$b!PQ$c!QQ%R!kQ't%S^'{%`%g(O(W*q*t*v^*f'p*h,k,l-p.g/ZQ*l'rQ*m'sQ+t)gQ,j*gQ,n*kQ-n,hQ-o,iQ-r,oQ.e-mR/Y.f[bOn#g$j)t,P!^!vYZ!P!Q!k%S%`%g'p'r's(O(W)g*g*h*k*q*t*v,h,i,k,l,o-m-p.f.g/ZQ#R[Q#fdS#wrxQ$UyW$_}$Q'P)pS$l!U$hW${!i'm*d,gS%v#[+Y`&P#d%|(p(r(z+a-O0kQ&a#yQ&b#{Q&c#}Q'j$}Q'z%^W([%l(^*y*}Q(`%nQ(i%wQ(v&ZS(y&_0iQ)P&jQ)Q&kU)]&u)^+kQ)d&xQ)y'WY)}'Z*O,X,Y-dQ*b'lS*n'w0jW+P(d*z,s,wW+T(g+V,y,zQ+p)eQ,U)zQ,c*YQ,x+UQ-P+dQ-e,]Q-v,uQ.S-fR/q/VhUOn#d#g$j%|&_'w(p(r)t,P%U!uYZ[drxy}!P!Q!U!i!k#[#y#{#}$Q$h$}%S%^%`%g%l%n%w&Z&j&k&u&x'P'W'Z'l'm'p'r's(O(W(^(d(g(z)^)e)g)p)z*O*Y*d*g*h*k*q*t*v*y*z*}+U+V+Y+a+d+k,X,Y,],g,h,i,k,l,o,s,u,w,y,z-O-d-f-m-p.f.g/V/Z0i0j0kQ#qpW%W!o!s0d0nQ%X!pQ%Y!qQ%[!tQ%f0cS'v%Z0hQ'x0eQ'y0fQ,p*rQ-u,qS.i-s/sR0p0rU#uq.k0qR(w&][cOn#g$j)t,PZ!xY#[#}$Q+YQ#W[Q#zrR$TxQ%b!yQ%i!}Q%o#RQ'j${Q(V%eQ(Z%jQ(c%pQ(f%qQ*|(`Q,f*bQ-t,pQ.m-uR/].lQ$StQ(R%cR*s(SQ.l-sR/}/sR#QZR#V[R%Q!iQ%O!iV*c'm*d,g!Z!lQ!n#c#p$R$d$p$u$v$w$x$y$z%e%j%p%q&`'O'g(q(|)j*o*x+w,v0gR%T!kT#]^#_Q%x#[R,{+YQ(m%xS+_(n(oQ,}+`Q-x,{S.n-y-zR/^.oT+Z(k+]Q$`}Q&g$QQ)o'PR+{)pQ$XzQ)W&qR+i)XQ$XzQ&o$WQ)W&qR+i)XQ#khW$Vz$W&q)XQ$[{Q&r$ZZ)R&l)S+f+g-RR$^|R)c&wXlOn)t,PQ$f!RR'Q$gQ$m!UR'R$hR*X'_Q*V'_V-g,`-h.TQ.d-lQ/P.^R/Q._U.]-l.^._Q/U.aQ/b.tQ/g.zU/i.|/j/yQ/n/RQ/|/oQ0O/tU0Q/u0S0[Q0]0UQ0a0ZR0b0^R/T.`R/d.t",
        nodeNames: "\u26A0 print Escape { Comment Script AssignStatement * BinaryExpression BitOp BitOp BitOp BitOp ArithOp ArithOp @ ArithOp ** UnaryExpression ArithOp BitOp AwaitExpression await ) ( ParenthesizedExpression BinaryExpression or and CompareOp in not is UnaryExpression ConditionalExpression if else LambdaExpression lambda ParamList VariableName AssignOp , : NamedExpression AssignOp YieldExpression yield from TupleExpression ComprehensionExpression async for LambdaExpression ] [ ArrayExpression ArrayComprehensionExpression } { DictionaryExpression DictionaryComprehensionExpression SetExpression SetComprehensionExpression CallExpression ArgList AssignOp MemberExpression . PropertyName Number String FormatString FormatReplacement FormatSelfDoc FormatConversion FormatSpec FormatReplacement FormatSelfDoc ContinuedString Ellipsis None Boolean TypeDef AssignOp UpdateStatement UpdateOp ExpressionStatement DeleteStatement del PassStatement pass BreakStatement break ContinueStatement continue ReturnStatement return YieldStatement PrintStatement RaiseStatement raise ImportStatement import as ScopeStatement global nonlocal AssertStatement assert TypeDefinition type TypeParamList TypeParam StatementGroup ; IfStatement Body elif WhileStatement while ForStatement TryStatement try except finally WithStatement with FunctionDefinition def ParamList AssignOp TypeDef ClassDefinition class DecoratedStatement Decorator At MatchStatement match MatchBody MatchClause case CapturePattern LiteralPattern ArithOp ArithOp AsPattern OrPattern LogicOp AttributePattern SequencePattern MappingPattern StarPattern ClassPattern PatternArgList KeywordPattern KeywordPattern Guard",
        maxTerm: 277,
        context: trackIndent,
        nodeProps: [
          ["isolate", -5, 4, 71, 72, 73, 77, ""],
          ["group", -15, 6, 85, 87, 88, 90, 92, 94, 96, 98, 99, 100, 102, 105, 108, 110, "Statement Statement", -22, 8, 18, 21, 25, 40, 49, 50, 56, 57, 60, 61, 62, 63, 64, 67, 70, 71, 72, 79, 80, 81, 82, "Expression", -10, 114, 116, 119, 121, 122, 126, 128, 133, 135, 138, "Statement", -9, 143, 144, 147, 148, 150, 151, 152, 153, 154, "Pattern"],
          ["openedBy", 23, "(", 54, "[", 58, "{"],
          ["closedBy", 24, ")", 55, "]", 59, "}"]
        ],
        propSources: [pythonHighlighting],
        skippedNodes: [0, 4],
        repeatNodeCount: 34,
        tokenData: "!2|~R!`OX%TXY%oY[%T[]%o]p%Tpq%oqr'ars)Yst*xtu%Tuv,dvw-hwx.Uxy/tyz0[z{0r{|2S|}2p}!O3W!O!P4_!P!Q:Z!Q!R;k!R![>_![!]Do!]!^Es!^!_FZ!_!`Gk!`!aHX!a!b%T!b!cIf!c!dJU!d!eK^!e!hJU!h!i!#f!i!tJU!t!u!,|!u!wJU!w!x!.t!x!}JU!}#O!0S#O#P&o#P#Q!0j#Q#R!1Q#R#SJU#S#T%T#T#UJU#U#VK^#V#YJU#Y#Z!#f#Z#fJU#f#g!,|#g#iJU#i#j!.t#j#oJU#o#p!1n#p#q!1s#q#r!2a#r#s!2f#s$g%T$g;'SJU;'S;=`KW<%lOJU`%YT&n`O#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%T`%lP;=`<%l%To%v]&n`%c_OX%TXY%oY[%T[]%o]p%Tpq%oq#O%T#O#P&o#P#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%To&tX&n`OY%TYZ%oZ]%T]^%o^#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Tc'f[&n`O!_%T!_!`([!`#T%T#T#U(r#U#f%T#f#g(r#g#h(r#h#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Tc(cTmR&n`O#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Tc(yT!mR&n`O#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Tk)aV&n`&[ZOr%Trs)vs#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Tk){V&n`Or%Trs*bs#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Tk*iT&n`&^ZO#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%To+PZS_&n`OY*xYZ%TZ]*x]^%T^#o*x#o#p+r#p#q*x#q#r+r#r;'S*x;'S;=`,^<%lO*x_+wTS_OY+rZ]+r^;'S+r;'S;=`,W<%lO+r_,ZP;=`<%l+ro,aP;=`<%l*xj,kV%rQ&n`O!_%T!_!`-Q!`#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Tj-XT!xY&n`O#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Tj-oV%lQ&n`O!_%T!_!`-Q!`#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Tk.]V&n`&ZZOw%Twx.rx#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Tk.wV&n`Ow%Twx/^x#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Tk/eT&n`&]ZO#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Tk/{ThZ&n`O#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Tc0cTgR&n`O#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Tk0yXVZ&n`Oz%Tz{1f{!_%T!_!`-Q!`#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Tk1mVaR&n`O!_%T!_!`-Q!`#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Tk2ZV%oZ&n`O!_%T!_!`-Q!`#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Tc2wTzR&n`O#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%To3_W%pZ&n`O!_%T!_!`-Q!`!a3w!a#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Td4OT&{S&n`O#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Tk4fX!fQ&n`O!O%T!O!P5R!P!Q%T!Q![6T![#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Tk5WV&n`O!O%T!O!P5m!P#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Tk5tT!rZ&n`O#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Ti6[a!hX&n`O!Q%T!Q![6T![!g%T!g!h7a!h!l%T!l!m9s!m#R%T#R#S6T#S#X%T#X#Y7a#Y#^%T#^#_9s#_#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Ti7fZ&n`O{%T{|8X|}%T}!O8X!O!Q%T!Q![8s![#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Ti8^V&n`O!Q%T!Q![8s![#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Ti8z]!hX&n`O!Q%T!Q![8s![!l%T!l!m9s!m#R%T#R#S8s#S#^%T#^#_9s#_#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Ti9zT!hX&n`O#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Tk:bX%qR&n`O!P%T!P!Q:}!Q!_%T!_!`-Q!`#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Tj;UV%sQ&n`O!_%T!_!`-Q!`#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Ti;ro!hX&n`O!O%T!O!P=s!P!Q%T!Q![>_![!d%T!d!e?q!e!g%T!g!h7a!h!l%T!l!m9s!m!q%T!q!rA]!r!z%T!z!{Bq!{#R%T#R#S>_#S#U%T#U#V?q#V#X%T#X#Y7a#Y#^%T#^#_9s#_#c%T#c#dA]#d#l%T#l#mBq#m#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Ti=xV&n`O!Q%T!Q![6T![#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Ti>fc!hX&n`O!O%T!O!P=s!P!Q%T!Q![>_![!g%T!g!h7a!h!l%T!l!m9s!m#R%T#R#S>_#S#X%T#X#Y7a#Y#^%T#^#_9s#_#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Ti?vY&n`O!Q%T!Q!R@f!R!S@f!S#R%T#R#S@f#S#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Ti@mY!hX&n`O!Q%T!Q!R@f!R!S@f!S#R%T#R#S@f#S#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%TiAbX&n`O!Q%T!Q!YA}!Y#R%T#R#SA}#S#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%TiBUX!hX&n`O!Q%T!Q!YA}!Y#R%T#R#SA}#S#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%TiBv]&n`O!Q%T!Q![Co![!c%T!c!iCo!i#R%T#R#SCo#S#T%T#T#ZCo#Z#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%TiCv]!hX&n`O!Q%T!Q![Co![!c%T!c!iCo!i#R%T#R#SCo#S#T%T#T#ZCo#Z#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%ToDvV{_&n`O!_%T!_!`E]!`#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%TcEdT%{R&n`O#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%TkEzT#gZ&n`O#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%TkFbXmR&n`O!^%T!^!_F}!_!`([!`!a([!a#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%TjGUV%mQ&n`O!_%T!_!`-Q!`#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%TkGrV%zZ&n`O!_%T!_!`([!`#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%TkH`WmR&n`O!_%T!_!`([!`!aHx!a#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%TjIPV%nQ&n`O!_%T!_!`-Q!`#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%TkIoV_Q#}P&n`O!_%T!_!`-Q!`#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%ToJ_]&n`&YS%uZO!Q%T!Q![JU![!c%T!c!}JU!}#R%T#R#SJU#S#T%T#T#oJU#p#q%T#r$g%T$g;'SJU;'S;=`KW<%lOJUoKZP;=`<%lJUoKge&n`&YS%uZOr%Trs)Ysw%Twx.Ux!Q%T!Q![JU![!c%T!c!tJU!t!uLx!u!}JU!}#R%T#R#SJU#S#T%T#T#fJU#f#gLx#g#oJU#p#q%T#r$g%T$g;'SJU;'S;=`KW<%lOJUoMRa&n`&YS%uZOr%TrsNWsw%Twx! vx!Q%T!Q![JU![!c%T!c!}JU!}#R%T#R#SJU#S#T%T#T#oJU#p#q%T#r$g%T$g;'SJU;'S;=`KW<%lOJUkN_V&n`&`ZOr%TrsNts#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%TkNyV&n`Or%Trs! `s#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Tk! gT&n`&bZO#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Tk! }V&n`&_ZOw%Twx!!dx#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Tk!!iV&n`Ow%Twx!#Ox#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Tk!#VT&n`&aZO#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%To!#oe&n`&YS%uZOr%Trs!%Qsw%Twx!&px!Q%T!Q![JU![!c%T!c!tJU!t!u!(`!u!}JU!}#R%T#R#SJU#S#T%T#T#fJU#f#g!(`#g#oJU#p#q%T#r$g%T$g;'SJU;'S;=`KW<%lOJUk!%XV&n`&dZOr%Trs!%ns#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Tk!%sV&n`Or%Trs!&Ys#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Tk!&aT&n`&fZO#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Tk!&wV&n`&cZOw%Twx!'^x#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Tk!'cV&n`Ow%Twx!'xx#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Tk!(PT&n`&eZO#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%To!(ia&n`&YS%uZOr%Trs!)nsw%Twx!+^x!Q%T!Q![JU![!c%T!c!}JU!}#R%T#R#SJU#S#T%T#T#oJU#p#q%T#r$g%T$g;'SJU;'S;=`KW<%lOJUk!)uV&n`&hZOr%Trs!*[s#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Tk!*aV&n`Or%Trs!*vs#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Tk!*}T&n`&jZO#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Tk!+eV&n`&gZOw%Twx!+zx#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Tk!,PV&n`Ow%Twx!,fx#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Tk!,mT&n`&iZO#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%To!-Vi&n`&YS%uZOr%TrsNWsw%Twx! vx!Q%T!Q![JU![!c%T!c!dJU!d!eLx!e!hJU!h!i!(`!i!}JU!}#R%T#R#SJU#S#T%T#T#UJU#U#VLx#V#YJU#Y#Z!(`#Z#oJU#p#q%T#r$g%T$g;'SJU;'S;=`KW<%lOJUo!.}a&n`&YS%uZOr%Trs)Ysw%Twx.Ux!Q%T!Q![JU![!c%T!c!}JU!}#R%T#R#SJU#S#T%T#T#oJU#p#q%T#r$g%T$g;'SJU;'S;=`KW<%lOJUk!0ZT!XZ&n`O#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Tc!0qT!WR&n`O#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%Tj!1XV%kQ&n`O!_%T!_!`-Q!`#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%T~!1sO!]~k!1zV%jR&n`O!_%T!_!`-Q!`#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%T~!2fO![~i!2mT%tX&n`O#o%T#p#q%T#r;'S%T;'S;=`%i<%lO%T",
        tokenizers: [legacyPrint, indentation, newlines, strings, 0, 1, 2, 3, 4],
        topRules: { "Script": [0, 5] },
        specialized: [{ term: 221, get: (value) => spec_identifier2[value] || -1 }],
        tokenPrec: 7668
      });
    }
  });

  // node_modules/@codemirror/autocomplete/dist/index.js
  function toSet(chars) {
    let flat = Object.keys(chars).join("");
    let words = /\w/.test(flat);
    if (words)
      flat = flat.replace(/\w/g, "");
    return `[${words ? "\\w" : ""}${flat.replace(/[^\w\s]/g, "\\$&")}]`;
  }
  function prefixMatch(options) {
    let first = /* @__PURE__ */ Object.create(null), rest = /* @__PURE__ */ Object.create(null);
    for (let { label } of options) {
      first[label[0]] = true;
      for (let i2 = 1; i2 < label.length; i2++)
        rest[label[i2]] = true;
    }
    let source = toSet(first) + toSet(rest) + "*$";
    return [new RegExp("^" + source), new RegExp(source)];
  }
  function completeFromList(list) {
    let options = list.map((o) => typeof o == "string" ? { label: o } : o);
    let [validFor, match] = options.every((o) => /^\w+$/.test(o.label)) ? [/\w*$/, /\w+$/] : prefixMatch(options);
    return (context) => {
      let token = context.matchBefore(match);
      return token || context.explicit ? { from: token ? token.from : context.pos, options, validFor } : null;
    };
  }
  function ifNotIn(nodes, source) {
    return (context) => {
      for (let pos = syntaxTree(context.state).resolveInner(context.pos, -1); pos; pos = pos.parent) {
        if (nodes.indexOf(pos.name) > -1)
          return null;
        if (pos.type.isTop)
          break;
      }
      return source(context);
    };
  }
  function fieldSelection(ranges, field) {
    return EditorSelection.create(ranges.filter((r) => r.field == field).map((r) => EditorSelection.range(r.from, r.to)));
  }
  function snippet(template) {
    let snippet2 = Snippet.parse(template);
    return (editor, completion, from, to) => {
      let { text, ranges } = snippet2.instantiate(editor.state, from);
      let { main } = editor.state.selection;
      let spec = {
        changes: { from, to: to == main.from ? main.to : to, insert: Text.of(text) },
        scrollIntoView: true,
        annotations: completion ? [pickedCompletion.of(completion), Transaction.userEvent.of("input.complete")] : void 0
      };
      if (ranges.length)
        spec.selection = fieldSelection(ranges, 0);
      if (ranges.some((r) => r.field > 0)) {
        let active = new ActiveSnippet(ranges, 0);
        let effects = spec.effects = [setActive.of(active)];
        if (editor.state.field(snippetState, false) === void 0)
          effects.push(StateEffect.appendConfig.of([snippetState, addSnippetKeymap, snippetPointerHandler, baseTheme2]));
      }
      editor.dispatch(editor.state.update(spec));
    };
  }
  function moveField(dir) {
    return ({ state, dispatch }) => {
      let active = state.field(snippetState, false);
      if (!active || dir < 0 && active.active == 0)
        return false;
      let next = active.active + dir, last2 = dir > 0 && !active.ranges.some((r) => r.field == next + dir);
      dispatch(state.update({
        selection: fieldSelection(active.ranges, next),
        effects: setActive.of(last2 ? null : new ActiveSnippet(active.ranges, next)),
        scrollIntoView: true
      }));
      return true;
    };
  }
  function snippetCompletion(template, completion) {
    return { ...completion, apply: snippet(template) };
  }
  var pickedCompletion, windows, baseTheme2, FieldPos, FieldRange, Snippet, fieldMarker, fieldRange, ActiveSnippet, setActive, moveToField, snippetState, clearSnippet, nextSnippetField, prevSnippetField, defaultSnippetKeymap, snippetKeymap, addSnippetKeymap, snippetPointerHandler, closedBracket, android;
  var init_dist10 = __esm({
    "node_modules/@codemirror/autocomplete/dist/index.js"() {
      init_dist();
      init_dist2();
      init_dist5();
      pickedCompletion = /* @__PURE__ */ Annotation.define();
      windows = typeof navigator == "object" && /* @__PURE__ */ /Win/.test(navigator.platform);
      baseTheme2 = /* @__PURE__ */ EditorView.baseTheme({
        ".cm-tooltip.cm-tooltip-autocomplete": {
          "& > ul": {
            fontFamily: "monospace",
            whiteSpace: "nowrap",
            overflow: "hidden auto",
            maxWidth_fallback: "700px",
            maxWidth: "min(700px, 95vw)",
            minWidth: "250px",
            maxHeight: "10em",
            height: "100%",
            listStyle: "none",
            margin: 0,
            padding: 0,
            "& > li, & > completion-section": {
              padding: "1px 3px",
              lineHeight: 1.2
            },
            "& > li": {
              overflowX: "hidden",
              textOverflow: "ellipsis",
              cursor: "pointer"
            },
            "& > completion-section": {
              display: "list-item",
              borderBottom: "1px solid silver",
              paddingLeft: "0.5em",
              opacity: 0.7
            }
          }
        },
        "&light .cm-tooltip-autocomplete ul li[aria-selected]": {
          background: "#17c",
          color: "white"
        },
        "&light .cm-tooltip-autocomplete-disabled ul li[aria-selected]": {
          background: "#777"
        },
        "&dark .cm-tooltip-autocomplete ul li[aria-selected]": {
          background: "#347",
          color: "white"
        },
        "&dark .cm-tooltip-autocomplete-disabled ul li[aria-selected]": {
          background: "#444"
        },
        ".cm-completionListIncompleteTop:before, .cm-completionListIncompleteBottom:after": {
          content: '"\xB7\xB7\xB7"',
          opacity: 0.5,
          display: "block",
          textAlign: "center",
          cursor: "pointer"
        },
        ".cm-tooltip.cm-completionInfo": {
          position: "absolute",
          padding: "3px 9px",
          width: "max-content",
          maxWidth: `${400}px`,
          boxSizing: "border-box",
          whiteSpace: "pre-line"
        },
        ".cm-completionInfo.cm-completionInfo-left": { right: "100%" },
        ".cm-completionInfo.cm-completionInfo-right": { left: "100%" },
        ".cm-completionInfo.cm-completionInfo-left-narrow": { right: `${30}px` },
        ".cm-completionInfo.cm-completionInfo-right-narrow": { left: `${30}px` },
        "&light .cm-snippetField": { backgroundColor: "#00000022" },
        "&dark .cm-snippetField": { backgroundColor: "#ffffff22" },
        ".cm-snippetFieldPosition": {
          verticalAlign: "text-top",
          width: 0,
          height: "1.15em",
          display: "inline-block",
          margin: "0 -0.7px -.7em",
          borderLeft: "1.4px dotted #888"
        },
        ".cm-completionMatchedText": {
          textDecoration: "underline"
        },
        ".cm-completionDetail": {
          marginLeft: "0.5em",
          fontStyle: "italic"
        },
        ".cm-completionIcon": {
          fontSize: "90%",
          width: ".8em",
          display: "inline-block",
          textAlign: "center",
          paddingRight: ".6em",
          opacity: "0.6",
          boxSizing: "content-box"
        },
        ".cm-completionIcon-function, .cm-completionIcon-method": {
          "&:after": { content: "'\u0192'" }
        },
        ".cm-completionIcon-class": {
          "&:after": { content: "'\u25CB'" }
        },
        ".cm-completionIcon-interface": {
          "&:after": { content: "'\u25CC'" }
        },
        ".cm-completionIcon-variable": {
          "&:after": { content: "'\u{1D465}'" }
        },
        ".cm-completionIcon-constant": {
          "&:after": { content: "'\u{1D436}'" }
        },
        ".cm-completionIcon-type": {
          "&:after": { content: "'\u{1D461}'" }
        },
        ".cm-completionIcon-enum": {
          "&:after": { content: "'\u222A'" }
        },
        ".cm-completionIcon-property": {
          "&:after": { content: "'\u25A1'" }
        },
        ".cm-completionIcon-keyword": {
          "&:after": { content: "'\u{1F511}\uFE0E'" }
          // Disable emoji rendering
        },
        ".cm-completionIcon-namespace": {
          "&:after": { content: "'\u25A2'" }
        },
        ".cm-completionIcon-text": {
          "&:after": { content: "'abc'", fontSize: "50%", verticalAlign: "middle" }
        }
      });
      FieldPos = class {
        constructor(field, line, from, to) {
          this.field = field;
          this.line = line;
          this.from = from;
          this.to = to;
        }
      };
      FieldRange = class _FieldRange {
        constructor(field, from, to) {
          this.field = field;
          this.from = from;
          this.to = to;
        }
        map(changes) {
          let from = changes.mapPos(this.from, -1, MapMode.TrackDel);
          let to = changes.mapPos(this.to, 1, MapMode.TrackDel);
          return from == null || to == null ? null : new _FieldRange(this.field, from, to);
        }
      };
      Snippet = class _Snippet {
        constructor(lines, fieldPositions) {
          this.lines = lines;
          this.fieldPositions = fieldPositions;
        }
        instantiate(state, pos) {
          let text = [], lineStart = [pos];
          let lineObj = state.doc.lineAt(pos), baseIndent = /^\s*/.exec(lineObj.text)[0];
          for (let line of this.lines) {
            if (text.length) {
              let indent2 = baseIndent, tabs = /^\t*/.exec(line)[0].length;
              for (let i2 = 0; i2 < tabs; i2++)
                indent2 += state.facet(indentUnit);
              lineStart.push(pos + indent2.length - tabs);
              line = indent2 + line.slice(tabs);
            }
            text.push(line);
            pos += line.length + 1;
          }
          let ranges = this.fieldPositions.map((pos2) => new FieldRange(pos2.field, lineStart[pos2.line] + pos2.from, lineStart[pos2.line] + pos2.to));
          return { text, ranges };
        }
        static parse(template) {
          let fields = [];
          let lines = [], positions = [], m;
          for (let line of template.split(/\r\n?|\n/)) {
            while (m = /[#$]\{(?:(\d+)(?::([^{}]*))?|((?:\\[{}]|[^{}])*))\}/.exec(line)) {
              let seq = m[1] ? +m[1] : null, rawName = m[2] || m[3] || "", found = -1;
              if (seq === 0)
                seq = 1e9;
              let name2 = rawName.replace(/\\[{}]/g, (m2) => m2[1]);
              for (let i2 = 0; i2 < fields.length; i2++) {
                if (seq != null ? fields[i2].seq == seq : name2 ? fields[i2].name == name2 : false)
                  found = i2;
              }
              if (found < 0) {
                let i2 = 0;
                while (i2 < fields.length && (seq == null || fields[i2].seq != null && fields[i2].seq < seq))
                  i2++;
                fields.splice(i2, 0, { seq, name: name2 });
                found = i2;
                for (let pos of positions)
                  if (pos.field >= found)
                    pos.field++;
              }
              for (let pos of positions)
                if (pos.line == lines.length && pos.from > m.index) {
                  let snip = m[2] ? 3 + (m[1] || "").length : 2;
                  pos.from -= snip;
                  pos.to -= snip;
                }
              positions.push(new FieldPos(found, lines.length, m.index, m.index + name2.length));
              line = line.slice(0, m.index) + rawName + line.slice(m.index + m[0].length);
            }
            line = line.replace(/\\([{}])/g, (_, brace, index) => {
              for (let pos of positions)
                if (pos.line == lines.length && pos.from > index) {
                  pos.from--;
                  pos.to--;
                }
              return brace;
            });
            lines.push(line);
          }
          return new _Snippet(lines, positions);
        }
      };
      fieldMarker = /* @__PURE__ */ Decoration.widget({ widget: /* @__PURE__ */ new class extends WidgetType {
        toDOM() {
          let span = document.createElement("span");
          span.className = "cm-snippetFieldPosition";
          return span;
        }
        ignoreEvent() {
          return false;
        }
      }() });
      fieldRange = /* @__PURE__ */ Decoration.mark({ class: "cm-snippetField" });
      ActiveSnippet = class _ActiveSnippet {
        constructor(ranges, active) {
          this.ranges = ranges;
          this.active = active;
          this.deco = Decoration.set(ranges.map((r) => (r.from == r.to ? fieldMarker : fieldRange).range(r.from, r.to)), true);
        }
        map(changes) {
          let ranges = [];
          for (let r of this.ranges) {
            let mapped = r.map(changes);
            if (!mapped)
              return null;
            ranges.push(mapped);
          }
          return new _ActiveSnippet(ranges, this.active);
        }
        selectionInsideField(sel) {
          return sel.ranges.every((range) => this.ranges.some((r) => r.field == this.active && r.from <= range.from && r.to >= range.to));
        }
      };
      setActive = /* @__PURE__ */ StateEffect.define({
        map(value, changes) {
          return value && value.map(changes);
        }
      });
      moveToField = /* @__PURE__ */ StateEffect.define();
      snippetState = /* @__PURE__ */ StateField.define({
        create() {
          return null;
        },
        update(value, tr) {
          for (let effect of tr.effects) {
            if (effect.is(setActive))
              return effect.value;
            if (effect.is(moveToField) && value)
              return new ActiveSnippet(value.ranges, effect.value);
          }
          if (value && tr.docChanged)
            value = value.map(tr.changes);
          if (value && tr.selection && !value.selectionInsideField(tr.selection))
            value = null;
          return value;
        },
        provide: (f) => EditorView.decorations.from(f, (val) => val ? val.deco : Decoration.none)
      });
      clearSnippet = ({ state, dispatch }) => {
        let active = state.field(snippetState, false);
        if (!active)
          return false;
        dispatch(state.update({ effects: setActive.of(null) }));
        return true;
      };
      nextSnippetField = /* @__PURE__ */ moveField(1);
      prevSnippetField = /* @__PURE__ */ moveField(-1);
      defaultSnippetKeymap = [
        { key: "Tab", run: nextSnippetField, shift: prevSnippetField },
        { key: "Escape", run: clearSnippet }
      ];
      snippetKeymap = /* @__PURE__ */ Facet.define({
        combine(maps) {
          return maps.length ? maps[0] : defaultSnippetKeymap;
        }
      });
      addSnippetKeymap = /* @__PURE__ */ Prec.highest(/* @__PURE__ */ keymap.compute([snippetKeymap], (state) => state.facet(snippetKeymap)));
      snippetPointerHandler = /* @__PURE__ */ EditorView.domEventHandlers({
        mousedown(event, view) {
          let active = view.state.field(snippetState, false), pos;
          if (!active || (pos = view.posAtCoords({ x: event.clientX, y: event.clientY })) == null)
            return false;
          let match = active.ranges.find((r) => r.from <= pos && r.to >= pos);
          if (!match || match.field == active.active)
            return false;
          view.dispatch({
            selection: fieldSelection(active.ranges, match.field),
            effects: setActive.of(active.ranges.some((r) => r.field > match.field) ? new ActiveSnippet(active.ranges, match.field) : null),
            scrollIntoView: true
          });
          return true;
        }
      });
      closedBracket = /* @__PURE__ */ new class extends RangeValue {
      }();
      closedBracket.startSide = 1;
      closedBracket.endSide = -1;
      android = typeof navigator == "object" && /* @__PURE__ */ /Android\b/.test(navigator.userAgent);
    }
  });

  // node_modules/@codemirror/lang-python/dist/index.js
  function defID(type) {
    return (node, def, outer) => {
      if (outer)
        return false;
      let id2 = node.node.getChild("VariableName");
      if (id2)
        def(id2, type);
      return true;
    };
  }
  function getScope(doc2, node) {
    let cached = cache.get(node);
    if (cached)
      return cached;
    let completions = [], top2 = true;
    function def(node2, type) {
      let name2 = doc2.sliceString(node2.from, node2.to);
      completions.push({ label: name2, type });
    }
    node.cursor(IterMode.IncludeAnonymous).iterate((node2) => {
      if (node2.name) {
        let gather = gatherCompletions[node2.name];
        if (gather && gather(node2, def, top2) || !top2 && ScopeNodes.has(node2.name))
          return false;
        top2 = false;
      } else if (node2.to - node2.from > 8192) {
        for (let c of getScope(doc2, node2.node))
          completions.push(c);
        return false;
      }
    });
    cache.set(node, completions);
    return completions;
  }
  function localCompletionSource(context) {
    let inner = syntaxTree(context.state).resolveInner(context.pos, -1);
    if (dontComplete.indexOf(inner.name) > -1)
      return null;
    let isWord = inner.name == "VariableName" || inner.to - inner.from < 20 && Identifier.test(context.state.sliceDoc(inner.from, inner.to));
    if (!isWord && !context.explicit)
      return null;
    let options = [];
    for (let pos = inner; pos; pos = pos.parent) {
      if (ScopeNodes.has(pos.name))
        options = options.concat(getScope(context.state.doc, pos));
    }
    return {
      options,
      from: isWord ? inner.from : context.pos,
      validFor: Identifier
    };
  }
  function innerBody(context) {
    let { node, pos } = context;
    let lineIndent = context.lineIndent(pos, -1);
    let found = null;
    for (; ; ) {
      let before = node.childBefore(pos);
      if (!before) {
        break;
      } else if (before.name == "Comment") {
        pos = before.from;
      } else if (before.name == "Body" || before.name == "MatchBody") {
        if (context.baseIndentFor(before) + context.unit <= lineIndent)
          found = before;
        node = before;
      } else if (before.name == "MatchClause") {
        node = before;
      } else if (before.type.is("Statement")) {
        node = before;
      } else {
        break;
      }
    }
    return found;
  }
  function indentBody(context, node) {
    let base2 = context.baseIndentFor(node);
    let line = context.lineAt(context.pos, -1), to = line.from + line.text.length;
    if (/^\s*($|#)/.test(line.text) && context.node.to < to + 100 && !/\S/.test(context.state.sliceDoc(to, context.node.to)) && context.lineIndent(context.pos, -1) <= base2)
      return null;
    if (/^\s*(else:|elif |except |finally:|case\s+[^=:]+:)/.test(context.textAfter) && context.lineIndent(context.pos, -1) > base2)
      return null;
    return base2 + context.unit;
  }
  function python() {
    return new LanguageSupport(pythonLanguage, [
      pythonLanguage.data.of({ autocomplete: localCompletionSource }),
      pythonLanguage.data.of({ autocomplete: globalCompletion })
    ]);
  }
  var cache, ScopeNodes, gatherCompletions, Identifier, dontComplete, globals, snippets, globalCompletion, pythonLanguage;
  var init_dist11 = __esm({
    "node_modules/@codemirror/lang-python/dist/index.js"() {
      init_dist9();
      init_dist5();
      init_dist3();
      init_dist10();
      cache = /* @__PURE__ */ new NodeWeakMap();
      ScopeNodes = /* @__PURE__ */ new Set([
        "Script",
        "Body",
        "FunctionDefinition",
        "ClassDefinition",
        "LambdaExpression",
        "ForStatement",
        "MatchClause"
      ]);
      gatherCompletions = {
        FunctionDefinition: /* @__PURE__ */ defID("function"),
        ClassDefinition: /* @__PURE__ */ defID("class"),
        ForStatement(node, def, outer) {
          if (outer)
            for (let child = node.node.firstChild; child; child = child.nextSibling) {
              if (child.name == "VariableName")
                def(child, "variable");
              else if (child.name == "in")
                break;
            }
        },
        ImportStatement(_node, def) {
          var _a2, _b;
          let { node } = _node;
          let isFrom = ((_a2 = node.firstChild) === null || _a2 === void 0 ? void 0 : _a2.name) == "from";
          for (let ch = node.getChild("import"); ch; ch = ch.nextSibling) {
            if (ch.name == "VariableName" && ((_b = ch.nextSibling) === null || _b === void 0 ? void 0 : _b.name) != "as")
              def(ch, isFrom ? "variable" : "namespace");
          }
        },
        AssignStatement(node, def) {
          for (let child = node.node.firstChild; child; child = child.nextSibling) {
            if (child.name == "VariableName")
              def(child, "variable");
            else if (child.name == ":" || child.name == "AssignOp")
              break;
          }
        },
        ParamList(node, def) {
          for (let prev = null, child = node.node.firstChild; child; child = child.nextSibling) {
            if (child.name == "VariableName" && (!prev || !/\*|AssignOp/.test(prev.name)))
              def(child, "variable");
            prev = child;
          }
        },
        CapturePattern: /* @__PURE__ */ defID("variable"),
        AsPattern: /* @__PURE__ */ defID("variable"),
        __proto__: null
      };
      Identifier = /^[\w\xa1-\uffff][\w\d\xa1-\uffff]*$/;
      dontComplete = ["String", "FormatString", "Comment", "PropertyName"];
      globals = /* @__PURE__ */ [
        "__annotations__",
        "__builtins__",
        "__debug__",
        "__doc__",
        "__import__",
        "__name__",
        "__loader__",
        "__package__",
        "__spec__",
        "False",
        "None",
        "True"
      ].map((n) => ({ label: n, type: "constant" })).concat(/* @__PURE__ */ [
        "ArithmeticError",
        "AssertionError",
        "AttributeError",
        "BaseException",
        "BlockingIOError",
        "BrokenPipeError",
        "BufferError",
        "BytesWarning",
        "ChildProcessError",
        "ConnectionAbortedError",
        "ConnectionError",
        "ConnectionRefusedError",
        "ConnectionResetError",
        "DeprecationWarning",
        "EOFError",
        "Ellipsis",
        "EncodingWarning",
        "EnvironmentError",
        "Exception",
        "FileExistsError",
        "FileNotFoundError",
        "FloatingPointError",
        "FutureWarning",
        "GeneratorExit",
        "IOError",
        "ImportError",
        "ImportWarning",
        "IndentationError",
        "IndexError",
        "InterruptedError",
        "IsADirectoryError",
        "KeyError",
        "KeyboardInterrupt",
        "LookupError",
        "MemoryError",
        "ModuleNotFoundError",
        "NameError",
        "NotADirectoryError",
        "NotImplemented",
        "NotImplementedError",
        "OSError",
        "OverflowError",
        "PendingDeprecationWarning",
        "PermissionError",
        "ProcessLookupError",
        "RecursionError",
        "ReferenceError",
        "ResourceWarning",
        "RuntimeError",
        "RuntimeWarning",
        "StopAsyncIteration",
        "StopIteration",
        "SyntaxError",
        "SyntaxWarning",
        "SystemError",
        "SystemExit",
        "TabError",
        "TimeoutError",
        "TypeError",
        "UnboundLocalError",
        "UnicodeDecodeError",
        "UnicodeEncodeError",
        "UnicodeError",
        "UnicodeTranslateError",
        "UnicodeWarning",
        "UserWarning",
        "ValueError",
        "Warning",
        "ZeroDivisionError"
      ].map((n) => ({ label: n, type: "type" }))).concat(/* @__PURE__ */ [
        "bool",
        "bytearray",
        "bytes",
        "classmethod",
        "complex",
        "float",
        "frozenset",
        "int",
        "list",
        "map",
        "memoryview",
        "object",
        "range",
        "set",
        "staticmethod",
        "str",
        "super",
        "tuple",
        "type"
      ].map((n) => ({ label: n, type: "class" }))).concat(/* @__PURE__ */ [
        "abs",
        "aiter",
        "all",
        "anext",
        "any",
        "ascii",
        "bin",
        "breakpoint",
        "callable",
        "chr",
        "compile",
        "delattr",
        "dict",
        "dir",
        "divmod",
        "enumerate",
        "eval",
        "exec",
        "exit",
        "filter",
        "format",
        "getattr",
        "globals",
        "hasattr",
        "hash",
        "help",
        "hex",
        "id",
        "input",
        "isinstance",
        "issubclass",
        "iter",
        "len",
        "license",
        "locals",
        "max",
        "min",
        "next",
        "oct",
        "open",
        "ord",
        "pow",
        "print",
        "property",
        "quit",
        "repr",
        "reversed",
        "round",
        "setattr",
        "slice",
        "sorted",
        "sum",
        "vars",
        "zip"
      ].map((n) => ({ label: n, type: "function" })));
      snippets = [
        /* @__PURE__ */ snippetCompletion("def ${name}(${params}):\n	${}", {
          label: "def",
          detail: "function",
          type: "keyword"
        }),
        /* @__PURE__ */ snippetCompletion("for ${name} in ${collection}:\n	${}", {
          label: "for",
          detail: "loop",
          type: "keyword"
        }),
        /* @__PURE__ */ snippetCompletion("while ${}:\n	${}", {
          label: "while",
          detail: "loop",
          type: "keyword"
        }),
        /* @__PURE__ */ snippetCompletion("try:\n	${}\nexcept ${error}:\n	${}", {
          label: "try",
          detail: "/ except block",
          type: "keyword"
        }),
        /* @__PURE__ */ snippetCompletion("if ${}:\n	\n", {
          label: "if",
          detail: "block",
          type: "keyword"
        }),
        /* @__PURE__ */ snippetCompletion("if ${}:\n	${}\nelse:\n	${}", {
          label: "if",
          detail: "/ else block",
          type: "keyword"
        }),
        /* @__PURE__ */ snippetCompletion("class ${name}:\n	def __init__(self, ${params}):\n			${}", {
          label: "class",
          detail: "definition",
          type: "keyword"
        }),
        /* @__PURE__ */ snippetCompletion("import ${module}", {
          label: "import",
          detail: "statement",
          type: "keyword"
        }),
        /* @__PURE__ */ snippetCompletion("from ${module} import ${names}", {
          label: "from",
          detail: "import",
          type: "keyword"
        })
      ];
      globalCompletion = /* @__PURE__ */ ifNotIn(dontComplete, /* @__PURE__ */ completeFromList(/* @__PURE__ */ globals.concat(snippets)));
      pythonLanguage = /* @__PURE__ */ LRLanguage.define({
        name: "python",
        parser: /* @__PURE__ */ parser2.configure({
          props: [
            /* @__PURE__ */ indentNodeProp.add({
              Body: (context) => {
                var _a2;
                let body = /^\s*(#|$)/.test(context.textAfter) && innerBody(context) || context.node;
                return (_a2 = indentBody(context, body)) !== null && _a2 !== void 0 ? _a2 : context.continue();
              },
              MatchBody: (context) => {
                var _a2;
                let inner = innerBody(context);
                return (_a2 = indentBody(context, inner || context.node)) !== null && _a2 !== void 0 ? _a2 : context.continue();
              },
              IfStatement: (cx) => /^\s*(else:|elif )/.test(cx.textAfter) ? cx.baseIndent : cx.continue(),
              "ForStatement WhileStatement": (cx) => /^\s*else:/.test(cx.textAfter) ? cx.baseIndent : cx.continue(),
              TryStatement: (cx) => /^\s*(except[ :]|finally:|else:)/.test(cx.textAfter) ? cx.baseIndent : cx.continue(),
              MatchStatement: (cx) => {
                if (/^\s*case /.test(cx.textAfter))
                  return cx.baseIndent + cx.unit;
                return cx.continue();
              },
              "TupleExpression ComprehensionExpression ParamList ArgList ParenthesizedExpression": /* @__PURE__ */ delimitedIndent({ closing: ")" }),
              "DictionaryExpression DictionaryComprehensionExpression SetExpression SetComprehensionExpression": /* @__PURE__ */ delimitedIndent({ closing: "}" }),
              "ArrayExpression ArrayComprehensionExpression": /* @__PURE__ */ delimitedIndent({ closing: "]" }),
              MemberExpression: (cx) => cx.baseIndent + cx.unit,
              "String FormatString": () => null,
              Script: (context) => {
                var _a2;
                let inner = innerBody(context);
                return (_a2 = inner && indentBody(context, inner)) !== null && _a2 !== void 0 ? _a2 : context.continue();
              }
            }),
            /* @__PURE__ */ foldNodeProp.add({
              "ArrayExpression DictionaryExpression SetExpression TupleExpression": foldInside,
              Body: (node, state) => ({ from: node.from + 1, to: node.to - (node.to == state.doc.length ? 0 : 1) }),
              "String FormatString": (node, state) => ({ from: state.doc.lineAt(node.from).to, to: node.to })
            })
          ]
        }),
        languageData: {
          closeBrackets: {
            brackets: ["(", "[", "{", "'", '"', "'''", '"""'],
            stringPrefixes: [
              "f",
              "fr",
              "rf",
              "r",
              "u",
              "b",
              "br",
              "rb",
              "F",
              "FR",
              "RF",
              "R",
              "U",
              "B",
              "BR",
              "RB"
            ]
          },
          commentTokens: { line: "#" },
          // Indent logic logic are triggered upon below input patterns
          indentOnInput: /^\s*([\}\]\)]|else:|elif |except |finally:|case\s+[^:]*:?)$/
        }
      });
    }
  });

  // node_modules/@lezer/java/dist/index.js
  var javaHighlighting, spec_identifier3, parser3;
  var init_dist12 = __esm({
    "node_modules/@lezer/java/dist/index.js"() {
      init_dist6();
      init_dist4();
      javaHighlighting = styleTags({
        null: tags.null,
        instanceof: tags.operatorKeyword,
        this: tags.self,
        "new super assert open to with void": tags.keyword,
        "class interface extends implements enum var": tags.definitionKeyword,
        "module package import": tags.moduleKeyword,
        "switch while for if else case default do break continue return try catch finally throw": tags.controlKeyword,
        ["requires exports opens uses provides public private protected static transitive abstract final strictfp synchronized native transient volatile throws"]: tags.modifier,
        IntegerLiteral: tags.integer,
        FloatingPointLiteral: tags.float,
        "StringLiteral TextBlock": tags.string,
        CharacterLiteral: tags.character,
        LineComment: tags.lineComment,
        BlockComment: tags.blockComment,
        BooleanLiteral: tags.bool,
        PrimitiveType: tags.standard(tags.typeName),
        TypeName: tags.typeName,
        Identifier: tags.variableName,
        "MethodName/Identifier": tags.function(tags.variableName),
        Definition: tags.definition(tags.variableName),
        ArithOp: tags.arithmeticOperator,
        LogicOp: tags.logicOperator,
        BitOp: tags.bitwiseOperator,
        CompareOp: tags.compareOperator,
        AssignOp: tags.definitionOperator,
        UpdateOp: tags.updateOperator,
        Asterisk: tags.punctuation,
        Label: tags.labelName,
        "( )": tags.paren,
        "[ ]": tags.squareBracket,
        "{ }": tags.brace,
        ".": tags.derefOperator,
        ", ;": tags.separator
      });
      spec_identifier3 = { __proto__: null, true: 34, false: 34, null: 42, void: 46, byte: 48, short: 48, int: 48, long: 48, char: 48, float: 48, double: 48, boolean: 48, extends: 62, super: 64, class: 76, this: 78, new: 84, public: 100, protected: 102, private: 104, abstract: 106, static: 108, final: 110, strictfp: 112, default: 114, synchronized: 116, native: 118, transient: 120, volatile: 122, throws: 150, implements: 160, interface: 166, enum: 176, instanceof: 236, open: 265, module: 267, requires: 272, transitive: 274, exports: 276, to: 278, opens: 280, uses: 282, provides: 284, with: 286, package: 290, import: 294, if: 306, else: 308, while: 312, for: 316, var: 323, assert: 330, switch: 334, case: 340, do: 344, break: 348, continue: 352, return: 356, throw: 362, try: 366, catch: 370, finally: 378 };
      parser3 = LRParser.deserialize({
        version: 14,
        states: "##jQ]QPOOQ$wQPOOO(_QQO'#H]O*cQQO'#CbOOQO'#Cb'#CbO*jQPO'#CaO*rOSO'#CpOOQO'#Hb'#HbOOQO'#Cu'#CuO,_QPO'#D_O,xQQO'#HlOOQO'#Hl'#HlO/^QQO'#HgO/eQQO'#HgOOQO'#Hg'#HgOOQO'#Hf'#HfO1iQPO'#DUO1vQPO'#GmO4nQPO'#D_O4uQPO'#DzO*jQPO'#E[O5hQPO'#E[OOQO'#DV'#DVO6vQQO'#H`O8}QQO'#EeO9UQPO'#EdO9ZQPO'#EfOOQO'#Ha'#HaO7^QQO'#HaO:^QQO'#FgO:eQPO'#EwO:jQPO'#E|O:jQPO'#FOOOQO'#H`'#H`OOQO'#HX'#HXOOQO'#Gg'#GgOOQO'#HW'#HWO;zQPO'#FhOOQO'#HV'#HVOOQO'#Gf'#GfQ]QPOOOOQO'#Hr'#HrO<PQPO'#HrO<UQPO'#D{O<UQPO'#EVO<UQPO'#EQO<^QPO'#HoO<oQQO'#EfO*jQPO'#C`O<wQPO'#C`O*jQPO'#FbO<|QPO'#FdO=XQPO'#FjO=XQPO'#FmO<UQPO'#FrO=^QPO'#FoO:jQPO'#FvO=XQPO'#FxO]QPO'#F}O=cQPO'#GPO=nQPO'#GRO=yQPO'#GTO=XQPO'#GVO:jQPO'#GWO>QQPO'#GYO>nQQO'#HhO?ZQQO'#CuO?bQPO'#HwO?pQPO'#D_O@`QPO'#DpO?eQPO'#DqO@jQPO'#HwO@{QPO'#DpOATQPO'#IQOAYQPO'#E`OOQO'#Hq'#HqOOQO'#Gl'#GlQ$wQPOOOAbQPO'#HrOOQO'#H]'#H]OCaQQO,58{OOQO'#HZ'#HZOOOO'#Gh'#GhOESOSO,59[OOQO,59[,59[OOQO'#Hh'#HhOEsQPO,59eOFuQPO,59yOOQO-E:e-E:eO*jQPO,58zOGiQPO,58zO*jQPO,5;|OGnQPO'#DQOGsQPO'#DQOOQO'#Gj'#GjOHsQQO,59jOOQO'#Dm'#DmOJ[QPO'#HtOJfQPO'#DlOJtQPO'#HsOJ|QPO,5<^OKRQPO,59^OKlQPO'#CxOOQO,59c,59cOKsQPO,59bOLOQQO'#H]OM}QQO'#CbO! |QPO'#D_O!#RQQO'#HlO!#cQQO,59pO!#jQPO'#DvO!#xQPO'#H{O!$QQPO,5:`O!$VQPO,5:`O!$mQPO,5;mO!$xQPO'#ISO!%TQPO,5;dO!%YQPO,5=XOOQO-E:k-E:kOOQO,5:f,5:fO!&pQPO,5:fO!&wQPO,5:vO?bQPO,5<^O*jQPO,5:vO<UQPO,5:gO<UQPO,5:qO<UQPO,5:lO<UQPO,5<^O!'_QPO,59qO:jQPO,5:}O!'fQPO,5;QO:jQPO,59TO!'tQPO'#DXOOQO,5;O,5;OOOQO'#El'#ElOOQO'#Eo'#EoO:jQPO,5;UO:jQPO,5;UO:jQPO,5;UO:jQPO,5;UO:jQPO,5;UO:jQPO,5;UO:jQPO,5;UO:jQPO,5;UO:jQPO,5;UO:jQPO,5;eOOQO,5;h,5;hOOQO,5<R,5<RO!'{QPO,5;aO!(^QPO,5;cO!'{QPO'#CyO!(eQQO'#HlO!(sQQO,5;jO]QPO,5<SOOQO-E:d-E:dOOQO,5>^,5>^O!*TQPO,5:gO!*cQPO,5:qO!*kQPO,5:lO!*vQPO,5>ZO!#jQPO,5>ZO!&|QPO,59UO!+RQQO,58zO!+ZQQO,5;|O!+cQQO,5<OO*jQPO,5<OO:jQPO'#DUO]QPO,5<UO]QPO,5<XO!+kQPO'#FqO]QPO,5<ZO]QPO,5<`O!+{QQO,5<bO!,VQPO,5<dO!,[QPO,5<iOOQO'#Fi'#FiOOQO,5<k,5<kO!,aQPO,5<kOOQO,5<m,5<mO!,fQPO,5<mO!,kQQO,5<oOOQO,5<o,5<oO>TQPO,5<qO!,rQQO,5<rO!,yQPO'#GcO!.PQPO,5<tO>TQPO,5<|O!1}QPO,59jO!2[QPO'#HtO!2cQPO,59xO!2hQPO,5>cO?bQPO,59xO!2sQPO,5:[OAYQPO,5:zO!2{QPO'#DrO?eQPO'#DrO!3WQPO'#HxO!3`QPO,5:]O?bQPO,5>cO!'{QPO,5>cOATQPO,5>lOOQO,5:[,5:[O!$VQPO'#DtOOQO,5>l,5>lO!3eQPO'#EaOOQO,5:z,5:zO!6fQPO,5:zO!'{QPO'#DxOOQO-E:j-E:jOOQO,5:y,5:yO*jQPO,58}O!6kQPO'#ChOOQO1G.k1G.kOOOO-E:f-E:fOOQO1G.v1G.vO!+RQQO1G.fO*jQPO1G.fO!6uQQO1G1hOOQO,59l,59lO!6}QPO,59lOOQO-E:h-E:hO!7SQPO,5>`O!7kQPO,5:WO<UQPO'#GoO!7rQPO,5>_OOQO1G1x1G1xOOQO1G.x1G.xO!8]QPO'#CyO!8{QPO'#HlO!9VQPO'#CzO!9eQPO'#HkO!9mQPO,59dOOQO1G.|1G.|OKsQPO1G.|O!:TQPO,59eO!:bQQO'#H]O!:sQQO'#CbOOQO,5:b,5:bO<UQPO,5:cOOQO,5:a,5:aO!;UQQO,5:aOOQO1G/[1G/[O!;ZQPO,5:bO!;lQPO'#GrO!<PQPO,5>gOOQO1G/z1G/zO!<XQPO'#DvO!<jQPO1G/zO!'{QPO'#GpO!<oQPO1G1XO:jQPO1G1XO<UQPO'#GxO!<wQPO,5>nOOQO1G1O1G1OOOQO1G0Q1G0QO!=PQPO'#E]OOQO1G0b1G0bO!=pQPO1G1xO!&wQPO1G0bO!*TQPO1G0RO!*cQPO1G0]O!*kQPO1G0WOOQO1G/]1G/]O!=uQQO1G.pO9UQPO1G0jO*jQPO1G0jO<^QPO'#HoO!?iQQO1G.pOOQO1G.p1G.pO!?nQQO1G0iOOQO1G0l1G0lO!?uQPO1G0lO!@QQQO1G.oO!@hQQO'#HpO!@uQPO,59sO!BXQQO1G0pO!CmQQO1G0pO!CtQQO1G0pO!EYQQO1G0pO!FnQQO1G0pO!FuQQO1G0pO!HZQQO1G0pO!HbQQO1G0pO!HiQQO1G0pO!HpQQO1G1PO!HwQQO'#HlOOQO1G0{1G0{O!IzQQO1G0}OOQO1G0}1G0}OOQO1G1n1G1nO!JbQPO'#D[O!'{QPO'#D|O!'{QPO'#D}OOQO1G0R1G0RO!JiQPO1G0RO!JnQPO1G0RO!JvQPO1G0RO!KRQPO'#EXOOQO1G0]1G0]O!KfQPO1G0]O!KkQPO'#ETO!'{QPO'#ESOOQO1G0W1G0WO!LeQPO1G0WO!LjQPO1G0WO!LrQPO'#EhO!LyQPO'#EhOOQO'#Gw'#GwO!MRQQO1G0mO!NrQQO1G3uO9UQPO1G3uO#!qQPO'#FWOOQO1G.f1G.fOOQO1G1h1G1hO#!xQPO1G1jOOQO1G1j1G1jO##TQQO1G1jO##]QPO1G1pOOQO1G1s1G1sO*zQPO'#D_O,xQQO,5<aO#'TQPO,5<aO#'fQPO,5<]O#'mQPO,5<]OOQO1G1u1G1uOOQO1G1z1G1zOOQO1G1|1G1|O:jQPO1G1|O#+aQPO'#FzOOQO1G2O1G2OO=XQPO1G2TOOQO1G2V1G2VOOQO1G2X1G2XOOQO1G2Z1G2ZOOQO1G2]1G2]OOQO1G2^1G2^O#+hQQO'#H]O#,RQQO'#CbO,xQQO'#HlO#,lQQOOO#-YQQO'#EeO#,wQQO'#HaO!#jQPO'#GdO#-aQPO,5<}OOQO'#HP'#HPO#-iQPO1G2`O#1gQPO'#G[O>TQPO'#G`OOQO1G2`1G2`O#1lQPO1G2hO#5jQPO,5>fOOQO1G/d1G/dOOQO1G3}1G3}O#5{QPO1G/dOOQO1G/v1G/vOOQO1G0f1G0fO!6fQPO1G0fOOQO,5:^,5:^O!'{QPO'#DsO#6QQPO,5:^O?eQPO'#GqO#6]QPO,5>dOOQO1G/w1G/wOATQPO'#HzO#6eQPO1G3}O?bQPO1G3}OOQO1G4W1G4WO!!mQPO'#DvO! |QPO'#D_OOQO,5:{,5:{O#6pQPO,5:{O#6pQPO,5:{O#6wQQO'#H`O#8VQQO'#HaO#8aQQO'#EbO#8lQPO'#EbO#8tQPO'#H}OOQO,5:d,5:dOOQO1G.i1G.iO#9PQQO'#EeO#9aQQO'#H_O#9qQPO'#FSOOQO'#H_'#H_O#9{QPO'#H_O#:jQPO'#IVO#:rQPO,59SOOQO7+$Q7+$QO!+RQQO7+$QOOQO7+'S7+'SOOQO1G/W1G/WO#:wQPO'#DoO#;RQQO'#HuOOQO'#Hu'#HuOOQO1G/r1G/rOOQO,5=Z,5=ZOOQO-E:m-E:mO#;cQWO,58{O#;jQPO,59fOOQO,59f,59fO!'{QPO'#HnOKWQPO'#GiO#;xQPO,5>VOOQO1G/O1G/OOOQO7+$h7+$hOOQO1G/{1G/{O#<QQQO1G/{OOQO1G/}1G/}O#<VQPO1G/{OOQO1G/|1G/|O<UQPO1G/}OOQO,5=^,5=^OOQO-E:p-E:pOOQO7+%f7+%fOOQO,5=[,5=[OOQO-E:n-E:nO:jQPO7+&sOOQO7+&s7+&sOOQO,5=d,5=dOOQO-E:v-E:vO#<[QPO'#EUO#<jQPO'#EUOOQO'#Gv'#GvO#=RQPO,5:wOOQO,5:w,5:wOOQO7+'d7+'dOOQO7+%|7+%|OOQO7+%m7+%mO!JiQPO7+%mO!JnQPO7+%mO!JvQPO7+%mOOQO7+%w7+%wO!KfQPO7+%wOOQO7+%r7+%rO!LeQPO7+%rO!LjQPO7+%rOOQO7+&U7+&UOOQO'#Ee'#EeO9UQPO7+&UO9UQPO,5>ZO#=rQPO7+$[OOQO7+&T7+&TOOQO7+&W7+&WO:jQPO'#GkO#>QQPO,5>[OOQO1G/_1G/_O:jQPO7+&kO#>]QQO,59eO#?`QPO,59vOOQO,59v,59vOOQO,5:h,5:hOOQO'#EP'#EPOOQO,5:i,5:iO#?gQPO'#EYO<UQPO'#EYO#?xQPO'#IOO#@TQPO,5:sO?bQPO'#HwO!'{QPO'#HwO#@]QPO'#DpOOQO'#Gt'#GtO#@dQPO,5:oOOQO,5:o,5:oOOQO,5:n,5:nOOQO,5;S,5;SO#A^QQO,5;SO#AeQPO,5;SOOQO-E:u-E:uOOQO7+&X7+&XOOQO7+)a7+)aO#AlQQO7+)aOOQO'#G{'#G{O#CYQPO,5;rOOQO,5;r,5;rO#CaQPO'#FXO*jQPO'#FXO*jQPO'#FXO*jQPO'#FXO#CoQPO7+'UO#CtQPO7+'UOOQO7+'U7+'UO]QPO7+'[O#DPQPO1G1{O?bQPO1G1{O#D_QQO1G1wO!'tQPO1G1wO#DfQPO1G1wO#DmQQO7+'hOOQO'#HO'#HOO#DtQPO,5<fOOQO,5<f,5<fO#D{QPO'#HrO:jQPO'#F{O#ETQPO7+'oO#EYQPO,5=OO?bQPO,5=OO#E_QPO1G2iO#FhQPO1G2iOOQO1G2i1G2iOOQO-E:}-E:}OOQO7+'z7+'zO!;lQPO'#G^O>TQPO,5<vOOQO,5<z,5<zO#FpQPO7+(SOOQO7+(S7+(SO#JnQPO1G4QOOQO7+%O7+%OOOQO7+&Q7+&QO#KPQPO,5:_OOQO1G/x1G/xOOQO,5=],5=]OOQO-E:o-E:oOOQO7+)i7+)iO#K[QPO7+)iO!9rQPO,5:aOOQO1G0g1G0gO#KgQPO1G0gO#KnQPO,59qO#LSQPO,5:|O9UQPO,5:|O!'{QPO'#GsO#LXQPO,5>iO#LdQPO,59TO#LkQPO'#IUO#LsQPO,5;nO*jQPO'#GzO#LxQPO,5>qOOQO1G.n1G.nOOQO<<Gl<<GlO#MQQPO'#HvO#MYQPO,5:ZOOQO1G/Q1G/QOOQO,5>Y,5>YOOQO,5=T,5=TOOQO-E:g-E:gO#M_QPO7+%gOOQO7+%g7+%gOOQO7+%i7+%iOOQO<<J_<<J_O#MuQPO'#H]O#M|QPO'#CbO#NTQPO,5:pO#NYQPO,5:xO#<[QPO,5:pOOQO-E:t-E:tOOQO1G0c1G0cOOQO<<IX<<IXO!JiQPO<<IXO!JnQPO<<IXOOQO<<Ic<<IcOOQO<<I^<<I^O!LeQPO<<I^OOQO<<Ip<<IpO#N_QQO<<GvO9UQPO<<IpO*jQPO<<IpOOQO<<Gv<<GvO$!RQQO,5=VOOQO-E:i-E:iO$!`QQO<<JVOOQO1G/b1G/bOOQO,5:t,5:tO$!vQPO,5:tO$#UQPO,5:tO$#gQPO'#GuO$#}QPO,5>jO$$YQPO'#EZOOQO1G0_1G0_O$$aQPO1G0_O?bQPO,5:pOOQO-E:r-E:rOOQO1G0Z1G0ZOOQO1G0n1G0nO$$fQQO1G0nOOQO<<L{<<L{OOQO-E:y-E:yOOQO1G1^1G1^O$$mQQO,5;sOOQO'#G|'#G|O#CaQPO,5;sOOQO'#IW'#IWO$$uQQO,5;sO$%WQQO,5;sOOQO<<Jp<<JpO$%`QPO<<JpOOQO<<Jv<<JvO:jQPO7+'gO$%eQPO7+'gO!'tQPO7+'cO$%sQPO7+'cO$%xQQO7+'cOOQO<<KS<<KSOOQO-E:|-E:|OOQO1G2Q1G2QOOQO,5<g,5<gO$&PQQO,5<gOOQO<<KZ<<KZO:jQPO1G2jO$&WQPO1G2jOOQO,5=m,5=mOOQO7+(T7+(TO$&]QPO7+(TOOQO-E;P-E;PO$'zQWO'#HgO$'fQWO'#HgO$(RQPO'#G_O<UQPO,5<xO!#jQPO,5<xOOQO1G2b1G2bOOQO<<Kn<<KnO$(dQPO1G/yOOQO<<MT<<MTOOQO7+&R7+&RO$(oQPO1G0jO$(zQQO1G0hOOQO1G0h1G0hO$)SQPO1G0hOOQO,5=_,5=_OOQO-E:q-E:qO$)XQQO1G.oOOQO1G1Z1G1ZO$)cQPO'#GyO$)pQPO,5>pOOQO1G1Y1G1YO$)xQPO'#FTOOQO,5=f,5=fOOQO-E:x-E:xO$)}QPO'#GnO$*[QPO,5>bOOQO1G/u1G/uOOQO<<IR<<IROOQO1G0[1G0[O$*dQPO1G0dO$*iQPO1G0[O$*nQPO1G0dOOQOAN>sAN>sO!JiQPOAN>sOOQOAN>xAN>xOOQOAN?[AN?[O9UQPOAN?[OOQO1G0`1G0`O$*sQPO1G0`OOQO,5=a,5=aOOQO-E:s-E:sO$+RQPO,5:uOOQO7+%y7+%yOOQO7+&Y7+&YOOQO1G1_1G1_O$+YQQO1G1_OOQO-E:z-E:zO$+bQQO'#IXO$+]QPO1G1_O$${QPO1G1_O*jQPO1G1_OOQOAN@[AN@[O$+mQQO<<KRO:jQPO<<KRO$+tQPO<<J}OOQO<<J}<<J}O!'tQPO<<J}OOQO1G2R1G2RO$+yQQO7+(UO:jQPO7+(UOOQO<<Ko<<KoP!,yQPO'#HRO!#jQPO'#HQO$,TQPO,5<yO$,`QPO1G2dO<UQPO1G2dO9UQPO7+&SO$,eQPO7+&SOOQO7+&S7+&SOOQO,5=e,5=eOOQO-E:w-E:wO#LdQPO,5;oOOQO,5=Y,5=YOOQO-E:l-E:lO$,jQPO7+&OOOQO7+%v7+%vO$,xQPO7+&OOOQOG24_G24_OOQOG24vG24vOOQO7+%z7+%zOOQO7+&y7+&yO*jQPO'#G}O$,}QPO,5>sO$-VQPO7+&yO$-[QQO'#IYOOQOAN@mAN@mO$-gQQOAN@mOOQOAN@iAN@iO$-nQPOAN@iO$-sQQO<<KpO$-}QPO,5=lOOQO-E;O-E;OOOQO7+(O7+(OO$.`QPO7+(OO$.eQPO<<InOOQO<<In<<InO$.jQPO<<IjOOQO<<Ij<<IjO#LdQPO<<IjO$.jQPO<<IjO$.xQQO,5=iOOQO-E:{-E:{OOQO<<Je<<JeO$/TQPO,5>tOOQOG26XG26XOOQOG26TG26TOOQO<<Kj<<KjOOQOAN?YAN?YOOQOAN?UAN?UO#LdQPOAN?UO$/]QPOAN?UO$/bQPOAN?UO$/pQPOG24pOOQOG24pG24pO#LdQPOG24pOOQOLD*[LD*[O$/uQPOLD*[OOQO!$'Mv!$'MvO*jQPO'#CaO$/zQQO'#H]O$0_QQO'#CbO!'{QPO'#Cy",
        stateData: "$0}~OPOSQOS%xOS~OZ`O_VO`VOaVObVOcVOeVOg^Oh^Op!POv{OwkOz!OO}cO!PvO!SyO!TyO!UyO!VyO!WyO!XyO!YyO!ZzO![!`O!]yO!^yO!_yO!u}O!z|O#fpO#qoO#spO#tpO#x!RO#y!QO$V!SO$X!TO$_!UO$b!VO$d!XO$g!WO$k!YO$m!ZO$r![O$t!]O$v!^O$x!_O${!aO$}!bO%|TO&ORO&QQO&WUO&sdO~Og^Oh^Ov{O}cO!P!mO!SyO!TyO!UyO!VyO!W!pO!XyO!YyO!ZzO!]yO!^yO!_yO!u}O!z|O%|TO&O!cO&Q!dO&^!hO&sdO~OWiXW&PXZ&PXuiXu&PX!P&PX!b&PX#]&PX#_&PX#a&PX#b&PX#d&PX#e&PX#f&PX#g&PX#h&PX#j&PX#n&PX#q&PX%|iX&OiX&QiX&]&PX&^iX&^&PX&m&PX&uiX&u&PX&w!aX~O#o$]X~P&bOWUXW&[XZUXuUXu&[X!PUX!bUX#]UX#_UX#aUX#bUX#dUX#eUX#fUX#gUX#hUX#jUX#nUX#qUX%|&[X&O&[X&Q&[X&]UX&^UX&^&[X&mUX&uUX&u&[X&w!aX~O#o$]X~P(fO&OSO&Q!qO~O&V!vO&X!tO~Og^Oh^O!SyO!TyO!UyO!VyO!WyO!XyO!YyO!ZzO!]yO!^yO!_yO%|TO&O!wO&QWOg!RXh!RX$g!RX&O!RX&Q!RX~O#x!|O#y!{O$V!}Ov!RX!u!RX!z!RX&s!RX~P*zOW#XOu#OO%|TO&O#SO&Q#SO&u&`X~OW#[Ou&ZX%|&ZX&O&ZX&Q&ZX&u&ZXY&ZXw&ZX&m&ZX&p&ZXZ&ZXq&ZX&]&ZX!P&ZX#_&ZX#a&ZX#b&ZX#d&ZX#e&ZX#f&ZX#g&ZX#h&ZX#j&ZX#n&ZX#q&ZX}&ZX!r&ZX#o&ZXs&ZX|&ZX~O&^#YO~P-^O&^&ZX~P-^OZ`O_VO`VOaVObVOcVOeVOg^Oh^Op!POwkOz!OO!SyO!TyO!UyO!VyO!WyO!XyO!YyO!ZzO!]yO!^yO!_yO#fpO#qoO#spO#tpO%|TO&WUO~O&O#^O&Q#]OY&oP~P/lO%|TOg%aXh%aXv%aX!S%aX!T%aX!U%aX!V%aX!W%aX!X%aX!Y%aX!Z%aX!]%aX!^%aX!_%aX!u%aX!z%aX$g%aX&O%aX&Q%aX&s%aX&^%aX~O!SyO!TyO!UyO!VyO!WyO!XyO!YyO!ZzO!]yO!^yO!_yOg!RXh!RXv!RX!u!RX!z!RX&O!RX&Q!RX&s!RX&^!RX~O$g!RX~P3^O|#kO~P]Og^Oh^Ov#pO!u#rO!z#qO&O!wO&QWO&s#oO~O$g#sO~P4|Ou#uO&u#vO!P&SX#_&SX#a&SX#b&SX#d&SX#e&SX#f&SX#g&SX#h&SX#j&SX#n&SX#q&SX&]&SX&^&SX&m&SX~OW#tOY&SX#o&SXs&SXq&SX|&SX~P5oO!b#wO#]#wOW&TXu&TX!P&TX#_&TX#a&TX#b&TX#d&TX#e&TX#f&TX#g&TX#h&TX#j&TX#n&TX#q&TX&]&TX&^&TX&m&TX&u&TXY&TX#o&TXs&TXq&TX|&TX~OZ#XX~P7^OZ#xO~O&u#vO~O#_#|O#a#}O#b$OO#d$QO#e$RO#f$SO#g$TO#h$UO#j$YO#n$VO#q$WO&]#zO&^#zO&m#{O~O!P$XO~P9`O&w$ZO~OZ`O_VO`VOaVObVOcVOeVOg^Oh^Op!POwkOz!OO#fpO#qoO#spO#tpO%|TO&O0qO&Q0pO&WUO~O#o$_O~O![$aO~O&O#SO&Q#SO~Og^Oh^O&O!wO&QWO&^#YO~OW$gO&u#vO~O#y!{O~O!W$kO&OSO&Q!qO~OZ$lO~OZ$oO~O!P$vO&O$uO&Q$uO~O!P$xO&O$uO&Q$uO~O!P${O~P:jOZ%OO}cO~OW&[Xu&[X%|&[X&O&[X&Q&[X&^&[X~OZ!aX~P>YOWiXuiX%|iX&OiX&QiX&^iX~OZ!aX~P>uOu#OO%|TO&O#SO&Q#SO~O%|TO~P3^Og^Oh^Ov#pO!u#rO!z#qO&^!hO&s#oO~O&O!cO&Q!dO~P?wOg^Oh^O%|TO&O!cO&Q!dO~O}cO!P%aO~OZ%bO~O}%dO!m%gO~O}cOg&fXh&fXv&fX!S&fX!T&fX!U&fX!V&fX!W&fX!X&fX!Y&fX!Z&fX!]&fX!^&fX!_&fX!u&fX!z&fX%|&fX&O&fX&Q&fX&^&fX&s&fX~OW%jOZ%kOgTahTa%|Ta&OTa&QTa~OvTa!STa!TTa!UTa!VTa!WTa!XTa!YTa!ZTa!]Ta!^Ta!_Ta!uTa!zTa#xTa#yTa$VTa$gTa&sTa&^TauTaYTaqTa|Ta!PTa~PBxO&V%nO&X!tO~Ou#OO%|TOqma&]maYma&mma!Pma~O&uma}ma!rma~PE[O!SyO!TyO!UyO!VyO!WyO!XyO!YyO!ZzO!]yO!^yO!_yO~Og!Rah!Rav!Ra!u!Ra!z!Ra$g!Ra&O!Ra&Q!Ra&s!Ra&^!Ra~PFQO#y%pO~Os%rO~Ou%sO%|TO~Ou#OO%|ra&Ora&Qra&uraYrawra&mra&pra!Pra&]raqra~OWra#_ra#ara#bra#dra#era#fra#gra#hra#jra#nra#qra&^ra#orasra|ra~PG{Ou#OO%|TOq&hX!P&hX!b&hX~OY&hX#o&hX~PIyO!b%vOq!`X!P!`XY!`X~Oq%wO!P&gX~O!P%yO~Ov%zO~Og^Oh^O%|0oO&O!wO&QWO&a%}O~O&]&_P~PKWO%|TO&O!wO&QWO~OW&PXYiXY!aXY&PXZ&PXq!aXu&PXwiX!b&PX#]&PX#_&PX#a&PX#b&PX#d&PX#e&PX#f&PX#g&PX#h&PX#j&PX#n&PX#q&PX&]&PX&^&PX&miX&m&PX&piX&uiX&u&PX&w!aX~P>uOWUXYUXY!aXY&[XZUXq!aXuUXw&[X!bUX#]UX#_UX#aUX#bUX#dUX#eUX#fUX#gUX#hUX#jUX#nUX#qUX&]UX&^UX&mUX&m&[X&p&[X&uUX&u&[X&w!aX~P>YOg^Oh^O%|TO&O!wO&QWOg!RXh!RX&O!RX&Q!RX~PFQOu#OOw&XO%|TO&O&UO&Q&TO&p&WO~OW#XOY&`X&m&`X&u&`X~P!!mOY&ZO~P9`Og^Oh^O&O!wO&QWO~Oq&]OY&oX~OY&_O~Og^Oh^O%|TO&O!wO&QWOY&oP~PFQOY&dO&m&bO&u#vO~Oq&eO&w$ZOY&vX~OY&gO~O%|TOg%aah%aav%aa!S%aa!T%aa!U%aa!V%aa!W%aa!X%aa!Y%aa!Z%aa!]%aa!^%aa!_%aa!u%aa!z%aa$g%aa&O%aa&Q%aa&s%aa&^%aa~O|&hO~P]O}&iO~Op&uOw&vO&OSO&Q!qO&^#YO~Oz&tO~P!&|Oz&xO&OSO&Q!qO&^#YO~OY&dP~P:jOg^Oh^O%|TO&O!wO&QWO~O}cO~P:jOW#XOu#OO%|TO&u&`X~O#q$WO!P#ra#_#ra#a#ra#b#ra#d#ra#e#ra#f#ra#g#ra#h#ra#j#ra#n#ra&]#ra&^#ra&m#raY#ra#o#ras#raq#ra|#ra~Oo'_O}'^O!r'`O&^!hO~O}'eO!r'`O~Oo'iO}'hO&^!hO~OZ#xOu'mO%|TO~OW%jO}'sO~OW%jO!P'uO~OW'vO!P'wO~O$g!WO&O0qO&Q0pO!P&dP~P/lO!P(SO#o(TO~P9`O}(UO~O$b(WO~O!P(XO~O!P(YO~O!P(ZO~P9`O!P(]O~P9`OZ$lO_VO`VOaVObVOcVOeVOg^Oh^Op!POwkOz!OO%|TO&O(_O&Q(^O&WUO~PFQO%P(hO%T(iOZ$|a_$|a`$|aa$|ab$|ac$|ae$|ag$|ah$|ap$|av$|aw$|az$|a}$|a!P$|a!S$|a!T$|a!U$|a!V$|a!W$|a!X$|a!Y$|a!Z$|a![$|a!]$|a!^$|a!_$|a!u$|a!z$|a#f$|a#q$|a#s$|a#t$|a#x$|a#y$|a$V$|a$X$|a$_$|a$b$|a$d$|a$g$|a$k$|a$m$|a$r$|a$t$|a$v$|a$x$|a${$|a$}$|a%v$|a%|$|a&O$|a&Q$|a&W$|a&s$|a|$|a$`$|a$p$|a~O}ra!rra&}ra~PG{OZ%bO~PIyO!P(mO~O!m%gO}&ka!P&ka~O}cO!P(pO~Oo(tOq!fX&]!fX~Oq(vO&]&lX~O&](xO~OZ`O_VO`VOaVObVOcVOeVOg^Oh^Op)UOv{Ow)TOz!OO|)PO}cO!PvO![!`O!u}O!z|O#fpO#qoO#spO#tpO#x!RO#y!QO$V!SO$X!TO$_!UO$b!VO$d!XO$g!WO$k!YO$m!ZO$r![O$t!]O$v!^O$x!_O${!aO$}!bO%|TO&ORO&QQO&WUO&^#YO&sdO~PFQO}%dO~O})]OY&yP~P:jOW%jO!P)dO~Os)eO~Ou#OO%|TOq&ha!P&ha!b&haY&ha#o&ha~O})fO~P:jOq%wO!P&ga~Og^Oh^O%|0oO&O!wO&QWO~O&a)mO~P!7zOu#OO%|TOq&`X&]&`XY&`X&m&`X!P&`X~O}&`X!r&`X~P!8dOo)oOp)oOqnX&]nX~Oq)pO&]&_X~O&])rO~Ou#OOw)tO%|TO&OSO&Q!qO~OYma&mma&uma~P!9rOW&PXY!aXq!aXu!aX%|!aX~OWUXY!aXq!aXu!aX%|!aX~OW)wO~Ou#OO%|TO&O#SO&Q#SO&p)yO~Og^Oh^O%|TO&O!wO&QWO~PFQOq&]OY&oa~Ou#OO%|TO&O#SO&Q#SO&p&WO~OY)|O~OY*PO&m&bO~Oq&eOY&va~Og^Oh^Ov{O|*XO!u}O%|TO&O!wO&QWO&sdO~PFQO!P*YO~OW^iZ#XXu^i!P^i!b^i#]^i#_^i#a^i#b^i#d^i#e^i#f^i#g^i#h^i#j^i#n^i#q^i&]^i&^^i&m^i&u^iY^i#o^is^iq^i|^i~OW*iO~Os*jO~P9`Oz*kO&OSO&Q!qO~O!P]iY]i#o]is]iq]i|]i~P9`Oq*lOY&dX!P&dX~P9`OY*nO~O#f$SO#g$TO#j$YO#q$WO!P#^i#_#^i#a#^i#b#^i#d#^i#e#^i#n#^i&]#^i&^#^i&m#^iY#^i#o#^is#^iq#^i|#^i~O#h$UO~P!@zO#_#|O#d$QO#e$RO#f$SO#g$TO#h$UO#j$YO#q$WO&]#zO&^#zO&m#{O!P#^i#b#^i#n#^iY#^i#o#^is#^iq#^i|#^i~O#a#^i~P!B`O#a#}O~P!B`O#_#|O#f$SO#g$TO#h$UO#j$YO#q$WO&]#zO&^#zO!P#^i#a#^i#b#^i#d#^i#e#^i#n#^iY#^i#o#^is#^iq#^i|#^i~O&m#^i~P!C{O#_#|O#f$SO#g$TO#h$UO#j$YO#q$WO&]#zO&^#zO&m#{O!P#^i#a#^i#b#^i#d#^i#n#^iY#^i#o#^is#^iq#^i|#^i~O#e$RO~P!EaO&m#{O~P!C{O#j$YO#q$WO!P#^i#_#^i#a#^i#b#^i#d#^i#e#^i#f#^i#h#^i#n#^i&]#^i&^#^i&m#^iY#^i#o#^is#^iq#^i|#^i~O#g$TO~P!F|O#g#^i~P!F|O#h#^i~P!@zO#o*oO~P9`O#_&`X#a&`X#b&`X#d&`X#e&`X#f&`X#g&`X#h&`X#j&`X#n&`X#q&`X&^&`X#o&`Xs&`X|&`X~P!8dO!P#kiY#ki#o#kis#kiq#ki|#ki~P9`O|*rO~P$wO}'^O~O}'^O!r'`O~Oo'_O}'^O!r'`O~O%|TO&O#SO&Q#SO|&rP!P&rP~PFQO}'eO~Og^Oh^Ov{O|+PO!P*}O!u}O!z|O%|TO&O!wO&QWO&^!hO&sdO~PFQO}'hO~Oo'iO}'hO~Os+RO~P:jOu+TO%|TO~Ou'mO})fO%|TOW#Zi!P#Zi#_#Zi#a#Zi#b#Zi#d#Zi#e#Zi#f#Zi#g#Zi#h#Zi#j#Zi#n#Zi#q#Zi&]#Zi&^#Zi&m#Zi&u#ZiY#Zi#o#Zis#Ziq#Zi|#Zi~O}'^OW&ciu&ci!P&ci#_&ci#a&ci#b&ci#d&ci#e&ci#f&ci#g&ci#h&ci#j&ci#n&ci#q&ci&]&ci&^&ci&m&ci&u&ciY&ci#o&cis&ciq&ci|&ci~O#|+]O$O+^O$Q+^O$R+_O$S+`O~O|+[O~P#!`O$Y+aO&OSO&Q!qO~OW+bO!P+cO~O$`+dOZ$^i_$^i`$^ia$^ib$^ic$^ie$^ig$^ih$^ip$^iv$^iw$^iz$^i}$^i!P$^i!S$^i!T$^i!U$^i!V$^i!W$^i!X$^i!Y$^i!Z$^i![$^i!]$^i!^$^i!_$^i!u$^i!z$^i#f$^i#q$^i#s$^i#t$^i#x$^i#y$^i$V$^i$X$^i$_$^i$b$^i$d$^i$g$^i$k$^i$m$^i$r$^i$t$^i$v$^i$x$^i${$^i$}$^i%v$^i%|$^i&O$^i&Q$^i&W$^i&s$^i|$^i$p$^i~Og^Oh^O$g#sO&O!wO&QWO~O!P+hO~P:jO!P+iO~OZ`O_VO`VOaVObVOcVOeVOg^Oh^Op!POv{OwkOz!OO}cO!PvO!SyO!TyO!UyO!VyO!WyO!XyO!YyO!Z+nO![!`O!]yO!^yO!_yO!u}O!z|O#fpO#qoO#spO#tpO#x!RO#y!QO$V!SO$X!TO$_!UO$b!VO$d!XO$g!WO$k!YO$m!ZO$p+oO$r![O$t!]O$v!^O$x!_O${!aO$}!bO%|TO&ORO&QQO&WUO&sdO~O|+mO~P#'rOW&PXY&PXZ&PXu&PX!P&PX&uiX&u&PX~P>uOWUXYUXZUXuUX!PUX&uUX&u&[X~P>YOW#tOu#uO&u#vO~OW&TXY%WXu&TX!P%WX&u&TX~OZ#XX~P#,wOY+uO!P+sO~O%P(hO%T(iOZ$|i_$|i`$|ia$|ib$|ic$|ie$|ig$|ih$|ip$|iv$|iw$|iz$|i}$|i!P$|i!S$|i!T$|i!U$|i!V$|i!W$|i!X$|i!Y$|i!Z$|i![$|i!]$|i!^$|i!_$|i!u$|i!z$|i#f$|i#q$|i#s$|i#t$|i#x$|i#y$|i$V$|i$X$|i$_$|i$b$|i$d$|i$g$|i$k$|i$m$|i$r$|i$t$|i$v$|i$x$|i${$|i$}$|i%v$|i%|$|i&O$|i&Q$|i&W$|i&s$|i|$|i$`$|i$p$|i~OZ+xO~O%P(hO%T(iOZ%Ui_%Ui`%Uia%Uib%Uic%Uie%Uig%Uih%Uip%Uiv%Uiw%Uiz%Ui}%Ui!P%Ui!S%Ui!T%Ui!U%Ui!V%Ui!W%Ui!X%Ui!Y%Ui!Z%Ui![%Ui!]%Ui!^%Ui!_%Ui!u%Ui!z%Ui#f%Ui#q%Ui#s%Ui#t%Ui#x%Ui#y%Ui$V%Ui$X%Ui$_%Ui$b%Ui$d%Ui$g%Ui$k%Ui$m%Ui$r%Ui$t%Ui$v%Ui$x%Ui${%Ui$}%Ui%v%Ui%|%Ui&O%Ui&Q%Ui&W%Ui&s%Ui|%Ui$`%Ui$p%Ui~Ou#OO%|TO}&na!P&na!m&na~O!P,OO~Oo(tOq!fa&]!fa~Oq(vO&]&la~O!m%gO}&ki!P&ki~O|,XO~P]OW,ZO~P5oOW&TXu&TX#_&TX#a&TX#b&TX#d&TX#e&TX#f&TX#g&TX#h&TX#j&TX#n&TX#q&TX&]&TX&^&TX&m&TX&u&TX~OZ#xO!P&TX~P#7OOW$gOZ#xO&u#vO~Op,]Ow,]O~Oq,^O}&qX!P&qX~O!b,`O#]#wOY&TXZ#XX~P#7OOY&RXq&RX|&RX!P&RX~P9`O})]O|&xP~P:jOY&RXg%ZXh%ZX%|%ZX&O%ZX&Q%ZXq&RX|&RX!P&RX~Oq,cOY&yX~OY,eO~O})fO|&jP~P:jOq&iX!P&iX|&iXY&iX~P9`O&aTa~PBxOo)oOp)oOqna&]na~Oq)pO&]&_a~OW,mO~Ow,nO~Ou#OO%|TO&O,rO&Q,qO~Og^Oh^Ov#pO!u#rO&O!wO&QWO&s#oO~Og^Oh^Ov{O|,wO!u}O%|TO&O!wO&QWO&sdO~PFQOw-SO&OSO&Q!qO&^#YO~Oq*lOY&da!P&da~O#_ma#ama#bma#dma#ema#fma#gma#hma#jma#nma#qma&^ma#omasma|ma~PE[O|-WO~P$wOZ#xO}'^Oq!|X|!|X!P!|X~Oq-[O|&rX!P&rX~O|-_O!P-^O~O&^!hO~P4|Og^Oh^Ov{O|-cO!P*}O!u}O!z|O%|TO&O!wO&QWO&^!hO&sdO~PFQOs-dO~P9`Os-dO~P:jO}'^OW&cqu&cq!P&cq#_&cq#a&cq#b&cq#d&cq#e&cq#f&cq#g&cq#h&cq#j&cq#n&cq#q&cq&]&cq&^&cq&m&cq&u&cqY&cq#o&cqs&cqq&cq|&cq~O|-hO~P#!`O!W-lO#}-lO&OSO&Q!qO~O!P-oO~O$Y-pO&OSO&Q!qO~O!b%vO#o-rOq!`X!P!`X~O!P-tO~P9`O!P-tO~P:jO!P-wO~P9`O|-yO~P#'rO![$aO#o-zO~O!P-|O~O!b-}O~OY.QOZ$lO_VO`VOaVObVOcVOeVOg^Oh^Op!POwkOz!OO%|TO&O(_O&Q(^O&WUO~PFQOY.QO!P.RO~O%P(hO%T(iOZ%Uq_%Uq`%Uqa%Uqb%Uqc%Uqe%Uqg%Uqh%Uqp%Uqv%Uqw%Uqz%Uq}%Uq!P%Uq!S%Uq!T%Uq!U%Uq!V%Uq!W%Uq!X%Uq!Y%Uq!Z%Uq![%Uq!]%Uq!^%Uq!_%Uq!u%Uq!z%Uq#f%Uq#q%Uq#s%Uq#t%Uq#x%Uq#y%Uq$V%Uq$X%Uq$_%Uq$b%Uq$d%Uq$g%Uq$k%Uq$m%Uq$r%Uq$t%Uq$v%Uq$x%Uq${%Uq$}%Uq%v%Uq%|%Uq&O%Uq&Q%Uq&W%Uq&s%Uq|%Uq$`%Uq$p%Uq~Ou#OO%|TO}&ni!P&ni!m&ni~O&m&bOq!ga&]!ga~O!m%gO}&kq!P&kq~O|.^O~P]Op.`Ow&vOz&tO&OSO&Q!qO&^#YO~O!P.aO~Oq,^O}&qa!P&qa~O})]O~P:jOq.gO|&xX~O|.iO~Oq,cOY&ya~Oq.mO|&jX~O|.oO~Ow.pO~Oq!aXu!aX!P!aX!b!aX%|!aX~OZ&PX~P#MdOZUX~P#MdO!P.qO~OZ.rO~OW^yZ#XXu^y!P^y!b^y#]^y#_^y#a^y#b^y#d^y#e^y#f^y#g^y#h^y#j^y#n^y#q^y&]^y&^^y&m^y&u^yY^y#o^ys^yq^y|^y~OY%_aq%_a!P%_a~P9`O!P#myY#my#o#mys#myq#my|#my~P9`O}'^Oq!|a|!|a!P!|a~OZ#xO}'^Oq!|a|!|a!P!|a~O%|TO&O#SO&Q#SOq%iX|%iX!P%iX~PFQOq-[O|&ra!P&ra~O|!}X~P$wO|/PO~Os/QO~P9`OW%jO!P/RO~OW%jO$P/WO&OSO&Q!qO!P&{P~OW%jO$T/XO~O!P/YO~O!b%vO#o/[Oq!`X!P!`X~OY/^O~O!P/_O~P9`O#o/`O~P9`O!b/bO~OY/cOZ$lO_VO`VOaVObVOcVOeVOg^Oh^Op!POwkOz!OO%|TO&O(_O&Q(^O&WUO~PFQOW#[Ou&ZX%|&ZX&O&ZX&Q&ZX&}&ZX~O&^#YO~P$'fOu#OO%|TO&}/eO&O%RX&Q%RX~O&m&bOq!gi&]!gi~Op/iO&OSO&Q!qO~OW*iOZ#xO~O!P/kO~OY&RXq&RX~P9`O})]Oq%mX|%mX~P:jOq.gO|&xa~O!b/nO~O})fOq%bX|%bX~P:jOq.mO|&ja~OY/qO~O!P/rO~OZ/sO~O}'^Oq!|i|!|i!P!|i~O|!}a~P$wOW%jO!P/wO~OW%jOq/xO!P&{X~OY/|O~P9`OY0OO~OY%Wq!P%Wq~P9`O&}/eO&O%Ra&Q%Ra~OY0TO~O!P0WO~Ou#OO!P0YO!Z0ZO%|TO~OY0[O~Oq/xO!P&{a~O!P0_O~OW%jOq/xO!P&|X~OY0aO~P9`OY0bO~OY%Wy!P%Wy~P9`Ou#OO%|TO&O%ta&Q%ta&}%ta~OY0cO~O!P0dO~Ou#OO!P0eO!Z0fO%|TO~OW%jOq%qa!P%qa~Oq/xO!P&|a~O!P0jO~Ou#OO!P0jO!Z0kO%|TO~O!P0lO~O!P0nO~O#o&PXY&PXs&PXq&PX|&PX~P&bO#oUXYUXsUXqUX|UX~P(fO`Q_P#g%x&O&Wc&W~",
        goto: "#+R&}PPPP'O'c*w-}P'cPP.c.g0OPPPPP1mP3YPP4u7k:Z<y=c?ZPPP?aPAzPPPBt3YPDpPPEkPFbFjPPPPPPPPPPPPGuH^PKiKqK}LiLoLuNhNlNlNtP! T!!]!#Q!#[P!#q!!]P!#w!$R!!x!$bP!%R!%]!%c!!]!%f!%lFbFb!%p!%z!%}3Y!'l3Y3Y!)hP.gP!)lPP!*^PPPPP.gP.g!*}.gPP.gP.gPP.g!,f!,pPP!,v!-PPPPPPPPP'OP'OPP!-T!-T!-h!-TPP!-TP!-TP!.R!.UP!-T!.l!-TP!-TP!.o!.rP!-TP!-TP!-TP!-TP!-T!-TP!-TP!.vP!.|!/P!/VP!-T!/c!/fP!/n!0Q!4S!4Y!4`!5f!5l!5z!7Q!7W!7^!7h!7n!7t!7z!8Q!8W!8^!8d!8j!8p!8v!8|!9S!9^!9d!9n!9tPPP!9z!-T!:oP!>VP!?ZP!Ao!BV!E[3YPPP!F{!Jl!M`PP#!O#!RP#$_#$e#&U#&e#&m#'o#(X#)S#)]#)`#)nP#)q#)}P#*U#*]P#*`P#*kP#*n#*q#*t#*x#+OstOcx![#l$_$m$n$p$q%d(U)Q)R+d+l,Y'urOPXY`acopx!Y![!_!a!e!f!h!i!o!x#P#T#Y#[#_#`#e#i#l#n#u#w#x#|#}$O$P$Q$R$S$T$U$V$Y$Z$[$]$_$e$l$m$n$o$p$q%O%S%V%Z%^%_%b%d%g%k%u%v%{%|&R&S&[&]&`&b&d&i'X'^'_'`'e'h'i'm'n'p'{'|(O(T(U(`(l(t(v({(})O)Q)R)])f)o)p*P*T*W*l*o*p*q*z*{+O+T+d+f+h+i+l+o+r+s+x+},W,Y,^,`,u-[-^-a-r-t-}.R.V.g.m/O/[/_/b/d/n/q0R0X0Z0[0f0h0k0r#xhO`copx!Y![!_!a#l#u#w#x#|#}$O$P$Q$R$S$T$U$V$Z$_$l$m$n$o$p$q%d%v&d'm(O(T(U)Q)R)])f*P*l*o+T+d+h+i+l+o,Y,`-r-t-}.g.m/[/_/b/n0Z0f0kt!sT!Q!S!T!{!}$k%p+]+^+_+`-k-m/W/X/x0oQ#mdS&Y#`(}Q&l#oU&q#t$g,ZQ&x#vW(b%O+s.R/dU)Y%j'v+bQ)Z%kS)u&S,WU*f&s-R._Q*k&yQ,t*TQ-P*iQ.j,cR.t,uu!sT!Q!S!T!{!}$k%p+]+^+_+`-k-m/W/X/x0oT%l!r)l#{qO`copx!Y![!_!a#l#u#w#x#|#}$O$P$Q$R$S$T$U$V$Z$_$l$m$n$o$p$q%d%k%v&d'm(O(T(U)Q)R)])f*P*l*o+T+d+h+i+l+o,Y,`-r-t-}.g.m/[/_/b/n0Z0f0k#zlO`copx!Y![!_!a#l#u#w#x#|#}$O$P$Q$R$S$T$U$V$Z$_$l$m$n$o$p$q%d%k%v&d'm(O(T(U)Q)R)])f*P*l*o+T+d+h+i+l+o,Y,`-r-t-}.g.m/[/_/b/n0Z0f0kX(c%O+s.R/d$TVO`copx!Y![!_!a#l#u#w#x#|#}$O$P$Q$R$S$T$U$V$Z$_$l$m$n$o$p$q%O%d%k%v&d'm(O(T(U)Q)R)])f*P*l*o+T+d+h+i+l+o+s,Y,`-r-t-}.R.g.m/[/_/b/d/n0Z0f0k$TkO`copx!Y![!_!a#l#u#w#x#|#}$O$P$Q$R$S$T$U$V$Z$_$l$m$n$o$p$q%O%d%k%v&d'm(O(T(U)Q)R)])f*P*l*o+T+d+h+i+l+o+s,Y,`-r-t-}.R.g.m/[/_/b/d/n0Z0f0k&O[OPX`ceopx!O!Y![!_!a!g!i!o#Y#_#b#e#l#u#w#x#|#}$O$P$Q$R$S$T$U$V$Y$Z$[$_$f$l$m$n$o$p$q%O%_%b%d%g%k%v%{&]&b&d&i&t'^'_'`'h'i'm'{'}(O(T(U(d(t)O)Q)R)])f)o)p*P*U*W*l*o*q*{*|+O+T+d+h+i+l+o+s,Y,^,`-^-r-t-}.R.g.m/O/[/_/b/d/n0Z0f0k0rQ&Q#[Q)s&RV.T+x.X/e&O[OPX`ceopx!O!Y![!_!a!g!i!o#Y#_#b#e#l#u#w#x#|#}$O$P$Q$R$S$T$U$V$Y$Z$[$_$f$l$m$n$o$p$q%O%_%b%d%g%k%v%{&]&b&d&i&t'^'_'`'h'i'm'{'}(O(T(U(d(t)O)Q)R)])f)o)p*P*U*W*l*o*q*{*|+O+T+d+h+i+l+o+s,Y,^,`-^-r-t-}.R.g.m/O/[/_/b/d/n0Z0f0k0rV.T+x.X/e&O]OPX`ceopx!O!Y![!_!a!g!i!o#Y#_#b#e#l#u#w#x#|#}$O$P$Q$R$S$T$U$V$Y$Z$[$_$f$l$m$n$o$p$q%O%_%b%d%g%k%v%{&]&b&d&i&t'^'_'`'h'i'm'{'}(O(T(U(d(t)O)Q)R)])f)o)p*P*U*W*l*o*q*{*|+O+T+d+h+i+l+o+s,Y,^,`-^-r-t-}.R.g.m/O/[/_/b/d/n0Z0f0k0rV.U+x.X/eS#Z[.TS$f!O&tS&s#t$gQ&y#vQ)V%dQ-R*iR._,Z$kZO`copx!Y![!_!a#Y#l#u#w#x#|#}$O$P$Q$R$S$T$U$V$Y$Z$_$l$m$n$o$p$q%O%d%g%k%v&b&d'_'`'i'm(O(T(U(t)Q)R)])f)o)p*P*l*o+T+d+h+i+l+o+s,Y,^,`-r-t-}.R.g.m/[/_/b/d/n0Z0f0kQ&O#YR,k)p&P_OPX`ceopx!Y![!_!a!g!i!o#Y#_#b#e#l#u#w#x#|#}$O$P$Q$R$S$T$U$V$Y$Z$[$_$l$m$n$o$p$q%O%_%b%d%g%k%v%{&]&b&d&i'^'_'`'h'i'm'{'}(O(T(U(d(t)O)Q)R)])f)o)p*P*U*W*l*o*q*{*|+O+T+d+h+i+l+o+s+x,Y,^,`-^-r-t-}.R.X.g.m/O/[/_/b/d/e/n0Z0f0k0r!o#QY!e!x#R#T#`#n$]%R%S%V%^%u%|&S&[&`'X'|(`(l({(}*T*p*z+f+r+},W,u-a.V/q0R0X0[0h$SkO`copx!Y![!_!a#l#u#w#x#|#}$O$P$Q$R$S$T$U$V$Z$_$l$m$n$o$p$q%O%d%k%v&d'm(O(T(U)Q)R)])f*P*l*o+T+d+h+i+l+o+s,Y,`-r-t-}.R.g.m/[/_/b/d/n0Z0f0kQ$m!UQ$n!VQ$s!ZQ$|!`R+p(WQ#yiS'q$e*hQ*e&rQ+X'rS,[)T)UQ-O*gQ-Y*vQ.b,]Q.x-QQ.{-ZQ/j.`Q/u.yR0V/iQ'a$bW*[&m'b'c'dQ+W'qU,x*]*^*_Q-X*vQ-f+XS.u,y,zS.z-Y-ZQ/t.vR/v.{]!mP!o'^*q-^/OreOcx![#l$_$m$n$p$q%d(U)Q)R+d+l,Y[!gP!o'^*q-^/OW#b`#e%b&]Q'}$oW(d%O+s.R/dS*U&i*WS*w'e-[S*|'h+OR.X+xh#VY!W!e#n#s%V'|*T*z+f,u-aQ)j%wQ)v&WR,o)y#xnOcopx!Y![!_!a#l#u#w#x#|#}$O$P$Q$R$S$T$U$V$Z$_$l$m$n$o$p$q%d%k%v&d'm(O(T(U)Q)R)])f*P*l*o+T+d+h+i+l+o,Y,`-r-t-}.g.m/[/_/b/n0Z0f0k^!kP!g!o'^*q-^/Ov#TY!W#`#n#s%w&W&[&`'|(`(})y*T+f+r,u.W/hQ#g`Q$b{Q$c|Q$d}W%S!e%V*z-aS%Y!h(vQ%`!iQ&m#pQ&n#qQ&o#rQ(u%ZS(y%^({Q*R&eS*v'e-[R-Z*wU)h%v)f.mR+V'p[!mP!o'^*q-^/OT*}'h+O^!iP!g!o'^*q-^/OQ'd$bQ'l$dQ*_&mQ*d&oV*{'h*|+OQ%[!hR,S(vQ(s%YR,R(u#znO`copx!Y![!_!a#l#u#w#x#|#}$O$P$Q$R$S$T$U$V$Z$_$l$m$n$o$p$q%d%k%v&d'm(O(T(U)Q)R)])f*P*l*o+T+d+h+i+l+o,Y,`-r-t-}.g.m/[/_/b/n0Z0f0kQ%c!kS(l%S(yR(|%`T#e`%bU#c`#e%bR)z&]Q%f!lQ(n%UQ(r%XQ,U(zR.],VrvOcx![#l$_$m$n$p$q%d(U)Q)R+d+l,Y[!mP!o'^*q-^/OQ%P!bQ%a!jQ%i!pQ'[$ZQ([$|Q(k%QQ(p%WQ+z(iR.Y+yrtOcx![#l$_$m$n$p$q%d(U)Q)R+d+l,Y[!mP!o'^*q-^/OS*V&i*WT*}'h+OQ'c$bS*^&m'dR,z*_Q'b$bQ'g$cU*]&m'c'dQ*a&nS,y*^*_R.v,zQ*u'`R+Q'iQ'k$dS*c&o'lR,}*dQ'j$dU*b&o'k'lS,|*c*dR.w,}rtOcx![#l$_$m$n$p$q%d(U)Q)R+d+l,Y[!mP!o'^*q-^/OT*}'h+OQ'f$cS*`&n'gR,{*aQ*x'eR.|-[R-`*yQ&j#mR*Z&lT*V&i*WQ%e!lS(q%X%fR,P(rR)R%dWk%O+s.R/d#{lO`copx!Y![!_!a#l#u#w#x#|#}$O$P$Q$R$S$T$U$V$Z$_$l$m$n$o$p$q%d%k%v&d'm(O(T(U)Q)R)])f*P*l*o+T+d+h+i+l+o,Y,`-r-t-}.g.m/[/_/b/n0Z0f0k$SiO`copx!Y![!_!a#l#u#w#x#|#}$O$P$Q$R$S$T$U$V$Z$_$l$m$n$o$p$q%O%d%k%v&d'm(O(T(U)Q)R)])f*P*l*o+T+d+h+i+l+o+s,Y,`-r-t-}.R.g.m/[/_/b/d/n0Z0f0kU&r#t$g,ZS*g&s._Q-Q*iR.y-RT'o$e'p!_#|m#a$r$z$}&w&z&{'O'P'Q'R'S'W'Z)[)g+S+g+j-T-V-e-v-{.e/Z/a/}0Q!]$Pm#a$r$z$}&w&z&{'O'P'R'S'W'Z)[)g+S+g+j-T-V-e-v-{.e/Z/a/}0Q#{nO`copx!Y![!_!a#l#u#w#x#|#}$O$P$Q$R$S$T$U$V$Z$_$l$m$n$o$p$q%d%k%v&d'm(O(T(U)Q)R)])f*P*l*o+T+d+h+i+l+o,Y,`-r-t-}.g.m/[/_/b/n0Z0f0ka)^%k)],`.g/n0Z0f0kQ)`%kR.k,cQ't$hQ)b%oR,f)cT+Y's+ZsvOcx![#l$_$m$n$p$q%d(U)Q)R+d+l,YruOcx![#l$_$m$n$p$q%d(U)Q)R+d+l,YQ$w!]R$y!^R$p!XrvOcx![#l$_$m$n$p$q%d(U)Q)R+d+l,YR(O$oR$q!XR(V$sT+k(U+lX(f%P(g(k+{R+y(hQ.W+xR/h.XQ(j%PQ+w(gQ+|(kR.Z+{R%Q!bQ(e%OV.P+s.R/dQxOQ#lcW$`x#l)Q,YQ)Q%dR,Y)RrXOcx![#l$_$m$n$p$q%d(U)Q)R+d+l,Yn!fP!o#e&]&i'^'e'h*W*q+O+x-[-^/Ol!zX!f#P#_#i$[%Z%_%{&R'n'{)O0r!j#PY!e!x#T#`#n$]%S%V%^%u%|&S&[&`'X'|(`(l({(}*T*p*z+f+r+},W,u-a.V/q0R0X0[0hQ#_`Q#ia#d$[op!Y!_!a#u#w#x#|#}$O$P$Q$R$S$T$U$V$Z$l%g%k%v&b&d'_'`'i'm(O(T(t)])f)o*P*l*o+T+h+i+o,^,`-r-t-}.g.m/[/_/b/n0Z0f0kS%Z!h(vS%_!i*{S%{#Y)pQ&R#[S'n$e'pY'{$o%O+s.R/dQ)O%bR0r$YQ!uUR%m!uQ)q&OR,l)q^#RY#`$]'X'|(`*px%R!e!x#n%V%^%|&S&[&`({(}*T*z+f+r,W,u-a.V0R[%t#R%R%u+}0X0hS%u#T%SQ+}(lQ0X/qR0h0[Q*m&{R-U*mQ!oPU%h!o*q/OQ*q'^R/O-^!pbOP`cx![!o#e#l$_$m$n$o$p$q%O%b%d&]&i'^'e'h(U)Q)R*W*q+O+d+l+s+x,Y-[-^.R/O/dY!yX!f#_'{)OT#jb!yQ.n,gR/p.nQ%x#VR)k%xQ&c#fS*O&c.[R.[,QQ(w%[R,T(wQ&^#cR){&^Q,_)WR.d,_Q+O'hR-b+OQ-]*xR.}-]Q*W&iR,v*WQ'p$eR+U'pQ&f#gR*S&fQ.h,aR/m.hQ,d)`R.l,dQ+Z'sR-g+ZQ-k+]R/T-kQ/y/US0^/y0`R0`/{Q+l(UR-x+lQ(g%PS+v(g+{R+{(kQ/f.VR0S/fQ+t(eR.S+t`wOcx#l%d)Q)R,YQ$t![Q']$_Q'y$mQ'z$nQ(Q$pQ(R$qS+k(U+lR-q+d'dsOPXY`acopx!Y![!_!a!e!f!h!i!o!x#P#T#Y#[#_#`#e#i#l#n#u#w#x#|#}$O$P$Q$R$S$T$U$V$Y$Z$[$]$_$e$l$m$n$o$p$q%O%S%V%Z%^%_%b%d%g%u%v%{%|&R&S&[&]&`&b&d&i'X'^'_'`'e'h'i'm'n'p'{'|(O(T(U(`(l(t(v({(})O)Q)R)f)o)p*P*T*W*l*o*p*q*z*{+O+T+d+f+h+i+l+o+r+s+x+},W,Y,^,u-[-^-a-r-t-}.R.V.m/O/[/_/b/d/q0R0X0[0h0ra)_%k)],`.g/n0Z0f0kQ!rTQ$h!QQ$i!SQ$j!TQ%o!{Q%q!}Q'x$kQ)c%pQ)l0oS-i+]+_Q-m+^Q-n+`Q/S-kS/U-m/WQ/{/XR0]/x%uSOT`cdopx!Q!S!T!Y![!_!a!{!}#`#l#o#t#u#v#w#x#|#}$O$P$Q$R$S$T$U$V$Z$_$g$k$l$m$n$o$p$q%O%d%j%k%p%v&S&d&s&y'm'v(O(T(U(})Q)R)])f*P*T*i*l*o+T+]+^+_+`+b+d+h+i+l+o+s,W,Y,Z,`,c,u-R-k-m-r-t-}.R._.g.m/W/X/[/_/b/d/n/x0Z0f0k0oQ)a%kQ,a)]S.f,`/nQ/l.gQ0g0ZQ0i0fR0m0krmOcx![#l$_$m$n$p$q%d(U)Q)R+d+l,YS#a`$lQ$WoQ$^pQ$r!YQ$z!_Q$}!aQ&w#uQ&z#wY&{#x$o+h-t/_Q&}#|Q'O#}Q'P$OQ'Q$PQ'R$QQ'S$RQ'T$SQ'U$TQ'V$UQ'W$VQ'Z$Z^)[%k)].g/n0Z0f0kU)g%v)f.mQ*Q&dQ+S'mQ+g(OQ+j(TQ,p*PQ-T*lQ-V*oQ-e+TQ-v+iQ-{+oQ.e,`Q/Z-rQ/a-}Q/}/[R0Q/b#xgO`copx!Y![!_!a#l#u#w#x#|#}$O$P$Q$R$S$T$U$V$Z$_$l$m$n$o$p$q%k%v&d'm(O(T(U)Q)R)])f*P*l*o+T+d+h+i+l+o,Y,`-r-t-}.g.m/[/_/b/n0Z0f0kW(a%O+s.R/dR)S%drYOcx![#l$_$m$n$p$q%d(U)Q)R+d+l,Y[!eP!o'^*q-^/OW!xX$[%{'{Q#``Q#ne#S$]op!Y!_!a#u#w#x#|#}$O$P$Q$R$S$T$U$V$Z$l%k%v&d'm(O(T)])f*P*l*o+T+h+i+o,`-r-t-}.g.m/[/_/b/n0Z0f0kQ%V!gS%^!i*{d%|#Y%g&b'_'`'i(t)o)p,^Q&S#_Q&[#bS&`#e&]Q'X$YQ'|$oW(`%O+s.R/dQ({%_Q(}%bS*T&i*WQ*p0rS*z'h+OQ+f'}Q+r(dQ,W)OQ,u*UQ-a*|S.V+x.XR0R/e&O_OPX`ceopx!Y![!_!a!g!i!o#Y#_#b#e#l#u#w#x#|#}$O$P$Q$R$S$T$U$V$Y$Z$[$_$l$m$n$o$p$q%O%_%b%d%g%k%v%{&]&b&d&i'^'_'`'h'i'm'{'}(O(T(U(d(t)O)Q)R)])f)o)p*P*U*W*l*o*q*{*|+O+T+d+h+i+l+o+s+x,Y,^,`-^-r-t-}.R.X.g.m/O/[/_/b/d/e/n0Z0f0k0rQ$e!OQ'r$fR*h&t&ZWOPX`ceopx!O!Y![!_!a!g!i!o#Y#[#_#b#e#l#u#w#x#|#}$O$P$Q$R$S$T$U$V$Y$Z$[$_$f$l$m$n$o$p$q%O%_%b%d%g%k%v%{&R&]&b&d&i&t'^'_'`'h'i'm'{'}(O(T(U(d(t)O)Q)R)])f)o)p*P*U*W*l*o*q*{*|+O+T+d+h+i+l+o+s+x,Y,^,`-^-r-t-}.R.X.g.m/O/[/_/b/d/e/n0Z0f0k0rR&P#Y$QjOcopx!Y![!_!a#l#u#w#x#|#}$O$P$Q$R$S$T$U$V$Z$_$l$m$n$o$p$q%O%d%k%v&d'm(O(T(U)Q)R)])f*P*l*o+T+d+h+i+l+o+s,Y,`-r-t-}.R.g.m/[/_/b/d/n0Z0f0kQ#f`Q&O#YQ'Y$YU)W%g'`'iQ)}&bQ*s'_Q,Q(tQ,j)oQ,k)pR.c,^Q)n%}R,i)m$SfO`copx!Y![!_!a#l#u#w#x#|#}$O$P$Q$R$S$T$U$V$Z$_$l$m$n$o$p$q%O%d%k%v&d'm(O(T(U)Q)R)])f*P*l*o+T+d+h+i+l+o+s,Y,`-r-t-}.R.g.m/[/_/b/d/n0Z0f0kT&p#t,ZQ&|#xQ(P$oQ-u+hQ/]-tR0P/_]!nP!o'^*q-^/O#PaOPX`bcx![!f!o!y#_#e#l$_$m$n$o$p$q%O%b%d&]&i'^'e'h'{(U)O)Q)R*W*q+O+d+l+s+x,Y-[-^.R/O/dU#WY!W'|Q%T!eU&k#n#s+fQ(o%VS,s*T*zT.s,u-aj#UY!W!e#n#s%V%w&W)y*T*z,u-aU&V#`&`(}Q)x&[Q+e'|Q+q(`Q-s+fQ.O+rQ/g.WR0U/hQ)i%vQ,g)fR/o.mR,h)f`!jP!o'^'h*q+O-^/OT%W!g*|R%]!hW%U!e%V*z-aQ(z%^R,V({S#d`%bR&a#eQ)X%gT*t'`'iR*y'e[!lP!o'^*q-^/OR%X!gR#h`R,b)]R)a%kT-j+]-kQ/V-mR/z/WR/z/X",
        nodeNames: "\u26A0 LineComment BlockComment Program ModuleDeclaration MarkerAnnotation Identifier ScopedIdentifier . Annotation ) ( AnnotationArgumentList AssignmentExpression FieldAccess IntegerLiteral FloatingPointLiteral BooleanLiteral CharacterLiteral StringLiteral TextBlock null ClassLiteral void PrimitiveType TypeName ScopedTypeName GenericType TypeArguments AnnotatedType Wildcard extends super , ArrayType ] Dimension [ class this ParenthesizedExpression ObjectCreationExpression new ArgumentList } { ClassBody ; FieldDeclaration Modifiers public protected private abstract static final strictfp default synchronized native transient volatile VariableDeclarator Definition AssignOp ArrayInitializer MethodDeclaration TypeParameters TypeParameter TypeBound FormalParameters ReceiverParameter FormalParameter SpreadParameter Throws throws Block ClassDeclaration Superclass SuperInterfaces implements InterfaceTypeList InterfaceDeclaration interface ExtendsInterfaces InterfaceBody ConstantDeclaration EnumDeclaration enum EnumBody EnumConstant EnumBodyDeclarations AnnotationTypeDeclaration AnnotationTypeBody AnnotationTypeElementDeclaration StaticInitializer ConstructorDeclaration ConstructorBody ExplicitConstructorInvocation ArrayAccess MethodInvocation MethodName MethodReference ArrayCreationExpression Dimension AssignOp BinaryExpression CompareOp CompareOp LogicOp LogicOp BitOp BitOp BitOp ArithOp ArithOp BitOp InstanceofExpression instanceof LambdaExpression InferredParameters TernaryExpression LogicOp : UpdateExpression UpdateOp UnaryExpression LogicOp BitOp CastExpression ElementValueArrayInitializer ElementValuePair open module ModuleBody ModuleDirective requires transitive exports to opens uses provides with PackageDeclaration package ImportDeclaration import Asterisk ExpressionStatement LabeledStatement Label IfStatement if else WhileStatement while ForStatement for ForSpec LocalVariableDeclaration var EnhancedForStatement ForSpec AssertStatement assert SwitchStatement switch SwitchBlock SwitchLabel case DoStatement do BreakStatement break ContinueStatement continue ReturnStatement return SynchronizedStatement ThrowStatement throw TryStatement try CatchClause catch CatchFormalParameter CatchType FinallyClause finally TryWithResourcesStatement ResourceSpecification Resource ClassContent",
        maxTerm: 275,
        nodeProps: [
          ["isolate", -4, 1, 2, 18, 19, ""],
          ["group", -26, 4, 47, 76, 77, 82, 87, 92, 144, 146, 149, 150, 152, 155, 157, 160, 162, 164, 166, 171, 173, 175, 177, 179, 180, 182, 190, "Statement", -25, 6, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 39, 40, 41, 99, 100, 102, 103, 106, 117, 119, 121, 124, 126, 129, "Expression", -7, 23, 24, 25, 26, 27, 29, 34, "Type"],
          ["openedBy", 10, "(", 44, "{"],
          ["closedBy", 11, ")", 45, "}"]
        ],
        propSources: [javaHighlighting],
        skippedNodes: [0, 1, 2],
        repeatNodeCount: 28,
        tokenData: "##i_R!_OX%QXY'fYZ)bZ^'f^p%Qpq'fqr*|rs,^st%Qtu2luv4Rvw5cwx6yxy?byz@Oz{@l{|Ab|}Bx}!OCf!O!PEP!P!QMy!Q!R!*o!R![!.Z![!]!:s!]!^!<T!^!_!<q!_!`!>[!`!a!?O!a!b!@l!b!c!A[!c!}!HW!}#O!Im#O#P%Q#P#Q!JZ#Q#R!Jw#R#S2l#S#T%Q#T#o2l#o#p!Kk#p#q!LX#q#r!Mq#r#s!N_#s#y%Q#y#z'f#z$f%Q$f$g'f$g#BY2l#BY#BZ!N{#BZ$IS2l$IS$I_!N{$I_$I|2l$I|$JO!N{$JO$JT2l$JT$JU!N{$JU$KV2l$KV$KW!N{$KW&FU2l&FU&FV!N{&FV;'S2l;'S;=`3{<%lO2lS%VV&XSOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%QS%qO&XSS%tVOY&ZYZ%lZr&Zrs&ys;'S&Z;'S;=`'`<%lO&ZS&^VOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%QS&vP;=`<%l%QS&|UOY&ZYZ%lZr&Zs;'S&Z;'S;=`'`<%lO&ZS'cP;=`<%l&Z_'mk&XS%xZOX%QXY'fYZ)bZ^'f^p%Qpq'fqr%Qrs%qs#y%Q#y#z'f#z$f%Q$f$g'f$g#BY%Q#BY#BZ'f#BZ$IS%Q$IS$I_'f$I_$I|%Q$I|$JO'f$JO$JT%Q$JT$JU'f$JU$KV%Q$KV$KW'f$KW&FU%Q&FU&FV'f&FV;'S%Q;'S;=`&s<%lO%Q_)iY&XS%xZX^*Xpq*X#y#z*X$f$g*X#BY#BZ*X$IS$I_*X$I|$JO*X$JT$JU*X$KV$KW*X&FU&FV*XZ*^Y%xZX^*Xpq*X#y#z*X$f$g*X#BY#BZ*X$IS$I_*X$I|$JO*X$JT$JU*X$KV$KW*X&FU&FV*XV+TX#sP&XSOY%QYZ%lZr%Qrs%qs!_%Q!_!`+p!`;'S%Q;'S;=`&s<%lO%QU+wV#_Q&XSOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%QT,aXOY,|YZ%lZr,|rs1as#O,|#O#P0k#P;'S,|;'S;=`1Z<%lO,|T-PXOY-lYZ%lZr-lrs.^s#O-l#O#P.x#P;'S-l;'S;=`1T<%lO-lT-qX&XSOY-lYZ%lZr-lrs.^s#O-l#O#P.x#P;'S-l;'S;=`1T<%lO-lT.cVcPOY&ZYZ%lZr&Zrs&ys;'S&Z;'S;=`'`<%lO&ZT.}V&XSOY-lYZ%lZr-lrs/ds;'S-l;'S;=`1T<%lO-lT/gXOY,|YZ%lZr,|rs0Ss#O,|#O#P0k#P;'S,|;'S;=`1Z<%lO,|T0XUcPOY&ZYZ%lZr&Zs;'S&Z;'S;=`'`<%lO&ZT0nVOY-lYZ%lZr-lrs/ds;'S-l;'S;=`1T<%lO-lT1WP;=`<%l-lT1^P;=`<%l,|T1fVcPOY&ZYZ%lZr&Zrs1{s;'S&Z;'S;=`'`<%lO&ZT2QR&VSXY2ZYZ2gpq2ZP2^RXY2ZYZ2gpq2ZP2lO&WP_2sb&XS&OZOY%QYZ%lZr%Qrs%qst%Qtu2lu!Q%Q!Q![2l![!c%Q!c!}2l!}#R%Q#R#S2l#S#T%Q#T#o2l#o$g%Q$g;'S2l;'S;=`3{<%lO2l_4OP;=`<%l2lU4YX&XS#gQOY%QYZ%lZr%Qrs%qs!_%Q!_!`4u!`;'S%Q;'S;=`&s<%lO%QU4|V#]Q&XSOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%QV5jZ&mR&XSOY%QYZ%lZr%Qrs%qsv%Qvw6]w!_%Q!_!`4u!`;'S%Q;'S;=`&s<%lO%QU6dV#aQ&XSOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%QT7OZ&XSOY7qYZ%lZr7qrs9Psw7qwx%Qx#O7q#O#P:Z#P;'S7q;'S;=`?[<%lO7qT7vX&XSOY%QYZ%lZr%Qrs%qsw%Qwx8cx;'S%Q;'S;=`&s<%lO%QT8jVbP&XSOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%QT9SXOY&ZYZ%lZr&Zrs&ysw&Zwx9ox;'S&Z;'S;=`'`<%lO&ZT9tVbPOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%QT:`Z&XSOY;RYZ%lZr;Rrs;ysw;Rwx7qx#O;R#O#P7q#P;'S;R;'S;=`=e<%lO;RT;WZ&XSOY;RYZ%lZr;Rrs;ysw;Rwx8cx#O;R#O#P%Q#P;'S;R;'S;=`=e<%lO;RT;|ZOY<oYZ%lZr<ors=ksw<owx9ox#O<o#O#P&Z#P;'S<o;'S;=`?U<%lO<oT<rZOY;RYZ%lZr;Rrs;ysw;Rwx8cx#O;R#O#P%Q#P;'S;R;'S;=`=e<%lO;RT=hP;=`<%l;RT=nZOY<oYZ%lZr<ors>asw<owx9ox#O<o#O#P&Z#P;'S<o;'S;=`?U<%lO<oP>dVOY>aZw>awx>yx#O>a#P;'S>a;'S;=`?O<%lO>aP?OObPP?RP;=`<%l>aT?XP;=`<%l<oT?_P;=`<%l7q_?iVZZ&XSOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%QV@VVYR&XSOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%QV@uX$YP&XS#gQOY%QYZ%lZr%Qrs%qs!_%Q!_!`4u!`;'S%Q;'S;=`&s<%lO%QVAiZ#fR&XSOY%QYZ%lZr%Qrs%qs{%Q{|B[|!_%Q!_!`4u!`;'S%Q;'S;=`&s<%lO%QVBcV#qR&XSOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%QVCPVqR&XSOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%QVCm[#fR&XSOY%QYZ%lZr%Qrs%qs}%Q}!OB[!O!_%Q!_!`4u!`!aDc!a;'S%Q;'S;=`&s<%lO%QVDjV&wR&XSOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%Q_EWZWY&XSOY%QYZ%lZr%Qrs%qs!O%Q!O!PEy!P!Q%Q!Q![GX![;'S%Q;'S;=`&s<%lO%QVFOX&XSOY%QYZ%lZr%Qrs%qs!O%Q!O!PFk!P;'S%Q;'S;=`&s<%lO%QVFrV&pR&XSOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%QTG`c&XS`POY%QYZ%lZr%Qrs%qs!Q%Q!Q![GX![!f%Q!f!gHk!g!hIX!h!iHk!i#R%Q#R#SMR#S#W%Q#W#XHk#X#YIX#Y#ZHk#Z;'S%Q;'S;=`&s<%lO%QTHrV&XS`POY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%QTI^]&XSOY%QYZ%lZr%Qrs%qs{%Q{|JV|}%Q}!OJV!O!Q%Q!Q![Jw![;'S%Q;'S;=`&s<%lO%QTJ[X&XSOY%QYZ%lZr%Qrs%qs!Q%Q!Q![Jw![;'S%Q;'S;=`&s<%lO%QTKOc&XS`POY%QYZ%lZr%Qrs%qs!Q%Q!Q![Jw![!f%Q!f!gHk!g!h%Q!h!iHk!i#R%Q#R#SLZ#S#W%Q#W#XHk#X#Y%Q#Y#ZHk#Z;'S%Q;'S;=`&s<%lO%QTL`Z&XSOY%QYZ%lZr%Qrs%qs!Q%Q!Q![Jw![#R%Q#R#SLZ#S;'S%Q;'S;=`&s<%lO%QTMWZ&XSOY%QYZ%lZr%Qrs%qs!Q%Q!Q![GX![#R%Q#R#SMR#S;'S%Q;'S;=`&s<%lO%Q_NQ]&XS#gQOY%QYZ%lZr%Qrs%qsz%Qz{Ny{!P%Q!P!Q!'l!Q!_%Q!_!`4u!`;'S%Q;'S;=`&s<%lO%Q_! OX&XSOYNyYZ! kZrNyrs!#WszNyz{!$f{;'SNy;'S;=`!%z<%lONy_! pT&XSOz!!Pz{!!c{;'S!!P;'S;=`!#Q<%lO!!PZ!!STOz!!Pz{!!c{;'S!!P;'S;=`!#Q<%lO!!PZ!!fVOz!!Pz{!!c{!P!!P!P!Q!!{!Q;'S!!P;'S;=`!#Q<%lO!!PZ!#QOQZZ!#TP;=`<%l!!P_!#ZXOY!#vYZ! kZr!#vrs!&Qsz!#vz{!&p{;'S!#v;'S;=`!'f<%lO!#v_!#yXOYNyYZ! kZrNyrs!#WszNyz{!$f{;'SNy;'S;=`!%z<%lONy_!$kZ&XSOYNyYZ! kZrNyrs!#WszNyz{!$f{!PNy!P!Q!%^!Q;'SNy;'S;=`!%z<%lONy_!%eV&XSQZOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%Q_!%}P;=`<%lNy_!&TXOY!#vYZ! kZr!#vrs!!Psz!#vz{!&p{;'S!#v;'S;=`!'f<%lO!#v_!&sZOYNyYZ! kZrNyrs!#WszNyz{!$f{!PNy!P!Q!%^!Q;'SNy;'S;=`!%z<%lONy_!'iP;=`<%l!#v_!'sV&XSPZOY!'lYZ%lZr!'lrs!(Ys;'S!'l;'S;=`!)`<%lO!'l_!(_VPZOY!(tYZ%lZr!(trs!)fs;'S!(t;'S;=`!*i<%lO!(t_!(yVPZOY!'lYZ%lZr!'lrs!(Ys;'S!'l;'S;=`!)`<%lO!'l_!)cP;=`<%l!'l_!)kVPZOY!(tYZ%lZr!(trs!*Qs;'S!(t;'S;=`!*i<%lO!(tZ!*VSPZOY!*QZ;'S!*Q;'S;=`!*c<%lO!*QZ!*fP;=`<%l!*Q_!*lP;=`<%l!(tT!*vq&XS_POY%QYZ%lZr%Qrs%qs!O%Q!O!P!,}!P!Q%Q!Q![!.Z![!d%Q!d!e!1e!e!f%Q!f!gHk!g!hIX!h!iHk!i!n%Q!n!o!0P!o!z%Q!z!{!3c!{#R%Q#R#S!0m#S#U%Q#U#V!1e#V#W%Q#W#XHk#X#YIX#Y#ZHk#Z#`%Q#`#a!0P#a#l%Q#l#m!3c#m;'S%Q;'S;=`&s<%lO%QT!-Ua&XS`POY%QYZ%lZr%Qrs%qs!Q%Q!Q![GX![!f%Q!f!gHk!g!hIX!h!iHk!i#W%Q#W#XHk#X#YIX#Y#ZHk#Z;'S%Q;'S;=`&s<%lO%QT!.bi&XS_POY%QYZ%lZr%Qrs%qs!O%Q!O!P!,}!P!Q%Q!Q![!.Z![!f%Q!f!gHk!g!hIX!h!iHk!i!n%Q!n!o!0P!o#R%Q#R#S!0m#S#W%Q#W#XHk#X#YIX#Y#ZHk#Z#`%Q#`#a!0P#a;'S%Q;'S;=`&s<%lO%QT!0WV&XS_POY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%QT!0rZ&XSOY%QYZ%lZr%Qrs%qs!Q%Q!Q![!.Z![#R%Q#R#S!0m#S;'S%Q;'S;=`&s<%lO%QT!1jY&XSOY%QYZ%lZr%Qrs%qs!Q%Q!Q!R!2Y!R!S!2Y!S;'S%Q;'S;=`&s<%lO%QT!2a`&XS_POY%QYZ%lZr%Qrs%qs!Q%Q!Q!R!2Y!R!S!2Y!S!n%Q!n!o!0P!o#R%Q#R#S!1e#S#`%Q#`#a!0P#a;'S%Q;'S;=`&s<%lO%QT!3h_&XSOY%QYZ%lZr%Qrs%qs!O%Q!O!P!4g!P!Q%Q!Q![!6u![!c%Q!c!i!6u!i#T%Q#T#Z!6u#Z;'S%Q;'S;=`&s<%lO%QT!4l]&XSOY%QYZ%lZr%Qrs%qs!Q%Q!Q![!5e![!c%Q!c!i!5e!i#T%Q#T#Z!5e#Z;'S%Q;'S;=`&s<%lO%QT!5jc&XSOY%QYZ%lZr%Qrs%qs!Q%Q!Q![!5e![!c%Q!c!i!5e!i!r%Q!r!sIX!s#R%Q#R#S!4g#S#T%Q#T#Z!5e#Z#d%Q#d#eIX#e;'S%Q;'S;=`&s<%lO%QT!6|i&XS_POY%QYZ%lZr%Qrs%qs!O%Q!O!P!8k!P!Q%Q!Q![!6u![!c%Q!c!i!6u!i!n%Q!n!o!0P!o!r%Q!r!sIX!s#R%Q#R#S!9u#S#T%Q#T#Z!6u#Z#`%Q#`#a!0P#a#d%Q#d#eIX#e;'S%Q;'S;=`&s<%lO%QT!8pa&XSOY%QYZ%lZr%Qrs%qs!Q%Q!Q![!5e![!c%Q!c!i!5e!i!r%Q!r!sIX!s#T%Q#T#Z!5e#Z#d%Q#d#eIX#e;'S%Q;'S;=`&s<%lO%QT!9z]&XSOY%QYZ%lZr%Qrs%qs!Q%Q!Q![!6u![!c%Q!c!i!6u!i#T%Q#T#Z!6u#Z;'S%Q;'S;=`&s<%lO%QV!:zX#oR&XSOY%QYZ%lZr%Qrs%qs![%Q![!]!;g!];'S%Q;'S;=`&s<%lO%QV!;nV&uR&XSOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%QV!<[V!PR&XSOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%Q_!<xY&^Z&XSOY%QYZ%lZr%Qrs%qs!^%Q!^!_!=h!_!`+p!`;'S%Q;'S;=`&s<%lO%QU!=oX#hQ&XSOY%QYZ%lZr%Qrs%qs!_%Q!_!`4u!`;'S%Q;'S;=`&s<%lO%QV!>cX!bR&XSOY%QYZ%lZr%Qrs%qs!_%Q!_!`+p!`;'S%Q;'S;=`&s<%lO%QV!?VY&]R&XSOY%QYZ%lZr%Qrs%qs!_%Q!_!`+p!`!a!?u!a;'S%Q;'S;=`&s<%lO%QU!?|Y#hQ&XSOY%QYZ%lZr%Qrs%qs!_%Q!_!`4u!`!a!=h!a;'S%Q;'S;=`&s<%lO%Q_!@uV&aX#nQ&XSOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%Q_!AcX%|Z&XSOY%QYZ%lZr%Qrs%qs#]%Q#]#^!BO#^;'S%Q;'S;=`&s<%lO%QV!BTX&XSOY%QYZ%lZr%Qrs%qs#b%Q#b#c!Bp#c;'S%Q;'S;=`&s<%lO%QV!BuX&XSOY%QYZ%lZr%Qrs%qs#h%Q#h#i!Cb#i;'S%Q;'S;=`&s<%lO%QV!CgX&XSOY%QYZ%lZr%Qrs%qs#X%Q#X#Y!DS#Y;'S%Q;'S;=`&s<%lO%QV!DXX&XSOY%QYZ%lZr%Qrs%qs#f%Q#f#g!Dt#g;'S%Q;'S;=`&s<%lO%QV!DyX&XSOY%QYZ%lZr%Qrs%qs#Y%Q#Y#Z!Ef#Z;'S%Q;'S;=`&s<%lO%QV!EkX&XSOY%QYZ%lZr%Qrs%qs#T%Q#T#U!FW#U;'S%Q;'S;=`&s<%lO%QV!F]X&XSOY%QYZ%lZr%Qrs%qs#V%Q#V#W!Fx#W;'S%Q;'S;=`&s<%lO%QV!F}X&XSOY%QYZ%lZr%Qrs%qs#X%Q#X#Y!Gj#Y;'S%Q;'S;=`&s<%lO%QV!GqV&sR&XSOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%Q_!H_b&QZ&XSOY%QYZ%lZr%Qrs%qst%Qtu!HWu!Q%Q!Q![!HW![!c%Q!c!}!HW!}#R%Q#R#S!HW#S#T%Q#T#o!HW#o$g%Q$g;'S!HW;'S;=`!Ig<%lO!HW_!IjP;=`<%l!HW_!ItVuZ&XSOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%QV!JbVsR&XSOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%QU!KOX#eQ&XSOY%QYZ%lZr%Qrs%qs!_%Q!_!`4u!`;'S%Q;'S;=`&s<%lO%QV!KrV}R&XSOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%Q_!LbZ&}X#dQ&XSOY%QYZ%lZr%Qrs%qs!_%Q!_!`4u!`#p%Q#p#q!MT#q;'S%Q;'S;=`&s<%lO%QU!M[V#bQ&XSOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%QV!MxV|R&XSOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%QT!NfV#tP&XSOY%QYZ%lZr%Qrs%qs;'S%Q;'S;=`&s<%lO%Q_# Uu&XS%xZ&OZOX%QXY'fYZ)bZ^'f^p%Qpq'fqr%Qrs%qst%Qtu2lu!Q%Q!Q![2l![!c%Q!c!}2l!}#R%Q#R#S2l#S#T%Q#T#o2l#o#y%Q#y#z'f#z$f%Q$f$g'f$g#BY2l#BY#BZ!N{#BZ$IS2l$IS$I_!N{$I_$I|2l$I|$JO!N{$JO$JT2l$JT$JU!N{$JU$KV2l$KV$KW!N{$KW&FU2l&FU&FV!N{&FV;'S2l;'S;=`3{<%lO2l",
        tokenizers: [0, 1, 2, 3],
        topRules: { "Program": [0, 3], "ClassContent": [1, 193] },
        dynamicPrecedences: { "27": 1, "231": -1, "242": -1 },
        specialized: [{ term: 230, get: (value) => spec_identifier3[value] || -1 }],
        tokenPrec: 7072
      });
    }
  });

  // node_modules/@codemirror/lang-java/dist/index.js
  function java() {
    return new LanguageSupport(javaLanguage);
  }
  var javaLanguage;
  var init_dist13 = __esm({
    "node_modules/@codemirror/lang-java/dist/index.js"() {
      init_dist12();
      init_dist5();
      javaLanguage = /* @__PURE__ */ LRLanguage.define({
        name: "java",
        parser: /* @__PURE__ */ parser3.configure({
          props: [
            /* @__PURE__ */ indentNodeProp.add({
              IfStatement: /* @__PURE__ */ continuedIndent({ except: /^\s*({|else\b)/ }),
              TryStatement: /* @__PURE__ */ continuedIndent({ except: /^\s*({|catch|finally)\b/ }),
              LabeledStatement: flatIndent,
              SwitchBlock: (context) => {
                let after = context.textAfter, closed = /^\s*\}/.test(after), isCase = /^\s*(case|default)\b/.test(after);
                return context.baseIndent + (closed ? 0 : isCase ? 1 : 2) * context.unit;
              },
              Block: /* @__PURE__ */ delimitedIndent({ closing: "}" }),
              BlockComment: () => null,
              Statement: /* @__PURE__ */ continuedIndent({ except: /^{/ })
            }),
            /* @__PURE__ */ foldNodeProp.add({
              ["Block SwitchBlock ClassBody ElementValueArrayInitializer ModuleBody EnumBody ConstructorBody InterfaceBody ArrayInitializer"]: foldInside,
              BlockComment(tree) {
                return { from: tree.from + 2, to: tree.to - 2 };
              }
            })
          ]
        }),
        languageData: {
          commentTokens: { line: "//", block: { open: "/*", close: "*/" } },
          indentOnInput: /^\s*(?:case |default:|\{|\})$/
        }
      });
    }
  });

  // codemirror-entry.js
  var require_codemirror_entry = __commonJS({
    "codemirror-entry.js"() {
      init_dist();
      init_dist2();
      init_dist5();
      init_dist8();
      init_dist11();
      init_dist13();
      init_dist4();
      var input = document.querySelector("#code");
      var legacyGutter = document.querySelector("#lines");
      var languageSelect = document.querySelector("#language");
      if (!input || !legacyGutter || !languageSelect) throw new Error("\u672A\u627E\u5230\u4EE3\u7801\u7F16\u8F91\u5668\u5BB9\u5668\u3002");
      var mono = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';
      var language2 = new Compartment();
      var languageFor = () => ({
        "C++ (g++)": cpp(),
        "Python 3": python(),
        "Java 17": java()
      })[languageSelect.value] || cpp();
      function indentationDots(view2) {
        const marks2 = [];
        for (const range of view2.visibleRanges) {
          for (let line = view2.state.doc.lineAt(range.from); ; line = view2.state.doc.line(line.number + 1)) {
            const indentation2 = line.text.match(/^[\t ]+/)?.[0] || "";
            if (indentation2) marks2.push(Decoration.mark({ class: "cm-indent-marker" }).range(line.from, line.from + indentation2.length));
            if (line.to >= range.to || line.number === view2.state.doc.lines) break;
          }
        }
        return Decoration.set(marks2, true);
      }
      var indentationDotPlugin = ViewPlugin.fromClass(class {
        constructor(view2) {
          this.decorations = indentationDots(view2);
        }
        update(update) {
          if (update.docChanged || update.viewportChanged) this.decorations = indentationDots(update.view);
        }
      }, { decorations: (value) => value.decorations });
      function localLoopVariables(view2) {
        const marks2 = [];
        for (const range of view2.visibleRanges) {
          for (let line = view2.state.doc.lineAt(range.from); ; line = view2.state.doc.line(line.number + 1)) {
            const matcher = /\b(?:ch|i)\b/g;
            for (let match; match = matcher.exec(line.text); ) marks2.push(Decoration.mark({ class: "cm-loop-variable" }).range(line.from + match.index, line.from + match.index + match[0].length));
            if (line.to >= range.to || line.number === view2.state.doc.lines) break;
          }
        }
        return Decoration.set(marks2, true);
      }
      var localLoopVariablePlugin = ViewPlugin.fromClass(class {
        constructor(view2) {
          this.decorations = localLoopVariables(view2);
        }
        update(update) {
          if (update.docChanged || update.viewportChanged) this.decorations = localLoopVariables(update.view);
        }
      }, { decorations: (value) => value.decorations });
      var ptaTheme = EditorView.theme({
        "&": { height: "100%", color: "#d9d9d9", backgroundColor: "#404040" },
        ".cm-scroller": { fontFamily: mono, lineHeight: "1.75" },
        ".cm-content": { padding: "0.5rem 0", caretColor: "#f2f2f2" },
        ".cm-line": { paddingLeft: "0.5rem" },
        ".cm-indent-marker": { backgroundImage: "radial-gradient(circle, #797979 1px, transparent 1.2px)", backgroundPosition: "0 52%", backgroundRepeat: "repeat-x", backgroundSize: "8.4px 4px" },
        ".cm-loop-variable": { color: "#d9d9d9 !important" },
        ".cm-gutters": { minWidth: "58px", color: "#999", backgroundColor: "#404040", borderRight: "1px solid rgba(255,255,255,.06)" },
        ".cm-lineNumbers .cm-gutterElement": { padding: "0 1rem", boxSizing: "content-box" },
        ".cm-activeLine": { backgroundColor: "#444" },
        ".cm-activeLineGutter": { backgroundColor: "#444" },
        ".cm-selectionBackground, &.cm-focused .cm-selectionBackground, ::selection": { backgroundColor: "rgba(49,135,235,.45) !important" },
        ".cm-cursor, .cm-dropCursor": { borderLeftColor: "#f2f2f2" }
      }, { dark: true });
      var ptaHighlight = HighlightStyle.define([
        { tag: [tags.meta, tags.processingInstruction], color: "#80baff" },
        { tag: [tags.keyword, tags.controlKeyword, tags.definitionKeyword, tags.operatorKeyword], color: "#ff7587" },
        { tag: [tags.typeName, tags.className, tags.namespace], color: "#7dbbff" },
        { tag: [tags.name, tags.variableName, tags.definition(tags.variableName), tags.function(tags.variableName), tags.function(tags.name), tags.standard(tags.variableName), tags.standard(tags.name), tags.propertyName, tags.labelName], color: "#80c7ff" },
        { tag: [tags.string, tags.special(tags.string)], color: "#c3d880" },
        { tag: [tags.number, tags.bool, tags.null], color: "#d1a1ff" },
        { tag: [tags.comment, tags.lineComment, tags.blockComment], color: "#85909a" }
      ]);
      var replacing = false;
      var editingHistory = { undo: [], redo: [] };
      function replaceDocument(text) {
        replacing = true;
        view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: text } });
        input.value = text;
        input.dispatchEvent(new Event("input", { bubbles: true }));
        replacing = false;
      }
      function handleShortcut(event, editor) {
        if (!(event.ctrlKey || event.metaKey) || event.altKey) return false;
        const key = event.key.toLowerCase();
        if (key === "a") {
          editor.dispatch({ selection: { anchor: 0, head: editor.state.doc.length } });
          event.preventDefault();
          return true;
        }
        if (key === "z" && !event.shiftKey && editingHistory.undo.length) {
          editingHistory.redo.push(editor.state.doc.toString());
          replaceDocument(editingHistory.undo.pop());
          event.preventDefault();
          return true;
        }
        if ((key === "y" || key === "z" && event.shiftKey) && editingHistory.redo.length) {
          editingHistory.undo.push(editor.state.doc.toString());
          replaceDocument(editingHistory.redo.pop());
          event.preventDefault();
          return true;
        }
        if (key === "s") {
          localStorage.setItem("oms-pta-code-draft", editor.state.doc.toString());
          event.preventDefault();
          return true;
        }
        return false;
      }
      var commonShortcuts = EditorView.domEventHandlers({ keydown: handleShortcut });
      var view = new EditorView({
        state: EditorState.create({
          doc: input.value,
          extensions: [
            lineNumbers(),
            highlightActiveLineGutter(),
            highlightSpecialChars(),
            drawSelection(),
            rectangularSelection(),
            highlightActiveLine(),
            indentationDotPlugin,
            localLoopVariablePlugin,
            commonShortcuts,
            ptaTheme,
            syntaxHighlighting(ptaHighlight),
            language2.of(languageFor()),
            EditorView.updateListener.of((update) => {
              if (!update.docChanged || replacing) return;
              editingHistory.undo.push(update.startState.doc.toString());
              if (editingHistory.undo.length > 200) editingHistory.undo.shift();
              editingHistory.redo.length = 0;
              input.value = update.state.doc.toString();
              input.dispatchEvent(new Event("input", { bubbles: true }));
            })
          ]
        }),
        parent: input.parentElement
      });
      view.contentDOM.addEventListener("keydown", (event) => {
        if (handleShortcut(event, view)) event.stopImmediatePropagation();
      }, true);
      input.hidden = true;
      legacyGutter.hidden = true;
      input.addEventListener("input", () => {
        if (replacing || input.value === view.state.doc.toString()) return;
        replacing = true;
        view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: input.value } });
        replacing = false;
      });
      languageSelect.addEventListener("change", () => view.dispatch({ effects: language2.reconfigure(languageFor()) }));
      window.omsCodeEditor = { getValue: () => view.state.doc.toString(), focus: () => view.focus() };
    }
  });
  require_codemirror_entry();
})();
