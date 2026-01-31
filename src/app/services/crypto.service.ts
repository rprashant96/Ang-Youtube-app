import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class CryptoService {

  async encrypt(payload: any, publicCertPem: string) {

    const publicKey = await crypto.subtle.importKey(
      'spki',
      this.pemToArrayBuffer(publicCertPem),
      { name: 'RSA-OAEP', hash: 'SHA-256' },
      false,
      ['encrypt']
    );

    const aesKey = await crypto.subtle.generateKey(
      { name: 'AES-GCM', length: 256 },
      true,
      ['encrypt']
    );

    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encoded = new TextEncoder().encode(JSON.stringify(payload));

    const encryptedData = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      aesKey,
      encoded
    );

    const rawKey = await crypto.subtle.exportKey('raw', aesKey);
    const encryptedKey = await crypto.subtle.encrypt(
      { name: 'RSA-OAEP' },
      publicKey,
      rawKey
    );

    return {
      encryptedKey: this.toBase64(encryptedKey),
      iv: this.toBase64(iv),
      cipherText: this.toBase64(encryptedData)
    };
  }

  private pemToArrayBuffer(pem: string): ArrayBuffer {
    const clean = pem.replace(/-----.*-----/g, '').replace(/\s/g, '');
    return Uint8Array.from(atob(clean), c => c.charCodeAt(0)).buffer;
  }

  private toBase64(buffer: ArrayBuffer | Uint8Array): string {
    const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
    return btoa(String.fromCharCode(...bytes));
  }
}
