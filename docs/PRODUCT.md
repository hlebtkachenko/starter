# Product

> Detailed product spec. `VISION.md` is the thesis ("why"); this file is the shape ("what").
> Status: **placeholder skeleton**. Each section below is a slot Claude (or the maintainer) should fill before MILESTONE-002.
> Rule: only commit a filled section. Empty sections stay as `TBD` blocks; do not delete the heading.

---

## 1. One-liner

> One sentence. What this product is, for whom, and the single outcome they buy.

`TBD`

## 2. Problem

> What's painful today? Whose day breaks? How often, how badly.
> Two paragraphs max. No corporate language.

`TBD`

## 3. Personas

> 1-3 personas. Primary first. Each: role, context, one concrete pain, one current workaround.

### Primary: `<role>`

- Context: `TBD`
- Pain: `TBD`
- Today's workaround: `TBD`

### Secondary: `<role>`

- Context: `TBD`
- Pain: `TBD`
- Today's workaround: `TBD`

## 4. Jobs to be done

> Format: **When** `<situation>`, **I want to** `<motivation>`, **so I can** `<outcome>`.
> Each JTBD must map to at least one feature in section 6.

- When `TBD`, I want to `TBD`, so I can `TBD`.
- When `TBD`, I want to `TBD`, so I can `TBD`.

## 5. Outcomes (success metrics)

> What changes in the user's world if this works? Quantify where possible. These become the KPIs in `STATE.md`.

| Metric | Today | Target | Window |
|---|---|---|---|
| `TBD` | `?` | `?` | `90d` |

## 6. Feature matrix

> Per pricing tier, per milestone. Mark `✓` shipped, `→` planned, `–` excluded.

| Feature | Free | Pro | Enterprise | First milestone |
|---|---|---|---|---|
| `TBD` | `–` | `→` | `→` | `MILESTONE-002` |

## 7. Pricing

> Anchor + tiers. Trial policy. Annual discount. Currency.

- Anchor: `TBD`
- Tiers: `TBD`
- Trial: `TBD`
- Currency: `TBD`

## 8. Positioning

> Two columns: status quo vs us, and direct competitor vs us. One line per row, factual.

### vs status quo

| Dimension | Status quo | This product |
|---|---|---|
| `TBD` | `TBD` | `TBD` |

### vs `<competitor>`

| Dimension | `<competitor>` | This product |
|---|---|---|
| `TBD` | `TBD` | `TBD` |

## 9. Out of scope

> Hard cuts. What this product will **not** do, and why. Saying no here is more valuable than any feature row above.

- `TBD` (reason: `TBD`)
- `TBD` (reason: `TBD`)

## 10. Open questions

> Things the next session should resolve. Each item must name the decider.

- [ ] `TBD` — decider: `<role>`
- [ ] `TBD` — decider: `<role>`

---

## Authoring rules

- One concrete fact per bullet. No marketing language.
- If you'd hesitate to defend a sentence in a sales call, mark it `TBD` instead.
- Cross-link to ADRs (`docs/adr/`) when a section reflects a logged decision.
- When a section is filled, remove its `TBD` markers and update `STATE.md` if KPIs changed.
