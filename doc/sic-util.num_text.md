<!-- Do not edit this file. It is automatically generated by API Documenter. -->

[Home](./index.md) &gt; [sic-util](./sic-util.md) &gt; [num\_text](./sic-util.num_text.md)

## num\_text() function

 数字转中文数码

**Signature:**

```typescript
num_text: (number: number | string | undefined | null, type?: string) => string | false
```

## Parameters

<table><thead><tr><th>

Parameter


</th><th>

Type


</th><th>

Description


</th></tr></thead>
<tbody><tr><td>

number


</td><td>

number \| string \| undefined \| null


</td><td>


</td></tr>
<tr><td>

type


</td><td>

string


</td><td>

_(Optional)_ 文本类型，lower\|upper，默认upper


</td></tr>
</tbody></table>
**Returns:**

string \| false

## Example

number2text(100000000) =<!-- -->&gt; "壹亿元整"

