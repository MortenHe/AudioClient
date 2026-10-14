import { FileNamePipe } from './file-name.pipe';

describe('FileNamePipe', () => {
  const pipe = new FileNamePipe();

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('removes a hyphenated prefix without removing the track number', () => {
    expect(pipe.transform('He-Man - 00 - Giganten des Universums.mp3', 'digit'))
      .toBe('00 - Giganten des Universums');
  });

  it('removes a prefix containing a period', () => {
    expect(pipe.transform('Albert E. erklärt - Alles rund um Flughafen', 'digit'))
      .toBe('Alles rund um Flughafen');
  });
});
