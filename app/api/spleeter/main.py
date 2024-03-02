import os
from spleeter.separator import Separator
from pydub import AudioSegment

def main():
    audio_file = './public/spleeter/input/custom.mp3'
    output_path = './public/'

    # Check if the output folder exists, otherwise create it
    os.makedirs(output_path, exist_ok=True)

    # Spleeter 4stems model at 16kHz
    separator = Separator('spleeter:4stems-16kHz')

    # Separate audio
    separator.separate_to_file(audio_file, output_path)

    # Get the basename of the audio file without extension
    audio_basename = os.path.splitext(os.path.basename(audio_file))[0]

    # Convert output WAV files to MP3
    for stem in ['vocals', 'drums', 'bass', 'other']:
        wav_audio = AudioSegment.from_file(f"{output_path}/{audio_basename}/{stem}.wav", format="wav")
        wav_audio.export(f"{output_path}/{audio_basename}/{stem}.mp3", format="mp3")

    print("Spleeter script finished running.")  # Print message upon completion

if __name__ == '__main__':
    main()
