import NodeRSA from 'node-rsa';

const key = new NodeRSA(`-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAoaW3loQ7a/Ox4M0yXAx3
LtKn649Wz24Ya+LMe1xAXrexWujqJbtSm+nA4qqHgEWlkFc5tidY+eud+BeuYzzr
JCyZBng5y+gIFIhVdSHpdgLjlcRDueanGxAkK/J1P3NBR463wKZsUZlgEnWmyjcF
9p6OCDoiQ8n1q3kS8GVqmN6XwEnDvUpoxdghyWRy462PwiOHPJeJSgdWuFXvWGyX
dWfbcrCEAyYl59ftLC0YVtUar9GnqNbtPntKk59MOjX9q3V5IyxIGnWLTCJ8zWlY
taNxEbwDoZL3WidFHOcXqMiZjVsawYwJoKOzqFEgjHQorl2g9sx1+Y0VzJ+e+LeL
cwIDAQAB
-----END PUBLIC KEY-----`);


export const encrypt = (textToEncrypt) => {
    return key.encrypt(textToEncrypt, 'base64');
};
